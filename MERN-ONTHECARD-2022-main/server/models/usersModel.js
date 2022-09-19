import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  avatarURL: { type: String, default: "" },
  backgroundColor: { type: String, default: "" },
  backgroundColorObject: {
    dark: { type: String, default: "" },
    default: { type: String, default: "" },
    light: { type: String, default: "" },
  },
  backgroundColorStyle: { type: String, default: "" },
  backgroundImageUrl: { type: String, default: "" },
  bio: { type: String, default: "" },
  email: { type: String, default: "" },
  fullName: { type: String, default: "" },
  inactive: { type: Boolean, default: false },
  storeActivated: { type: Boolean, default: false },
  galleryActivated: { type: Boolean, default: false },
  redirectSaveContact: { type: Boolean, default: false },
  redirectMode: { type: Boolean, default: false },
  redirectLink: { type: String, default: "" },
  serialNo: { type: String, default: "" },
  linkTo: { type: String, default: "" },
  socialMediaList: [
    {
      icon: { type: String, default: "" },
      title: { type: String, default: "" },
      url: { type: String, default: "" },
      artist: { type: String, default: "" },
    },
  ],
  userName: { type: String, default: "" },
  userNum: { type: Number, default: 0 },
  userURL: { type: String, default: "" },
  iconStyle: String,
  company: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  isSuperAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  PIN: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  signInAt: { type: Date, default: Date.now() },
});

const User = mongoose.model("user", userSchema);

export default User;
