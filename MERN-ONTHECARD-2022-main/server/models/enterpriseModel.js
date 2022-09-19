import mongoose from "mongoose";

const enterpriseSchema = mongoose.Schema({
  company: { type: String, default: "" },
  name: { type: String, default: "" },
  avatarURL: { type: String, default: "" },
  bio: { type: String, default: "" },
  backgroundColor: { type: String, default: "" },
  backgroundColorObject: {
    dark: { type: String, default: "" },
    default: { type: String, default: "" },
    light: { type: String, default: "" },
  },
  backgroundColorStyle: { type: String, default: "" },
  backgroundImageUrl: { type: String, default: "" },
  iconStyle: { type: String, default: "" },
  info: [
    {
      icon: { type: String, default: "" },
      title: { type: String, default: "" },
      url: { type: String, default: "" },
      description: { type: String, default: "" },
    },
  ],
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

const Enterprise = mongoose.model("enterprise", enterpriseSchema);

export default Enterprise;
