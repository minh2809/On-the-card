/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const Lang = require("./lang");

const LanguageCodeSupport = ["en", "vi"];

const fileNames = ["general"];
const translations = LanguageCodeSupport.reduce((acc, lang) => {
  fileNames.forEach((fileName) => {
    acc[lang] = {
      ...acc[lang],
      [fileName]: require(`./${lang}/${fileName}.json`),
    };
  }, acc);
  return acc;
}, {});

const i18n = {
  translations,
  defaultLang: Lang.defaultLang,
  useBrowserDefault: false,
};

module.exports = i18n;
