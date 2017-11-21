define(['exports', 'backbone', 'marionette', 'jquery', 'underscore', 'models/submission_collection', 'views/admin_item_view', 'text!templates/admin_tmpl.html', 'config'], function (exports, _backbone, _marionette, _jquery, _underscore, _submission_collection, _admin_item_view, _admin_tmpl, _config) {
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

    var _config2 = _interopRequireDefault(_config);

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

    var login_fun = function login_fun(cb) {
        _jquery2.default.ajax({
            method: 'GET',
            url: _config2.default['web_service_url'] + "admin",
            error: function error(err) {
                console.log(err);
            },
            success: function success(res) {
                console.log('success');
                cb();
            }
        });
    };

    var AdminView = function (_Marionette$Composite) {
        _inherits(AdminView, _Marionette$Composite);

        function AdminView() {
            _classCallCheck(this, AdminView);

            return _possibleConstructorReturn(this, (AdminView.__proto__ || Object.getPrototypeOf(AdminView)).apply(this, arguments));
        }

        _createClass(AdminView, [{
            key: 'initialize',
            value: function initialize(options) {
                login_fun(); //Auth

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hZG1pbl92aWV3LmpzIl0sIm5hbWVzIjpbImxvZ2luX2Z1biIsImNiIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImVycm9yIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInN1Y2Nlc3MiLCJyZXMiLCJBZG1pblZpZXciLCJvcHRpb25zIiwiY29sbGVjdGlvbiIsImxpc3RlblRvIiwiaGlkZVNwaW5uZXIiLCJzaG93U3Bpbm5lciIsImdldEZpcnN0UGFnZSIsIm9uU3VibWlzc2lvbkNoYW5nZWQiLCJ3aW5vd1Njcm9sbExpc3RlbmVyIiwidGhyb3R0bGUiLCJvbldpbmRvd1Njcm9sbCIsIndpbmRvdyIsIm9uIiwib2ZmIiwiZGF0YSIsIm1vZGVsIiwiZ2V0IiwiX2lkIiwiZmV0Y2giLCJzY3JvbGxQb3MiLCJzY3JvbGxUb3AiLCJ0cmlnZ2VyUG9zIiwiZG9jdW1lbnQiLCJoZWlnaHQiLCJnZXROZXh0UGFnZSIsImZldGNoUGFyYW1zIiwiJCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJsb2FkTW9yZSIsInRlbXBsYXRlIiwiQ29tcG9zaXRlVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsUUFBSUEsWUFBWSxTQUFaQSxTQUFZLENBQVNDLEVBQVQsRUFBWTtBQUMzQix5QkFBRUMsSUFBRixDQUFPO0FBQ05DLG9CQUFRLEtBREY7QUFFTkMsaUJBQUssaUJBQU8saUJBQVAsSUFBMEIsT0FGekI7QUFHTkMsbUJBQU8sZUFBU0MsR0FBVCxFQUFjO0FBQ3BCQyx3QkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0EsYUFMSztBQU1ORyxxQkFBUyxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUM5Qkgsd0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0FQO0FBQ0E7QUFUSyxTQUFQO0FBV0EsS0FaRDs7UUFhTVUsUzs7Ozs7Ozs7Ozs7dUNBWVNDLE8sRUFBUztBQUN0QlosNEJBRHNCLENBQ1Q7O0FBRWIscUJBQUthLFVBQUwsR0FBa0IscUNBQWxCOztBQUVBLHFCQUFLQyxRQUFMLENBQWMsS0FBS0QsVUFBbkIsRUFBOEIsTUFBOUIsRUFBcUMsS0FBS0UsV0FBMUM7QUFDQSxxQkFBS0QsUUFBTCxDQUFjLEtBQUtELFVBQW5CLEVBQThCLFVBQTlCLEVBQXlDLEtBQUtHLFdBQTlDOztBQUVBLHFCQUFLSCxVQUFMLENBQWdCSSxZQUFoQjs7QUFFQSxxQkFBS0gsUUFBTCxxQkFBdUIsb0JBQXZCLEVBQTZDLEtBQUtJLG1CQUFsRDtBQUNHOzs7dUNBRVU7QUFBQTs7QUFDUDtBQUNBLHFCQUFLQyxtQkFBTCxHQUE0QixxQkFBRUMsUUFBRixDQUFXLFlBQU07QUFDekMsMkJBQUtDLGNBQUw7QUFDSCxpQkFGMkIsRUFFMUIsR0FGMEIsQ0FBNUI7QUFHQSxzQ0FBRUMsTUFBRixFQUFVQyxFQUFWLENBQWEsUUFBYixFQUFzQixLQUFLSixtQkFBM0I7QUFDSDs7OzhDQUVpQjtBQUNkO0FBQ0Esc0NBQUVHLE1BQUYsRUFBVUUsR0FBVixDQUFjLFFBQWQsRUFBd0IsS0FBS0wsbUJBQTdCO0FBQ0g7OztnREFHbUJNLEksRUFBTTtBQUN0QixvQkFBSUMsUUFBUSxLQUFLYixVQUFMLENBQWdCYyxHQUFoQixDQUFvQkYsS0FBS0MsS0FBTCxDQUFXRSxHQUEvQixDQUFaO0FBQ0Esb0JBQUlGLEtBQUosRUFDSUEsTUFBTUcsS0FBTjtBQUNQOzs7NkNBRWdCOztBQUViLG9CQUFJQyxZQUFZLHNCQUFFUixNQUFGLEVBQVVTLFNBQVYsRUFBaEI7QUFDQSxvQkFBSUMsYUFBYyxzQkFBRUMsUUFBRixFQUFZQyxNQUFaLEtBQXVCLHNCQUFFWixNQUFGLEVBQVVZLE1BQVYsS0FBcUIsR0FBOUQ7O0FBRUEsb0JBQUlKLFlBQVlFLFVBQWhCLEVBQTRCO0FBQ3hCLHlCQUFLbkIsVUFBTCxDQUFnQnNCLFdBQWhCLENBQTRCLEtBQUtDLFdBQWpDO0FBQ0g7QUFDSjs7OzBDQUVhO0FBQ1YscUJBQUtDLENBQUwsQ0FBTyxVQUFQLEVBQW1CQyxXQUFuQixDQUErQixRQUEvQjtBQUNBLHFCQUFLRCxDQUFMLENBQU8sbUJBQVAsRUFBNEJFLFFBQTVCLENBQXFDLFFBQXJDO0FBQ0g7OzswQ0FFYTtBQUNWLHFCQUFLRixDQUFMLENBQU8sVUFBUCxFQUFtQkUsUUFBbkIsQ0FBNEIsUUFBNUI7QUFDQSxvQkFBSSxDQUFFLEtBQUtDLFFBQVgsRUFBc0I7QUFDbEIseUJBQUtILENBQUwsQ0FBTyxtQkFBUCxFQUE0QkMsV0FBNUIsQ0FBd0MsUUFBeEM7QUFDSDtBQUNKOzs7Z0NBOURjO0FBQUUsdUJBQU8scUJBQUVHLFFBQUYsc0JBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxXQUFQO0FBQW9COzs7Z0NBRWI7QUFBRSx1QkFBTyxrQkFBUDtBQUEyQjs7O2dDQUV0QztBQUFFO0FBQXNCOzs7O01BVHBCLHFCQUFXQyxhOztzQkFxRXBCL0IsUyIsImZpbGUiOiJhZG1pbl92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA1LTMxIDE1OjIzOjUzXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgU3VibWlzc2lvbkNvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL3N1Ym1pc3Npb25fY29sbGVjdGlvbic7XG5pbXBvcnQgQWRtaW5JdGVtVmlldyBmcm9tICd2aWV3cy9hZG1pbl9pdGVtX3ZpZXcnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2FkbWluX3RtcGwuaHRtbCc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZydcblxuXG52YXIgbG9naW5fZnVuID0gZnVuY3Rpb24oY2Ipe1xuXHQkLmFqYXgoe1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0dXJsOiBDb25maWdbJ3dlYl9zZXJ2aWNlX3VybCddK1wiYWRtaW5cIixcblx0XHRlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdH0sXG5cdFx0c3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXMpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdzdWNjZXNzJyk7XG5cdFx0XHRjYigpO1xuXHRcdH1cblx0fSk7XG59XG5jbGFzcyBBZG1pblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdhZG1pbnZpZXcnIH1cblxuICAgIGdldCBjaGlsZFZpZXdDb250YWluZXIoKSB7IHJldHVybiAnI3N1Ym1pc3Npb24tbGlzdCcgfVxuXG4gICAgZ2V0IGNoaWxkVmlldygpIHsgcmV0dXJuIEFkbWluSXRlbVZpZXcgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXHRcdGxvZ2luX2Z1bigpOyAvL0F1dGhcblxuXHRcdHRoaXMuY29sbGVjdGlvbiA9IG5ldyBTdWJtaXNzaW9uQ29sbGVjdGlvbigpO1xuXG5cdFx0dGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ3N5bmMnLHRoaXMuaGlkZVNwaW5uZXIpO1xuXHRcdHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdmZXRjaGluZycsdGhpcy5zaG93U3Bpbm5lcik7XG5cblx0XHR0aGlzLmNvbGxlY3Rpb24uZ2V0Rmlyc3RQYWdlKCk7XG5cblx0XHR0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOmNoYW5nZWQnLCB0aGlzLm9uU3VibWlzc2lvbkNoYW5nZWQpO1xuICAgIH1cblxuICAgIG9uQXR0YWNoKCkge1xuICAgICAgICAvL2JpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyID0gIF8udGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbldpbmRvd1Njcm9sbCgpO1xuICAgICAgICB9LDUwMCk7XG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJyx0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIG9uQmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgLy91bmJpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgJCh3aW5kb3cpLm9mZihcInNjcm9sbFwiLCB0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBtb2RlbCBvbiBkYXRhIGNoYW5nZVxuICAgIG9uU3VibWlzc2lvbkNoYW5nZWQoZGF0YSkge1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmNvbGxlY3Rpb24uZ2V0KGRhdGEubW9kZWwuX2lkKTtcbiAgICAgICAgaWYgKG1vZGVsKVxuICAgICAgICAgICAgbW9kZWwuZmV0Y2goKTtcbiAgICB9XG5cbiAgICBvbldpbmRvd1Njcm9sbCgpIHtcblxuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgdHJpZ2dlclBvcyA9ICAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKSAqIDEuMjtcblxuICAgICAgICBpZiAoc2Nyb2xsUG9zID4gdHJpZ2dlclBvcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldE5leHRQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1NwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMuJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJCgnI2xvYWQtbW9yZS1idXR0b24nKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICAgIFxuICAgIGhpZGVTcGlubmVyKCkge1xuICAgICAgICB0aGlzLiQoJy5zcGlubmVyJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICBpZiAoISh0aGlzLmxvYWRNb3JlKSkge1xuICAgICAgICAgICAgdGhpcy4kKCcjbG9hZC1tb3JlLWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWRtaW5WaWV3Il19