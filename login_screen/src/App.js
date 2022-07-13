import Wrapper from "./container/Wrapper/Wrapper"
import { useState } from "react";
import Image from "./components/ImageSection/ImageSection";
import logo1 from "./OTC logo 1.png";
import logo2 from "./Rectangle 1.png"
import Textarea from "./components/TextArea/TextArea";
import CheckBox from "./components/checkbox/CheckBox";
import Button from "./components/Button/Button";
import Icon from "./components/Icon/icon";
import { library } from "@fortawesome/fontawesome-svg-core"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import Text from "./components/text/text";
import Link from "./components/Link/link"


library.add(faEye, faEyeSlash);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordInputType, ToggleIcon] = Icon();

  const showEmail = () => {
    console.log({email})
    console.log({password})

  }

  return (
    <div className="App" >
      <Wrapper>
        <Image
          image={logo1}
          height="80px"
          width="200.59px"
          absolute
          top="4%"
          left="8%"
        />

        <Image image={logo2}
          height="100vh"
          absolute
          width="40%"
          top="0%"
          right="0%"
        />

        <Text
          content={"Phiên bản 1.0.0"}
          position="absolute"
          top="9%"
          left="45%"
          fontSize="17px"
          fontWeight="400"
          grey
        />

        <div className="login_container" style={{ display: "grid", position: "relative", top: "25%", left: "-18%", width: "380px", height: "60%" }}>

          <Text
            content={"Chào mừng bạn đến với ONTHECARD !"}
            lineHeight="40px"
            fontSize="30px"
            fontWeight="700"
            marginBottom="18px"
            position="absolute"
            lin
          />



          <Text
            content={"Email/Tên truy cập"}
            lineHeight="20px"
            fontSize="12px"
            fontWeight="700"
            marginBottom="4px"
            position="absolute"
            top="22%"
          />

          <Textarea
            rows={1}
            placeHolder="Email/tên truy cập"
            value={email}
            marginTop="-5px"
            setValue={setEmail}
            type="text"
            width="370px"
            position="absolute"
            top="28%"
            content="Địa chỉ email không đúng"
          />
          

          <Text
            content={"Mật khẩu"}
            lineHeight="20px"
            fontSize="12px"
            fontWeight="700"
            marginTop="10px"
            marginBottom="10px"
            position="absolute"
            top="38%"
          />

          <Textarea 
            rows={1}
            placeHolder="Nhập mật khẩu"
            value={password}
            setValue={setPassword}
            marginTop="-13px"
            type={PasswordInputType}
            width="370px"
            position="absolute"
            top="48%"
          />
          <span>{ToggleIcon}</span>


          <CheckBox />

          <Link
            content={"Quên mật khẩu?"}
            textDecoration="none"
            fontWeight="600"
            fontSize="14px"
            marginLeft="260px"
            blue
            position="absolute"
            top="58.5%"
          />

          <Button blue marginTop="25px" position="absolute" top="63%" width="370px" onClick={showEmail}>Đăng nhập</Button>

          <Button height="38px" flex white borderGrey marginTop="15px" position="absolute" top="77%" width="370px"><svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop: "-2px" }} viewBox="0 0 512 512" height="18" width="18"><path fill="#4285f4" d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"></path><path fill="#34a853" d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"></path><path fill="#fbbc02" d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"></path><path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"></path></svg><span style={{ marginLeft: "8px", marginTop: "-3px" }}>Tiếp tục với Google</span></Button>

          <Text content={"Chưa có tài khoản? Đăng kí"} position="absolute" top="95%" fontWeight="400" fontSize="14px" right="35%"> </Text>
          <Link content={"tại đây"} position="absolute" top="95%" right="22%" textDecoration="none" blue fontWeight="600"
            fontSize="14px"></Link>

        </div >

      </Wrapper>
    </div>
  );
}

export default App;
