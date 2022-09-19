import {
  firebaseCheckSerialNo,
  firebaseCheckUserName,
} from "./firebase_helper";

export const getProblemById = (id) => {
  switch (id.toString()) {
    case "1":
      return "Reset Thẻ Cho Khách Đăng Ký Từ Đầu";
    case "2":
      return "Đổi Tên Truy Cập";
    case "3":
      return "Liên kết POPON hoặc Thẻ Mới với Thẻ Cũ";
    case "5":
      return "Cấp Verified Sticker";
    case "6":
      return "Xoá Verified Sticker";
    case "7":
      return "Liên Kết Mã Số Thẻ .me Sang Mã Số Thẻ .co";
    default:
      return "Lỗi Khác";
  }
};

export const needUserName = (id) => {
  switch (id.toString()) {
    case "2":
      return true;
    default:
      return false;
  }
};

export const verifyStickerProblem = (id) => {
  switch (id.toString()) {
    case "5":
      return true;
    case "6":
      return true;
    default:
      return false;
  }
};

export const needPassword = (id) => {
  switch (id.toString()) {
    case "1":
      return true;
    default:
      return false;
  }
};

export const suggestedText = (id) => {
  switch (id.toString()) {
    case "1":
      return "Bạn có thể cho mình Mã Số Thẻ và Mật Khẩu Đăng Nhập của bạn được không ?";
    case "2":
      return "Bạn có thể cho mình mã số thẻ của bạn được không ? Cho mình tên truy cập mới mà bạn muốn. Tên truy cập mới phải viết liền, không được có dấu hoặc ký tự đặc biệt";
    case "3":
      return "Bạn có thể cho mình Mã Số Thẻ Cũ và Mã Số Thẻ / POPON Mới của bạn được không ? Mã Số Thẻ Mới phải chưa được đăng ký bởi người dùng. Nếu đã được đăng ký bởi người dùng, vui lòng reset MST Mới trước khi liên kết với MST cũ";
    case "5":
      return "Lấy Tên Truy Cập Của Người Dùng";
    case "6":
      return "Lấy Tên Truy Cập Của Người Dùng";
    case "7":
      return "Lấy Mã Số Thẻ Hệ Thống .me và .co. Trước khi chuyển MST vui lòng reset thẻ - Option 1";
    default:
      return "";
  }
};

export const validateSerialNo = (serialNo) => {
  const serialString = serialNo.toString();
  if (serialString.length === 13) {
    return true;
  } else {
    return false;
  }
};

export const validateUserName = (userName) => {
  if (userName.includes(".")) {
    return false;
  } else if (userName.includes("#")) {
    return false;
  } else if (userName.includes("$")) {
    return false;
  } else if (userName.includes("[")) {
    return false;
  } else if (userName.includes("]")) {
    return false;
  } else if (userName.includes("!")) {
    return false;
  } else if (userName.includes("/")) {
    return false;
  } else if (userName.includes(" ")) {
    return false;
  } else if (userName.length === 0) {
    return false;
  }
  return true;
};

export const FEValidation = (condition1, condition2) => {
  let message = "";
  if (!condition1) {
    message = "Mã số thẻ phải có 13 chữ số";
  } else if (!condition2) {
    message = "Tên truy cập phải viết liền, không dấu và không ký tự đặc biệt";
  }
  return message;
};

export const setErrorMessage = (
  validatedSerial,
  validatedUserName,
  setIssue,
  serialNo,
  userName
) => {
  const serialMsg = "Mã số thẻ phải bao gồm 13 chữ số";
  const usernameMsg =
    "Tên truy cập phải viết liền, không dấu và không ký tự đặc biệt";
  if (validatedSerial && !validatedUserName) {
    return setIssue(usernameMsg);
  } else if (!validatedSerial && !validatedUserName) {
    return setIssue(serialMsg);
  } else if (!validatedSerial && validatedUserName) {
    return setIssue(serialMsg);
  } else if (validatedSerial && validatedUserName) {
    firebaseCheckSerialNo(serialNo, setIssue);
    firebaseCheckUserName(userName, setIssue);
  }
};

export const getSuccess = (id) => {
  switch (id.toString()) {
    case "1":
      return "Vấn đề đã được xử lý. Khách hàng có thể đăng nhập và dùng thẻ bình thường";
    case "2":
      return "Tên truy cập đã được cập nhật. Khách hàng có thể Đăng Nhập và dùng thẻ bình thường.";
    default:
  }
};
