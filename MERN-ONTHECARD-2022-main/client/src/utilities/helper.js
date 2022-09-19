// import * as api from "../api/api2";

const specialButtons = ["tiktok", "ig", "fb"];

export const specialUsers = (userName, company) => {
  if (specialButtons.includes(userName)) {
    return true;
  }
  if (company === "pandora_vn") {
    return true;
  }
  return false;
};

export const IGFB = (userName) => {
  if (userName === "IG") {
    return (window.location.href = "https://onthecard.me/ig");
  }
  if (userName === "FB") {
    return (window.location.href = "https://onthecard.me/fb");
  }
  return null;
};

// Use when change user's full Name in BasicInfo.js
export const changeClientData = (client, serialNo, fullName) => {
  const { serialArray } = client;
  if (serialArray.length === 0) {
    return { clientName: "", serialArray: [] };
  }

  const userChosen = serialArray.find((value) => value.serialNo === serialNo);
  const index = serialArray.indexOf(userChosen);
  serialArray[index] = { ...userChosen, fullName: fullName };
};

// use in UI/Boxes/LinkBox/LinkBoxPermission/LBPermission.js
export const changeAdmin = (client, serialNo, isAdmin) => {
  const { serialArray } = client;
  if (serialArray.length === 0) {
    return false;
  }

  const userChosen = serialArray.find((value) => value.serialNo === serialNo);
  const index = serialArray.indexOf(userChosen);
  serialArray[index] = { ...userChosen, isAdmin: isAdmin };
  return true;
};

// use in ./helper_functions
export const getMapLink = (address) => {
  const formatAddress = address.replaceAll(" ", "+");
  const mapLink = "https://www.google.ca/maps?daddr=" + formatAddress;
  return mapLink;
};

// User in ./components/Message/NoteOrder.js
export const getOrderNote = (orderData, dateObject, textEntered, orderNote) => {
  const { date, weekDay, timeInDay } = dateObject;
  const { message } = orderData;
  const noteHeader = `\n\n-------------------------\n${orderNote}:`;
  let headerNote = `${noteHeader} \n\n[${weekDay}, ${date}, ${timeInDay}]: \n${textEntered}`;
  let partialNote = `\n\n[${weekDay}, ${date}, ${timeInDay}]: \n${textEntered}`;

  if (message.includes("-------------------------")) {
    const indexHeader = noteHeader.length;
    const previousMsg = message.substring(indexHeader, message.length);
    const fullMessage = noteHeader + partialNote + previousMsg;

    return fullMessage;
  } else {
    return headerNote;
  }
};

// User in ./components/Message/NoteOrder.js
export const getNewMsgArray = (orderId, newNote, msgArray) => {
  const orderUpdate = msgArray.find((value) => value._id === orderId);
  orderUpdate.message = newNote;
};

// Used in ./components/UI/Modal/Embedded/Instagram/InstaModal.js
export const validateInstaPost = (url) => {
  const condition =
    url.includes("https://instagr.am/p/") ||
    url.includes("https://instagr.am/reel/") ||
    url.includes("https://instagr.am/tv/") ||
    url.includes("https://www.instagram.com/p/") ||
    url.includes("https://www.instagram.com/reel/") ||
    url.includes("https://www.instagram.com/tv/");
  if (condition) {
    return true;
  }
  return false;
};

// Used in ./components/UI/Modal/Embedded/Tiktok/TiktokModal.js
export const validateTiktokVideo = (url) => {
  const condition =
    url.includes("https://www.tiktok.com/") && url.includes("/video/");
  if (condition) {
    return true;
  }
  return false;
};

/*
  Used in ./components/Boxes/LinkBox/NewLinkBox/TiktokPost/TiktokPost.js

  example video link: 
  https://www.tiktok.com/@blancobun/video/6997108424156646662

  id is 19 digits long
*/
export const getVideoIDByLink = (url) => {
  const indexStart = url.indexOf("/video/") + 7;
  const videoId = url.substring(indexStart, indexStart + 19);
  return videoId;
};

// used in ./components/UI/DropDownList/DropDownList.js
export const isVietBank = (key) => {
  switch (key) {
    case "abbank":
      return true;
    case "acb":
      return true;
    case "bidv":
      return true;
    case "eximbank":
      return true;
    case "hdbank":
      return true;
    case "mbbank":
      return true;
    case "msb":
      return true;
    case "ocb":
      return true;
    case "sacombank":
      return true;
    case "saigon":
      return true;
    case "shb":
      return true;
    case "techcombank":
      return true;
    case "tpbank":
      return true;
    case "vib":
      return true;
    case "vietcombank":
      return true;
    case "vietinbank":
      return true;
    case "vpbank":
      return true;
    default:
      return false;
  }
};

// used in ./components/UI/DropDownList/DropDownList.js, LinkBoxEdit.js, NewLinkBox/DropDown/DropDownBank.js
export const isCABank = (key) => {
  switch (key) {
    case "bmo":
      return true;
    case "desjardins":
      return true;
    case "hsbc":
      return true;
    case "laurentian":
      return true;
    case "nationalbank":
      return true;
    case "rbc":
      return true;
    case "scotiabank":
      return true;
    case "td":
      return true;
    default:
      return false;
  }
};

// used in ./components/UI/DropDownList/DropDownList.js
export const bankIconSquare = (key) => {
  switch (key) {
    case "cibc":
      return true;
    default:
      return false;
  }
};

// used in ./components/UI/DropDownList/DropDownList.js
export const coBankChosen = (title) => {
  switch (title) {
    case "BMO":
      return true;
    case "TD Bank":
      return true;
    case "ScotiaBank":
      return true;
    case "RBC":
      return true;
    case "CIBC":
      return true;
    case "National Bank":
      return true;
    case "HSBC":
      return true;
    case "Laurentian Bank":
      return true;
    case "Desjardins Bank":
      return true;
    default:
      return false;
  }
};
