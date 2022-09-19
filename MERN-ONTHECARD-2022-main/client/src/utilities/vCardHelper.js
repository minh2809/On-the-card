import vCardJS from "vcards-js";
import { downloadData } from "./helper_functions";

const getBase64StringFromDataURL = (dataURL) =>
  dataURL.replace("data:", "").replace(/^.+,/, "");

function download(source, imageString) {
  fetch(source, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.blob())
    .then((blob) => {
      // Read the Blob as DataURL using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader.result);
        // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...

        // Convert to Base64 string
        const base64 = getBase64StringFromDataURL(reader.result);
        // console.log(base64);
        imageString = base64;
        // Logs wL2dvYWwgbW9yZ...
      };
      reader.readAsDataURL(blob);
    });
}

export function saveContact(userInfo) {
  const { socialMediaList, fullName, userURL, bio } = userInfo;
  let vCard = vCardJS(); // let vCardTest = vCardJS()
  vCard.version = "3.0";
  vCard.url = `${window.location.origin}/` + userURL;
  vCard.note = bio.replaceAll("\n", " ");
  vCard.photo.attachFromUrl(userInfo.avatarURL, "JPEG");

  for (let i = 0; i < socialMediaList.length; i++) {
    if (socialMediaList[i].icon === "phoneNumber") {
      vCard.cellPhone = socialMediaList[i].url;
      vCard.tel = { type: "cell", value: socialMediaList[i].url };
    } else if (socialMediaList[i].icon === "mail") {
      vCard.email = { type: "work", value: socialMediaList[i].url };
    }
  }
  let imageString = "";
  download(userInfo.avatarURL, imageString);
  // console.log(vCard);
  // console.log(vCard.getFormattedString());
  downloadData(fullName + ".vcf", { ...vCard, N: fullName });
}

export function dump(card) {
  var str = "BEGIN:VCARD\n";
  // console.log(card);
  for (var key in card) {
    var entry = card[key];
    const entryExist = entry.length || typeof entry === "object" || 0;
    let keySupported =
      key === "tel" ||
      key === "version" ||
      key === "FN" ||
      key === "N" ||
      key === "note" ||
      key === "url" ||
      key === "email" ||
      false;

    if (keySupported && entryExist) {
      if (entry.length) if (typeof entry === "function") continue;

      if (Object.prototype.toString.call(entry) === "[object Array]") {
        for (var i = 0, l = entry.length; i < l; i++) {
          var e = entry[i];
          str +=
            key.toUpperCase() +
            (e.type ? ";TYPE=" + e.type.toUpperCase() + ":" : ":") +
            e.value +
            "\n";
        }
      } else if (typeof entry === "object") {
        str +=
          key.toUpperCase() +
          (entry.type ? ";TYPE=" + entry.type.toUpperCase() + ":" : ":") +
          entry.value +
          "\n";
      } else {
        str += key.toUpperCase() + ":" + entry + "\n";
      }
    }
  }

  str += "END:VCARD";

  return str;
}
