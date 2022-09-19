import { getDataFromExcel } from "../util/helper2.js";
import { registerUserHelper } from "../util/helper3.js";
import SerialNumber from "../models/serialNoModel.js";
import { resetAccount } from "../util/helper5.js";
import User from "../models/usersModel.js";
import Store from "../models/storeModel.js";
import Enterprise from "../models/enterpriseModel.js";
import StoreAnalytic from "../models/storeAnalyticModel.js";
import CompanyAnalytic from "../models/companyAnalyticModel.js";

// Controller to register Company Page and Store Page
const registerStoreAndCompany = async (req, res, next) => {
  const config = {
    company: "infinity_assets_vn",
    pageView: 0,
    latestTransactionNo: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const storeConfig = {
    company: "infinity_assets_vn",
    isCompany: true,
    name: "Infinity Assets",
    products: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const companyConfig = {
    company: "infinity_assets_vn",
    name: "Infinity Assets",
    info: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const store = new Store(storeConfig);
  const enterprise = new Enterprise(companyConfig);

  const enterpriseAnalytic = new CompanyAnalytic(config);
  const storeAnalytic = new StoreAnalytic(config);

  await enterpriseAnalytic.save();
  await storeAnalytic.save();

  await store.save();
  await enterprise.save();

  res.json({ success: true });
};

// Controller to register bulk users for B2B clients
// Setting up users for Dien Nuoc Gia Dinh
const registerBulkUsers = async (req, res, next) => {
  const fileLocation2 = "data/B2BClients/infinity_asset.xlsx";
  const serialData = getDataFromExcel(fileLocation2);

  for (let i = 0; i < serialData.length; i++) {
    const { email, serialNo } = serialData[i];

    const userName = i === 0 ? "infinity_assets" : `infinity_assets${i + 1}`;

    const paramsObject = {
      email: email,
      userName: userName,
      serialNo: serialNo,
      password: "admin123",
      company: "infinity_assets_vn",
    };

    const result = await registerUserHelper(paramsObject);

    if (!result.registered) {
      return res.json(result);
    }
  }

  return res.json({
    success: true,
    userData: serialData,
  });
};

// Controller to setup partner for serial numbers - BPRO
// Serial number will be registered by user and will have the correct company and partner name
const setUpPartnerSerialNo = async (req, res, next) => {
  const fileLocation = "data/B2BClients/25fit_noname.xlsx";
  const dataFromExcel = getDataFromExcel(fileLocation);
  const serialNoList = [];

  for (let i = 0; i < dataFromExcel.length; i++) {
    const currentSerial = dataFromExcel[i].SerialNo;
    serialNoList.push(currentSerial);

    await SerialNumber.findOneAndUpdate(
      { serialNo: currentSerial },
      { partner: "25fit_vietnam" },
      { new: true, useFindAndModify: false }
    );
  }

  return res.json({
    success: true,
    data: serialNoList,
    dataLength: serialNoList.length,
  });
};

export { setUpPartnerSerialNo, registerBulkUsers };
export { registerStoreAndCompany };

/*
const userData = await User.findOne({ serialNo: serialData[i].serialNo });

if (!userData) {
      const userName = `25fitkol22${27 + i}`;
      const email = `25fitkol22${27 + i}@gmail.com`;

      const paramsObject = {
        email: email,
        fullName: serialData[i].name,
        userName: userName,
        serialNo: serialData[i].serialNo,
        password: "admin123",
        company: "25fitkol_vn",
      };

      const result = await registerUserHelper(paramsObject);

      if (!result.registered) {
        return res.json(result);
      }
    }

const registerBulkUsers = async (req, res, next) => {
  const fileLocation = "data/B2BClients/tancang.xlsx";
  const dataFromExcel = getDataFromExcel(fileLocation);

  for (let i = 0; i < dataFromExcel.length; i++) {
    const { email, name, serialNo } = dataFromExcel[i];

    const userName = i === 0 ? "tancang" : `tancang${i + 1}`;

    const paramsObject = {
      email: email,
      fullName: name,
      userName: userName,
      serialNo: serialNo,
      password: "admin123",
      company: "25fitkol_vn",
    };

    const result = await registerUserHelper(paramsObject);

    if (!result.registered) {
      return res.json(result);
    }
  }

  return res.json({ success: true, data: dataFromExcel });
};




*/
