var fs = require('fs');
var path = require('path');
var readdir = promisify(fs.readdir);
var stat = promisify(fs.stat);
var readFile = promisify(fs.readFile);


var mediaFilterExt = ['rmvb', 'mp4', 'mkv', 'avi'];
var root = 'D:\电影';
var result= [];

var writeToTmp = function(files){
  fs.appendFile('./tmp.txt', files, function(){
  });
};


// 简单实现一个promisify
function promisify(fn) {
  return function () {
    var args = arguments;
    return new Promise(function (resolve, reject) {
      [].push.call(args, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      fn.apply(null, args);
    });
  }
}

var readDirRecur = function (root, callback) {
  console.log('---<readDirRecur');
  return readdir(root).then(function (files) {
    var secondartPath = '';
    files = files.map(function (filename) {
      return stat(path.join(root, filename)).then(function (stats) {
        if (stats.isDirectory()) {
          return readDirRecur(path.join(root, filename), callback);
        }

        if (stats.isFile() && mediaFilterExt.indexOf(filename.split('.').pop()) >= 0) {
          return callback(path.join(root, filename));
        }
      })

    })
    return Promise.all(files);
  });
};


var root = 'D:\电影';
var result = [];
readDirRecur(root, function (fullPath) {
  // ...
  console.log(fullPath);
  result.push(fullPath);
}).then(function () {
  console.log(result.length);
  console.log('done');
}).catch(function (err) {
  console.log(err);
});

// 优化参考 这个 https://cnodejs.org/topic/567650c3c096b56a0c1b4352
