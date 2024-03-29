'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ExportCSVButton = function ExportCSVButton(props) {
  var onExport = props.onExport,
      children = props.children,
      className = props.className,
      rest = _objectWithoutProperties(props, ['onExport', 'children', 'className']);

  return _react2.default.createElement(
    'button',
    _extends({
      type: 'button',
      className: 'react-bs-table-csv-btn btn btn-default ' + className,
      onClick: function onClick() {
        return onExport();
      }
    }, rest),
    children
  );
};

ExportCSVButton.propTypes = {
  children: _propTypes2.default.node.isRequired,
  onExport: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
ExportCSVButton.defaultProps = {
  className: '',
  style: {}
};

exports.default = ExportCSVButton;