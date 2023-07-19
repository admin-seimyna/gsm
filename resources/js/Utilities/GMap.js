import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer, GridAlgorithm } from "@googlemaps/markerclusterer";

export default class GMap {
    url;
    el;
    loader;
    infoWindow;
    map;
    makerClass;
    debounce;
    debouncer;
    devices = [];
    clusterer;
    callbacks;
    highlighted = [];
    loadPromise;

    /**
     *
     * @param url
     * @param key
     * @param el
     * @param debounce
     */
    constructor({ url, key, el, debounce, callbacks }) {
        this.url = url;
        this.el = el;
        this.debounce = debounce || 200;
        this.callbacks = Object.assign({
            load: () => {},
            device: () => {},
            onPopupShow: () => {},
        }, callbacks);

        this.loader = new Loader({
            apiKey: key,
            version: "weekly",
        });
    }

    load(options) {
        return new Promise((resolve, reject) => {
            this.loader.load()
                .then(this.setup.bind(this, resolve, options))
                .catch(reject);
        });
    }

    /**
     * Setup map
     * @param resolve
     * @param options
     * @returns {Promise<void>}
     */
    async setup(resolve, options = {}) {
        const { Map, InfoWindow } = await google.maps.importLibrary('maps');
        const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

        this.makerClass = AdvancedMarkerElement;

        this.geocoder = new google.maps.Geocoder;
        this.infoWindow = new InfoWindow();

        this.map = new Map(this.el, Object.assign({
            mapId: '4504f8b37365c3d0',
        }, options));

        this.clusterer = new MarkerClusterer({
            algorithm: new GridAlgorithm({
                gridSize: 70
            }),
            markers: [],
            map: this.map
        });

        google.maps.event.addListener(this.map, 'tilesloaded', this.onBoundsChange.bind(this), false);
        this.map.addListener("click", (e) => {
            console.log(e.latLng.lat(), e.latLng.lng());
        });
        resolve();
    }

    highlight(devices) {
        this.highlighted = devices;
        this.updateMap();
    }

    setCenter(lat, lng) {
        return new Promise((resolve, reject) => {
            this.loadPromise = resolve;
            const latLng = new google.maps.LatLng(lat, lng);
            this.map.setCenter(latLng);
        });
    }

    onBoundsChange() {
        const bounds = this.map.getBounds();
        const southWest = bounds.getSouthWest(); // top - right
        const northEast = bounds.getNorthEast(); // bottom - left

        this.loadDevices(
            { lat: northEast.lat(), lng: northEast.lng() },
            { lat: southWest.lat(), lng: southWest.lng() },
        );
    }

    loadDevices(northEast, southWest) {
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(this.sendRequest.bind(this, northEast, southWest), this.debounce);
    }

    sendRequest(northEast, southWest) {
        axios.post('/map/devices', {
            devices: this.devices.map(device => device.id),
            coordinates: {
                lat: [southWest.lat, northEast.lat],
                lng: [southWest.lng, northEast.lng]
            },
        }).then((response) => {
            if (!response?.data?.data) return;
            response.data.data.forEach((device) => {
                this.addDeviceToMap(device);
            });
            this.updateMap();

            if (typeof this.callbacks.load === 'function') {
                this.callbacks.load(response.data.data);
            }
        })
    }

    updateMap() {
        this.clusterer.clearMarkers();
        this.refreshDevices();
        this.clusterer.addMarkers(this.devices.filter(device => device.marker).map(device => device.marker));
        if (this.loadPromise) {
            this.loadPromise();
            this.loadPromise = null;
        }
    }

    refreshDevices() {
        this.devices = this.devices.filter((device) => {
            if (!this.checkIfDeviceVisibleInMap(device)) {
                this.disableDeviceMarker(device);
                return false;
            } else {
                device.active ? this.enableDeviceMarker(device) : this.disableDeviceMarker(device);
            }
            return true;
        });
    }

    addDeviceToMap(device) {
        if (typeof this.callbacks.device === 'function') {
            device = this.callbacks.device(device);
        }

        device = Object.assign(device, {
            marker: device.active ? this.getDeviceMarker(device) : null
        });
        this.devices.push(device);
    }

    getDeviceMarker(device, content) {
        const marker = new this.makerClass({
            map: this.map,
            content,
            position: {
                lat: parseFloat(device.lat),
                lng: parseFloat(device.lng)
            },
            title: device.name
        });

        marker.addListener('click', this.showPopup.bind(this, device.id));
        return marker;
    }

    checkIfDeviceVisibleInMap(device) {
        const bounds = this.map.getBounds();
        const latLng = new google.maps.LatLng(device.lat, device.lng);
        return bounds.contains(latLng);
    }

    addOrUpdateDeviceInMap(device) {
        let index = this.devices.findIndex(value => value.id === device.id);
        if (index !== -1) {
            const mapDevice = this.devices[index];
            mapDevice.marker.setMap(null);
            this.devices.splice(index, 1);
            device = Object.assign(mapDevice, device);
        }

        this.addDeviceToMap(device);
        this.updateMap();
    }

    showPopup(id, { latLng, domEvent }) {
        const device = this.devices.find(device => device.id === id);
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

    showDevice(id) {
        const device = this.devices.find(device => device.id === parseInt(id));
        if (!device) return;
        device.active = 1;
        this.updateMap();
    }

    hideDevice(id) {
        const device = this.devices.find(device => device.id === parseInt(id));
        if (!device) return;
        device.active = 0;
        this.disableDeviceMarker(device);
        this.updateMap();
    }

    deviceIsHighlighted(device) {
        return this.highlighted.indexOf(device.id) !== -1;
    }

    getSvgContent() {
        const parser = new DOMParser();
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><rect width="56" height="56" rx="28" fill="#7837FF"></rect><path d="M46.0675 22.1319L44.0601 22.7843" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.9402 33.2201L9.93262 33.8723" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.9999 47.0046V44.8933" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.9999 9V11.1113" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M39.1583 43.3597L37.9186 41.6532" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.8419 12.6442L18.0816 14.3506" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.93262 22.1319L11.9402 22.7843" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M46.0676 33.8724L44.0601 33.2201" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M39.1583 12.6442L37.9186 14.3506" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.8419 43.3597L18.0816 41.6532" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28 39L26.8725 37.9904C24.9292 36.226 23.325 34.7026 22.06 33.4202C20.795 32.1378 19.7867 30.9918 19.035 29.9823C18.2833 28.9727 17.7562 28.0587 17.4537 27.2401C17.1512 26.4216 17 25.5939 17 24.7572C17 23.1201 17.5546 21.7513 18.6638 20.6508C19.7729 19.5502 21.1433 19 22.775 19C23.82 19 24.7871 19.2456 25.6762 19.7367C26.5654 20.2278 27.34 20.9372 28 21.8649C28.77 20.8827 29.5858 20.1596 30.4475 19.6958C31.3092 19.2319 32.235 19 33.225 19C34.8567 19 36.2271 19.5502 37.3362 20.6508C38.4454 21.7513 39 23.1201 39 24.7572C39 25.5939 38.8488 26.4216 38.5463 27.2401C38.2438 28.0587 37.7167 28.9727 36.965 29.9823C36.2133 30.9918 35.205 32.1378 33.94 33.4202C32.675 34.7026 31.0708 36.226 29.1275 37.9904L28 39Z" fill="#FF7878"></path></svg>`;
        return parser.parseFromString(
            svg,
            "image/svg+xml"
        ).documentElement;
    }

    enableDeviceMarker(device) {
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

    disableDeviceMarker(device) {
        if (!device.marker) return;
        device.marker.setMap(null);
        device.marker = null;
    }
}
