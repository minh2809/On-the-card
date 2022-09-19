import { Vietnamese, English } from "../language/language";

export function returnPlaceholder(languageChosen, type) {
  let textObject;
  if (languageChosen === "ENGLISH") {
    textObject = English;
  } else {
    textObject = Vietnamese;
  }

  if (type === "Email") {
    return textObject.editPage.modal.enter.email;
  } else if (
    type === "Số Phone" ||
    type === "Hotline" ||
    type === "Phone Number" ||
    type === "Momo Wallet" ||
    type === "Ví Momo" ||
    type === "WhatsApp" ||
    type === "KakaoTalk"
  ) {
    return textObject.editPage.modal.enter.phone;
  } else if (type === "Zalo") {
    return textObject.editPage.modal.enter.usernameOrPhone;
  } else if (
    type === "Instagram" ||
    type === "Snapchat" ||
    type === "Twitter" ||
    type === "Pinterest" ||
    type === "Behance" ||
    type === "Github"
  ) {
    return textObject.editPage.modal.enter.username;
  } else {
    return textObject.editPage.modal.enter.link;
  }
}

export function namePlaceholder(languageChosen, musicAccount) {
  let textHolder;
  if (!musicAccount) {
    textHolder =
      languageChosen === "ENGLISH"
        ? English.editPage.modal.enter.namePlaceHolder
        : Vietnamese.editPage.modal.enter.namePlaceHolder;
  } else {
    textHolder =
      languageChosen === "ENGLISH"
        ? English.editPage.modal.enter.musicPlaceHolder
        : Vietnamese.editPage.modal.enter.musicPlaceHolder;
  }
  return textHolder;
}

export function artistPlaceHolder(languageChosen) {
  let textHolder =
    languageChosen === "ENGLISH"
      ? English.editPage.modal.enter.artistPlaceHolder
      : Vietnamese.editPage.modal.enter.artistPlaceHolder;

  return textHolder;
}

export function bankingPlaceHolder(languageChosen) {
  let textHolder =
    languageChosen === "ENGLISH"
      ? English.editPage.modal.enter.enterBanking
      : Vietnamese.editPage.modal.enter.enterBanking;
  return textHolder;
}

export function returnUrl(accountType) {
  switch (accountType) {
    case "Instagram":
      return "https://instagram.com/";
    case "Zalo":
      return "https://zalo.me/";
    case "Momo Wallet":
      return "https://nhantien.momo.vn/";
    case "Ví Momo":
      return "https://nhantien.momo.vn/";
    case "Snapchat":
      return "https://www.snapchat.com/add/";
    case "Twitter":
      return "https://twitter.com/";
    case "Github":
      return "https://github.com/";
    case "Pinterest":
      return "https://pinterest.com/";
    case "Behance":
      return "https://www.behance.net/";
    default:
      return null;
  }
}
