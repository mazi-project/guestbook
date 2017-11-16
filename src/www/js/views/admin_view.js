define(['exports', 'backbone', 'marionette', 'jquery', 'underscore', 'models/submission_collection', 'views/admin_item_view', 'text!templates/admin_tmpl.html'], function (exports, _backbone, _marionette, _jquery, _underscore, _submission_collection, _admin_item_view, _admin_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-05-31 15:23:53
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _marionette2 = _interopRequireDefault(_marionette);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _submission_collection2 = _interopRequireDefault(_submission_collection);

    var _admin_item_view2 = _interopRequireDefault(_admin_item_view);

    var _admin_tmpl2 = _interopRequireDefault(_admin_tmpl);

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

    var AdminView = function (_Marionette$Composite) {
        _inherits(AdminView, _Marionette$Composite);

        function AdminView() {
            _classCallCheck(this, AdminView);

            return _possibleConstructorReturn(this, (AdminView.__proto__ || Object.getPrototypeOf(AdminView)).apply(this, arguments));
        }

        _createClass(AdminView, [{
            key: 'initialize',
            value: function initialize(options) {

                this.collection = new _submission_collection2.default();

                this.listenTo(this.collection, 'sync', this.hideSpinner);
                this.listenTo(this.collection, 'fetching', this.showSpinner);

                this.collection.getFirstPage();

                this.listenTo(_backbone2.default, 'submission:changed', this.onSubmissionChanged);
            }
        }, {
            key: 'onAttach',
            value: function onAttach() {
                var _this2 = this;

                //bind scroll handler
                this.winowScrollListener = _underscore2.default.throttle(function () {
                    _this2.onWindowScroll();
                }, 500);
                (0, _jquery2.default)(window).on('scroll', this.winowScrollListener);
            }
        }, {
            key: 'onBeforeDestroy',
            value: function onBeforeDestroy() {
                //unbind scroll handler
                (0, _jquery2.default)(window).off("scroll", this.winowScrollListener);
            }
        }, {
            key: 'onSubmissionChanged',
            value: function onSubmissionChanged(data) {
                var model = this.collection.get(data.model._id);
                if (model) model.fetch();
            }
        }, {
            key: 'onWindowScroll',
            value: function onWindowScroll() {

                var scrollPos = (0, _jquery2.default)(window).scrollTop();
                var triggerPos = (0, _jquery2.default)(document).height() - (0, _jquery2.default)(window).height() * 1.2;

                if (scrollPos > triggerPos) {
                    this.collection.getNextPage(this.fetchParams);
                }
            }
        }, {
            key: 'showSpinner',
            value: function showSpinner() {
                this.$('.spinner').removeClass('hidden');
                this.$('#load-more-button').addClass('hidden');
            }
        }, {
            key: 'hideSpinner',
            value: function hideSpinner() {
                this.$('.spinner').addClass('hidden');
                if (!this.loadMore) {
                    this.$('#load-more-button').removeClass('hidden');
                }
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_admin_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'adminview';
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#submission-list';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _admin_item_view2.default;
            }
        }]);

        return AdminView;
    }(_marionette2.default.CompositeView);

    exports.default = AdminView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hZG1pbl92aWV3LmpzIl0sIm5hbWVzIjpbIkFkbWluVmlldyIsIm9wdGlvbnMiLCJjb2xsZWN0aW9uIiwibGlzdGVuVG8iLCJoaWRlU3Bpbm5lciIsInNob3dTcGlubmVyIiwiZ2V0Rmlyc3RQYWdlIiwib25TdWJtaXNzaW9uQ2hhbmdlZCIsIndpbm93U2Nyb2xsTGlzdGVuZXIiLCJ0aHJvdHRsZSIsIm9uV2luZG93U2Nyb2xsIiwid2luZG93Iiwib24iLCJvZmYiLCJkYXRhIiwibW9kZWwiLCJnZXQiLCJfaWQiLCJmZXRjaCIsInNjcm9sbFBvcyIsInNjcm9sbFRvcCIsInRyaWdnZXJQb3MiLCJkb2N1bWVudCIsImhlaWdodCIsImdldE5leHRQYWdlIiwiZmV0Y2hQYXJhbXMiLCIkIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxvYWRNb3JlIiwidGVtcGxhdGUiLCJDb21wb3NpdGVWaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFlTUEsUzs7Ozs7Ozs7Ozs7dUNBWVNDLE8sRUFBUzs7QUFFbkIscUJBQUtDLFVBQUwsR0FBa0IscUNBQWxCOztBQUVHLHFCQUFLQyxRQUFMLENBQWMsS0FBS0QsVUFBbkIsRUFBOEIsTUFBOUIsRUFBcUMsS0FBS0UsV0FBMUM7QUFDQSxxQkFBS0QsUUFBTCxDQUFjLEtBQUtELFVBQW5CLEVBQThCLFVBQTlCLEVBQXlDLEtBQUtHLFdBQTlDOztBQUVILHFCQUFLSCxVQUFMLENBQWdCSSxZQUFoQjs7QUFFRyxxQkFBS0gsUUFBTCxxQkFBdUIsb0JBQXZCLEVBQTZDLEtBQUtJLG1CQUFsRDtBQUNIOzs7dUNBRVU7QUFBQTs7QUFDUDtBQUNBLHFCQUFLQyxtQkFBTCxHQUE0QixxQkFBRUMsUUFBRixDQUFXLFlBQU07QUFDekMsMkJBQUtDLGNBQUw7QUFDSCxpQkFGMkIsRUFFMUIsR0FGMEIsQ0FBNUI7QUFHQSxzQ0FBRUMsTUFBRixFQUFVQyxFQUFWLENBQWEsUUFBYixFQUFzQixLQUFLSixtQkFBM0I7QUFDSDs7OzhDQUVpQjtBQUNkO0FBQ0Esc0NBQUVHLE1BQUYsRUFBVUUsR0FBVixDQUFjLFFBQWQsRUFBd0IsS0FBS0wsbUJBQTdCO0FBQ0g7OztnREFHbUJNLEksRUFBTTtBQUN0QixvQkFBSUMsUUFBUSxLQUFLYixVQUFMLENBQWdCYyxHQUFoQixDQUFvQkYsS0FBS0MsS0FBTCxDQUFXRSxHQUEvQixDQUFaO0FBQ0Esb0JBQUlGLEtBQUosRUFDSUEsTUFBTUcsS0FBTjtBQUNQOzs7NkNBRWdCOztBQUViLG9CQUFJQyxZQUFZLHNCQUFFUixNQUFGLEVBQVVTLFNBQVYsRUFBaEI7QUFDQSxvQkFBSUMsYUFBYyxzQkFBRUMsUUFBRixFQUFZQyxNQUFaLEtBQXVCLHNCQUFFWixNQUFGLEVBQVVZLE1BQVYsS0FBcUIsR0FBOUQ7O0FBRUEsb0JBQUlKLFlBQVlFLFVBQWhCLEVBQTRCO0FBQ3hCLHlCQUFLbkIsVUFBTCxDQUFnQnNCLFdBQWhCLENBQTRCLEtBQUtDLFdBQWpDO0FBQ0g7QUFDSjs7OzBDQUVhO0FBQ1YscUJBQUtDLENBQUwsQ0FBTyxVQUFQLEVBQW1CQyxXQUFuQixDQUErQixRQUEvQjtBQUNBLHFCQUFLRCxDQUFMLENBQU8sbUJBQVAsRUFBNEJFLFFBQTVCLENBQXFDLFFBQXJDO0FBQ0g7OzswQ0FFYTtBQUNWLHFCQUFLRixDQUFMLENBQU8sVUFBUCxFQUFtQkUsUUFBbkIsQ0FBNEIsUUFBNUI7QUFDQSxvQkFBSSxDQUFFLEtBQUtDLFFBQVgsRUFBc0I7QUFDbEIseUJBQUtILENBQUwsQ0FBTyxtQkFBUCxFQUE0QkMsV0FBNUIsQ0FBd0MsUUFBeEM7QUFDSDtBQUNKOzs7Z0NBN0RjO0FBQUUsdUJBQU8scUJBQUVHLFFBQUYsc0JBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxXQUFQO0FBQW9COzs7Z0NBRWI7QUFBRSx1QkFBTyxrQkFBUDtBQUEyQjs7O2dDQUV0QztBQUFFO0FBQXNCOzs7O01BVHBCLHFCQUFXQyxhOztzQkFvRXBCL0IsUyIsImZpbGUiOiJhZG1pbl92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA1LTMxIDE1OjIzOjUzXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgU3VibWlzc2lvbkNvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL3N1Ym1pc3Npb25fY29sbGVjdGlvbic7XG5pbXBvcnQgQWRtaW5JdGVtVmlldyBmcm9tICd2aWV3cy9hZG1pbl9pdGVtX3ZpZXcnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2FkbWluX3RtcGwuaHRtbCc7XG5cbmNsYXNzIEFkbWluVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2FkbWludmlldycgfVxuXG4gICAgZ2V0IGNoaWxkVmlld0NvbnRhaW5lcigpIHsgcmV0dXJuICcjc3VibWlzc2lvbi1saXN0JyB9XG5cbiAgICBnZXQgY2hpbGRWaWV3KCkgeyByZXR1cm4gQWRtaW5JdGVtVmlldyB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICBcdHRoaXMuY29sbGVjdGlvbiA9IG5ldyBTdWJtaXNzaW9uQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdzeW5jJyx0aGlzLmhpZGVTcGlubmVyKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ2ZldGNoaW5nJyx0aGlzLnNob3dTcGlubmVyKTtcblxuICAgIFx0dGhpcy5jb2xsZWN0aW9uLmdldEZpcnN0UGFnZSgpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ3N1Ym1pc3Npb246Y2hhbmdlZCcsIHRoaXMub25TdWJtaXNzaW9uQ2hhbmdlZCk7XG4gICAgfVxuXG4gICAgb25BdHRhY2goKSB7XG4gICAgICAgIC8vYmluZCBzY3JvbGwgaGFuZGxlclxuICAgICAgICB0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIgPSAgXy50aHJvdHRsZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uV2luZG93U2Nyb2xsKCk7XG4gICAgICAgIH0sNTAwKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgb25CZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAvL3VuYmluZCBzY3JvbGwgaGFuZGxlclxuICAgICAgICAkKHdpbmRvdykub2ZmKFwic2Nyb2xsXCIsIHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIG1vZGVsIG9uIGRhdGEgY2hhbmdlXG4gICAgb25TdWJtaXNzaW9uQ2hhbmdlZChkYXRhKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuY29sbGVjdGlvbi5nZXQoZGF0YS5tb2RlbC5faWQpO1xuICAgICAgICBpZiAobW9kZWwpXG4gICAgICAgICAgICBtb2RlbC5mZXRjaCgpO1xuICAgIH1cblxuICAgIG9uV2luZG93U2Nyb2xsKCkge1xuXG4gICAgICAgIHZhciBzY3JvbGxQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIHZhciB0cmlnZ2VyUG9zID0gICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gJCh3aW5kb3cpLmhlaWdodCgpICogMS4yO1xuXG4gICAgICAgIGlmIChzY3JvbGxQb3MgPiB0cmlnZ2VyUG9zKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93U3Bpbm5lcigpIHtcbiAgICAgICAgdGhpcy4kKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kKCcjbG9hZC1tb3JlLWJ1dHRvbicpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgXG4gICAgaGlkZVNwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMuJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIGlmICghKHRoaXMubG9hZE1vcmUpKSB7XG4gICAgICAgICAgICB0aGlzLiQoJyNsb2FkLW1vcmUtYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBBZG1pblZpZXciXX0=