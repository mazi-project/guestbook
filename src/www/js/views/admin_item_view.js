define(['exports', 'marionette', 'underscore', 'config', 'moment', 'text!templates/admin_item_tmpl.html', 'models/comment_model'], function (exports, _marionette, _underscore, _config, _moment, _admin_item_tmpl, _comment_model) {
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

  var AdminItemView = function (_Marionette$ItemView) {
    _inherits(AdminItemView, _Marionette$ItemView);

    function AdminItemView() {
      _classCallCheck(this, AdminItemView);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AdminItemView).apply(this, arguments));
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
        this.$('#admin-comments-list').toggleClass('hidden');
      }
    }, {
      key: 'onDeleteCommentButtonClick',
      value: function onDeleteCommentButtonClick(event) {

        var commentId = $(event.target).attr('data-id');
        var comment = new _comment_model2.default({
          _id: commentId
        });
        comment.destroy();
      }
    }, {
      key: 'onDeleteSubmissionButtonClick',
      value: function onDeleteSubmissionButtonClick() {
        this.model.destroy();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9hZG1pbl9pdGVtX3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BZ0JNLGE7Ozs7Ozs7Ozs7OytCQTBCTztBQUNSLGVBQU87QUFDTix3Q0FBK0IscUJBRHpCO0FBRUEsMENBQWlDLDRCQUZqQztBQUdBLDZDQUFvQztBQUhwQyxTQUFQO0FBS0E7OztpQ0FHVSxPLEVBQVMsQ0FFbkI7Ozs0Q0FFcUI7QUFDckIsYUFBSyxDQUFMLENBQU8sc0JBQVAsRUFBK0IsV0FBL0IsQ0FBMkMsUUFBM0M7QUFDQTs7O2lEQUUwQixLLEVBQU87O0FBRWhDLFlBQUksWUFBWSxFQUFFLE1BQU0sTUFBUixFQUFnQixJQUFoQixDQUFxQixTQUFyQixDQUFoQjtBQUNBLFlBQUksVUFBVSw0QkFBaUI7QUFDN0IsZUFBTTtBQUR1QixTQUFqQixDQUFkO0FBR0EsZ0JBQVEsT0FBUjtBQUNEOzs7c0RBRStCO0FBQzVCLGFBQUssS0FBTCxDQUFXLE9BQVg7QUFDSDs7OzBCQW5EYztBQUFFLGVBQU8scUJBQUUsUUFBRiwyQkFBUDtBQUE2Qjs7OzBCQUU5QjtBQUFFLGVBQU8saUJBQVA7QUFBMEI7OzswQkFFdEI7QUFDeEIsZUFBTztBQUNOLG9CQUFXLGlCQUFPLFNBQVAsR0FBbUIsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBbkIsR0FBMkMsR0FEaEQ7QUFFRyxzQkFBWSxvQkFBUyxJQUFULEVBQWU7QUFDMUIsbUJBQU8sc0JBQU8sSUFBUCxFQUFhLE1BQWIsQ0FBb0IsS0FBcEIsQ0FBUDtBQUNBLFdBSko7QUFLRyxtQkFBUyxpQkFBUyxJQUFULEVBQWU7QUFDdkIsbUJBQU8sc0JBQU8sSUFBUCxFQUFhLE9BQWIsRUFBUDtBQUNBLFdBUEo7QUFRRyxxQkFBVyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixJQUE4QixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixDQUE5QixHQUE0RDtBQVIxRSxTQUFQO0FBVUc7OzswQkFFaUI7QUFDZCxlQUFPO0FBQ0gsb0JBQVc7QUFEUixTQUFQO0FBR0g7Ozs7SUF4QnVCLHFCQUFXLFE7O29CQTBEeEIsYSIsImZpbGUiOiJhZG1pbl9pdGVtX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDUtMzEgMTQ6NTc6MzFcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvYWRtaW5faXRlbV90bXBsLmh0bWwnO1xuaW1wb3J0IENvbW1lbnRNb2RlbCBmcm9tICdtb2RlbHMvY29tbWVudF9tb2RlbCc7XG5cbmNsYXNzIEFkbWluSXRlbVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnYWRtaW4taXRlbS12aWV3JyB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRmaWxlc1VybCA6IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLycsXG4gICAgICAgICAgIFx0Zm9ybWF0RGF0ZTogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICBcdFx0cmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ0xMTCcpO1xuICAgICAgICAgICBcdH0sXG4gICAgICAgICAgIFx0ZnJvbU5vdzogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICBcdFx0cmV0dXJuIG1vbWVudChkYXRlKS5mcm9tTm93KCk7IFxuICAgICAgICAgICBcdH0sXG4gICAgICAgICAgIFx0Y3JlYXRlZEF0OiB0aGlzLm1vZGVsLmhhcygnY3JlYXRlZEF0JykgPyB0aGlzLm1vZGVsLmdldCgnY3JlYXRlZEF0JykgOiAwXG5cdFx0fVxuICAgIH1cblxuICAgIGdldCBtb2RlbEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjaGFuZ2UnIDogJ3JlbmRlcidcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdCdjbGljayAjYWRtaW4tZXhwYW5kLWJ1dHRvbicgOiAnb25FeHBhbmRCdXR0b25DbGljaycsXG4gICAgICAgICAgICAnY2xpY2sgI2RlbGV0ZS1jb21tZW50LWJ1dHRvbicgOiAnb25EZWxldGVDb21tZW50QnV0dG9uQ2xpY2snLFxuICAgICAgICAgICAgJ2NsaWNrICNkZWxldGUtc3VibWlzc2lvbi1idXR0b24nIDogJ29uRGVsZXRlU3VibWlzc2lvbkJ1dHRvbkNsaWNrJyxcbiAgICBcdH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICB9XG5cbiAgICBvbkV4cGFuZEJ1dHRvbkNsaWNrKCkge1xuICAgIFx0dGhpcy4kKCcjYWRtaW4tY29tbWVudHMtbGlzdCcpLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBvbkRlbGV0ZUNvbW1lbnRCdXR0b25DbGljayhldmVudCkge1xuXG4gICAgICB2YXIgY29tbWVudElkID0gJChldmVudC50YXJnZXQpLmF0dHIoJ2RhdGEtaWQnKVxuICAgICAgdmFyIGNvbW1lbnQgPSBuZXcgQ29tbWVudE1vZGVsKHtcbiAgICAgICAgX2lkIDogY29tbWVudElkXG4gICAgICB9KTtcbiAgICAgIGNvbW1lbnQuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIG9uRGVsZXRlU3VibWlzc2lvbkJ1dHRvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLm1vZGVsLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFkbWluSXRlbVZpZXciXX0=