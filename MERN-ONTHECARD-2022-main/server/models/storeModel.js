import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
  company: { type: String, default: "" },
  isCompany: { type: Boolean, default: false },
  name: { type: String, default: "" },
  avatarURL: { type: String, default: "" },
  bio: { type: String, default: "" },
  products: [
    {
      icon: { type: String, default: "" },
      title: { type: String, default: "" },
      url: { type: String, default: "" },
      description: { type: String, default: "" },
      price: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

const Store = mongoose.model("store", storeSchema);

export default Store;
