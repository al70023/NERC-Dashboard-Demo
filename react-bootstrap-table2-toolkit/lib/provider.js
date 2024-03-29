'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolkitprovider = function Toolkitprovider(props) {
  return _react2.default.createElement(
    _context2.default.Provider,
    props,
    _react2.default.createElement(
      _context2.default.Consumer,
      null,
      function (tookKitProps) {
        return props.children(tookKitProps);
      }
    )
  );
};

Toolkitprovider.propTypes = {
  children: _propTypes2.default.func.isRequired
};

exports.default = Toolkitprovider;