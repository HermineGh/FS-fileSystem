module.exports = (str, size) => {
  let formatedData;
  if (size < 1024) formatedData = `${parseInt(size, 10)}bytes`;
  else if (size > 1024 && size < 1024 ** 2) {
    formatedData = `${parseInt(size / 1024, 10)}kb`;
  } else if (size > 1024 ** 2) {
    formatedData = `${(size / 1024 ** 2).toFixed(1, 10)}mb`;
  }
  return `${str.padEnd(80, '_')}${formatedData.padStart(8, '_')}\n`;
};
