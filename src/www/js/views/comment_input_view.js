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

            return _possibleConstructorReturn(this, (CommentInputView.__proto__ || Object.getPrototypeOf(CommentInputView)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9jb21tZW50X2lucHV0X3ZpZXcuanMiXSwibmFtZXMiOlsiQ29tbWVudElucHV0VmlldyIsIm9wdGlvbnMiLCJzdWJtaXNzaW9uSWQiLCJzdGF0ZSIsImlzVW5kZWZpbmVkIiwic2V0U3RhdGUiLCJjb21tZW50IiwidGV4dCIsIiQiLCJ2YWwiLCJhdXRob3IiLCJzdWJtaXNzaW9uIiwic2F2ZSIsImVycm9yIiwibW9kZWwiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2VKU09OIiwiQmFja2JvbmUiLCJ0cmlnZ2VyIiwic3VjY2VzcyIsInJlbmRlciIsInRlbXBsYXRlIiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWFNQSxnQjs7Ozs7Ozs7Ozs7cUNBT087QUFDUix1QkFBTztBQUNOLGlEQUE4QjtBQUR4QixpQkFBUDtBQUdBOzs7dUNBR1VDLE8sRUFBUztBQUNuQixxQkFBS0MsWUFBTCxHQUFvQkQsUUFBUUMsWUFBNUI7QUFDQSxxQkFBS0MsS0FBTCxHQUFhRixRQUFRRSxLQUFyQjtBQUNBOzs7cUNBRVE7QUFDUixvQkFBSSxDQUFDLHFCQUFFQyxXQUFGLENBQWMsS0FBS0QsS0FBbkIsQ0FBTCxFQUFnQztBQUMvQix5QkFBS0UsUUFBTCxDQUFjLEtBQUtGLEtBQW5CO0FBQ0E7QUFDRDs7O3NEQUV5QjtBQUFBOztBQUV6QixvQkFBSUcsVUFBVSw0QkFBaUI7QUFDOUJDLDBCQUFPLEtBQUtDLENBQUwsQ0FBTyxtQkFBUCxFQUE0QkMsR0FBNUIsRUFEdUI7QUFFOUJDLDRCQUFTLEtBQUtGLENBQUwsQ0FBTyxxQkFBUCxFQUE4QkMsR0FBOUIsRUFGcUI7QUFHOUJFLGdDQUFZLEtBQUtUO0FBSGEsaUJBQWpCLENBQWQ7QUFLQUksd0JBQVFNLElBQVIsQ0FBYSxJQUFiLEVBQWtCO0FBQ1hDLDJCQUFPLGVBQUNDLEtBQUQsRUFBUUMsR0FBUixFQUFnQjtBQUNuQkMsZ0NBQVFDLEdBQVIsQ0FBWUYsSUFBSUcsWUFBaEI7QUFDQUMsaUNBQVNDLE9BQVQsQ0FBaUIsT0FBakIsRUFBeUIsTUFBekIsRUFBZ0NMLElBQUlHLFlBQUosQ0FBaUJMLEtBQWpEO0FBQ0gscUJBSlU7QUFLWFEsNkJBQVMsbUJBQU07QUFDZCwrQkFBS0MsTUFBTDtBQUNBO0FBUFUsaUJBQWxCO0FBU0E7Ozt1Q0FFVTtBQUNWLHVCQUFPO0FBQ05mLDBCQUFNLEtBQUtDLENBQUwsQ0FBTyxtQkFBUCxFQUE0QkMsR0FBNUIsRUFEQTtBQUVOQyw0QkFBUSxLQUFLRixDQUFMLENBQU8scUJBQVAsRUFBOEJDLEdBQTlCO0FBRkYsaUJBQVA7QUFJQTs7O3FDQUVRTixLLEVBQU87QUFDZixxQkFBS0ssQ0FBTCxDQUFPLG1CQUFQLEVBQTRCQyxHQUE1QixDQUFnQ04sTUFBTUksSUFBdEM7QUFDQSxxQkFBS0MsQ0FBTCxDQUFPLHFCQUFQLEVBQThCQyxHQUE5QixDQUFrQ04sTUFBTU8sTUFBeEM7QUFDQTs7O2dDQWxEYztBQUFFLHVCQUFPLHFCQUFFYSxRQUFGLDhCQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sWUFBUDtBQUFxQjs7OztNQUxaLHFCQUFXQyxROztzQkF5RDNCeEIsZ0IiLCJmaWxlIjoiY29tbWVudF9pbnB1dF92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA1LTMwIDE2OjUzOjAzXG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJ1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBDb21tZW50TW9kZWwgZnJvbSAnbW9kZWxzL2NvbW1lbnRfbW9kZWwnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvY29tbWVudF9pbnB1dF90bXBsLmh0bWwnO1xuXG5jbGFzcyBDb21tZW50SW5wdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2lucHV0LXZpZXcnIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdCdjbGljayAjbmV3LWNvbW1lbnQtYnV0dG9uJyA6ICdvbk5ld0NvbW1lbnRCdXR0b25DbGljaydcbiAgICBcdH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgXHR0aGlzLnN1Ym1pc3Npb25JZCA9IG9wdGlvbnMuc3VibWlzc2lvbklkO1xuICAgIFx0dGhpcy5zdGF0ZSA9IG9wdGlvbnMuc3RhdGVcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgXHRpZiAoIV8uaXNVbmRlZmluZWQodGhpcy5zdGF0ZSkpIHtcbiAgICBcdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcbiAgICBcdH1cbiAgICB9XG5cbiAgICBvbk5ld0NvbW1lbnRCdXR0b25DbGljaygpIHtcblxuICAgIFx0dmFyIGNvbW1lbnQgPSBuZXcgQ29tbWVudE1vZGVsKHtcbiAgICBcdFx0dGV4dCA6IHRoaXMuJCgnI25ldy1jb21tZW50LXRleHQnKS52YWwoKSxcbiAgICBcdFx0YXV0aG9yIDogdGhpcy4kKCcjbmV3LWNvbW1lbnQtYXV0aG9yJykudmFsKCksXG4gICAgXHRcdHN1Ym1pc3Npb246IHRoaXMuc3VibWlzc2lvbklkXG4gICAgXHR9KVxuICAgIFx0Y29tbWVudC5zYXZlKG51bGwse1xuICAgICAgICAgICAgZXJyb3I6IChtb2RlbCwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlcignZXJyb3InLCdodHRwJyxyZXMucmVzcG9uc2VKU09OLmVycm9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICBcdHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFN0YXRlKCkge1xuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0dGV4dDogdGhpcy4kKCcjbmV3LWNvbW1lbnQtdGV4dCcpLnZhbCgpLFxuICAgIFx0XHRhdXRob3I6IHRoaXMuJCgnI25ldy1jb21tZW50LWF1dGhvcicpLnZhbCgpXG4gICAgXHR9XG4gICAgfVxuXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICBcdHRoaXMuJCgnI25ldy1jb21tZW50LXRleHQnKS52YWwoc3RhdGUudGV4dCk7XG4gICAgXHR0aGlzLiQoJyNuZXctY29tbWVudC1hdXRob3InKS52YWwoc3RhdGUuYXV0aG9yKVxuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudElucHV0VmlldyJdfQ==