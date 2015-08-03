'use strict';

document.querySelector('#submit-button').addEventListener('click', function () {
  var input = document.querySelector('#log-input').value;
  var LSTVLog = parseLTSVLog(input);
  var tableContainerElem = document.querySelector('#table-container');
  createLogTable(tableContainerElem, LSTVLog);
});

document.querySelector('#search-text').addEventListener('keyup', function (e) {
  var text = e.target.value;
  var logTableElem = document.querySelector('#table-container table[is=log-table]');
  logTableElem.filterLog(function (log) {
    return _(log).find(function (value, key) {
      return value && value.match && value.match(new RegExp(text));
    });
  });
});

