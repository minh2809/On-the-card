import mongoose from "mongoose";

const analyticSchema = mongoose.Schema({
  serialNo: { type: String, default: "" },
  userName: { type: String, default: "" },
  pageView: { type: Number, default: 0 },
  saveContact: { type: Number, default: 0 },
  redirectView: { type: Number, default: 0 },
  links: [
    {
      url: { type: String, default: "" },
      clickCount: { type: Number, default: 0 },
    },
  ],
  latestTransactionNo: { type: Number, default: 0 },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

const Analytic = mongoose.model("analytic", analyticSchema);

export default Analytic;
