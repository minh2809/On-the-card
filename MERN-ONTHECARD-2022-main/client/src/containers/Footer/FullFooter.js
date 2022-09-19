import React from "react";
import classes from "./FullFooter.module.css";
import logo from "../../assets/appicon.svg";
import { useSelector } from "react-redux";

const Footer = () => {
  const languageChosen = useSelector((state) => state.appLang);
  return (
    <div className={classes.footerContainer}>
      <div
        className={classes.logoContainer}
        onClick={() => {
          window.open("https://onthecard.vn");
        }}
      >
        <img src={logo} alt="" />
        <h3>ONTHECARD</h3>
      </div>
      <div>
        <p className={classes.leading}>
          {languageChosen.footer.smartCard} <br className={classes.break} />{" "}
          {languageChosen.footer.vietnam}
        </p>
      </div>
      {/* <div className={classes.socialMedia}>
        <a href="https://www.facebook.com/everythingis.onthecard/">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/onthecard/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://youtube.com/">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="https://www.linkedin.com/company/on-the-card/">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div> */}
      <div className={classes.socialMedia}>
        <a href="https://www.facebook.com/onthecardca">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/onthecard.ca/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://youtube.com/">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="https://www.linkedin.com/company/on-the-card/">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
