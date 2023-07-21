"use strict";
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