"use strict";
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