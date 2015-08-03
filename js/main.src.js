// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
let parseLTSVLog = (logStr) => logStr.split('\n')
  .filter((line) => line !== '')
  .map((line) => {
    let obj = line.split('\t').reduce((obj, lv) => {
      let [label, value] = lv.split(':');
      obj[label] = value;
      return obj;
    }, {});
    obj.epoch = parseInt(obj.epoch);
    return obj;
  });

// 課題 JS-2: 関数 `createLogTable` を記述してください
let headColumns = ['path', 'epoch'];
class LogTableElement extends HTMLTableElement {
  createdCallback() {
    this.headElem = this.createTableHead();
    this.bodyElem = this.createTableBody();
    this.appendChild(this.headElem);
    this.appendChild(this.bodyElem);
  }
  createTableHead() {
    let headElem = document.createElement('thead');
    let headRowElem = document.createElement('tr');
    headElem.appendChild(headRowElem);
    headColumns.forEach((column) => {
      let headColumnElem = document.createElement('th');
      headColumnElem.textContent = column;
      headRowElem.appendChild(headColumnElem);
    });
    return headElem;
  }
  createTableBody() {
    return document.createElement('tbody');
  }
  appendLog(LSTVLog) {
    LSTVLog.forEach((log) => {
      let bodyRowElem = document.createElement('tr');
      headColumns.forEach((column) => {
        let bodyColumnElem = document.createElement('td');
        bodyColumnElem.textContent = log[column];
        bodyRowElem.appendChild(bodyColumnElem);
      });
      this.bodyElem.appendChild(bodyRowElem);
    });
  }
}
let LogTable = document.registerElement('log-table', {
  prototype: LogTableElement.prototype,
  extends: 'table'
});

let createLogTable = (elem, LSTVLog) => {
  let logTable = new LogTable();
  elem.appendChild(logTable);
  logTable.appendLog(LSTVLog);
};
