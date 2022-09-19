import fs from "fs";

const getSHIROserials = () => {
  return [
    9917597112262,
    9922049842545,
    9928122469720,
    9929598180601,
    9955655243011,
    6770245628212,
    5155419477428,
    5155402081378,
    6770245364572,
    6770245299884,
    6770245593584,
    5155385799306,
    6770245282412,
    5155374604520,
    6770245295152,
    5155412522458,
    6770245330928,
    8385122815531,
    6770245336232,
    1614874709865,
    6770245361244,
    5155396930114,
    6770245384072,
    5155373505810,
    6770245302848,
    5155469057378,
    6770245370682,
    8385122664111,
    6770245397228,
    5155579990288,
    6770245430300,
    5155375393696,
    6770245373672,
    1614868983658,
    6770245305292,
    5155401043250,
    6770245490516,
    8385123096727,
    6770245548756,
    5155913320594,
    6770245361764,
    5155628045614,
    6770245597142,
    5155626943684,
    6770245693420,
    5155544686369,
    5155544686369,
    8385122981706,
    6770245743392,
    5155428291856,
  ].sort();
};

const readFileB2B = () => {
  const data = fs.readFileSync("cpgroupp.txt", "UTF-8");
  const dataArray = [];
  const serialNo = [];
  const sortedData = [];
  /*
    get array of text file line by line
  */
  const lines = data.split(/\r?\n/);

  /*
    the file is formatted, each line is 37 characters long
    last 13 characters are serial No so slice from 24 to 37 to get
    serial No

    The rest is full name, trim to remove space at the end
  */
  lines.map((value) => {
    serialNo.push(value.slice(24, 37));
    dataArray.push({
      serialNo: value.slice(24, 37),
      fullName: value.slice(0, 23).trim(),
    });
  });

  /*
    Sort data by serial No
  */

  serialNo.sort().map((value) => {
    const data = dataArray.find((val) => val.serialNo === value);
    sortedData.push(data);
  });

  return sortedData;
};

export { getSHIROserials, readFileB2B };
