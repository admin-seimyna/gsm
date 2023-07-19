import twbs from 'twbs-pagination';

export default class Table {
    el;
    wrapper;
    columns;
    page;
    url;
    table;
    $pagination;
    data = {};
    sortBy;
    sortType = 'asc';

    constructor(el, { url, columns }) {
        this.el = el;
        this.columns = columns;
        this.url = url;
        this.page = 1;
        this.setup();
        this.loadData(this.page);
    }

    loadData(page) {
        if (typeof page === 'undefined') return;

        this.page = page;
        axios.get(`${this.url}?page=${this.page}${this.sortBy ? '&sort=' + this.sortBy + '&sort-type=' + this.sortType : ''}`).then((response) => {
            this.data = response.data;
            this.render();
            this.setupPagination();
        });
    }

    render() {
        this.clearBody();
        this.data.data.forEach((item) => {
            const tr = document.createElement('tr');
            this.columns.forEach((column) => {
                const td = document.createElement('td');
                td.innerText = item[column.name];
                tr.appendChild(td);
            });
            this.table.tBodies[0].appendChild(tr);
        });
    }

    setup() {
        this.wrapper = document.createElement('div');
        this.table = document.createElement('table');
        this.table.className = 'table table-striped';

        const head = document.createElement('thead');
        const tr = document.createElement('tr');
        this.columns.forEach((column) => {
            const th = document.createElement('th');
            th.innerHTML = column.title;

            if(column.sortable) {
                th.addEventListener('click', this.sort.bind(this, column),false);
            }
            tr.appendChild(th);
        });
        head.appendChild(tr);
        this.table.appendChild(head);

        this.wrapper.appendChild(this.table);
        this.el.appendChild(this.wrapper);
    }

    clearBody() {
        if (this.table.tBodies[0]) {
            this.table.removeChild(this.table.tBodies[0]);
        }
        const body = document.createElement('tbody');
        this.table.appendChild(body);
    }

    setupPagination() {
        if (!this.data?.meta) {
            return;
        }

        const options = {
            totalPages: this.data.meta.last_page,
            visiblePages: 5,
            onPageClick: this.onPageChange.bind(this)
        };

        if (!this.$pagination) {
            const pagination = document.createElement('div');
            this.wrapper.appendChild(pagination);
            this.$pagination = $(pagination);
        }

        this.$pagination = this.$pagination.twbsPagination(options);
    }

    onPageChange(e, page) {
        this.loadData(page);
    }

    sort(column) {
        if (this.sortBy === column.name) {
            this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
        }
        this.sortBy = column.name;
        this.loadData(this.page);
    }
}
