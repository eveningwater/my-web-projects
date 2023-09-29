const path = require('path');
const fs = require('fs');

const homeFileName = 'index.html';
let OriginFileDirectoryPath = path.resolve(__dirname, 'website');
let OriginFilePath = path.resolve(__dirname, homeFileName);
let CopyFilePath = path.resolve(__dirname, 'gh-pages');
let CopyFileDirectoryPath = path.resolve(__dirname, 'gh-pages/website');

if (!fs.existsSync(CopyFilePath)) {
  fs.mkdir(CopyFilePath, err => {
    // console.log(err)
  });
}
const copyDirectoryOrFile = (oPath, cPath, isFile = false) => {
  return new Promise((resolve, reject) => {
    if (isFile) {
      fs.readFile(oPath, 'utf-8', (err, fileData) => {
        fs.writeFile(
          'gh-pages/' + homeFileName,
          fileData.toString(),
          'utf8',
          err => {
            if (err) {
              reject(new Error(err));
            }
            resolve();
          }
        );
      });
    } else {
      if (!fs.existsSync(cPath)) {
        fs.mkdir(cPath, err => {
          // console.log(err)
        });
      }
      fs.readdir(oPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          reject(new Error(err));
        }
        files?.forEach(file => {
          if (!file.isDirectory()) {
            fs.copyFileSync(
              path.resolve(oPath, file.name),
              path.resolve(cPath, file.name)
            );
          } else {
            fs.mkdir(path.resolve(cPath, file.name), err => {});
            copyDirectoryOrFile(
              path.resolve(oPath, file.name),
              path.resolve(cPath, file.name)
            );
          }
          resolve();
        });
      });
    }
  });
};
copyDirectoryOrFile(OriginFilePath, CopyFilePath, true).then(() => {
  copyDirectoryOrFile(OriginFileDirectoryPath, CopyFileDirectoryPath, false);
});
