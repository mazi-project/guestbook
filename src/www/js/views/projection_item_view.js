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

            return _possibleConstructorReturn(this, (BaseView.__proto__ || Object.getPrototypeOf(BaseView)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9wcm9qZWN0aW9uX2l0ZW1fdmlldy5qcyJdLCJuYW1lcyI6WyJCYXNlVmlldyIsIm9wdGlvbnMiLCJsaXN0ZW5UbyIsIm1vZGVsIiwicmVuZGVyIiwiQmFja2JvbmUiLCJvblN1Ym1pc3Npb25DaGFuZ2VkIiwiZ2V0IiwiJCIsImFkZENsYXNzIiwiZmlsZXNVcmwiLCJmaWxlc191cmwiLCJmaWxlcyIsImxlbmd0aCIsIm5hbWUiLCJmZXRjaCIsInRlbXBsYXRlIiwiYmFja2dyb3VuZEltYWdlIiwiZ2V0QmFja2dyb3VuZEltYWdlU3RyaW5nIiwiSXRlbVZpZXciXSwibWFwcGluZ3MiOiI7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWFNQSxROzs7Ozs7Ozs7Ozt1Q0FZU0MsTyxFQUFTO0FBQ2hCO0FBQ0EscUJBQUtDLFFBQUwsQ0FBYyxLQUFLQyxLQUFuQixFQUF5QixRQUF6QixFQUFrQyxLQUFLQyxNQUF2Qzs7QUFFQTtBQUNBLHFCQUFLRixRQUFMLENBQWNHLFFBQWQsRUFBdUIsb0JBQXZCLEVBQTZDLEtBQUtDLG1CQUFsRDtBQUNIOzs7dUNBRVU7QUFDUCxvQkFBSSxLQUFLSCxLQUFMLENBQVdJLEdBQVgsQ0FBZSxRQUFmLEtBQTRCLFdBQWhDLEVBQ0ksS0FBS0MsQ0FBTCxDQUFPLGFBQVAsRUFBc0JDLFFBQXRCLENBQStCLFFBQS9CO0FBQ1A7Ozt1REFFMEI7QUFDdkIsb0JBQUlDLFdBQVcsaUJBQU9DLFNBQVAsR0FBbUIsS0FBS1IsS0FBTCxDQUFXSSxHQUFYLENBQWUsS0FBZixDQUFuQixHQUEyQyxHQUExRDtBQUNBLG9CQUFJSyxRQUFRLEtBQUtULEtBQUwsQ0FBV0ksR0FBWCxDQUFlLE9BQWYsQ0FBWjtBQUNBLG9CQUFJSyxNQUFNQyxNQUFOLEdBQWUsQ0FBbkIsRUFDSSxPQUFPLG9DQUFrQ0gsUUFBbEMsR0FBMkNFLE1BQU0sQ0FBTixFQUFTRSxJQUFwRCxHQUF5RCxNQUFoRSxDQURKLEtBR0ksT0FBTyxFQUFQO0FBQ1A7OztrREFFcUI7QUFDbEIscUJBQUtYLEtBQUwsQ0FBV1ksS0FBWDtBQUNIOzs7Z0NBakNjO0FBQUUsdUJBQU8scUJBQUVDLFFBQUYsZ0NBQVA7QUFBNkI7OztnQ0FFeEI7QUFDdEIsdUJBQU87QUFDQ0MscUNBQWtCLEtBQUtDLHdCQUFMO0FBRG5CLGlCQUFQO0FBR0M7Ozs7TUFUa0IscUJBQVdDLFE7O3NCQXdDbkJuQixRIiwiZmlsZSI6InByb2plY3Rpb25faXRlbV92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE0IDE3OjA2OjE5XG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJ1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJ1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvcHJvamVjdGlvbl9pdGVtX3RtcGwuaHRtbCc7XG5cbmNsYXNzIEJhc2VWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgIFx0Z2V0IHRlbXBsYXRlSGVscGVycygpIHtcbiAgXHRcdHJldHVybiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2UgOiB0aGlzLmdldEJhY2tncm91bmRJbWFnZVN0cmluZygpXG4gIFx0XHR9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgICAgICAvL2xpc3RlbiB0byBtb2RlbCBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCdjaGFuZ2UnLHRoaXMucmVuZGVyKTtcblxuICAgICAgICAvL2xpc3RlbiB0byBzb2NrZXQgZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ3N1Ym1pc3Npb246Y2hhbmdlZCcsIHRoaXMub25TdWJtaXNzaW9uQ2hhbmdlZCk7XG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmdldCgnZGV2aWNlJykgPT0gXCJsZXR0ZXJib3hcIilcbiAgICAgICAgICAgIHRoaXMuJCgnLmJhY2tncm91bmQnKS5hZGRDbGFzcyhcImludmVydFwiKTtcbiAgICB9XG5cbiAgICBnZXRCYWNrZ3JvdW5kSW1hZ2VTdHJpbmcoKSB7XG4gICAgICAgIHZhciBmaWxlc1VybCA9IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLyc7XG4gICAgICAgIHZhciBmaWxlcyA9IHRoaXMubW9kZWwuZ2V0KCdmaWxlcycpXG4gICAgICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmV0dXJuIFwic3R5bGU9XFxcImJhY2tncm91bmQtaW1hZ2U6IHVybCgnXCIrZmlsZXNVcmwrZmlsZXNbMF0ubmFtZStcIicpXFxcIlwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICBvblN1Ym1pc3Npb25DaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLm1vZGVsLmZldGNoKCk7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlVmlldyJdfQ==