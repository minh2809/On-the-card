import { ADDSOClient, isBProUser } from "./helper2";

const condition1Result = (pathName) => {
  return pathName === "/profile/edit";
};

const condition2Result = (pathName) => {
  return pathName === "/profile/B2BAdmin";
};

const condition3Result = (pathName) => {
  return (
    pathName.includes("/profile/edit") ||
    pathName.includes("/profile/settings") ||
    pathName.includes("/profile/b2b/advanced") ||
    pathName.includes("/profile/B2BAdmin") ||
    pathName.includes("/profile/AdminPermission") ||
    pathName.includes("/profile/advanced") ||
    pathName.includes("/signin") ||
    pathName.includes("/signup") ||
    pathName.includes("/retrieve") ||
    pathName.includes("serialnumber") ||
    pathName === "/"
  );
};

const condition4Result = (pathName, inactive) => {
  return pathName === "/profile" || !inactive;
};

const condition5Result = (pathName, inactive) => {
  return (
    (!pathName.includes("profile") && inactive) || pathName.includes("/secure/")
  );
};

const condition6Result = (pathName, bgImg, condition5, company) => {
  return (
    bgImg &&
    !condition5 &&
    pathName !== "/profile/edit" &&
    !pathName.includes("/profile/settings") &&
    !ADDSOClient(company)
  );
};

const condition7Result = (company, b2bActiveTab) => {
  return isBProUser(company) && (b2bActiveTab === 2 || b2bActiveTab === 1);
};

/*  ----------------------------------------------------    */

const bgData = (appProps, condition1, condition2) => {
  const { userInfo, b2bActiveTab } = appProps;
  const { enterprisePage, storePage } = appProps;
  const { company } = userInfo;
  const pathName = window.location.pathname;

  let bgColor = userInfo.backgroundColor;
  let bgImg = userInfo.backgroundImageUrl;
  let bgStyle;

  if (b2bActiveTab === 2) {
    bgColor = enterprisePage.backgroundColor;
    bgImg = enterprisePage.backgroundImageUrl;
  }

  if (b2bActiveTab === 3) {
    bgColor = storePage.backgroundColor;
    bgImg = storePage.backgroundImageUrl;
  }

  if (b2bActiveTab === 4) {
    bgColor = "#ffffff";
    bgImg = "";
  }

  if (bgColor && condition1) {
    bgStyle = {
      backgroundColor: bgColor,
    };
  } else if (bgColor && !condition1) {
    bgStyle = {
      backgroundColor: bgColor,
      minHeight: "100vh",
    };
  } else if (condition2) {
    bgStyle = {
      backgroundColor: "white",
    };
  }

  if (ADDSOClient(company) || pathName.includes("/profile/settings")) {
    bgStyle = {
      backgroundColor: "white",
    };
  }

  if (pathName.includes("/secure/")) {
    bgStyle = {
      backgroundColor: "black",
    };
  }

  return { bgColor: bgColor, bgImg: bgImg, bgStyle: bgStyle };
};

export { condition1Result, condition2Result, condition3Result };
export { condition4Result, condition5Result, condition6Result };
export { condition7Result, bgData };
