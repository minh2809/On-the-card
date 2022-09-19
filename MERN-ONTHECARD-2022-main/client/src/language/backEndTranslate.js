import { OriginalMessages, EnglishMessage } from "./BEMessage";

export const translate = (message, appLanguage) => {
  if (!message) {
    return null;
  }
  if (appLanguage === "VIETNAMESE") {
    return message;
  }
  if (OriginalMessages.includes(message)) {
    const messageIndex = OriginalMessages.indexOf(message);
    return EnglishMessage[messageIndex];
  }
  return "Something happened, please try again";
};

// Use in SignIn.js
export const safeTranslate = (message, appLanguage) => {
  if (!message) {
    return null;
  }
  if (appLanguage === "VIETNAMESE") {
    return message;
  }
  if (OriginalMessages.includes(message)) {
    const messageIndex = OriginalMessages.indexOf(message);
    return EnglishMessage[messageIndex];
  }
  return message;
};
