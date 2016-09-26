define(['exports', 'marionette', 'underscore', 'text!templates/tag_item_tmpl.html'], function (exports, _marionette, _underscore, _tag_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-05-12 12:44:36
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _tag_item_tmpl2 = _interopRequireDefault(_tag_item_tmpl);

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

    var TagItemView = function (_Marionette$ItemView) {
        _inherits(TagItemView, _Marionette$ItemView);

        function TagItemView() {
            _classCallCheck(this, TagItemView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TagItemView).apply(this, arguments));
        }

        _createClass(TagItemView, [{
            key: 'events',
            value: function events() {
                return {
                    'click': 'onClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {
                this.isSelected = false;
            }
        }, {
            key: 'setSelected',
            value: function setSelected(selected) {
                if (selected) this.$('.badge').addClass('selected');else this.$('.badge').removeClass('selected');
                this.isSelected = selected;
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                if (this.isSelected) {
                    window.location.hash = '#';
                    e.preventDefault();
                }
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_tag_item_tmpl2.default);
            }
        }, {
            key: 'tagName',
            get: function get() {
                return 'li';
            }
        }]);

        return TagItemView;
    }(_marionette2.default.ItemView);

    exports.default = TagItemView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWdfaXRlbV92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWNNLFc7Ozs7Ozs7Ozs7O3FDQU9PO0FBQ1IsdUJBQU87QUFDTiw2QkFBVTtBQURKLGlCQUFQO0FBR0E7Ozt1Q0FHVSxPLEVBQVM7QUFDaEIscUJBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNIOzs7d0NBRVcsUSxFQUFVO0FBQ2xCLG9CQUFJLFFBQUosRUFDSSxLQUFLLENBQUwsQ0FBTyxRQUFQLEVBQWlCLFFBQWpCLENBQTBCLFVBQTFCLEVBREosS0FHSSxLQUFLLENBQUwsQ0FBTyxRQUFQLEVBQWlCLFdBQWpCLENBQTZCLFVBQTdCO0FBQ0oscUJBQUssVUFBTCxHQUFrQixRQUFsQjtBQUNIOzs7b0NBRU8sQyxFQUFHO0FBQ1Asb0JBQUksS0FBSyxVQUFULEVBQXFCO0FBQ2pCLDJCQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsR0FBdkI7QUFDQSxzQkFBRSxjQUFGO0FBQ0g7QUFDSjs7O2dDQTVCYztBQUFFLHVCQUFPLHFCQUFFLFFBQUYseUJBQVA7QUFBNkI7OztnQ0FFaEM7QUFBRSx1QkFBTyxJQUFQO0FBQWE7Ozs7TUFMUCxxQkFBVyxROztzQkFtQ3RCLFciLCJmaWxlIjoidGFnX2l0ZW1fdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNS0xMiAxMjo0NDozNlxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSdcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy90YWdfaXRlbV90bXBsLmh0bWwnO1xuXG5jbGFzcyBUYWdJdGVtVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgIFx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG4gICAgZ2V0IHRhZ05hbWUoKSB7IHJldHVybiAnbGknIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdCdjbGljaycgOiAnb25DbGljaydcbiAgICBcdH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkKHNlbGVjdGVkKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZClcbiAgICAgICAgICAgIHRoaXMuJCgnLmJhZGdlJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuJCgnLmJhZGdlJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZSkge1xuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcjJztcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFnSXRlbVZpZXciXX0=