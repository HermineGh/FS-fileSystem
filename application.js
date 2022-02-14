//  modules
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const sizeFormate = require('./src/components/modules/modules');

// path from command line arguments
let pathName = process.argv[2];

// go up
if (path.dirname(pathName) === '../..') {
  pathName = path.dirname(pathName).split(path.sep).pop();
}

const filesArr = async (argvData, data) => {
  const allFiles = data || [];
  try {
    const paths = await fsPromises.readdir(argvData);
    await Promise.all(
      paths.map(async (cur) => {
        const curPath = path.join(argvData, cur);
        const state = await fsPromises.stat(curPath);

        if (state.isFile()) {
          const { size } = state;
          allFiles.push([size, sizeFormate(curPath, size)]);
        } else {
          return filesArr(curPath, allFiles);
        }
        return allFiles;
      })
    );
  } catch (err) {
    console.log(err.message);
  }
  return allFiles.sort((a, b) => b[0] - a[0]);
};

const writeToFile = async () => {
  try {
    const files = await filesArr(pathName);
    await fsPromises.writeFile('./sorted_files.txt', 'sorted_files.txt\n\n\n');
    files.forEach((el) =>
      fs.appendFileSync('sorted_files.txt', el[1].toString())
    );
  } catch (err) {
    console.log(err.message);
  }
};

writeToFile();
