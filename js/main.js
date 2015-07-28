// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
"use strict";

var parseLTSVLog = (logStr) => logStr.split('\n')
  .filter((line) => line !== '')
  .map((line) => {
    var obj = {};
    line.split('\t').forEach((lv) => {
      var [label, value] = lv.split(':');
      obj[label] = value;
    });
    obj.epoch = parseInt(obj.epoch);
    return obj;
  });

// 課題 JS-2: 関数 `createLogTable` を記述してください
