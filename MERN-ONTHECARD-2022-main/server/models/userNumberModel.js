import mongoose from "mongoose";

const userNumberSchema = mongoose.Schema({
  value: Number,
  updatedAt: Date,
});

const UserNumber = mongoose.model("usernumber", userNumberSchema);

export default UserNumber;
