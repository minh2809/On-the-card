import User from "../models/usersModel.js";
import { Vietnamese } from "../language/language.js";
import { firebaseDelete, firebaseSignUp } from "../util/helper.js";
import Transaction from "../models/transactionModel.js";

const setPIN = async (req, res, next) => {
  const { PIN } = req.body;

  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { PIN: PIN },
      { new: true, useFindAndModify: false }
    );

    return res.json({
      success: true,
      error: "",
    });
  } catch (error) {
    return res.json({
      success: false,
      error: `${Vietnamese.fetchData.errorHappened} (${error.message})`,
    });
  }
};

const updatePW = async (req, res, next) => {
  const { email, userName } = req.user;
  const { oldPW, newPW } = req.body;

  const deleteResult = await firebaseDelete(email, oldPW);
  if (!deleteResult.success) {
    return res.json({
      success: deleteResult.success,
      error: "Mật khẩu cũ không đúng. Vui lòng thử lại",
    });
  }

  const signUpResult = await firebaseSignUp(email, newPW, userName);
  if (!signUpResult.success) {
    return res.json({
      success: signUpResult.success,
      error: signUpResult.message,
    });
  }

  const resetTransaction = new Transaction({
    serialNo: req.user.serialNo,
    userName: userName,
    company: req.user.company,
    transType: "resetPassword",
    transFrom: "editPage",
    createdAt: Date.now(),
  });

  await resetTransaction.save();

  return res.json({
    success: true,
    error: "",
  });
};

export { setPIN, updatePW };

/*
Error Delete: "The password is invalid or the user does not have a password."
Error SignUP: 'The email address is already in use by another account.'
*/
