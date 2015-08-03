// 課題 JS-3 の実装をここに記述してください。
document.querySelector('#submit-button').addEventListener('click', () => {
  let input = document.querySelector('#log-input').textContent;
  let LSTVLog = parseLTSVLog(input);
  let tableContainerElem = document.querySelector('#table-container');
  createLogTable(tableContainerElem, LSTVLog);
});
