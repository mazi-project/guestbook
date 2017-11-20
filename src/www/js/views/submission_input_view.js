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
                // return {
                //     // 'click .submission-headline' : 'focus',
                //     // 'mouseleave' : 'unfocus',
                //     'click #submit-button' : 'onSubmitButtonClick',
                //     'change #new-submission-file' : 'onFileInputChanged',
                //     'click #tag-dropdown' : 'onTagDropdownClick',
                //     'click .tag-dropdown-list' : 'preventPropagation',
                //     'mouseleave .tag-dropdown-list' : 'onLeaveDropdown'
                // }
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
                            // this.clear();
                        });
                        // else {
                        // this.clear();
                        // }
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
                    tags: _config2.default.tags
                };
            }
        }]);

        return SubmissionInputView;
    }(_marionette2.default.ItemView);

    exports.default = SubmissionInputView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcuanMiXSwibmFtZXMiOlsiU3VibWlzc2lvbklucHV0VmlldyIsImV2ZW50cyIsImF1dG9fZXhwYW5kX2NvbW1lbnQiLCJvcHRpb25zIiwiJCIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJlcnJvciIsInJlcyIsInRleHQiLCJzdWNjZXNzIiwibWF4RmlsZVNpemUiLCIkZWwiLCJhZGRDbGFzcyIsInZhbCIsInJlbW92ZUNsYXNzIiwiYXR0ciIsInRvZ2dsZUNsYXNzIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJ1cGxvYWRGaWxlIiwiZmlsZSIsIm1vZGVsIiwiY2FsbGJhY2siLCJ3ZWJfc2VydmljZV91cmwiLCJnZXQiLCJpZnJhbWUiLCJmaWxlcyIsImRhdGFUeXBlIiwidHJpZ2dlciIsImhhcyIsInRhZ3MiLCJtYXAiLCJlbGVtZW50IiwidmFsdWUiLCJzdWJtaXNzaW9uIiwiYXV0aG9yIiwic2F2ZSIsInJlc3BvbnNlSlNPTiIsIm1lc3NhZ2UiLCJyZXNwb25zZV90eHQiLCJpbmNsdWRlcyIsImFsZXJ0IiwiY2xlYXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwidW5mb2N1cyIsImZpbGVuYW1lIiwibGFzdCIsInNwbGl0IiwiaHRtbCIsImZvY3VzIiwidGVtcGxhdGUiLCJJdGVtVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWlCTUEsbUI7Ozs7Ozs7Ozs7O3FDQU9PO0FBQ1gsb0JBQUlDLFNBQVM7QUFDWiw0Q0FBeUIscUJBRGI7QUFFSCxtREFBZ0Msb0JBRjdCO0FBR0gsMkNBQXdCLG9CQUhyQjtBQUlILGdEQUE2QixvQkFKMUI7QUFLSCxxREFBa0M7QUFML0IsaUJBQWI7QUFPQSxvQkFBRyxDQUFDLGlC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ekIsR0FBa0NDO0FBRHRCLHlCQUF4QixFQUVHLElBRkgsRUFERCxLQUtDLE9BQUtDLE9BQUw7QUFFUTtBQTdCYSxpQkFBckI7QUErQkE7OztpREFFb0I7QUFDakIsb0JBQUlDLFdBQVcscUJBQUVDLElBQUYsQ0FBTyxLQUFLL0MsQ0FBTCxDQUFPLHNCQUFQLEVBQStCVyxHQUEvQixHQUFxQ3FDLEtBQXJDLENBQTJDLElBQTNDLENBQVAsQ0FBZjtBQUNBaEQsa0JBQUUsY0FBRixFQUFrQmlELElBQWxCLENBQXVCLFlBQVVILFFBQWpDO0FBQ0E5QyxrQkFBRSxjQUFGLEVBQWtCWSxXQUFsQixDQUE4QixRQUE5QjtBQUNBLHFCQUFLc0MsS0FBTDtBQUNIOzs7Z0NBdEpjO0FBQUUsdUJBQU8scUJBQUVDLFFBQUYsaUNBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxrQkFBUDtBQUEyQjs7O2dDQTBCdkI7QUFDeEIsdUJBQU87QUFDTnZCLDBCQUFPLGlCQUFPQTtBQURSLGlCQUFQO0FBR0c7Ozs7TUFuQzZCLHFCQUFXd0IsUTs7c0JBNko5QnhELG1CIiwiZmlsZSI6InN1Ym1pc3Npb25faW5wdXRfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wMSAxOTo1Njo0MVxuKi9cblxuaW1wb3J0ICdqcXVlcnknO1xuaW1wb3J0ICdpZnJhbWVUcmFuc3BvcnQnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSdcbmltcG9ydCBCYWNrYm9uZSwgeyBhamF4IH0gZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBTdWJtaXNzaW9uTW9kZWwgZnJvbSAnbW9kZWxzL3N1Ym1pc3Npb25fbW9kZWwnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvc3VibWlzc2lvbl9pbnB1dF90bXBsLmh0bWwnO1xuXG5jbGFzcyBTdWJtaXNzaW9uSW5wdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3N1Ym1pc3Npb24taW5wdXQnIH1cblxuICAgIGV2ZW50cygpIHtcblx0XHR2YXIgZXZlbnRzID0ge1xuXHRcdFx0J2NsaWNrICNzdWJtaXQtYnV0dG9uJyA6ICdvblN1Ym1pdEJ1dHRvbkNsaWNrJyxcbiAgICAgICAgICAgICdjaGFuZ2UgI25ldy1zdWJtaXNzaW9uLWZpbGUnIDogJ29uRmlsZUlucHV0Q2hhbmdlZCcsXG4gICAgICAgICAgICAnY2xpY2sgI3RhZy1kcm9wZG93bicgOiAnb25UYWdEcm9wZG93bkNsaWNrJyxcbiAgICAgICAgICAgICdjbGljayAudGFnLWRyb3Bkb3duLWxpc3QnIDogJ3ByZXZlbnRQcm9wYWdhdGlvbicsXG4gICAgICAgICAgICAnbW91c2VsZWF2ZSAudGFnLWRyb3Bkb3duLWxpc3QnIDogJ29uTGVhdmVEcm9wZG93bidcblx0XHR9XG5cdFx0aWYoIUNvbmZpZy5hdXRvX2V4cGFuZF9jb21tZW50KXtcblx0XHRcdGV2ZW50c1snY2xpY2sgLnN1Ym1pc3Npb24taGVhZGxpbmUnXSA9ICdmb2N1cyc7XG5cdFx0XHRldmVudHNbJ21vdXNlbGVhdmUnXSA9ICd1bmZvY3VzJztcblx0XHR9XG4gICAgXHQvLyByZXR1cm4ge1xuICAgICAgICAvLyAgICAgLy8gJ2NsaWNrIC5zdWJtaXNzaW9uLWhlYWRsaW5lJyA6ICdmb2N1cycsXG4gICAgICAgIC8vICAgICAvLyAnbW91c2VsZWF2ZScgOiAndW5mb2N1cycsXG4gICAgICAgIC8vICAgICAnY2xpY2sgI3N1Ym1pdC1idXR0b24nIDogJ29uU3VibWl0QnV0dG9uQ2xpY2snLFxuICAgICAgICAvLyAgICAgJ2NoYW5nZSAjbmV3LXN1Ym1pc3Npb24tZmlsZScgOiAnb25GaWxlSW5wdXRDaGFuZ2VkJyxcbiAgICAgICAgLy8gICAgICdjbGljayAjdGFnLWRyb3Bkb3duJyA6ICdvblRhZ0Ryb3Bkb3duQ2xpY2snLFxuICAgICAgICAvLyAgICAgJ2NsaWNrIC50YWctZHJvcGRvd24tbGlzdCcgOiAncHJldmVudFByb3BhZ2F0aW9uJyxcbiAgICAgICAgLy8gICAgICdtb3VzZWxlYXZlIC50YWctZHJvcGRvd24tbGlzdCcgOiAnb25MZWF2ZURyb3Bkb3duJ1xuXHRcdC8vIH1cblx0XHRyZXR1cm4gZXZlbnRzO1xuICAgIH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRhZ3MgOiBDb25maWcudGFnc1xuXHRcdH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHR1cmw6ICdhcGkvc3VibWlzc2lvbnMvb3B0aW9ucycsXG5cdFx0XHRlcnJvcjogKHJlcykgPT4ge1xuXHRcdFx0XHR0aGlzLiQoJ3NwYW4uc2l6ZS1pbmZvJykudGV4dCg1KTsgXHRcdC8vZGVmYXVsdCB2YWx1ZVxuXHRcdFx0fSxcblx0XHRcdHN1Y2Nlc3M6IChyZXMpID0+IHtcblx0XHRcdFx0dGhpcy4kKCdzcGFuLnNpemUtaW5mbycpLnRleHQocmVzLm1heEZpbGVTaXplLzEwMjQvMTAyNCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZihDb25maWcuYXV0b19leHBhbmRfY29tbWVudClcblx0XHRcdHRoaXMuJGVsLmFkZENsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICBcdHRoaXMuJGVsLmFkZENsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICB1bmZvY3VzKCkge1xuICAgIFx0aWYgKCF0aGlzLiQoJyNuZXctc3VibWlzc2lvbi10ZXh0JykudmFsKCkgJiYgIXRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWF1dGhvcicpLnZhbCgpICYmICF0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1maWxlJykudmFsKCkpXG4gICAgXHRcdHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tdGV4dCcpLnZhbCgnJyk7XG4gICAgICAgIHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWF1dGhvcicpLnZhbCgnJyk7XG4gICAgICAgIHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoJycpO1xuICAgICAgICAkKCcjYXR0YWNoLXRleHQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJuZXctc3VibWlzc2lvbi10YWdzXCJdOmNoZWNrZWQnKS5hdHRyKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH1cblxuICAgIG9uVGFnRHJvcGRvd25DbGljaygpIHtcbiAgICAgICAgdGhpcy4kKCcudGFnLWRyb3Bkb3duLWxpc3QnKS50b2dnbGVDbGFzcygnZXhwYW5kJyk7XG4gICAgfVxuXG4gICAgb25MZWF2ZURyb3Bkb3duKCkge1xuICAgICAgICB0aGlzLiQoJy50YWctZHJvcGRvd24tbGlzdCcpLnJlbW92ZUNsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBwcmV2ZW50UHJvcGFnYXRpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25TdWJtaXRCdXR0b25DbGljaygpIHtcblxuICAgICAgICAvLyB1cGxvYWQgZmlsZVxuICAgICAgICB2YXIgdXBsb2FkRmlsZSA9IGZ1bmN0aW9uKGZpbGUsIG1vZGVsLGNhbGxiYWNrKSB7XG5cdFx0XHRcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgdXJsOiBDb25maWcud2ViX3NlcnZpY2VfdXJsKydmaWxlL2F0dGFjaC8nK21vZGVsLmdldCgnX2lkJyksXG4gICAgICAgICAgICAgICAgaWZyYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZpbGVzOiBmaWxlLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgZXJyb3I6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlcignZXJyb3InLCdodHRwJyxcIlVuYWJsZSB0byB1cGxvYWQgZmlsZVwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaGFzKHJlcywnZXJyb3InKSlcblx0XHRcdFx0XHRcdEJhY2tib25lLnRyaWdnZXIoJ2Vycm9yJywnaHR0cCcscmVzLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdGFncyA9IF8ubWFwKCQoJ2lucHV0W25hbWU9XCJuZXctc3VibWlzc2lvbi10YWdzXCJdOmNoZWNrZWQnKSwgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xuICAgICAgICB9KTtcblxuICAgIFx0dmFyIHN1Ym1pc3Npb24gPSBuZXcgU3VibWlzc2lvbk1vZGVsKHtcbiAgICBcdFx0dGV4dCA6IHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLXRleHQnKS52YWwoKSxcbiAgICBcdFx0YXV0aG9yIDogdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tYXV0aG9yJykudmFsKCksXG4gICAgICAgICAgICB0YWdzOiB0YWdzXG4gICAgXHR9KVxuICAgIFx0c3VibWlzc2lvbi5zYXZlKG51bGwse1xuICAgICAgICAgICAgZXJyb3I6IChtb2RlbCxyZXMpID0+IHtcblx0XHRcdFx0dmFyIGVycm9yID0gcmVzLnJlc3BvbnNlSlNPTi5lcnJvci5tZXNzYWdlO1xuXHRcdFx0XHR2YXIgcmVzcG9uc2VfdHh0ID0gJyc7XG5cblx0XHRcdFx0aWYoZXJyb3IuaW5jbHVkZXMoJ2F1dGhvcicpKXtcblx0XHRcdFx0XHRyZXNwb25zZV90eHQgPSBcIlBsZWFzZSBlbnRlciB5b3VyIG5hbWUuXFxuXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoZXJyb3IuaW5jbHVkZXMoJ3RleHQnKSl7XG5cdFx0XHRcdFx0cmVzcG9uc2VfdHh0ICs9IFwiUGxlYXNlIHdyaXRlIGEgY29tbWVudC5cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRhbGVydChyZXNwb25zZV90eHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChtb2RlbCwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgdXBsb2FkRmlsZSh0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1maWxlJyksbW9kZWwsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdGhpcy5jbGVhcigpO1xuXHRcdFx0XHQvLyB9XG5cdFx0XHRcdHRoaXMuY2xlYXIoKTtcblx0XHRcdFx0aWYoQ29uZmlnLmF1dG9fZXhwYW5kX2NvbW1lbnQpXG5cdFx0XHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wOiAkKCdkaXYjc3VibWlzc2lvbi1saXN0Jykub2Zmc2V0KCkudG9wXG5cdFx0XHRcdFx0fSwgMjAwMCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLnVuZm9jdXMoKTtcblx0XHRcdFx0XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRmlsZUlucHV0Q2hhbmdlZCgpIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gXy5sYXN0KHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoKS5zcGxpdChcIlxcXFxcIikpO1xuICAgICAgICAkKCcjYXR0YWNoLXRleHQnKS5odG1sKCdJbWFnZTogJytmaWxlbmFtZSk7XG4gICAgICAgICQoJyNhdHRhY2gtdGV4dCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbklucHV0VmlldyJdfQ==