export const Validator = {
  validateEmail(email, errorTextObject) {
    if (email === null || email === "") {
      return errorTextObject.fieldRequired;
    } else {
      //eslint-disable-next-line
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) === false) {
        return errorTextObject.invalidEmail;
      }
      if (email.includes(".con")) {
        const getExtension = email.slice(email.length - 4, email.length);
        if (getExtension === ".con") {
          return errorTextObject.invalidExtension;
        }
      }
    }
    return null;
  },

  validateEmailMessage(email, errorTextObject) {
    if (email === null || email === "") {
      return errorTextObject.invalidEmailMessage;
    } else {
      //eslint-disable-next-line
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) === false) {
        return errorTextObject.invalidEmail;
      }
      if (email.includes(".con")) {
        const getExtension = email.slice(email.length - 4, email.length);
        if (getExtension === ".con") {
          return errorTextObject.invalidExtension;
        }
      }
    }
    return null;
  },

  validateFullName(fullName, errorTextObject) {
    if (fullName === null || fullName === "") {
      return errorTextObject.fieldRequired;
    }
    return null;
  },

  validateUserName(userName, errorTextObject) {
    if (userName === null || userName === "") {
      return errorTextObject.fieldRequired;
    } else if (userName.includes(".")) {
      return errorTextObject.specialCaseDot;
    } else if (userName.includes("#")) {
      return errorTextObject.specialCaseHash;
    } else if (userName.includes("$")) {
      return errorTextObject.specialCaseDollar;
    } else if (userName.includes("[")) {
      return errorTextObject.specialCaseSquarOpen;
    } else if (userName.includes("]")) {
      return errorTextObject.specialCaseSquareClose;
    } else if (userName.includes(" ")) {
      return errorTextObject.specialCaseSpace;
    } else if (userName.includes("/")) {
      return errorTextObject.specialCaseSplash;
    }
    return null;
  },

  validateSerialNo(serialNumber, errorTextObject) {
    if (serialNumber === null || serialNumber === "") {
      return errorTextObject.fieldRequired;
    } else if (serialNumber.toString().length !== 13) {
      return errorTextObject.lengthValidate13;
    }
    return null;
  },

  validatePassword(password, errorTextObject) {
    if (password === null || password === "") {
      return errorTextObject.fieldRequired;
    } else if (password.length < 8) {
      return errorTextObject.lengthValidate8;
    }
    return null;
  },

  validateFullNameMessage(fullName, errorTextObject) {
    if (fullName === null || fullName === "") {
      return errorTextObject.invalidFullName;
    }
    return null;
  },

  validateMessage(message, errorTextObject) {
    if (message === null || message === "") {
      return errorTextObject.invalidMessage;
    }
    return null;
  },

  validateAddress(message, errorTextObject) {
    if (message === null || message === "") {
      return errorTextObject.invalidAddress;
    }
    return null;
  },

  validatePhoneNumber(phoneNumber, errorTextObject) {
    if (phoneNumber === null || phoneNumber === "") {
      return errorTextObject.invalidPhoneNumber;
    }
    return null;
  },

  validateQuantity(quantity, errorTextObject) {
    if (quantity > 0 && quantity <= 100) {
      return null;
    }
    return errorTextObject.invalidQuantity;
  },

  validateAgreement(checked, errorTextObject) {
    if (checked) {
      return null;
    }
    return errorTextObject.agreementCheck;
  },

  validateOldPW(oldPW, errorTextObject) {
    if (oldPW === null || oldPW === "") {
      return errorTextObject.fieldRequired;
    } else if (oldPW.length < 8) {
      return errorTextObject.invalidOldPW;
    }
    return null;
  },

  validateNewPW(oldPW, newPW, confirmPW, errorTextObject) {
    if (newPW.length < 8) {
      return errorTextObject.invalidNewPW;
    } else if (newPW !== confirmPW) {
      return errorTextObject.invalidConfirmPW;
    } else if (oldPW === newPW) {
      return errorTextObject.invalidNewPW2;
    }
    return null;
  },

  signUpValidation(
    email,
    fullName,
    userName,
    serialNo,
    password,
    checked,
    errorText
  ) {
    const errorEmail = this.validateEmail(email, errorText);
    const errorFullname = this.validateFullName(fullName, errorText);
    const errorUserName = this.validateUserName(userName, errorText);
    const errorSerialNo = this.validateSerialNo(serialNo, errorText);
    const errorPassword = this.validatePassword(password, errorText);
    const errorAgreement = this.validateAgreement(checked, errorText);
    let errorExist =
      errorEmail ||
      errorFullname ||
      errorUserName ||
      errorSerialNo ||
      errorPassword ||
      errorAgreement;
    return errorExist;
  },

  signInValidation(email, password, errorText) {
    const errorEmail = this.validateEmail(email, errorText);
    const errorPassword = this.validatePassword(password, errorText);
    let errorExist = errorEmail || errorPassword;
    return errorExist;
  },

  signInValidationUserName(userName, password, errorText) {
    const errorUserName = this.validateUserName(userName, errorText);
    const errorPassword = this.validatePassword(password, errorText);
    let errorExist = errorUserName || errorPassword;
    return errorExist;
  },

  messageValidation(fullName, email, number, message, errorText) {
    const errorFullname = this.validateFullNameMessage(fullName, errorText);
    const errorEmail = this.validateEmailMessage(email, errorText);
    const errorNumber = this.validatePhoneNumber(number.toString(), errorText);
    const errorMessage = this.validateMessage(message, errorText);
    let errorExist = errorMessage || errorNumber || errorEmail || errorFullname;
    return errorExist;
  },

  orderValidation(fullName, email, number, quantity, address, errorText) {
    const errorFullname = this.validateFullNameMessage(fullName, errorText);
    const errorEmail = this.validateEmailMessage(email, errorText);
    const errorNumber = this.validatePhoneNumber(number.toString(), errorText);
    const errorQuantity = this.validateQuantity(quantity, errorText);
    const errorAddress = this.validateAddress(address, errorText);
    let errorExist =
      errorQuantity ||
      errorNumber ||
      errorEmail ||
      errorFullname ||
      errorAddress;
    return errorExist;
  },

  passwordChangeValidation(oldPW, newPW, confirmPW, errorText) {
    const errorOldPW = this.validateOldPW(oldPW, errorText);
    const errorNewPW = this.validateNewPW(oldPW, newPW, confirmPW, errorText);
    let errorExist = errorOldPW || errorNewPW;
    return errorExist;
  },
};
