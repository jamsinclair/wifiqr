'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var form = document.querySelector('form');
var passwordInput = document.querySelector('input[name=pass]');
var protocolSelector = document.querySelector('select');

var getWifiCode = function getWifiCode(ssid, pass, protocol, hidden) {
  var escape = function escape() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return str.replace(/([\\;,:"])/g, '\\$1');
  };

  var code = "WIFI:S:".concat(escape(ssid), ";T:").concat(escape(protocol), ";");

  if (protocol !== 'nopass') {
    code += "P:".concat(escape(pass), ";");
  }

  if (hidden === 'true') {
    code += 'H:true;';
  }

  return code + ';';
};

var updatePasswordValidation = function updatePasswordValidation(protocol) {
  passwordInput.required = protocol === 'nopass' ? '' : 'required';
  passwordInput.disabled = protocol === 'nopass' ? 'disabled' : '';
  passwordInput.minLength = protocol === 'WEP' ? '5' : '8';
};

var handleProtocolChange = function handleProtocolChange(event) {
  updatePasswordValidation(event.target.value);
};

updatePasswordValidation(protocolSelector.value);
protocolSelector.addEventListener('change', handleProtocolChange);
protocolSelector.addEventListener('blur', handleProtocolChange);
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = new FormData(form); // eslint-disable-next-line no-useless-call

  var code = getWifiCode.call.apply(getWifiCode, [null].concat(_toConsumableArray(formData.values())));
  QRCode.toDataURL(code, {
    width: 800,
    height: 800
  }).then(function (dataUri) {
    document.querySelector('.code').innerHTML = "<img src=".concat(dataUri, " alt=\"Generated Wifi QR Code\">");
    document.querySelector('.output').style = 'display: block';
  });
});
document.querySelector('.print').addEventListener('click', function () {
  return window.print();
});
