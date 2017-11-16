define(['exports', 'marionette', 'backbone', 'underscore', 'models/submission_collection', 'models/submission_model', 'views/tablet_item_view', 'text!templates/tablet_tmpl.html'], function (exports, _marionette, _backbone, _underscore, _submission_collection, _submission_model, _tablet_item_view, _tablet_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-01 13:40:54
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _backbone2 = _interopRequireDefault(_backbone);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _submission_collection2 = _interopRequireDefault(_submission_collection);

    var _submission_model2 = _interopRequireDefault(_submission_model);

    var _tablet_item_view2 = _interopRequireDefault(_tablet_item_view);

    var _tablet_tmpl2 = _interopRequireDefault(_tablet_tmpl);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var TabletView = function (_Marionette$Composite) {
        _inherits(TabletView, _Marionette$Composite);

        function TabletView() {
            _classCallCheck(this, TabletView);

            return _possibleConstructorReturn(this, (TabletView.__proto__ || Object.getPrototypeOf(TabletView)).apply(this, arguments));
        }

        _createClass(TabletView, [{
            key: 'initialize',
            value: function initialize(options) {

                this.fetchParams = {};

                if (options.tag != null) this.fetchParams.tag = options.tag;
                if (options.dataset != null) this.fetchParams.dataset = options.dataset;

                this.collection = new _submission_collection2.default();

                this.listenTo(this.collection, 'sync', this.hideSpinner);
                this.listenTo(this.collection, 'fetching', this.showSpinner);

                this.listenTo(_backbone2.default, 'submission:changed', this.onSubmissionChanged);
                this.listenTo(_backbone2.default, 'submission:new', this.onSubmissionAdded);
                this.listenTo(_backbone2.default, 'submission:removed', this.onSubmissionRemoved);
                this.listenTo(_backbone2.default, 'feedback:scanning', this.onSubmissionScanning);

                this.collection.getFirstPage(this.fetchParams);
            }
        }, {
            key: 'onAttach',
            value: function onAttach() {
                var _this2 = this;

                //bind scroll handler
                this.winowScrollListener = _underscore2.default.throttle(function () {
                    _this2.onWindowScroll();
                }, 500);
                $(window).on('scroll', this.winowScrollListener);
            }
        }, {
            key: 'onBeforeDestroy',
            value: function onBeforeDestroy() {
                //unbind scroll handler
                $(window).off("scroll", this.winowScrollListener);
            }
        }, {
            key: 'onSubmissionChanged',
            value: function onSubmissionChanged(data) {
                var model = this.collection.get(data.model._id);
                if (model) model.fetch();
            }
        }, {
            key: 'onSubmissionAdded',
            value: function onSubmissionAdded(data) {
                //console.log(data);
                var submission = new _submission_model2.default(data.model);
                submission.fetch();
                // add to front of collection
                this.collection.add(submission, { at: 0 });
                this.hideScanSpinner();
            }
        }, {
            key: 'onSubmissionRemoved',
            value: function onSubmissionRemoved(data) {
                console.log(data);
                this.collection.remove(data._id);
            }
        }, {
            key: 'onSubmissionScanning',
            value: function onSubmissionScanning(data) {
                this.showScanSpinner();
            }
        }, {
            key: 'onWindowScroll',
            value: function onWindowScroll() {

                var scrollPos = $(window).scrollTop();
                var triggerPos = $(document).height() - $(window).height() * 1.2;

                if (scrollPos > triggerPos) {
                    this.collection.getNextPage(this.fetchParams);
                }
            }
        }, {
            key: 'showSpinner',
            value: function showSpinner() {
                this.$('#fetch-spinner').removeClass('hidden');
            }
        }, {
            key: 'hideSpinner',
            value: function hideSpinner() {
                this.$('#fetch-spinner').addClass('hidden');
            }
        }, {
            key: 'showScanSpinner',
            value: function showScanSpinner() {
                var _this3 = this;

                this.$('#scan-spinner').removeClass('hidden');
                setTimeout(function () {
                    _this3.hideScanSpinner();
                }, 10000);
            }
        }, {
            key: 'hideScanSpinner',
            value: function hideScanSpinner() {
                this.$('#scan-spinner').addClass('hidden');
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_tablet_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'composite-view';
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#submission-list';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _tablet_item_view2.default;
            }
        }]);

        return TabletView;
    }(_marionette2.default.CompositeView);

    exports.default = TabletView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWJsZXRfdmlldy5qcyJdLCJuYW1lcyI6WyJUYWJsZXRWaWV3Iiwib3B0aW9ucyIsImZldGNoUGFyYW1zIiwidGFnIiwiZGF0YXNldCIsImNvbGxlY3Rpb24iLCJsaXN0ZW5UbyIsImhpZGVTcGlubmVyIiwic2hvd1NwaW5uZXIiLCJvblN1Ym1pc3Npb25DaGFuZ2VkIiwib25TdWJtaXNzaW9uQWRkZWQiLCJvblN1Ym1pc3Npb25SZW1vdmVkIiwib25TdWJtaXNzaW9uU2Nhbm5pbmciLCJnZXRGaXJzdFBhZ2UiLCJ3aW5vd1Njcm9sbExpc3RlbmVyIiwidGhyb3R0bGUiLCJvbldpbmRvd1Njcm9sbCIsIiQiLCJ3aW5kb3ciLCJvbiIsIm9mZiIsImRhdGEiLCJtb2RlbCIsImdldCIsIl9pZCIsImZldGNoIiwic3VibWlzc2lvbiIsImFkZCIsImF0IiwiaGlkZVNjYW5TcGlubmVyIiwiY29uc29sZSIsImxvZyIsInJlbW92ZSIsInNob3dTY2FuU3Bpbm5lciIsInNjcm9sbFBvcyIsInNjcm9sbFRvcCIsInRyaWdnZXJQb3MiLCJkb2N1bWVudCIsImhlaWdodCIsImdldE5leHRQYWdlIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInNldFRpbWVvdXQiLCJ0ZW1wbGF0ZSIsIkNvbXBvc2l0ZVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdCTUEsVTs7Ozs7Ozs7Ozs7dUNBYU1DLE8sRUFBUzs7QUFFbkIscUJBQUtDLFdBQUwsR0FBbUIsRUFBbkI7O0FBRUEsb0JBQUlELFFBQVFFLEdBQVIsSUFBZSxJQUFuQixFQUNDLEtBQUtELFdBQUwsQ0FBaUJDLEdBQWpCLEdBQXVCRixRQUFRRSxHQUEvQjtBQUNLLG9CQUFJRixRQUFRRyxPQUFSLElBQW1CLElBQXZCLEVBQ0ksS0FBS0Ys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LGdCQUFQO0FBQXlCOzs7Z0NBRWxCO0FBQUUsdUJBQU8sa0JBQVA7QUFBMkI7OztnQ0FFdEM7QUFBRTtBQUF1Qjs7OztNQVRqQixxQkFBV0MsYTs7c0JBeUdyQjVDLFUiLCJmaWxlIjoidGFibGV0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDEgMTM6NDA6NTRcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IFN1Ym1pc3Npb25Db2xsZWN0aW9uIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX2NvbGxlY3Rpb24nO1xuaW1wb3J0IFN1Ym1pc3Npb25Nb2RlbCBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9tb2RlbCc7XG5pbXBvcnQgVGFibGV0SXRlbVZpZXcgZnJvbSAndmlld3MvdGFibGV0X2l0ZW1fdmlldyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy90YWJsZXRfdG1wbC5odG1sJztcblxuY2xhc3MgVGFibGV0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cblx0Z2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdjb21wb3NpdGUtdmlldycgfVxuXG5cdGdldCBjaGlsZFZpZXdDb250YWluZXIoKSB7IHJldHVybiAnI3N1Ym1pc3Npb24tbGlzdCcgfVxuXG5cdGdldCBjaGlsZFZpZXcoKSB7IHJldHVybiBUYWJsZXRJdGVtVmlldyB9XG5cblx0LyogbWV0aG9kcyAqL1xuXG5cdGluaXRpYWxpemUob3B0aW9ucykge1xuXG5cdFx0dGhpcy5mZXRjaFBhcmFtcyA9IHt9O1xuXG5cdFx0aWYgKG9wdGlvbnMudGFnICE9IG51bGwpXG5cdFx0XHR0aGlzLmZldGNoUGFyYW1zLnRhZyA9IG9wdGlvbnMudGFnXG4gICAgICAgIGlmIChvcHRpb25zLmRhdGFzZXQgIT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hQYXJhbXMuZGF0YXNldCA9IG9wdGlvbnMuZGF0YXNldFxuXHRcdFxuXHRcdHRoaXMuY29sbGVjdGlvbiA9IG5ldyBTdWJtaXNzaW9uQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdzeW5jJyx0aGlzLmhpZGVTcGlubmVyKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ2ZldGNoaW5nJyx0aGlzLnNob3dTcGlubmVyKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOmNoYW5nZWQnLCB0aGlzLm9uU3VibWlzc2lvbkNoYW5nZWQpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOm5ldycsIHRoaXMub25TdWJtaXNzaW9uQWRkZWQpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOnJlbW92ZWQnLCB0aGlzLm9uU3VibWlzc2lvblJlbW92ZWQpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdmZWVkYmFjazpzY2FubmluZycsIHRoaXMub25TdWJtaXNzaW9uU2Nhbm5pbmcpO1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG5cdH1cblxuICAgIG9uQXR0YWNoKCkge1xuICAgICAgICAvL2JpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyID0gIF8udGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbldpbmRvd1Njcm9sbCgpO1xuICAgICAgICB9LDUwMCk7XG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJyx0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIG9uQmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgLy91bmJpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgJCh3aW5kb3cpLm9mZihcInNjcm9sbFwiLCB0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuXG5cdC8vIHVwZGF0ZSBtb2RlbCBvbiBkYXRhIGNoYW5nZVxuICAgIG9uU3VibWlzc2lvbkNoYW5nZWQoZGF0YSkge1xuICAgIFx0dmFyIG1vZGVsID0gdGhpcy5jb2xsZWN0aW9uLmdldChkYXRhLm1vZGVsLl9pZCk7XG4gICAgXHRpZiAobW9kZWwpXG4gICAgXHRcdG1vZGVsLmZldGNoKCk7XG4gICAgfVxuXG4gICAgb25TdWJtaXNzaW9uQWRkZWQoZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgIFx0dmFyIHN1Ym1pc3Npb24gPSBuZXcgU3VibWlzc2lvbk1vZGVsKGRhdGEubW9kZWwpO1xuICAgIFx0c3VibWlzc2lvbi5mZXRjaCgpO1xuICAgIFx0IC8vIGFkZCB0byBmcm9udCBvZiBjb2xsZWN0aW9uXG5cdFx0dGhpcy5jb2xsZWN0aW9uLmFkZChzdWJtaXNzaW9uLCB7IGF0OiAwfSk7XG5cdFx0dGhpcy5oaWRlU2NhblNwaW5uZXIoKTtcbiAgICB9XG5cbiAgICBvblN1Ym1pc3Npb25SZW1vdmVkKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5yZW1vdmUoZGF0YS5faWQpO1xuICAgIH1cblxuICAgIG9uU3VibWlzc2lvblNjYW5uaW5nKGRhdGEpIHtcbiAgICBcdHRoaXMuc2hvd1NjYW5TcGlubmVyKCk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dTY3JvbGwoKSB7XG5cbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgdmFyIHRyaWdnZXJQb3MgPSAgJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCkgKiAxLjI7XG5cbiAgICAgICAgaWYgKHNjcm9sbFBvcyA+IHRyaWdnZXJQb3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXROZXh0UGFnZSh0aGlzLmZldGNoUGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dTcGlubmVyKCkge1xuICAgICAgICB0aGlzLiQoJyNmZXRjaC1zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpOyAgICBcbiAgICB9XG4gICAgXG4gICAgaGlkZVNwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMuJCgnI2ZldGNoLXNwaW5uZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgc2hvd1NjYW5TcGlubmVyKCkge1xuICAgIFx0dGhpcy4kKCcjc2Nhbi1zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIFx0c2V0VGltZW91dCgoKSA9PiB7XG4gICAgXHRcdHRoaXMuaGlkZVNjYW5TcGlubmVyKCk7XG4gICAgXHR9LDEwMDAwKVxuICAgIH1cblxuICAgIGhpZGVTY2FuU3Bpbm5lcigpIHtcbiAgICBcdHRoaXMuJCgnI3NjYW4tc3Bpbm5lcicpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gIFxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZXRWaWV3Il19