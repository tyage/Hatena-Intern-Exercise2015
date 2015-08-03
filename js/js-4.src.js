document.querySelector('#submit-button').addEventListener('click', () => {
  let input = document.querySelector('#log-input').value;
  let LSTVLog = parseLTSVLog(input);
  let tableContainerElem = document.querySelector('#table-container');
  createLogTable(tableContainerElem, LSTVLog);
});

document.querySelector('#search-text').addEventListener('keyup', (e) => {
  let text = e.target.value;
  let logTableElem = document.querySelector('#table-container table[is=log-table]');
  logTableElem.filterLog((log) => {
    return _(log).find((value, key) => {
      return value && value.match && value.match(new RegExp(text));
    });
  });
});
