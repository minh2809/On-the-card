import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getVNTime, getCATime } from "./analytic_helper";

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const exportToExcel = (apiData, fileName, fileType) => {
  const objectMaxLength = [];
  const wscols = [];
  const wsrows = [];

  for (let i = 0; i < apiData.length; i++) {
    let value = Object.values(apiData[i]);
    const keyVal = [];

    value.forEach((value) => {
      if (value) {
        keyVal.push(getKeyByValue(apiData[i], value));
      }
    });

    for (let j = 0; j < value.length; j++) {
      if (typeof value[j] == "number") {
        objectMaxLength[j] = keyVal[j].length + 3;
      } else if (typeof value[j] === undefined) {
        objectMaxLength[j] = keyVal[j].length;
      } else {
        // j === 2 > Date Column for Order Excel File
        // j === 1 > Seller Name Column
        if (j === 2 || j === 1) {
          const columnLength =
            value[j].length > keyVal[j].length
              ? value[j].length
              : keyVal[j].length;
          objectMaxLength[j] = columnLength + 3;
        } else {
          const stringLength = keyVal[j] ? keyVal[j].length : 15;
          objectMaxLength[j] = stringLength + 5;
        }
      }
    }
  }

  objectMaxLength.forEach((value) => {
    wscols.push({ width: value });
    wsrows.push({ hpx: 21 });
  });

  wsrows[0] = { hpx: 30 };

  const ws = XLSX.utils.json_to_sheet(apiData);
  ws["!cols"] = wscols;
  ws["!rows"] = wsrows;

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + ".xlsx");
};

export const orderToExcelAdmin = (
  messageData,
  clientArray,
  appLang,
  dayInWeek
) => {
  var nf = new Intl.NumberFormat();
  const ordersObject = [];

  console.log(messageData[0]);

  for (let i = 0; i < messageData.length; i++) {
    const dateObject =
      appLang === "VIETNAMESE"
        ? getVNTime(messageData[i].createdAt, dayInWeek)
        : getCATime(messageData[i].createdAt, dayInWeek);
    const { date, weekDay, timeInDay } = dateObject;
    const dateValue = `${weekDay}, ${date}, ${timeInDay} `;

    const seller = clientArray.find((value) => {
      return value.serialNo === messageData[i].serialNo;
    });

    let orderDetail;

    if (appLang === "VIETNAMESE") {
      if (clientArray.length > 0) {
        orderDetail = {
          "SỐ ĐƠN HÀNG": `${messageData[i].orderData.orderNumber}` || "",
          "NGƯỜI BÁN": `${seller.fullName} (${seller.userName})` || "",
          "NGÀY MUA": dateValue || "",
          "SẢN PHẨM": messageData[i].orderData.productName || "",
          "GIÁ 1 SẢN PHẨM":
            nf.format(messageData[i].orderData.price) + " VNĐ" || "",
          "SỐ LƯỢNG": `${messageData[i].orderData.quantity}` || "",
          "TÊN NGƯỜI MUA": messageData[i].fullName || "",
          "EMAIL NGƯỜI MUA": messageData[i].email || "",
          "SỐ ĐIỆN THOẠI": messageData[i].phoneNumber || "",
          "ĐỊA CHỈ GIAO HÀNG": messageData[i].orderData.address || "",
          "GHI CHÚ": "",
        };
      } else {
        orderDetail = {
          "SỐ ĐƠN HÀNG": `${messageData[i].orderData.orderNumber}` || "",
          "NGÀY MUA": dateValue || "",
          "SẢN PHẨM": messageData[i].orderData.productName || "",
          "GIÁ 1 SẢN PHẨM":
            nf.format(messageData[i].orderData.price) + " VNĐ" || "",
          "SỐ LƯỢNG": `${messageData[i].orderData.quantity}` || "",
          "TÊN NGƯỜI MUA": messageData[i].fullName || "",
          "EMAIL NGƯỜI MUA": messageData[i].email || "",
          "SỐ ĐIỆN THOẠI": messageData[i].phoneNumber || "",
          "ĐỊA CHỈ GIAO HÀNG": messageData[i].orderData.address || "",
          "GHI CHÚ": "",
        };
      }
    } else {
      if (clientArray.length > 0) {
        orderDetail = {
          "ORDER NUMBER": `${messageData[i].orderData.orderNumber}` || "",
          "SELLER NAME": `${seller.fullName} (${seller.userName})` || "",
          "ORDER DATE": dateValue || "",
          "PRODUCT NAME": messageData[i].orderData.productName || "",
          "PRICE PER UNIT":
            nf.format(messageData[i].orderData.price) + "$" || "",
          QUANTITY: `${messageData[i].orderData.quantity}` || "",
          "PURCHASER NAME": messageData[i].fullName || "",
          "PURCHASER EMAIL": messageData[i].email || "",
          "PHONE NUMBER": messageData[i].phoneNumber || "",
          "SHIPPING ADDRESS": messageData[i].orderData.address || "",
          "NOTE FOR ORDER": "",
        };
      } else {
        orderDetail = {
          "ORDER NUMBER": `${messageData[i].orderData.orderNumber}` || "",
          "ORDER DATE": dateValue || "",
          "PRODUCT NAME": messageData[i].orderData.productName || "",
          "PRICE PER UNIT":
            nf.format(messageData[i].orderData.price) + "$" || "",
          QUANTITY: `${messageData[i].orderData.quantity}` || "",
          "PURCHASER NAME": messageData[i].fullName || "",
          "PURCHASER EMAIL": messageData[i].email || "",
          "PHONE NUMBER": messageData[i].phoneNumber || "",
          "SHIPPING ADDRESS": messageData[i].orderData.address || "",
          "NOTE FOR ORDER": "",
        };
      }
    }

    if (messageData[i].isOrder) {
      ordersObject.push(orderDetail);
    }
  }

  const fileName =
    appLang === "VIETNAMESE" ? "ONTHECARD - ĐƠN HÀNG" : "ONTHECARD Orders";
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  exportToExcel(ordersObject, fileName, fileType);
};
