// .me ACCOUNT LIST
// import { fullList_me, normalList_me } from "./AccountList";
// import { bankList_me, b2bList_me } from "./AccountList";

// export const renderList = (
//   renderlanguage,
//   company,
//   premiumList,
//   b2bActiveTab
// ) => {
//   if (company && b2bActiveTab !== 1) {
//     return b2bList_me(renderlanguage);
//   }
//   if (premiumList) {
//     return fullList_me(renderlanguage);
//   }
//   return normalList_me(renderlanguage);
// };

// export const renderBankList = () => {
//   return bankList_me();
// };

// .co ACCOUNT LIST
import { fullList_co, bankList_co, b2bList_co } from "./AccountList";

export const renderList = (renderlanguage, company, premiumList) => {
  if (company) {
    return b2bList_co(renderlanguage);
  }
  if (premiumList) {
    return fullList_co(renderlanguage);
  }
  return fullList_co(renderlanguage);
};

export const renderBankList = () => {
  return bankList_co();
};
