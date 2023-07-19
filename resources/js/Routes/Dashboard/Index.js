import Table from '../../Utilities/Table';

export default class Dashboard {
    constructor() {
        this.table = new Table(document.querySelector('.dashboard'), {
            url: '/dashboard/devices',
            columns: [
                { name: 'name', title: 'Name', sortable: true  },
                { name: 'imei', title: 'Emei', sortable: true },
                { name: 'address', title: 'Address' },
                { name: 'users_count', title: 'Users count', sortable: true },
            ]
        });
    }
}
