import nodemailer from "nodemailer";
import { getTransportObj } from "../util/helper.js";
import { google } from "googleapis";

const sendEmailUser = async (recipientEmail, userFullName, fullName) => {
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
  const accessToken = await oAuthToClient.getAccessToken();

  const transportObj = getTransportObj(accessToken);
  const transporter = nodemailer.createTransport(transportObj);

  const mailOptions = {
    from: "ONTHECARD - Thẻ Cá Nhân Thông Minh",
    to: recipientEmail,
    subject: "Tin Nhắn Mới Từ ONTHECARD",
    text: `Xin Chào ${userFullName},

    Bạn có tin nhắn mới được gửi từ ${fullName} qua trang cá nhân ONTHECARD của bạn.

    Vui lòng đăng nhập trang ONTHECARD của bạn để xem tin nhắn này.

    Trang Đăng Nhập: onthecard.me/signin

    ONTHECARD xin chân thành cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi trong thời gian vừa qua.

Trân Trọng,
Đội ngũ nhân viên ONTHECARD

Website: https://onthecard.vn
Liên Lạc: 0383236087`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      counter++;
      console.log("Email sent: " + info.response);
    }
  });
};

const sendEmailVisitor = async (userFullName, messageObject) => {
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
  const accessToken = await oAuthToClient.getAccessToken();
  const transportObj = getTransportObj(accessToken);
  const transporter = nodemailer.createTransport(transportObj);

  const mailOptions = {
    from: "ONTHECARD - Thẻ Cá Nhân Thông Minh",
    to: messageObject.email,
    subject: `Tin Nhắn Mới Từ ${userFullName}`,
    text: `Chào ${messageObject.fullName},

    Đây là tin nhắn từ thẻ cá nhân thông minh ONTHECARD của ${userFullName}.

    Bạn có thể sử dụng đường link dưới đây để liên lạc với ${userFullName}:
    onthecard.me/${messageObject.userName}

Trân Trọng,
Đội ngũ nhân viên ONTHECARD

Website: https://onthecard.vn
Liên Lạc: 0383236087`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log(error);
      console.log("Error Happened");
    } else {
      counter++;
      console.log("Email sent: " + info.response);
    }
  });
};

const emailOrderUser = async (orderObject, userEmail, userFullName) => {
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
  const accessToken = await oAuthToClient.getAccessToken();
  const transportObj = getTransportObj(accessToken);
  const transporter = nodemailer.createTransport(transportObj);

  const { orderData, fullName } = orderObject;
  const { orderNumber, productName, price } = orderData;
  var nf = new Intl.NumberFormat();
  const formattedPrice = nf.format(price);

  const mailOptions = {
    from: "ONTHECARD - Thẻ Cá Nhân Thông Minh",
    to: userEmail,
    subject: `Đơn Hàng #${orderNumber} Từ Trang Cửa Hàng ONTHECARD`,
    text: `Xin Chào ${userFullName},

      Bạn có Đơn Hàng Mới từ trang cửa hàng ONTHECARD của bạn.

      Sau đây là thông tin về đơn hàng:

      *, Mã số đơn hàng: #${orderNumber}
      *, Tên Người Mua: ${fullName}
      *, Sản Phẩm: ${productName} - ${formattedPrice} VNĐ
      *, Số Luợng: ${orderData.quantity} sản phẩm

    Vui lòng đăng nhập tài khoản ONTHECARD của bạn để xem thêm thông tin về đơn hàng.

    Trang Đăng Nhập: onthecard.me/signin

    ONTHECARD xin chân thành cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi trong thời gian vừa qua.

  Trân Trọng,
  Đội ngũ nhân viên ONTHECARD

  Website: https://onthecard.vn
  Liên Lạc: 0383236087`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      counter++;
      console.log("Email sent: " + info.response);
    }
  });
};

const emailOrderPurchaser = async (orderObject, userFullName) => {
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
  const accessToken = await oAuthToClient.getAccessToken();
  const transportObj = getTransportObj(accessToken);
  const transporter = nodemailer.createTransport(transportObj);

  const { orderData, fullName, email } = orderObject;
  const { orderNumber, productName, price } = orderData;

  var nf = new Intl.NumberFormat();
  const formattedPrice = nf.format(price);

  const mailOptions = {
    from: "ONTHECARD - Thẻ Cá Nhân Thông Minh",
    to: email,
    subject: `Xác Nhận Đơn Hàng Mới`,
    text: `Xin Chào ${fullName},

      Bạn đã đặt hàng thành công trên trang cửa hàng ONTHECARD của ${userFullName}.

      Sau đây là email xác nhận thông tin đơn hàng của bạn:

      *, Mã số đơn hàng: #${orderNumber}
      *, Sản Phẩm: ${productName} - ${formattedPrice} VNĐ
      *, Số Luợng: ${orderData.quantity} sản phẩm
      *, Địa Chỉ Giao Hàng: ${orderData.address}
      *, Số Điện Thoại: ${orderObject.phoneNumber}

      Nếu có vấn đề hay câu hỏi về đơn hàng, bạn có thể truy cập đường link dưới đây để liên lạc với ${userFullName}:
      onthecard.me/${orderObject.userName}

  Trân Trọng,
  Đội ngũ nhân viên ONTHECARD

  Website: https://onthecard.vn
  Liên Lạc: 0383236087`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      counter++;
      console.log("Email sent: " + info.response);
    }
  });
};

export { sendEmailUser, sendEmailVisitor };
export { emailOrderUser, emailOrderPurchaser };

/*  ****************************  ENGLISH VERSION  **************************** */

// import nodemailer from "nodemailer";
// import { getTransportObj } from "../util/helper.js";
// import { google } from "googleapis";

// const sendEmailUser = async (recipientEmail, userFullName, fullName) => {
//   const CLIENT_ID = process.env.CLIENT_ID;
//   const CLIENT_SECRET = process.env.CLIENT_SECRET;
//   const REDIRECT_URI = process.env.REDIRECT_URI;
//   const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

//   const oAuthToClient = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
//   );
//   oAuthToClient.setCredentials({ refresh_token: REFRESH_TOKEN });
//   const accessToken = await oAuthToClient.getAccessToken();

//   const transportObj = getTransportObj(accessToken);
//   const transporter = nodemailer.createTransport(transportObj);

//   const mailOptions = {
//     from: "ONTHECARD - Digital Business Card",
//     to: recipientEmail,
//     subject: "New Message From ONTHECARD",
//     text: `Hello ${userFullName},

//     You have a new message sent from ${fullName} on your ONTHECARD page.

//     Please login to your ONTHECARD account to see this new message.

//     Login Url: onthecard.co/signin

//     Thank you for using ONTHECARD services. Please let us know if there is anything we can do to improve your ONTHECARD's experience.

// Regards,
// ONTHECARD Team

// Website: https://onthecard.ca
// Contact Information: https://onthecard.co/email`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       counter++;
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// const sendEmailVisitor = async (userFullName, messageObject) => {
//   const CLIENT_ID = process.env.CLIENT_ID;
//   const CLIENT_SECRET = process.env.CLIENT_SECRET;
//   const REDIRECT_URI = process.env.REDIRECT_URI;
//   const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
//   const oAuthToClient = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
//   );

//   oAuthToClient.setCredentials({ refresh_token: REFRESH_TOKEN });
//   const accessToken = await oAuthToClient.getAccessToken();
//   const transportObj = getTransportObj(accessToken);
//   const transporter = nodemailer.createTransport(transportObj);

//   const mailOptions = {
//     from: "ONTHECARD - Digital Business Card",
//     to: messageObject.email,
//     subject: `New Message from ${userFullName}`,
//     text: `Hello ${messageObject.fullName},

//     You have left a message for ${userFullName} on his/her ONTHECARD page.

//     We have provided ${userFullName}'s ONTHECARD page down below as requested.
//     onthecard.co/${messageObject.userName}

// Regards,
// ONTHECARD Team

// Website: https://onthecard.ca
// Contact Information: https://onthecard.co/email`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       counter++;
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// const emailOrderUser = async (orderObject, userEmail, userFullName) => {
//   const CLIENT_ID = process.env.CLIENT_ID;
//   const CLIENT_SECRET = process.env.CLIENT_SECRET;
//   const REDIRECT_URI = process.env.REDIRECT_URI;
//   const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
//   const oAuthToClient = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
//   );

//   oAuthToClient.setCredentials({ refresh_token: REFRESH_TOKEN });
//   const accessToken = await oAuthToClient.getAccessToken();
//   const transportObj = getTransportObj(accessToken);
//   const transporter = nodemailer.createTransport(transportObj);

//   const { orderData, fullName } = orderObject;
//   const { orderNumber, productName, price } = orderData;
//   var nf = new Intl.NumberFormat();
//   const formattedPrice = nf.format(price);

//   const mailOptions = {
//     from: "ONTHECARD - Digital Business Card",
//     to: userEmail,
//     subject: `Order #${orderNumber} From Your ONTHECARD's Store Page`,
//     text: `Hello ${userFullName},

//       You have a new order purchased from your ONTHECARD's store page. We have put the order information down below.

//       Order Information:

//       *, Order Number: #${orderNumber}
//       *, Purchaser Name: ${fullName}
//       *, Product Name: ${productName} - ${formattedPrice}$
//       *, Quantity: ${orderData.quantity} product(s)

//     Please login to your ONTHECARD account to see further order details.

//     Login Page: onthecard.co/signin

//     Thank you for using ONTHECARD services. Please let us know if there is anything we can do to improve your ONTHECARD's experience.

//   Regards,
//   ONTHECARD Team

//   Website: https://onthecard.ca
// Contact Information: https://onthecard.co/email`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       counter++;
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// const emailOrderPurchaser = async (orderObject, userFullName) => {
//   const CLIENT_ID = process.env.CLIENT_ID;
//   const CLIENT_SECRET = process.env.CLIENT_SECRET;
//   const REDIRECT_URI = process.env.REDIRECT_URI;
//   const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
//   const oAuthToClient = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
//   );

//   oAuthToClient.setCredentials({ refresh_token: REFRESH_TOKEN });
//   const accessToken = await oAuthToClient.getAccessToken();
//   const transportObj = getTransportObj(accessToken);
//   const transporter = nodemailer.createTransport(transportObj);

//   const { orderData, fullName, email } = orderObject;
//   const { orderNumber, productName, price } = orderData;

//   var nf = new Intl.NumberFormat();
//   const formattedPrice = nf.format(price);

//   const mailOptions = {
//     from: "ONTHECARD - Digital Business Card",
//     to: email,
//     subject: `Order Confirmation`,
//     text: `Hello ${fullName},

//       You have succesfully placed an order on ${userFullName}'s ONTHECARD store page.

//       We have provided the order details down below for your reference.

//       *, Order Number: #${orderNumber}
//       *, Product Name: ${productName} - ${formattedPrice} VNĐ
//       *, Quantity: ${orderData.quantity} product(s)
//       *, Shipping Address: ${orderData.address}
//       *, Phone Number: ${orderObject.phoneNumber}

//       If you have any questions or concerns regarding this order, please contact ${userFullName} with the link down below:
//       onthecard.co/${orderObject.userName}

//   Regards,
//   ONTHECARD Team

//   Website: https://onthecard.ca
//   Contact Information: https://onthecard.co/email`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       counter++;
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// export { sendEmailUser, sendEmailVisitor };
// export { emailOrderUser, emailOrderPurchaser };
