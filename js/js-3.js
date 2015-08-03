// 課題 JS-3 の実装をここに記述してください。
'use strict';

document.querySelector('#submit-button').addEventListener('click', function () {
  var input = document.querySelector('#log-input').value;
  var LSTVLog = parseLTSVLog(input);
  var tableContainerElem = document.querySelector('#table-container');
  createLogTable(tableContainerElem, LSTVLog);
});

