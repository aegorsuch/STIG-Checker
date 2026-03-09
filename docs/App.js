use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = App;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function checkSTIG(manifest) {
  // STIG checks
  var rules = [{
    id: 'V-242851',
    category: 'CAT I',
    pattern: 'android:debuggable="true"',
    description: 'Allows remote memory extraction.',
    label: 'debuggable="true"'
  }, {
    id: 'V-242854',
    category: 'CAT I',
    pattern: 'usesCleartextTraffic',
    description: 'Sends CoT/PLI data without TLS.',
    label: 'usesCleartextTraffic'
  }, {
    id: 'V-2026-MTD',
    category: 'CAT I',
    pattern: 'MTD Hook',
    description: 'Fails 2026 Mobile Security Mandate.',
    label: 'Missing MTD Hook'
  }, {
    id: 'V-242852',
    category: 'CAT II',
    pattern: 'android:allowBackup="true"',
    description: 'Permits local data extraction via ADB.',
    label: 'allowBackup="true"'
  }, {
    id: 'V-242855',
    category: 'CAT II',
    pattern: 'android:exported="true"',
    description: 'Allows malicious apps to hijack intents.',
    label: 'Exported Components'
  }];
  var issues = [];
  rules.forEach(function (rule) {
    if (manifest.includes(rule.pattern) || rule.label === 'Missing MTD Hook' && !manifest.includes('MTD Hook')) {
      issues.push({
        id: rule.id,
        category: rule.category,
        label: rule.label,
        description: rule.description
      });
    }
  });