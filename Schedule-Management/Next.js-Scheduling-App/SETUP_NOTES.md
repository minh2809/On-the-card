# FOLDER SETUP NOTES:

$ npm install --save --force next-export-i18n

Copy the i18n folder from epam dww web
configure i18n/index.js and i18n/lang.js based on your need

import { useTranslation } from "next-export-i18n";
const { t } = useTranslation();
console.log(t("general.button.cancel"));

> it just works

When you have a new locales file, visit i18n/index.js to add it

link:

https://hackmd.io/JmVMaCjKQ8OR8nHu9oR3VQ

$ npm install --save --force axios

Redux:

$ npm install --save --force @reduxjs/toolkit @types/react-redux react-redux redux redux-thunk

See files in @/stores
See setup in @/pages/app.tsx
See how to use it in @/hooks/useLoading.tsx
