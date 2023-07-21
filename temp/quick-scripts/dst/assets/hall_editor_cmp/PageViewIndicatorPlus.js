
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall_editor_cmp/PageViewIndicatorPlus.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '15f24pUcA1HgqDpwYLC6tw0', 'PageViewIndicatorPlus');
// hall_editor_cmp/PageViewIndicatorPlus.js

"use strict";

cc.Class({
  "extends": cc.PageViewIndicator,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/PageViewIndicatorPlus'
  },
  properties: {
    /**
     * !#en The spriteFrame for each element.
     * !#zh 选中页面页签图片
     * @property {SpriteFrame} spriteFrame
     */
    spriteFrame: {
      "default": null,
      type: cc.SpriteFrame,
      tooltip: CC_DEV && '选中页面页签图片',
      override: true
    },

    /**
     * !#en The spriteFrame for each element.
     * !#zh 未选中页面页签图片
     * @property {SpriteFrame} spriteFrame
     */
    unSpriteFrame: {
      "default": null,
      type: cc.SpriteFrame,
      tooltip: CC_DEV && '未选中页面页签图片'
    }
  },
  _changedState: function _changedState() {
    var indicators = this._indicators;
    if (indicators.length === 0) return;

    var idx = this._pageView.getCurrentPageIndex();

    if (idx >= indicators.length) return;

    for (var i = 0; i < indicators.length; ++i) {
      var node = indicators[i];
      var sprite = node.getComponent(cc.Sprite);
      sprite.spriteFrame = this.unSpriteFrame;
      sprite.sizeMode = cc.Sprite.SizeMode.RAW;
    }

    var curSprite = indicators[idx].getComponent(cc.Sprite);
    curSprite.spriteFrame = this.spriteFrame;
    curSprite.sizeMode = cc.Sprite.SizeMode.RAW;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbF9lZGl0b3JfY21wXFxQYWdlVmlld0luZGljYXRvclBsdXMuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIlBhZ2VWaWV3SW5kaWNhdG9yIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsInByb3BlcnRpZXMiLCJzcHJpdGVGcmFtZSIsInR5cGUiLCJTcHJpdGVGcmFtZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJvdmVycmlkZSIsInVuU3ByaXRlRnJhbWUiLCJfY2hhbmdlZFN0YXRlIiwiaW5kaWNhdG9ycyIsIl9pbmRpY2F0b3JzIiwibGVuZ3RoIiwiaWR4IiwiX3BhZ2VWaWV3IiwiZ2V0Q3VycmVudFBhZ2VJbmRleCIsImkiLCJub2RlIiwic3ByaXRlIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic2l6ZU1vZGUiLCJTaXplTW9kZSIsIlJBVyIsImN1clNwcml0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLGlCQURQO0FBR0xDLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxJQUFJLEVBQUU7QUFEVyxHQUhoQjtBQU9MQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEMsTUFBQUEsSUFBSSxFQUFFUixFQUFFLENBQUNTLFdBRkE7QUFHVEMsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksVUFIVjtBQUlUQyxNQUFBQSxRQUFRLEVBQUU7QUFKRCxLQU5MOztBQWFSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsYUFBYSxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYTCxNQUFBQSxJQUFJLEVBQUVSLEVBQUUsQ0FBQ1MsV0FGRTtBQUdYQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSTtBQUhSO0FBbEJQLEdBUFA7QUFnQ0xHLEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUN2QixRQUFJQyxVQUFVLEdBQUcsS0FBS0MsV0FBdEI7QUFDQSxRQUFJRCxVQUFVLENBQUNFLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7O0FBQzdCLFFBQUlDLEdBQUcsR0FBRyxLQUFLQyxTQUFMLENBQWVDLG1CQUFmLEVBQVY7O0FBQ0EsUUFBSUYsR0FBRyxJQUFJSCxVQUFVLENBQUNFLE1BQXRCLEVBQThCOztBQUM5QixTQUFLLElBQUlJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdOLFVBQVUsQ0FBQ0UsTUFBL0IsRUFBdUMsRUFBRUksQ0FBekMsRUFBNEM7QUFDeEMsVUFBSUMsSUFBSSxHQUFHUCxVQUFVLENBQUNNLENBQUQsQ0FBckI7QUFDQSxVQUFJRSxNQUFNLEdBQUdELElBQUksQ0FBQ0UsWUFBTCxDQUFrQnhCLEVBQUUsQ0FBQ3lCLE1BQXJCLENBQWI7QUFDQUYsTUFBQUEsTUFBTSxDQUFDaEIsV0FBUCxHQUFxQixLQUFLTSxhQUExQjtBQUNBVSxNQUFBQSxNQUFNLENBQUNHLFFBQVAsR0FBa0IxQixFQUFFLENBQUN5QixNQUFILENBQVVFLFFBQVYsQ0FBbUJDLEdBQXJDO0FBQ0g7O0FBQ0QsUUFBSUMsU0FBUyxHQUFHZCxVQUFVLENBQUNHLEdBQUQsQ0FBVixDQUFnQk0sWUFBaEIsQ0FBNkJ4QixFQUFFLENBQUN5QixNQUFoQyxDQUFoQjtBQUNBSSxJQUFBQSxTQUFTLENBQUN0QixXQUFWLEdBQXdCLEtBQUtBLFdBQTdCO0FBQ0FzQixJQUFBQSxTQUFTLENBQUNILFFBQVYsR0FBcUIxQixFQUFFLENBQUN5QixNQUFILENBQVVFLFFBQVYsQ0FBbUJDLEdBQXhDO0FBQ0g7QUE5Q0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5QYWdlVmlld0luZGljYXRvcixcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC51aS9QYWdlVmlld0luZGljYXRvclBsdXMnLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgc3ByaXRlRnJhbWUgZm9yIGVhY2ggZWxlbWVudC5cclxuICAgICAgICAgKiAhI3poIOmAieS4remhtemdoumhteetvuWbvueJh1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3ByaXRlRnJhbWV9IHNwcml0ZUZyYW1lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3ByaXRlRnJhbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAn6YCJ5Lit6aG16Z2i6aG1562+5Zu+54mHJyxcclxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBzcHJpdGVGcmFtZSBmb3IgZWFjaCBlbGVtZW50LlxyXG4gICAgICAgICAqICEjemgg5pyq6YCJ5Lit6aG16Z2i6aG1562+5Zu+54mHXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gc3ByaXRlRnJhbWVcclxuICAgICAgICAgKi9cclxuICAgICAgICB1blNwcml0ZUZyYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ+acqumAieS4remhtemdoumhteetvuWbvueJhydcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBfY2hhbmdlZFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGluZGljYXRvcnMgPSB0aGlzLl9pbmRpY2F0b3JzO1xyXG4gICAgICAgIGlmIChpbmRpY2F0b3JzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBpZHggPSB0aGlzLl9wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgaWYgKGlkeCA+PSBpbmRpY2F0b3JzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGluZGljYXRvcnNbaV07XHJcbiAgICAgICAgICAgIHZhciBzcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnVuU3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5SQVdcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1clNwcml0ZSA9IGluZGljYXRvcnNbaWR4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBjdXJTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lO1xyXG4gICAgICAgIGN1clNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5SQVdcclxuICAgIH0sXHJcblxyXG4gICAgXHJcbn0pO1xyXG4iXX0=