import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBYmZ24qqHe1e0yh8TD94LKejwfrAT2sII",
  authDomain: "onthecard2021.firebaseapp.com",
  databaseURL: "https://onthecard2021-default-rtdb.firebaseio.com",
  projectId: "onthecard2021",
  storageBucket: "onthecard2021.appspot.com",
  messagingSenderId: "1008594664326",
  appId: "1:1008594664326:web:2035d0cf73e1e99e250a07",
  measurementId: "G-NJLCFTNKHY",
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.dataBase = firebase.database();
    this.storage = firebase.storage();
  }

  async login(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log("logged in"))
      .catch((err) => console.log(err));
  }

  logout() {
    return this.auth.signOut();
  }
  async backUpData(setDataBackUp, dataBackUp) {
    if (!dataBackUp) {
      this.dataBase
        .ref("/")
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          const returnData = { ...data, createdAt: new Date() };
          return JSON.stringify(returnData);
        })
        .then((data) => {
          return this.storage.ref("data/backUp.json").putString(data);
        })
        .then(() => {
          console.log("success");
          setDataBackUp(true);
        })
        .catch((err) => {
          console.log(err);
          setDataBackUp(true);
        });
    }
  }

  async removeAuthEmail(email, password, setProblemResolved, setIssue) {
    await this.login(email, password);
    const user = await firebase.auth().currentUser;
    console.log(user);

    if (user) {
      await user
        .delete()
        .then(function () {
          setProblemResolved(true);
        })
        .catch(function (error) {
          "Xảy ra vấn đề khi chữa lỗi. \n Nhân viên CSKH có thể yêu cầu khách hàng inbox vào Facebook Hỗ Trợ Kỹ Thuật với những thông tin sau: \n \n 1. Mã Số Thẻ \n 2. Email Đăng Ký \n 3. Miêu Tả Lỗi Kỹ Thuật \n Báo với khách là vấn đề sẽ được xử lý trước 8h tối cùng ngày";
        });
    } else {
      setIssue("Sai Email hoặc Mật Khẩu.");
      alert(
        "Sai Email hoặc Mật Khẩu. \n Nhân viên CSKH có thể thử lại một lần nữa. Nếu vẫn không được, yêu cầu khách hàng inbox vào Facebook Hỗ Trợ Kỹ Thuật với những thông tin sau: \n \n 1. Mã Số Thẻ \n 2. Email Đăng Ký \n 3. Miêu Tả Lỗi Kỹ Thuật \n Báo với khách là vấn đề sẽ được xử lý trước 8h tối cùng ngày"
      );
    }
  }
}

export default new Firebase();
