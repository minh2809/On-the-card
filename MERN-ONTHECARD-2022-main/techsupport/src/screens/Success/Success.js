import React from "react";
import classes from "./Success.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Button from "@material-ui/core/Button";

const Success = ({ history }) => {
  const { loggedIn, successMessage } = useSelector((state) => state.appReducer);
  const { id } = useParams();
  const returnButton = () => {
    history.push("/mainscreen");
  };

  const trungNoti = () => {
    window.open("https://m.me/trung.trinh.336/");
  };

  // const dumboNoti = () => {
  //   window.open("https://www.facebook.com/dumbotrann");
  // };

  const { successPage, headerText, successText, headerH4 } = classes;
  const { buttonContainer } = classes;
  const onetothree = (
    <div className={successPage}>
      <h3 className={headerText}>Hỗ Trợ Thành Công !</h3>
      <h4 className={successText}>{successMessage}</h4>
      <div className={buttonContainer}>
        <Button variant="outlined" onClick={returnButton}>
          Quay Lại
        </Button>
      </div>
    </div>
  );
  const four = (
    <div className={successPage}>
      <h3 className={headerH4}>
        Báo khách hàng nhắn thông tin đến Facebook Hỗ Trợ Kỹ Thuật
      </h3>
      <a href="https://www.facebook.com/onthecard.hotro.9/">
        https://www.facebook.com/onthecard.hotro.9/
      </a>
      <h3 className={headerH4}>Với những thông tin sau: </h3>
      <p>1. Mã Số Thẻ</p>
      <p>2. Email Đăng Ký (nếu có)</p>
      <p>3. Miêu Tả Vấn Đề Kỹ Thuật</p>
      <h3>
        Vui lòng <span onClick={trungNoti}>Báo Trung</span> với tin nhắn: "Hỗ
        Trợ Kỹ Thuật"
      </h3>
      <h3>Vấn đề sẽ được xử lý sớm nhất có thể, trước 9h tối cùng ngày</h3>
      <Button variant="outlined" onClick={returnButton}>
        Quay Lại
      </Button>
    </div>
  );

  if (id.toString() === "4") {
    return four;
  } else if (
    (id.toString() === "1" ||
      id.toString() === "2" ||
      id.toString() === "3" ||
      id.toString() === "5") &&
    loggedIn
  ) {
    return onetothree;
  } else {
    history.push("/");
    return <div></div>;
  }
};

export default Success;
