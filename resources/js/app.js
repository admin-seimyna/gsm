require('./bootstrap');
import Router from './router';

new Router(
    document.querySelector('#app'),
    [
        {
            name: 'login',
            component: () => import('./Routes/Login/Index')
        }, {
            name: 'map',
            component: () => import('./Routes/Map/Index')
        }, {
            name: 'dashboard',
            component: () => import('./Routes/Dashboard/Index')
        }
], {
    error(error) {
        const status = error?.response?.status;
        if (status === 303 && error?.response?.url === this.url) {
            this.push('map');
        }

        if (status === 401) {
            this.push('login');
        }
    }
});
