"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Views_Login_js"],{

/***/ "./resources/js/Utilities/Form.js":
/*!****************************************!*\
  !*** ./resources/js/Utilities/Form.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Form = /*#__PURE__*/function () {
  function Form(el, options) {
    _classCallCheck(this, Form);
    _defineProperty(this, "el", void 0);
    _defineProperty(this, "options", {});
    this.el = el;
    this.options = Object.assign({
      method: 'post',
      url: '',
      error: function error(errors) {},
      success: function success(response) {},
      progress: function progress(status) {}
    }, options);
    this.el.addEventListener('submit', this.onSubmit.bind(this), false);
  }
  _createClass(Form, [{
    key: "onSubmit",
    value: function onSubmit(e) {
      var _this = this;
      e.preventDefault();
      this.callback('progress', true);
      this.clear();
      this.handleProgress();
      var formData = new FormData(this.el);
      (axios__WEBPACK_IMPORTED_MODULE_0___default())[this.options.method](this.options.url, formData).then(function (response) {
        _this.callback('success', response);
      })["catch"](function (error) {
        var _error$response;
        var errors = error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.errors;
        _this.callback('error', errors);
        if (!errors) {
          console.error('Form error!');
          return;
        }
        _this.handleErrors(errors);
      })["finally"](function () {
        _this.callback('progress', false);
        _this.removeSpinner();
      });
    }
  }, {
    key: "handleProgress",
    value: function handleProgress() {
      var el = document.createElement('div');
      el.className = 'form-progress';
      var spinner = document.createElement('div');
      spinner.className = 'spinner-border';
      el.appendChild(spinner);
      this.el.appendChild(el);
    }
  }, {
    key: "callback",
    value: function callback(name, data) {
      if (typeof this.options[name] === 'function') {
        this.options[name](data);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.el.querySelectorAll('.is-invalid').forEach(function (el) {
        return el.classList.remove('is-invalid');
      });
      this.el.querySelectorAll('.invalid-feedback').forEach(function (el) {
        return el.parentNode.removeChild(el);
      });
      this.removeSpinner();
    }
  }, {
    key: "removeSpinner",
    value: function removeSpinner() {
      var spinner = this.el.querySelector('.form-progress');
      if (!spinner) return;
      this.el.removeChild(spinner);
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(errors) {
      var _this2 = this;
      Object.keys(errors).forEach(function (field) {
        var messages = errors[field];
        var input = _this2.el.querySelector("[name=".concat(field, "]"));
        if (!input) return;
        input.classList.add('is-invalid');
        var msg = document.createElement('div');
        msg.className = 'invalid-feedback';
        msg.innerText = messages[0];
        input.parentNode.appendChild(msg);
      });
    }
  }]);
  return Form;
}();


/***/ }),

/***/ "./resources/js/Views/Login.js":
/*!*************************************!*\
  !*** ./resources/js/Views/Login.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Map)
/* harmony export */ });
/* harmony import */ var _Utilities_Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../Utilities/Form */ "./resources/js/Utilities/Form.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = /*#__PURE__*/_createClass(function Map(_ref) {
  var router = _ref.router;
  _classCallCheck(this, Map);
  this.form = new _Utilities_Form__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('.login-form'), {
    url: '/login',
    success: function success() {
      router.push('map');
    }
  });
});


/***/ })

}]);