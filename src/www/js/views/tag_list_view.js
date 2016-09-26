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

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TagListView).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWdfbGlzdF92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBY00sVzs7Ozs7Ozs7Ozs7dUNBWVMsTyxFQUFTOztBQUVoQixxQkFBSyxVQUFMLEdBQWtCLDhCQUFsQjtBQUNBLHFCQUFLLFVBQUwsQ0FBZ0IsS0FBaEI7OztBQUdBLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLFVBQW5CLEVBQThCLE1BQTlCLEVBQXFDLEtBQUssa0JBQTFDOztBQUVBLG9CQUFJLHFCQUFFLEdBQUYsQ0FBTSxPQUFOLEVBQWMsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLHlCQUFLLE1BQUwsQ0FBWSxRQUFRLEdBQXBCO0FBQ0g7QUFDSjs7O21DQUVNLEcsRUFBSztBQUFBOztBQUNYLHFCQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EscUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBb0IsVUFBQyxTQUFELEVBQWU7QUFDbEMsd0JBQUksVUFBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLE1BQXBCLEtBQStCLE9BQUssR0FBeEMsRUFDQyxVQUFVLFdBQVYsQ0FBc0IsSUFBdEIsRUFERCxLQUdDLFVBQVUsV0FBVixDQUFzQixLQUF0QjtBQUNELGlCQUxEO0FBTUE7OztpREFFb0I7QUFDcEIscUJBQUssTUFBTCxDQUFZLEtBQUssR0FBakI7QUFDQTs7O2dDQWpDZTtBQUFFLHVCQUFPLFVBQVA7QUFBbUI7OztnQ0FFdkI7QUFBRSx1QkFBTyxJQUFQO0FBQWE7OztnQ0FFYjtBQUFFO0FBQW9COzs7O01BUmhCLHFCQUFXLGM7O3NCQXdDdEIsVyIsImZpbGUiOiJ0YWdfbGlzdF92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA1LTE3IDExOjE3OjUwXG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IFRhZ0NvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL3RhZ19jb2xsZWN0aW9uJztcbmltcG9ydCBUYWdJdGVtVmlldyBmcm9tICd2aWV3cy90YWdfaXRlbV92aWV3J1xuXG5jbGFzcyBUYWdMaXN0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAndGFnLWxpc3QnIH1cblxuICAgIGdldCB0YWdOYW1lKCkgeyByZXR1cm4gJ3VsJyB9XG5cbiAgICBnZXQgY2hpbGRWaWV3KCkgeyByZXR1cm4gVGFnSXRlbVZpZXcgfVxuXG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gbmV3IFRhZ0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmZldGNoKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY29sbGVjdGlvbiBldmVudHNcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ3N5bmMnLHRoaXMub25Db2xsZWN0aW9uTG9hZGVkKVxuXG4gICAgICAgIGlmIChfLmhhcyhvcHRpb25zLCd0YWcnKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRUYWcob3B0aW9ucy50YWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VGFnKHRhZykge1xuICAgIFx0dGhpcy50YWcgPSB0YWc7XG4gICAgXHR0aGlzLmNoaWxkcmVuLmVhY2goIChjaGlsZFZpZXcpID0+IHtcbiAgICBcdFx0aWYgKGNoaWxkVmlldy5tb2RlbC5nZXQoJ25hbWUnKSA9PSB0aGlzLnRhZylcbiAgICBcdFx0XHRjaGlsZFZpZXcuc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgXHRcdGVsc2VcbiAgICBcdFx0XHRjaGlsZFZpZXcuc2V0U2VsZWN0ZWQoZmFsc2UpO1xuICAgIFx0fSk7XG4gICAgfVxuXG4gICAgb25Db2xsZWN0aW9uTG9hZGVkKCkge1xuICAgIFx0dGhpcy5zZXRUYWcodGhpcy50YWcpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWdMaXN0VmlldyJdfQ==