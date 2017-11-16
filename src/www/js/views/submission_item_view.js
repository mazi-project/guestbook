define(['exports', 'marionette', 'backbone', 'underscore', 'underscoreString', 'jquery', 'moment', 'config', 'models/comment_model', 'text!templates/submission_item_tmpl.html', 'moment_en_gb'], function (exports, _marionette, _backbone, _underscore, _underscoreString, _jquery, _moment, _config, _comment_model, _submission_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-01 16:56:56
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _backbone2 = _interopRequireDefault(_backbone);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _underscoreString2 = _interopRequireDefault(_underscoreString);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _moment2 = _interopRequireDefault(_moment);

    var _config2 = _interopRequireDefault(_config);

    var _comment_model2 = _interopRequireDefault(_comment_model);

    var _submission_item_tmpl2 = _interopRequireDefault(_submission_item_tmpl);

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

    var SubmissionItemView = function (_Marionette$ItemView) {
        _inherits(SubmissionItemView, _Marionette$ItemView);

        function SubmissionItemView() {
            _classCallCheck(this, SubmissionItemView);

            return _possibleConstructorReturn(this, (SubmissionItemView.__proto__ || Object.getPrototypeOf(SubmissionItemView)).apply(this, arguments));
        }

        _createClass(SubmissionItemView, [{
            key: 'events',
            value: function events() {
                return {
                    'click': 'onClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {
                //console.log(this.model);
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                window.location.hash = '#submission/' + this.model.get('_id');
                e.preventDefault();
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_submission_item_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'item-view card';
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    filesUrl: _config2.default.files_url + this.model.get('_id') + '/',
                    isAdmin: false,
                    text_truncated: _underscoreString2.default.truncate(this.model.get('text'), _config2.default.stringTruncateShort, '...'),
                    fromNow: function fromNow(date) {
                        return (0, _moment2.default)(date).fromNow();
                    }
                };
            }
        }, {
            key: 'modelEvents',
            get: function get() {
                return {
                    'change': 'render'
                };
            }
        }]);

        return SubmissionItemView;
    }(_marionette2.default.ItemView);

    exports.default = SubmissionItemView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2l0ZW1fdmlldy5qcyJdLCJuYW1lcyI6WyJTdWJtaXNzaW9uSXRlbVZpZXciLCJvcHRpb25zIiwiZSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaGFzaCIsIm1vZGVsIiwiZ2V0IiwicHJldmVudERlZmF1bHQiLCJ0ZW1wbGF0ZSIsImZpbGVzVXJsIiwiZmlsZXNfdXJsIiwiaXNBZG1pbiIsInRleHRfdHJ1bmNhdGVkIiwidHJ1bmNhdGUiLCJzdHJpbmdUcnVuY2F0ZVNob3J0IiwiZnJvbU5vdyIsImRhdGUiLCJJdGVtVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW1CTUEsa0I7Ozs7Ozs7Ozs7O3FDQXlCTztBQUNMLHVCQUFPO0FBQ0gsNkJBQVU7QUFEUCxpQkFBUDtBQUdIOzs7dUNBR1VDLE8sRUFBUztBQUNoQjtBQUNIOzs7b0NBRU9DLEMsRUFBRztBQUNQQyx1QkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUIsaUJBQWUsS0FBS0MsS0FBTCxDQUFXQyxHQUFYLENBQWUsS0FBZixDQUF0QztBQUNBTCxrQkFBRU0sY0FBRjtBQUNIOzs7Z0NBcENjO0FBQUUsdUJBQU8scUJBQUVDLFFBQUYsZ0NBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxnQkFBUDtBQUF5Qjs7O2dDQUVyQjtBQUN4Qix1QkFBTztBQUNOQyw4QkFBVyxpQkFBT0MsU0FBUCxHQUFtQixLQUFLTCxLQUFMLENBQVdDLEdBQVgsQ0FBZSxLQUFmLENBQW5CLEdBQTJDLEdBRGhEO0FBRUdLLDZCQUFVLEtBRmI7QUFHR0Msb0NBQWlCLDJCQUFLQyxRQUFMLENBQWMsS0FBS1IsS0FBTCxDQUFXQyxHQUFYLENBQWUsTUFBZixDQUFkLEVBQXFDLGlCQUFPUSxtQkFBNUMsRUFBZ0UsS0FBaEUsQ0FIcEI7QUFJR0MsNkJBQVMsaUJBQVNDLElBQVQsRUFBZTtBQUNwQiwrQkFBTyxzQkFBT0EsSUFBUCxFQUFhRCxPQUFiLEVBQVA7QUFDSDtBQU5KLGlCQUFQO0FBUUc7OztnQ0FFaUI7QUFDZCx1QkFBTztBQUNILDhCQUFXO0FBRFIsaUJBQVA7QUFHSDs7OztNQXRCNEIscUJBQVdFLFE7O3NCQTJDN0JsQixrQiIsImZpbGUiOiJzdWJtaXNzaW9uX2l0ZW1fdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wMSAxNjo1Njo1NlxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgX3N0ciBmcm9tICd1bmRlcnNjb3JlU3RyaW5nJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgTW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgJ21vbWVudF9lbl9nYic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgQ29tbWVudE1vZGVsIGZyb20gJ21vZGVscy9jb21tZW50X21vZGVsJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3N1Ym1pc3Npb25faXRlbV90bXBsLmh0bWwnO1xuXG5jbGFzcyBTdWJtaXNzaW9uSXRlbVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICAgZ2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdpdGVtLXZpZXcgY2FyZCcgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZmlsZXNVcmwgOiBDb25maWcuZmlsZXNfdXJsICsgdGhpcy5tb2RlbC5nZXQoJ19pZCcpICsgJy8nLFxuICAgICAgICAgICAgaXNBZG1pbiA6IGZhbHNlLFxuICAgICAgICAgICAgdGV4dF90cnVuY2F0ZWQgOiBfc3RyLnRydW5jYXRlKHRoaXMubW9kZWwuZ2V0KCd0ZXh0JyksQ29uZmlnLnN0cmluZ1RydW5jYXRlU2hvcnQsJy4uLicpLFxuICAgICAgICAgICAgZnJvbU5vdzogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNb21lbnQoZGF0ZSkuZnJvbU5vdygpOyBcbiAgICAgICAgICAgIH1cblx0XHR9XG4gICAgfVxuXG4gICAgZ2V0IG1vZGVsRXZlbnRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2NoYW5nZScgOiAncmVuZGVyJ1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBldmVudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2xpY2snIDogJ29uQ2xpY2snXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgb25DbGljayhlKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyNzdWJtaXNzaW9uLycrdGhpcy5tb2RlbC5nZXQoJ19pZCcpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1Ym1pc3Npb25JdGVtVmlldzsiXX0=