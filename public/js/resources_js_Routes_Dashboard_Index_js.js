(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Routes_Dashboard_Index_js"],{

/***/ "./resources/js/Routes/Dashboard/Index.js":
/*!************************************************!*\
  !*** ./resources/js/Routes/Dashboard/Index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dashboard)
/* harmony export */ });
/* harmony import */ var _Utilities_Table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utilities/Table */ "./resources/js/Utilities/Table.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dashboard = /*#__PURE__*/_createClass(function Dashboard() {
  _classCallCheck(this, Dashboard);
  this.table = new _Utilities_Table__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('.dashboard'), {
    url: '/dashboard/devices',
    columns: [{
      name: 'name',
      title: 'Name',
      sortable: true
    }, {
      name: 'imei',
      title: 'Emei',
      sortable: true
    }, {
      name: 'address',
      title: 'Address'
    }, {
      name: 'users_count',
      title: 'Users count',
      sortable: true
    }]
  });
});


/***/ }),

/***/ "./resources/js/Utilities/Table.js":
/*!*****************************************!*\
  !*** ./resources/js/Utilities/Table.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Table)
/* harmony export */ });
/* harmony import */ var twbs_pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! twbs-pagination */ "./node_modules/twbs-pagination/jquery.twbsPagination.js");
/* harmony import */ var twbs_pagination__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(twbs_pagination__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Table = /*#__PURE__*/function () {
  function Table(el, _ref) {
    var url = _ref.url,
      columns = _ref.columns;
    _classCallCheck(this, Table);
    _defineProperty(this, "el", void 0);
    _defineProperty(this, "wrapper", void 0);
    _defineProperty(this, "columns", void 0);
    _defineProperty(this, "page", void 0);
    _defineProperty(this, "url", void 0);
    _defineProperty(this, "table", void 0);
    _defineProperty(this, "$pagination", void 0);
    _defineProperty(this, "data", {});
    _defineProperty(this, "sortBy", void 0);
    _defineProperty(this, "sortType", 'asc');
    this.el = el;
    this.columns = columns;
    this.url = url;
    this.page = 1;
    this.setup();
    this.loadData(this.page);
  }
  _createClass(Table, [{
    key: "loadData",
    value: function loadData(page) {
      var _this = this;
      if (typeof page === 'undefined') return;
      this.page = page;
      axios.get("".concat(this.url, "?page=").concat(this.page).concat(this.sortBy ? '&sort=' + this.sortBy + '&sort-type=' + this.sortType : '')).then(function (response) {
        _this.data = response.data;
        _this.render();
        _this.setupPagination();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      this.clearBody();
      this.data.data.forEach(function (item) {
        var tr = document.createElement('tr');
        _this2.columns.forEach(function (column) {
          var td = document.createElement('td');
          td.innerText = item[column.name];
          tr.appendChild(td);
        });
        _this2.table.tBodies[0].appendChild(tr);
      });
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this3 = this;
      this.wrapper = document.createElement('div');
      this.table = document.createElement('table');
      this.table.className = 'table table-striped';
      var head = document.createElement('thead');
      var tr = document.createElement('tr');
      this.columns.forEach(function (column) {
        var th = document.createElement('th');
        th.innerHTML = column.title;
        if (column.sortable) {
          th.addEventListener('click', _this3.sort.bind(_this3, column), false);
        }
        tr.appendChild(th);
      });
      head.appendChild(tr);
      this.table.appendChild(head);
      this.wrapper.appendChild(this.table);
      this.el.appendChild(this.wrapper);
    }
  }, {
    key: "clearBody",
    value: function clearBody() {
      if (this.table.tBodies[0]) {
        this.table.removeChild(this.table.tBodies[0]);
      }
      var body = document.createElement('tbody');
      this.table.appendChild(body);
    }
  }, {
    key: "setupPagination",
    value: function setupPagination() {
      var _this$data;
      if (!((_this$data = this.data) !== null && _this$data !== void 0 && _this$data.meta)) {
        return;
      }
      var options = {
        totalPages: this.data.meta.last_page,
        visiblePages: 5,
        onPageClick: this.onPageChange.bind(this)
      };
      if (!this.$pagination) {
        var pagination = document.createElement('div');
        this.wrapper.appendChild(pagination);
        this.$pagination = $(pagination);
      }
      this.$pagination = this.$pagination.twbsPagination(options);
    }
  }, {
    key: "onPageChange",
    value: function onPageChange(e, page) {
      this.loadData(page);
    }
  }, {
    key: "sort",
    value: function sort(column) {
      if (this.sortBy === column.name) {
        this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
      }
      this.sortBy = column.name;
      this.loadData(this.page);
    }
  }]);
  return Table;
}();


/***/ }),

/***/ "./node_modules/twbs-pagination/jquery.twbsPagination.js":
/*!***************************************************************!*\
  !*** ./node_modules/twbs-pagination/jquery.twbsPagination.js ***!
  \***************************************************************/
/***/ (() => {

/*!
 * jQuery pagination plugin v1.4.2
 * http://josecebe.github.io/twbs-pagination/
 *
 * Copyright 2014-2018, Eugene Simakin
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 */
(function ($, window, document, undefined) {

    'use strict';

    var old = $.fn.twbsPagination;

    // PROTOTYPE AND CONSTRUCTOR

    var TwbsPagination = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.twbsPagination.defaults, options);

        if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
            throw new Error('Start page option is incorrect');
        }

        this.options.totalPages = parseInt(this.options.totalPages);
        if (isNaN(this.options.totalPages)) {
            throw new Error('Total pages option is not correct!');
        }

        this.options.visiblePages = parseInt(this.options.visiblePages);
        if (isNaN(this.options.visiblePages)) {
            throw new Error('Visible pages option is not correct!');
        }

        if (this.options.beforePageClick instanceof Function) {
            this.$element.first().on('beforePage', this.options.beforePageClick);
        }

        if (this.options.onPageClick instanceof Function) {
            this.$element.first().on('page', this.options.onPageClick);
        }

        // hide if only one page exists
        if (this.options.hideOnlyOnePage && this.options.totalPages == 1) {
            if (this.options.initiateStartPageClick) {
                this.$element.trigger('page', 1);
            }
            return this;
        }

        if (this.options.href) {
            this.options.startPage = this.getPageFromQueryString();
            if (!this.options.startPage) {
                this.options.startPage = 1;
            }
        }

        var tagName = (typeof this.$element.prop === 'function') ?
            this.$element.prop('tagName') : this.$element.attr('tagName');

        if (tagName === 'UL') {
            this.$listContainer = this.$element;
        } else {
            var elements = this.$element;
            var $newListContainer = $([]);
            elements.each(function(index) {
                var $newElem = $("<ul></ul>");
                $(this).append($newElem);
                $newListContainer.push($newElem[0]);
            });
            this.$listContainer = $newListContainer;
            this.$element = $newListContainer;
        }

        this.$listContainer.addClass(this.options.paginationClass);

        if (this.options.initiateStartPageClick) {
            this.show(this.options.startPage);
        } else {
            this.currentPage = this.options.startPage;
            this.render(this.getPages(this.options.startPage));
            this.setupEvents();
        }

        return this;
    };

    TwbsPagination.prototype = {

        constructor: TwbsPagination,

        destroy: function () {
            this.$element.empty();
            this.$element.removeData('twbs-pagination');
            this.$element.off('page');

            return this;
        },

        show: function (page) {
            if (page < 1 || page > this.options.totalPages) {
                throw new Error('Page is incorrect.');
            }
            this.currentPage = page;

            this.$element.trigger('beforePage', page);

            var pages = this.getPages(page);
            this.render(pages);
            this.setupEvents();

            this.$element.trigger('page', page);

            return pages;
        },

        enable: function () {
            this.show(this.currentPage);
        },

        disable: function () {
            var _this = this;
            this.$listContainer.off('click').on('click', 'li', function (evt) {
                evt.preventDefault();
            });
            this.$listContainer.children().each(function () {
                var $this = $(this);
                if (!$this.hasClass(_this.options.activeClass)) {
                    $(this).addClass(_this.options.disabledClass);
                }
            });
        },

        buildListItems: function (pages) {
            var listItems = [];

            if (this.options.first) {
                listItems.push(this.buildItem('first', 1));
            }

            if (this.options.prev) {
                var prev = pages.currentPage > 1 ? pages.currentPage - 1 : this.options.loop ? this.options.totalPages  : 1;
                listItems.push(this.buildItem('prev', prev));
            }

            for (var i = 0; i < pages.numeric.length; i++) {
                listItems.push(this.buildItem('page', pages.numeric[i]));
            }

            if (this.options.next) {
                var next = pages.currentPage < this.options.totalPages ? pages.currentPage + 1 : this.options.loop ? 1 : this.options.totalPages;
                listItems.push(this.buildItem('next', next));
            }

            if (this.options.last) {
                listItems.push(this.buildItem('last', this.options.totalPages));
            }

            return listItems;
        },

        buildItem: function (type, page) {
            var $itemContainer = $('<li></li>'),
                $itemContent = $('<a></a>'),
                itemText = this.options[type] ? this.makeText(this.options[type], page) : page;

            $itemContainer.addClass(this.options[type + 'Class']);
            $itemContainer.data('page', page);
            $itemContainer.data('page-type', type);
            $itemContainer.append($itemContent.attr('href', this.makeHref(page)).addClass(this.options.anchorClass).html(itemText));

            return $itemContainer;
        },

        getPages: function (currentPage) {
            var pages = [];

            var half = Math.floor(this.options.visiblePages / 2);
            var start = currentPage - half + 1 - this.options.visiblePages % 2;
            var end = currentPage + half;

            var visiblePages = this.options.visiblePages;
            if (visiblePages > this.options.totalPages) {
                visiblePages = this.options.totalPages;
            }

            // handle boundary case
            if (start <= 0) {
                start = 1;
                end = visiblePages;
            }
            if (end > this.options.totalPages) {
                start = this.options.totalPages - visiblePages + 1;
                end = this.options.totalPages;
            }

            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }

            return {"currentPage": currentPage, "numeric": pages};
        },

        render: function (pages) {
            var _this = this;
            this.$listContainer.children().remove();
            var items = this.buildListItems(pages);
            $.each(items, function(key, item){
                _this.$listContainer.append(item);
            });

            this.$listContainer.children().each(function () {
                var $this = $(this),
                    pageType = $this.data('page-type');

                switch (pageType) {
                    case 'page':
                        if ($this.data('page') === pages.currentPage) {
                            $this.addClass(_this.options.activeClass);
                        }
                        break;
                    case 'first':
                            $this.toggleClass(_this.options.disabledClass, pages.currentPage === 1);
                        break;
                    case 'last':
                            $this.toggleClass(_this.options.disabledClass, pages.currentPage === _this.options.totalPages);
                        break;
                    case 'prev':
                            $this.toggleClass(_this.options.disabledClass, !_this.options.loop && pages.currentPage === 1);
                        break;
                    case 'next':
                            $this.toggleClass(_this.options.disabledClass,
                                !_this.options.loop && pages.currentPage === _this.options.totalPages);
                        break;
                    default:
                        break;
                }

            });
        },

        setupEvents: function () {
            var _this = this;
            this.$listContainer.off('click').on('click', 'li', function (evt) {
                var $this = $(this);
                if ($this.hasClass(_this.options.disabledClass) || $this.hasClass(_this.options.activeClass)) {
                    return false;
                }
                // Prevent click event if href is not set.
                !_this.options.href && evt.preventDefault();
                _this.show(parseInt($this.data('page')));
            });
        },

        changeTotalPages: function(totalPages, currentPage) {
            this.options.totalPages = totalPages;
            return this.show(currentPage);
        },

        makeHref: function (page) {
            return this.options.href ? this.generateQueryString(page) : "#";
        },

        makeText: function (text, page) {
            return text.replace(this.options.pageVariable, page)
                .replace(this.options.totalPagesVariable, this.options.totalPages)
        },

        getPageFromQueryString: function (searchStr) {
            var search = this.getSearchString(searchStr),
                regex = new RegExp(this.options.pageVariable + '(=([^&#]*)|&|#|$)'),
                page = regex.exec(search);
            if (!page || !page[2]) {
                return null;
            }
            page = decodeURIComponent(page[2]);
            page = parseInt(page);
            if (isNaN(page)) {
                return null;
            }
            return page;
        },

        generateQueryString: function (pageNumber, searchStr) {
            var search = this.getSearchString(searchStr),
                regex = new RegExp(this.options.pageVariable + '=*[^&#]*');
            if (!search) return '';
            return '?' + search.replace(regex, this.options.pageVariable + '=' + pageNumber);
        },

        getSearchString: function (searchStr) {
            var search = searchStr || window.location.search;
            if (search === '') {
                return null;
            }
            if (search.indexOf('?') === 0) search = search.substr(1);
            return search;
        },

        getCurrentPage: function () {
            return this.currentPage;
        },

        getTotalPages: function () {
            return this.options.totalPages;
        }
    };

    // PLUGIN DEFINITION

    $.fn.twbsPagination = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $this = $(this);
        var data = $this.data('twbs-pagination');
        var options = typeof option === 'object' ? option : {};

        if (!data) $this.data('twbs-pagination', (data = new TwbsPagination(this, options) ));
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };

    $.fn.twbsPagination.defaults = {
        totalPages: 1,
        startPage: 1,
        visiblePages: 5,
        initiateStartPageClick: true,
        hideOnlyOnePage: false,
        href: false,
        pageVariable: '{{page}}',
        totalPagesVariable: '{{total_pages}}',
        page: null,
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',
        loop: false,
        beforePageClick: null,
        onPageClick: null,
        paginationClass: 'pagination',
        nextClass: 'page-item next',
        prevClass: 'page-item prev',
        lastClass: 'page-item last',
        firstClass: 'page-item first',
        pageClass: 'page-item',
        activeClass: 'active',
        disabledClass: 'disabled',
        anchorClass: 'page-link'
    };

    $.fn.twbsPagination.Constructor = TwbsPagination;

    $.fn.twbsPagination.noConflict = function () {
        $.fn.twbsPagination = old;
        return this;
    };

    $.fn.twbsPagination.version = "1.4.2";

})(window.jQuery, window, document);


/***/ })

}]);