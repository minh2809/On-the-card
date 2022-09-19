import mongoose from "mongoose";

const linkedSerialNoSchema = mongoose.Schema({
  serialNo: String,
  linkTo: String,
  meToCo: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now() },
  takenAt: { type: Number, default: Date.now() },
  linkedAt: { type: Number, default: Date.now() },
});

const LinkedSerialNo = mongoose.model(
  "linked_serialnumber",
  linkedSerialNoSchema
);

export default LinkedSerialNo;
