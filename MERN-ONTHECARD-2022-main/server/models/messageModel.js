import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  serialNo: { type: String, default: "" },
  userName: { type: String, default: "" },
  company: { type: String, default: "" },
  isRead: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isOrder: { type: Boolean, default: false },
  orderData: {
    orderNumber: { type: Number, default: 0 },
    productImage: { type: String, default: "" },
    productName: { type: String, default: "" },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    address: { type: String, default: "" },
    productDescription: { type: String, default: "" },
    orderNotes: [
      {
        createdAt: { type: Number, default: Date.now() },
        note: { type: String, default: "" },
      },
    ],
  },
  fullName: { type: String, default: "" },
  email: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  message: { type: String, default: "" },
  sendEmail: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

const Message = mongoose.model("message", messageSchema);

export default Message;
