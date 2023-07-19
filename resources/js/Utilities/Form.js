import axios from 'axios';

export default class Form {
    el;
    options = {};

    constructor(el, options) {
        this.el = el
        this.options = Object.assign({
            method: 'post',
            url: '',
            error(errors) {},
            success(response) {},
            progress(status) {}
        }, options);
        this.el.addEventListener('submit', this.onSubmit.bind(this), false);
    }

    reset() {
        this.el.reset();
        this.clear();
    }

    onSubmit(e) {
        e.preventDefault();
        this.callback('progress', true);
        this.clear();
        this.handleProgress();
        const formData = new FormData(this.el);
        axios[this.options.method](this.options.url, formData).then((response) => {
            this.callback('success', response);
        }).catch((error) => {
            const errors = error?.response?.data?.errors;
            this.callback('error', errors);
            if (!errors) {
                console.error('Form error!', error.response);
                this.throwErrorMessage(error?.response?.data?.message);
                return;
            }
            this.handleErrors(errors);
        }).finally(() => {
            this.callback('progress', false);
            this.removeSpinner();
        });
    }

    throwErrorMessage(message) {
        const msg = document.createElement('div');
        msg.className = 'form-error-message alert alert-danger';
        msg.innerText = message;
        this.el.appendChild(msg);
    }

    handleProgress() {
        const el = document.createElement('div');
        el.className = 'form-progress';
        const spinner = document.createElement('div');
        spinner.className = 'spinner-border text-primary';
        el.appendChild(spinner);
        this.el.appendChild(el);
    }

    callback(name, data) {
        if (typeof this.options[name] === 'function') {
            this.options[name](data);
        }
    }

    clear() {
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        $('.form-error-message').remove();
        this.removeSpinner();
    }

    removeSpinner() {
        const spinner = this.el.querySelector('.form-progress');
        if (!spinner) return;
        this.el.removeChild(spinner);
    }

    handleErrors(errors) {
        Object.keys(errors).forEach((field) => {
            const messages = errors[field];
            const input = this.el.querySelector(`[name=${field}]`);
            if(!input) return;
            input.classList.add('is-invalid');
            const msg = document.createElement('div');
            msg.className = 'invalid-feedback';
            msg.innerText = messages[0];
            input.parentNode.appendChild(msg);
        })
    }
}
