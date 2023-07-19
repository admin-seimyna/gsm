"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Routes_Map_js"],{

/***/ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js":
/*!******************************************************************!*\
  !*** ./node_modules/@googlemaps/js-api-loader/dist/index.esm.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_ID: () => (/* binding */ DEFAULT_ID),
/* harmony export */   Loader: () => (/* binding */ Loader),
/* harmony export */   LoaderStatus: () => (/* binding */ LoaderStatus)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */
var LoaderStatus;
(function (LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */
class Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version, }) {
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if (Loader.instance) {
            if (!fastDeepEqual(this.options, Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
            }
            return Loader.instance;
        }
        Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
            authReferrerPolicy: this.authReferrerPolicy,
        };
    }
    get status() {
        if (this.errors.length) {
            return LoaderStatus.FAILURE;
        }
        if (this.done) {
            return LoaderStatus.SUCCESS;
        }
        if (this.loading) {
            return LoaderStatus.LOADING;
        }
        return LoaderStatus.INITIALIZED;
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     * @deprecated
     */
    createUrl() {
        let url = this.url;
        url += `?callback=__googleMapsCallback`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        if (this.authReferrerPolicy) {
            url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        }
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     * @deprecated, use importLibrary() instead.
     */
    load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     * @deprecated, use importLibrary() instead.
     */
    loadPromise() {
        return new Promise((resolve, reject) => {
            this.loadCallback((err) => {
                if (!err) {
                    resolve(window.google);
                }
                else {
                    reject(err.error);
                }
            });
        });
    }
    importLibrary(name) {
        this.execute();
        return google.maps.importLibrary(name);
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     * @deprecated, use importLibrary() instead.
     */
    loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
        var _a, _b;
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const params = {
            key: this.apiKey,
            channel: this.channel,
            client: this.client,
            libraries: this.libraries.length && this.libraries,
            v: this.version,
            mapIds: this.mapIds,
            language: this.language,
            region: this.region,
            authReferrerPolicy: this.authReferrerPolicy,
        };
        // keep the URL minimal:
        Object.keys(params).forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key) => !params[key] && delete params[key]);
        if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
            // tweaked copy of https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
            // which also sets the base url, the id, and the nonce
            /* eslint-disable */
            ((g) => {
                // @ts-ignore
                let h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
                // @ts-ignore
                b = b[c] || (b[c] = {});
                // @ts-ignore
                const d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => 
                // @ts-ignore
                h || (h = new Promise((f, n) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    yield (a = m.createElement("script"));
                    a.id = this.id;
                    e.set("libraries", [...r] + "");
                    // @ts-ignore
                    for (k in g)
                        e.set(k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), g[k]);
                    e.set("callback", c + ".maps." + q);
                    a.src = this.url + `?` + e;
                    d[q] = f;
                    a.onerror = () => (h = n(Error(p + " could not load.")));
                    // @ts-ignore
                    a.nonce = this.nonce || ((_a = m.querySelector("script[nonce]")) === null || _a === void 0 ? void 0 : _a.nonce) || "";
                    m.head.append(a);
                })));
                // @ts-ignore
                d[l] ? console.warn(p + " only loads once. Ignoring:", g) : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
            })(params);
            /* eslint-enable */
        }
        // While most libraries populate the global namespace when loaded via bootstrap params,
        // this is not the case for "marker" when used with the inline bootstrap loader
        // (and maybe others in the future). So ensure there is an importLibrary for each:
        const libraryPromises = this.libraries.map((library) => this.importLibrary(library));
        // ensure at least one library, to kick off loading...
        if (!libraryPromises.length) {
            libraryPromises.push(this.importLibrary("core"));
        }
        Promise.all(libraryPromises).then(() => this.callback(), (error) => {
            const event = new ErrorEvent("error", { error }); // for backwards compat
            this.loadErrorCallback(event);
        });
    }
    /**
     * Reset the loader state.
     */
    reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) {
            this.reset();
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(() => {
                this.deleteScript();
                this.setScript();
            }, delay);
        }
        else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.done) {
            this.callback();
        }
        else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." +
                    "This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            if (this.loading) ;
            else {
                this.loading = true;
                this.setScript();
            }
        }
    }
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./resources/js/Routes/Map.js":
/*!************************************!*\
  !*** ./resources/js/Routes/Map.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Map)
/* harmony export */ });
/* harmony import */ var _Utilities_GMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utilities/GMap */ "./resources/js/Utilities/GMap.js");
/* harmony import */ var _Utilities_Device__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utilities/Device */ "./resources/js/Utilities/Device.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utilities_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utilities/Form */ "./resources/js/Utilities/Form.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var Map = /*#__PURE__*/function () {
  function Map() {
    var _this = this;
    _classCallCheck(this, Map);
    _defineProperty(this, "map", void 0);
    _defineProperty(this, "panelEl", void 0);
    _defineProperty(this, "listEl", void 0);
    _defineProperty(this, "countEl", void 0);
    _defineProperty(this, "devices", []);
    _defineProperty(this, "url", void 0);
    _defineProperty(this, "spinnerEl", void 0);
    _defineProperty(this, "loadedDevicesCountInMapEl", void 0);
    _defineProperty(this, "loadedDevicesCountInMap", 0);
    _defineProperty(this, "$deviceFormModal", void 0);
    _defineProperty(this, "backdrop", void 0);
    _defineProperty(this, "deviceForm", void 0);
    this.panelEl = document.querySelector('.devices-panel');
    this.listEl = document.querySelector('.devices-panel__list');
    this.countEl = document.querySelector('.devices-count');
    this.loadedCountEl = document.querySelector('.devices-loaded');
    this.loadedDevicesCountInMapEl = document.querySelector('.loaded-devices-count');
    this.$deviceFormModal = $('#device-form-modal');
    this.$modalBackdrop = $('.modal-backdrop');
    this.deviceForm = new _Utilities_Form__WEBPACK_IMPORTED_MODULE_3__["default"](document.querySelector('.device-form'), {
      url: '/device',
      success: this.addNewDevice.bind(this)
    });
    this.url = '/map/user-devices';
    this.map = new _Utilities_GMap__WEBPACK_IMPORTED_MODULE_0__["default"]({
      key: API_KEY,
      url: '/map/devices',
      el: document.querySelector('.map'),
      callbacks: {
        load: function load(data) {
          _this.loadedDevicesCountInMap += data.length;
          _this.loadedDevicesCountInMapEl.innerText = _this.loadedDevicesCountInMap;
        }
      }
    });
    this.map.load().then(this.setup.bind(this));
  }
  _createClass(Map, [{
    key: "setup",
    value: function setup() {
      document.querySelector('.add-device-btn').addEventListener('click', this.openDeviceForm.bind(this), false);
      $('.modal-close').on('click', this.closeDeviceForm.bind(this));
      this.loadDevices();
      this.getDevicesCount();
      this.listEl.addEventListener('scroll', this.loadMoreDevices.bind(this), false);
    }
  }, {
    key: "addNewDevice",
    value: function addNewDevice(response) {
      this.map.addOrUpdateDeviceInMap(response.data.data);
      this.closeDeviceForm();
    }
  }, {
    key: "loadMoreDevices",
    value: function loadMoreDevices() {
      var bounds = this.listEl.getBoundingClientRect();
      var value = this.listEl.scrollHeight - this.listEl.scrollTop - bounds.height;
      if (value > 0) return;
      this.loadDevices();
    }
  }, {
    key: "loadDevices",
    value: function loadDevices() {
      var _this2 = this;
      if (!this.url || this.loading) return;
      this.showSpinner();
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.url).then(function (response) {
        _this2.hideSpinner();
        _this2.url = response.data.links.next;
        response.data.data.forEach(_this2.addDevice.bind(_this2));
        _this2.loadedCountEl.innerText = _this2.devices.length;
      });
    }
  }, {
    key: "addDevice",
    value: function addDevice(device) {
      var prepend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      device = new _Utilities_Device__WEBPACK_IMPORTED_MODULE_1__["default"]({
        device: device,
        prepend: prepend,
        listElement: this.listEl,
        onChange: this.toggleDevice.bind(this)
      });
      this.devices.push(device);
    }
  }, {
    key: "getDevicesCount",
    value: function getDevicesCount() {
      var _this3 = this;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get('/map/devices-count').then(function (response) {
        _this3.countEl.innerText = response.data.count;
      });
    }
  }, {
    key: "toggleDevice",
    value: function toggleDevice(e) {
      var _this4 = this;
      var id = e.target.value;
      var status = e.target.checked ? 1 : 0;
      axios__WEBPACK_IMPORTED_MODULE_2___default().put("/device/".concat(id, "/change-status"), {
        status: status
      }).then(function () {
        if (status) {
          _this4.map.showDevice(id);
        } else {
          _this4.map.hideDevice(id);
        }
      });
    }
  }, {
    key: "showSpinner",
    value: function showSpinner() {
      if (this.spinnerEl) return;
      this.loading = true;
      this.spinnerEl = document.createElement('div');
      this.spinnerEl.className = 'w-100 d-flex align-items-center justify-content-center py-5';
      this.spinnerEl.innerHTML = "\n            <div class=\"spinner-border text-primary\" role=\"status\">\n                <span class=\"visually-hidden\">Loading...</span>\n            </div>\n        ";
      this.listEl.appendChild(this.spinnerEl);
    }
  }, {
    key: "hideSpinner",
    value: function hideSpinner() {
      this.loading = false;
      this.listEl.removeChild(this.spinnerEl);
      this.spinnerEl = null;
    }
  }, {
    key: "openDeviceForm",
    value: function openDeviceForm() {
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(this.backdrop);
      this.$deviceFormModal.addClass('show').css({
        display: 'block'
      });
    }
  }, {
    key: "closeDeviceForm",
    value: function closeDeviceForm() {
      document.body.removeChild(this.backdrop);
      this.$modalBackdrop.removeClass('show');
      this.$deviceFormModal.removeClass('show').css({
        display: 'none'
      });
      this.deviceForm.reset();
    }
  }]);
  return Map;
}();


/***/ }),

/***/ "./resources/js/Utilities/Device.js":
/*!******************************************!*\
  !*** ./resources/js/Utilities/Device.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Device)
/* harmony export */ });
/* harmony import */ var handlebars_dist_cjs_handlebars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! handlebars/dist/cjs/handlebars */ "./node_modules/handlebars/dist/cjs/handlebars.js");
/* harmony import */ var handlebars_dist_cjs_handlebars__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(handlebars_dist_cjs_handlebars__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Device = /*#__PURE__*/function () {
  function Device(_ref) {
    var device = _ref.device,
      listElement = _ref.listElement,
      onChange = _ref.onChange;
    _classCallCheck(this, Device);
    _defineProperty(this, "el", void 0);
    _defineProperty(this, "device", void 0);
    _defineProperty(this, "checkbox", void 0);
    _defineProperty(this, "listElement", void 0);
    _defineProperty(this, "callback", void 0);
    this.device = device;
    this.listElement = listElement;
    this.callback = onChange;
    this.render();
  }
  _createClass(Device, [{
    key: "render",
    value: function render() {
      if (this.checkbox) {
        this.checkbox.removeEventListener('change', this.callback);
      }
      var el = document.createElement('div');
      el.className = 'device list-group-item';
      el.innerHTML = handlebars_dist_cjs_handlebars__WEBPACK_IMPORTED_MODULE_0__.compile("\n            <div class=\"form-check device__control\">\n              <input class=\"form-check-input\" type=\"checkbox\" value=\"{{id}}\" checked>\n            </div>\n            <div class=\"device__content\">\n                <strong>{{name}}</strong>\n                <span>{{imei}}</span>\n            </div>\n        ")(this.device);
      this.listElement.appendChild(el);
      this.checkbox = el.querySelector('.form-check-input');
      this.checkbox.addEventListener('change', this.callback, false);
    }
  }]);
  return Device;
}();


/***/ }),

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
    key: "reset",
    value: function reset() {
      this.el.reset();
      this.clear();
    }
  }, {
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
      spinner.className = 'spinner-border text-primary';
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

/***/ "./resources/js/Utilities/GMap.js":
/*!****************************************!*\
  !*** ./resources/js/Utilities/GMap.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GMap)
/* harmony export */ });
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var GMap = /*#__PURE__*/function () {
  /**
   *
   * @param url
   * @param key
   * @param el
   * @param debounce
   */
  function GMap(_ref) {
    var url = _ref.url,
      key = _ref.key,
      el = _ref.el,
      debounce = _ref.debounce,
      callbacks = _ref.callbacks;
    _classCallCheck(this, GMap);
    _defineProperty(this, "url", void 0);
    _defineProperty(this, "el", void 0);
    _defineProperty(this, "loader", void 0);
    _defineProperty(this, "infoWindow", void 0);
    _defineProperty(this, "geocoder", void 0);
    _defineProperty(this, "map", void 0);
    _defineProperty(this, "makerClass", void 0);
    _defineProperty(this, "debounce", void 0);
    _defineProperty(this, "debouncer", void 0);
    _defineProperty(this, "devices", []);
    _defineProperty(this, "cache", void 0);
    _defineProperty(this, "cluster", void 0);
    _defineProperty(this, "callbacks", void 0);
    this.url = url;
    this.el = el;
    this.debounce = debounce || 200;
    this.callbacks = Object.assign({
      load: function load() {}
    }, callbacks);
    this.loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_0__.Loader({
      apiKey: key,
      version: "weekly"
    });
  }
  _createClass(GMap, [{
    key: "load",
    value: function load(options) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.loader.load().then(_this.setup.bind(_this, resolve, options))["catch"](reject);
      });
    }

    /**
     * Setup map
     * @param resolve
     * @param options
     * @returns {Promise<void>}
     */
  }, {
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve) {
        var options,
          _yield$google$maps$im,
          Map,
          InfoWindow,
          _yield$google$maps$im2,
          AdvancedMarkerElement,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.next = 3;
              return google.maps.importLibrary('maps');
            case 3:
              _yield$google$maps$im = _context.sent;
              Map = _yield$google$maps$im.Map;
              InfoWindow = _yield$google$maps$im.InfoWindow;
              _context.next = 8;
              return google.maps.importLibrary('marker');
            case 8:
              _yield$google$maps$im2 = _context.sent;
              AdvancedMarkerElement = _yield$google$maps$im2.AdvancedMarkerElement;
              this.makerClass = AdvancedMarkerElement;
              this.geocoder = new google.maps.Geocoder();
              this.infoWindow = new InfoWindow();
              this.map = new Map(this.el, Object.assign({
                center: {
                  lat: 54.687157,
                  lng: 25.279652
                },
                zoom: 10,
                mapId: '4504f8b37365c3d0'
              }, options));
              google.maps.event.addListener(this.map, 'bounds_changed', this.onBoundsChange.bind(this), false);
              this.map.addListener("click", function (e) {
                console.log(e.latLng.lat(), e.latLng.lng());
              });
              resolve();
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setup(_x) {
        return _setup.apply(this, arguments);
      }
      return setup;
    }()
  }, {
    key: "onBoundsChange",
    value: function onBoundsChange() {
      var bounds = this.map.getBounds();
      var southWest = bounds.getSouthWest(); // top - right
      var northEast = bounds.getNorthEast(); // bottom - left

      this.loadDevices({
        lat: northEast.lat(),
        lng: northEast.lng()
      }, {
        lat: southWest.lat(),
        lng: southWest.lng()
      });
    }
  }, {
    key: "loadDevices",
    value: function loadDevices(northEast, southWest) {
      clearTimeout(this.debouncer);
      this.debouncer = setTimeout(this.sendRequest.bind(this, northEast, southWest), this.debounce);
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(northEast, southWest) {
      var _this2 = this;
      axios.post('/map/devices', {
        coordinates: {
          lat: [southWest.lat, northEast.lat],
          lng: [southWest.lng, northEast.lng]
        },
        exclude: this.getCachedCoordinates()
      }).then(function (response) {
        var _response$data;
        if (!(response !== null && response !== void 0 && (_response$data = response.data) !== null && _response$data !== void 0 && _response$data.data)) return;
        _this2.cacheScannedArea(northEast, southWest);
        response.data.data.forEach(function (device) {
          _this2.addDeviceToMap(device);
        });
        // this.handleDevicesInMap();

        if (typeof _this2.callbacks.load === 'function') {
          _this2.callbacks.load(response.data.data);
        }
      });
    }
  }, {
    key: "handleDevicesInMap",
    value: function handleDevicesInMap() {
      var _this3 = this;
      this.devices.forEach(function (device) {
        var visible = _this3.checkIfDeviceVisibleInMap(device);
        if (visible && device.visible || !visible && !device.visible) {
          return;
        }
        device.visible = visible ? 1 : 0;
        device.marker.setMap(visible ? _this3.map : null);
      });
    }
  }, {
    key: "checkIfDeviceVisibleInMap",
    value: function checkIfDeviceVisibleInMap(device) {
      var bounds = this.map.getBounds();
      var latLng = new google.maps.LatLng(device.lat, device.lng);
      return bounds.contains(latLng);
    }
  }, {
    key: "addDeviceToMap",
    value: function addDeviceToMap(device) {
      var visible = this.checkIfDeviceVisibleInMap(device);
      var marker = new this.makerClass({
        map: visible ? this.map : null,
        position: {
          lat: parseFloat(device.lat),
          lng: parseFloat(device.lng)
        },
        title: device.name
      });
      marker.addListener('click', this.showPopup.bind(this, device));
      this.devices.push(Object.assign(device, {
        visible: visible,
        active: true,
        marker: marker
      }));
    }
  }, {
    key: "addOrUpdateDeviceInMap",
    value: function addOrUpdateDeviceInMap(device) {
      var index = this.devices.findIndex(function (value) {
        return value.id === device.id;
      });
      if (index !== -1) {
        var mapDevice = this.devices[index];
        mapDevice.marker.setMap(null);
        this.devices.splice(index, 1);
        device = Object.assign(mapDevice, device);
      }
      this.addDeviceToMap(device);
    }
  }, {
    key: "showPopup",
    value: function showPopup(device, _ref2) {
      var latLng = _ref2.latLng,
        domEvent = _ref2.domEvent;
      this.infoWindow.open(device.marker.map, device.marker);
    }
  }, {
    key: "getCachedCoordinates",
    value: function getCachedCoordinates() {
      if (!this.cache) {
        return null;
      }
      return {
        lat: [this.cache.southWest.lat, this.cache.northEast.lat],
        lng: [this.cache.southWest.lng, this.cache.northEast.lng]
      };
    }
  }, {
    key: "showDevice",
    value: function showDevice(id) {
      var device = this.devices.find(function (device) {
        return device.id === parseInt(id);
      });
      if (!device) return;
      device.marker.setMap(this.map);
    }
  }, {
    key: "hideDevice",
    value: function hideDevice(id) {
      var device = this.devices.find(function (device) {
        return device.id === parseInt(id);
      });
      if (!device) return;
      device.marker.setMap(null);
    }

    /**
     * Update cached coordinates
     * @param northEast
     * @param southWest
     */
  }, {
    key: "cacheScannedArea",
    value: function cacheScannedArea(northEast, southWest) {
      if (!this.cache) {
        this.cache = {
          northEast: northEast,
          southWest: southWest
        };
        return;
      }
      if (this.cache.northEast.lat < northEast.lat) {
        this.cache.northEast.lat = northEast.lat;
      }
      if (this.cache.southWest.lat > southWest.lat) {
        this.cache.southWest.lat = southWest.lat;
      }
      if (this.cache.northEast.lng < northEast.lng) {
        this.cache.northEast.lng = northEast.lng;
      }
      if (this.cache.southWest.lng > southWest.lng) {
        this.cache.southWest.lng = southWest.lng;
      }
    }
  }]);
  return GMap;
}();


/***/ })

}]);