const premiumFunctions = [
  "trungtrinh",
  "kyletrinh",
  "motivate",
  "yen",
  "dumbotran",
  "kylietran",
  "me",
  "tbui27",
  "hoaithanhtrinh",
  "dukenguyen",
  "chloehoang",
  "trevtrinh",
  "daisytran",
  "daisy",
  "tnthing1510",
  "gianghi1801",
  "phuonganh1311",
  "almira_sunny",
  "ndkhoi1912",
  "phlong",
  "ceophatnguyen",
  "vincent",
];

export const verifyPremiumFunctions = (userName) => {
  if (premiumFunctions.includes(userName)) {
    return true;
  }

  if (userName.includes("otcme")) {
    return true;
  }

  return false;
};

/*

const verifiedUsers = [
  "trungtrinh",
  "motivate",
  "yen",
  "dumbotran",
  "kyletrinh",
  "leicesterwatches",
  "kylietran",
  "thuchienthuc",
  "vietanhtruong",
  "damnrickystarsodope",
  "me",
  "thanhphovedem",
  "ngqtrieu",
  "daisy",
  "nguyenvangiau",
  "trietle88",
  "tbui27",
  "cpgroup",
  "phanphuchau13",
  "hoaithanhtrinh",
  "kyletrinh2",
  "sondoan",
  "charmingduong",
  "qahhh__1101",
  "chie8z",
  "xhanhne_",
  "tiktok",
  "ig",
  "fb",
];

const premiumFunctions = [
  "trungtrinh",
  "kyletrinh",
  "motivate",
  "yen",
  "dumbotran",
  "kylietran",
  "me",
  "tbui27",
  "hoaithanhtrinh",
  "dukenguyen",
  "chloehoang",
  "trevtrinh",
  "daisytran",
  "daisy",
];

const premiumSerial = [
  "6760082095546",
  "5144143859431",
  "1604869464347",
  "6760674336260",
  "6770071133068",
  "5185391607791",
];

  const premiumFunctions = [
    "trungtrinh",
    "motivate",
    "yen",
    "dumbotran",
    "kyletrinh",
    "kylietran",
    "me",
    "thanhphovedem",
    "daisy",
    "nguyenvangiau",
    "tbui27",
    "hoaithanhtrinh",
    "kyletrinh2",
    "sondoan",
    "charmingduong",
    "qahhh__1101",
    "chie8z",
    "xhanhne_",
  ];

*/
