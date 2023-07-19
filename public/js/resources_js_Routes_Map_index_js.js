"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Routes_Map_Index_js"],{

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

/***/ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js":
/*!********************************************************************!*\
  !*** ./node_modules/@googlemaps/markerclusterer/dist/index.esm.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractAlgorithm: () => (/* binding */ AbstractAlgorithm),
/* harmony export */   AbstractViewportAlgorithm: () => (/* binding */ AbstractViewportAlgorithm),
/* harmony export */   Cluster: () => (/* binding */ Cluster),
/* harmony export */   ClusterStats: () => (/* binding */ ClusterStats),
/* harmony export */   DefaultRenderer: () => (/* binding */ DefaultRenderer),
/* harmony export */   GridAlgorithm: () => (/* binding */ GridAlgorithm),
/* harmony export */   MarkerClusterer: () => (/* binding */ MarkerClusterer),
/* harmony export */   MarkerClustererEvents: () => (/* binding */ MarkerClustererEvents),
/* harmony export */   NoopAlgorithm: () => (/* binding */ NoopAlgorithm),
/* harmony export */   SuperClusterAlgorithm: () => (/* binding */ SuperClusterAlgorithm),
/* harmony export */   defaultOnClusterClickHandler: () => (/* binding */ defaultOnClusterClickHandler),
/* harmony export */   distanceBetweenPoints: () => (/* binding */ distanceBetweenPoints),
/* harmony export */   extendBoundsToPaddedViewport: () => (/* binding */ extendBoundsToPaddedViewport),
/* harmony export */   extendPixelBounds: () => (/* binding */ extendPixelBounds),
/* harmony export */   filterMarkersToPaddedViewport: () => (/* binding */ filterMarkersToPaddedViewport),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   pixelBoundsToLatLngBounds: () => (/* binding */ pixelBoundsToLatLngBounds)
/* harmony export */ });
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var supercluster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! supercluster */ "./node_modules/supercluster/index.js");



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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MarkerUtils {
    static isAdvancedMarkerAvailable(map) {
        return (google.maps.marker &&
            map.getMapCapabilities().isAdvancedMarkersAvailable === true);
    }
    static isAdvancedMarker(marker) {
        return (google.maps.marker &&
            marker instanceof google.maps.marker.AdvancedMarkerElement);
    }
    static setMap(marker, map) {
        if (this.isAdvancedMarker(marker)) {
            marker.map = map;
        }
        else {
            marker.setMap(map);
        }
    }
    static getPosition(marker) {
        // SuperClusterAlgorithm.calculate expects a LatLng instance so we fake it for Adv Markers
        if (this.isAdvancedMarker(marker)) {
            if (marker.position) {
                if (marker.position instanceof google.maps.LatLng) {
                    return marker.position;
                }
                // since we can't cast to LatLngLiteral for reasons =(
                if (marker.position.lat && marker.position.lng) {
                    return new google.maps.LatLng(marker.position.lat, marker.position.lng);
                }
            }
            return new google.maps.LatLng(null);
        }
        return marker.getPosition();
    }
    static getVisible(marker) {
        if (this.isAdvancedMarker(marker)) {
            /**
             * Always return true for Advanced Markers because the clusterer
             * uses getVisible as a way to count legacy markers not as an actual
             * indicator of visibility for some reason. Even when markers are hidden
             * Marker.getVisible returns `true` and this is used to set the marker count
             * on the cluster. See the behavior of Cluster.count
             */
            return true;
        }
        return marker.getVisible();
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cluster {
    constructor({ markers, position }) {
        this.markers = markers;
        if (position) {
            if (position instanceof google.maps.LatLng) {
                this._position = position;
            }
            else {
                this._position = new google.maps.LatLng(position);
            }
        }
    }
    get bounds() {
        if (this.markers.length === 0 && !this._position) {
            return;
        }
        const bounds = new google.maps.LatLngBounds(this._position, this._position);
        for (const marker of this.markers) {
            bounds.extend(MarkerUtils.getPosition(marker));
        }
        return bounds;
    }
    get position() {
        return this._position || this.bounds.getCenter();
    }
    /**
     * Get the count of **visible** markers.
     */
    get count() {
        return this.markers.filter((m) => MarkerUtils.getVisible(m)).length;
    }
    /**
     * Add a marker to the cluster.
     */
    push(marker) {
        this.markers.push(marker);
    }
    /**
     * Cleanup references and remove marker from map.
     */
    delete() {
        if (this.marker) {
            MarkerUtils.setMap(this.marker, null);
            this.marker = undefined;
        }
        this.markers.length = 0;
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns the markers visible in a padded map viewport
 *
 * @param map
 * @param mapCanvasProjection
 * @param markers The list of marker to filter
 * @param viewportPaddingPixels The padding in pixel
 * @returns The list of markers in the padded viewport
 */
const filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPaddingPixels) => {
    const extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPaddingPixels);
    return markers.filter((marker) => extendedMapBounds.contains(MarkerUtils.getPosition(marker)));
};
/**
 * Extends a bounds by a number of pixels in each direction
 */
const extendBoundsToPaddedViewport = (bounds, projection, numPixels) => {
    const { northEast, southWest } = latLngBoundsToPixelBounds(bounds, projection);
    const extendedPixelBounds = extendPixelBounds({ northEast, southWest }, numPixels);
    return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
};
/**
 * Returns the distance between 2 positions.
 *
 * @hidden
 */
const distanceBetweenPoints = (p1, p2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const a = sinDLat * sinDLat +
        Math.cos((p1.lat * Math.PI) / 180) *
            Math.cos((p2.lat * Math.PI) / 180) *
            sinDLon *
            sinDLon;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
/**
 * Converts a LatLng bound to pixels.
 *
 * @hidden
 */
const latLngBoundsToPixelBounds = (bounds, projection) => {
    return {
        northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
        southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest()),
    };
};
/**
 * Extends a pixel bounds by numPixels in all directions.
 *
 * @hidden
 */
const extendPixelBounds = ({ northEast, southWest }, numPixels) => {
    northEast.x += numPixels;
    northEast.y -= numPixels;
    southWest.x -= numPixels;
    southWest.y += numPixels;
    return { northEast, southWest };
};
/**
 * @hidden
 */
const pixelBoundsToLatLngBounds = ({ northEast, southWest }, projection) => {
    const sw = projection.fromDivPixelToLatLng(southWest);
    const ne = projection.fromDivPixelToLatLng(northEast);
    return new google.maps.LatLngBounds(sw, ne);
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @hidden
 */
class AbstractAlgorithm {
    constructor({ maxZoom = 16 }) {
        this.maxZoom = maxZoom;
    }
    /**
     * Helper function to bypass clustering based upon some map state such as
     * zoom, number of markers, etc.
     *
     * ```typescript
     *  cluster({markers, map}: AlgorithmInput): Cluster[] {
     *    if (shouldBypassClustering(map)) {
     *      return this.noop({markers})
     *    }
     * }
     * ```
     */
    noop({ markers, }) {
        return noop(markers);
    }
}
/**
 * Abstract viewport algorithm proves a class to filter markers by a padded
 * viewport. This is a common optimization.
 *
 * @hidden
 */
class AbstractViewportAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { viewportPadding = 60 } = _a, options = __rest(_a, ["viewportPadding"]);
        super(options);
        this.viewportPadding = 60;
        this.viewportPadding = viewportPadding;
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        if (map.getZoom() >= this.maxZoom) {
            return {
                clusters: this.noop({
                    markers,
                }),
                changed: false,
            };
        }
        return {
            clusters: this.cluster({
                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
                map,
                mapCanvasProjection,
            }),
        };
    }
}
/**
 * @hidden
 */
const noop = (markers) => {
    const clusters = markers.map((marker) => new Cluster({
        position: MarkerUtils.getPosition(marker),
        markers: [marker],
    }));
    return clusters;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default Grid algorithm historically used in Google Maps marker
 * clustering.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 */
class GridAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxDistance = 40000, gridSize = 40 } = _a, options = __rest(_a, ["maxDistance", "gridSize"]);
        super(options);
        this.clusters = [];
        this.state = { zoom: -1 };
        this.maxDistance = maxDistance;
        this.gridSize = gridSize;
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        const state = { zoom: map.getZoom() };
        let changed = false;
        if (this.state.zoom >= this.maxZoom && state.zoom >= this.maxZoom) ;
        else {
            changed = !fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(this.state, state);
        }
        this.state = state;
        if (map.getZoom() >= this.maxZoom) {
            return {
                clusters: this.noop({
                    markers,
                }),
                changed,
            };
        }
        return {
            clusters: this.cluster({
                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
                map,
                mapCanvasProjection,
            }),
        };
    }
    cluster({ markers, map, mapCanvasProjection, }) {
        this.clusters = [];
        markers.forEach((marker) => {
            this.addToClosestCluster(marker, map, mapCanvasProjection);
        });
        return this.clusters;
    }
    addToClosestCluster(marker, map, projection) {
        let maxDistance = this.maxDistance; // Some large number
        let cluster = null;
        for (let i = 0; i < this.clusters.length; i++) {
            const candidate = this.clusters[i];
            const distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), MarkerUtils.getPosition(marker).toJSON());
            if (distance < maxDistance) {
                maxDistance = distance;
                cluster = candidate;
            }
        }
        if (cluster &&
            extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(MarkerUtils.getPosition(marker))) {
            cluster.push(marker);
        }
        else {
            const cluster = new Cluster({ markers: [marker] });
            this.clusters.push(cluster);
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Noop algorithm does not generate any clusters or filter markers by the an extended viewport.
 */
class NoopAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var options = __rest(_a, []);
        super(options);
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        return {
            clusters: this.cluster({ markers, map, mapCanvasProjection }),
            changed: false,
        };
    }
    cluster(input) {
        return this.noop(input);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A very fast JavaScript algorithm for geospatial point clustering using KD trees.
 *
 * @see https://www.npmjs.com/package/supercluster for more information on options.
 */
class SuperClusterAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
        super({ maxZoom });
        this.state = { zoom: -1 };
        this.superCluster = new supercluster__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({ maxZoom: this.maxZoom, radius }, options));
    }
    calculate(input) {
        let changed = false;
        const state = { zoom: input.map.getZoom() };
        if (!fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(input.markers, this.markers)) {
            changed = true;
            // TODO use proxy to avoid copy?
            this.markers = [...input.markers];
            const points = this.markers.map((marker) => {
                const position = MarkerUtils.getPosition(marker);
                const coordinates = [position.lng(), position.lat()];
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates,
                    },
                    properties: { marker },
                };
            });
            this.superCluster.load(points);
        }
        if (!changed) {
            if (this.state.zoom <= this.maxZoom || state.zoom <= this.maxZoom) {
                changed = !fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(this.state, state);
            }
        }
        this.state = state;
        if (changed) {
            this.clusters = this.cluster(input);
        }
        return { clusters: this.clusters, changed };
    }
    cluster({ map }) {
        return this.superCluster
            .getClusters([-180, -90, 180, 90], Math.round(map.getZoom()))
            .map((feature) => this.transformCluster(feature));
    }
    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
        if (properties.cluster) {
            return new Cluster({
                markers: this.superCluster
                    .getLeaves(properties.cluster_id, Infinity)
                    .map((leaf) => leaf.properties.marker),
                position: { lat, lng },
            });
        }
        const marker = properties.marker;
        return new Cluster({
            markers: [marker],
            position: MarkerUtils.getPosition(marker),
        });
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides statistics on all clusters in the current render cycle for use in {@link Renderer.render}.
 */
class ClusterStats {
    constructor(markers, clusters) {
        this.markers = { sum: markers.length };
        const clusterMarkerCounts = clusters.map((a) => a.count);
        const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
        this.clusters = {
            count: clusters.length,
            markers: {
                mean: clusterMarkerSum / clusters.length,
                sum: clusterMarkerSum,
                min: Math.min(...clusterMarkerCounts),
                max: Math.max(...clusterMarkerCounts),
            },
        };
    }
}
class DefaultRenderer {
    /**
     * The default render function for the library used by {@link MarkerClusterer}.
     *
     * Currently set to use the following:
     *
     * ```typescript
     * // change color if this cluster has more markers than the mean cluster
     * const color =
     *   count > Math.max(10, stats.clusters.markers.mean)
     *     ? "#ff0000"
     *     : "#0000ff";
     *
     * // create svg url with fill color
     * const svg = window.btoa(`
     * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
     *   <circle cx="120" cy="120" opacity=".6" r="70" />
     *   <circle cx="120" cy="120" opacity=".3" r="90" />
     *   <circle cx="120" cy="120" opacity=".2" r="110" />
     *   <circle cx="120" cy="120" opacity=".1" r="130" />
     * </svg>`);
     *
     * // create marker using svg icon
     * return new google.maps.Marker({
     *   position,
     *   icon: {
     *     url: `data:image/svg+xml;base64,${svg}`,
     *     scaledSize: new google.maps.Size(45, 45),
     *   },
     *   label: {
     *     text: String(count),
     *     color: "rgba(255,255,255,0.9)",
     *     fontSize: "12px",
     *   },
     *   // adjust zIndex to be above other markers
     *   zIndex: 1000 + count,
     * });
     * ```
     */
    render({ count, position }, stats, map) {
        // change color if this cluster has more markers than the mean cluster
        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        // create svg literal with fill color
        const svg = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${count}</text>
</svg>`;
        const title = `Cluster of ${count} markers`, 
        // adjust zIndex to be above other markers
        zIndex = Number(google.maps.Marker.MAX_ZINDEX) + count;
        if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
            // create cluster SVG element
            const div = document.createElement("div");
            div.innerHTML = svg;
            const svgEl = div.firstElementChild;
            svgEl.setAttribute("transform", "translate(0 25)");
            const clusterOptions = {
                map,
                position,
                zIndex,
                title,
                content: svgEl,
            };
            return new google.maps.marker.AdvancedMarkerElement(clusterOptions);
        }
        const clusterOptions = {
            position,
            zIndex,
            title,
            icon: {
                url: `data:image/svg+xml;base64,${btoa(svg)}`,
                anchor: new google.maps.Point(25, 25),
            },
        };
        return new google.maps.Marker(clusterOptions);
    }
}

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Extends an object's prototype by another's.
 *
 * @param type1 The Type to be extended.
 * @param type2 The Type to extend with.
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend(type1, type2) {
    /* istanbul ignore next */
    // eslint-disable-next-line prefer-const
    for (let property in type2.prototype) {
        type1.prototype[property] = type2.prototype[property];
    }
}
/**
 * @ignore
 */
class OverlayViewSafe {
    constructor() {
        // MarkerClusterer implements google.maps.OverlayView interface. We use the
        // extend function to extend MarkerClusterer with google.maps.OverlayView
        // because it might not always be available when the code is defined so we
        // look for it at the last possible moment. If it doesn't exist now then
        // there is no point going ahead :)
        extend(OverlayViewSafe, google.maps.OverlayView);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MarkerClustererEvents;
(function (MarkerClustererEvents) {
    MarkerClustererEvents["CLUSTERING_BEGIN"] = "clusteringbegin";
    MarkerClustererEvents["CLUSTERING_END"] = "clusteringend";
    MarkerClustererEvents["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
const defaultOnClusterClickHandler = (_, cluster, map) => {
    map.fitBounds(cluster.bounds);
};
/**
 * MarkerClusterer creates and manages per-zoom-level clusters for large amounts
 * of markers. See {@link MarkerClustererOptions} for more details.
 *
 */
class MarkerClusterer extends OverlayViewSafe {
    constructor({ map, markers = [], algorithmOptions = {}, algorithm = new SuperClusterAlgorithm(algorithmOptions), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler, }) {
        super();
        this.markers = [...markers];
        this.clusters = [];
        this.algorithm = algorithm;
        this.renderer = renderer;
        this.onClusterClick = onClusterClick;
        if (map) {
            this.setMap(map);
        }
    }
    addMarker(marker, noDraw) {
        if (this.markers.includes(marker)) {
            return;
        }
        this.markers.push(marker);
        if (!noDraw) {
            this.render();
        }
    }
    addMarkers(markers, noDraw) {
        markers.forEach((marker) => {
            this.addMarker(marker, true);
        });
        if (!noDraw) {
            this.render();
        }
    }
    removeMarker(marker, noDraw) {
        const index = this.markers.indexOf(marker);
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        MarkerUtils.setMap(marker, null);
        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
        if (!noDraw) {
            this.render();
        }
        return true;
    }
    removeMarkers(markers, noDraw) {
        let removed = false;
        markers.forEach((marker) => {
            removed = this.removeMarker(marker, true) || removed;
        });
        if (removed && !noDraw) {
            this.render();
        }
        return removed;
    }
    clearMarkers(noDraw) {
        this.markers.length = 0;
        if (!noDraw) {
            this.render();
        }
    }
    /**
     * Recalculates and draws all the marker clusters.
     */
    render() {
        const map = this.getMap();
        if (map instanceof google.maps.Map && map.getProjection()) {
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
            const { clusters, changed } = this.algorithm.calculate({
                markers: this.markers,
                map,
                mapCanvasProjection: this.getProjection(),
            });
            // Allow algorithms to return flag on whether the clusters/markers have changed.
            if (changed || changed == undefined) {
                // Accumulate the markers of the clusters composed of a single marker.
                // Those clusters directly use the marker.
                // Clusters with more than one markers use a group marker generated by a renderer.
                const singleMarker = new Set();
                for (const cluster of clusters) {
                    if (cluster.markers.length == 1) {
                        singleMarker.add(cluster.markers[0]);
                    }
                }
                const groupMarkers = [];
                // Iterate the clusters that are currently rendered.
                for (const cluster of this.clusters) {
                    if (cluster.marker == null) {
                        continue;
                    }
                    if (cluster.markers.length == 1) {
                        if (!singleMarker.has(cluster.marker)) {
                            // The marker:
                            // - was previously rendered because it is from a cluster with 1 marker,
                            // - should no more be rendered as it is not in singleMarker.
                            MarkerUtils.setMap(cluster.marker, null);
                        }
                    }
                    else {
                        // Delay the removal of old group markers to avoid flickering.
                        groupMarkers.push(cluster.marker);
                    }
                }
                this.clusters = clusters;
                this.renderClusters();
                // Delayed removal of the markers of the former groups.
                requestAnimationFrame(() => groupMarkers.forEach((marker) => MarkerUtils.setMap(marker, null)));
            }
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
        }
    }
    onAdd() {
        this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
        this.render();
    }
    onRemove() {
        google.maps.event.removeListener(this.idleListener);
        this.reset();
    }
    reset() {
        this.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
        this.clusters.forEach((cluster) => cluster.delete());
        this.clusters = [];
    }
    renderClusters() {
        // Generate stats to pass to renderers.
        const stats = new ClusterStats(this.markers, this.clusters);
        const map = this.getMap();
        this.clusters.forEach((cluster) => {
            if (cluster.markers.length === 1) {
                cluster.marker = cluster.markers[0];
            }
            else {
                // Generate the marker to represent the group.
                cluster.marker = this.renderer.render(cluster, stats, map);
                // Make sure all individual markers are removed from the map.
                cluster.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
                if (this.onClusterClick) {
                    cluster.marker.addListener("click", 
                    /* istanbul ignore next */
                    (event) => {
                        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                        this.onClusterClick(event, cluster, map);
                    });
                }
            }
            MarkerUtils.setMap(cluster.marker, map);
        });
    }
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./resources/js/Routes/Map/Index.js":
/*!******************************************!*\
  !*** ./resources/js/Routes/Map/Index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Map)
/* harmony export */ });
/* harmony import */ var _Utilities_GMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities/GMap */ "./resources/js/Utilities/GMap.js");
/* harmony import */ var _Utilities_Device__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utilities/Device */ "./resources/js/Utilities/Device.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utilities_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utilities/Form */ "./resources/js/Utilities/Form.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var Map = /*#__PURE__*/function () {
  function Map() {
    _classCallCheck(this, Map);
    _defineProperty(this, "map", void 0);
    _defineProperty(this, "panelEl", void 0);
    _defineProperty(this, "listEl", void 0);
    _defineProperty(this, "countEl", void 0);
    _defineProperty(this, "devices", []);
    _defineProperty(this, "url", void 0);
    _defineProperty(this, "spinnerEl", void 0);
    _defineProperty(this, "$deviceFormModal", void 0);
    _defineProperty(this, "backdrop", void 0);
    _defineProperty(this, "deviceForm", void 0);
    _defineProperty(this, "markedDevices", void 0);
    this.panelEl = document.querySelector('.devices-panel');
    this.listEl = document.querySelector('.devices-panel__list');
    this.countEl = document.querySelector('.devices-count');
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
        device: this.getDevicePopupData.bind(this),
        onPopupShow: this.onPopupShow.bind(this)
      }
    });
    this.map.load({
      center: {
        lat: 54.687157,
        lng: 25.279652
      },
      zoom: 10
      // minZoom: 4,
    }).then(this.setup.bind(this));
  }
  _createClass(Map, [{
    key: "setup",
    value: function setup() {
      document.querySelector('.add-device-btn').addEventListener('click', this.openDeviceForm.bind(this), false);
      $('.modal-close').on('click', this.closeDeviceForm.bind(this));
      this.loadDevices();
      this.getDevicesCount();
      this.listEl.addEventListener('scroll', this.loadMoreDevices.bind(this), false);
      this.getMarkedDevices();
    }
  }, {
    key: "getMarkedDevices",
    value: function getMarkedDevices() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get('/map/marked-devices').then(function (response) {
        _this.map.highlight(response.data.data.map(function (device) {
          return device.id;
        }));
      });
    }
  }, {
    key: "addNewDevice",
    value: function addNewDevice(response) {
      response = response.data.data;
      var index = this.devices.findIndex(function (device) {
        return response.id === device.device.id;
      });
      if (index === -1) return;
      this.devices[index].update(response);
      this.map.addOrUpdateDeviceInMap(response);
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
      });
    }
  }, {
    key: "addDevice",
    value: function addDevice(device) {
      device = new _Utilities_Device__WEBPACK_IMPORTED_MODULE_1__["default"]({
        device: device,
        listElement: this.listEl,
        callbacks: {
          change: this.toggleDevice.bind(this, device),
          click: this.findDeviceInMap.bind(this)
        }
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
    value: function toggleDevice(device, e) {
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
    key: "findDeviceInMap",
    value: function findDeviceInMap(device) {
      var _this5 = this;
      this.map.setCenter(device.lat, device.lng).then(function () {
        _this5.map.showPopup(device.id, {});
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
  }, {
    key: "getDevicePopupData",
    value: function getDevicePopupData(device) {
      return Object.assign(device, {
        render: function render(device) {
          return "\n                <div class=\"d-flex flex-column\">\n                    <span class=\"h6 mb-0\">".concat(device.name, "</span>\n                    <span class=\"text-muted\">").concat(device.imei, "</span>\n                    <span class=\"mt-2\">").concat(device.address, "</span>\n                    <span>").concat(device.nearestDeviceImei || 'Loading nearest device...', "</span>\n                </div>\n            ");
        }
      });
    }
  }, {
    key: "onPopupShow",
    value: function onPopupShow(device, infoWindow, latLng) {
      if (device.nearestDeviceCords) return;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get("/device/".concat(device.id, "/find-nearest-device")).then(function (response) {
        device.nearestDeviceImei = response.data.data.imei;
        infoWindow.setContent(device.render(device));
      })["catch"](function () {
        device.nearestDeviceCords = 'Nearest device not found';
        infoWindow.setContent(device.render(device));
      });
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
      callbacks = _ref.callbacks;
    _classCallCheck(this, Device);
    _defineProperty(this, "el", void 0);
    _defineProperty(this, "device", void 0);
    _defineProperty(this, "checkbox", void 0);
    _defineProperty(this, "listElement", void 0);
    _defineProperty(this, "callbacks", void 0);
    this.device = device;
    this.listElement = listElement;
    this.callbacks = Object.assign({
      click: function click() {},
      change: function change() {}
    }, callbacks);
    this.render();
  }
  _createClass(Device, [{
    key: "update",
    value: function update(device) {
      this.device = device;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var el = document.createElement('div');
      el.className = 'device list-group-item';
      el.innerHTML = "\n            <div class=\"form-check device__control\">\n              <input class=\"form-check-input\" type=\"checkbox\" value=\"".concat(this.device.id, "\" checked>\n            </div>\n            <div class=\"device__content\">\n                <a href=\"#\" class=\"link-secondary device-name\">\n                    <strong>").concat(this.device.name, "</strong>\n                </a>\n                <span>").concat(this.device.imei, "</span>\n            </div>\n        ");
      this.listElement.appendChild(el);
      this.checkbox = el.querySelector('.form-check-input');
      this.checkbox.checked = this.device.active;
      if (typeof this.callbacks.change === 'function') {
        this.checkbox.addEventListener('change', this.callbacks.change, false);
      }
      if (typeof this.callbacks.click === 'function') {
        el.querySelector('.device-name').addEventListener('click', function (e) {
          e.preventDefault();
          _this.callbacks.click(_this.device);
        }, false);
      }
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
          var _error$response2;
          console.error('Form error!', error.response);
          _this.throwErrorMessage(error === null || error === void 0 || (_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message);
          return;
        }
        _this.handleErrors(errors);
      })["finally"](function () {
        _this.callback('progress', false);
        _this.removeSpinner();
      });
    }
  }, {
    key: "throwErrorMessage",
    value: function throwErrorMessage(message) {
      var msg = document.createElement('div');
      msg.className = 'form-error-message alert alert-danger';
      msg.innerText = message;
      this.el.appendChild(msg);
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
      $('.is-invalid').removeClass('is-invalid');
      $('.invalid-feedback').remove();
      $('.form-error-message').remove();
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
/* harmony import */ var _googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @googlemaps/markerclusterer */ "./node_modules/@googlemaps/markerclusterer/dist/index.esm.js");
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
    _defineProperty(this, "map", void 0);
    _defineProperty(this, "makerClass", void 0);
    _defineProperty(this, "debounce", void 0);
    _defineProperty(this, "debouncer", void 0);
    _defineProperty(this, "devices", []);
    _defineProperty(this, "clusterer", void 0);
    _defineProperty(this, "callbacks", void 0);
    _defineProperty(this, "highlighted", []);
    _defineProperty(this, "loadPromise", void 0);
    this.url = url;
    this.el = el;
    this.debounce = debounce || 200;
    this.callbacks = Object.assign({
      load: function load() {},
      device: function device() {},
      onPopupShow: function onPopupShow() {}
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
                mapId: '4504f8b37365c3d0'
              }, options));
              this.clusterer = new _googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_1__.MarkerClusterer({
                algorithm: new _googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_1__.GridAlgorithm({
                  gridSize: 70
                }),
                markers: [],
                map: this.map
              });
              google.maps.event.addListener(this.map, 'tilesloaded', this.onBoundsChange.bind(this), false);
              this.map.addListener("click", function (e) {
                console.log(e.latLng.lat(), e.latLng.lng());
              });
              resolve();
            case 18:
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
    key: "highlight",
    value: function highlight(devices) {
      this.highlighted = devices;
      this.updateMap();
    }
  }, {
    key: "setCenter",
    value: function setCenter(lat, lng) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.loadPromise = resolve;
        var latLng = new google.maps.LatLng(lat, lng);
        _this2.map.setCenter(latLng);
      });
    }
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
      var _this3 = this;
      axios.post('/map/devices', {
        devices: this.devices.map(function (device) {
          return device.id;
        }),
        coordinates: {
          lat: [southWest.lat, northEast.lat],
          lng: [southWest.lng, northEast.lng]
        }
      }).then(function (response) {
        var _response$data;
        if (!(response !== null && response !== void 0 && (_response$data = response.data) !== null && _response$data !== void 0 && _response$data.data)) return;
        response.data.data.forEach(function (device) {
          _this3.addDeviceToMap(device);
        });
        _this3.updateMap();
        if (typeof _this3.callbacks.load === 'function') {
          _this3.callbacks.load(response.data.data);
        }
      });
    }
  }, {
    key: "updateMap",
    value: function updateMap() {
      this.clusterer.clearMarkers();
      this.refreshDevices();
      this.clusterer.addMarkers(this.devices.filter(function (device) {
        return device.marker;
      }).map(function (device) {
        return device.marker;
      }));
      if (this.loadPromise) {
        this.loadPromise();
        this.loadPromise = null;
      }
    }
  }, {
    key: "refreshDevices",
    value: function refreshDevices() {
      var _this4 = this;
      this.devices = this.devices.filter(function (device) {
        if (!_this4.checkIfDeviceVisibleInMap(device)) {
          _this4.disableDeviceMarker(device);
          return false;
        } else {
          device.active ? _this4.enableDeviceMarker(device) : _this4.disableDeviceMarker(device);
        }
        return true;
      });
    }
  }, {
    key: "addDeviceToMap",
    value: function addDeviceToMap(device) {
      if (typeof this.callbacks.device === 'function') {
        device = this.callbacks.device(device);
      }
      device = Object.assign(device, {
        marker: device.active ? this.getDeviceMarker(device) : null
      });
      this.devices.push(device);
    }
  }, {
    key: "getDeviceMarker",
    value: function getDeviceMarker(device, content) {
      var marker = new this.makerClass({
        map: this.map,
        content: content,
        position: {
          lat: parseFloat(device.lat),
          lng: parseFloat(device.lng)
        },
        title: device.name
      });
      marker.addListener('click', this.showPopup.bind(this, device.id));
      return marker;
    }
  }, {
    key: "checkIfDeviceVisibleInMap",
    value: function checkIfDeviceVisibleInMap(device) {
      var bounds = this.map.getBounds();
      var latLng = new google.maps.LatLng(device.lat, device.lng);
      return bounds.contains(latLng);
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
      this.updateMap();
    }
  }, {
    key: "showPopup",
    value: function showPopup(id, _ref2) {
      var latLng = _ref2.latLng,
        domEvent = _ref2.domEvent;
      var device = this.devices.find(function (device) {
        return device.id === id;
      });
      if (!device) return;
      if (!latLng) {
        latLng = new google.maps.LatLng(device.lat, device.lng);
      }
      this.infoWindow.open(device.marker.map, device.marker);
      this.infoWindow.setContent(device.render(device));
      if (typeof this.callbacks.onPopupShow === 'function') {
        this.callbacks.onPopupShow(device, this.infoWindow, latLng);
      }
    }
  }, {
    key: "showDevice",
    value: function showDevice(id) {
      var device = this.devices.find(function (device) {
        return device.id === parseInt(id);
      });
      if (!device) return;
      device.active = 1;
      this.updateMap();
    }
  }, {
    key: "hideDevice",
    value: function hideDevice(id) {
      var device = this.devices.find(function (device) {
        return device.id === parseInt(id);
      });
      if (!device) return;
      device.active = 0;
      this.disableDeviceMarker(device);
      this.updateMap();
    }
  }, {
    key: "deviceIsHighlighted",
    value: function deviceIsHighlighted(device) {
      return this.highlighted.indexOf(device.id) !== -1;
    }
  }, {
    key: "getSvgContent",
    value: function getSvgContent() {
      var parser = new DOMParser();
      var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"56\" height=\"56\" viewBox=\"0 0 56 56\" fill=\"none\"><rect width=\"56\" height=\"56\" rx=\"28\" fill=\"#7837FF\"></rect><path d=\"M46.0675 22.1319L44.0601 22.7843\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M11.9402 33.2201L9.93262 33.8723\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M27.9999 47.0046V44.8933\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M27.9999 9V11.1113\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M39.1583 43.3597L37.9186 41.6532\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M16.8419 12.6442L18.0816 14.3506\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M9.93262 22.1319L11.9402 22.7843\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M46.0676 33.8724L44.0601 33.2201\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M39.1583 12.6442L37.9186 14.3506\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M16.8419 43.3597L18.0816 41.6532\" stroke=\"white\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M28 39L26.8725 37.9904C24.9292 36.226 23.325 34.7026 22.06 33.4202C20.795 32.1378 19.7867 30.9918 19.035 29.9823C18.2833 28.9727 17.7562 28.0587 17.4537 27.2401C17.1512 26.4216 17 25.5939 17 24.7572C17 23.1201 17.5546 21.7513 18.6638 20.6508C19.7729 19.5502 21.1433 19 22.775 19C23.82 19 24.7871 19.2456 25.6762 19.7367C26.5654 20.2278 27.34 20.9372 28 21.8649C28.77 20.8827 29.5858 20.1596 30.4475 19.6958C31.3092 19.2319 32.235 19 33.225 19C34.8567 19 36.2271 19.5502 37.3362 20.6508C38.4454 21.7513 39 23.1201 39 24.7572C39 25.5939 38.8488 26.4216 38.5463 27.2401C38.2438 28.0587 37.7167 28.9727 36.965 29.9823C36.2133 30.9918 35.205 32.1378 33.94 33.4202C32.675 34.7026 31.0708 36.226 29.1275 37.9904L28 39Z\" fill=\"#FF7878\"></path></svg>";
      return parser.parseFromString(svg, "image/svg+xml").documentElement;
    }
  }, {
    key: "enableDeviceMarker",
    value: function enableDeviceMarker(device) {
      if (device.marker) {
        if (this.highlighted.indexOf(device.id) !== -1) {
          device.marker.setMap(null);
          device.marker = this.getDeviceMarker(device, this.getSvgContent());
        }
        device.marker.setMap(this.map);
        return;
      }
      device.marker = this.getDeviceMarker(device, this.deviceIsHighlighted(device) ? this.getSvgContent() : null);
    }
  }, {
    key: "disableDeviceMarker",
    value: function disableDeviceMarker(device) {
      if (!device.marker) return;
      device.marker.setMap(null);
      device.marker = null;
    }
  }]);
  return GMap;
}();


/***/ }),

/***/ "./node_modules/fast-deep-equal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
/***/ ((module) => {



// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
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


/***/ }),

/***/ "./node_modules/kdbush/index.js":
/*!**************************************!*\
  !*** ./node_modules/kdbush/index.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KDBush)
/* harmony export */ });

const ARRAY_TYPES = [
    Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array,
    Int32Array, Uint32Array, Float32Array, Float64Array
];

/** @typedef {Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor} TypedArrayConstructor */

const VERSION = 1; // serialized format version
const HEADER_SIZE = 8;

class KDBush {

    /**
     * Creates an index from raw `ArrayBuffer` data.
     * @param {ArrayBuffer} data
     */
    static from(data) {
        if (!(data instanceof ArrayBuffer)) {
            throw new Error('Data must be an instance of ArrayBuffer.');
        }
        const [magic, versionAndType] = new Uint8Array(data, 0, 2);
        if (magic !== 0xdb) {
            throw new Error('Data does not appear to be in a KDBush format.');
        }
        const version = versionAndType >> 4;
        if (version !== VERSION) {
            throw new Error(`Got v${version} data when expected v${VERSION}.`);
        }
        const ArrayType = ARRAY_TYPES[versionAndType & 0x0f];
        if (!ArrayType) {
            throw new Error('Unrecognized array type.');
        }
        const [nodeSize] = new Uint16Array(data, 2, 1);
        const [numItems] = new Uint32Array(data, 4, 1);

        return new KDBush(numItems, nodeSize, ArrayType, data);
    }

    /**
     * Creates an index that will hold a given number of items.
     * @param {number} numItems
     * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
     * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
     * @param {ArrayBuffer} [data] (For internal use only)
     */
    constructor(numItems, nodeSize = 64, ArrayType = Float64Array, data) {
        if (isNaN(numItems) || numItems < 0) throw new Error(`Unpexpected numItems value: ${numItems}.`);

        this.numItems = +numItems;
        this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
        this.ArrayType = ArrayType;
        this.IndexArrayType = numItems < 65536 ? Uint16Array : Uint32Array;

        const arrayTypeIndex = ARRAY_TYPES.indexOf(this.ArrayType);
        const coordsByteSize = numItems * 2 * this.ArrayType.BYTES_PER_ELEMENT;
        const idsByteSize = numItems * this.IndexArrayType.BYTES_PER_ELEMENT;
        const padCoords = (8 - idsByteSize % 8) % 8;

        if (arrayTypeIndex < 0) {
            throw new Error(`Unexpected typed array class: ${ArrayType}.`);
        }

        if (data && (data instanceof ArrayBuffer)) { // reconstruct an index from a buffer
            this.data = data;
            this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
            this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
            this._pos = numItems * 2;
            this._finished = true;
        } else { // initialize a new index
            this.data = new ArrayBuffer(HEADER_SIZE + coordsByteSize + idsByteSize + padCoords);
            this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
            this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
            this._pos = 0;
            this._finished = false;

            // set header
            new Uint8Array(this.data, 0, 2).set([0xdb, (VERSION << 4) + arrayTypeIndex]);
            new Uint16Array(this.data, 2, 1)[0] = nodeSize;
            new Uint32Array(this.data, 4, 1)[0] = numItems;
        }
    }

    /**
     * Add a point to the index.
     * @param {number} x
     * @param {number} y
     * @returns {number} An incremental index associated with the added item (starting from `0`).
     */
    add(x, y) {
        const index = this._pos >> 1;
        this.ids[index] = index;
        this.coords[this._pos++] = x;
        this.coords[this._pos++] = y;
        return index;
    }

    /**
     * Perform indexing of the added points.
     */
    finish() {
        const numAdded = this._pos >> 1;
        if (numAdded !== this.numItems) {
            throw new Error(`Added ${numAdded} items when expected ${this.numItems}.`);
        }
        // kd-sort both arrays for efficient search
        sort(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0);

        this._finished = true;
        return this;
    }

    /**
     * Search the index for items within a given bounding box.
     * @param {number} minX
     * @param {number} minY
     * @param {number} maxX
     * @param {number} maxY
     * @returns {number[]} An array of indices correponding to the found items.
     */
    range(minX, minY, maxX, maxY) {
        if (!this._finished) throw new Error('Data not yet indexed - call index.finish().');

        const {ids, coords, nodeSize} = this;
        const stack = [0, ids.length - 1, 0];
        const result = [];

        // recursively search for items in range in the kd-sorted arrays
        while (stack.length) {
            const axis = stack.pop() || 0;
            const right = stack.pop() || 0;
            const left = stack.pop() || 0;

            // if we reached "tree node", search linearly
            if (right - left <= nodeSize) {
                for (let i = left; i <= right; i++) {
                    const x = coords[2 * i];
                    const y = coords[2 * i + 1];
                    if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
                }
                continue;
            }

            // otherwise find the middle index
            const m = (left + right) >> 1;

            // include the middle item if it's in range
            const x = coords[2 * m];
            const y = coords[2 * m + 1];
            if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);

            // queue search in halves that intersect the query
            if (axis === 0 ? minX <= x : minY <= y) {
                stack.push(left);
                stack.push(m - 1);
                stack.push(1 - axis);
            }
            if (axis === 0 ? maxX >= x : maxY >= y) {
                stack.push(m + 1);
                stack.push(right);
                stack.push(1 - axis);
            }
        }

        return result;
    }

    /**
     * Search the index for items within a given radius.
     * @param {number} qx
     * @param {number} qy
     * @param {number} r Query radius.
     * @returns {number[]} An array of indices correponding to the found items.
     */
    within(qx, qy, r) {
        if (!this._finished) throw new Error('Data not yet indexed - call index.finish().');

        const {ids, coords, nodeSize} = this;
        const stack = [0, ids.length - 1, 0];
        const result = [];
        const r2 = r * r;

        // recursively search for items within radius in the kd-sorted arrays
        while (stack.length) {
            const axis = stack.pop() || 0;
            const right = stack.pop() || 0;
            const left = stack.pop() || 0;

            // if we reached "tree node", search linearly
            if (right - left <= nodeSize) {
                for (let i = left; i <= right; i++) {
                    if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
                }
                continue;
            }

            // otherwise find the middle index
            const m = (left + right) >> 1;

            // include the middle item if it's in range
            const x = coords[2 * m];
            const y = coords[2 * m + 1];
            if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);

            // queue search in halves that intersect the query
            if (axis === 0 ? qx - r <= x : qy - r <= y) {
                stack.push(left);
                stack.push(m - 1);
                stack.push(1 - axis);
            }
            if (axis === 0 ? qx + r >= x : qy + r >= y) {
                stack.push(m + 1);
                stack.push(right);
                stack.push(1 - axis);
            }
        }

        return result;
    }
}

/**
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} nodeSize
 * @param {number} left
 * @param {number} right
 * @param {number} axis
 */
function sort(ids, coords, nodeSize, left, right, axis) {
    if (right - left <= nodeSize) return;

    const m = (left + right) >> 1; // middle index

    // sort ids and coords around the middle index so that the halves lie
    // either left/right or top/bottom correspondingly (taking turns)
    select(ids, coords, m, left, right, axis);

    // recursively kd-sort first half and second half on the opposite axis
    sort(ids, coords, nodeSize, left, m - 1, 1 - axis);
    sort(ids, coords, nodeSize, m + 1, right, 1 - axis);
}

/**
 * Custom Floyd-Rivest selection algorithm: sort ids and coords so that
 * [left..k-1] items are smaller than k-th item (on either x or y axis)
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} k
 * @param {number} left
 * @param {number} right
 * @param {number} axis
 */
function select(ids, coords, k, left, right, axis) {

    while (right > left) {
        if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, axis);
        }

        const t = coords[2 * k + axis];
        let i = left;
        let j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + axis] > t) swapItem(ids, coords, left, right);

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + axis] < t) i++;
            while (coords[2 * j + axis] > t) j--;
        }

        if (coords[2 * left + axis] === t) swapItem(ids, coords, left, j);
        else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

/**
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} i
 * @param {number} j
 */
function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

/**
 * @param {InstanceType<TypedArrayConstructor>} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

/**
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 */
function sqDist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}


/***/ }),

/***/ "./node_modules/supercluster/index.js":
/*!********************************************!*\
  !*** ./node_modules/supercluster/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Supercluster)
/* harmony export */ });
/* harmony import */ var kdbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kdbush */ "./node_modules/kdbush/index.js");



const defaultOptions = {
    minZoom: 0,   // min zoom to generate clusters on
    maxZoom: 16,  // max zoom level to cluster the points on
    minPoints: 2, // minimum points to form a cluster
    radius: 40,   // cluster radius in pixels
    extent: 512,  // tile extent (radius is calculated relative to it)
    nodeSize: 64, // size of the KD-tree leaf node, affects performance
    log: false,   // whether to log timing info

    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,

    // a reduce function for calculating custom cluster properties
    reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }

    // properties to use for individual points when running the reducer
    map: props => props // props => ({sum: props.my_value})
};

const fround = Math.fround || (tmp => ((x) => { tmp[0] = +x; return tmp[0]; }))(new Float32Array(1));

const OFFSET_ZOOM = 2;
const OFFSET_ID = 3;
const OFFSET_PARENT = 4;
const OFFSET_NUM = 5;
const OFFSET_PROP = 6;

class Supercluster {
    constructor(options) {
        this.options = Object.assign(Object.create(defaultOptions), options);
        this.trees = new Array(this.options.maxZoom + 1);
        this.stride = this.options.reduce ? 7 : 6;
        this.clusterProps = [];
    }

    load(points) {
        const {log, minZoom, maxZoom} = this.options;

        if (log) console.time('total time');

        const timerId = `prepare ${  points.length  } points`;
        if (log) console.time(timerId);

        this.points = points;

        // generate a cluster object for each point and index input points into a KD-tree
        const data = [];

        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            if (!p.geometry) continue;

            const [lng, lat] = p.geometry.coordinates;
            const x = fround(lngX(lng));
            const y = fround(latY(lat));
            // store internal point/cluster data in flat numeric arrays for performance
            data.push(
                x, y, // projected point coordinates
                Infinity, // the last zoom the point was processed at
                i, // index of the source feature in the original input array
                -1, // parent cluster id
                1 // number of points in a cluster
            );
            if (this.options.reduce) data.push(0); // noop
        }
        let tree = this.trees[maxZoom + 1] = this._createTree(data);

        if (log) console.timeEnd(timerId);

        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for (let z = maxZoom; z >= minZoom; z--) {
            const now = +Date.now();

            // create a new set of clusters for the zoom and index them with a KD-tree
            tree = this.trees[z] = this._createTree(this._cluster(tree, z));

            if (log) console.log('z%d: %d clusters in %dms', z, tree.numItems, +Date.now() - now);
        }

        if (log) console.timeEnd('total time');

        return this;
    }

    getClusters(bbox, zoom) {
        let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
        const minLat = Math.max(-90, Math.min(90, bbox[1]));
        let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
        const maxLat = Math.max(-90, Math.min(90, bbox[3]));

        if (bbox[2] - bbox[0] >= 360) {
            minLng = -180;
            maxLng = 180;
        } else if (minLng > maxLng) {
            const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
            const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
            return easternHem.concat(westernHem);
        }

        const tree = this.trees[this._limitZoom(zoom)];
        const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
        const data = tree.data;
        const clusters = [];
        for (const id of ids) {
            const k = this.stride * id;
            clusters.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
        }
        return clusters;
    }

    getChildren(clusterId) {
        const originId = this._getOriginId(clusterId);
        const originZoom = this._getOriginZoom(clusterId);
        const errorMsg = 'No cluster with the specified id.';

        const tree = this.trees[originZoom];
        if (!tree) throw new Error(errorMsg);

        const data = tree.data;
        if (originId * this.stride >= data.length) throw new Error(errorMsg);

        const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
        const x = data[originId * this.stride];
        const y = data[originId * this.stride + 1];
        const ids = tree.within(x, y, r);
        const children = [];
        for (const id of ids) {
            const k = id * this.stride;
            if (data[k + OFFSET_PARENT] === clusterId) {
                children.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
            }
        }

        if (children.length === 0) throw new Error(errorMsg);

        return children;
    }

    getLeaves(clusterId, limit, offset) {
        limit = limit || 10;
        offset = offset || 0;

        const leaves = [];
        this._appendLeaves(leaves, clusterId, limit, offset, 0);

        return leaves;
    }

    getTile(z, x, y) {
        const tree = this.trees[this._limitZoom(z)];
        const z2 = Math.pow(2, z);
        const {extent, radius} = this.options;
        const p = radius / extent;
        const top = (y - p) / z2;
        const bottom = (y + 1 + p) / z2;

        const tile = {
            features: []
        };

        this._addTileFeatures(
            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
            tree.data, x, y, z2, tile);

        if (x === 0) {
            this._addTileFeatures(
                tree.range(1 - p / z2, top, 1, bottom),
                tree.data, z2, y, z2, tile);
        }
        if (x === z2 - 1) {
            this._addTileFeatures(
                tree.range(0, top, p / z2, bottom),
                tree.data, -1, y, z2, tile);
        }

        return tile.features.length ? tile : null;
    }

    getClusterExpansionZoom(clusterId) {
        let expansionZoom = this._getOriginZoom(clusterId) - 1;
        while (expansionZoom <= this.options.maxZoom) {
            const children = this.getChildren(clusterId);
            expansionZoom++;
            if (children.length !== 1) break;
            clusterId = children[0].properties.cluster_id;
        }
        return expansionZoom;
    }

    _appendLeaves(result, clusterId, limit, offset, skipped) {
        const children = this.getChildren(clusterId);

        for (const child of children) {
            const props = child.properties;

            if (props && props.cluster) {
                if (skipped + props.point_count <= offset) {
                    // skip the whole cluster
                    skipped += props.point_count;
                } else {
                    // enter the cluster
                    skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                    // exit the cluster
                }
            } else if (skipped < offset) {
                // skip a single point
                skipped++;
            } else {
                // add a single point
                result.push(child);
            }
            if (result.length === limit) break;
        }

        return skipped;
    }

    _createTree(data) {
        const tree = new kdbush__WEBPACK_IMPORTED_MODULE_0__["default"](data.length / this.stride | 0, this.options.nodeSize, Float32Array);
        for (let i = 0; i < data.length; i += this.stride) tree.add(data[i], data[i + 1]);
        tree.finish();
        tree.data = data;
        return tree;
    }

    _addTileFeatures(ids, data, x, y, z2, tile) {
        for (const i of ids) {
            const k = i * this.stride;
            const isCluster = data[k + OFFSET_NUM] > 1;

            let tags, px, py;
            if (isCluster) {
                tags = getClusterProperties(data, k, this.clusterProps);
                px = data[k];
                py = data[k + 1];
            } else {
                const p = this.points[data[k + OFFSET_ID]];
                tags = p.properties;
                const [lng, lat] = p.geometry.coordinates;
                px = lngX(lng);
                py = latY(lat);
            }

            const f = {
                type: 1,
                geometry: [[
                    Math.round(this.options.extent * (px * z2 - x)),
                    Math.round(this.options.extent * (py * z2 - y))
                ]],
                tags
            };

            // assign id
            let id;
            if (isCluster || this.options.generateId) {
                // optionally generate id for points
                id = data[k + OFFSET_ID];
            } else {
                // keep id if already assigned
                id = this.points[data[k + OFFSET_ID]].id;
            }

            if (id !== undefined) f.id = id;

            tile.features.push(f);
        }
    }

    _limitZoom(z) {
        return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
    }

    _cluster(tree, zoom) {
        const {radius, extent, reduce, minPoints} = this.options;
        const r = radius / (extent * Math.pow(2, zoom));
        const data = tree.data;
        const nextData = [];
        const stride = this.stride;

        // loop through each point
        for (let i = 0; i < data.length; i += stride) {
            // if we've already visited the point at this zoom level, skip it
            if (data[i + OFFSET_ZOOM] <= zoom) continue;
            data[i + OFFSET_ZOOM] = zoom;

            // find all nearby points
            const x = data[i];
            const y = data[i + 1];
            const neighborIds = tree.within(data[i], data[i + 1], r);

            const numPointsOrigin = data[i + OFFSET_NUM];
            let numPoints = numPointsOrigin;

            // count the number of points in a potential cluster
            for (const neighborId of neighborIds) {
                const k = neighborId * stride;
                // filter out neighbors that are already processed
                if (data[k + OFFSET_ZOOM] > zoom) numPoints += data[k + OFFSET_NUM];
            }

            // if there were neighbors to merge, and there are enough points to form a cluster
            if (numPoints > numPointsOrigin && numPoints >= minPoints) {
                let wx = x * numPointsOrigin;
                let wy = y * numPointsOrigin;

                let clusterProperties;
                let clusterPropIndex = -1;

                // encode both zoom and point index on which the cluster originated -- offset by total length of features
                const id = ((i / stride | 0) << 5) + (zoom + 1) + this.points.length;

                for (const neighborId of neighborIds) {
                    const k = neighborId * stride;

                    if (data[k + OFFSET_ZOOM] <= zoom) continue;
                    data[k + OFFSET_ZOOM] = zoom; // save the zoom (so it doesn't get processed twice)

                    const numPoints2 = data[k + OFFSET_NUM];
                    wx += data[k] * numPoints2; // accumulate coordinates for calculating weighted center
                    wy += data[k + 1] * numPoints2;

                    data[k + OFFSET_PARENT] = id;

                    if (reduce) {
                        if (!clusterProperties) {
                            clusterProperties = this._map(data, i, true);
                            clusterPropIndex = this.clusterProps.length;
                            this.clusterProps.push(clusterProperties);
                        }
                        reduce(clusterProperties, this._map(data, k));
                    }
                }

                data[i + OFFSET_PARENT] = id;
                nextData.push(wx / numPoints, wy / numPoints, Infinity, id, -1, numPoints);
                if (reduce) nextData.push(clusterPropIndex);

            } else { // left points as unclustered
                for (let j = 0; j < stride; j++) nextData.push(data[i + j]);

                if (numPoints > 1) {
                    for (const neighborId of neighborIds) {
                        const k = neighborId * stride;
                        if (data[k + OFFSET_ZOOM] <= zoom) continue;
                        data[k + OFFSET_ZOOM] = zoom;
                        for (let j = 0; j < stride; j++) nextData.push(data[k + j]);
                    }
                }
            }
        }

        return nextData;
    }

    // get index of the point from which the cluster originated
    _getOriginId(clusterId) {
        return (clusterId - this.points.length) >> 5;
    }

    // get zoom of the point from which the cluster originated
    _getOriginZoom(clusterId) {
        return (clusterId - this.points.length) % 32;
    }

    _map(data, i, clone) {
        if (data[i + OFFSET_NUM] > 1) {
            const props = this.clusterProps[data[i + OFFSET_PROP]];
            return clone ? Object.assign({}, props) : props;
        }
        const original = this.points[data[i + OFFSET_ID]].properties;
        const result = this.options.map(original);
        return clone && result === original ? Object.assign({}, result) : result;
    }
}

function getClusterJSON(data, i, clusterProps) {
    return {
        type: 'Feature',
        id: data[i + OFFSET_ID],
        properties: getClusterProperties(data, i, clusterProps),
        geometry: {
            type: 'Point',
            coordinates: [xLng(data[i]), yLat(data[i + 1])]
        }
    };
}

function getClusterProperties(data, i, clusterProps) {
    const count = data[i + OFFSET_NUM];
    const abbrev =
        count >= 10000 ? `${Math.round(count / 1000)  }k` :
        count >= 1000 ? `${Math.round(count / 100) / 10  }k` : count;
    const propIndex = data[i + OFFSET_PROP];
    const properties = propIndex === -1 ? {} : Object.assign({}, clusterProps[propIndex]);
    return Object.assign(properties, {
        cluster: true,
        cluster_id: data[i + OFFSET_ID],
        point_count: count,
        point_count_abbreviated: abbrev
    });
}

// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    const sin = Math.sin(lat * Math.PI / 180);
    const y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
    return y < 0 ? 0 : y > 1 ? 1 : y;
}

// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    const y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}


/***/ })

}]);