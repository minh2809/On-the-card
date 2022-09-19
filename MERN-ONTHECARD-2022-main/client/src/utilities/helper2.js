import pdf from "../assets/icon-raw/pdf.png";
import ppt from "../assets/icon-raw/ppt.png";
import sheets from "../assets/icon-raw/sheets.png";
import docs from "../assets/icon-raw/docs.png";

// condition in which the chosen account is a bank account
export const isBankAccount = (account) => {
  if (account.includes("bank")) {
    return true;
  }

  if (account.length === 3) {
    return true;
  }

  if (account.includes("bidv")) {
    return true;
  }

  if (account.includes("hsbc")) {
    return true;
  }

  if (account.includes("td")) {
    return true;
  }

  if (account.includes("cibc")) {
    return true;
  }

  return false;
};

// Use in EditProfile
export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

// Use in View.js, CustomizeBackground.js, CompanyMainPage.js, CompanyViewPage.js, HeaderBox.js
// MainPage.js, Footer.js, DesktopPreview.js, PreviewEnterprise.js, App.js, BackgroundImage.js
export const ADDSOClient = (company) => {
  switch (company) {
    case "addsovn":
      return true;
    case "wiladvn":
      return true;
    case "volvocars":
      return true;
    default:
      return false;
  }
};

// Load icon image for file extension
// Use in ./components/Modal/UploadFileModal/UploadFile.js
export const loadImage = (fileExt) => {
  if (fileExt.includes(".xlsx") || fileExt.includes(".xls")) {
    return sheets;
  } else if (fileExt.includes(".ppt") || fileExt.includes(".pptx")) {
    return ppt;
  } else if (fileExt.includes(".pdf")) {
    return pdf;
  } else {
    return docs;
  }
};

// Used to remove file extension > to get the file name only
// Use in ./components/Modal/UploadFileModal/UploadFile.js
export const removeExt = (fileName) => {
  const dotIndex = fileName.indexOf(".");
  if (dotIndex > 0) {
    return fileName.substring(0, dotIndex);
  }
  return fileName;
};

// Used in ./load_icons to load icons
export const getIconType = (fileName) => {
  const fileExt = fileName.substring(fileName.length - 5, fileName.length);

  if (fileExt.includes(".xlsx") || fileExt.includes(".xls")) {
    return "sheets";
  } else if (fileExt.includes(".ppt") || fileExt.includes(".pptx")) {
    return "ppt";
  } else if (fileExt.includes(".pdf")) {
    return "pdf";
  } else {
    return "docs";
  }
};

// Use in ./components/Modal/UploadFileModal/UploadFile.js
export const validExt = (extension) => {
  if (extension.includes(".xlsx") || extension.includes(".xls")) {
    return true;
  } else if (extension.includes(".ppt") || extension.includes(".pptx")) {
    return true;
  } else if (extension.includes(".pdf")) {
    return true;
  } else if (extension.includes(".doc") || extension.includes(".docx")) {
    return true;
  } else {
    return false;
  }
};

// device data for analytics
// ViewPage.js
export const getDeviceData = async () => {
  const dataObject = {
    deviceData: {
      screenWidth: window.screen.width + "px",
      screenHeight: window.screen.height + "px",
    },
  };

  return dataObject;
};

// Used in ./components/Boxes/HeaderBox.js
export const isPandora = (company) => {
  if (company === "pandora_vn") return true;
  return false;
};

// redirect route, used in FetchPage.js
// get route to a correct sign up page
export const getSignUpRoute = (partner) => {
  if (partner === "bpro_vietnam") return "/bpro/signup";
  if (partner === "25fit_vietnam") return "/25fitVN/signup";

  return "/signup";
};

export const isBProUser = (company) => {
  if (company === "bpro_vn") return true;
  return false;
};

/*
 Used in ./component/Boxes/LinkBox/NewLinkBox/NewLinkBox.js
 BPRO incident, view userName: trangle to understand more. 

 B2B link rendered but was not properly behave
*/
export const isB2BLink = (iconType) => {
  switch (iconType) {
    case "company":
      return true;
    case "tax":
      return true;
    case "bio":
      return true;
    case "calendar":
      return true;
    case "position":
      return true;
    default:
      return false;
  }
};

// Used in ./helper3.js
export const is25FitUser = (company) => {
  if (company === "25fit_vn") {
    return true;
  }

  return false;
};

// Used in ./ViewPage.js
export const isTanCan = (company) => {
  return company === "tancangsongthan";
};
