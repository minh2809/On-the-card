import nodemailer from "nodemailer";
import User from "../models/usersModel.js";
import { google } from "googleapis";

const sendEmail = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "onthecard.vn@gmail.com",
      pass: "Sgthotcon416",
    },
  });

  const contentObject =
    '<!DOCTYPE html><html> <head> <style> body { display: flex; width: 100vw !important; flex-direction: column; align-items: center; justify-content: center; font-family: Arial, Helvetica, sans-serif; } p { font-size: 1.25rem; font-weight: 600; width: auto; padding: 1vh 3vw; margin: 2vh 5vw; color: brown; } .imgContainer img { position: absolute; left: 30%; width: 40%; margin-top: 2vh; } span { color: #0275d8; font-weight: 800; } a { text-decoration: none; color: whitesmoke; } .button { width: 100vw; margin-left: 10vw; } .button a { background-color: #0275d8; color: white !important; padding: 1vh 3vw; cursor: pointer; border-radius: 5px; } .button a:hover { background-color: black; } @media only screen and (max-width: 600px) { .imgContainer img { position: absolute; left: 5vw; width: 90vw; margin-top: 2vh; } .button { width: 94vw; text-align: center; margin-left: auto; } p { font-size: 1rem; text-align: center; } } </style> </head> <body> <div> <p> Ra Mắt Sản Phẩm Mới Của <br /> <span>ONTHECARD</span> </p> <div class="button"> <a href="https://onthecard.vn/collections/all">Xem Sản Phẩm</a> </div> <a href="https://onthecard.vn/collections/all" class="imgContainer"> <img src="https://firebasestorage.googleapis.com/v0/b/trung-portfolio.appspot.com/o/personal%2F168492177_508462220563962_7444493063101489529_n.jpg?alt=media&token=f05ce2b7-138b-457d-99dd-918019da26e0" /> </a> </div> </body></html>';

  const mailOptions = {
    from: "noreplyemailon@gmail.com",
    to: "trung28899@gmail.com",
    subject: "Thông Báo Từ ONTHECARD",
    text: "",
    html: contentObject,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendToAll = async (req, res, next) => {
  try {
    const emailArray = [];
    const contentObject =
      '<!DOCTYPE html><html> <head> <style> body { display: flex; width: 100vw !important; flex-direction: column; align-items: center; justify-content: center; font-family: Arial, Helvetica, sans-serif; } p { font-size: 1.25rem; font-weight: 600; width: auto; padding: 1vh 3vw; margin: 2vh 5vw; color: brown; } .imgContainer img { position: absolute; left: 30%; width: 40%; margin-top: 2vh; } span { color: #0275d8; font-weight: 800; } a { text-decoration: none; color: whitesmoke; } .button { width: 100vw; margin-left: 10vw; } .button a { background-color: #0275d8; color: white !important; padding: 1vh 3vw; cursor: pointer; border-radius: 5px; } .button a:hover { background-color: black; } @media only screen and (max-width: 600px) { .imgContainer img { position: absolute; left: 5vw; width: 90vw; margin-top: 2vh; } .button { width: 94vw; text-align: center; margin-left: auto; } p { font-size: 1rem; text-align: center; } } </style> </head> <body> <div> <p> Ra Mắt Sản Phẩm Mới Của <br /> <span>ONTHECARD</span> </p> <div class="button"> <a href="https://onthecard.vn/collections/all">Xem Sản Phẩm</a> </div> <a href="https://onthecard.vn/collections/all" class="imgContainer"> <img src="https://firebasestorage.googleapis.com/v0/b/trung-portfolio.appspot.com/o/personal%2F168492177_508462220563962_7444493063101489529_n.jpg?alt=media&token=f05ce2b7-138b-457d-99dd-918019da26e0" /> </a> </div> </body></html>';

    /*
        user: "noreplyemailon@gmail.com",
        pass: "trungtrinh38",

        user: "onthecard.vn@gmail.com", 
        pass: "Sgthotcon416"
      
        user: "onthecardvn1@gmail.com", 
        pass: "Sgthotcon416"

        user: "onthecardvn2@gmail.com", 
        pass: "Sgthotcon416"

        user: "onthecardvn3@gmail.com", 
        pass: "Sgthotcon416"
      */

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "onthecardvn3@gmail.com",
        pass: "Sgthotcon416",
      },
    });
    console.log("sending Email...");
    const allUsers = await User.find();
    let counter = 0;

    /*
      Next Time Start With 2100 and send 2 request per email
      after that start with 2200
    */
    for (let i = 0; i < 50; i++) {
      emailArray.push(allUsers[i + 2050].email);
    }

    emailArray.map((value) => {
      const mailOptions = {
        from: "noreplyemailon@gmail.com",
        to: value,
        subject: "Thông Báo Từ ONTHECARD",
        text: "",
        html: contentObject,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          counter++;
          console.log(error);
          console.log(counter);
        } else {
          counter++;
          console.log("Email sent: " + info.response);
          console.log(counter);
        }
      });
    });

    res.json({ alertMsg: "All Done !!" });
  } catch (error) {
    console.log(error.message);
  }
};

const testGmail = async (req, res, next) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  const oAuthToClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuthToClient.setCredentials({ refresh_token: REFRESH_TOKEN });

  const sendMail = async () => {
    try {
      const accessToken = await oAuthToClient.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "onthecardvn2@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: "noreplyemailon@gmail.com",
        to: "trung28899@gmail.com",
        subject: "Thông Báo Từ ONTHECARD",
        text: "Hello Trung, Testing from Gmail",
        html: "<h1>bold text here</h1>",
      };

      const result = transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  sendMail()
    .then((result) => console.log("Email sent"))
    .catch((error) => console.log(error.message));

  res.json({ testing: "Testing Dawg !!" });
};

export { sendEmail, sendToAll, testGmail };
