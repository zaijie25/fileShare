
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall_editor_cmp/PolygonBtnHit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0b0a07KlLNPzqz6iMs5gKo8', 'PolygonBtnHit');
// hall_editor_cmp/PolygonBtnHit.js

"use strict";

cc.Class({
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/PolygonBtnHit',
    requireComponent: cc.PolygonCollider
  },
  properties: {},

  /**
   * 加载
   */
  onLoad: function onLoad() {
    this.node._oldHitTest = this.node._hitTest.bind(this.node);
    this.node._hitTest = this.polygonHitTest.bind(this.node);
  },

  /**
   * 不规则多边形触摸测试
   * @param {触摸点} point 
   * @param {监听} listener 
   */
  polygonHitTest: function polygonHitTest(point, listener) {
    var polygonCollider = this.getComponent(cc.PolygonCollider);
    var isNotTouchMask = false;

    if (polygonCollider) {
      if (listener && listener.mask) {
        var mask = listener.mask;
        var parent = this;

        for (var i = 0; parent && i < mask.index; ++i, parent = parent.parent) {} // find mask parent, should hit test it


        if (parent === mask.node) {
          var comp = parent.getComponent(cc.Mask);
          isNotTouchMask = comp && comp.enabledInHierarchy ? comp._hitTest(point) : true;
        } // mask parent no longer exists
        else {
            listener.mask = null;
            isNotTouchMask = true;
          }
      } else {
        isNotTouchMask = true;
      }

      if (isNotTouchMask) {
        point = this.convertToNodeSpaceAR(point);
        point.x -= this.getContentSize().width / 2;
        point.y -= this.getContentSize().height / 2;
        return cc.Intersection.pointInPolygon(point, polygonCollider.points);
      } else {
        return false;
      }
    } else {
      return this._oldHitTest(point, listener);
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbF9lZGl0b3JfY21wXFxQb2x5Z29uQnRuSGl0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwicmVxdWlyZUNvbXBvbmVudCIsIlBvbHlnb25Db2xsaWRlciIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJub2RlIiwiX29sZEhpdFRlc3QiLCJfaGl0VGVzdCIsImJpbmQiLCJwb2x5Z29uSGl0VGVzdCIsInBvaW50IiwibGlzdGVuZXIiLCJwb2x5Z29uQ29sbGlkZXIiLCJnZXRDb21wb25lbnQiLCJpc05vdFRvdWNoTWFzayIsIm1hc2siLCJwYXJlbnQiLCJpIiwiaW5kZXgiLCJjb21wIiwiTWFzayIsImVuYWJsZWRJbkhpZXJhcmNoeSIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwieCIsImdldENvbnRlbnRTaXplIiwid2lkdGgiLCJ5IiwiaGVpZ2h0IiwiSW50ZXJzZWN0aW9uIiwicG9pbnRJblBvbHlnb24iLCJwb2ludHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxJQUFJLEVBQUUsMkNBRFc7QUFFakJDLElBQUFBLGdCQUFnQixFQUFHTixFQUFFLENBQUNPO0FBRkwsR0FGaEI7QUFNTEMsRUFBQUEsVUFBVSxFQUFFLEVBTlA7O0FBUUw7QUFDSjtBQUNBO0FBQ0lDLEVBQUFBLE1BWEssb0JBV0k7QUFDTCxTQUFLQyxJQUFMLENBQVVDLFdBQVYsR0FBd0IsS0FBS0QsSUFBTCxDQUFVRSxRQUFWLENBQW1CQyxJQUFuQixDQUF3QixLQUFLSCxJQUE3QixDQUF4QjtBQUNBLFNBQUtBLElBQUwsQ0FBVUUsUUFBVixHQUFxQixLQUFLRSxjQUFMLENBQW9CRCxJQUFwQixDQUF5QixLQUFLSCxJQUE5QixDQUFyQjtBQUNILEdBZEk7O0FBZ0JMO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUksRUFBQUEsY0FyQkssMEJBcUJVQyxLQXJCVixFQXFCaUJDLFFBckJqQixFQXFCMkI7QUFDNUIsUUFBSUMsZUFBZSxHQUFHLEtBQUtDLFlBQUwsQ0FBa0JsQixFQUFFLENBQUNPLGVBQXJCLENBQXRCO0FBQ0EsUUFBSVksY0FBYyxHQUFHLEtBQXJCOztBQUNBLFFBQUlGLGVBQUosRUFBcUI7QUFDakIsVUFBSUQsUUFBUSxJQUFJQSxRQUFRLENBQUNJLElBQXpCLEVBQStCO0FBQzNCLFlBQUlBLElBQUksR0FBR0osUUFBUSxDQUFDSSxJQUFwQjtBQUNBLFlBQUlDLE1BQU0sR0FBRyxJQUFiOztBQUNBLGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JELE1BQU0sSUFBSUMsQ0FBQyxHQUFHRixJQUFJLENBQUNHLEtBQW5DLEVBQTBDLEVBQUVELENBQUYsRUFBS0QsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQS9ELEVBQXVFLENBQ3RFLENBSjBCLENBSzNCOzs7QUFDQSxZQUFJQSxNQUFNLEtBQUtELElBQUksQ0FBQ1YsSUFBcEIsRUFBMEI7QUFDdEIsY0FBSWMsSUFBSSxHQUFHSCxNQUFNLENBQUNILFlBQVAsQ0FBb0JsQixFQUFFLENBQUN5QixJQUF2QixDQUFYO0FBQ0FOLFVBQUFBLGNBQWMsR0FBSUssSUFBSSxJQUFJQSxJQUFJLENBQUNFLGtCQUFkLEdBQW9DRixJQUFJLENBQUNaLFFBQUwsQ0FBY0csS0FBZCxDQUFwQyxHQUEyRCxJQUE1RTtBQUNILFNBSEQsQ0FJQTtBQUpBLGFBS0s7QUFDREMsWUFBQUEsUUFBUSxDQUFDSSxJQUFULEdBQWdCLElBQWhCO0FBQ0FELFlBQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNIO0FBQ0osT0FmRCxNQWdCSztBQUNEQSxRQUFBQSxjQUFjLEdBQUcsSUFBakI7QUFDSDs7QUFDRCxVQUFHQSxjQUFILEVBQWtCO0FBQ2RKLFFBQUFBLEtBQUssR0FBRyxLQUFLWSxvQkFBTCxDQUEwQlosS0FBMUIsQ0FBUjtBQUNBQSxRQUFBQSxLQUFLLENBQUNhLENBQU4sSUFBVyxLQUFLQyxjQUFMLEdBQXNCQyxLQUF0QixHQUE4QixDQUF6QztBQUNBZixRQUFBQSxLQUFLLENBQUNnQixDQUFOLElBQVcsS0FBS0YsY0FBTCxHQUFzQkcsTUFBdEIsR0FBK0IsQ0FBMUM7QUFDQSxlQUFPaEMsRUFBRSxDQUFDaUMsWUFBSCxDQUFnQkMsY0FBaEIsQ0FBK0JuQixLQUEvQixFQUFzQ0UsZUFBZSxDQUFDa0IsTUFBdEQsQ0FBUDtBQUNILE9BTEQsTUFLSztBQUNELGVBQU8sS0FBUDtBQUNIO0FBQ0osS0E1QkQsTUE0Qk87QUFDSCxhQUFPLEtBQUt4QixXQUFMLENBQWlCSSxLQUFqQixFQUF3QkMsUUFBeEIsQ0FBUDtBQUNIO0FBQ0o7QUF2REksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvUG9seWdvbkJ0bkhpdCcsXHJcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudCA6IGNjLlBvbHlnb25Db2xsaWRlcixcclxuICAgIH0sXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb1cclxuICAgICAqL1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5fb2xkSGl0VGVzdCA9IHRoaXMubm9kZS5faGl0VGVzdC5iaW5kKHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLl9oaXRUZXN0ID0gdGhpcy5wb2x5Z29uSGl0VGVzdC5iaW5kKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiN6KeE5YiZ5aSa6L655b2i6Kem5pG45rWL6K+VXHJcbiAgICAgKiBAcGFyYW0ge+inpuaRuOeCuX0gcG9pbnQgXHJcbiAgICAgKiBAcGFyYW0ge+ebkeWQrH0gbGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHBvbHlnb25IaXRUZXN0KHBvaW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgIHZhciBwb2x5Z29uQ29sbGlkZXIgPSB0aGlzLmdldENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgIHZhciBpc05vdFRvdWNoTWFzayA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChwb2x5Z29uQ29sbGlkZXIpIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyICYmIGxpc3RlbmVyLm1hc2spIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXNrID0gbGlzdGVuZXIubWFzaztcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IHBhcmVudCAmJiBpIDwgbWFzay5pbmRleDsgKytpLCBwYXJlbnQgPSBwYXJlbnQucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBmaW5kIG1hc2sgcGFyZW50LCBzaG91bGQgaGl0IHRlc3QgaXRcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IG1hc2subm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21wID0gcGFyZW50LmdldENvbXBvbmVudChjYy5NYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICBpc05vdFRvdWNoTWFzayA9IChjb21wICYmIGNvbXAuZW5hYmxlZEluSGllcmFyY2h5KSA/IGNvbXAuX2hpdFRlc3QocG9pbnQpIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIG1hc2sgcGFyZW50IG5vIGxvbmdlciBleGlzdHNcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLm1hc2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTm90VG91Y2hNYXNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlzTm90VG91Y2hNYXNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc05vdFRvdWNoTWFzayl7XHJcbiAgICAgICAgICAgICAgICBwb2ludCA9IHRoaXMuY29udmVydFRvTm9kZVNwYWNlQVIocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQueCAtPSB0aGlzLmdldENvbnRlbnRTaXplKCkud2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQueSAtPSB0aGlzLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy5JbnRlcnNlY3Rpb24ucG9pbnRJblBvbHlnb24ocG9pbnQsIHBvbHlnb25Db2xsaWRlci5wb2ludHMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbGRIaXRUZXN0KHBvaW50LCBsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiXX0=