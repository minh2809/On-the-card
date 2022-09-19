import User from "../models/usersModel.js";
import Analytic from "../models/analyticModel.js";
import Message from "../models/messageModel.js";
import { linkIncrement } from "../util/analyticHelper.js";
import { Vietnamese } from "../language/language.js";
import { sendEmailUser, sendEmailVisitor } from "../util/sendMail.js";
import { sortMessage } from "../util/helper.js";
import { getAdminMessage } from "../util/helper2.js";

const linkClicked = async (req, res, next) => {
  try {
    const { url, userName, dataObject } = req.body;

    if (userName === req.userName) {
      const analytic = await Analytic.find({ userName: userName });
      if (analytic.length > 0) {
        await linkIncrement(analytic, url, dataObject);
      }
    }

    res.json({ success: true, message: "" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addAccounts = async (req, res, next) => {
  try {
    const users = await User.find({});
    const currentTime = Date.now();

    for (let i = 0; i < users.length; i++) {
      const { serialNo, userName, socialMediaList } = users[i];
      const socialLinks = [];

      socialMediaList.forEach((value) => {
        if (value !== null) {
          socialLinks.push({ url: value.url, clickCount: 0 });
        }
      });

      const analytic = new Analytic({
        serialNo: serialNo,
        userName: userName,
        pageView: 0,
        redirectView: 0,
        links: socialLinks,
        latestTransactionNo: 0,
        createdAt: currentTime,
        updatedAt: currentTime,
      });

      await analytic.save();
    }

    res.json({ success: true, message: "" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAnalyticData = async (req, res, next) => {
  try {
    const analyticData = await Analytic.findOne({ userName: req.user });

    if (!analyticData) {
      return res.json({
        success: false,
        message: Vietnamese.fetchData.noAnalyticData,
        analyticData: {},
      });
    }

    return res.json({
      success: true,
      message: "",
      analyticData: analyticData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message, analyticData: {} });
  }
};

const sendMessage = async (req, res, next) => {
  const { fullName, email, phoneNumber, message, sendEmail } = req.body;
  const {
    userName,
    serialNo,
    email: userEmail,
    fullName: userFullName,
  } = req.user;
  try {
    const newMessage = new Message({
      userName: userName,
      serialNo: serialNo,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
      sendEmail: sendEmail,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const sanitizedUserEmail = userEmail.replace(/_/g, ".");
    await newMessage.save();
    await sendEmailUser(sanitizedUserEmail, userFullName, newMessage.fullName);

    if (sendEmail) {
      await sendEmailVisitor(userFullName, newMessage);
    }

    res.json({
      success: true,
      message: "",
    });
  } catch (error) {
    /* 
      Have to return true regardless due to the email sending
      is not very stable. Need to investigate further
    */
    const emailError = "invalid_grant";
    error.message.includes(emailError)
      ? res.json({
          success: true,
          message: "",
        })
      : res.json({
          success: false,
          message: `${Vietnamese.fetchData.errorHappened} (${error.message})`,
        });
  }
};

const messageActions = async (req, res, next) => {
  const { actionType, messageId } = req.body;

  try {
    const userData = await User.findOne({ userName: req.userName });

    // If admin but not the owner of the page view the message, It's still marked as unread
    if (actionType !== "update") {
      const messageData = await Message.findById(messageId);
      if (messageData.userName !== req.userName) {
        return res.json({
          success: false,
          message: `${Vietnamese.fetchData.errorHappened}`,
          messageData: {},
        });
      }
    }

    if (actionType === "read") {
      console.log("got in here");
      await Message.findByIdAndUpdate(
        messageId,
        { isRead: true, updatedAt: Date.now() },
        { new: true, useFindAndModify: false }
      );
    }

    if (actionType === "delete") {
      await Message.findByIdAndUpdate(
        messageId,
        { isDeleted: true, updatedAt: Date.now() },
        { new: true, useFindAndModify: false }
      );
    }

    if (actionType === "update") {
      const messages = await Message.find({
        userName: req.userName,
        isDeleted: false,
      });

      const messageData = await getAdminMessage(messages, userData);

      return res.json({
        success: true,
        message: "",
        messageData: sortMessage(messageData),
      });
    }

    return res.json({
      success: true,
      message: "",
      messageData: {},
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${Vietnamese.fetchData.errorHappened} (${error.message})`,
      messageData: {},
    });
  }
};

const lockActions = async (req, res, next) => {
  const { actionType } = req.body;
  try {
    if (actionType === "deactivate") {
      await User.findByIdAndUpdate(
        req.userID,
        { inactive: true, updatedAt: Date.now() },
        { new: true, useFindAndModify: false }
      );
    }

    if (actionType === "activate") {
      await User.findByIdAndUpdate(
        req.userID,
        { inactive: false, updatedAt: Date.now() },
        { new: true, useFindAndModify: false }
      );
    }

    res.json({
      success: true,
      message: "",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${Vietnamese.fetchData.errorHappened} (${error.message})`,
    });
  }
};

export { linkClicked, addAccounts, getAnalyticData };
export { sendMessage, messageActions, lockActions };
