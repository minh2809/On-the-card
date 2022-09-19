import mongoose from "mongoose";

const storeAnalyticSchema = mongoose.Schema({
  company: { type: String, default: "" },
  pageView: { type: Number, default: 0 },
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

const StoreAnalytic = mongoose.model("store_analytic", storeAnalyticSchema);

export default StoreAnalytic;
