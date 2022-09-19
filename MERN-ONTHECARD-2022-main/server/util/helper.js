import firebase from "firebase";
import fs from "fs";
import { alphabetArray, numberArray, weirdChars } from "./arrayObject.js";
import { English } from "../language/language.js";

// Asia Bucket
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBYmZ24qqHe1e0yh8TD94LKejwfrAT2sII",
  authDomain: "onthecard2021.firebaseapp.com",
  databaseURL: "https://onthecard2021-default-rtdb.firebaseio.com",
  projectId: "onthecard2021",
  storageBucket: "onthecard2021.appspot.com",
  messagingSenderId: "1008594664326",
  appId: "1:1008594664326:web:2035d0cf73e1e99e250a07",
  measurementId: "G-NJLCFTNKHY",
};

// North America Bucket
// const FIREBASE_CONFIG = {
//   apiKey: "AIzaSyAuFbj5P_GmdqfAoF0dAyYhP3U1gsrJ96c",
//   authDomain: "onthecardca.firebaseapp.com",
//   projectId: "onthecardca",
//   storageBucket: "onthecardca.appspot.com",
//   messagingSenderId: "384981482643",
//   appId: "1:384981482643:web:b9732e05a54b9feaf6a166",
//   measurementId: "G-WSDTM0V46F",
// };

firebase.initializeApp(FIREBASE_CONFIG);

export const validateUser = (password) => {
  switch (password) {
    case "trungtrinh":
      return true;
    case "28899":
      return true;
    case "dumbotran":
      return true;
    case "otcmember":
      return true;
    default:
      return false;
  }
};

export const firebaseSignUp = async (email, password, userName) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.updateProfile({
      displayName: userName,
    });
    return { success: true, message: "" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const firebaseLogin = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return { loggedIn: true };
  } catch (error) {
    switch (error.message) {
      case English.backendErrors.invalidPasswordMsg:
        return {
          loggedIn: false,
          error: English.backendErrors.invalidPasswordAlert,
          data: "",
          serialArray: [],
          analyticData: {},
          token: "",
          enterprisePage: {},
          storePage: {},
        };
      case English.backendErrors.noEmailMsg:
        return {
          loggedIn: false,
          error: English.backendErrors.noEmailAlert,
          data: "",
          serialArray: [],
          analyticData: {},
          token: "",
          enterprisePage: {},
          storePage: {},
        };
      default:
        return {
          loggedIn: false,
          error: English.backendErrors.otherError + error.message,
          data: "",
          serialArray: [],
          analyticData: {},
          token: "",
          enterprisePage: {},
          storePage: {},
        };
    }
  }
};

export const firebaseDelete = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    await user.delete();
    return { success: true, message: "" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const firebaseWriteData = (userName) => {
  const database = firebase.database();
  const data = database.ref().child("users/" + userName);

  let rawdata = fs.readFileSync("errorUsersData.json");
  let info = JSON.parse(rawdata);

  data.on("value", (snapshot) => {
    const result = snapshot.val();
    info.push(result);
    fs.writeFileSync("errorUsersData.json", JSON.stringify(info, null, 2));
  });
};

export const forgotPwFirebase = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {
      success: true,
      error: "",
    };
  } catch (error) {
    switch (error.message) {
      case English.backendErrors.noEmailMsg:
        return {
          error: English.backendErrors.noEmailAlert,
          success: false,
        };
      default:
        return {
          success: false,
          error: English.backendErrors.otherError + error.message,
        };
    }
  }
};

export const convertEmail = (email) => {
  let returningEmail = email;
  if (email.includes("_")) {
    returningEmail = email.replace("_", ".");
  }

  if (returningEmail.includes("_")) {
    returningEmail = returningEmail.replace("_", ".");
  }

  if (returningEmail.includes("_")) {
    returningEmail = returningEmail.replace("_", ".");
  }

  if (returningEmail.includes("_")) {
    returningEmail = returningEmail.replace("_", ".");
  }

  if (returningEmail.includes("_")) {
    returningEmail = returningEmail.replace("_", ".");
  }

  return returningEmail;
};

/*
        user: "noreplyemailon@gmail.com",
        pass: "trungtrinh38",

        user: "onthecard.vn@gmail.com", 
        pass: "Sgthotcon416"
      
        user: "onthecardvn1@gmail.com", 
        pass: "Sgthotcon416"

        user: "onthecardvn2@gmail.com", 
        pass: "Sgthotcon416"

        user: "onthecardvn3@gmail.com", 
        pass: "Sgthotcon416"
      */

export const emailObject = () => {
  const currentTime = Date.now();

  if (currentTime % 2 === 0) {
    return {
      user: "noreplyemailon@gmail.com",
      pass: "Quang388",
    };
  } else if (currentTime % 3 === 0) {
    return {
      user: "noreplyemailon@gmail.com",
      pass: "Quang388",
    };
  } else if (currentTime % 5 === 0) {
    return {
      user: "noreplyemailon@gmail.com",
      pass: "Quang388",
    };
  } else if (currentTime % 7 === 0) {
    return {
      user: "noreplyemailon@gmail.com",
      pass: "Quang388",
    };
  } else {
    return {
      user: "noreplyemailon@gmail.com",
      pass: "Quang388",
    };
  }
};

export const getTransportObj = (token) => {
  const transportObject = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "support@onthecard.co",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: token,
    },
  };
  return transportObject;
};

export const encryptText = (stringData) => {
  const alphabet = alphabetArray;
  const numbers = numberArray;
  let encryptedKey = "";

  stringData.split("").forEach((value) => {
    if (alphabet.includes(value.toLowerCase())) {
      const indexInAlphabet = alphabet.indexOf(value.toLowerCase());
      const indexReversed = 25 - indexInAlphabet;
      encryptedKey += alphabet[indexReversed];
    }

    if (numbers.includes(value)) {
      const numberIndex = numbers.indexOf(value);
      encryptedKey += weirdChars[numberIndex];
    }

    if (!alphabet.includes(value.toLowerCase()) && !numbers.includes(value)) {
      encryptedKey += value;
    }
  });
  return encryptedKey;
};

export const decryptText = (stringData) => {
  const alphabet = alphabetArray;
  const numbers = numberArray;
  let decryptedKey = "";

  stringData.split(" ").forEach((value) => {
    const checkValue = " " + value + " ";
    const condition = weirdChars.includes(checkValue);
    if (condition) {
      const indexNum = weirdChars.indexOf(checkValue);
      decryptedKey += numbers[indexNum];
    }

    if (!condition && value !== " ") {
      value.split("").forEach((val) => {
        if (alphabet.includes(val.toLowerCase())) {
          const indexInAlphabet = alphabet.indexOf(val.toLowerCase());
          const indexReversed = 25 - indexInAlphabet;
          decryptedKey += alphabet[indexReversed];
        } else {
          decryptedKey += val;
        }
      });
    }
  });
  return decryptedKey;
};

export const sortMessage = (messageArray) => {
  messageArray.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return messageArray;
};

/*
if (currentTime % 2 === 0) {
    return {
      user: "noreplyemailon@gmail.com",
      pass: "Quang388",
    };
  } else if (currentTime % 3 === 0) {
    return {
      user: "noreplyemailon@gmail.com",
      pass: "Quang388",
    };
  } else if (currentTime % 5 === 0) {
    return {
      user: "onthecardvn1@gmail.com",
      pass: "Sgthotcon416",
    };
  } else if (currentTime % 7 === 0) {
    return {
      user: "onthecardvn2@gmail.com",
      pass: "Sgthotcon416",
    };
  } else {
    return {
      user: "onthecardvn3@gmail.com",
      pass: "Sgthotcon416",
    };
  }

*/
