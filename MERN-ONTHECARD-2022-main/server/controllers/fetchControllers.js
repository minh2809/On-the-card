import User from "../models/usersModel.js";
import { Vietnamese } from "../language/language.js";
import LinkedSerialNo from "../models/linkedSerialModel.js";
import { fetchUserName, fetchSerialNo } from "../util/helper4.js";

const fetchBySerial = async (req, res, next) => {
  const result = await fetchSerialNo(req.body);
  return res.json(result);
};

const fetchByUserName = async (req, res, next) => {
  const result = await fetchUserName(req.body);
  return res.json(result);
};

const updateUserInfo = async (req, res, next) => {
  const { userInfo } = req.body;
  /* req.user is set in protect middleware */
  const verifiedUser = req.user;

  try {
    const userData = await User.find({ userName: verifiedUser.userName });
    if (userData.length > 0) {
      const id = verifiedUser._id;
      await User.findByIdAndUpdate(
        id,
        {
          ...userInfo,
          userName: verifiedUser.userName,
          userUrl: verifiedUser.userURL,
          _id: id,
          signInAt: userData[0].signInAt,
          updatedAt: Date.now(),
        },
        { new: true, useFindAndModify: false }
      );
      return res.json({ success: true, error: "" });
    }
    return res.json({
      success: false,
      error: Vietnamese.fetchData.notUploaded,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
    });
  }
};

const linkedSerial = async (req, res, next) => {
  const { serialNo } = req.body;
  try {
    const linkedSerial = await LinkedSerialNo.findOne({ serialNo: serialNo });

    if (!linkedSerial) {
      return res.json({
        linked: false,
        linkedTo: "",
        error: "",
      });
    }

    res.json({
      linked: true,
      linkedTo: linkedSerial.linkTo,
      error: "",
    });
  } catch (error) {
    return res.json({
      linked: false,
      linkedTo: "",
      error: Vietnamese.fetchData.errorHappens + error.message,
    });
  }
};

export { fetchBySerial, fetchByUserName, updateUserInfo };
export { linkedSerial };
