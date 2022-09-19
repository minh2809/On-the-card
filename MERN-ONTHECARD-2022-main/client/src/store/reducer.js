import * as actionTypes from "./actionTypes";
import user from "../assets/header/user.svg";
import bg from "../assets/test/bg.jpg";
import { Vietnamese, English } from "../language/language";

// export const onUploadBackgroundImage = (backgroundImageUrl) => ({
//   type: actionTypes.SET_BACKGROUND_IMAGE,
//   backgroundImageUrl: backgroundImageUrl,
// });

const initialState = {
  appLanguage: "ENGLISH",
  appLang: English,
  authenticated: false,
  viewFetched: false,
  b2bActiveTab: 1,
  userInfo: {
    avatarImg: user,
    avatarURL: "",
    email: "userloggedin@gmail.com",
    userName: "oncard",
    fullName: "ONTHECARD",
    serialNo: "",
    bio: "Bio",
    viewPage: "localhost:3000/",
    socialMediaList: [],
    userURL: "",
    phoneNumber: "",
    backgroundColor: "#fff",
    backgroundColorStyle: "Color",
    backgroundColorObject: {},
    backgroundImageUrl: "",
    redirectMode: false,
    redirectLink: "",
    redirectSaveContact: false,
    inactive: false,
    iconStyle: "Original",
    PIN: "",
    company: "",
    isAdmin: false,
    isSuperAdmin: false,
  },
  client: {
    clientName: "",
    serialArray: [],
  },
  analyticData: {
    serialNo: "",
    userName: "",
    pageView: 0,
    redirectView: 0,
    latestTransactionNo: 0,
    createdAt: 0,
    updatedAt: 0,
    links: [],
  },
  enterprisePage: {
    avatarImg: user,
    avatarURL: "",
    company: "",
    name: "",
    bio: "",
    info: [],
    backgroundColor: "#fff",
    backgroundColorStyle: "Color",
    backgroundColorObject: {},
    backgroundImageUrl: "",
    iconStyle: "Original",
  },
  storePage: {
    avatarImg: bg,
    avatarURL: "",
    company: "",
    name: "",
    bio: "",
    products: [],
    isCompany: false,
  },
  galleryPage: {},
  visitedPage: {
    personal: false,
    company: false,
    store: false,
  },
  tempData: {},
  messageData: [],
  token: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      const newState = Object.assign({}, state);
      newState.authenticated = true;
      return newState;

    case actionTypes.UNAUTHENTICATE:
      return {
        ...state,
        analyticData: {},
        authenticated: false,
        b2bActiveTab: 1,
      };

    case actionTypes.IMAGEUPDATE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          avatarImg: action.imageLoaded,
          avatarURL: action.imageURL,
        },
      };

    case actionTypes.IMAGEUPDATEENTERPRISE:
      return {
        ...state,
        enterprisePage: {
          ...state.enterprisePage,
          avatarImg: action.imageLoaded,
          avatarURL: action.imageURL,
        },
      };

    case actionTypes.IMAGEUPDATESTORE:
      return {
        ...state,
        storePage: {
          ...state.storePage,
          avatarImg: action.imageLoaded,
          avatarURL: action.imageURL,
        },
      };

    // Updating full name and bio
    case actionTypes.UPDATEFULLNAMEANDBIO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          fullName: action.valFullName,
          bio: action.valBio,
        },
      };

    case actionTypes.UPDATEFNANDBIOENTERPRISE:
      return {
        ...state,
        enterprisePage: {
          ...state.enterprisePage,
          name: action.valFullName,
          bio: action.valBio,
        },
      };

    case actionTypes.UPDATEFNANDBIOSTORE:
      return {
        ...state,
        storePage: {
          ...state.storePage,
          name: action.valFullName,
          bio: action.valBio,
        },
      };

    // Updating social media list, one object example:
    // {title: "Phone Number", icon: "phoneNumber", url: '416-518-4556'}
    case actionTypes.UPDATESOCIALMEDIA:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          socialMediaList: action.socialMediaListValue,
        },
      };

    case actionTypes.UPDATEINFOENTERPRISE:
      return {
        ...state,
        enterprisePage: {
          ...state.enterprisePage,
          info: action.socialMediaListValue,
        },
      };

    case actionTypes.UPDATESTOREPRODUCTS:
      return {
        ...state,
        storePage: {
          ...state.storePage,
          products: action.socialMediaListValue,
        },
      };

    case actionTypes.PULLINFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          avatarImg:
            action.avatarURL === ""
              ? state.userInfo.avatarImg
              : action.avatarURL,
          avatarURL: action.avatarURL,
          email: action.email,
          fullName: action.fullName,
          userName: action.userName,
          bio: action.bio,
          viewPage: action.viewPage,
          socialMediaList: action.socialMediaList,
          userURL: action.userURL,
          phoneNumber: action.phoneNumber,
          backgroundColor: action.backgroundColor,
          backgroundColorObject: action.backgroundColorObject,
          backgroundColorStyle: action.backgroundColorStyle,
          backgroundImageUrl: action.backgroundImageUrl,
          redirectMode: action.redirectMode,
        },
      };

    case actionTypes.PULLINFOVIEW:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          avatarImg: action.avatarURL,
          avatarURL: action.avatarURL,
          email: action.email,
          fullName: action.fullName,
          bio: action.bio,
          socialMediaList: action.socialMediaList,
          userURL: action.userURL,
          phoneNumber: action.phoneNumber,
          backgroundColor: action.backgroundColor,
          backgroundColorObject: action.backgroundColorObject,
          backgroundColorStyle: action.backgroundColorStyle,
          backgroundImageUrl: action.backgroundImageUrl,
          redirectMode: action.redirectMode,
        },
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        b2bActiveTab: 1,
        authenticated: false,
        userInfo: {
          ...state.userInfo,
          avatarImg: user,
          avatarURL: "",
          email: "userloggedin@gmail.com",
          userName: "oncard",
          fullName: "On Card",
          serialNo: "",
          bio: "Bio",
          viewPage: "localhost:3000/",
          socialMediaList: [],
          userURL: "",
          phoneNumber: "",
          backgroundColor: "#fff",
          backgroundColorStyle: "Color",
          backgroundColorObject: {},
          backgroundImageUrl: "",
          redirectMode: false,
          redirectLink: "",
          iconStyle: "Original",
        },
      };

    case actionTypes.SET_BACKGROUND_COLOR:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          backgroundColor: action.backgroundColor,
          backgroundColorObject: action.backgroundColorObject,
        },
      };

    case actionTypes.SET_BG_COLOR_ENTERPRISE:
      return {
        ...state,
        enterprisePage: {
          ...state.enterprisePage,
          backgroundColor: action.backgroundColor,
          backgroundColorObject: action.backgroundColorObject,
        },
      };

    case actionTypes.SET_BG_COLOR_STORE:
      return {
        ...state,
        storePage: {
          ...state.storePage,
          backgroundColor: action.backgroundColor,
          backgroundColorObject: action.backgroundColorObject,
        },
      };

    case actionTypes.SET_BACKGROUND_COLOR_STYLE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          backgroundColor: action.backgroundColor,
          backgroundColorStyle: action.backgroundColorStyle,
        },
      };

    case actionTypes.SET_BG_COLOR_STYLE_ENTER:
      return {
        ...state,
        enterprisePage: {
          ...state.enterprisePage,
          backgroundColor: action.backgroundColor,
          backgroundColorStyle: action.backgroundColorStyle,
        },
      };

    case actionTypes.SET_BG_COLOR_STYLE_STORE:
      return {
        ...state,
        storePage: {
          ...state.storePage,
          backgroundColor: action.backgroundColor,
          backgroundColorStyle: action.backgroundColorStyle,
        },
      };

    case actionTypes.SET_BACKGROUND_IMAGE:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          backgroundImageUrl: action.backgroundImageUrl,
        },
      };

    case actionTypes.SET_BGIMG_ENTERPRISE:
      return {
        ...state,
        enterprisePage: {
          ...state.enterprisePage,
          backgroundImageUrl: action.backgroundImageUrl,
        },
      };

    case actionTypes.SET_BGIMG_STORE:
      return {
        ...state,
        storePage: {
          ...state.storePage,
          backgroundImageUrl: action.backgroundImageUrl,
        },
      };

    case actionTypes.CHANGETOEN:
      return {
        ...state,
        appLanguage: "ENGLISH",
        appLang: English,
      };

    case actionTypes.CHANGETOVN:
      return {
        ...state,
        appLanguage: "VIETNAMESE",
        appLang: Vietnamese,
      };

    case actionTypes.DISPATCH_LOGIN_INFO: {
      return {
        ...state,
        authenticated: true,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
          _id: "",
        },
        analyticData: {
          ...action.analytic,
        },
      };
    }

    case actionTypes.DISPATCH_USER_INFO: {
      return {
        ...state,
        viewFetched: true,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
          _id: "",
        },
        analyticData: {
          ...action.analytic,
        },
      };
    }

    case actionTypes.DISPATCH_ICON_STYLE: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          iconStyle: action.payload,
        },
      };
    }

    case actionTypes.SET_ICON_ENTERPRISE: {
      return {
        ...state,
        enterprisePage: {
          ...state.enterprisePage,
          iconStyle: action.payload,
        },
      };
    }

    case actionTypes.SET_ICON_STORE: {
      return {
        ...state,
        storePage: {
          ...state.storePage,
          iconStyle: action.payload,
        },
      };
    }

    case actionTypes.DISPATCH_REDIRECT_LINK: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          redirectLink: action.payload,
        },
      };
    }

    case actionTypes.SET_REDIRECT_MODE:
      const returnObject = action.payload
        ? {
            ...state,
            userInfo: {
              ...state.userInfo,
              redirectMode: action.payload,
              redirectSaveContact: false,
            },
          }
        : {
            ...state,
            userInfo: {
              ...state.userInfo,
              redirectMode: action.payload,
            },
          };
      return returnObject;

    case actionTypes.REDIRECT_SAVE_CONTACT: {
      const returnObject = action.payload
        ? {
            ...state,
            userInfo: {
              ...state.userInfo,
              redirectSaveContact: action.payload,
              redirectMode: false,
            },
          }
        : {
            ...state,
            userInfo: {
              ...state.userInfo,
              redirectSaveContact: action.payload,
            },
          };
      return returnObject;
    }

    case actionTypes.DISPATCH_SERIALARRAY: {
      return {
        ...state,
        client: {
          ...state.client,
          serialArray: action.payload.serialArray,
          clientName: action.payload.clientName,
        },
      };
    }

    case actionTypes.DISPATCH_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }

    case actionTypes.DISPATCH_ANALYTIC_DATA: {
      return {
        ...state,
        analyticData: action.payload,
      };
    }

    case actionTypes.DISPATCH_MESSAGE_DATA: {
      return {
        ...state,
        messageData: action.payload,
      };
    }

    case actionTypes.DEACTIVATE_PAGE: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          inactive: true,
        },
      };
    }

    case actionTypes.ACTIVATE_PAGE: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          inactive: false,
        },
      };
    }

    case actionTypes.SET_ENTERPRISEPAGE: {
      return {
        ...state,
        enterprisePage: {
          ...state.enterprisePage,
          ...action.payload,
        },
      };
    }

    case actionTypes.SET_STOREPAGE: {
      return {
        ...state,
        storePage: {
          ...state.storePage,
          ...action.payload,
        },
      };
    }

    case actionTypes.SET_GALLERYPAGE: {
      return {
        ...state,
        galleryPage: {
          ...state.galleryPage,
          ...action.payload,
        },
      };
    }

    case actionTypes.SET_TEMPDATA: {
      return {
        ...state,
        tempData: {
          ...state.tempData,
          ...action.payload,
        },
      };
    }

    case actionTypes.CHANGE_B2B_TAB: {
      return {
        ...state,
        b2bActiveTab: action.payload,
      };
    }

    case actionTypes.PERSONAL_PAGE_VISITED: {
      return {
        ...state,
        visitedPage: {
          ...state.visitedPage,
          personal: true,
        },
      };
    }

    case actionTypes.COMPANY_PAGE_VISITED: {
      return {
        ...state,
        visitedPage: {
          ...state.visitedPage,
          company: true,
        },
      };
    }

    case actionTypes.STORE_PAGE_VISITED: {
      return {
        ...state,
        visitedPage: {
          ...state.visitedPage,
          store: true,
        },
      };
    }

    case actionTypes.STORE_PAGE_ACTIVATE: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          storeActivated: true,
        },
      };
    }

    case actionTypes.GALLERY_PAGE_ACTIVATE: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          galleryActivated: true,
        },
      };
    }

    case actionTypes.SET_PIN: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          PIN: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
