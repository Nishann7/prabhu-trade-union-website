import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

        read: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage =
  models.ContactMessage ||
  model(
    "ContactMessage",
    ContactMessageSchema
  );

export default ContactMessage;