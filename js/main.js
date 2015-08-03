// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var parseLTSVLog = function parseLTSVLog(logStr) {
  return logStr.split('\n').filter(function (line) {
    return line !== '';
  }).map(function (line) {
    var obj = line.split('\t').reduce(function (obj, lv) {
      var _lv$split = lv.split(':');

      var _lv$split2 = _slicedToArray(_lv$split, 2);

      var label = _lv$split2[0];
      var value = _lv$split2[1];

      obj[label] = value;
      return obj;
    }, {});
    obj.epoch = parseInt(obj.epoch);
    return obj;
  });
};

// 課題 JS-2: 関数 `createLogTable` を記述してください
var headColumns = ['path', 'epoch'];

var LogTableElement = (function (_HTMLTableElement) {
  _inherits(LogTableElement, _HTMLTableElement);

  function LogTableElement() {
    _classCallCheck(this, LogTableElement);

    _get(Object.getPrototypeOf(LogTableElement.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(LogTableElement, [{
    key: 'createdCallback',
    value: function createdCallback() {
      this.headElem = this.createTableHead();
      this.bodyElem = this.createTableBody();
      this.appendChild(this.headElem);
      this.appendChild(this.bodyElem);
    }
  }, {
    key: 'createTableHead',
    value: function createTableHead() {
      var headElem = document.createElement('thead');
      var headRowElem = document.createElement('tr');
      headElem.appendChild(headRowElem);
      headColumns.forEach(function (column) {
        var headColumnElem = document.createElement('th');
        headColumnElem.textContent = column;
        headRowElem.appendChild(headColumnElem);
      });
      return headElem;
    }
  }, {
    key: 'createTableBody',
    value: function createTableBody() {
      return document.createElement('tbody');
    }
  }, {
    key: 'appendLog',
    value: function appendLog(LSTVLog) {
      var _this = this;

      LSTVLog.forEach(function (log) {
        var bodyRowElem = document.createElement('tr');
        headColumns.forEach(function (column) {
          var bodyColumnElem = document.createElement('td');
          bodyColumnElem.textContent = log[column];
          bodyRowElem.appendChild(bodyColumnElem);
        });
        _this.bodyElem.appendChild(bodyRowElem);
      });
    }
  }]);

  return LogTableElement;
})(HTMLTableElement);

var LogTable = document.registerElement('log-table', {
  prototype: LogTableElement.prototype,
  'extends': 'table'
});

var createLogTable = function createLogTable(elem, LSTVLog) {
  var logTable = new LogTable();
  elem.appendChild(logTable);
  logTable.appendLog(LSTVLog);
};

