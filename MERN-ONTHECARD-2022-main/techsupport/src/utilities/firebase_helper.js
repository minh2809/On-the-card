import firebase from "../firebase";
import { validateUserName } from "./helper_functions";

export const firebaseCheckSerialNo = (serialNo, setIssue) => {
  firebase.dataBase
    .ref("serialNo/" + serialNo)
    .once("value")
    .then((snapshot) => {
      let value = snapshot.val();
      if (!value) {
        setIssue("Mã số thẻ không đúng");
        alert(
          "Mã số thẻ không đúng. Nhân viên CSKH có thể thử lại một lần nữa. Nếu vẫn không được, yêu cầu khách hàng inbox vào Facebook Hỗ Trợ Kỹ Thuật với những thông tin sau: \n \n 1. Mã Số Thẻ \n 2. Email Đăng Ký \n 3. Miêu Tả Lỗi Kỹ Thuật \n Báo với khách là vấn đề sẽ được xử lý trước 8h tối cùng ngày"
        );
        window.location.replace("/");
      } else if (!value.userRegistered) {
        setIssue("Mã số thẻ chưa được đăng ký");
        alert(
          "Mã số thẻ chưa được đăng ký. Nhân viên CSKH có thể thử lại một lần nữa. Nếu vẫn không được, yêu cầu khách hàng inbox vào Facebook Hỗ Trợ Kỹ Thuật với những thông tin sau: \n \n 1. Mã Số Thẻ \n 2. Email Đăng Ký \n 3. Miêu Tả Lỗi Kỹ Thuật \n Báo với khách là vấn đề sẽ được xử lý trước 8h tối cùng ngày"
        );
        window.location.replace("/");
      }
    });
};

export const firebaseCheckUserName = (userName, setIssue) => {
  if (validateUserName(userName)) {
    firebase.dataBase
      .ref("users/" + userName)
      .once("value")
      .then((snapshot) => {
        let value = snapshot.val();
        if (value) {
          setIssue("Tên truy cập đã được lấy. Vui lòng chọn tên truy cập khác");
          alert("Tên truy cập đã được lấy. Vui lòng chọn tên truy cập khác");
          window.location.replace("/");
        }
      });
  }
};

// Function for 2nd Issue
export const assignNewUserName = (
  serialNo,
  newUserName,
  setProblemResolved
) => {
  firebase.dataBase
    .ref("serialNo/" + serialNo)
    .once("value")
    .then((snapshot) => {
      // Get username from provided serial No
      let userName, userEmail;
      if (snapshot.val()) {
        userName = snapshot.val().userName;
        userEmail = snapshot.val().email;
      }
      return { userName, userEmail };
    })
    .then((data) => {
      firebase.dataBase
        .ref("users/" + data.userName)
        .once("value")
        .then((snapshot) => {
          // Get data from previous user name
          let dataObject = snapshot.val();
          // Assign data to new user name
          if (newUserName && validateUserName(newUserName) && dataObject) {
            firebase.dataBase
              .ref("users/" + newUserName)
              .once("value")
              .then((snapshot) => {
                // Check if there is an existing user
                let val = snapshot.val();
                // If no Assign data to new user name
                if (!val && validateUserName(newUserName)) {
                  firebase.dataBase.ref("users/" + newUserName).set({
                    ...dataObject,
                    userName: newUserName,
                    userURL: newUserName,
                  });
                }
              });
          }
        })
        .then(() => {
          // Assigning new user name to userEmail
          if (data.userEmail && validateUserName(newUserName)) {
            firebase.dataBase
              .ref("users/" + newUserName)
              .once("value")
              .then((snapshot) => {
                // Check if there is an existing user
                let val = snapshot.val();
                // If no Assign data to new user name
                if (!val) {
                  firebase.dataBase.ref("userEmail/" + data.userEmail).update({
                    userName: newUserName,
                  });
                }
              });
          }
        })
        .then(() => {
          if (serialNo && validateUserName(newUserName)) {
            firebase.dataBase
              .ref("users/" + newUserName)
              .once("value")
              .then((snapshot) => {
                // Check if there is an existing user
                let val = snapshot.val();
                // If no Assign data to new user name
                if (!val) {
                  firebase.dataBase.ref("serialNo/" + serialNo).update({
                    userName: newUserName,
                  });
                }
              });
          }
          setProblemResolved(true);
        });
    });
};

// Key Function for 3rd issue
export const resetSerialNo = (serialNo, setProblemResolved) => {
  firebase.dataBase
    .ref("serialNo/" + serialNo)
    .once("value")
    .then((snapshot) => {
      // Get username from provided serial No
      let userName, userEmail;
      if (snapshot.val()) {
        userName = snapshot.val().userName;
        userEmail = snapshot.val().email;
      }
      return { userName, userEmail };
    })
    .then((data) => {
      if (data.userName) {
        firebase.dataBase.ref("users/" + data.userName).set(null);
      }
      return data;
    })
    .then((data) => {
      if (data.userEmail) {
        firebase.dataBase.ref("userEmail/" + data.userEmail).set(null);
      }
    })
    .then(() => {
      if (serialNo) {
        firebase.dataBase.ref("serialNo/" + serialNo).update({
          userName: "",
          userRegistered: false,
          cardRegistered: true,
          email: "",
        });
      }
      return setProblemResolved(true);
    });
};
