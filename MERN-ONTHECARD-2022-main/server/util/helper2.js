import Message from "../models/messageModel.js";
import XLSX from "xlsx";

export const authUser = (password) => {
  switch (password) {
    case "dumbo1999":
      return true;
    case "dumbotran99":
      return true;
    case "otcteam":
      return true;
    case "trevtrinh":
      return true;
    case "dukenguyen":
      return true;
    case "trungtrinh":
      return true;
    default:
      return false;
  }
};

export const errorTechSupport = (errorText) => {
  let returnError;
  switch (errorText) {
    case "Cannot read property 'email' of null":
      returnError = "Mã số thẻ không có trong hệ thống. Vui lòng thử lại";
      break;
    default:
      returnError = "Đã có lỗi xảy ra: " + errorText;
      break;
  }
  return returnError;
};

// Helper function in accountControllers.js
export const getB2BEmployee = (employee) => {
  const dataValue = [];
  employee.forEach((value) => {
    dataValue.push({
      serialNo: value.serialNo,
      fullName: value.fullName,
      userName: value.userName,
      isAdmin: value.isAdmin,
      isSuperAdmin: value.isSuperAdmin ? value.isSuperAdmin : false,
      avatar: value.avatarURL,
    });
  });
  return dataValue;
};

export const orderObject = (orderNumber, orderData, productData) => {
  return {
    serialNo: orderData.serialNo,
    userName: orderData.userName,
    company: orderData.company,
    isOrder: true,
    orderData: {
      orderNumber: orderNumber,
      productImage: productData.icon,
      productName: productData.title,
      price: productData.price,
      quantity: parseInt(orderData.quantity),
      address: orderData.address,
      productDescription: productData.description,
    },
    fullName: orderData.fullName,
    email: orderData.email,
    phoneNumber: orderData.number,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

// Used in accountControllers.js, analyticController.js
// This function will get all orders within a company for an admin
// If user is not an admin, return the passed messageData
export const getAdminMessage = async (messageData, userData) => {
  if (!userData.isAdmin) {
    return messageData;
  }
  const allOrders = await Message.find({
    company: userData.company,
    isOrder: true,
  });
  const orderNumber = [];
  const fullMessage = [];

  // merging 2 arrays and avoiding getting duplicated item from 2 array
  messageData.concat(allOrders).forEach((item) => {
    const orderNo = item.orderData.orderNumber || 0;
    if (!orderNumber.includes(orderNo)) {
      orderNumber.push(orderNo);
      fullMessage.push(item);
    }
  });

  return fullMessage;
};

// Use in b2bControllers.js
export const getDataFromExcel = (fileLocation) => {
  const workbook = XLSX.readFile(fileLocation);
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;
};
