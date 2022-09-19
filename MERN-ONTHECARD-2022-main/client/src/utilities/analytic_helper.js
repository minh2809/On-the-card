const getAnalyticLinks = (socialMediaList, analyticLinks) => {
  const analyticData = [];
  socialMediaList.forEach((value) => {
    const data = analyticLinks.find((val) => value.url === val.url);

    if (
      value.icon !== "embedyoutube" &&
      value.icon !== "instagramembed" &&
      value.icon !== "tiktokembed"
    ) {
      if (data) {
        analyticData.push({ ...value, clickCount: data.clickCount });
      } else {
        analyticData.push({ ...value, clickCount: 0 });
      }
    }
  });

  analyticData.sort((a, b) => (a.clickCount < b.clickCount ? 1 : -1));
  return analyticData;
};

const getClickCount = (analyticData) => {
  let clickCount = 0;
  analyticData.forEach((value) => {
    clickCount += value.clickCount;
  });
  return clickCount;
};

const getVNTime = (timeInMilisecond, dateObject) => {
  // convert to utc+7
  const time = timeInMilisecond + 7 * 60 * 60 * 1000;
  const createdDate = new Date(time);

  const year = createdDate.getUTCFullYear();
  // Jan = 0
  const month = createdDate.getUTCMonth() + 1;
  // Sun = 0, Mon = 1
  let weekDay = createdDate.getUTCDay();
  const monthDay = createdDate.getUTCDate();
  let hour = createdDate.getUTCHours();
  let minute = createdDate.getUTCMinutes();

  if (minute.toString().length === 1) {
    minute = `0${minute}`;
  }

  if (hour.toString().length === 1) {
    hour = `0${hour}`;
  }

  switch (weekDay) {
    case 0:
      weekDay = dateObject.sunday;
      break;
    case 1:
      weekDay = dateObject.monday;
      break;
    case 2:
      weekDay = dateObject.tuesday;
      break;
    case 3:
      weekDay = dateObject.wednesday;
      break;
    case 4:
      weekDay = dateObject.thursday;
      break;
    case 5:
      weekDay = dateObject.friday;
      break;
    default:
      weekDay = dateObject.saturday;
      break;
  }

  return {
    date: `${monthDay}/${month}/${year}`,
    weekDay: weekDay,
    timeInDay: `${hour}:${minute}`,
  };
};

const getCATime = (timeInMilisecond, dateObject) => {
  // convert to utc-4
  const time = timeInMilisecond - 4 * 60 * 60 * 1000;
  const createdDate = new Date(time);

  const year = createdDate.getUTCFullYear();
  // Jan = 0
  const month = createdDate.getUTCMonth() + 1;
  // Sun = 0, Mon = 1
  let weekDay = createdDate.getUTCDay();
  const monthDay = createdDate.getUTCDate();
  let hour = createdDate.getUTCHours();
  let minute = createdDate.getUTCMinutes();

  if (minute.toString().length === 1) {
    minute = `0${minute}`;
  }

  if (hour.toString().length === 1) {
    hour = `0${hour}`;
  }

  switch (weekDay) {
    case 0:
      weekDay = dateObject.sunday;
      break;
    case 1:
      weekDay = dateObject.monday;
      break;
    case 2:
      weekDay = dateObject.tuesday;
      break;
    case 3:
      weekDay = dateObject.wednesday;
      break;
    case 4:
      weekDay = dateObject.thursday;
      break;
    case 5:
      weekDay = dateObject.friday;
      break;
    default:
      weekDay = dateObject.saturday;
      break;
  }

  return {
    date: `${monthDay}/${month}/${year}`,
    weekDay: weekDay,
    timeInDay: `${hour}:${minute} EST`,
  };
};

const setIsRead = (messageData, id) => {
  const itemData = messageData.find((value) => value._id === id);
  const index = messageData.indexOf(itemData);
  itemData.isRead = true;
  messageData[index] = itemData;
  return messageData;
};

const deleteMessage = (messageData, id) => {
  const itemData = messageData.find((value) => value._id === id);
  const index = messageData.indexOf(itemData);
  messageData.splice(index, 1);
  return messageData;
};

const countNewMessage = (messageData) => {
  let count = 0;
  if (messageData) {
    messageData.forEach((value) => {
      if (!value.isRead && !value.isOrder) {
        count++;
      }
    });
  }
  return count;
};

const countNewOrder = (messageData) => {
  let count = 0;
  if (messageData) {
    messageData.forEach((value) => {
      if (!value.isRead && value.isOrder) {
        count++;
      }
    });
  }
  return count;
};

const searchMessage = (messageData, searchTitle) => {
  const searchResult = [];

  searchTitle.split(" ").forEach((value) => {
    messageData.forEach((val) => {
      if (value === "") {
        return;
      }
      if (val.fullName.toLowerCase().includes(value.toLowerCase())) {
        !searchResult.includes(val) && searchResult.push(val);
      }
      if (val.email.toLowerCase() === value.toLowerCase()) {
        !searchResult.includes(val) && searchResult.push(val);
      }
      if (val.phoneNumber === value) {
        !searchResult.includes(val) && searchResult.push(val);
      }
    });
  });

  searchTitle.trim().length === 0 && searchResult.push(...messageData);

  searchResult.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return searchResult;
};

const searchOrderFunc = (messageData, searchTitle) => {
  const searchResult = [];

  searchTitle.split(" ").forEach((value) => {
    messageData.forEach((val) => {
      if (value === "") {
        return;
      }
      if (val.fullName.toLowerCase().includes(value.toLowerCase())) {
        !searchResult.includes(val) && searchResult.push(val);
      }
      if (val.email.toLowerCase() === value.toLowerCase()) {
        !searchResult.includes(val) && searchResult.push(val);
      }
      if (val.phoneNumber === value) {
        !searchResult.includes(val) && searchResult.push(val);
      }
      if (val.orderData.orderNumber === parseInt(value)) {
        !searchResult.includes(val) && searchResult.push(val);
      }
      if (value.includes("#")) {
        const orderNo = value.substring(1, value.length);
        if (val.orderData.orderNumber === parseInt(orderNo)) {
          !searchResult.includes(val) && searchResult.push(val);
        }
      }
    });
  });

  searchTitle.trim().length === 0 && searchResult.push(...messageData);

  searchResult.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return searchResult;
};

export {
  getAnalyticLinks,
  getClickCount,
  getVNTime,
  setIsRead,
  deleteMessage,
  countNewMessage,
  countNewOrder,
  searchMessage,
  searchOrderFunc,
  getCATime,
};
