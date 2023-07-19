import Form from './../../Utilities/Form';

export default class Map {
    constructor({ router }) {
        this.form = new Form(document.querySelector('.login-form'), {
            url: '/login',
            success() {
                router.push('map');
            }
        });
    }

}
