import mongoose, { Schema, models, model } from "mongoose";

const SettingsSchema = new Schema(
  {
    unionName: {
      type: String,
      default: "Prabhu Union",
    },

    address: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Settings =
  models.Settings ||
  model("Settings", SettingsSchema);

export default Settings;
