import mongoose from "mongoose";

const gallerySchema = mongoose.Schema({
  userName: { type: String, default: "" },
  fullName: { type: String, default: "" },
  avatarURL: { type: String, default: "" },
  bio: { type: String, default: "" },
  bioLink: { type: String, default: "" },
  pageView: { type: Number, default: 0 },
  posts: [
    {
      title: { type: String, default: "" },
      imageUrl: { type: String, default: "" },
      description: { type: String, default: "" },
      postLink: { type: String, default: "" },
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      createdAt: { type: Number, default: Date.now() },
    },
  ],
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

const Gallery = mongoose.model("gallery", gallerySchema);

export default Gallery;
