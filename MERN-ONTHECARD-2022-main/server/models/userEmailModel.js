import mongoose from "mongoose";

const userEmailSchema = mongoose.Schema({
  email: String,
  serialNo: String,
  userName: String,
});

const UserEmail = mongoose.model("userEmail", userEmailSchema);

export default UserEmail;
