// import FileSaver from "file-saver";
import { dump } from "./vCardHelper";
import {
  loadIcons,
  loadIconsBlack,
  loadIconsBlue,
  loadBank,
  loadBankBlack,
  loadBankBlue,
} from "./load_icons";
import * as api from "../api/api";
import * as api2 from "../api/api2";

import { getMapLink } from "./helper";

export const openLink = async (iconType, url, userName, token) => {
  const condition = !window.location.pathname.includes("/profile");
  switch (iconType) {
    case "mail":
      condition && api.linkClicked(url, userName, token);
      window.open("mailto:" + url);
      break;
    case "phoneNumber":
      condition && api.linkClicked(url, userName, token);
      window.location.href = "tel:" + url;
      break;
    case "hotline":
      condition && api.linkClicked(url, userName, token);
      window.location.href = "tel:" + url;
      break;
    case "bio":
      break;
    case "company":
      break;
    case "tax":
      break;
    case "position":
      break;
    case "calendar":
      break;
    case "map":
      condition && api.linkClicked(url, userName, token);
      window.open(getMapLink(url));
      break;
    case "whatsapp":
      condition && api.linkClicked(url, userName, token);
      window.open(`https://api.whatsapp.com/send?phone=+1${url}`);
      break;
    case "wechat":
      condition && api.linkClicked(url, userName, token);
      window.location.href = "tel:" + url;
      break;
    case "kakaotalk":
      condition && api.linkClicked(url, userName, token);
      window.location.href = "tel:" + url;
      break;
    default:
      condition && api.linkClicked(url, userName, token);
      try {
        window.open(url);
      } catch {
        alert("Please Try Again !");
      }
      break;
  }
};

export const redirectLink = async (iconType, url, data) => {
  switch (iconType) {
    case "mail":
      api2.b2bLinkClicked(data);
      window.open("mailto:" + url);
      break;
    case "phoneNumber":
      api2.b2bLinkClicked(data);
      window.location.href = "tel:" + url;
      break;
    case "hotline":
      api2.b2bLinkClicked(data);
      window.location.href = "tel:" + url;
      break;
    case "bio":
      break;
    case "company":
      break;
    case "tax":
      break;
    case "position":
      break;
    case "calendar":
      break;
    case "map":
      api2.b2bLinkClicked(data);
      window.open(getMapLink(url));
      break;
    default:
      try {
        api2.b2bLinkClicked(data);
        window.open(url);
      } catch {
        alert("Please Try Again !");
      }
      break;
  }
};

export function copyToClipboard(copyValue) {
  let stringCopied = document.createElement("textarea");

  stringCopied.value = copyValue;
  stringCopied.setAttribute("readonly", "");
  stringCopied.style = {
    position: "absolute",
    left: "-9999px",
    display: "none",
  };

  document.body.appendChild(stringCopied);
  stringCopied.select();
  document.execCommand("copy");

  document.body.removeChild(stringCopied);
}

export function getKeyString() {
  const fullUrl = window.location.href;
  const originUrl = window.location.origin;
  const subString = fullUrl.substring(originUrl.length, fullUrl.length);
  return subString;
}

export function downloadData(filename, data) {
  var blob = new Blob([dump(data)], {
    type: "text/vcard",
  });
  var a = document.createElement("a");
  a.download = filename;
  a.textContent = "textContent";
  a.href = URL.createObjectURL(blob);
  a.click();
  return a;
}

const colorList = [
  { default: "#e5e5ef", light: "#ffffff", dark: "#cccccc" },
  { default: "#282828", light: "#b3b3b3", dark: "#000000" },

  { default: "#ff646a", light: "#ffccce", dark: "#ff0008" },
  { default: "#fb7a1d", light: "#fdb581", dark: "#b04b03" },
  { default: "#ffb577", light: "#ffe3cc", dark: "#ff7300" },
  { default: "#d4ff00", light: "#f6ffcc", dark: "#95b300" },
  { default: "#01fe38", light: "#ccffd7", dark: "#019822" },
  { default: "#82fd89", light: "#e6ffe7", dark: "#1dfc28" },
  { default: "#00ffd4", light: "#ccfff6", dark: "#009980" },
  { default: "#ff94a7", light: "#FBCDD7", dark: "#ff3358" },
  { default: "#ff6785", light: "#ffccd6", dark: "#ff0033" },
  { default: "#ff00c3", light: "#ffccf3", dark: "#990075" },
  { default: "#00a4cf", light: "#ccf5ff", dark: "#005266" },
  { default: "#bc07fa", light: "#f2cdfe", dark: "#710396" },
  { default: "#6f07f8", light: "#e2cdfe", dark: "#430495" },
  { default: "#001eff", light: "#ccd2ff", dark: "#263c8e" },
];

export function getColorList() {
  return colorList;
}

export function getColorObject(defaultColor) {
  const colorObject = colorList.find((colorItem) => {
    return colorItem.default === defaultColor;
  });
  if (colorObject) {
    return colorObject;
  } else {
    return {
      default: colorList[0].default,
      light: colorList[0].light,
      dark: colorList[0].dark,
    };
  }
}

export function getColorObjectWithStyle(backgroundColor, backgroundStyle) {
  let colorObject;
  switch (backgroundStyle) {
    case "Minimal":
      return {
        default: colorList[0].default,
        light: colorList[0].light,
        dark: colorList[0].dark,
      };
    case "Light":
      colorObject = colorList.find((colorItem) => {
        return colorItem.light === backgroundColor;
      });
      return colorObject;
    case "Color":
      colorObject = colorList.find((colorItem) => {
        return colorItem.default === backgroundColor;
      });
      return colorObject;
    case "Dark":
      colorObject = colorList.find((colorItem) => {
        return colorItem.dark === backgroundColor;
      });
      return colorObject;
    default:
      return {
        default: colorList[0].default,
        light: colorList[0].light,
        dark: colorList[0].dark,
      };
  }
}

export function getCorrectColor(defaultColor, styleBackground) {
  const colorObject = colorList.find((colorItem) => {
    return colorItem.default === defaultColor;
  });
  const returnColorObject = colorObject || colorList[0];

  switch (styleBackground) {
    case "Minimal":
      return "#fff";
    case "Light":
      return returnColorObject.light;
    case "Color":
      return returnColorObject.default;
    case "Dark":
      return returnColorObject.dark;
    default:
      return returnColorObject.default;
  }
}

const noBlackTextColorStyle = [
  { default: "#282828", light: "#b3b3b3", dark: "#000000" },
  { default: "#bc07fa", light: "#f2cdfe", dark: "#710396" },
  { default: "#6f07f8", light: "#e2cdfe", dark: "#430495" },
  { default: "#001eff", light: "#ccd2ff", dark: "#001299" },

  { default: "#ff00c3", light: "#ffccf3", dark: "#990075" },
];
const noWhiteTextDarkStyle = [
  { default: "#e5e5ef", light: "#ffffff", dark: "#cccccc" },
];

export function detectNoBlackTextColor(colorObj) {
  const checker = colorObj === undefined ? false : true;
  if (checker) {
    const defaultColor = [];
    for (let count = 0; count < noBlackTextColorStyle.length; count++) {
      defaultColor.push(noBlackTextColorStyle[count].default);
    }
    return defaultColor.includes(colorObj.default);
  } else {
    return false;
  }
}

export function detectNoWhiteTextDark(colorObj) {
  const checker = colorObj === undefined ? false : true;
  if (checker) {
    const defaultColor = [];
    for (let count = 0; count < noWhiteTextDarkStyle.length; count++) {
      defaultColor.push(noWhiteTextDarkStyle[count].default);
    }
    return defaultColor.includes(colorObj.default);
  } else {
    return false;
  }
}

/*
  [
    { default: "#ff646a", light: "#ffccce", dark: "#ff0008" },
    { default: "#fb7a1d", light: "#fdb581", dark: "#b04b03" },
    { default: "#ffb577", light: "#ffe3cc", dark: "#ff7300" },
    { default: "#d4ff00", light: "#f6ffcc", dark: "#95b300" },
    { default: "#01fe38", light: "#ccffd7", dark: "#019822" },
    { default: "#82fd89", light: "#e6ffe7", dark: "#1dfc28" },
    { default: "#00ffd4", light: "#ccfff6", dark: "#009980" },
    { default: "#ff94a7", light: "#ffe6ea", dark: "#ff3358" },
    { default: "#ff6785", light: "#ffccd6", dark: "#ff0033" },
    { default: "#ff00c3", light: "#ffccf3", dark: "#990075" },
    { default: "#bc07fa", light: "#f2cdfe", dark: "#710396" },
    { default: "#a86cee", light: "#e4d1fa", dark: "#791be4" },
    { default: "#6f07f8", light: "#e2cdfe", dark: "#430495" },
    { default: "#001eff", light: "#ccd2ff", dark: "#001299" },
  ];

*/

export const generateSerialNo = () => {
  const serialNo = Date.now();
  const serialArray = [];
  for (let i = 0; i < 500; i++) {
    let serialNoLog;
    let fourTeenDigits = 10000000000000;
    // serialNo + i * 13;
    if (i % 2 === 0) {
      serialNoLog =
        fourTeenDigits -
        serialNo * 2 +
        i * 13 * Math.round(Math.random() * 1000);
    } else if (i % 5 === 0) {
      serialNoLog =
        fourTeenDigits -
        serialNo +
        i * 17 +
        Math.round(Math.random() * 1000) * Math.round(Math.random() * 1000);
    } else if (i % 7 === 0) {
      serialNoLog =
        serialNo +
        i * 21 -
        17 *
          Math.round(Math.random() * 1000) *
          Math.round(Math.random() * 1000);
    } else {
      serialNoLog =
        fourTeenDigits -
        serialNo * 3 +
        i *
          23 *
          Math.round(Math.random() * 1000) *
          Math.round(Math.random() * 1000);
    }
    serialArray.push(serialNoLog);
  }
  return serialArray;
};

export const getErrorObjectSignUp = (errors) => {
  let returnObject = {
    email: "",
    fullName: "",
    userName: "",
    serialNo: "",
    password: "",
    other: "",
  };
  if (errors) {
    if (errors.toLowerCase().includes("email")) {
      returnObject.email = errors;
    } else if (errors.toLowerCase().includes("tên của bạn")) {
      returnObject.fullName = errors;
    } else if (errors.toLowerCase().includes("full name")) {
      returnObject.fullName = errors;
    } else if (errors.toLowerCase().includes("tên truy cập")) {
      returnObject.userName = errors;
    } else if (errors.toLowerCase().includes("username")) {
      returnObject.userName = errors;
    } else if (errors.toLowerCase().includes("mã số thẻ")) {
      returnObject.serialNo = errors;
    } else if (errors.toLowerCase().includes("serial number")) {
      returnObject.serialNo = errors;
    } else if (errors.toLowerCase().includes("mật khẩu")) {
      returnObject.password = errors;
    } else if (errors.toLowerCase().includes("password")) {
      returnObject.password = errors;
    } else {
      returnObject.other = errors;
    }
  }
  return returnObject;
};

export const getErrorObjectSignIn = (errors) => {
  let returnObject = {
    email: "",
    password: "",
    other: "",
  };
  if (errors) {
    if (errors.toLowerCase().includes("email")) {
      returnObject.email = errors;
    } else if (errors.toLowerCase().includes("username")) {
      returnObject.email = errors;
    } else if (errors.toLowerCase().includes("tên truy cập")) {
      returnObject.email = errors;
    } else if (errors.toLowerCase().includes("mật khẩu")) {
      returnObject.password = errors;
    } else if (errors.toLowerCase().includes("password")) {
      returnObject.password = errors;
    } else {
      returnObject.other = errors;
    }
  }
  return returnObject;
};

export const loadDisplayIcon = (iconStyle, iconType) => {
  if (iconStyle === "Blue") {
    return loadIconsBlue(iconType);
  } else if (iconStyle === "Black") {
    return loadIconsBlack(iconType);
  } else {
    return loadIcons(iconType);
  }
};

export const loadBankIcon = (iconStyle, iconType) => {
  const icon = iconType.toLowerCase().split(" ")[0];
  if (iconStyle === "Blue") {
    return loadBankBlue(icon);
  } else if (iconStyle === "Black") {
    return loadBankBlack(icon);
  } else {
    return loadBank(icon);
  }
};
