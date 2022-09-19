import SerialNumber from "../models/serialNoModel.js";
import { Vietnamese } from "../language/language.js";
import { generateToken } from "../util/generateToken.js";

const addSerialNo = async (req, res, next) => {
  const { serialArray } = req.body;
  const addedSerial = [];
  try {
    for (let i = 0; i < serialArray.length; i++) {
      const record = await SerialNumber.find({ serialNo: serialArray[i] });
      const condition =
        record.length > 0 || serialArray[i].toString().length !== 13;

      if (condition) {
        continue;
      }

      const number = new SerialNumber({
        serialNo: serialArray[i].toString(),
        cardRegistered: false,
        email: "",
        userName: "",
        userRegistered: false,
      });
      await number.save();
      addedSerial.push(serialArray[i]);
    }
    addedSerial.length === 0
      ? res.json({
          success: false,
          message: "",
          error: addedSerial.length + Vietnamese.addSerialNo.success,
        })
      : res.json({
          success: true,
          message: addedSerial.length + Vietnamese.addSerialNo.success,
          error: "",
        });
  } catch (err) {
    res.json({
      success: false,
      message: "",
      error: Vietnamese.addSerialNo.error + error.message,
    });
  }
};

const fetchByAmount = async (req, res, next) => {
  const { amount } = req.body;

  try {
    const records = await SerialNumber.find({
      cardRegistered: false,
      userRegistered: false,
    }).limit(parseInt(amount));
    records.length > 0
      ? res.json({
          success: true,
          serialArray: records,
          error: "",
          token: generateToken(records[0].serialNo),
        })
      : res.json({
          success: false,
          serialArray: [],
          error: Vietnamese.addSerialNo.pleaseAdd,
          token: "",
        });
  } catch (error) {
    res.json({
      success: true,
      serialArray: records,
      error: Vietnamese.addSerialNo.errorFetch + " " + error.message,
      token: "",
    });
  }
};

const registerSerial = async (req, res, next) => {
  const { serialArray } = req.body;
  let counter = 0;
  try {
    for (let i = 0; i < serialArray.length; i++) {
      await SerialNumber.findByIdAndUpdate(
        serialArray[i]._id,
        { cardRegistered: true, takenAt: Date.now() },
        { new: true, useFindAndModify: false }
      );
      counter++;
    }
    res.json({
      success: true,
      message: Vietnamese.addSerialNo.registerSuccess + counter + " mã số thẻ",
    });
  } catch (error) {
    res.json({
      success: false,
      message: Vietnamese.addSerialNo.registerError + error.message,
    });
  }
};

const fetchSerialData = async (req, res, next) => {
  try {
    const totalRecords = await SerialNumber.find();
    const notRegistered = await SerialNumber.find({
      cardRegistered: false,
      userRegistered: false,
    });
    const otcRegistered = await SerialNumber.find({
      cardRegistered: true,
      userRegistered: false,
    });
    const inUse = await SerialNumber.find({
      cardRegistered: true,
      userRegistered: true,
    });
    res.json({
      success: true,
      data: {
        total: totalRecords.length,
        notRegistered: notRegistered.length,
        otcRegistered: otcRegistered.length,
        inUse: inUse.length,
      },
      error: "",
    });
  } catch (error) {
    res.json({
      success: true,
      data: {
        total: 0,
        notRegistered: 0,
        otcRegistered: 0,
        inUse: 0,
      },
      error: Vietnamese.addSerialNo.errorFetchData + error.message,
    });
  }
};

export { addSerialNo, fetchByAmount, registerSerial, fetchSerialData };
