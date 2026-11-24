import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Admin, SiteContent } from "./models.js";
import { defaultContent } from "./defaultContent.js";

await mongoose.connect(process.env.MONGODB_URI);
const username = process.env.ADMIN_USERNAME || "admin";
const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
const existing = await Admin.findOne({ username });
if (!existing)
  await Admin.create({
    username,
    email: process.env.ADMIN_EMAIL || undefined,
    passwordHash: await bcrypt.hash(password, 12),
    role: "admin",
  });
await SiteContent.findOneAndUpdate(
  { key: "main" },
  { $setOnInsert: { data: defaultContent } },
  { upsert: true, new: true },
);
console.log(
  `Seed complete. Admin username: ${username}. Change your password after first login.`,
);
await mongoose.disconnect();
