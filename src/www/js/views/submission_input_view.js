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
                //console.log(options)
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
                var _this2 = this;

                // upload file
                var uploadFile = function uploadFile(file, model, callback) {

                    $.ajax({
                        method: 'POST',
                        url: _config2.default.web_service_url + 'file/attach/' + model.get('_id'),
                        iframe: true,
                        files: file,
                        dataType: 'json',
                        error: function error(res) {
                            _backbone2.default.trigger('error', 'http', res.responseJSON.error);
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
                        _backbone2.default.trigger('error', 'http', res.responseJSON.error);
                    },
                    success: function success(model, res) {
                        if (_this2.$('#new-submission-file').val()) uploadFile(_this2.$('#new-submission-file'), model, function () {
                            _this2.clear();
                            _this2.unfocus();
                        });else {
                            _this2.clear();
                            _this2.unfocus();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcuanMiXSwibmFtZXMiOlsiU3VibWlzc2lvbklucHV0VmlldyIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwicGVvcyIsIiRlbCIsImFkZENsYXNzIiwiJCIsInZhbCIsInJlbW92ZUNsYXNzIiwiYXR0ciIsInRvZ2dsZUNsYXNzIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJ1cGxvYWRGaWxlIiwiZmlsZSIsIm1vZGVsIiwiY2FsbGJhY2siLCJhamF4IiwibWV0aG9kIiwidXJsIiwid2ViX3NlcnZpY2VfdXJsIiwiZ2V0IiwiaWZyYW1lIiwiZmlsZXMiLCJkYXRhVHlwZSIsImVycm9yIiwicmVzIiwidHJpZ2dlciIsInJlc3BvbnNlSlNPTiIsInN1Y2Nlc3MiLCJoYXMiLCJ0YWdzIiwibWFwIiwiZWxlbWVudCIsInZhbHVlIiwic3VibWlzc2lvbiIsInRleHQiLCJhdXRob3IiLCJzYXZlIiwiY2xlYXIiLCJ1bmZvY3VzIiwiZmlsZW5hbWUiLCJsYXN0Iiwic3BsaXQiLCJodG1sIiwiZm9jdXMiLCJ0ZW1wbGF0ZSIsIkl0ZW1WaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUJNQSxtQjs7Ozs7Ozs7Ozs7cUNBT087QUFDUix1QkFBTztBQUNBLGtEQUErQixPQUQvQjtBQUVBLGtDQUFlLFNBRmY7QUFHQSw0Q0FBeUIscUJBSHpCO0FBSUEsbURBQWdDLG9CQUpoQztBQUtBLDJDQUF3QixvQkFMeEI7QUFNQSxnREFBNkIsb0JBTjdCO0FBT0EscURBQWtDO0FBUGxDLGlCQUFQO0FBU0E7Ozt1Q0FXVUMsTyxFQUFTO0FBQ3RCO0FBQ0FDLHdCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBLHFCQUFLQyxJQUFMLEdBQVksTUFBWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUc7OztvQ0FFTztBQUNQLHFCQUFLQyxHQUFMLENBQVNDLFFBQVQsQ0FBa0IsUUFBbEI7QUFDQTs7O3NDQUVTO0FBQ1Qsb0JBQUksQ0FBQyxLQUFLQyxDQUFMLENBQU8sc0JBQVAsRUFBK0JDLEdBQS9CLEVBQUQsSUFBeUMsQ0FBQyxLQUFLRCxDQUFMLENBQU8sd0JBQVAsRUFBaUNDLEdBQWpDLEVBQTFDLElBQW9GLENBQUMsS0FBS0QsQ0FBTCxDQUFPLHNCQUFQLEVBQStCQyxHQUEvQixFQUF6RixFQUNDLEtBQUtILEdBQUwsQ0FBU0ksV0FBVCxDQUFxQixRQUFyQjtBQUNEOzs7b0NBRU87QUFDSixxQkFBS0YsQ0FBTCxDQUFPLHNCQUFQLEVBQStCQyxHQUEvQixDQUFtQyxFQUFuQztBQUNBLHFCQUFLRCxDQUFMLENBQU8sd0JBQVAsRUFBaUNDLEdBQWpDLENBQXFDLEVBQXJDO0FBQ0EscUJBQUtELENBQUwsQ0FBTyxzQkFBUCxFQUErQkMsR0FBL0IsQ0FBbUMsRUFBbkM7QUFDQUQsa0JBQUUsY0FBRixFQUFrQkQsUUFBbEIsQ0FBMkIsUUFBM0I7QUFDQUMsa0JBQUUsMkNBQUYsRUFBK0NHLElBQS9DLENBQW9ELFNBQXBELEVBQStELEtBQS9EO0FBQ0g7OztpREFFb0I7QUFDakIscUJBQUtILENBQUwsQ0FBTyxvQkFBUCxFQUE2QkksV0FBN0IsQ0FBeUMsUUFBekM7QUFDSDs7OzhDQUVpQjtBQUNkLHFCQUFLSixDQUFMLENBQU8sb0JBQVAsRUFBNkJFLFdBQTdCLENBQXlDLFFBQXpDO0FBQ0g7OzsrQ0FFa0JHLEssRUFBTztBQUN0QkEsc0JBQU1DLGVBQU47QUFDSDs7O2tEQUVxQjtBQUFBOztBQUVsQjtBQUNBLG9CQUFJQyxhQUFhLFNBQWJBLFVBQWEsQ0FBU0MsSUFBVCxFQUFlQyxLQUFmLEVBQXFCQyxRQUFyQixFQUErQjs7QUFFNUNWLHNCQUFFVyxJQUFGLENBQU87QUFDSEMsZ0NBQVEsTUFETDtBQUVIQyw2QkFBSyxpQkFBT0MsZUFBUCxHQUF1QixjQUF2QixHQUFzQ0wsTUFBTU0sR0FBTixDQUFVLEtBQVYsQ0FGeEM7QUFHSEMsZ0NBQVEsSUFITDtBQUlIQywrQkFBT1QsSUFKSjtBQUtIVSxrQ0FBVSxNQUxQO0FBTUhDLCtCQUFPLGVBQUNDLEdBQUQsRUFBUztBQUNaLCtDQUFTQyxPQUFULENBQWlCLE9BQWpCLEVBQXlCLE1BQXpCLEVBQWdDRCxJQUFJRSxZQUFKLENBQWlCSCxLQUFqRDtBQUNILHlCQVJFO0FBU0hJLGlDQUFTLGlCQUFDSCxHQUFELEVBQVM7QUFDZCxnQ0FBSSxxQkFBRUksR0FBRixDQUFNSixHQUFOLEVBQVUsT0FBVixDQUFKLEVBQ0ksbUJBQVNDLE9BQVQsQ0FBaUIsT0FBakIsRUFBeUIsTUFBekIsRUFBZ0NELElBQUlELEtBQXBDLEVBREosS0FHSVQ7QUFDUDtBQWRFLHFCQUFQO0FBZ0JILGlCQWxCRDs7QUFvQkEsb0JBQUllLE9BQU8scUJBQUVDLEdBQUYsQ0FBTTFCLEVBQUUsMkNBQUYsQ0FBTixFQUFzRCxVQUFDMkIsT0FBRCxFQUFhO0FBQzFFLDJCQUFPQSxRQUFRQyxLQUFmO0FBQ0gsaUJBRlUsQ0FBWDs7QUFJSCxvQkFBSUMsYUFBYSwrQkFBb0I7QUFDcENDLDBCQUFPLEtBQUs5QixDQUFMLENBQU8sc0JBQVAsRUFBK0JDLEdBQS9CLEVBRDZCO0FBRXBDOEIsNEJBQVMsS0FBSy9CLENBQUwsQ0FBTyx3QkFBUCxFQUFpQ0MsR0FBakMsRUFGMkI7QUFHOUJ3QiwwQkFBTUE7QUFId0IsaUJBQXBCLENBQWpCO0FBS0FJLDJCQUFXRyxJQUFYLENBQWdCLElBQWhCLEVBQXFCO0FBQ2RiLDJCQUFPLGVBQUNWLEtBQUQsRUFBT1csR0FBUCxFQUFlO0FBQ2xCLDJDQUFTQyxPQUFULENBQWlCLE9BQWpCLEVBQXlCLE1BQXpCLEVBQWdDRCxJQUFJRSxZQUFKLENBQWlCSCxLQUFqRDtBQUNILHFCQUhhO0FBSWRJLDZCQUFTLGlCQUFDZCxLQUFELEVBQVFXLEdBQVIsRUFBZ0I7QUFDckIsNEJBQUksT0FBS3BCLENBQUwsQ0FBTyxzQkFBUCxFQUErQkMsR0FBL0IsRUFBSixFQUNJTSxXQUFXLE9BQUtQLENBQUwsQ0FBTyxzQkFBUCxDQUFYLEVBQTBDUyxLQUExQyxFQUFpRCxZQUFNO0FBQ25ELG1DQUFLd0IsS0FBTDtBQUNBLG1DQUFLQyxPQUFMO0FBQ0gseUJBSEQsRUFESixLQUtLO0FBQ0QsbUNBQUtELEtBQUw7QUFDQSxtQ0FBS0MsT0FBTDtBQUNIO0FBQ0o7QUFkYSxpQkFBckI7QUFnQkE7OztpREFFb0I7QUFDakIsb0JBQUlDLFdBQVcscUJBQUVDLElBQUYsQ0FBTyxLQUFLcEMsQ0FBTCxDQUFPLHNCQUFQLEVBQStCQyxHQUEvQixHQUFxQ29DLEtBQXJDLENBQTJDLElBQTNDLENBQVAsQ0FBZjtBQUNBckMsa0JBQUUsY0FBRixFQUFrQnNDLElBQWxCLENBQXVCLFlBQVVILFFBQWpDO0FBQ0FuQyxrQkFBRSxjQUFGLEVBQWtCRSxXQUFsQixDQUE4QixRQUE5QjtBQUNBLHFCQUFLcUMsS0FBTDtBQUNIOzs7Z0NBaEljO0FBQUUsdUJBQU8scUJBQUVDLFFBQUYsaUNBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxrQkFBUDtBQUEyQjs7O2dDQWN2QjtBQUN4Qix1QkFBTztBQUNOZiwwQkFBTyxpQkFBT0EsSUFEUjtBQUVOL0IsNkJBQVM7QUFGSCxpQkFBUDtBQUtHOzs7O01BekI2QixxQkFBVytDLFE7O3NCQXVJOUJoRCxtQiIsImZpbGUiOiJzdWJtaXNzaW9uX2lucHV0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDEgMTk6NTY6NDFcbiovXG5cbmltcG9ydCAnanF1ZXJ5JztcbmltcG9ydCAnaWZyYW1lVHJhbnNwb3J0JztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgQmFja2JvbmUsIHsgYWpheCB9IGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgU3VibWlzc2lvbk1vZGVsIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX21vZGVsJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3N1Ym1pc3Npb25faW5wdXRfdG1wbC5odG1sJztcblxuY2xhc3MgU3VibWlzc2lvbklucHV0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdzdWJtaXNzaW9uLWlucHV0JyB9XG5cbiAgICBldmVudHMoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgICAgICAgICAgJ2NsaWNrIC5zdWJtaXNzaW9uLWhlYWRsaW5lJyA6ICdmb2N1cycsXG4gICAgICAgICAgICAnbW91c2VsZWF2ZScgOiAndW5mb2N1cycsXG4gICAgICAgICAgICAnY2xpY2sgI3N1Ym1pdC1idXR0b24nIDogJ29uU3VibWl0QnV0dG9uQ2xpY2snLFxuICAgICAgICAgICAgJ2NoYW5nZSAjbmV3LXN1Ym1pc3Npb24tZmlsZScgOiAnb25GaWxlSW5wdXRDaGFuZ2VkJyxcbiAgICAgICAgICAgICdjbGljayAjdGFnLWRyb3Bkb3duJyA6ICdvblRhZ0Ryb3Bkb3duQ2xpY2snLFxuICAgICAgICAgICAgJ2NsaWNrIC50YWctZHJvcGRvd24tbGlzdCcgOiAncHJldmVudFByb3BhZ2F0aW9uJyxcbiAgICAgICAgICAgICdtb3VzZWxlYXZlIC50YWctZHJvcGRvd24tbGlzdCcgOiAnb25MZWF2ZURyb3Bkb3duJ1xuICAgIFx0fVxuICAgIH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRhZ3MgOiBDb25maWcudGFncyxcblx0XHRcdG9wdGlvbnM6ICc5OSdcblx0XHR9XG5cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cdFx0Ly9jb25zb2xlLmxvZyhvcHRpb25zKVxuXHRcdGNvbnNvbGUubG9nKCdpbml0Jyk7XG5cdFx0dGhpcy5wZW9zID0gJ2FzZGYnO1xuXHRcdFxuXHRcdC8vICQuYWpheCh7XG5cdFx0Ly8gXHRtZXRob2Q6ICdHRVQnLFxuXHRcdC8vIFx0dXJsOiAnYXBpL3N1Ym1pc3Npb25zL29wdGlvbnMnLFxuXHRcdC8vIFx0ZXJyb3I6IGZ1bmN0aW9uIGVycm9yKHJlcykge1xuXHRcdC8vIFx0XHRjb25zb2xlLmxvZygnZXJyb3InKTtcblx0XHQvLyBcdH0sXG5cdFx0Ly8gXHRzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlcykge1xuXHRcdC8vIFx0XHRTdWJtaXNzaW9uTW9kZWwuc2V0KHtvcHRpb25zOiByZXN9KTtcblx0XHQvLyBcdFx0U3VibWlzc2lvbk1vZGVsLnNhdmUoKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9KTtcblxuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgIFx0dGhpcy4kZWwuYWRkQ2xhc3MoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIHVuZm9jdXMoKSB7XG4gICAgXHRpZiAoIXRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLXRleHQnKS52YWwoKSAmJiAhdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tYXV0aG9yJykudmFsKCkgJiYgIXRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKS52YWwoKSlcbiAgICBcdFx0dGhpcy4kZWwucmVtb3ZlQ2xhc3MoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLiQoJyNuZXctc3VibWlzc2lvbi10ZXh0JykudmFsKCcnKTtcbiAgICAgICAgdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tYXV0aG9yJykudmFsKCcnKTtcbiAgICAgICAgdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tZmlsZScpLnZhbCgnJyk7XG4gICAgICAgICQoJyNhdHRhY2gtdGV4dCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cIm5ldy1zdWJtaXNzaW9uLXRhZ3NcIl06Y2hlY2tlZCcpLmF0dHIoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgb25UYWdEcm9wZG93bkNsaWNrKCkge1xuICAgICAgICB0aGlzLiQoJy50YWctZHJvcGRvd24tbGlzdCcpLnRvZ2dsZUNsYXNzKCdleHBhbmQnKTtcbiAgICB9XG5cbiAgICBvbkxlYXZlRHJvcGRvd24oKSB7XG4gICAgICAgIHRoaXMuJCgnLnRhZy1kcm9wZG93bi1saXN0JykucmVtb3ZlQ2xhc3MoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIHByZXZlbnRQcm9wYWdhdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvblN1Ym1pdEJ1dHRvbkNsaWNrKCkge1xuXG4gICAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICAgIHZhciB1cGxvYWRGaWxlID0gZnVuY3Rpb24oZmlsZSwgbW9kZWwsY2FsbGJhY2spIHtcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy53ZWJfc2VydmljZV91cmwrJ2ZpbGUvYXR0YWNoLycrbW9kZWwuZ2V0KCdfaWQnKSxcbiAgICAgICAgICAgICAgICBpZnJhbWU6IHRydWUsXG4gICAgICAgICAgICAgICAgZmlsZXM6IGZpbGUsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBlcnJvcjogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdlcnJvcicsJ2h0dHAnLHJlcy5yZXNwb25zZUpTT04uZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5oYXMocmVzLCdlcnJvcicpKVxuICAgICAgICAgICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlcignZXJyb3InLCdodHRwJyxyZXMuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0YWdzID0gXy5tYXAoJCgnaW5wdXRbbmFtZT1cIm5ldy1zdWJtaXNzaW9uLXRhZ3NcIl06Y2hlY2tlZCcpLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgXHR2YXIgc3VibWlzc2lvbiA9IG5ldyBTdWJtaXNzaW9uTW9kZWwoe1xuICAgIFx0XHR0ZXh0IDogdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tdGV4dCcpLnZhbCgpLFxuICAgIFx0XHRhdXRob3IgOiB0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1hdXRob3InKS52YWwoKSxcbiAgICAgICAgICAgIHRhZ3M6IHRhZ3NcbiAgICBcdH0pXG4gICAgXHRzdWJtaXNzaW9uLnNhdmUobnVsbCx7XG4gICAgICAgICAgICBlcnJvcjogKG1vZGVsLHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIoJ2Vycm9yJywnaHR0cCcscmVzLnJlc3BvbnNlSlNPTi5lcnJvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogKG1vZGVsLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tZmlsZScpLnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB1cGxvYWRGaWxlKHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWZpbGUnKSxtb2RlbCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25GaWxlSW5wdXRDaGFuZ2VkKCkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBfLmxhc3QodGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tZmlsZScpLnZhbCgpLnNwbGl0KFwiXFxcXFwiKSk7XG4gICAgICAgICQoJyNhdHRhY2gtdGV4dCcpLmh0bWwoJ0ltYWdlOiAnK2ZpbGVuYW1lKTtcbiAgICAgICAgJCgnI2F0dGFjaC10ZXh0JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uSW5wdXRWaWV3Il19