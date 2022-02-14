//  modules

const fs = require('fs');
const path = require('path');
const sizeFormate = require('./src/components/modules/modules');

// path from command line arguments
let pathName = process.argv[2];

if (path.dirname(pathName) === '../..') {
  //go up
  pathName = path.dirname(pathName).split(path.sep).pop();
}
const filesArr = (comLineArg, data) => {
  // array for all files
  const allFiles = data || [];
  try {
    fs.readdirSync(comLineArg).forEach((cur) => {
      const curPath = path.join(comLineArg, cur);
      if (fs.statSync(curPath).isFile()) {
        const { size } = fs.statSync(curPath);
        allFiles.push([size, sizeFormate(curPath, size)]);
      } else {
        filesArr(curPath, allFiles);
      }
    });
  } catch (err) {
    console.log('ERROR : no access permition', err.message);
  }
  return allFiles.sort((a, b) => b[0] - a[0]);
};

const writeToFile = (infoArr) => {
  try {
    fs.writeFileSync('./sorted_files.txt', 'sorted_files.txt\n\n\n');
    infoArr.forEach((el) => {
      fs.appendFileSync('./sorted_files.txt', el[1].toString());
    });
  } catch (err) {
    console.log('ERROR ❗ There are no files in the specified directory');
  }
};

const sortedData = filesArr(pathName);
writeToFile(sortedData);
