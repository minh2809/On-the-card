import SerialNumber from "../models/serialNoModel.js";
import User from "../models/usersModel.js";
import UserEmail from "../models/userEmailModel.js";
import UserNumber from "../models/userNumberModel.js";
import Analytic from "../models/analyticModel.js";

import { Vietnamese } from "../language/language.js";
import { firebaseSignUp, firebaseDelete } from "../util/helper.js";

// Function to register Users
// Used in accountControllers.js and b2bControllers
export const registerUserHelper = async (dataParams) => {
  const { email, fullName, userName, serialNo, password, company } = dataParams;
  const { socialMediaList } = dataParams;
  const companyName = company ? company : "";

  try {
    const userNumberID = "603a9762a5f4375dfcefdcf8";
    const serialNoRecord = await SerialNumber.find({ serialNo: serialNo });
    const userNumberRecord = await UserNumber.findById(userNumberID);
    const userNumber = userNumberRecord.value;
    const serialID = serialNoRecord[0]._id;
    const currentTime = Date.now();

    const resultFirebase = await firebaseSignUp(email, password, fullName);

    if (!resultFirebase.success) {
      return {
        error: Vietnamese.emailRegistered,
        registered: false,
      };
    }

    await SerialNumber.findByIdAndUpdate(
      serialID,
      {
        serialNo: serialNo,
        cardRegistered: true,
        email: email,
        userName: userName,
        userRegistered: true,
        registeredAt: currentTime,
      },
      { new: true, useFindAndModify: false }
    );

    const newUserEmail = new UserEmail({
      email: email,
      serialNo: serialNo,
      userName: userName,
    });

    const newAnalytics = new Analytic({
      serialNo: serialNo,
      userName: userName,
      createdAt: currentTime,
      updatedAt: currentTime,
    });

    await newUserEmail.save();

    const newUser = new User({
      email: email,
      fullName: fullName,
      userName: userName,
      serialNo: serialNo,
      company: companyName,
      userNum: userNumber,
      userURL: userName,
      bio: "",
      createdAt: currentTime,
      updatedAt: currentTime,
      socialMediaList: socialMediaList,
    });

    await newUser.save();

    await UserNumber.findByIdAndUpdate(
      userNumberID,
      {
        value: userNumber + 1,
        updatedAt: Date.now(),
      },
      { new: true, useFindAndModify: false }
    );

    await newAnalytics.save();

    return { error: "", registered: true };
  } catch (error) {
    try {
      await firebaseDelete(email, password);
    } catch (error) {
      console.log(error.message);
    }
    return {
      error: Vietnamese.registerError + error.message,
      registered: false,
    };
  }
};
