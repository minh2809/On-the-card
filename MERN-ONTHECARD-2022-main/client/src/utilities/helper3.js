import { isBProUser, is25FitUser } from "./helper2";

/*
  Used in ./components/UI/Navigation/ViewNavigation/ViewPageNav.js
*/
export const businessTabTitle = (company, defaultTitle) => {
  if (isBProUser(company)) {
    return "Blue Signature";
  }

  if (is25FitUser(company)) {
    return "25 FIT";
  }

  return defaultTitle;
};

/*

    Used in ./components/UI/Navigation/ViewNavigation/ViewPageNav.js

*/
export const businessTabIcon = (company) => {
  if (isBProUser(company)) {
    return <i className="fas fa-glass-whiskey fa-lg"></i>;
  }

  if (is25FitUser(company)) {
    return null;
  }

  return <i className="fas fa-briefcase fa-lg"></i>;
};

/*

    Used in ./components/UI/Navigation/ViewNavigation/ViewPageNav.js

*/
export const storeTabTitle = (company, defaultTitle) => {
  if (is25FitUser(company)) {
    return "25 FIT ININITY";
  }

  return defaultTitle;
};

export const storeTabTitle2 = (company) => {
  if (is25FitUser(company)) {
    return "AIRWAY";
  }

  return null;
};

/*
  
      Used in ./components/UI/Navigation/ViewNavigation/ViewPageNav.js
  
  */
export const storeTabIcon = (company) => {
  if (is25FitUser(company)) {
    return null;
  }

  return <i className="fas fa-shopping-cart fa-lg"></i>;
};

/*
  Used in ViewPage.js
*/
export const is25fitKOL = (company) => {
  if (company === "25fitkol_vn") {
    return true;
  }
  return false;
};

/*
  Used in ViewPage.js
*/
export const isPetroVn = (company) => {
  if (company === "petro_vn") {
    return true;
  }
  return false;
};
