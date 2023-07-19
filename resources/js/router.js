import * as Handlebars from 'handlebars/dist/cjs/handlebars';
import axios from 'axios';

export default class Router
{
    el;
    routes = [];
    options = {};
    url = '';

    constructor(el, routes, options) {
        this.el = el;
        this.routes = routes;
        this.options = Object.assign({
            error(response){}
        }, options);
        this.url = location.protocol + '//' + location.host + '/';

        window.addEventListener('hashchange', this.handle.bind(this));
        this.handle();
    }

    handle() {
        this.el.innerHTML = '';
        const name = window.location.hash.replace('#', '');
        const route = this.routes.find(route => route.name === name);
        if (!route) {
            console.error(`Route not found "${name}"`);
            return;
        }

        const url = `${this.url}${route.name}/view`;
        axios.get(url)
            .then((response) => {
                if (response.request.responseURL !== url) {
                    // was redirected
                    this.handleError({
                        response: {
                            url: response.request.responseURL,
                            status: 303
                        }
                    });
                    return;
                }

                this.el.innerHTML = response.data;
                route.component().then((component) => {
                    new component.default({
                        router: {
                            push: this.push.bind(this)
                        }
                    });
                });
            }).catch((error) => {
                if (!error?.response) {
                    console.error(`View "${route.name}" not found!`);
                    return;
                }

                this.handleError(error);
        });
    }

    handleError(error) {
        this.options.error.call({
            url: this.url,
            push: this.push.bind(this)
        }, error);
    }

    push(name) {
        const route = this.routes.find(route => route.name === name);
        if (!route) {
            console.error(`Route "${name} not found!`);
            return;
        }
        window.location.hash = name;
    }
}
