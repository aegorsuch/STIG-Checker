'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomClient = require('react-dom/client');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var root = (0, _reactDomClient.createRoot)(document.getElementById('root'));
root.render(_react2['default'].createElement(_App2['default'], null));