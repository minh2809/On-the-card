import mongoose from "mongoose";

const serialNoSchema = mongoose.Schema({
  serialNo: String,
  cardRegistered: Boolean,
  email: String,
  userName: String,
  userRegistered: Boolean,
  createdAt: { type: Number, default: Date.now() },
  takenAt: { type: Number, default: Date.now() },
  registeredAt: { type: Number, default: Date.now() },
  resetAt: { type: Number, default: Date.now() },
  linkTo: { type: String, default: "" },
  partner: { type: String, default: "" },
});

const SerialNumber = mongoose.model("serialnumber", serialNoSchema);

export default SerialNumber;
