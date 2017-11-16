define(['exports', 'backbone', 'marionette', 'underscore', 'models/submission_collection', 'models/submission_model', 'views/projection_item_view', 'config'], function (exports, _backbone, _marionette, _underscore, _submission_collection, _submission_model, _projection_item_view, _config) {
  'use strict';

  /*
  * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
  * @Date:   2016-05-04 11:38:41
  * @Last Modified by:   lutzer
  * @Last Modified time: 2016-07-14 16:50:58
  */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _backbone2 = _interopRequireDefault(_backbone);

  var _marionette2 = _interopRequireDefault(_marionette);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _submission_collection2 = _interopRequireDefault(_submission_collection);

  var _submission_model2 = _interopRequireDefault(_submission_model);

  var _projection_item_view2 = _interopRequireDefault(_projection_item_view);

  var _config2 = _interopRequireDefault(_config);

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

  var ProjectionView = function (_Marionette$Collectio) {
    _inherits(ProjectionView, _Marionette$Collectio);

    function ProjectionView() {
      _classCallCheck(this, ProjectionView);

      return _possibleConstructorReturn(this, (ProjectionView.__proto__ || Object.getPrototypeOf(ProjectionView)).apply(this, arguments));
    }

    _createClass(ProjectionView, [{
      key: 'initialize',
      value: function initialize(options) {

        this.collection = new _submission_collection2.default();
        this.collection.setPageSize(1);
        this.collection.getFirstPage();

        this.listenTo(_backbone2.default, 'submission:new', this.onSubmissionAdded);
        this.timer = null;

        this.startPageTimer();
      }
    }, {
      key: 'startPageTimer',
      value: function startPageTimer(showNewestPage) {
        console.log('called');
        console.log(this.collection.paginate.page >= this.collection.paginate.totalRecords);
        showNewestPage = showNewestPage || false;

        var self = this;

        //clear old timer, if there is one present
        if (this.timer) clearTimeout(this.timer);

        //display next page
        if (showNewestPage) self.collection.getFirstPage();else if (self.collection.paginate.page + 1 >= self.collection.paginate.totalRecords) self.collection.getFirstPage();else self.collection.getNextPage({ remove: true });

        // start loop
        this.timer = setTimeout(function () {
          self.startPageTimer();
        }, _config2.default.projectionTimeInterval);
      }
    }, {
      key: 'onSubmissionAdded',
      value: function onSubmissionAdded(data) {
        this.startPageTimer(true);
      }
    }, {
      key: 'className',
      get: function get() {
        return 'projection';
      }
    }, {
      key: 'childView',
      get: function get() {
        return _projection_item_view2.default;
      }
    }]);

    return ProjectionView;
  }(_marionette2.default.CollectionView);

  exports.default = ProjectionView;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9wcm9qZWN0aW9uX3ZpZXcuanMiXSwibmFtZXMiOlsiUHJvamVjdGlvblZpZXciLCJvcHRpb25zIiwiY29sbGVjdGlvbiIsInNldFBhZ2VTaXplIiwiZ2V0Rmlyc3RQYWdlIiwibGlzdGVuVG8iLCJvblN1Ym1pc3Npb25BZGRlZCIsInRpbWVyIiwic3RhcnRQYWdlVGltZXIiLCJzaG93TmV3ZXN0UGFnZSIsImNvbnNvbGUiLCJsb2ciLCJwYWdpbmF0ZSIsInBhZ2UiLCJ0b3RhbFJlY29yZHMiLCJzZWxmIiwiY2xlYXJUaW1lb3V0IiwiZ2V0TmV4dFBhZ2UiLCJyZW1vdmUiLCJzZXRUaW1lb3V0IiwicHJvamVjdGlvblRpbWVJbnRlcnZhbCIsImRhdGEiLCJDb2xsZWN0aW9uVmlldyJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BZU1BLGM7Ozs7Ozs7Ozs7O2lDQVNTQyxPLEVBQVM7O0FBRWhCLGFBQUtDLFVBQUwsR0FBa0IscUNBQWxCO0FBQ0EsYUFBS0EsVUFBTCxDQUFnQkMsV0FBaEIsQ0FBNEIsQ0FBNUI7QUFDQSxhQUFLRCxVQUFMLENBQWdCRSxZQUFoQjs7QUFFQSxhQUFLQyxRQUFMLHFCQUF1QixnQkFBdkIsRUFBeUMsS0FBS0MsaUJBQTlDO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLElBQWI7O0FBRUEsYUFBS0MsY0FBTDtBQUNIOzs7cUNBRWNDLGMsRUFBZ0I7QUFDOUJDLGdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBRCxnQkFBUUMsR0FBUixDQUFZLEtBQUtULFVBQUwsQ0FBZ0JVLFFBQWhCLENBQXlCQyxJQUF6QixJQUFpQyxLQUFLWCxVQUFMLENBQWdCVSxRQUFoQixDQUF5QkUsWUFBdEU7QUFDSEwseUJBQWlCQSxrQkFBa0IsS0FBbkM7O0FBRUEsWUFBSU0sT0FBTyxJQUFYOztBQUVBO0FBQ0EsWUFBSSxLQUFLUixLQUFULEVBQ0NTLGFBQWEsS0FBS1QsS0FBbEI7O0FBRUQ7QUFDQSxZQUFJRSxjQUFKLEVBQ0NNLEtBQUtiLFVBQUwsQ0FBZ0JFLFlBQWhCLEdBREQsS0FFSyxJQUFLVyxLQUFLYixVQUFMLENBQWdCVSxRQUFoQixDQUF5QkMsSUFBekIsR0FBZ0MsQ0FBakMsSUFBdUNFLEtBQUtiLFVBQUwsQ0FBZ0JVLFFBQWhCLENBQXlCRSxZQUFwRSxFQUNKQyxLQUFLYixVQUFMLENBQWdCRSxZQUFoQixHQURJLEtBR0pXLEtBQUtiLFVBQUwsQ0FBZ0JlLFdBQWhCLENBQTRCLEVBQUNDLFFBQVMsSUFBVixFQUE1Qjs7QUFFRDtBQUNBLGFBQUtYLEtBQUwsR0FBYVksV0FBVyxZQUFXO0FBQ2xDSixlQUFLUCxjQUFMO0FBQ0EsU0FGWSxFQUVYLGlCQUFPWSxzQkFGSSxDQUFiO0FBSUE7Ozt3Q0FFaUJDLEksRUFBTTtBQUNqQixhQUFLYixjQUFMLENBQW9CLElBQXBCO0FBQ0g7OzswQkEvQ2U7QUFBRSxlQUFPLFlBQVA7QUFBcUI7OzswQkFFdkI7QUFDZjtBQUNBOzs7O0lBTndCLHFCQUFXYyxjOztvQkFxRHpCdEIsYyIsImZpbGUiOiJwcm9qZWN0aW9uX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTY6NTA6NThcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IFN1Ym1pc3Npb25Db2xsZWN0aW9uIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX2NvbGxlY3Rpb24nO1xuaW1wb3J0IFN1Ym1pc3Npb25Nb2RlbCBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9tb2RlbCc7XG5pbXBvcnQgUHJvamVjdGlvbkl0ZW1WaWV3IGZyb20gJ3ZpZXdzL3Byb2plY3Rpb25faXRlbV92aWV3JztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuY2xhc3MgUHJvamVjdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3IHtcblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAncHJvamVjdGlvbicgfVxuXG4gICAgZ2V0IGNoaWxkVmlldygpIHtcbiAgICBcdHJldHVybiBQcm9qZWN0aW9uSXRlbVZpZXc7XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IG5ldyBTdWJtaXNzaW9uQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uc2V0UGFnZVNpemUoMSk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UoKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOm5ldycsIHRoaXMub25TdWJtaXNzaW9uQWRkZWQpO1xuICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLnN0YXJ0UGFnZVRpbWVyKCk7XG4gICAgfVxuXG4gICAgc3RhcnRQYWdlVGltZXIoc2hvd05ld2VzdFBhZ2UpIHtcbiAgICBcdGNvbnNvbGUubG9nKCdjYWxsZWQnKTtcbiAgICBcdGNvbnNvbGUubG9nKHRoaXMuY29sbGVjdGlvbi5wYWdpbmF0ZS5wYWdlID49IHRoaXMuY29sbGVjdGlvbi5wYWdpbmF0ZS50b3RhbFJlY29yZHMpXG5cdFx0c2hvd05ld2VzdFBhZ2UgPSBzaG93TmV3ZXN0UGFnZSB8fCBmYWxzZTtcblxuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdC8vY2xlYXIgb2xkIHRpbWVyLCBpZiB0aGVyZSBpcyBvbmUgcHJlc2VudFxuXHRcdGlmICh0aGlzLnRpbWVyKVxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuXG5cdFx0Ly9kaXNwbGF5IG5leHQgcGFnZVxuXHRcdGlmIChzaG93TmV3ZXN0UGFnZSlcblx0XHRcdHNlbGYuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UoKTtcblx0XHRlbHNlIGlmICgoc2VsZi5jb2xsZWN0aW9uLnBhZ2luYXRlLnBhZ2UgKyAxKSA+PSBzZWxmLmNvbGxlY3Rpb24ucGFnaW5hdGUudG90YWxSZWNvcmRzKVxuXHRcdFx0c2VsZi5jb2xsZWN0aW9uLmdldEZpcnN0UGFnZSgpO1xuXHRcdGVsc2Vcblx0XHRcdHNlbGYuY29sbGVjdGlvbi5nZXROZXh0UGFnZSh7cmVtb3ZlIDogdHJ1ZX0pO1xuXG5cdFx0Ly8gc3RhcnQgbG9vcFxuXHRcdHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0c2VsZi5zdGFydFBhZ2VUaW1lcigpO1xuXHRcdH0sQ29uZmlnLnByb2plY3Rpb25UaW1lSW50ZXJ2YWwpO1xuXG5cdH1cblxuXHRvblN1Ym1pc3Npb25BZGRlZChkYXRhKSB7XG4gICAgICAgIHRoaXMuc3RhcnRQYWdlVGltZXIodHJ1ZSk7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aW9uVmlldyJdfQ==