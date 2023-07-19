export default class Device {
    el;
    device;
    checkbox;
    listElement;
    callbacks;

    constructor({ device, listElement, callbacks }) {
        this.device = device;
        this.listElement = listElement;
        this.callbacks = Object.assign({
            click: () => {},
            change: () => {},
        }, callbacks);
        this.render();
    }

    update(device) {
        this.device = device;
    }

    render() {
        const el = document.createElement('div');
        el.className = 'device list-group-item';
        el.innerHTML = `
            <div class="form-check device__control">
              <input class="form-check-input" type="checkbox" value="${this.device.id}" checked>
            </div>
            <div class="device__content">
                <a href="#" class="link-secondary device-name">
                    <strong>${this.device.name}</strong>
                </a>
                <span>${this.device.imei}</span>
            </div>
        `;
        this.listElement.appendChild(el);

        this.checkbox = el.querySelector('.form-check-input');
        this.checkbox.checked = this.device.active;
        if (typeof this.callbacks.change === 'function') {
            this.checkbox.addEventListener('change', this.callbacks.change, false);
        }

        if (typeof this.callbacks.click === 'function') {
            el.querySelector('.device-name').addEventListener('click', (e) => {
                e.preventDefault();
                this.callbacks.click(this.device);
            }, false);
        }
    }
}
