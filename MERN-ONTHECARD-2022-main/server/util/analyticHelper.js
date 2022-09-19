import Analytic from "../models/analyticModel.js";
import Transaction from "../models/transactionModel.js";
// import StoreAnalytic from "../models/storeAnalyticModel.js";
// import CompanyAnalytic from "../models/companyAnalyticModel.js";

const viewPageInc = async (analyticData, tabId, dataObject) => {
  const { serialNo, userName, pageView, redirectView } = analyticData[0];
  const { links, _id, updatedAt } = analyticData[0];
  const { latestTransactionNo: transNumber } = analyticData[0];
  let transType = "pageView";

  /* 
    Has to do this due to axios send duplicated Post requests
    2 or more requests within 1.5s can be only counted as 1
  */

  const currentTime = Date.now();
  const condition = currentTime > updatedAt + 1500;
  const condition1 = tabId === "1" && condition;

  const newTransaction = new Transaction({
    serialNo: serialNo,
    userName: userName,
    pageView: pageView + 1,
    redirectView: redirectView,
    transType: transType,
    links: links,
    transNo: transNumber + 1,
    createdAt: currentTime,
    dataObject: dataObject,
  });

  condition1 &&
    (await Analytic.findByIdAndUpdate(
      _id,
      {
        pageView: pageView + 1,
        latestTransactionNo: transNumber + 1,
        updatedAt: currentTime,
      },
      { new: true, useFindAndModify: false }
    ));

  condition1 && (await newTransaction.save());
};

const fetchPageInc = async (analyticData, dataObject) => {
  const { serialNo, userName, pageView, redirectView } = analyticData[0];
  const { links, _id, updatedAt } = analyticData[0];
  const { latestTransactionNo: transNumber } = analyticData[0];
  /* 
    Has to do this due to axios send duplicated Post requests
    2 or more requests within 1.5s can be only counted as 1
  */
  const currentTime = Date.now();
  const condition = currentTime > updatedAt + 1500;

  const newTransaction = new Transaction({
    serialNo: serialNo,
    userName: userName,
    pageView: pageView + 1,
    redirectView: redirectView + 1,
    transType: "redirectView",
    links: links,
    transNo: transNumber + 1,
    createdAt: currentTime,
    dataObject: dataObject,
  });

  condition &&
    (await Analytic.findByIdAndUpdate(
      _id,
      {
        pageView: pageView + 1,
        latestTransactionNo: transNumber + 1,
        redirectView: redirectView + 1,
        updatedAt: currentTime,
      },
      { new: true, useFindAndModify: false }
    ));

  condition && (await newTransaction.save());
};

const linkIncrement = async (analytic, url, dataObject) => {
  let duplicatedLinks;
  const {
    serialNo,
    userName,
    pageView,
    redirectView,
    links,
    latestTransactionNo: transNumber,
    _id,
    updatedAt,
    saveContact,
  } = analytic[0];
  const currentTime = Date.now();
  const condition = currentTime > updatedAt + 1500;
  let saveContactCount = 0;

  duplicatedLinks = links;
  const urlObject = duplicatedLinks.find((value) => value.url === url);
  const index = duplicatedLinks.indexOf(urlObject);

  if (index === -1 && url !== "saveContact") {
    const newLink = { url: url, clickCount: 1 };
    duplicatedLinks.push(newLink);
  } else if (index !== -1 && url !== "saveContact") {
    const updatedLink = { url: url, clickCount: urlObject.clickCount + 1 };
    duplicatedLinks[index] = updatedLink;
  }

  if (saveContact && url !== "saveContact") {
    saveContactCount = saveContact;
  }

  if (saveContact && url === "saveContact") {
    saveContactCount = saveContact + 1;
  }

  if (!saveContact && url === "saveContact") {
    saveContactCount = 1;
  }

  const transaction = new Transaction({
    serialNo: serialNo,
    userName: userName,
    pageView: pageView,
    saveContact: saveContactCount,
    redirectView: redirectView,
    transType: url,
    links: duplicatedLinks,
    transNo: transNumber + 1,
    createdAt: currentTime,
    dataObject: dataObject, 
  });

  condition &&
    (await Analytic.findByIdAndUpdate(
      _id,
      {
        links: duplicatedLinks,
        latestTransactionNo: transNumber + 1,
        updatedAt: currentTime,
        saveContact: saveContactCount,
      },
      { new: true, useFindAndModify: false }
    ));

  condition && (await transaction.save());
};

// Explanation in the bottom
const calcTime = (millisecond, offset) => {
  const localDate = new Date();

  const correctTime =
    millisecond + 3600000 * offset + localDate.getTimezoneOffset() * 60000;

  const date = new Date(correctTime).toTimeString();
  const info = "The Local Time For UTC " + offset + " is: " + date;
  return info;
};

const getAnalyticIncrement = (linksArray, url) => {
  const urlObject = linksArray.find((value) => value.url === url);
  const index = linksArray.indexOf(urlObject);

  if (index === -1) {
    linksArray.push({
      url: url,
      clickCount: 1,
    });
  } else {
    const updateLink = {
      url: linksArray[index].url,
      clickCount: linksArray[index].clickCount + 1,
    };
    linksArray[index] = updateLink;
  }

  return linksArray;
};

export { calcTime, viewPageInc, fetchPageInc, linkIncrement };
export { getAnalyticIncrement };

/*

Function that get correct time with provided epoch reference time
and time zone. Doesn't got effected by the local time zone

(notice that the GMT-0400 output is not correct)

Borrow code from: 
https://stackoverflow.com/questions/8207655/get-time-of-specific-timezone

Input: 

millisecond: can get from Date.now()
which returns the number of milliseconds 
elapsed since January 1, 1970 00:00:00 UTC.

This time can be taken as reference be cause it calculated 
in UTC+0 time. Can be used 

offset: String, etc: '+7', '-4', '+5.5'
*/
