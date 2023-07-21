
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/PolygonButtonHit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '007675WT/ZAkIgGX0sRxda1', 'PolygonButtonHit');
// hall/scripts/logic/core/component/PolygonButtonHit.js

"use strict";

// 挂载节点需要先挂载cc.PolygonCollider, 通过polygonCollider.points确定不规则范围
cc.Class({
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/PolygonButtonHit',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcUG9seWdvbkJ1dHRvbkhpdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsInJlcXVpcmVDb21wb25lbnQiLCJQb2x5Z29uQ29sbGlkZXIiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsIl9vbGRIaXRUZXN0IiwiX2hpdFRlc3QiLCJiaW5kIiwicG9seWdvbkhpdFRlc3QiLCJwb2ludCIsImxpc3RlbmVyIiwicG9seWdvbkNvbGxpZGVyIiwiZ2V0Q29tcG9uZW50IiwiaXNOb3RUb3VjaE1hc2siLCJtYXNrIiwicGFyZW50IiwiaSIsImluZGV4IiwiY29tcCIsIk1hc2siLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsIngiLCJnZXRDb250ZW50U2l6ZSIsIndpZHRoIiwieSIsImhlaWdodCIsIkludGVyc2VjdGlvbiIsInBvaW50SW5Qb2x5Z29uIiwicG9pbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxJQUFJLEVBQUUsOENBRFc7QUFFakJDLElBQUFBLGdCQUFnQixFQUFHTixFQUFFLENBQUNPO0FBRkwsR0FGaEI7QUFNTEMsRUFBQUEsVUFBVSxFQUFFLEVBTlA7O0FBUUw7QUFDSjtBQUNBO0FBQ0lDLEVBQUFBLE1BWEssb0JBV0k7QUFDTCxTQUFLQyxJQUFMLENBQVVDLFdBQVYsR0FBd0IsS0FBS0QsSUFBTCxDQUFVRSxRQUFWLENBQW1CQyxJQUFuQixDQUF3QixLQUFLSCxJQUE3QixDQUF4QjtBQUNBLFNBQUtBLElBQUwsQ0FBVUUsUUFBVixHQUFxQixLQUFLRSxjQUFMLENBQW9CRCxJQUFwQixDQUF5QixLQUFLSCxJQUE5QixDQUFyQjtBQUNILEdBZEk7O0FBZ0JMO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUksRUFBQUEsY0FyQkssMEJBcUJVQyxLQXJCVixFQXFCaUJDLFFBckJqQixFQXFCMkI7QUFDNUIsUUFBSUMsZUFBZSxHQUFHLEtBQUtDLFlBQUwsQ0FBa0JsQixFQUFFLENBQUNPLGVBQXJCLENBQXRCO0FBQ0EsUUFBSVksY0FBYyxHQUFHLEtBQXJCOztBQUNBLFFBQUlGLGVBQUosRUFBcUI7QUFDakIsVUFBSUQsUUFBUSxJQUFJQSxRQUFRLENBQUNJLElBQXpCLEVBQStCO0FBQzNCLFlBQUlBLElBQUksR0FBR0osUUFBUSxDQUFDSSxJQUFwQjtBQUNBLFlBQUlDLE1BQU0sR0FBRyxJQUFiOztBQUNBLGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JELE1BQU0sSUFBSUMsQ0FBQyxHQUFHRixJQUFJLENBQUNHLEtBQW5DLEVBQTBDLEVBQUVELENBQUYsRUFBS0QsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQS9ELEVBQXVFLENBQ3RFLENBSjBCLENBSzNCOzs7QUFDQSxZQUFJQSxNQUFNLEtBQUtELElBQUksQ0FBQ1YsSUFBcEIsRUFBMEI7QUFDdEIsY0FBSWMsSUFBSSxHQUFHSCxNQUFNLENBQUNILFlBQVAsQ0FBb0JsQixFQUFFLENBQUN5QixJQUF2QixDQUFYO0FBQ0FOLFVBQUFBLGNBQWMsR0FBSUssSUFBSSxJQUFJQSxJQUFJLENBQUNFLGtCQUFkLEdBQW9DRixJQUFJLENBQUNaLFFBQUwsQ0FBY0csS0FBZCxDQUFwQyxHQUEyRCxJQUE1RTtBQUNILFNBSEQsQ0FJQTtBQUpBLGFBS0s7QUFDREMsWUFBQUEsUUFBUSxDQUFDSSxJQUFULEdBQWdCLElBQWhCO0FBQ0FELFlBQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNIO0FBQ0osT0FmRCxNQWdCSztBQUNEQSxRQUFBQSxjQUFjLEdBQUcsSUFBakI7QUFDSDs7QUFDRCxVQUFHQSxjQUFILEVBQWtCO0FBQ2RKLFFBQUFBLEtBQUssR0FBRyxLQUFLWSxvQkFBTCxDQUEwQlosS0FBMUIsQ0FBUjtBQUNBQSxRQUFBQSxLQUFLLENBQUNhLENBQU4sSUFBVyxLQUFLQyxjQUFMLEdBQXNCQyxLQUF0QixHQUE4QixDQUF6QztBQUNBZixRQUFBQSxLQUFLLENBQUNnQixDQUFOLElBQVcsS0FBS0YsY0FBTCxHQUFzQkcsTUFBdEIsR0FBK0IsQ0FBMUM7QUFDQSxlQUFPaEMsRUFBRSxDQUFDaUMsWUFBSCxDQUFnQkMsY0FBaEIsQ0FBK0JuQixLQUEvQixFQUFzQ0UsZUFBZSxDQUFDa0IsTUFBdEQsQ0FBUDtBQUNILE9BTEQsTUFLSztBQUNELGVBQU8sS0FBUDtBQUNIO0FBQ0osS0E1QkQsTUE0Qk87QUFDSCxhQUFPLEtBQUt4QixXQUFMLENBQWlCSSxLQUFqQixFQUF3QkMsUUFBeEIsQ0FBUDtBQUNIO0FBQ0o7QUF2REksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5oyC6L296IqC54K56ZyA6KaB5YWI5oyC6L29Y2MuUG9seWdvbkNvbGxpZGVyLCDpgJrov4dwb2x5Z29uQ29sbGlkZXIucG9pbnRz56Gu5a6a5LiN6KeE5YiZ6IyD5Zu0XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1BvbHlnb25CdXR0b25IaXQnLFxyXG4gICAgICAgIHJlcXVpcmVDb21wb25lbnQgOiBjYy5Qb2x5Z29uQ29sbGlkZXIsXHJcbiAgICB9LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29XHJcbiAgICAgKi9cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuX29sZEhpdFRlc3QgPSB0aGlzLm5vZGUuX2hpdFRlc3QuYmluZCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5faGl0VGVzdCA9IHRoaXMucG9seWdvbkhpdFRlc3QuYmluZCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4jeinhOWImeWkmui+ueW9ouinpuaRuOa1i+ivlVxyXG4gICAgICogQHBhcmFtIHvop6bmkbjngrl9IHBvaW50IFxyXG4gICAgICogQHBhcmFtIHvnm5HlkKx9IGxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBwb2x5Z29uSGl0VGVzdChwb2ludCwgbGlzdGVuZXIpIHtcclxuICAgICAgICB2YXIgcG9seWdvbkNvbGxpZGVyID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUG9seWdvbkNvbGxpZGVyKTtcclxuICAgICAgICB2YXIgaXNOb3RUb3VjaE1hc2sgPSBmYWxzZTtcclxuICAgICAgICBpZiAocG9seWdvbkNvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lciAmJiBsaXN0ZW5lci5tYXNrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFzayA9IGxpc3RlbmVyLm1hc2s7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBwYXJlbnQgJiYgaSA8IG1hc2suaW5kZXg7ICsraSwgcGFyZW50ID0gcGFyZW50LnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZmluZCBtYXNrIHBhcmVudCwgc2hvdWxkIGhpdCB0ZXN0IGl0XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBtYXNrLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcCA9IHBhcmVudC5nZXRDb21wb25lbnQoY2MuTWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNOb3RUb3VjaE1hc2sgPSAoY29tcCAmJiBjb21wLmVuYWJsZWRJbkhpZXJhcmNoeSkgPyBjb21wLl9oaXRUZXN0KHBvaW50KSA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBtYXNrIHBhcmVudCBubyBsb25nZXIgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5tYXNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpc05vdFRvdWNoTWFzayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpc05vdFRvdWNoTWFzayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNOb3RUb3VjaE1hc2spe1xyXG4gICAgICAgICAgICAgICAgcG9pbnQgPSB0aGlzLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIHBvaW50LnggLT0gdGhpcy5nZXRDb250ZW50U2l6ZSgpLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIHBvaW50LnkgLT0gdGhpcy5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuSW50ZXJzZWN0aW9uLnBvaW50SW5Qb2x5Z29uKHBvaW50LCBwb2x5Z29uQ29sbGlkZXIucG9pbnRzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb2xkSGl0VGVzdChwb2ludCwgbGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7Il19