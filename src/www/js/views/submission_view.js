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

      return _possibleConstructorReturn(this, (SubmissionView.__proto__ || Object.getPrototypeOf(SubmissionView)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX3ZpZXcuanMiXSwibmFtZXMiOlsiU3VibWlzc2lvblZpZXciLCJjb21tZW50SW5wdXRSZWdpb24iLCJvcHRpb25zIiwibW9kZWwiLCJfaWQiLCJpZCIsImZldGNoIiwibGlzdGVuVG8iLCJvbk1vZGVsQ2hhbmdlZCIsIm9uU3VibWlzc2lvbkNoYW5nZWQiLCJkYXRhIiwiZ2V0IiwiaXNVbmRlZmluZWQiLCJjdXJyZW50VmlldyIsInJlbmRlciIsInNob3ciLCJzdWJtaXNzaW9uSWQiLCJzdGF0ZSIsImdldFN0YXRlIiwidGVtcGxhdGUiLCJmaWxlc1VybCIsImZpbGVzX3VybCIsImZvcm1hdERhdGUiLCJkYXRlIiwiZm9ybWF0IiwiZnJvbU5vdyIsImNyZWF0ZWRBdCIsImhhcyIsIkxheW91dFZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Ba0JNQSxjOzs7Ozs7Ozs7OztnQ0FPUTtBQUNULGVBQU87QUFDSEMsOEJBQW9CO0FBRGpCLFNBQVA7QUFHSDs7O2lDQWlCYUMsTyxFQUFTO0FBQ2hCLGFBQUtDLEtBQUwsR0FBYSwrQkFBb0IsRUFBRUMsS0FBS0YsUUFBUUcsRUFBZixFQUFwQixDQUFiO0FBQ0EsYUFBS0YsS0FBTCxDQUFXRyxLQUFYOztBQUVBO0FBQ0EsYUFBS0MsUUFBTCxDQUFjLEtBQUtKLEtBQW5CLEVBQXlCLFFBQXpCLEVBQWtDLEtBQUtLLGNBQXZDOztBQUVBO0FBQ0EsYUFBS0QsUUFBTCxxQkFBdUIsb0JBQXZCLEVBQTZDLEtBQUtFLG1CQUFsRDtBQUNIOzs7MENBRW1CQyxJLEVBQU07QUFDekIsWUFBSUEsS0FBS1AsS0FBTCxDQUFXQyxHQUFYLElBQWtCLEtBQUtELEtBQUwsQ0FBV1EsR0FBWCxDQUFlLEtBQWYsQ0FBdEIsRUFDQyxLQUFLUixLQUFMLENBQVdHLEtBQVg7QUFDRDs7O3VDQUVnQjtBQUNuQixZQUFJLHFCQUFFTSxXQUFGLENBQWMsS0FBS1gsa0JBQUwsQ0FBd0JZLFdBQXRDLENBQUosRUFBd0Q7QUFDdkQsZUFBS0MsTUFBTDtBQUNBLGVBQUtiLGtCQUFMLENBQXdCYyxJQUF4QixDQUE2QixpQ0FBcUIsRUFBRUMsY0FBZSxLQUFLYixLQUFMLENBQVdRLEdBQVgsQ0FBZSxLQUFmLENBQWpCLEVBQXJCLENBQTdCO0FBQ0EsU0FIRCxNQUdPO0FBQ04sY0FBSU0sUUFBUSxLQUFLaEIsa0JBQUwsQ0FBd0JZLFdBQXhCLENBQW9DSyxRQUFwQyxFQUFaO0FBQ0EsZUFBS0osTUFBTDtBQUNBLGVBQUtiLGtCQUFMLENBQXdCYyxJQUF4QixDQUE2QixpQ0FBcUIsRUFBRUMsY0FBZSxLQUFLYixLQUFMLENBQVdRLEdBQVgsQ0FBZSxLQUFmLENBQWpCLEVBQXdDTSxPQUFPQSxLQUEvQyxFQUFyQixDQUE3QjtBQUNBO0FBQ0U7OzswQkFsRGM7QUFBRSxlQUFPLHFCQUFFRSxRQUFGLDJCQUFQO0FBQTZCOzs7MEJBRTlCO0FBQUUsZUFBTyxZQUFQO0FBQXFCOzs7MEJBUWpCO0FBQ3hCLGVBQU87QUFDTkMsb0JBQVcsaUJBQU9DLFNBQVAsR0FBbUIsS0FBS2xCLEtBQUwsQ0FBV1EsR0FBWCxDQUFlLEtBQWYsQ0FBbkIsR0FBMkMsR0FEaEQ7QUFFR1csc0JBQVksb0JBQVNDLElBQVQsRUFBZTtBQUMxQixtQkFBTyxzQkFBT0EsSUFBUCxFQUFhQyxNQUFiLENBQW9CLEtBQXBCLENBQVA7QUFDQSxXQUpKO0FBS0dDLG1CQUFTLGlCQUFTRixJQUFULEVBQWU7QUFDdkIsbUJBQU8sc0JBQU9BLElBQVAsRUFBYUUsT0FBYixFQUFQO0FBQ0EsV0FQSjtBQVFHQyxxQkFBVyxLQUFLdkIsS0FBTCxDQUFXd0IsR0FBWCxDQUFlLFdBQWYsSUFBOEIsS0FBS3hCLEtBQUwsQ0FBV1EsR0FBWCxDQUFlLFdBQWYsQ0FBOUIsR0FBNEQ7QUFSMUUsU0FBUDtBQVVHOzs7O0lBeEJ3QixxQkFBV2lCLFU7O29CQXlEekI1QixjIiwiZmlsZSI6InN1Ym1pc3Npb25fdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNS0zMSAxNToyMDoyN1xuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCAnbW9tZW50X2VuX2diJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBDb21tZW50SW5wdXRWaWV3IGZyb20gJ3ZpZXdzL2NvbW1lbnRfaW5wdXRfdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbk1vZGVsIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX21vZGVsJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3N1Ym1pc3Npb25fdG1wbC5odG1sJztcblxuY2xhc3MgU3VibWlzc2lvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdzaW5nbGV2aWV3JyB9XG5cbiAgICByZWdpb25zKCkgeyBcbiAgICBcdHJldHVybiB7XG4gICAgICAgIFx0Y29tbWVudElucHV0UmVnaW9uOiAnI2NvbW1lbnQtaW5wdXQnXG5cdCAgICB9XG5cdH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGZpbGVzVXJsIDogQ29uZmlnLmZpbGVzX3VybCArIHRoaXMubW9kZWwuZ2V0KCdfaWQnKSArICcvJyxcbiAgICAgICAgICAgXHRmb3JtYXREYXRlOiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgIFx0XHRyZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCgnTExMJyk7XG4gICAgICAgICAgIFx0fSxcbiAgICAgICAgICAgXHRmcm9tTm93OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgIFx0XHRyZXR1cm4gbW9tZW50KGRhdGUpLmZyb21Ob3coKTsgXG4gICAgICAgICAgIFx0fSxcbiAgICAgICAgICAgXHRjcmVhdGVkQXQ6IHRoaXMubW9kZWwuaGFzKCdjcmVhdGVkQXQnKSA/IHRoaXMubW9kZWwuZ2V0KCdjcmVhdGVkQXQnKSA6IDBcblx0XHR9XG4gICAgfVxuXG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgU3VibWlzc2lvbk1vZGVsKHsgX2lkOiBvcHRpb25zLmlkIH0pO1xuICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgICAgIFxuICAgICAgICAvL2xpc3RlbiB0byBtb2RlbCBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCdjaGFuZ2UnLHRoaXMub25Nb2RlbENoYW5nZWQpO1xuXG4gICAgICAgIC8vbGlzdGVuIHRvIHNvY2tldCBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpjaGFuZ2VkJywgdGhpcy5vblN1Ym1pc3Npb25DaGFuZ2VkKTtcbiAgICB9XG5cbiAgICBvblN1Ym1pc3Npb25DaGFuZ2VkKGRhdGEpIHtcbiAgICBcdGlmIChkYXRhLm1vZGVsLl9pZCA9PSB0aGlzLm1vZGVsLmdldCgnX2lkJykpXG4gICAgXHRcdHRoaXMubW9kZWwuZmV0Y2goKTtcbiAgICB9XG5cbiAgICBvbk1vZGVsQ2hhbmdlZCgpIHtcblx0XHRpZiAoXy5pc1VuZGVmaW5lZCh0aGlzLmNvbW1lbnRJbnB1dFJlZ2lvbi5jdXJyZW50VmlldykpIHtcblx0XHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0XHR0aGlzLmNvbW1lbnRJbnB1dFJlZ2lvbi5zaG93KG5ldyBDb21tZW50SW5wdXRWaWV3KHsgc3VibWlzc2lvbklkIDogdGhpcy5tb2RlbC5nZXQoJ19pZCcpIH0pKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHN0YXRlID0gdGhpcy5jb21tZW50SW5wdXRSZWdpb24uY3VycmVudFZpZXcuZ2V0U3RhdGUoKTtcblx0XHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0XHR0aGlzLmNvbW1lbnRJbnB1dFJlZ2lvbi5zaG93KG5ldyBDb21tZW50SW5wdXRWaWV3KHsgc3VibWlzc2lvbklkIDogdGhpcy5tb2RlbC5nZXQoJ19pZCcpLCBzdGF0ZTogc3RhdGUgfSkpO1xuXHRcdH1cbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1Ym1pc3Npb25WaWV3Il19