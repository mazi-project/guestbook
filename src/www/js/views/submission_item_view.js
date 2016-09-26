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

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionItemView).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2l0ZW1fdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFxQk0sa0I7Ozs7Ozs7Ozs7O3FDQXlCTztBQUNMLHVCQUFPO0FBQ0gsNkJBQVU7QUFEUCxpQkFBUDtBQUdIOzs7dUNBR1UsTyxFQUFTOztBQUVuQjs7O29DQUVPLEMsRUFBRztBQUNQLHVCQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsaUJBQWUsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBdEM7QUFDQSxrQkFBRSxjQUFGO0FBQ0g7OztnQ0FwQ2M7QUFBRSx1QkFBTyxxQkFBRSxRQUFGLGdDQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sZ0JBQVA7QUFBeUI7OztnQ0FFckI7QUFDeEIsdUJBQU87QUFDTiw4QkFBVyxpQkFBTyxTQUFQLEdBQW1CLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxLQUFmLENBQW5CLEdBQTJDLEdBRGhEO0FBRUcsNkJBQVUsS0FGYjtBQUdHLG9DQUFpQiwyQkFBSyxRQUFMLENBQWMsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLE1BQWYsQ0FBZCxFQUFxQyxpQkFBTyxtQkFBNUMsRUFBZ0UsS0FBaEUsQ0FIcEI7QUFJRyw2QkFBUyxpQkFBUyxJQUFULEVBQWU7QUFDcEIsK0JBQU8sc0JBQU8sSUFBUCxFQUFhLE9BQWIsRUFBUDtBQUNIO0FBTkosaUJBQVA7QUFRRzs7O2dDQUVpQjtBQUNkLHVCQUFPO0FBQ0gsOEJBQVc7QUFEUixpQkFBUDtBQUdIOzs7O01BdEI0QixxQkFBVyxROztzQkEyQzdCLGtCIiwiZmlsZSI6InN1Ym1pc3Npb25faXRlbV92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTAxIDE2OjU2OjU2XG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBfc3RyIGZyb20gJ3VuZGVyc2NvcmVTdHJpbmcnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBNb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCAnbW9tZW50X2VuX2diJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBDb21tZW50TW9kZWwgZnJvbSAnbW9kZWxzL2NvbW1lbnRfbW9kZWwnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvc3VibWlzc2lvbl9pdGVtX3RtcGwuaHRtbCc7XG5cbmNsYXNzIFN1Ym1pc3Npb25JdGVtVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2l0ZW0tdmlldyBjYXJkJyB9XG5cbiAgICBnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRmaWxlc1VybCA6IENvbmZpZy5maWxlc191cmwgKyB0aGlzLm1vZGVsLmdldCgnX2lkJykgKyAnLycsXG4gICAgICAgICAgICBpc0FkbWluIDogZmFsc2UsXG4gICAgICAgICAgICB0ZXh0X3RydW5jYXRlZCA6IF9zdHIudHJ1bmNhdGUodGhpcy5tb2RlbC5nZXQoJ3RleHQnKSxDb25maWcuc3RyaW5nVHJ1bmNhdGVTaG9ydCwnLi4uJyksXG4gICAgICAgICAgICBmcm9tTm93OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vbWVudChkYXRlKS5mcm9tTm93KCk7IFxuICAgICAgICAgICAgfVxuXHRcdH1cbiAgICB9XG5cbiAgICBnZXQgbW9kZWxFdmVudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2hhbmdlJyA6ICdyZW5kZXInXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjbGljaycgOiAnb25DbGljaydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGUpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnI3N1Ym1pc3Npb24vJyt0aGlzLm1vZGVsLmdldCgnX2lkJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbkl0ZW1WaWV3OyJdfQ==