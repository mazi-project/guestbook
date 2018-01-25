define(['exports', 'marionette', 'backbone', 'underscore', 'models/submission_model', 'config', 'text!templates/submission_input_tmpl.html', 'jquery', 'iframeTransport'], function (exports, _marionette, _backbone, _underscore, _submission_model, _config, _submission_input_tmpl) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-07-01 19:56:41
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _marionette2 = _interopRequireDefault(_marionette);

  var _backbone2 = _interopRequireDefault(_backbone);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _submission_model2 = _interopRequireDefault(_submission_model);

  var _config2 = _interopRequireDefault(_config);

  var _submission_input_tmpl2 = _interopRequireDefault(_submission_input_tmpl);

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

  var SubmissionInputView = function (_Marionette$ItemView) {
    _inherits(SubmissionInputView, _Marionette$ItemView);

    function SubmissionInputView() {
      _classCallCheck(this, SubmissionInputView);

      return _possibleConstructorReturn(this, (SubmissionInputView.__proto__ || Object.getPrototypeOf(SubmissionInputView)).apply(this, arguments));
    }

    _createClass(SubmissionInputView, [{
      key: 'events',
      value: function events() {
        var events = {
          'click #submit-button': 'onSubmitButtonClick',
          'change #new-submission-file': 'onFileInputChanged',
          'click #tag-dropdown': 'onTagDropdownClick',
          'click .tag-dropdown-list': 'preventPropagation',
          'mouseleave .tag-dropdown-list': 'onLeaveDropdown'
        };
        if (!_config2.default.auto_expand_comment) {
          events['click .submission-headline'] = 'focus';
          events['mouseleave'] = 'unfocus';
        }
        return events;
      }
    }, {
      key: 'initialize',
      value: function initialize(options) {
        var _this2 = this;

        $.ajax({
          method: 'GET',
          url: 'api/submissions/options',
          error: function error(res) {
            _this2.$('span.size-info').text(5); //default value
          },
          success: function success(res) {
            _this2.$('span.size-info').text(res.maxFileSize / 1024 / 1024);
          }
        });

        if (_config2.default.auto_expand_comment) this.$el.addClass('expand');
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.$el.addClass('expand');
      }
    }, {
      key: 'unfocus',
      value: function unfocus() {
        if (!this.$('#new-submission-text').val() && !this.$('#new-submission-author').val() && !this.$('#new-submission-file').val()) this.$el.removeClass('expand');
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.$('#new-submission-text').val('');
        this.$('#new-submission-author').val('');
        this.$('#new-submission-file').val('');
        $('#attach-text').addClass('hidden');
        $('input[name="new-submission-tags"]:checked').attr('checked', false);
      }
    }, {
      key: 'onTagDropdownClick',
      value: function onTagDropdownClick() {
        this.$('.tag-dropdown-list').toggleClass('expand');
      }
    }, {
      key: 'onLeaveDropdown',
      value: function onLeaveDropdown() {
        this.$('.tag-dropdown-list').removeClass('expand');
      }
    }, {
      key: 'preventPropagation',
      value: function preventPropagation(event) {
        event.stopPropagation();
      }
    }, {
      key: 'onSubmitButtonClick',
      value: function onSubmitButtonClick() {
        var _this3 = this;

        // upload file
        var uploadFile = function uploadFile(file, model, callback) {

          $.ajax({
            method: 'POST',
            url: _config2.default.web_service_url + 'file/attach/' + model.get('_id'),
            iframe: true,
            files: file,
            dataType: 'json',
            error: function error(res) {
              _backbone2.default.trigger('error', 'http', "Unable to upload file");
            },
            success: function success(res) {
              if (_underscore2.default.has(res, 'error')) _backbone2.default.trigger('error', 'http', res.error);else callback();
            }
          });
        };

        var tags = _underscore2.default.map($('input[name="new-submission-tags"]:checked'), function (element) {
          return element.value;
        });

        var submission = new _submission_model2.default({
          text: this.$('#new-submission-text').val(),
          author: this.$('#new-submission-author').val(),
          tags: tags
        });
        submission.save(null, {
          error: function error(model, res) {
            var error = res.responseJSON.error.errors;
            var response_txt = '';

            if (error.author) {
              response_txt = "Please enter your name.\n";
            }
            if (error.text) {
              response_txt += "Please write a comment.";
            }
            alert(response_txt);
          },
          success: function success(model, res) {
            if (_this3.$('#new-submission-file').val()) uploadFile(_this3.$('#new-submission-file'), model, function () {});

            _this3.clear();
            if (_config2.default.auto_expand_comment) $('html, body').animate({
              scrollTop: $('div#submission-list').offset().top
            }, 2000);else _this3.unfocus();
          }
        });
      }
    }, {
      key: 'onFileInputChanged',
      value: function onFileInputChanged() {
        var filename = _underscore2.default.last(this.$('#new-submission-file').val().split("\\"));
        $('#attach-text').html('Image: ' + filename);
        $('#attach-text').removeClass('hidden');
        this.focus();
      }
    }, {
      key: 'template',
      get: function get() {
        return _underscore2.default.template(_submission_input_tmpl2.default);
      }
    }, {
      key: 'className',
      get: function get() {
        return 'submission-input';
      }
    }, {
      key: 'templateHelpers',
      get: function get() {
        return {
          tags: _config2.default.tags,
          welcome_msg: _config2.default.welcome_msg
        };
      }
    }]);

    return SubmissionInputView;
  }(_marionette2.default.ItemView);

  exports.default = SubmissionInputView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcuanMiXSwibmFtZXMiOlsiU3VibWlzc2lvbklucHV0VmlldyIsImV2ZW50cyIsImF1dG9fZXhwYW5kX2NvbW1lbnQiLCJvcHRpb25zIiwiJCIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJlcnJvciIsInJlcyIsInRleHQiLCJzdWNjZXNzIiwibWF4RmlsZVNpemUiLCIkZWwiLCJhZGRDbGFzcyIsInZhbCIsInJlbW92ZUNsYXNzIiwiYXR0ciIsInRvZ2dsZUNsYXNzIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJ1cGxvYWRGaWxlIiwiZmlsZSIsIm1vZGVsIiwiY2FsbGJhY2siLCJ3ZWJfc2VydmljZV91cmwiLCJnZXQiLCJpZnJhbWUiLCJmaWxlcyIsImRhdGFUeXBlIiwidHJpZ2dlciIsImhhcyIsInRhZ3MiLCJtYXAiLCJlbGVtZW50IiwidmFsdWUiLCJzdWJtaXNzaW9uIiwiYXV0aG9yIiwic2F2ZSIsInJlc3BvbnNlSlNPTiIsIm1lc3NhZ2UiLCJyZXNwb25zZV90eHQiLCJpbmNsdWRlcyIsImFsZXJ0IiwiY2xlYXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwidW5mb2N1cyIsImZpbGVuYW1lIiwibGFzdCIsInNwbGl0IiwiaHRtbCIsImZvY3VzIiwidGVtcGxhdGUiLCJ3ZWxjb21lX21zZyIsIkl0ZW1WaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BaUJNQSxtQjs7Ozs7Ozs7Ozs7K0JBT087QUFDWCxZQUFJQyxTQUFTO0FBQ1osa0NBQXlCLHFCQURiO0FBRUgseUNBQWdDLG9CQUY3QjtBQUdILGlDQUF3QixvQkFIckI7QUFJSCxzQ0FBNkIsb0JBSjFCO0FBS0gsMkNBQWtDO0FBTC9CLFNBQWI7QUFPQSxZ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QUVvQjtBQUNqQixZQUFJQyxXQUFXLHFCQUFFQyxJQUFGLENBQU8sS0FBSy9DLENBQUwsQ0FBTyxzQkFBUCxFQUErQlcsR0FBL0IsR0FBcUNxQyxLQUFyQyxDQUEyQyxJQUEzQyxDQUFQLENBQWY7QUFDQWhELFVBQUUsY0FBRixFQUFrQmlELElBQWxCLENBQXVCLFlBQVVILFFBQWpDO0FBQ0E5QyxVQUFFLGNBQUYsRUFBa0JZLFdBQWxCLENBQThCLFFBQTlCO0FBQ0EsYUFBS3NDLEtBQUw7QUFDSDs7OzBCQXpJYztBQUFFLGVBQU8scUJBQUVDLFFBQUYsaUNBQVA7QUFBNkI7OzswQkFFOUI7QUFBRSxlQUFPLGtCQUFQO0FBQTJCOzs7MEJBaUJ2QjtBQUN4QixlQUFPO0FBQ052QixnQkFBTyxpQkFBT0EsSUFEUjtBQUVOd0IsdUJBQWEsaUJBQU9BO0FBRmQsU0FBUDtBQUlHOzs7O0lBM0I2QixxQkFBV0MsUTs7b0JBZ0o5QnpELG1CIiwiZmlsZSI6InN1Ym1pc3Npb25faW5wdXRfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wMSAxOTo1Njo0MVxuKi9cblxuaW1wb3J0ICdqcXVlcnknO1xuaW1wb3J0ICdpZnJhbWVUcmFuc3BvcnQnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSdcbmltcG9ydCBCYWNrYm9uZSwgeyBhamF4IH0gZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBTdWJtaXNzaW9uTW9kZWwgZnJvbSAnbW9kZWxzL3N1Ym1pc3Npb25fbW9kZWwnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvc3VibWlzc2lvbl9pbnB1dF90bXBsLmh0bWwnO1xuXG5jbGFzcyBTdWJtaXNzaW9uSW5wdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3N1Ym1pc3Npb24taW5wdXQnIH1cblxuICAgIGV2ZW50cygpIHtcblx0XHR2YXIgZXZlbnRzID0ge1xuXHRcdFx0J2NsaWNrICNzdWJtaXQtYnV0dG9uJyA6ICdvblN1Ym1pdEJ1dHRvbkNsaWNrJyxcbiAgICAgICAgICAgICdjaGFuZ2UgI25ldy1zdWJtaXNzaW9uLWZpbGUnIDogJ29uRmlsZUlucHV0Q2hhbmdlZCcsXG4gICAgICAgICAgICAnY2xpY2sgI3RhZy1kcm9wZG93bicgOiAnb25UYWdEcm9wZG93bkNsaWNrJyxcbiAgICAgICAgICAgICdjbGljayAudGFnLWRyb3Bkb3duLWxpc3QnIDogJ3ByZXZlbnRQcm9wYWdhdGlvbicsXG4gICAgICAgICAgICAnbW91c2VsZWF2ZSAudGFnLWRyb3Bkb3duLWxpc3QnIDogJ29uTGVhdmVEcm9wZG93bidcblx0XHR9XG5cdFx0aWYoIUNvbmZpZy5hdXRvX2V4cGFuZF9jb21tZW50KXtcblx0XHRcdGV2ZW50c1snY2xpY2sgLnN1Ym1pc3Npb24taGVhZGxpbmUnXSA9ICdmb2N1cyc7XG5cdFx0XHRldmVudHNbJ21vdXNlbGVhdmUnXSA9ICd1bmZvY3VzJztcblx0XHR9XG5cdFx0cmV0dXJuIGV2ZW50cztcbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0YWdzIDogQ29uZmlnLnRhZ3MsXG5cdFx0XHR3ZWxjb21lX21zZzogQ29uZmlnLndlbGNvbWVfbXNnXG5cdFx0fVxuICAgIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcblx0XHQkLmFqYXgoe1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdHVybDogJ2FwaS9zdWJtaXNzaW9ucy9vcHRpb25zJyxcblx0XHRcdGVycm9yOiAocmVzKSA9PiB7XG5cdFx0XHRcdHRoaXMuJCgnc3Bhbi5zaXplLWluZm8nKS50ZXh0KDUpOyBcdFx0Ly9kZWZhdWx0IHZhbHVlXG5cdFx0XHR9LFxuXHRcdFx0c3VjY2VzczogKHJlcykgPT4ge1xuXHRcdFx0XHR0aGlzLiQoJ3NwYW4uc2l6ZS1pbmZvJykudGV4dChyZXMubWF4RmlsZVNpemUvMTAyNC8xMDI0KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmKENvbmZpZy5hdXRvX2V4cGFuZF9jb21tZW50KVxuXHRcdFx0dGhpcy4kZWwuYWRkQ2xhc3MoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgIFx0dGhpcy4kZWwuYWRkQ2xhc3MoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIHVuZm9jdXMoKSB7XG4gICAgXHRpZiAoIXRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLXRleHQnKS52YWwoKSAmJiAhdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tYXV0aG9yJykudmFsKCkgJiYgIXRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoKSlcbiAgICBcdFx0dGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLiQoJyNuZXctc3VibWlzc2lvbi10ZXh0JykudmFsKCcnKTtcbiAgICAgICAgdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tYXV0aG9yJykudmFsKCcnKTtcbiAgICAgICAgdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tZmlsZScpLnZhbCgnJyk7XG4gICAgICAgICQoJyNhdHRhY2gtdGV4dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cIm5ldy1zdWJtaXNzaW9uLXRhZ3NcIl06Y2hlY2tlZCcpLmF0dHIoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgb25UYWdEcm9wZG93bkNsaWNrKCkge1xuICAgICAgICB0aGlzLiQoJy50YWctZHJvcGRvd24tbGlzdCcpLnRvZ2dsZUNsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBvbkxlYXZlRHJvcGRvd24oKSB7XG4gICAgICAgIHRoaXMuJCgnLnRhZy1kcm9wZG93bi1saXN0JykucmVtb3ZlQ2xhc3MoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIHByZXZlbnRQcm9wYWdhdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvblN1Ym1pdEJ1dHRvbkNsaWNrKCkge1xuXG4gICAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICAgIHZhciB1cGxvYWRGaWxlID0gZnVuY3Rpb24oZmlsZSwgbW9kZWwsY2FsbGJhY2spIHtcblx0XHRcdFxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy53ZWJfc2VydmljZV91cmwrJ2ZpbGUvYXR0YWNoLycrbW9kZWwuZ2V0KCdfaWQnKSxcbiAgICAgICAgICAgICAgICBpZnJhbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgZmlsZXM6IGZpbGUsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBlcnJvcjogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdlcnJvcicsJ2h0dHAnLFwiVW5hYmxlIHRvIHVwbG9hZCBmaWxlXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5oYXMocmVzLCdlcnJvcicpKVxuXHRcdFx0XHRcdFx0QmFja2JvbmUudHJpZ2dlcignZXJyb3InLCdodHRwJyxyZXMuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0YWdzID0gXy5tYXAoJCgnaW5wdXRbbmFtZT1cIm5ldy1zdWJtaXNzaW9uLXRhZ3NcIl06Y2hlY2tlZCcpLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgXHR2YXIgc3VibWlzc2lvbiA9IG5ldyBTdWJtaXNzaW9uTW9kZWwoe1xuICAgIFx0XHR0ZXh0IDogdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tdGV4dCcpLnZhbCgpLFxuICAgIFx0XHRhdXRob3IgOiB0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1hdXRob3InKS52YWwoKSxcbiAgICAgICAgICAgIHRhZ3M6IHRhZ3NcbiAgICBcdH0pXG4gICAgXHRzdWJtaXNzaW9uLnNhdmUobnVsbCx7XG4gICAgICAgICAgICBlcnJvcjogKG1vZGVsLHJlcykgPT4ge1xuXHRcdFx0XHR2YXIgZXJyb3IgPSByZXMucmVzcG9uc2VKU09OLmVycm9yLm1lc3NhZ2U7XG5cdFx0XHRcdHZhciByZXNwb25zZV90eHQgPSAnJztcblxuXHRcdFx0XHRpZihlcnJvci5pbmNsdWRlcygnYXV0aG9yJykpe1xuXHRcdFx0XHRcdHJlc3BvbnNlX3R4dCA9IFwiUGxlYXNlIGVudGVyIHlvdXIgbmFtZS5cXG5cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihlcnJvci5pbmNsdWRlcygndGV4dCcpKXtcblx0XHRcdFx0XHRyZXNwb25zZV90eHQgKz0gXCJQbGVhc2Ugd3JpdGUgYSBjb21tZW50LlwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGFsZXJ0KHJlc3BvbnNlX3R4dCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogKG1vZGVsLCByZXMpID0+IHtcblx0XHRcdFx0aWYodGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tZmlsZScpLnZhbCgpKVxuXHRcdFx0XHRcdHVwbG9hZEZpbGUodGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tZmlsZScpLG1vZGVsLCAoKSA9PiB7fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0XHRcdGlmKENvbmZpZy5hdXRvX2V4cGFuZF9jb21tZW50KVxuXHRcdFx0XHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0XHRcdHNjcm9sbFRvcDogJCgnZGl2I3N1Ym1pc3Npb24tbGlzdCcpLm9mZnNldCgpLnRvcFxuXHRcdFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy51bmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRmlsZUlucHV0Q2hhbmdlZCgpIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gXy5sYXN0KHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoKS5zcGxpdChcIlxcXFxcIikpO1xuICAgICAgICAkKCcjYXR0YWNoLXRleHQnKS5odG1sKCdJbWFnZTogJytmaWxlbmFtZSk7XG4gICAgICAgICQoJyNhdHRhY2gtdGV4dCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbklucHV0VmlldyJdfQ==
