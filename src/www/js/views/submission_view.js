define(['exports', 'backbone', 'marionette', 'underscore', 'moment', 'config', 'views/comment_input_view', 'models/submission_model', 'text!templates/submission_tmpl.html', 'moment_en_gb'], function (exports, _backbone, _marionette, _underscore, _moment, _config, _comment_input_view, _submission_model, _submission_tmpl) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-05-31 15:20:27
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _backbone2 = _interopRequireDefault(_backbone);

  var _marionette2 = _interopRequireDefault(_marionette);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _moment2 = _interopRequireDefault(_moment);

  var _config2 = _interopRequireDefault(_config);

  var _comment_input_view2 = _interopRequireDefault(_comment_input_view);

  var _submission_model2 = _interopRequireDefault(_submission_model);

  var _submission_tmpl2 = _interopRequireDefault(_submission_tmpl);

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

  var SubmissionView = function (_Marionette$LayoutVie) {
    _inherits(SubmissionView, _Marionette$LayoutVie);

    function SubmissionView() {
      _classCallCheck(this, SubmissionView);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionView).apply(this, arguments));
    }

    _createClass(SubmissionView, [{
      key: 'regions',
      value: function regions() {
        return {
          commentInputRegion: '#comment-input'
        };
      }
    }, {
      key: 'initialize',
      value: function initialize(options) {
        this.model = new _submission_model2.default({ _id: options.id });
        this.model.fetch();

        //listen to model events
        this.listenTo(this.model, 'change', this.onModelChanged);

        //listen to socket events
        this.listenTo(_backbone2.default, 'submission:changed', this.onSubmissionChanged);
      }
    }, {
      key: 'onSubmissionChanged',
      value: function onSubmissionChanged(data) {
        if (data.model._id == this.model.get('_id')) this.model.fetch();
      }
    }, {
      key: 'onModelChanged',
      value: function onModelChanged() {
        if (_underscore2.default.isUndefined(this.commentInputRegion.currentView)) {
          this.render();
          this.commentInputRegion.show(new _comment_input_view2.default({ submissionId: this.model.get('_id') }));
        } else {
          var state = this.commentInputRegion.currentView.getState();
          this.render();
          this.commentInputRegion.show(new _comment_input_view2.default({ submissionId: this.model.get('_id'), state: state }));
        }
      }
    }, {
      key: 'template',
      get: function get() {
        return _underscore2.default.template(_submission_tmpl2.default);
      }
    }, {
      key: 'className',
      get: function get() {
        return 'singleview';
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
    }]);

    return SubmissionView;
  }(_marionette2.default.LayoutView);

  exports.default = SubmissionView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9CTSxjOzs7Ozs7Ozs7OztnQ0FPUTtBQUNULGVBQU87QUFDSCw4QkFBb0I7QUFEakIsU0FBUDtBQUdIOzs7aUNBaUJhLE8sRUFBUztBQUNoQixhQUFLLEtBQUwsR0FBYSwrQkFBb0IsRUFBRSxLQUFLLFFBQVEsRUFBZixFQUFwQixDQUFiO0FBQ0EsYUFBSyxLQUFMLENBQVcsS0FBWDs7O0FBR0EsYUFBSyxRQUFMLENBQWMsS0FBSyxLQUFuQixFQUF5QixRQUF6QixFQUFrQyxLQUFLLGNBQXZDOzs7QUFHQSxhQUFLLFFBQUwscUJBQXVCLG9CQUF2QixFQUE2QyxLQUFLLG1CQUFsRDtBQUNIOzs7MENBRW1CLEksRUFBTTtBQUN6QixZQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsSUFBa0IsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBdEIsRUFDQyxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ0Q7Ozt1Q0FFZ0I7QUFDbkIsWUFBSSxxQkFBRSxXQUFGLENBQWMsS0FBSyxrQkFBTCxDQUF3QixXQUF0QyxDQUFKLEVBQXdEO0FBQ3ZELGVBQUssTUFBTDtBQUNBLGVBQUssa0JBQUwsQ0FBd0IsSUFBeEIsQ0FBNkIsaUNBQXFCLEVBQUUsY0FBZSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixDQUFqQixFQUFyQixDQUE3QjtBQUNBLFNBSEQsTUFHTztBQUNOLGNBQUksUUFBUSxLQUFLLGtCQUFMLENBQXdCLFdBQXhCLENBQW9DLFFBQXBDLEVBQVo7QUFDQSxlQUFLLE1BQUw7QUFDQSxlQUFLLGtCQUFMLENBQXdCLElBQXhCLENBQTZCLGlDQUFxQixFQUFFLGNBQWUsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBakIsRUFBd0MsT0FBTyxLQUEvQyxFQUFyQixDQUE3QjtBQUNBO0FBQ0U7OzswQkFsRGM7QUFBRSxlQUFPLHFCQUFFLFFBQUYsMkJBQVA7QUFBNkI7OzswQkFFOUI7QUFBRSxlQUFPLFlBQVA7QUFBcUI7OzswQkFRakI7QUFDeEIsZUFBTztBQUNOLG9CQUFXLGlCQUFPLFNBQVAsR0FBbUIsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBbkIsR0FBMkMsR0FEaEQ7QUFFRyxzQkFBWSxvQkFBUyxJQUFULEVBQWU7QUFDMUIsbUJBQU8sc0JBQU8sSUFBUCxFQUFhLE1BQWIsQ0FBb0IsS0FBcEIsQ0FBUDtBQUNBLFdBSko7QUFLRyxtQkFBUyxpQkFBUyxJQUFULEVBQWU7QUFDdkIsbUJBQU8sc0JBQU8sSUFBUCxFQUFhLE9BQWIsRUFBUDtBQUNBLFdBUEo7QUFRRyxxQkFBVyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixJQUE4QixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsV0FBZixDQUE5QixHQUE0RDtBQVIxRSxTQUFQO0FBVUc7Ozs7SUF4QndCLHFCQUFXLFU7O29CQXlEekIsYyIsImZpbGUiOiJzdWJtaXNzaW9uX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDUtMzEgMTU6MjA6MjdcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgJ21vbWVudF9lbl9nYic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgQ29tbWVudElucHV0VmlldyBmcm9tICd2aWV3cy9jb21tZW50X2lucHV0X3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25Nb2RlbCBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9tb2RlbCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9zdWJtaXNzaW9uX3RtcGwuaHRtbCc7XG5cbmNsYXNzIFN1Ym1pc3Npb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnc2luZ2xldmlldycgfVxuXG4gICAgcmVnaW9ucygpIHsgXG4gICAgXHRyZXR1cm4ge1xuICAgICAgICBcdGNvbW1lbnRJbnB1dFJlZ2lvbjogJyNjb21tZW50LWlucHV0J1xuXHQgICAgfVxuXHR9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRmaWxlc1VybCA6IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLycsXG4gICAgICAgICAgIFx0Zm9ybWF0RGF0ZTogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICBcdFx0cmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ0xMTCcpO1xuICAgICAgICAgICBcdH0sXG4gICAgICAgICAgIFx0ZnJvbU5vdzogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICBcdFx0cmV0dXJuIG1vbWVudChkYXRlKS5mcm9tTm93KCk7IFxuICAgICAgICAgICBcdH0sXG4gICAgICAgICAgIFx0Y3JlYXRlZEF0OiB0aGlzLm1vZGVsLmhhcygnY3JlYXRlZEF0JykgPyB0aGlzLm1vZGVsLmdldCgnY3JlYXRlZEF0JykgOiAwXG5cdFx0fVxuICAgIH1cblxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IFN1Ym1pc3Npb25Nb2RlbCh7IF9pZDogb3B0aW9ucy5pZCB9KTtcbiAgICAgICAgdGhpcy5tb2RlbC5mZXRjaCgpO1xuICAgICAgICBcbiAgICAgICAgLy9saXN0ZW4gdG8gbW9kZWwgZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwnY2hhbmdlJyx0aGlzLm9uTW9kZWxDaGFuZ2VkKTtcblxuICAgICAgICAvL2xpc3RlbiB0byBzb2NrZXQgZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ3N1Ym1pc3Npb246Y2hhbmdlZCcsIHRoaXMub25TdWJtaXNzaW9uQ2hhbmdlZCk7XG4gICAgfVxuXG4gICAgb25TdWJtaXNzaW9uQ2hhbmdlZChkYXRhKSB7XG4gICAgXHRpZiAoZGF0YS5tb2RlbC5faWQgPT0gdGhpcy5tb2RlbC5nZXQoJ19pZCcpKVxuICAgIFx0XHR0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgfVxuXG4gICAgb25Nb2RlbENoYW5nZWQoKSB7XG5cdFx0aWYgKF8uaXNVbmRlZmluZWQodGhpcy5jb21tZW50SW5wdXRSZWdpb24uY3VycmVudFZpZXcpKSB7XG5cdFx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFx0dGhpcy5jb21tZW50SW5wdXRSZWdpb24uc2hvdyhuZXcgQ29tbWVudElucHV0Vmlldyh7IHN1Ym1pc3Npb25JZCA6IHRoaXMubW9kZWwuZ2V0KCdfaWQnKSB9KSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBzdGF0ZSA9IHRoaXMuY29tbWVudElucHV0UmVnaW9uLmN1cnJlbnRWaWV3LmdldFN0YXRlKCk7XG5cdFx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdFx0dGhpcy5jb21tZW50SW5wdXRSZWdpb24uc2hvdyhuZXcgQ29tbWVudElucHV0Vmlldyh7IHN1Ym1pc3Npb25JZCA6IHRoaXMubW9kZWwuZ2V0KCdfaWQnKSwgc3RhdGU6IHN0YXRlIH0pKTtcblx0XHR9XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uVmlldyJdfQ==