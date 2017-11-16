define(['exports', 'marionette', 'underscore', 'models/tag_collection', 'views/tag_item_view'], function (exports, _marionette, _underscore, _tag_collection, _tag_item_view) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-05-17 11:17:50
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _tag_collection2 = _interopRequireDefault(_tag_collection);

    var _tag_item_view2 = _interopRequireDefault(_tag_item_view);

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

    var TagListView = function (_Marionette$Collectio) {
        _inherits(TagListView, _Marionette$Collectio);

        function TagListView() {
            _classCallCheck(this, TagListView);

            return _possibleConstructorReturn(this, (TagListView.__proto__ || Object.getPrototypeOf(TagListView)).apply(this, arguments));
        }

        _createClass(TagListView, [{
            key: 'initialize',
            value: function initialize(options) {

                this.collection = new _tag_collection2.default();
                this.collection.fetch();

                // setup collection events
                this.listenTo(this.collection, 'sync', this.onCollectionLoaded);

                if (_underscore2.default.has(options, 'tag')) {
                    this.setTag(options.tag);
                }
            }
        }, {
            key: 'setTag',
            value: function setTag(tag) {
                var _this2 = this;

                this.tag = tag;
                this.children.each(function (childView) {
                    if (childView.model.get('name') == _this2.tag) childView.setSelected(true);else childView.setSelected(false);
                });
            }
        }, {
            key: 'onCollectionLoaded',
            value: function onCollectionLoaded() {
                this.setTag(this.tag);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'tag-list';
            }
        }, {
            key: 'tagName',
            get: function get() {
                return 'ul';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _tag_item_view2.default;
            }
        }]);

        return TagListView;
    }(_marionette2.default.CollectionView);

    exports.default = TagListView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbIlRhZ0xpc3RWaWV3Iiwib3B0aW9ucyIsImNvbGxlY3Rpb24iLCJmZXRjaCIsImxpc3RlblRvIiwib25Db2xsZWN0aW9uTG9hZGVkIiwiaGFzIiwic2V0VGFnIiwidGFnIiwiY2hpbGRyZW4iLCJlYWNoIiwiY2hpbGRWaWV3IiwibW9kZWwiLCJnZXQiLCJzZXRTZWxlY3RlZCIsIkNvbGxlY3Rpb25WaWV3Il0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFZTUEsVzs7Ozs7Ozs7Ozs7dUNBWVNDLE8sRUFBUzs7QUFFaEIscUJBQUtDLFVBQUwsR0FBa0IsOEJBQWxCO0FBQ0EscUJBQUtBLFVBQUwsQ0FBZ0JDLEtBQWhCOztBQUVBO0FBQ0EscUJBQUtDLFFBQUwsQ0FBYyxLQUFLRixVQUFuQixFQUE4QixNQUE5QixFQUFxQyxLQUFLRyxrQkFBMUM7O0FBRUEsb0JBQUkscUJBQUVDLEdBQUYsQ0FBTUwsT0FBTixFQUFjLEtBQWQsQ0FBSixFQUEwQjtBQUN0Qix5QkFBS00sTUFBTCxDQUFZTixRQUFRTyxHQUFwQjtBQUNIO0FBQ0o7OzttQ0FFTUEsRyxFQUFLO0FBQUE7O0FBQ1gscUJBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBLHFCQUFLQyxRQUFMLENBQWNDLElBQWQsQ0FBb0IsVUFBQ0MsU0FBRCxFQUFlO0FBQ2xDLHdCQUFJQSxVQUFVQyxLQUFWLENBQWdCQyxHQUFoQixDQUFvQixNQUFwQixLQUErQixPQUFLTCxHQUF4QyxFQUNDRyxVQUFVRyxXQUFWLENBQXNCLElBQXRCLEVBREQsS0FHQ0gsVUFBVUcsV0FBVixDQUFzQixLQUF0QjtBQUNELGlCQUxEO0FBTUE7OztpREFFb0I7QUFDcEIscUJBQUtQLE1BQUwsQ0FBWSxLQUFLQyxHQUFqQjtBQUNBOzs7Z0NBakNlO0FBQUUsdUJBQU8sVUFBUDtBQUFtQjs7O2dDQUV2QjtBQUFFLHVCQUFPLElBQVA7QUFBYTs7O2dDQUViO0FBQUU7QUFBb0I7Ozs7TUFSaEIscUJBQVdPLGM7O3NCQXdDdEJmLFciLCJmaWxlIjoidGFnX2xpc3Rfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNS0xNyAxMToxNzo1MFxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBUYWdDb2xsZWN0aW9uIGZyb20gJ21vZGVscy90YWdfY29sbGVjdGlvbic7XG5pbXBvcnQgVGFnSXRlbVZpZXcgZnJvbSAndmlld3MvdGFnX2l0ZW1fdmlldydcblxuY2xhc3MgVGFnTGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3RhZy1saXN0JyB9XG5cbiAgICBnZXQgdGFnTmFtZSgpIHsgcmV0dXJuICd1bCcgfVxuXG4gICAgZ2V0IGNoaWxkVmlldygpIHsgcmV0dXJuIFRhZ0l0ZW1WaWV3IH1cblxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IG5ldyBUYWdDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5mZXRjaCgpO1xuXG4gICAgICAgIC8vIHNldHVwIGNvbGxlY3Rpb24gZXZlbnRzXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdzeW5jJyx0aGlzLm9uQ29sbGVjdGlvbkxvYWRlZClcblxuICAgICAgICBpZiAoXy5oYXMob3B0aW9ucywndGFnJykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGFnKG9wdGlvbnMudGFnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFRhZyh0YWcpIHtcbiAgICBcdHRoaXMudGFnID0gdGFnO1xuICAgIFx0dGhpcy5jaGlsZHJlbi5lYWNoKCAoY2hpbGRWaWV3KSA9PiB7XG4gICAgXHRcdGlmIChjaGlsZFZpZXcubW9kZWwuZ2V0KCduYW1lJykgPT0gdGhpcy50YWcpXG4gICAgXHRcdFx0Y2hpbGRWaWV3LnNldFNlbGVjdGVkKHRydWUpO1xuICAgIFx0XHRlbHNlXG4gICAgXHRcdFx0Y2hpbGRWaWV3LnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICBcdH0pO1xuICAgIH1cblxuICAgIG9uQ29sbGVjdGlvbkxvYWRlZCgpIHtcbiAgICBcdHRoaXMuc2V0VGFnKHRoaXMudGFnKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFnTGlzdFZpZXciXX0=