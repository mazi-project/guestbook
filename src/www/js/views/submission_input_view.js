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
                return {
                    'click .submission-headline': 'focus',
                    'mouseleave': 'unfocus',
                    'click #submit-button': 'onSubmitButtonClick',
                    'change #new-submission-file': 'onFileInputChanged',
                    'click #tag-dropdown': 'onTagDropdownClick',
                    'click .tag-dropdown-list': 'preventPropagation',
                    'mouseleave .tag-dropdown-list': 'onLeaveDropdown'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {
                var _this2 = this;

                //console.log(options)
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
                        var error = res.responseJSON.error.message;
                        var response_txt = '';

                        if (error.includes('author')) {
                            response_txt = "Please enter your name.\n";
                        }
                        if (error.includes('text')) {
                            response_txt += "Please write a comment.";
                        }
                        alert(response_txt);
                    },
                    success: function success(model, res) {
                        if (_this3.$('#new-submission-file').val()) uploadFile(_this3.$('#new-submission-file'), model, function () {
                            _this3.clear();
                            _this3.unfocus();
                        });else {
                            _this3.clear();
                            _this3.unfocus();
                        }
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
                    tags: _config2.default.tags
                };
            }
        }]);

        return SubmissionInputView;
    }(_marionette2.default.ItemView);

    exports.default = SubmissionInputView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcuanMiXSwibmFtZXMiOlsiU3VibWlzc2lvbklucHV0VmlldyIsIm9wdGlvbnMiLCIkIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImVycm9yIiwicmVzIiwidGV4dCIsInN1Y2Nlc3MiLCJtYXhGaWxlU2l6ZSIsIiRlbCIsImFkZENsYXNzIiwidmFsIiwicmVtb3ZlQ2xhc3MiLCJhdHRyIiwidG9nZ2xlQ2xhc3MiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsInVwbG9hZEZpbGUiLCJmaWxlIiwibW9kZWwiLCJjYWxsYmFjayIsIndlYl9zZXJ2aWNlX3VybCIsImdldCIsImlmcmFtZSIsImZpbGVzIiwiZGF0YVR5cGUiLCJ0cmlnZ2VyIiwiaGFzIiwidGFncyIsIm1hcCIsImVsZW1lbnQiLCJ2YWx1ZSIsInN1Ym1pc3Npb24iLCJhdXRob3IiLCJzYXZlIiwicmVzcG9uc2VKU09OIiwibWVzc2FnZSIsInJlc3BvbnNlX3R4dCIsImluY2x1ZGVzIiwiYWxlcnQiLCJjbGVhciIsInVuZm9jdXMiLCJmaWxlbmFtZSIsImxhc3QiLCJzcGxpdCIsImh0bWwiLCJmb2N1cyIsInRlbXBsYXRlIiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpQk1BLG1COzs7Ozs7Ozs7OztxQ0FPTztBQUNSLHVCQUFPO0FBQ0Esa0RBQStCLE9BRC9CO0FBRUEsa0NBQWUsU0FGZjtBQUdBLDRDQUF5QixxQkFIekI7QUFJQSxtREFBZ0Msb0JBSmhDO0FBS0EsMkNBQXdCLG9CQUx4QjtBQU1BLGdEQUE2QixvQkFON0I7QUFPQSxxREFBa0M7QUFQbEMsaUJBQVA7QUFTQTs7O3VDQVNVQyxPLEVBQVM7QUFBQTs7QUFDdEI7QUFDQUMsa0JBQUVDLElBQUYsQ0FBTztB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RSx1QkFBTyxrQkFBUDtBQUEyQjs7O2dDQWN2QjtBQUN4Qix1QkFBTztBQUNObkIsMEJBQU8saUJBQU9BO0FBRFIsaUJBQVA7QUFHRzs7OztNQXZCNkIscUJBQVdvQixROztzQkF5STlCbEQsbUIiLCJmaWxlIjoic3VibWlzc2lvbl9pbnB1dF92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTAxIDE5OjU2OjQxXG4qL1xuXG5pbXBvcnQgJ2pxdWVyeSc7XG5pbXBvcnQgJ2lmcmFtZVRyYW5zcG9ydCc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJ1xuaW1wb3J0IEJhY2tib25lLCB7IGFqYXggfSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IFN1Ym1pc3Npb25Nb2RlbCBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9tb2RlbCc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9zdWJtaXNzaW9uX2lucHV0X3RtcGwuaHRtbCc7XG5cbmNsYXNzIFN1Ym1pc3Npb25JbnB1dFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnc3VibWlzc2lvbi1pbnB1dCcgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICAgICAgICAgICdjbGljayAuc3VibWlzc2lvbi1oZWFkbGluZScgOiAnZm9jdXMnLFxuICAgICAgICAgICAgJ21vdXNlbGVhdmUnIDogJ3VuZm9jdXMnLFxuICAgICAgICAgICAgJ2NsaWNrICNzdWJtaXQtYnV0dG9uJyA6ICdvblN1Ym1pdEJ1dHRvbkNsaWNrJyxcbiAgICAgICAgICAgICdjaGFuZ2UgI25ldy1zdWJtaXNzaW9uLWZpbGUnIDogJ29uRmlsZUlucHV0Q2hhbmdlZCcsXG4gICAgICAgICAgICAnY2xpY2sgI3RhZy1kcm9wZG93bicgOiAnb25UYWdEcm9wZG93bkNsaWNrJyxcbiAgICAgICAgICAgICdjbGljayAudGFnLWRyb3Bkb3duLWxpc3QnIDogJ3ByZXZlbnRQcm9wYWdhdGlvbicsXG4gICAgICAgICAgICAnbW91c2VsZWF2ZSAudGFnLWRyb3Bkb3duLWxpc3QnIDogJ29uTGVhdmVEcm9wZG93bidcbiAgICBcdH1cbiAgICB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0YWdzIDogQ29uZmlnLnRhZ3Ncblx0XHR9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXHRcdC8vY29uc29sZS5sb2cob3B0aW9ucylcblx0XHQkLmFqYXgoe1xuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdHVybDogJ2FwaS9zdWJtaXNzaW9ucy9vcHRpb25zJyxcblx0XHRcdGVycm9yOiAocmVzKSA9PiB7XG5cdFx0XHRcdHRoaXMuJCgnc3Bhbi5zaXplLWluZm8nKS50ZXh0KDUpOyBcdFx0Ly9kZWZhdWx0IHZhbHVlXG5cdFx0XHR9LFxuXHRcdFx0c3VjY2VzczogKHJlcykgPT4ge1xuXHRcdFx0XHR0aGlzLiQoJ3NwYW4uc2l6ZS1pbmZvJykudGV4dChyZXMubWF4RmlsZVNpemUvMTAyNC8xMDI0KTtcblx0XHRcdH1cblx0XHR9KTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICBcdHRoaXMuJGVsLmFkZENsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICB1bmZvY3VzKCkge1xuICAgIFx0aWYgKCF0aGlzLiQoJyNuZXctc3VibWlzc2lvbi10ZXh0JykudmFsKCkgJiYgIXRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWF1dGhvcicpLnZhbCgpICYmICF0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1maWxlJykudmFsKCkpXG4gICAgXHRcdHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tdGV4dCcpLnZhbCgnJyk7XG4gICAgICAgIHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWF1dGhvcicpLnZhbCgnJyk7XG4gICAgICAgIHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoJycpO1xuICAgICAgICAkKCcjYXR0YWNoLXRleHQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJuZXctc3VibWlzc2lvbi10YWdzXCJdOmNoZWNrZWQnKS5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH1cblxuICAgIG9uVGFnRHJvcGRvd25DbGljaygpIHtcbiAgICAgICAgdGhpcy4kKCcudGFnLWRyb3Bkb3duLWxpc3QnKS50b2dnbGVDbGFzcygnZXhwYW5kJyk7XG4gICAgfVxuXG4gICAgb25MZWF2ZURyb3Bkb3duKCkge1xuICAgICAgICB0aGlzLiQoJy50YWctZHJvcGRvd24tbGlzdCcpLnJlbW92ZUNsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBwcmV2ZW50UHJvcGFnYXRpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25TdWJtaXRCdXR0b25DbGljaygpIHtcblxuICAgICAgICAvLyB1cGxvYWQgZmlsZVxuICAgICAgICB2YXIgdXBsb2FkRmlsZSA9IGZ1bmN0aW9uKGZpbGUsIG1vZGVsLGNhbGxiYWNrKSB7XG5cdFx0XHRcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBDb25maWcud2ViX3NlcnZpY2VfdXJsKydmaWxlL2F0dGFjaC8nK21vZGVsLmdldCgnX2lkJyksXG4gICAgICAgICAgICAgICAgaWZyYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbGVzOiBmaWxlLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgZXJyb3I6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlcignZXJyb3InLCdodHRwJyxcIlVuYWJsZSB0byB1cGxvYWQgZmlsZVwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaGFzKHJlcywnZXJyb3InKSlcblx0XHRcdFx0XHRcdEJhY2tib25lLnRyaWdnZXIoJ2Vycm9yJywnaHR0cCcscmVzLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdGFncyA9IF8ubWFwKCQoJ2lucHV0W25hbWU9XCJuZXctc3VibWlzc2lvbi10YWdzXCJdOmNoZWNrZWQnKSwgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xuICAgICAgICB9KTtcblxuICAgIFx0dmFyIHN1Ym1pc3Npb24gPSBuZXcgU3VibWlzc2lvbk1vZGVsKHtcbiAgICBcdFx0dGV4dCA6IHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLXRleHQnKS52YWwoKSxcbiAgICBcdFx0YXV0aG9yIDogdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tYXV0aG9yJykudmFsKCksXG4gICAgICAgICAgICB0YWdzOiB0YWdzXG4gICAgXHR9KVxuICAgIFx0c3VibWlzc2lvbi5zYXZlKG51bGwse1xuICAgICAgICAgICAgZXJyb3I6IChtb2RlbCxyZXMpID0+IHtcblx0XHRcdFx0dmFyIGVycm9yID0gcmVzLnJlc3BvbnNlSlNPTi5lcnJvci5tZXNzYWdlO1xuXHRcdFx0XHR2YXIgcmVzcG9uc2VfdHh0ID0gJyc7XG5cblx0XHRcdFx0aWYoZXJyb3IuaW5jbHVkZXMoJ2F1dGhvcicpKXtcblx0XHRcdFx0XHRyZXNwb25zZV90eHQgPSBcIlBsZWFzZSBlbnRlciB5b3VyIG5hbWUuXFxuXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoZXJyb3IuaW5jbHVkZXMoJ3RleHQnKSl7XG5cdFx0XHRcdFx0cmVzcG9uc2VfdHh0ICs9IFwiUGxlYXNlIHdyaXRlIGEgY29tbWVudC5cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRhbGVydChyZXNwb25zZV90eHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChtb2RlbCwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgdXBsb2FkRmlsZSh0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1maWxlJyksbW9kZWwsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRmlsZUlucHV0Q2hhbmdlZCgpIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gXy5sYXN0KHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoKS5zcGxpdChcIlxcXFxcIikpO1xuICAgICAgICAkKCcjYXR0YWNoLXRleHQnKS5odG1sKCdJbWFnZTogJytmaWxlbmFtZSk7XG4gICAgICAgICQoJyNhdHRhY2gtdGV4dCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbklucHV0VmlldyJdfQ==