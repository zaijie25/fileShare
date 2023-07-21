
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall_editor_cmp/CountDownBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbF9lZGl0b3JfY21wXFxDb3VudERvd25CdG4uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJwcm9wZXJ0aWVzIiwiYnRuTGFiZWwiLCJMYWJlbCIsImJ0blJpY2hMYWJlbCIsIlJpY2hUZXh0IiwicmljaEluZm8iLCJjb3VudERvd25UaW1lIiwib25Mb2FkIiwiYnRuQ29tIiwiZ2V0Q29tcG9uZW50IiwiQnV0dG9uIiwib2xkU3RyaW5nIiwic3RyaW5nIiwiX29sZEhpdFRlc3QiLCJub2RlIiwiX2hpdFRlc3QiLCJlbmFibGVBdXRvR3JheUVmZmVjdCIsIm9uIiwib25DbGlja0Z1bmMiLCJzdGFydENvdW50RG93biIsImVtcHR5RnVuYyIsImludGVyYWN0YWJsZSIsInN0YXJ0VGltZSIsIkRhdGUiLCJub3ciLCJUaW1lcklEIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGVUaW1lTGFiZWwiLCJiaW5kIiwibGVmdFRpbWUiLCJjdXJUaW1lIiwiTWF0aCIsImNlaWwiLCJqcyIsImZvcm1hdFN0ciIsIm92ZXJDb3VudERvd24iLCJjbGVhckludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFO0FBRFcsR0FIaEI7QUFPTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBR1AsRUFBRSxDQUFDUSxLQUROO0FBRVJDLElBQUFBLFlBQVksRUFBR1QsRUFBRSxDQUFDVSxRQUZWO0FBR1JDLElBQUFBLFFBQVEsRUFBRyxFQUhIO0FBSVJDLElBQUFBLGFBQWEsRUFBRztBQUpSLEdBUFA7QUFjTEMsRUFBQUEsTUFkSyxvQkFjRztBQUNKLFNBQUtDLE1B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QXVFUTtBQUNULFNBQUtDLGNBQUw7QUFDSDtBQXpFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC51aS9Db3VudERvd25CdG4nLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYnRuTGFiZWwgOiBjYy5MYWJlbCxcclxuICAgICAgICBidG5SaWNoTGFiZWwgOiBjYy5SaWNoVGV4dCxcclxuICAgICAgICByaWNoSW5mbyA6IFwiXCIsXHJcbiAgICAgICAgY291bnREb3duVGltZSA6IDYwLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLmJ0bkNvbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgaWYodGhpcy5idG5MYWJlbCAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5vbGRTdHJpbmcgPSB0aGlzLmJ0bkxhYmVsLnN0cmluZztcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmJ0blJpY2hMYWJlbCAgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMub2xkU3RyaW5nID0gdGhpcy5idG5SaWNoTGFiZWwuc3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5idG5Db20pe1xyXG4gICAgICAgICAgICB0aGlzLl9vbGRIaXRUZXN0ID0gdGhpcy5ub2RlLl9oaXRUZXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkNvbS5lbmFibGVBdXRvR3JheUVmZmVjdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5vbihcImNsaWNrXCIsdGhpcy5vbkNsaWNrRnVuYyx0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRDb3VudERvd24oKXtcclxuICAgICAgICBpZighdGhpcy5idG5Db20pe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuX2hpdFRlc3QgPSB0aGlzLmVtcHR5RnVuYztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5idG5Db20uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLlRpbWVySUQgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZVRpbWVMYWJlbC5iaW5kKHRoaXMpLDEwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVRpbWVMYWJlbCgpe1xyXG4gICAgICAgIHZhciBsZWZ0VGltZSA9IChEYXRlLm5vdygpIC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMDtcclxuICAgICAgICB2YXIgY3VyVGltZSA9IE1hdGguY2VpbCh0aGlzLmNvdW50RG93blRpbWUgLSBsZWZ0VGltZSk7XHJcbiAgICAgICAgaWYodGhpcy5idG5MYWJlbCAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5idG5MYWJlbC5zdHJpbmcgPSBjdXJUaW1lICsgXCJzXCI7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5idG5SaWNoTGFiZWwgICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0blJpY2hMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIodGhpcy5yaWNoSW5mbyxjdXJUaW1lICsgXCJzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJUaW1lIDw9IDApe1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJDb3VudERvd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG92ZXJDb3VudERvd24oKXtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuVGltZXJJRCk7XHJcbiAgICAgICAgdGhpcy5UaW1lcklEID0gbnVsbDtcclxuICAgICAgICBpZighdGhpcy5idG5Db20pe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuX2hpdFRlc3QgPSB0aGlzLl9vbGRIaXRUZXN0LmJpbmQodGhpcy5ub2RlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5idG5Db20uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5idG5MYWJlbCAhPSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5idG5MYWJlbC5zdHJpbmcgPSB0aGlzLm9sZFN0cmluZztcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmJ0blJpY2hMYWJlbCAgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUmljaExhYmVsLnN0cmluZyA9IHRoaXMub2xkU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZW1wdHlGdW5jKCl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrRnVuYygpe1xyXG4gICAgICAgIHRoaXMuc3RhcnRDb3VudERvd24oKTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==