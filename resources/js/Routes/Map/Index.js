import GMap from '../../Utilities/GMap';
import Device from '../../Utilities/Device';
import axios from 'axios';
import Form from '../../Utilities/Form';

export default class Map {
    map;
    panelEl;
    listEl;
    countEl;
    devices = [];
    url;
    spinnerEl;
    $deviceFormModal;
    backdrop;
    deviceForm;
    markedDevices;

    constructor() {
        this.panelEl = document.querySelector('.devices-panel');
        this.listEl = document.querySelector('.devices-panel__list');
        this.countEl = document.querySelector('.devices-count');
        this.$deviceFormModal = $('#device-form-modal');
        this.$modalBackdrop = $('.modal-backdrop');
        this.deviceForm = new Form(document.querySelector('.device-form'), {
            url: '/device',
            success: this.addNewDevice.bind(this)
        });

        this.url = '/map/user-devices';
        this.map = new GMap({
            key: API_KEY,
            url: '/map/devices',
            el: document.querySelector('.map'),
            callbacks: {
                device: this.getDevicePopupData.bind(this),
                onPopupShow: this.onPopupShow.bind(this)
            }
        });

        this.map.load({
            center: { lat: 54.687157, lng: 25.279652 },
            zoom: 10,
            // minZoom: 4,
        }).then(this.setup.bind(this));
    }

    setup() {
        document.querySelector('.add-device-btn')
            .addEventListener('click', this.openDeviceForm.bind(this), false);

        $('.modal-close').on('click', this.closeDeviceForm.bind(this));

        this.loadDevices();
        this.getDevicesCount();
        this.listEl.addEventListener('scroll', this.loadMoreDevices.bind(this), false);
        this.getMarkedDevices();
    }

    getMarkedDevices() {
        axios.get('/map/marked-devices').then((response) => {
            this.map.highlight(response.data.data.map(device => device.id));
        });
    }

    addNewDevice(response) {
        response = response.data.data;
        const index = this.devices.findIndex(device => response.id === device.device.id);
        if (index === -1) return;

        this.devices[index].update(response);
        this.map.addOrUpdateDeviceInMap(response);
        this.closeDeviceForm();
    }

    loadMoreDevices() {
        const bounds = this.listEl.getBoundingClientRect();
        const value = this.listEl.scrollHeight - this.listEl.scrollTop - bounds.height;
        if (value > 0) return;
        this.loadDevices();
    }

    loadDevices() {
        if (!this.url || this.loading) return;

        this.showSpinner();
        axios.get(this.url).then((response) => {
            this.hideSpinner();
            this.url = response.data.links.next;
            response.data.data.forEach(this.addDevice.bind(this));
        });
    }

    addDevice(device) {
        device = new Device({
            device,
            listElement: this.listEl,
            callbacks: {
                change: this.toggleDevice.bind(this, device),
                click: this.findDeviceInMap.bind(this),
            }
        });
        this.devices.push(device);
    }

    getDevicesCount() {
        axios.get('/map/devices-count').then((response) => {
            this.countEl.innerText = response.data.count;
        });
    }

    toggleDevice(device, e) {
        const id = e.target.value;
        const status = e.target.checked ? 1 : 0;
        axios.put(`/device/${id}/change-status`, { status }).then(() => {
            if (status) {
                this.map.showDevice(id);
            } else {
                this.map.hideDevice(id);
            }
        });
    }

    findDeviceInMap(device) {
        this.map.setCenter(device.lat, device.lng)
            .then(() => {
                this.map.showPopup(device.id, {});
            });

    }

    showSpinner() {
        if (this.spinnerEl) return;

        this.loading = true;
        this.spinnerEl = document.createElement('div');
        this.spinnerEl.className = 'w-100 d-flex align-items-center justify-content-center py-5';
        this.spinnerEl.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
        this.listEl.appendChild(this.spinnerEl);
    }

    hideSpinner() {
        this.loading = false;
        this.listEl.removeChild(this.spinnerEl);
        this.spinnerEl = null;
    }

    openDeviceForm() {
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(this.backdrop);
        this.$deviceFormModal.addClass('show').css({ display: 'block'});
    }

    closeDeviceForm() {
        document.body.removeChild(this.backdrop);
        this.$modalBackdrop.removeClass('show');
        this.$deviceFormModal.removeClass('show').css({ display: 'none' });
        this.deviceForm.reset();
    }

    getDevicePopupData(device) {
        return Object.assign(device, {
            render: (device) => `
                <div class="d-flex flex-column">
                    <span class="h6 mb-0">${device.name}</span>
                    <span class="text-muted">${device.imei}</span>
                    <span class="mt-2">${device.address}</span>
                    <span>${device.nearestDeviceImei || 'Loading nearest device...' }</span>
                </div>
            `
        });
    }

    onPopupShow(device, infoWindow, latLng) {
        if (device.nearestDeviceCords) return;

        axios.get(`/device/${device.id}/find-nearest-device`).then((response) => {
            device.nearestDeviceImei = response.data.data.imei;
            infoWindow.setContent(device.render(device));
        }).catch(() => {
            device.nearestDeviceCords = 'Nearest device not found';
            infoWindow.setContent(device.render(device));
        });
    }
}
