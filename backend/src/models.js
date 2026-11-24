import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
  },
  { timestamps: true },
);

const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 120 },
    email: { type: String, required: true, maxlength: 180 },
    phone: { type: String, required: true, maxlength: 40 },
    country: { type: String, required: true, maxlength: 100 },
    course: {
      type: String,
      enum: ["English", "Urdu", "Arabic"],
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    message: { type: String, maxlength: 2000, default: "" },
    status: {
      type: String,
      enum: ["New", "Read", "Contacted", "Registered"],
      default: "New",
    },
  },
  { timestamps: true },
);

const contentSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "main" },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const Admin = mongoose.model("Admin", adminSchema);
export const Submission = mongoose.model("Submission", submissionSchema);
export const SiteContent = mongoose.model("SiteContent", contentSchema);
