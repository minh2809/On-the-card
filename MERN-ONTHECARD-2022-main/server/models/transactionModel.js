import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  serialNo: { type: String, default: "" },
  userName: { type: String, default: "" },
  pageView: { type: Number, default: 0 },
  saveContact: { type: Number, default: 0 },
  redirectView: { type: Number, default: 0 },
  company: { type: String, default: "" },
  transType: { type: String, default: "" },
  transFrom: { type: String, default: "viewPage" },
  links: [
    {
      url: { type: String, default: "" },
      clickCount: { type: Number, default: 0 },
    },
  ],
  transNo: { type: Number, default: 0 },
  dataObject: {
    deviceData: {
      screenWidth: { type: String, default: "" },
      screenHeight: { type: String, default: "" },
    },
  },
  createdAt: { type: Number, default: Date.now() },
});

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
