import SerialNumber from "../models/serialNoModel.js";
import Analytic from "../models/analyticModel.js";
import User from "../models/usersModel.js";
import UserNumber from "../models/userNumberModel.js";
import UserEmail from "../models/userEmailModel.js";

import { convertEmail, firebaseDelete } from "./helper.js";
import { errorTechSupport } from "./helper2.js";

const resetAccount = async (serialNo, password) => {
  const userNumberID = "603a9762a5f4375dfcefdcf8";
  const filter = { serialNo: serialNo };
  const serialUpdate = {
    cardRegistered: true,
    email: "",
    userName: "",
    userRegistered: false,
    resetAt: Date.now(),
  };
  const config = { new: true, useFindAndModify: false };

  try {
    const data = await SerialNumber.findOne(filter);
    const email = convertEmail(data.email);
    const result = await firebaseDelete(email, password);

    if (!result.success) {
      const errorPassword = "Mật khẩu đăng nhập không đúng";
      return { success: false, message: errorPassword };
    }

    await UserEmail.findOneAndDelete(filter);
    await Analytic.findOneAndDelete(filter);
    await User.findOneAndDelete(filter);
    await SerialNumber.findOneAndUpdate(filter, serialUpdate, config);

    try {
      const userAmount = await UserNumber.findById(userNumberID);
      await UserNumber.findByIdAndUpdate(
        userNumberID,
        { value: userAmount.value - 1 },
        config
      );
    } catch (error) {
      console.log(error.message);
    }

    const successMessage = `Reset Thẻ Thành Công ! Người dùng có thể đăng ký thẻ lại từ đầu.`;

    return { success: true, message: successMessage };
  } catch (error) {
    return { success: false, message: errorTechSupport(error.message) };
  }
};

export { resetAccount };
