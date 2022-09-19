import User from "../models/usersModel.js";
import Enterprise from "../models/enterpriseModel.js";
import Store from "../models/storeModel.js";
import { Vietnamese } from "../language/language.js";
import CompanyAnalytic from "../models/companyAnalyticModel.js";
import StoreAnalytic from "../models/storeAnalyticModel.js";
import Transaction from "../models/transactionModel.js";
import { getAnalyticIncrement } from "../util/analyticHelper.js";
import Message from "../models/messageModel.js";
import { orderObject } from "../util/helper2.js";
import { emailOrderUser, emailOrderPurchaser } from "../util/sendMail.js";

const b2bIsAdmin = async (req, res, next) => {
  try {
    const { serialNo, isAdmin } = req.body;
    const config = { new: true, useFindAndModify: false };
    const filter = { serialNo: serialNo };

    await User.findOneAndUpdate(filter, { isAdmin: isAdmin }, config);
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

const updateEnterprise = async (req, res, next) => {
  const { enterpriseData, body } = req;
  const { enterpriseInfo } = body;

  try {
    await Enterprise.findByIdAndUpdate(
      enterpriseData._id,
      {
        ...enterpriseInfo,
        updatedAt: Date.now(),
      },
      { new: true, useFindAndModify: false }
    );

    return res.json({ success: true, error: "" });
  } catch (error) {
    return res.json({
      success: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
    });
  }
};

const updateStore = async (req, res, next) => {
  const { storeData, body } = req;
  const { storeInfo } = body;

  try {
    await Store.findByIdAndUpdate(
      storeData._id,
      {
        ...storeInfo,
        updatedAt: Date.now(),
      },
      { new: true, useFindAndModify: false }
    );

    return res.json({ success: true, error: "" });
  } catch (error) {
    return res.json({
      success: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
    });
  }
};

const pageViewIncrement = async (req, res, next) => {
  const { viewFrom, dataObject } = req.body;
  const { userName, serialNo, company } = req.userData;
  const { pageView, _id } = req.b2bPageData;
  const { links, latestTransactionNo } = req.b2bPageData;

  const config = { new: true, useFindAndModify: false };

  const updateInfo = {
    pageView: pageView + 1,
    latestTransactionNo: latestTransactionNo + 1,
    updatedAt: Date.now(),
  };

  const newTrans = new Transaction({
    serialNo: serialNo,
    userName: userName,
    pageView: pageView + 1,
    company: company,
    transType: "pageView",
    transFrom: viewFrom,
    links: links,
    transNo: latestTransactionNo + 1,
    createdAt: Date.now(),
    dataObject: dataObject,
  });

  try {
    if (viewFrom === "companyPage") {
      await CompanyAnalytic.findByIdAndUpdate(_id, updateInfo, config);
    }

    if (viewFrom === "storePage") {
      await StoreAnalytic.findByIdAndUpdate(_id, updateInfo, config);
    }

    await newTrans.save();

    return res.json({ success: true, error: "" });
  } catch (error) {
    return res.json({
      success: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
    });
  }
};

const linkClicked = async (req, res, next) => {
  const { viewFrom, url, dataObject } = req.body;
  const { userName, serialNo, company } = req.userData;
  const { pageView, _id } = req.b2bPageData;
  const { links, latestTransactionNo } = req.b2bPageData;
  const config = { new: true, useFindAndModify: false };

  const linksUpdated = getAnalyticIncrement(links, url);

  const updateInfo = {
    links: linksUpdated,
    latestTransactionNo: latestTransactionNo + 1,
    updatedAt: Date.now(),
  };

  const newTrans = new Transaction({
    serialNo: serialNo,
    userName: userName,
    pageView: pageView,
    company: company,
    transType: url,
    transFrom: viewFrom,
    links: linksUpdated,
    transNo: latestTransactionNo + 1,
    createdAt: Date.now(),
    dataObject: dataObject,
  });

  try {
    if (viewFrom === "companyPage") {
      await CompanyAnalytic.findByIdAndUpdate(_id, updateInfo, config);
    }

    if (viewFrom === "storePage") {
      await StoreAnalytic.findByIdAndUpdate(_id, updateInfo, config);
    }

    await newTrans.save();

    return res.json({ success: true, error: "" });
  } catch (error) {
    return res.json({
      success: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
    });
  }
};

const createOrder = async (req, res, next) => {
  const { orderData, productData } = req.body;

  try {
    const oldOrders = await Message.find({
      isOrder: true,
    });

    const orderNo = oldOrders ? oldOrders.length + 1 : 1;
    const orderNumber = 10000 + orderNo;
    const orderObj = orderObject(orderNumber, orderData, productData);

    const newOrder = new Message(orderObj);

    await newOrder.save();

    await emailOrderUser(newOrder, orderData.userEmail, orderData.userFullName);
    await emailOrderPurchaser(newOrder, orderData.userFullName);

    return res.json({
      success: true,
      error: "",
      orderDetails: { purchaserEmail: newOrder.email, orderNo: orderNumber },
    });
  } catch (error) {
    return res.json({
      success: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
    });
  }
};

const sendOrderNotes = async (req, res, next) => {
  const { messageID, message } = req.body;

  try {
    await Message.findByIdAndUpdate(
      messageID,
      {
        message: message,
        updatedAt: Date.now(),
      },
      { new: true, useFindAndModify: false }
    );

    return res.json({
      success: true,
      error: "",
    });
  } catch (error) {
    return res.json({
      success: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
    });
  }
};

export { b2bIsAdmin, updateEnterprise, updateStore };
export { pageViewIncrement, linkClicked, createOrder, sendOrderNotes };
