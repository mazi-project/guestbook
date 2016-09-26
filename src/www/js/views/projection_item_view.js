define(['exports', 'marionette', 'underscore', 'config', 'text!templates/projection_item_tmpl.html'], function (exports, _marionette, _underscore, _config, _projection_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-14 17:06:19
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _config2 = _interopRequireDefault(_config);

    var _projection_item_tmpl2 = _interopRequireDefault(_projection_item_tmpl);

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

    var BaseView = function (_Marionette$ItemView) {
        _inherits(BaseView, _Marionette$ItemView);

        function BaseView() {
            _classCallCheck(this, BaseView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseView).apply(this, arguments));
        }

        _createClass(BaseView, [{
            key: 'initialize',
            value: function initialize(options) {
                //listen to model events
                this.listenTo(this.model, 'change', this.render);

                //listen to socket events
                this.listenTo(Backbone, 'submission:changed', this.onSubmissionChanged);
            }
        }, {
            key: 'onRender',
            value: function onRender() {
                if (this.model.get('device') == "letterbox") this.$('.background').addClass("invert");
            }
        }, {
            key: 'getBackgroundImageString',
            value: function getBackgroundImageString() {
                var filesUrl = _config2.default.files_url + this.model.get('_id') + '/';
                var files = this.model.get('files');
                if (files.length > 0) return "style=\"background-image: url('" + filesUrl + files[0].name + "')\"";else return "";
            }
        }, {
            key: 'onSubmissionChanged',
            value: function onSubmissionChanged() {
                this.model.fetch();
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_projection_item_tmpl2.default);
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    backgroundImage: this.getBackgroundImageString()
                };
            }
        }]);

        return BaseView;
    }(_marionette2.default.ItemView);

    exports.default = BaseView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9wcm9qZWN0aW9uX2l0ZW1fdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWVNLFE7Ozs7Ozs7Ozs7O3VDQVlTLE8sRUFBUzs7QUFFaEIscUJBQUssUUFBTCxDQUFjLEtBQUssS0FBbkIsRUFBeUIsUUFBekIsRUFBa0MsS0FBSyxNQUF2Qzs7O0FBR0EscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsb0JBQXZCLEVBQTZDLEtBQUssbUJBQWxEO0FBQ0g7Ozt1Q0FFVTtBQUNQLG9CQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxRQUFmLEtBQTRCLFdBQWhDLEVBQ0ksS0FBSyxDQUFMLENBQU8sYUFBUCxFQUFzQixRQUF0QixDQUErQixRQUEvQjtBQUNQOzs7dURBRTBCO0FBQ3ZCLG9CQUFJLFdBQVcsaUJBQU8sU0FBUCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQyxHQUExRDtBQUNBLG9CQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLE9BQWYsQ0FBWjtBQUNBLG9CQUFJLE1BQU0sTUFBTixHQUFlLENBQW5CLEVBQ0ksT0FBTyxvQ0FBa0MsUUFBbEMsR0FBMkMsTUFBTSxDQUFOLEVBQVMsSUFBcEQsR0FBeUQsTUFBaEUsQ0FESixLQUdJLE9BQU8sRUFBUDtBQUNQOzs7a0RBRXFCO0FBQ2xCLHFCQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ0g7OztnQ0FqQ2M7QUFBRSx1QkFBTyxxQkFBRSxRQUFGLGdDQUFQO0FBQTZCOzs7Z0NBRXhCO0FBQ3RCLHVCQUFPO0FBQ0MscUNBQWtCLEtBQUssd0JBQUw7QUFEbkIsaUJBQVA7QUFHQzs7OztNQVRrQixxQkFBVyxROztzQkF3Q25CLFEiLCJmaWxlIjoicHJvamVjdGlvbl9pdGVtX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTc6MDY6MTlcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnXG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9wcm9qZWN0aW9uX2l0ZW1fdG1wbC5odG1sJztcblxuY2xhc3MgQmFzZVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgXHRnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuICBcdFx0cmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZSA6IHRoaXMuZ2V0QmFja2dyb3VuZEltYWdlU3RyaW5nKClcbiAgXHRcdH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIC8vbGlzdGVuIHRvIG1vZGVsIGV2ZW50c1xuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsJ2NoYW5nZScsdGhpcy5yZW5kZXIpO1xuXG4gICAgICAgIC8vbGlzdGVuIHRvIHNvY2tldCBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpjaGFuZ2VkJywgdGhpcy5vblN1Ym1pc3Npb25DaGFuZ2VkKTtcbiAgICB9XG5cbiAgICBvblJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0KCdkZXZpY2UnKSA9PSBcImxldHRlcmJveFwiKVxuICAgICAgICAgICAgdGhpcy4kKCcuYmFja2dyb3VuZCcpLmFkZENsYXNzKFwiaW52ZXJ0XCIpO1xuICAgIH1cblxuICAgIGdldEJhY2tncm91bmRJbWFnZVN0cmluZygpIHtcbiAgICAgICAgdmFyIGZpbGVzVXJsID0gQ29uZmlnLmZpbGVzX3VybCArIHRoaXMubW9kZWwuZ2V0KCdfaWQnKSArICcvJztcbiAgICAgICAgdmFyIGZpbGVzID0gdGhpcy5tb2RlbC5nZXQoJ2ZpbGVzJylcbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZXR1cm4gXCJzdHlsZT1cXFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCdcIitmaWxlc1VybCtmaWxlc1swXS5uYW1lK1wiJylcXFwiXCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIG9uU3VibWlzc2lvbkNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMubW9kZWwuZmV0Y2goKTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VWaWV3Il19