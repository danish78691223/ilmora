import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import { Admin, Submission, SiteContent } from "./models.js";
import { defaultContent } from "./defaultContent.js";

const app = express();
const isProd = process.env.NODE_ENV === "production";
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
const allowedOrigins = (
  process.env.CLIENT_ORIGIN ||
  "https://ilmora-kappa.vercel.app,http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests and health checks without an Origin header.
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.trim().replace(/\/$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
});
const clean = (v) =>
  String(v ?? "")
    .replace(/[<>]/g, "")
    .trim();
const tokenCookie = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
  path: "/",
  maxAge: 8 * 60 * 60 * 1000,
};
function auth(req, res, next) {
  const token = req.cookies.ILMORA_token;
  if (!token)
    return res.status(401).json({ message: "Authentication required" });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.clearCookie("ILMORA_token", { path: "/" });
    return res.status(401).json({ message: "Session expired" });
  }
}
const asyncRoute = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get(
  "/api/content",
  asyncRoute(async (req, res) => {
    let doc = await SiteContent.findOne({ key: "main" });
    if (!doc)
      doc = await SiteContent.create({ key: "main", data: defaultContent });
    res.json(doc.data);
  }),
);
app.put(
  "/api/contact",
  formLimiter,
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 120 })
      .withMessage("Enter your full name"),
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email"),
    body("phone").trim().isLength({ min: 6, max: 40 }),
    body("country").trim().isLength({ min: 2, max: 100 }),
    body("course").isIn(["English", "Urdu", "Arabic"]),
    body("level").isIn(["Beginner", "Intermediate", "Advanced"]),
    body("message").optional().isLength({ max: 2000 }),
  ],
  asyncRoute(async (req, res) => {
    if (req.body.website) return res.status(200).json({ ok: true });
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });
    const item = await Submission.create({
      name: clean(req.body.name),
      email: clean(req.body.email).toLowerCase(),
      phone: clean(req.body.phone),
      country: clean(req.body.country),
      course: req.body.course,
      level: req.body.level,
      message: clean(req.body.message),
    });
    if (process.env.SMTP_HOST && process.env.ADMIN_EMAIL) {
      try {
        const transport = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        await transport.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.ADMIN_EMAIL,
          subject: "New ILMORA application",
          text: `${item.name} (${item.email}) applied for ${item.course}.`,
        });
      } catch (e) {
        console.error("Email notification failed:", e.message);
      }
    }
    res.status(201).json({ ok: true });
  }),
);
app.post(
  "/api/admin/login",
  authLimiter,
  asyncRoute(async (req, res) => {
    const username = clean(req.body.username);
    const admin = await Admin.findOne({ username });
    if (
      !admin ||
      !(await bcrypt.compare(
        String(req.body.password || ""),
        admin.passwordHash,
      ))
    )
      return res.status(401).json({ message: "Invalid username or password" });
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );
    res
      .cookie("ILMORA_token", token, tokenCookie)
      .json({ username: admin.username, role: admin.role });
  }),
);
app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("ILMORA_token", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
  });
  res.json({ ok: true });
});
app.get("/api/admin/me", auth, (req, res) =>
  res.json({ username: req.admin.username, role: req.admin.role }),
);
app.get(
  "/api/admin/dashboard",
  auth,
  asyncRoute(async (req, res) => {
    const [total, fresh, contacted, registered] = await Promise.all([
      Submission.countDocuments(),
      Submission.countDocuments({ status: "New" }),
      Submission.countDocuments({ status: "Contacted" }),
      Submission.countDocuments({ status: "Registered" }),
    ]);
    res.json({ total, fresh, contacted, registered });
  }),
);
app.get(
  "/api/admin/submissions",
  auth,
  asyncRoute(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1),
      limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const filter = {};
    if (["English", "Urdu", "Arabic"].includes(req.query.course))
      filter.course = req.query.course;
    if (["New", "Read", "Contacted", "Registered"].includes(req.query.status))
      filter.status = req.query.status;
    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to)
        filter.createdAt.$lte = new Date(req.query.to + "T23:59:59.999Z");
    }
    if (req.query.search) {
      const q = clean(req.query.search);
      filter.$or = ["name", "email", "phone", "country"].map((k) => ({
        [k]: { $regex: q, $options: "i" },
      }));
    }
    const [items, total] = await Promise.all([
      Submission.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Submission.countDocuments(filter),
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  }),
);
app.patch(
  "/api/admin/submissions/:id",
  auth,
  asyncRoute(async (req, res) => {
    if (!["New", "Read", "Contacted", "Registered"].includes(req.body.status))
      return res.status(400).json({ message: "Invalid status" });
    const item = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    if (!item) return res.status(404).json({ message: "Submission not found" });
    res.json(item);
  }),
);
app.delete(
  "/api/admin/submissions/:id",
  auth,
  asyncRoute(async (req, res) => {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  }),
);
app.get(
  "/api/admin/export.csv",
  auth,
  asyncRoute(async (req, res) => {
    const items = await Submission.find().sort({ createdAt: -1 }).lean();
    const cols = [
      "name",
      "email",
      "phone",
      "country",
      "course",
      "level",
      "message",
      "status",
      "createdAt",
    ];
    const quote = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      cols.join(","),
      ...items.map((x) =>
        cols
          .map((k) => quote(x[k] instanceof Date ? x[k].toISOString() : x[k]))
          .join(","),
      ),
    ].join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ILMORA-submissions.csv"',
    );
    res.send("\ufeff" + csv);
  }),
);
app.put(
  "/api/admin/content",
  auth,
  asyncRoute(async (req, res) => {
    if (
      !req.body ||
      typeof req.body !== "object" ||
      JSON.stringify(req.body).length > 800000
    )
      return res.status(400).json({ message: "Invalid content payload" });
    const doc = await SiteContent.findOneAndUpdate(
      { key: "main" },
      { $set: { data: req.body } },
      { upsert: true, new: true },
    );
    res.json({ ok: true, data: doc.data });
  }),
);
app.post(
  "/api/admin/change-password",
  auth,
  asyncRoute(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (typeof newPassword !== "string" || newPassword.length < 12)
      return res
        .status(400)
        .json({ message: "New password must be at least 12 characters" });
    const admin = await Admin.findById(req.admin.id);
    if (
      !admin ||
      !(await bcrypt.compare(String(currentPassword || ""), admin.passwordHash))
    )
      return res.status(400).json({ message: "Current password is incorrect" });
    admin.passwordHash = await bcrypt.hash(newPassword, 12);
    await admin.save();
    res.json({ ok: true });
  }),
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error. Please try again." });
});

const start = async () => {
  const mongoUri = process.env.MONGODB_URI?.trim();

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is missing. Configure it in the hosting provider's environment variables.",
    );
  }

  if (
    isProd &&
    /(?:localhost|127\.0\.0\.1)(?::\d+)?/i.test(mongoUri)
  ) {
    throw new Error(
      "MONGODB_URI points to localhost. Production must use a reachable hosted MongoDB URI, such as MongoDB Atlas.",
    );
  }

  await mongoose.connect(mongoUri);
  app.listen(process.env.PORT || 5000, () =>
    console.log(`ILMORA API listening on ${process.env.PORT || 5000}`),
  );
};
start().catch((e) => {
  console.error("ILMORA API startup failed:", e.message);
  process.exit(1);
});
