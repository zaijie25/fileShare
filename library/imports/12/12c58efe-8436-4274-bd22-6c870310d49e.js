"use strict";
cc._RF.push(module, '12c587+hDZCdL0ibIcDENSe', 'CountDownBtn');
// hall_editor_cmp/CountDownBtn.js

"use strict";

cc.Class({
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/CountDownBtn'
  },
  properties: {
    btnLabel: cc.Label,
    btnRichLabel: cc.RichText,
    richInfo: "",
    countDownTime: 60
  },
  onLoad: function onLoad() {
    this.btnCom = this.getComponent(cc.Button);

    if (this.btnLabel != null) {
      this.oldString = this.btnLabel.string;
    } else if (this.btnRichLabel != null) {
      this.oldString = this.btnRichLabel.string;
    }

    if (!this.btnCom) {
      this._oldHitTest = this.node._hitTest;
    } else {
      this.btnCom.enableAutoGrayEffect = true;
    }

    this.node.on("click", this.onClickFunc, this);
  },
  startCountDown: function startCountDown() {
    if (!this.btnCom) {
      this.node._hitTest = this.emptyFunc;
    } else {
      this.btnCom.interactable = false;
    }

    this.startTime = Date.now();
    this.TimerID = setInterval(this.updateTimeLabel.bind(this), 100);
  },
  updateTimeLabel: function updateTimeLabel() {
    var leftTime = (Date.now() - this.startTime) / 1000;
    var curTime = Math.ceil(this.countDownTime - leftTime);

    if (this.btnLabel != null) {
      this.btnLabel.string = curTime + "s";
    } else if (this.btnRichLabel != null) {
      this.btnRichLabel.string = cc.js.formatStr(this.richInfo, curTime + "s");
    }

    if (curTime <= 0) {
      this.overCountDown();
    }
  },
  overCountDown: function overCountDown() {
    clearInterval(this.TimerID);
    this.TimerID = null;

    if (!this.btnCom) {
      this.node._hitTest = this._oldHitTest.bind(this.node);
    } else {
      this.btnCom.interactable = true;
    }

    if (this.btnLabel != null) {
      this.btnLabel.string = this.oldString;
    } else if (this.btnRichLabel != null) {
      this.btnRichLabel.string = this.oldString;
    }
  },
  emptyFunc: function emptyFunc() {
    return false;
  },
  onClickFunc: function onClickFunc() {
    this.startCountDown();
  }
});

cc._RF.pop();