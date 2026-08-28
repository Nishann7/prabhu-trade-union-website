import mongoose, { Schema, models } from "mongoose";

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      default: "Union Update",
      trim: true,
    },

    important: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notice =
  models.Notice || mongoose.model("Notice", NoticeSchema);

export default Notice;