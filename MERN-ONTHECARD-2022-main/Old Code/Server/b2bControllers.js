import { getSHIROserials, readFileB2B } from "../util/b2bHelper.js";
import SerialNumber from "../models/serialNoModel.js";
import User from "../models/usersModel.js";
import UserEmail from "../models/userEmailModel.js";
import { Vietnamese } from "../language/language.js";

const registerTest = async (req, res, next) => {
  const dataArray = readFileB2B();

  res.send(dataArray);
};

/* ************************************************** */

const register2ndB2B = async (req, res, next) => {
  const B2B_EMAIL = "onthecard.vn@gmail.com";
  const B2B_BIO = "Thông Tin Cá Nhân";
  const B2B_USERNAME = "cpgroup";
  const dataArray = readFileB2B();
  const limit = dataArray.length + 55;
  let counter = 0;

  console.log(dataArray);

  try {
    for (let i = 55; i < limit; i++) {
      const serialNoRecord = await SerialNumber.find({
        serialNo: dataArray[counter].serialNo,
      });
      console.log(dataArray[counter].serialNo);
      const serialID = serialNoRecord[0]._id;
      const newCounter = i + 1;

      await SerialNumber.findByIdAndUpdate(
        serialID,
        {
          serialNo: dataArray[counter].serialNo,
          cardRegistered: true,
          email: B2B_EMAIL,
          userName: B2B_USERNAME + newCounter,
          userRegistered: true,
        },
        { new: true, useFindAndModify: false }
      );

      const newUserEmail = new UserEmail({
        email: B2B_EMAIL,
        serialNo: dataArray[counter].serialNo,
        userName: B2B_USERNAME + newCounter,
      });

      await newUserEmail.save();

      const newUser = new User({
        email: B2B_EMAIL,
        fullName: dataArray[counter].fullName,
        userName: B2B_USERNAME + newCounter,
        serialNo: dataArray[counter].serialNo,
        userNum: i,
        userURL: B2B_USERNAME + newCounter,
        bio: B2B_BIO,
      });

      await newUser.save();
      counter++;
    }
    res.json({ error: "", registered: dataArray });
  } catch (error) {
    res.json({
      error: Vietnamese.registerError + error.message,
      registered: false,
    });
  }
};

/* ************************************************** */

const registerB2B = async (req, res, next) => {
  const serialNumberArray = getSHIROserials();
  const counter = 1;
  const SHIRO_EMAIL = "leicester.watches@gmail.com";
  const SHIRO_USERNAME = "leicester_watches";
  const SHIRO_FULLNAME = "Leicester Watches";
  const SHIRO_BIO = "Thông Tin Cá Nhân";

  try {
    for (let i = 0; i < serialNumberArray.length; i++) {
      const serialNoRecord = await SerialNumber.find({
        serialNo: serialNumberArray[i],
      });
      const serialID = serialNoRecord[0]._id;
      const newCounter = counter + i;

      await SerialNumber.findByIdAndUpdate(
        serialID,
        {
          serialNo: serialNumberArray[i],
          cardRegistered: true,
          email: SHIRO_EMAIL,
          userName: SHIRO_USERNAME + newCounter,
          userRegistered: true,
        },
        { new: true, useFindAndModify: false }
      );

      const newUserEmail = new UserEmail({
        email: SHIRO_EMAIL,
        serialNo: serialNumberArray[i],
        userName: SHIRO_USERNAME + newCounter,
      });

      await newUserEmail.save();

      const newUser = new User({
        email: SHIRO_EMAIL,
        fullName: SHIRO_FULLNAME,
        userName: SHIRO_USERNAME + newCounter,
        serialNo: serialNumberArray[i],
        userNum: i,
        userURL: SHIRO_USERNAME + newCounter,
        bio: SHIRO_BIO,
      });

      await newUser.save();
    }
    res.json({ error: "", registered: true });
  } catch (error) {
    res.json({
      error: Vietnamese.registerError + error.message,
      registered: false,
    });
  }
};

/* ************************************************** */

const b2bCorrection = async (req, res, next) => {
  console.log("Correcting...");
  const serialNumberArray = getSHIROserials();
  const SHIRO_BIO = "Thông Tin Cá Nhân";

  try {
    for (let i = 0; i < serialNumberArray.length; i++) {
      const serialNoRecord = await User.find({
        serialNo: serialNumberArray[i],
      });
      const serialID = serialNoRecord[0]._id;
      await User.findByIdAndUpdate(
        serialID,
        {
          bio: SHIRO_BIO,
        },
        { new: true, useFindAndModify: false }
      );
    }
    res.json({ error: "", registered: true });
  } catch (error) {
    res.json({
      error: Vietnamese.registerError + error.message,
      registered: false,
    });
  }
};

export { registerB2B, b2bCorrection, register2ndB2B, registerTest };
