// Usedd in ./containers/Settings/DeactivatePage.js
export const explanation = (actionType, appLang) => {
  switch (actionType) {
    case "pageActivate":
      return appLang.settings.activateExplain;
    case "pageDeactivate":
      return appLang.settings.deActivateExplain;
    default:
      return "";
  }
};

// Usedd in ./containers/Settings/DeactivatePage.js
export const explainTitle = (actionType, appLang) => {
  switch (actionType) {
    case "pageActivate":
      return appLang.settings.activation;
    case "pageDeactivate":
      return appLang.settings.deActivation;
    default:
      return "";
  }
};
