import React, { useState } from "react";
import classes from "./LinkBoxB2B.module.css";

const LinkBoxB2B = (props) => {
  const { desktopPreview } = props;

  const LinkBoxStyle = [classes.LinkBox];
  const pStyle = [classes.p];

  const pandoraLogo =
    "https://firebasestorage.googleapis.com/v0/b/onthecardimage.appspot.com/o/images%2Fmai.pham%40norbreeze.com%2Fnor.png?alt=media&token=3ce24918-431e-4017-ae1b-7fb6625fb2fd";

  const [open, setOpen] = useState(false);

  if (desktopPreview) {
    LinkBoxStyle.push(classes.LinkBoxPreview);
    pStyle.push(classes.pPreview);
  }

  const clickHandler = () => {
    setOpen(!open);
  };

  let returnObject = (
    <div className={LinkBoxStyle.join(" ")}>
      <div className={classes.topperContainer} onClick={clickHandler}>
        <div className={classes.socialIconWrapper}>
          <div className={classes.customImage}>
            <img
              src={pandoraLogo}
              alt="url"
              onError={(event) => {
                event.target.src = pandoraLogo;
              }}
            />
          </div>
        </div>
        <h2 className={classes.content}>
          <p className={pStyle.join(" ")}>Thông Tin Công Ty</p>
        </h2>
        <div className={open ? classes.directIconOpen : classes.directIcon}>
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
      {open && (
        <div className={classes.additionalInfo}>
          <div className={classes.infoContainer}>
            <h4>1. CÔNG TY TNHH QUẢN LÝ NBP (VN) </h4>
            <p>
              <span>Địa Chỉ</span>: Tầng 3, Tòa nhà W Building, 100 Nguyễn Thị
              Minh Khai, Phường Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh, Việt
              Nam
            </p>
            <br />
            <p>
              <span>Mã Số Thuế:</span> 0314027080
            </p>
            <p>
              <span>Số Điện Thoại: </span> (+84) 2871088171
            </p>
            <p>
              <span>Email:</span> pandoravn@norbreeze.com
            </p>
          </div>
          <div className={classes.infoContainer}>
            <h4>2. CÔNG TY TNHH BÁN LẺ NBP VN</h4>
            <p>
              <span>Địa Chỉ:</span> Tầng 3, tòa nhà W Building, số 100 Nguyễn
              Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh,
              Việt Nam
            </p>
            <br />
            <p>
              <span>Mã Số Thuế:</span> 0314057896
            </p>
            <p>
              <span>Số Điện Thoại:</span> (+84) 2871088171
            </p>
            <p>
              <span>Email:</span> pandoravn@norbreeze.vn
            </p>
          </div>
          <div className={classes.infoContainer}>
            <h4>3. CHI NHÁNH CÔNG TY TNHH BÁN LẺ NBP VN TẠI HÀ NỘI</h4>
            <p>
              <span>Địa Chỉ:</span> Tầng 12, Tòa nhà Hồng Hà Center, 25 Lý
              Thường Kiệt, Phường Phan Chu Trinh, Quận Hoàn Kiếm, TP. Hà Nội,
              Việt Nam
            </p>
            <br />
            <p>
              <span>Mã Số Thuế:</span> 0314057896 - 001
            </p>
            <p>
              <span>Số Điện Thoại:</span> (+84) 2871088171
            </p>
            <p>
              <span>Email:</span> pandoravn@norbreeze.vn
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return returnObject;
};

export default LinkBoxB2B;
