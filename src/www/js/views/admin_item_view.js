define(['exports', 'marionette', 'underscore', 'config', 'moment', 'text!templates/admin_item_tmpl.html', 'models/comment_model', 'jquery'], function (exports, _marionette, _underscore, _config, _moment, _admin_item_tmpl, _comment_model, _jquery) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-05-31 14:57:31
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marionette2 = _interopRequireDefault(_marionette);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _config2 = _interopRequireDefault(_config);

  var _moment2 = _interopRequireDefault(_moment);

  var _admin_item_tmpl2 = _interopRequireDefault(_admin_item_tmpl);

  var _comment_model2 = _interopRequireDefault(_comment_model);

  var _jquery2 = _interopRequireDefault(_jquery);

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

  var AdminItemView = function (_Marionette$ItemView) {
    _inherits(AdminItemView, _Marionette$ItemView);

    function AdminItemView() {
      _classCallCheck(this, AdminItemView);

      return _possibleConstructorReturn(this, (AdminItemView.__proto__ || Object.getPrototypeOf(AdminItemView)).apply(this, arguments));
    }

    _createClass(AdminItemView, [{
      key: 'events',
      value: function events() {
        return {
          'click #admin-expand-button': 'onExpandButtonClick',
          'click #delete-comment-button': 'onDeleteCommentButtonClick',
          'click #delete-submission-button': 'onDeleteSubmissionButtonClick'
        };
      }
    }, {
      key: 'initialize',
      value: function initialize(options) {}
    }, {
      key: 'onExpandButtonClick',
      value: function onExpandButtonClick() {
        var _this = this;
        login_fun(function () {
          _this.$('#admin-comments-list').toggleClass('hidden');
        });
      }
    }, {
      key: 'onDeleteCommentButtonClick',
      value: function onDeleteCommentButtonClick(event) {
        login_fun(function () {
          var commentId = (0, _jquery2.default)(event.target).attr('data-id');
          var comment = new _comment_model2.default({
            _id: commentId
          });
          comment.destroy();
        });
      }
    }, {
      key: 'onDeleteSubmissionButtonClick',
      value: function onDeleteSubmissionButtonClick() {
        var _this = this;
        login_fun(function () {
          _this.model.destroy();
        });
      }
    }, {
      key: 'template',
      get: function get() {
        return _underscore2.default.template(_admin_item_tmpl2.default);
      }
    }, {
      key: 'className',
      get: function get() {
        return 'admin-item-view';
      }
    }, {
      key: 'templateHelpers',
      get: function get() {
        return {
          filesUrl: _config2.default.files_url + this.model.get('_id') + '/',
          formatDate: function formatDate(date) {
            return (0, _moment2.default)(date).format('LLL');
          },
          fromNow: function fromNow(date) {
            return (0, _moment2.default)(date).fromNow();
          },
          createdAt: this.model.has('createdAt') ? this.model.get('createdAt') : 0
        };
      }
    }, {
      key: 'modelEvents',
      get: function get() {
        return {
          'change': 'render'
        };
      }
    }]);

    return AdminItemView;
  }(_marionette2.default.ItemView);

  exports.default = AdminItemView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hZG1pbl9pdGVtX3ZpZXcuanMiXSwibmFtZXMiOlsibG9naW5fZnVuIiwiY2IiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZXJyb3IiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwic3VjY2VzcyIsInJlcyIsIkFkbWluSXRlbVZpZXciLCJvcHRpb25zIiwiX3RoaXMiLCIkIiwidG9nZ2xlQ2xhc3MiLCJldmVudCIsImNvbW1lbnRJZCIsInRhcmdldCIsImF0dHIiLCJjb21tZW50IiwiX2lkIiwiZGVzdHJveSIsIm1vZGVsIiwidGVtcGxhdGUiLCJmaWxlc1VybCIsImZpbGVzX3VybCIsImdldCIsImZvcm1hdERhdGUiLCJkYXRlIiwiZm9ybWF0IiwiZnJvbU5vdyIsImNyZWF0ZWRBdCIsImhhcyIsIkl0ZW1WaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxNQUFJQSxZQUFZLFNBQVpBLFNBQVksQ0FBU0MsRUFBVCxFQUFZO0FBQzNCLHFCQUFFQyxJQUFGLENBQU87QUFDTkMsY0FBUSxLQURGO0FBRU5DLFdBQUssaUJBQU8saUJBQVAsSUFBMEIsT0FGekI7QUFHTkMsYUFBTyxlQUFTQyxHQUFULEVBQWM7QUFDcEJDLGdCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQSxPQUxLO0FBTU5HLGVBQVMsU0FBU0EsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0I7QUFDOUJILGdCQUFRQyxHQUFSLENBQVksU0FBWjtBQUNBUDtBQUNBO0FBVEssS0FBUDtBQVdBLEdBWkQ7O01BY01VLGE7Ozs7Ozs7Ozs7OytCQTBCTztBQUNSLGVBQU87QUFDTix3Q0FBK0IscUJBRHpCO0FBRUEsMENBQWlDLDRCQUZqQztBQUdBLDZDQUFvQztBQUhwQyxTQUFQO0FBS0E7OztpQ0FHVUMsTyxFQUFTLENBRW5COzs7NENBRXFCO0FBQ3hCLFlBQUlDLFFBQVEsSUFBWjtBQUNBYixrQkFBVSxZQUFVO0FBQ25CYSxnQkFBTUMsQ0FBTixDQUFRLHNCQUFSLEVBQWdDQyxXQUFoQyxDQUE0QyxRQUE1QztBQUNBLFNBRkQ7QUFHRzs7O2lEQUUwQkMsSyxFQUFPO0FBQ3BDaEIsa0JBQVUsWUFBVTtBQUNuQixjQUFJaUIsWUFBWSxzQkFBRUQsTUFBTUUsTUFBUixFQUFnQkMsSUFBaEIsQ0FBcUIsU0FBckIsQ0FBaEI7QUFDQSxjQUFJQyxVQUFVLDRCQUFpQjtBQUM5QkMsaUJBQU1KO0FBRHdCLFdBQWpCLENBQWQ7QUFHQUcsa0JBQVFFLE9BQVI7QUFDQSxTQU5EO0FBT0c7OztzREFFK0I7QUFDbEMsWUFBSVQsUUFBUSxJQUFaO0FBQ0FiLGtCQUFVLFlBQVU7QUFDbkJhLGdCQUFNVSxLQUFOLENBQVlELE9BQVo7QUFDQSxTQUZEO0FBR0c7OzswQkExRGM7QUFBRSxlQUFPLHFCQUFFRSxRQUFGLDJCQUFQO0FBQTZCOzs7MEJBRTlCO0FBQUUsZUFBTyxpQkFBUDtBQUEwQjs7OzBCQUV0QjtBQUN4QixlQUFPO0FBQ05DLG9CQUFXLGlCQUFPQyxTQUFQLEdBQW1CLEtBQUtILEtBQUwsQ0FBV0ksR0FBWCxDQUFlLEtBQWYsQ0FBbkIsR0FBMkMsR0FEaEQ7QUFFR0Msc0JBQVksb0JBQVNDLElBQVQsRUFBZTtBQUMxQixtQkFBTyxzQkFBT0EsSUFBUCxFQUFhQyxNQUFiLENBQW9CLEtBQXBCLENBQVA7QUFDQSxXQUpKO0FBS0dDLG1CQUFTLGlCQUFTRixJQUFULEVBQWU7QUFDdkIsbUJBQU8sc0JBQU9BLElBQVAsRUFBYUUsT0FBYixFQUFQO0FBQ0EsV0FQSjtBQVFHQyxxQkFBVyxLQUFLVCxLQUFMLENBQVdVLEdBQVgsQ0FBZSxXQUFmLElBQThCLEtBQUtWLEtBQUwsQ0FBV0ksR0FBWCxDQUFlLFdBQWYsQ0FBOUIsR0FBNEQ7QUFSMUUsU0FBUDtBQVVHOzs7MEJBRWlCO0FBQ2QsZUFBTztBQUNILG9CQUFXO0FBRFIsU0FBUDtBQUdIOzs7O0lBeEJ1QixxQkFBV08sUTs7b0JBZ0V4QnZCLGEiLCJmaWxlIjoiYWRtaW5faXRlbV92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA1LTMxIDE0OjU3OjMxXG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2FkbWluX2l0ZW1fdG1wbC5odG1sJztcbmltcG9ydCBDb21tZW50TW9kZWwgZnJvbSAnbW9kZWxzL2NvbW1lbnRfbW9kZWwnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxudmFyIGxvZ2luX2Z1biA9IGZ1bmN0aW9uKGNiKXtcblx0JC5hamF4KHtcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdHVybDogQ29uZmlnWyd3ZWJfc2VydmljZV91cmwnXStcImFkbWluXCIsXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHR9LFxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MocmVzKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnc3VjY2VzcycpO1xuXHRcdFx0Y2IoKTtcblx0XHR9XG5cdH0pO1xufVxuXG5jbGFzcyBBZG1pbkl0ZW1WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2FkbWluLWl0ZW0tdmlldycgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZmlsZXNVcmwgOiBDb25maWcuZmlsZXNfdXJsICsgdGhpcy5tb2RlbC5nZXQoJ19pZCcpICsgJy8nLFxuICAgICAgICAgICBcdGZvcm1hdERhdGU6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICAgXHRcdHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KCdMTEwnKTtcbiAgICAgICAgICAgXHR9LFxuICAgICAgICAgICBcdGZyb21Ob3c6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgICAgXHRcdHJldHVybiBtb21lbnQoZGF0ZSkuZnJvbU5vdygpOyBcbiAgICAgICAgICAgXHR9LFxuICAgICAgICAgICBcdGNyZWF0ZWRBdDogdGhpcy5tb2RlbC5oYXMoJ2NyZWF0ZWRBdCcpID8gdGhpcy5tb2RlbC5nZXQoJ2NyZWF0ZWRBdCcpIDogMFxuXHRcdH1cbiAgICB9XG5cbiAgICBnZXQgbW9kZWxFdmVudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2hhbmdlJyA6ICdyZW5kZXInXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHQnY2xpY2sgI2FkbWluLWV4cGFuZC1idXR0b24nIDogJ29uRXhwYW5kQnV0dG9uQ2xpY2snLFxuICAgICAgICAgICAgJ2NsaWNrICNkZWxldGUtY29tbWVudC1idXR0b24nIDogJ29uRGVsZXRlQ29tbWVudEJ1dHRvbkNsaWNrJyxcbiAgICAgICAgICAgICdjbGljayAjZGVsZXRlLXN1Ym1pc3Npb24tYnV0dG9uJyA6ICdvbkRlbGV0ZVN1Ym1pc3Npb25CdXR0b25DbGljaycsXG4gICAgXHR9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgfVxuXG4gICAgb25FeHBhbmRCdXR0b25DbGljaygpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdGxvZ2luX2Z1bihmdW5jdGlvbigpe1xuXHRcdFx0X3RoaXMuJCgnI2FkbWluLWNvbW1lbnRzLWxpc3QnKS50b2dnbGVDbGFzcygnaGlkZGVuJyk7XG5cdFx0fSk7XG4gICAgfVxuXG4gICAgb25EZWxldGVDb21tZW50QnV0dG9uQ2xpY2soZXZlbnQpIHtcblx0XHRsb2dpbl9mdW4oZnVuY3Rpb24oKXtcblx0XHRcdHZhciBjb21tZW50SWQgPSAkKGV2ZW50LnRhcmdldCkuYXR0cignZGF0YS1pZCcpXG5cdFx0XHR2YXIgY29tbWVudCA9IG5ldyBDb21tZW50TW9kZWwoe1xuXHRcdFx0XHRfaWQgOiBjb21tZW50SWRcblx0XHRcdH0pO1xuXHRcdFx0Y29tbWVudC5kZXN0cm95KCk7XG5cdFx0fSk7XG4gICAgfVxuXG4gICAgb25EZWxldGVTdWJtaXNzaW9uQnV0dG9uQ2xpY2soKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHRsb2dpbl9mdW4oZnVuY3Rpb24oKXtcblx0XHRcdF90aGlzLm1vZGVsLmRlc3Ryb3koKTtcblx0XHR9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFkbWluSXRlbVZpZXciXX0=