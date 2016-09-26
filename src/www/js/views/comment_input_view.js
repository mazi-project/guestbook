define(['exports', 'marionette', 'underscore', 'models/comment_model', 'text!templates/comment_input_tmpl.html'], function (exports, _marionette, _underscore, _comment_model, _comment_input_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-05-30 16:53:03
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _comment_model2 = _interopRequireDefault(_comment_model);

    var _comment_input_tmpl2 = _interopRequireDefault(_comment_input_tmpl);

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

    var CommentInputView = function (_Marionette$ItemView) {
        _inherits(CommentInputView, _Marionette$ItemView);

        function CommentInputView() {
            _classCallCheck(this, CommentInputView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(CommentInputView).apply(this, arguments));
        }

        _createClass(CommentInputView, [{
            key: 'events',
            value: function events() {
                return {
                    'click #new-comment-button': 'onNewCommentButtonClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {
                this.submissionId = options.submissionId;
                this.state = options.state;
            }
        }, {
            key: 'onShow',
            value: function onShow() {
                if (!_underscore2.default.isUndefined(this.state)) {
                    this.setState(this.state);
                }
            }
        }, {
            key: 'onNewCommentButtonClick',
            value: function onNewCommentButtonClick() {
                var _this2 = this;

                var comment = new _comment_model2.default({
                    text: this.$('#new-comment-text').val(),
                    author: this.$('#new-comment-author').val(),
                    submission: this.submissionId
                });
                comment.save(null, {
                    error: function error(model, res) {
                        console.log(res.responseJSON);
                        Backbone.trigger('error', 'http', res.responseJSON.error);
                    },
                    success: function success() {
                        _this2.render();
                    }
                });
            }
        }, {
            key: 'getState',
            value: function getState() {
                return {
                    text: this.$('#new-comment-text').val(),
                    author: this.$('#new-comment-author').val()
                };
            }
        }, {
            key: 'setState',
            value: function setState(state) {
                this.$('#new-comment-text').val(state.text);
                this.$('#new-comment-author').val(state.author);
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_comment_input_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'input-view';
            }
        }]);

        return CommentInputView;
    }(_marionette2.default.ItemView);

    exports.default = CommentInputView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9jb21tZW50X2lucHV0X3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFlTSxnQjs7Ozs7Ozs7Ozs7cUNBT087QUFDUix1QkFBTztBQUNOLGlEQUE4QjtBQUR4QixpQkFBUDtBQUdBOzs7dUNBR1UsTyxFQUFTO0FBQ25CLHFCQUFLLFlBQUwsR0FBb0IsUUFBUSxZQUE1QjtBQUNBLHFCQUFLLEtBQUwsR0FBYSxRQUFRLEtBQXJCO0FBQ0E7OztxQ0FFUTtBQUNSLG9CQUFJLENBQUMscUJBQUUsV0FBRixDQUFjLEtBQUssS0FBbkIsQ0FBTCxFQUFnQztBQUMvQix5QkFBSyxRQUFMLENBQWMsS0FBSyxLQUFuQjtBQUNBO0FBQ0Q7OztzREFFeUI7QUFBQTs7QUFFekIsb0JBQUksVUFBVSw0QkFBaUI7QUFDOUIsMEJBQU8sS0FBSyxDQUFMLENBQU8sbUJBQVAsRUFBNEIsR0FBNUIsRUFEdUI7QUFFOUIsNEJBQVMsS0FBSyxDQUFMLENBQU8scUJBQVAsRUFBOEIsR0FBOUIsRUFGcUI7QUFHOUIsZ0NBQVksS0FBSztBQUhhLGlCQUFqQixDQUFkO0FBS0Esd0JBQVEsSUFBUixDQUFhLElBQWIsRUFBa0I7QUFDWCwyQkFBTyxlQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWdCO0FBQ25CLGdDQUFRLEdBQVIsQ0FBWSxJQUFJLFlBQWhCO0FBQ0EsaUNBQVMsT0FBVCxDQUFpQixPQUFqQixFQUF5QixNQUF6QixFQUFnQyxJQUFJLFlBQUosQ0FBaUIsS0FBakQ7QUFDSCxxQkFKVTtBQUtYLDZCQUFTLG1CQUFNO0FBQ2QsK0JBQUssTUFBTDtBQUNBO0FBUFUsaUJBQWxCO0FBU0E7Ozt1Q0FFVTtBQUNWLHVCQUFPO0FBQ04sMEJBQU0sS0FBSyxDQUFMLENBQU8sbUJBQVAsRUFBNEIsR0FBNUIsRUFEQTtBQUVOLDRCQUFRLEtBQUssQ0FBTCxDQUFPLHFCQUFQLEVBQThCLEdBQTlCO0FBRkYsaUJBQVA7QUFJQTs7O3FDQUVRLEssRUFBTztBQUNmLHFCQUFLLENBQUwsQ0FBTyxtQkFBUCxFQUE0QixHQUE1QixDQUFnQyxNQUFNLElBQXRDO0FBQ0EscUJBQUssQ0FBTCxDQUFPLHFCQUFQLEVBQThCLEdBQTlCLENBQWtDLE1BQU0sTUFBeEM7QUFDQTs7O2dDQWxEYztBQUFFLHVCQUFPLHFCQUFFLFFBQUYsOEJBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxZQUFQO0FBQXFCOzs7O01BTFoscUJBQVcsUTs7c0JBeUQzQixnQiIsImZpbGUiOiJjb21tZW50X2lucHV0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDUtMzAgMTY6NTM6MDNcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IENvbW1lbnRNb2RlbCBmcm9tICdtb2RlbHMvY29tbWVudF9tb2RlbCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9jb21tZW50X2lucHV0X3RtcGwuaHRtbCc7XG5cbmNsYXNzIENvbW1lbnRJbnB1dFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnaW5wdXQtdmlldycgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0J2NsaWNrICNuZXctY29tbWVudC1idXR0b24nIDogJ29uTmV3Q29tbWVudEJ1dHRvbkNsaWNrJ1xuICAgIFx0fVxuICAgIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICBcdHRoaXMuc3VibWlzc2lvbklkID0gb3B0aW9ucy5zdWJtaXNzaW9uSWQ7XG4gICAgXHR0aGlzLnN0YXRlID0gb3B0aW9ucy5zdGF0ZVxuICAgIH1cblxuICAgIG9uU2hvdygpIHtcbiAgICBcdGlmICghXy5pc1VuZGVmaW5lZCh0aGlzLnN0YXRlKSkge1xuICAgIFx0XHR0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xuICAgIFx0fVxuICAgIH1cblxuICAgIG9uTmV3Q29tbWVudEJ1dHRvbkNsaWNrKCkge1xuXG4gICAgXHR2YXIgY29tbWVudCA9IG5ldyBDb21tZW50TW9kZWwoe1xuICAgIFx0XHR0ZXh0IDogdGhpcy4kKCcjbmV3LWNvbW1lbnQtdGV4dCcpLnZhbCgpLFxuICAgIFx0XHRhdXRob3IgOiB0aGlzLiQoJyNuZXctY29tbWVudC1hdXRob3InKS52YWwoKSxcbiAgICBcdFx0c3VibWlzc2lvbjogdGhpcy5zdWJtaXNzaW9uSWRcbiAgICBcdH0pXG4gICAgXHRjb21tZW50LnNhdmUobnVsbCx7XG4gICAgICAgICAgICBlcnJvcjogKG1vZGVsLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMucmVzcG9uc2VKU09OKTtcbiAgICAgICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdlcnJvcicsJ2h0dHAnLHJlcy5yZXNwb25zZUpTT04uZXJyb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgIFx0dGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHR0ZXh0OiB0aGlzLiQoJyNuZXctY29tbWVudC10ZXh0JykudmFsKCksXG4gICAgXHRcdGF1dGhvcjogdGhpcy4kKCcjbmV3LWNvbW1lbnQtYXV0aG9yJykudmFsKClcbiAgICBcdH1cbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIFx0dGhpcy4kKCcjbmV3LWNvbW1lbnQtdGV4dCcpLnZhbChzdGF0ZS50ZXh0KTtcbiAgICBcdHRoaXMuJCgnI25ldy1jb21tZW50LWF1dGhvcicpLnZhbChzdGF0ZS5hdXRob3IpXG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tZW50SW5wdXRWaWV3Il19