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
let removeChilds = (elem) => _.toArray(elem.children).forEach((child) => child.remove());
class LogTableElement extends HTMLTableElement {
  createdCallback() {
    this.headElem = this.createTableHead();
    this.bodyElem = this.createTableBody();
    this.appendChild(this.headElem);
    this.appendChild(this.bodyElem);

    this.LSTVLog = [];
    this.headColumns = [];
  }
  createTableHead() {
    return document.createElement('thead');
  }
  createTableBody() {
    return document.createElement('tbody');
  }

  setLog(LSTVLog) {
    this.LSTVLog = LSTVLog;
    this.headColumns = (LSTVLog.length === 0 ? [] : _.keys(LSTVLog[0]))
    this.updateTableElem(LSTVLog, this.headColumns);
  }
  filterLog(filter) {
    this.updateTableElem(this.LSTVLog.filter(filter), this.headColumns);
  }

  updateTableElem(LSTVLog, headColumns) {
    removeChilds(this.headElem);
    removeChilds(this.bodyElem);
    this.appendTableHeadRows(LSTVLog, headColumns);
    this.appendTableBodyRows(LSTVLog, headColumns);
  }
  appendTableHeadRows(LSTVLog, headColumns) {
    let headRowElem = document.createElement('tr');
    headColumns.forEach((column) => {
      let headColumnElem = document.createElement('th');
      headColumnElem.textContent = column;
      headRowElem.appendChild(headColumnElem);
    });
    this.headElem.appendChild(headRowElem);
  }
  appendTableBodyRows(LSTVLog, headColumns) {
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
  removeChilds(elem);
  elem.appendChild(logTable);
  logTable.setLog(LSTVLog);
};
