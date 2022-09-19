import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/database";

// Asia Bucket
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

// North America Bucket
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY_CO,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_CO,
  projectId: process.env.REACT_APP_PROJECT_ID_CO,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_CO,
  messagingSenderId: process.env.REACT_APP_SENDER_ID_CO,
  appId: process.env.REACT_APP_APP_ID_CO,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_CO,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.storage = firebase.storage();
  }

  logout() {
    console.log("logging out");
  }

  updateImage(imageObject, imageName, userEmail) {
    return this.storage
      .ref("images/" + userEmail + "/" + imageName)
      .put(imageObject);
  }

  updateFiles(fileObject, fileName, userEmail) {
    return this.storage
      .ref("files/" + userEmail + "/" + fileName)
      .put(fileObject);
  }
}

export default new Firebase();
