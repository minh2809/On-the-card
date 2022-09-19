import SerialNumber from "../models/serialNoModel.js";
import User from "../models/usersModel.js";
import UserEmail from "../models/userEmailModel.js";
import Analytic from "../models/analyticModel.js";
import Transaction from "../models/transactionModel.js";
import Message from "../models/messageModel.js";
import Store from "../models/storeModel.js";
import Enterprise from "../models/enterpriseModel.js";
// import { Vietnamese } from "../language/language.js";
import fs from "fs";
import { authUser } from "../util/helper2.js";
import { generateToken } from "../util/generateToken.js";
import { linkSerialNo, linkSerialNoToCo } from "../util/helper4.js";

import { resetAccount } from "../util/helper5.js";

const authenticate = async (req, res, next) => {
  const { password } = req.body;
  if (authUser(password)) {
    return res.json({
      success: true,
      message: "",
      token: generateToken(password),
    });
  } else {
    return res.json({ success: false, message: "Invalid Password", token: "" });
  }
};

const fixError1 = async (req, res, next) => {
  const { serialNo, password } = req.body;

  const responseData = await resetAccount(serialNo, password);

  return res.json(responseData);
};

const fixError2 = async (req, res, next) => {
  const { serialNo, userName } = req.body;
  const config = { new: true, useFindAndModify: false };
  const filter = { serialNo: serialNo };
  const query1 = { userName: userName };
  const query2 = { userName: userName, userURL: userName };

  try {
    const result = await SerialNumber.find({ serialNo: serialNo });
    const resultUser = await User.find({ userName: userName });
    const messages = await Message.find(filter);

    if (result.length === 0) {
      res.json({
        success: false,
        message: "Mã Số Thẻ Không Có Trong Hệ Thống",
      });
      return;
    }

    if (resultUser.length > 0) {
      res.json({
        success: false,
        message: "Tên Truy Cập đã được chọn. Vui lòng chọn Tên Truy Cập khác",
      });
      return;
    }

    await SerialNumber.findOneAndUpdate(filter, query1, config);
    await Analytic.findOneAndUpdate(filter, query1, config);
    await UserEmail.findOneAndUpdate(filter, query1, config);
    await User.findOneAndUpdate(filter, query2, config);

    if (messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        const mess = messages[i];
        await Message.findByIdAndUpdate(mess._id, query1, config);
      }
    }

    res.json({
      success: true,
      message: `Tên truy cập đã được thay đổi. Đường link mới cho người dùng sẽ là: onthecard.me/${userName}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//6749848136342
//8374924236507
const fixError3 = async (req, res, next) => {
  const { meToCo } = req.body;
  let result;

  if (meToCo) {
    result = await linkSerialNoToCo(req.body);
  } else {
    result = await linkSerialNo(req.body);
  }

  return res.json(result);
};

const getErrorUserName = async (req, res, next) => {
  const companyName = "ADD Solutions Joint Stock Company";
  const bio =
    "ADD - đơn vị uy tín hàng đầu tại Việt Nam cung cấp giải pháp trọn gói và toàn diện cho bất kỳ khách hàng nào có nhu cầu mua xe ô tô.";
  const enterprise = new Enterprise({
    company: "addsovn",
    name: companyName,
    bio: bio,
    info: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const store = new Store({
    company: "addsovn",
    name: companyName,
    bio: bio,
    products: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  await enterprise.save();
  await store.save();

  res.json({ enterprise: enterprise, store: store });
};

const getFirebaseData = async (req, res, next) => {
  try {
    const MUST_SEE = "SEE COMMENT DOWN BELOW !!!";
    res.json({ success: true, message: MUST_SEE });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const backUpData = async (req, res, next) => {
  try {
    // const UserData = await User.find({});
    // const SerialNoData = await SerialNumber.find({});
    // const AnalyticData = await Analytic.find({});
    const TransactionData = await Transaction.find({});

    // fs.writeFileSync("data/UserData.json", JSON.stringify(UserData, null, 2));

    // fs.writeFileSync(
    //   "data/SerialNoData.json",
    //   JSON.stringify(SerialNoData, null, 2)
    // );

    // fs.writeFileSync(
    //   "data/AnalyticData.json",
    //   JSON.stringify(AnalyticData, null, 2)
    // );

    fs.writeFileSync(
      "data/TransactionData.json",
      JSON.stringify(TransactionData, null, 2)
    );

    res.json({ success: true, message: "" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const execute5and6 = async (req, res, next) => {
  const { userName, actionType } = req.body;
  const config = { new: true, useFindAndModify: false };

  try {
    const userData = await User.findOne({ userName: userName });
    let message = "";

    if (!userData) {
      return res.json({
        success: false,
        message: "Tên truy cập không có trong hệ thống",
      });
    }

    if (actionType === "grant") {
      await User.findByIdAndUpdate(userData._id, { isVerified: true }, config);
      message = `Cấp tích xanh cho tên truy cập [${userName}] thành công`;
    }

    if (actionType === "remove") {
      await User.findByIdAndUpdate(userData._id, { isVerified: false }, config);
      message = `Gỡ bỏ tích xanh cho tên truy cập [${userName}] thành công`;
    }

    res.json({ success: true, message: message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { fixError1, fixError2, getErrorUserName, fixError3 };
export { getFirebaseData, backUpData, authenticate, execute5and6 };
