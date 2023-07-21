
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzAskActionView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '11cdeucg5hJTJBa2M78rxGJ', 'DdzAskActionView');
// ddz/ddz/scripts/subView/DdzAskActionView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DdzBaseView_1 = require("./DdzBaseView");
var DdzGameEvent_1 = require("../data/DdzGameEvent");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzDriver_1 = require("../DdzDriver");
var DdzGameConst_1 = require("../data/DdzGameConst");
/**
 * 出牌等按钮的view
 */
var DdzAskActionView = /** @class */ (function (_super) {
    __extends(DdzAskActionView, _super);
    function DdzAskActionView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    DdzAskActionView.prototype.initView = function () {
        this.autoBtn = this.getChild('autoBtn');
        this.autoBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.autoBtn, "", this.onAutoPlayClick, this);
        this.cancelAuto = this.getChild('cancelAuto');
        this.cancelAuto.active = false;
        DdzGameConst_1.default.addCommonClick(this.node, "cancelAuto/btnCancel", this.onCancelAutoClick, this);
        this.robActionView = new DdzRobDzActionView(this.getChild('rob'));
        this.robActionView.active = false;
        this.multActionView = new DdzMultActionView(this.getChild('mult'));
        this.multActionView.active = false;
        this.playActionView = new DdzPlayActionView(this.getChild('play'));
        this.playActionView.active = false;
        this.cannotPlayActionView = new DdzCannotPlay(this.getChild('notPlay'));
        this.cannotPlayActionView.active = false;
        this.rewardActionView = new DdzRewardActionView(this.getChild('reward'));
        this.rewardActionView.active = false;
    };
    DdzAskActionView.prototype.onAutoPlayClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.setAutoPlayBtnShow(false);
        Game.Server.send(this.Define.CmdAuto, { auto_play: 1 });
    };
    DdzAskActionView.prototype.onCancelAutoClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.setAutoPlayBtnShow(true);
        Game.Server.send(this.Define.CmdAuto, { auto_play: 0 });
    };
    DdzAskActionView.prototype.setAutoPlayBtnShow = function (isShow) {
        this.autoBtn.active = isShow;
        this.cancelAuto.active = !isShow;
    };
    DdzAskActionView.prototype.setRobViewShow = function (isShow, land_items, miss_items) {
        if (land_items === void 0) { land_items = []; }
        if (miss_items === void 0) { miss_items = []; }
        this.robActionView.active = isShow;
        if (isShow) {
            this.robActionView.disableMissItem(miss_items);
            this.curView = this.robActionView;
        }
        else
            this.curView = null;
    };
    DdzAskActionView.prototype.setMultViewShow = function (isShow) {
        this.multActionView.active = isShow;
        if (isShow)
            this.curView = this.multActionView;
        else
            this.curView = null;
    };
    DdzAskActionView.prototype.setPlayViewShow = function (isShow, isPrompt, isPass) {
        if (isPrompt === void 0) { isPrompt = true; }
        if (isPass === void 0) { isPass = true; }
        this.playActionView.active = isShow;
        if (isShow) {
            this.playActionView.enablePromptBtn(isPrompt);
            this.playActionView.enablePassBtn(isPass);
            this.curView = this.playActionView;
        }
        else
            this.curView = null;
    };
    DdzAskActionView.prototype.setCannotPlayViewShow = function (isShow) {
        this.cannotPlayActionView.active = isShow;
        if (isShow)
            this.curView = this.cannotPlayActionView;
        else
            this.curView = null;
    };
    DdzAskActionView.prototype.getActionClockWorldPos = function () {
        if (this.curView)
            return this.curView.getClockWorldPos();
        else
            return this.node.convertToWorldSpaceAR(cc.v2(0, 50));
    };
    DdzAskActionView.prototype.showRewardActionView = function (isShow) {
        this.rewardActionView.active = isShow;
    };
    DdzAskActionView.prototype.onClose = function () {
        this.curView = null;
    };
    DdzAskActionView.prototype.clearByRound = function () {
        this.autoBtn.active = false;
        this.cancelAuto.active = false;
    };
    DdzAskActionView.prototype.clearByGame = function () {
        this.autoBtn.active = false;
        this.cancelAuto.active = false;
        this.robActionView.active = false;
        this.multActionView.active = false;
        this.playActionView.active = false;
        this.cannotPlayActionView.active = false;
        this.rewardActionView.active = false;
        this.curView = null;
    };
    return DdzAskActionView;
}(DdzBaseView_1.default));
exports.default = DdzAskActionView;
var DdzRobDzActionView = /** @class */ (function (_super) {
    __extends(DdzRobDzActionView, _super);
    function DdzRobDzActionView(node) {
        var _this = _super.call(this) || this;
        _this.itemList = [];
        _this.setNode(node);
        return _this;
    }
    DdzRobDzActionView.prototype.initView = function () {
        this.clockRoot = this.getChild('clockRoot');
        for (var i = 0; i <= 3; i++) {
            var btnNode = this.getChild('btn' + i);
            this.itemList.push(new RobItem(btnNode, i, this.onRobAction, this));
        }
    };
    DdzRobDzActionView.prototype.disableMissItem = function (items) {
        if (items === void 0) { items = []; }
        this.itemList.forEach(function (item) {
            var num = item.robData;
            if (items.indexOf(num) > -1)
                item.setDisable(true);
            else
                item.setDisable(false);
        });
    };
    DdzRobDzActionView.prototype.onRobAction = function (num) {
        this.active = false;
        Game.Server.send(this.Define.CmdLandlord, { selected: num });
    };
    DdzRobDzActionView.prototype.getClockWorldPos = function () {
        var pos = this.clockRoot.parent.convertToWorldSpaceAR(this.clockRoot.position);
        return pos;
    };
    return DdzRobDzActionView;
}(DdzBaseView_1.default));
var RobItem = /** @class */ (function (_super) {
    __extends(RobItem, _super);
    function RobItem(node, data, callback, target) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.callback = callback;
        _this.target = target;
        _this.setNode(node);
        return _this;
    }
    RobItem.prototype.initView = function () {
        DdzGameConst_1.default.addCommonClick(this.node, "", this.onRobBtnClick, this);
        this.btn = this.getComponent('', cc.Button);
    };
    RobItem.prototype.onRobBtnClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        if (this.callback && this.target)
            this.callback.call(this.target, this.data);
    };
    RobItem.prototype.setDisable = function (flag) {
        Global.UIHelper.setNodeGray(this.node, flag);
        this.btn.interactable = !flag;
    };
    Object.defineProperty(RobItem.prototype, "robData", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return RobItem;
}(DdzBaseView_1.default));
var DdzMultActionView = /** @class */ (function (_super) {
    __extends(DdzMultActionView, _super);
    function DdzMultActionView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    DdzMultActionView.prototype.initView = function () {
        DdzGameConst_1.default.addCommonClick(this.node, "btn0", this.onNoneMultClick, this);
        DdzGameConst_1.default.addCommonClick(this.node, "btn1", this.onMultClick, this);
        this.clockRoot = this.getChild('clockRoot');
    };
    DdzMultActionView.prototype.onNoneMultClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.active = false;
        Game.Server.send(this.Define.CmdMult, { selected: 1 });
    };
    DdzMultActionView.prototype.onMultClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.active = false;
        Game.Server.send(this.Define.CmdMult, { selected: 2 });
    };
    DdzMultActionView.prototype.getClockWorldPos = function () {
        var pos = this.clockRoot.parent.convertToWorldSpaceAR(this.clockRoot.position);
        return pos;
    };
    return DdzMultActionView;
}(DdzBaseView_1.default));
var DdzPlayActionView = /** @class */ (function (_super) {
    __extends(DdzPlayActionView, _super);
    function DdzPlayActionView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    DdzPlayActionView.prototype.initView = function () {
        DdzGameConst_1.default.addCommonClick(this.node, "btn0", this.onNoPlayClick, this);
        this.passBtn = this.getComponent('btn0', cc.Button);
        DdzGameConst_1.default.addCommonClick(this.node, "btn1", this.onPromptClick, this);
        this.promptBtn = this.getComponent('btn1', cc.Button);
        DdzGameConst_1.default.addCommonClick(this.node, "btn2", this.onPlayClick, this);
        this.playBtn = this.getComponent('btn2', cc.Button);
        this.clockRoot = this.getChild('clockRoot');
    };
    DdzPlayActionView.prototype.onNoPlayClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.active = false;
        Game.Server.send(this.Define.CmdPass, {});
    };
    DdzPlayActionView.prototype.onPromptClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        var result = this.PlayRuleHelper.getOneRecommend();
        if (result) {
            Game.Event.event(DdzGameEvent_1.default.OnSelfPromptPokers, result);
        }
        else {
            this.PlayRuleHelper.resetRecommendGen();
            var result_1 = this.PlayRuleHelper.getOneRecommend();
            if (result_1) {
                Game.Event.event(DdzGameEvent_1.default.OnSelfPromptPokers, result_1);
            }
        }
    };
    DdzPlayActionView.prototype.enablePromptBtn = function (flag) {
        Global.UIHelper.setNodeGray(this.promptBtn.node, !flag);
        this.promptBtn.interactable = flag;
    };
    DdzPlayActionView.prototype.enablePassBtn = function (flag) {
        Global.UIHelper.setNodeGray(this.passBtn.node, !flag);
        this.passBtn.interactable = flag;
    };
    DdzPlayActionView.prototype.onPlayClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        var curSelectPokers = this.Context.getSelectPokers();
        var curSelectPlayData = this.PlayRuleHelper.getPokersType(curSelectPokers);
        var type = curSelectPlayData.type;
        Game.Server.send(this.Define.CmdPlay, { type: type, cards: curSelectPokers });
        this.Context.set(this.Define.FieldOnPlayAction, true);
        this.active = false;
    };
    DdzPlayActionView.prototype.onOpen = function () {
        this.enablePlayBtn();
        Game.Event.on(DdzGameEvent_1.default.EnableSelect, this, this.enablePlayBtn);
    };
    Object.defineProperty(DdzPlayActionView.prototype, "CanPlay", {
        set: function (flag) {
            if (this._canPlay === flag)
                return;
            this._canPlay = flag;
            Global.UIHelper.setNodeGray(this.playBtn.node, !flag);
            this.playBtn.interactable = flag;
        },
        enumerable: false,
        configurable: true
    });
    DdzPlayActionView.prototype.enablePlayBtn = function () {
        var isCanPlay = false;
        var curSelectPokers = this.Context.getSelectPokers();
        if (curSelectPokers.length > 0) {
            var curOnPlayData = this.Context.get(this.Define.FieldOnOutPokers);
            var curSelectPlayData = this.PlayRuleHelper.getPokersType(curSelectPokers);
            isCanPlay = this.PlayRuleHelper.checkPlayOnRule(curOnPlayData, curSelectPlayData);
        }
        this.CanPlay = isCanPlay;
    };
    DdzPlayActionView.prototype.getClockWorldPos = function () {
        var pos = this.clockRoot.parent.convertToWorldSpaceAR(this.clockRoot.position);
        return pos;
    };
    DdzPlayActionView.prototype.onClose = function () {
        Game.Event.off(DdzGameEvent_1.default.EnableSelect, this, this.enablePlayBtn);
    };
    return DdzPlayActionView;
}(DdzBaseView_1.default));
var DdzCannotPlay = /** @class */ (function (_super) {
    __extends(DdzCannotPlay, _super);
    function DdzCannotPlay(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    DdzCannotPlay.prototype.initView = function () {
        DdzGameConst_1.default.addCommonClick(this.node, "btn0", this.onPassClick, this);
        this.clockRoot = this.getChild('clockRoot');
    };
    DdzCannotPlay.prototype.onPassClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.active = false;
        Game.Server.send(this.Define.CmdPass, {});
    };
    DdzCannotPlay.prototype.getClockWorldPos = function () {
        var pos = this.clockRoot.parent.convertToWorldSpaceAR(this.clockRoot.position);
        return pos;
    };
    return DdzCannotPlay;
}(DdzBaseView_1.default));
var DdzRewardActionView = /** @class */ (function (_super) {
    __extends(DdzRewardActionView, _super);
    function DdzRewardActionView(node) {
        var _this = _super.call(this) || this;
        _this.clickLimit = false;
        _this.setNode(node);
        return _this;
    }
    DdzRewardActionView.prototype.initView = function () {
        DdzGameConst_1.default.addCommonClick(this.node, "gameBtn", this.onGameClick, this);
        DdzGameConst_1.default.addCommonClick(this.node, "exitBtn", this.onExitClick, this);
    };
    DdzRewardActionView.prototype.onGameClick = function () {
        var _this = this;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        if (this.clickLimit)
            return;
        DdzDriver_1.default.instance.reMatchPlayer();
        this.clickLimit = true;
        Game.Component.scheduleOnce(function () {
            _this.clickLimit = false;
        }, 3);
    };
    DdzRewardActionView.prototype.onExitClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
        DdzDriver_1.default.instance.leaveGame();
    };
    DdzRewardActionView.prototype.onOpen = function () {
        this.clickLimit = false;
    };
    return DdzRewardActionView;
}(DdzBaseView_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkekFza0FjdGlvblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLHFEQUFnRDtBQUNoRCx1REFBc0Q7QUFDdEQsMENBQXFDO0FBQ3JDLHFEQUFnRDtBQUVoRDs7R0FFRztBQUNIO0lBQThDLG9DQUFXO0lBVXJELDBCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLG1DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM1QixzQkFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0Isc0JBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlC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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekJhc2VWaWV3IGZyb20gXCIuL0RkekJhc2VWaWV3XCI7XHJcbmltcG9ydCBEZHpHYW1lRXZlbnQgZnJvbSBcIi4uL2RhdGEvRGR6R2FtZUV2ZW50XCI7XHJcbmltcG9ydCB7IERkekF1ZGlvQ29uc3QgfSBmcm9tIFwiLi4vZGF0YS9EZHpQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBEZHpEcml2ZXIgZnJvbSBcIi4uL0RkekRyaXZlclwiO1xyXG5pbXBvcnQgRGR6R2FtZUNvbnN0IGZyb20gXCIuLi9kYXRhL0RkekdhbWVDb25zdFwiO1xyXG5cclxuLyoqXHJcbiAqIOWHuueJjOetieaMiemSrueahHZpZXdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkekFza0FjdGlvblZpZXcgZXh0ZW5kcyBEZHpCYXNlVmlldyB7XHJcbiAgICBwcml2YXRlIGF1dG9CdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNhbmNlbEF1dG86IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGN1clZpZXc6IGFueTtcclxuICAgIHB1YmxpYyBtdWx0QWN0aW9uVmlldzogRGR6TXVsdEFjdGlvblZpZXc7XHJcbiAgICBwdWJsaWMgcm9iQWN0aW9uVmlldzogRGR6Um9iRHpBY3Rpb25WaWV3O1xyXG4gICAgcHVibGljIHBsYXlBY3Rpb25WaWV3OiBEZHpQbGF5QWN0aW9uVmlldztcclxuICAgIHB1YmxpYyBjYW5ub3RQbGF5QWN0aW9uVmlldzogRGR6Q2Fubm90UGxheTtcclxuICAgIHB1YmxpYyByZXdhcmRBY3Rpb25WaWV3OiBEZHpSZXdhcmRBY3Rpb25WaWV3O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuID0gdGhpcy5nZXRDaGlsZCgnYXV0b0J0bicpO1xyXG4gICAgICAgIHRoaXMuYXV0b0J0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5hdXRvQnRuLCBcIlwiLCB0aGlzLm9uQXV0b1BsYXlDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxBdXRvID0gdGhpcy5nZXRDaGlsZCgnY2FuY2VsQXV0bycpO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsQXV0by5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImNhbmNlbEF1dG8vYnRuQ2FuY2VsXCIsIHRoaXMub25DYW5jZWxBdXRvQ2xpY2ssIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnJvYkFjdGlvblZpZXcgPSBuZXcgRGR6Um9iRHpBY3Rpb25WaWV3KHRoaXMuZ2V0Q2hpbGQoJ3JvYicpKTtcclxuICAgICAgICB0aGlzLnJvYkFjdGlvblZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tdWx0QWN0aW9uVmlldyA9IG5ldyBEZHpNdWx0QWN0aW9uVmlldyh0aGlzLmdldENoaWxkKCdtdWx0JykpO1xyXG4gICAgICAgIHRoaXMubXVsdEFjdGlvblZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF5QWN0aW9uVmlldyA9IG5ldyBEZHpQbGF5QWN0aW9uVmlldyh0aGlzLmdldENoaWxkKCdwbGF5JykpO1xyXG4gICAgICAgIHRoaXMucGxheUFjdGlvblZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW5ub3RQbGF5QWN0aW9uVmlldyA9IG5ldyBEZHpDYW5ub3RQbGF5KHRoaXMuZ2V0Q2hpbGQoJ25vdFBsYXknKSk7XHJcbiAgICAgICAgdGhpcy5jYW5ub3RQbGF5QWN0aW9uVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJld2FyZEFjdGlvblZpZXcgPSBuZXcgRGR6UmV3YXJkQWN0aW9uVmlldyh0aGlzLmdldENoaWxkKCdyZXdhcmQnKSk7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRBY3Rpb25WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BdXRvUGxheUNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRBdXRvUGxheUJ0blNob3coZmFsc2UpO1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kQXV0bywgeyBhdXRvX3BsYXk6IDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNhbmNlbEF1dG9DbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2V0QXV0b1BsYXlCdG5TaG93KHRydWUpO1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kQXV0bywgeyBhdXRvX3BsYXk6IDAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEF1dG9QbGF5QnRuU2hvdyhpc1Nob3c6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uYWN0aXZlID0gaXNTaG93O1xyXG4gICAgICAgIHRoaXMuY2FuY2VsQXV0by5hY3RpdmUgPSAhaXNTaG93O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRSb2JWaWV3U2hvdyhpc1Nob3c6IGJvb2xlYW4sIGxhbmRfaXRlbXMgPSBbXSwgbWlzc19pdGVtcyA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5yb2JBY3Rpb25WaWV3LmFjdGl2ZSA9IGlzU2hvdztcclxuICAgICAgICBpZiAoaXNTaG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9iQWN0aW9uVmlldy5kaXNhYmxlTWlzc0l0ZW0obWlzc19pdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyVmlldyA9IHRoaXMucm9iQWN0aW9uVmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmN1clZpZXcgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNdWx0Vmlld1Nob3coaXNTaG93OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5tdWx0QWN0aW9uVmlldy5hY3RpdmUgPSBpc1Nob3c7XHJcbiAgICAgICAgaWYgKGlzU2hvdylcclxuICAgICAgICAgICAgdGhpcy5jdXJWaWV3ID0gdGhpcy5tdWx0QWN0aW9uVmlldztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY3VyVmlldyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBsYXlWaWV3U2hvdyhpc1Nob3c6IGJvb2xlYW4sIGlzUHJvbXB0ID0gdHJ1ZSwgaXNQYXNzID0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMucGxheUFjdGlvblZpZXcuYWN0aXZlID0gaXNTaG93O1xyXG4gICAgICAgIGlmIChpc1Nob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uVmlldy5lbmFibGVQcm9tcHRCdG4oaXNQcm9tcHQpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBY3Rpb25WaWV3LmVuYWJsZVBhc3NCdG4oaXNQYXNzKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJWaWV3ID0gdGhpcy5wbGF5QWN0aW9uVmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmN1clZpZXcgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDYW5ub3RQbGF5Vmlld1Nob3coaXNTaG93OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5jYW5ub3RQbGF5QWN0aW9uVmlldy5hY3RpdmUgPSBpc1Nob3c7XHJcbiAgICAgICAgaWYgKGlzU2hvdylcclxuICAgICAgICAgICAgdGhpcy5jdXJWaWV3ID0gdGhpcy5jYW5ub3RQbGF5QWN0aW9uVmlldztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY3VyVmlldyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFjdGlvbkNsb2NrV29ybGRQb3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyVmlldylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VyVmlldy5nZXRDbG9ja1dvcmxkUG9zKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCA1MCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UmV3YXJkQWN0aW9uVmlldyhpc1Nob3c6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnJld2FyZEFjdGlvblZpZXcuYWN0aXZlID0gaXNTaG93O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY3VyVmlldyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxBdXRvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5R2FtZSgpIHtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxBdXRvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucm9iQWN0aW9uVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm11bHRBY3Rpb25WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGxheUFjdGlvblZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW5ub3RQbGF5QWN0aW9uVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJld2FyZEFjdGlvblZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jdXJWaWV3ID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGR6Um9iRHpBY3Rpb25WaWV3IGV4dGVuZHMgRGR6QmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBjbG9ja1Jvb3Q6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGl0ZW1MaXN0OiBSb2JJdGVtW10gPSBbXTtcclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9ja1Jvb3QgPSB0aGlzLmdldENoaWxkKCdjbG9ja1Jvb3QnKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJ0bk5vZGUgPSB0aGlzLmdldENoaWxkKCdidG4nICsgaSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUxpc3QucHVzaChuZXcgUm9iSXRlbShidG5Ob2RlLCBpLCB0aGlzLm9uUm9iQWN0aW9uLCB0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlTWlzc0l0ZW0oaXRlbXM6IG51bWJlcltdID0gW10pIHtcclxuICAgICAgICB0aGlzLml0ZW1MaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBpdGVtLnJvYkRhdGE7XHJcbiAgICAgICAgICAgIGlmIChpdGVtcy5pbmRleE9mKG51bSkgPiAtMSlcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0RGlzYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXREaXNhYmxlKGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Sb2JBY3Rpb24obnVtKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZExhbmRsb3JkLCB7IHNlbGVjdGVkOiBudW0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENsb2NrV29ybGRQb3MoKSB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuY2xvY2tSb290LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5jbG9ja1Jvb3QucG9zaXRpb24pO1xyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFJvYkl0ZW0gZXh0ZW5kcyBEZHpCYXNlVmlldyB7XHJcbiAgICBwcml2YXRlIGJ0bjogY2MuQnV0dG9uO1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSwgcHJpdmF0ZSBkYXRhOiBudW1iZXIsIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uLCBwcml2YXRlIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiXCIsIHRoaXMub25Sb2JCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5idG4gPSA8Y2MuQnV0dG9uPnRoaXMuZ2V0Q29tcG9uZW50KCcnLCBjYy5CdXR0b24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Sb2JCdG5DbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrICYmIHRoaXMudGFyZ2V0KVxyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy50YXJnZXQsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERpc2FibGUoZmxhZykge1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5zZXROb2RlR3JheSh0aGlzLm5vZGUsIGZsYWcpO1xyXG4gICAgICAgIHRoaXMuYnRuLmludGVyYWN0YWJsZSA9ICFmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcm9iRGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEZHpNdWx0QWN0aW9uVmlldyBleHRlbmRzIERkekJhc2VWaWV3IHtcclxuICAgIHByaXZhdGUgY2xvY2tSb290OiBjYy5Ob2RlO1xyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImJ0bjBcIiwgdGhpcy5vbk5vbmVNdWx0Q2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiYnRuMVwiLCB0aGlzLm9uTXVsdENsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNsb2NrUm9vdCA9IHRoaXMuZ2V0Q2hpbGQoJ2Nsb2NrUm9vdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ob25lTXVsdENsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZE11bHQsIHsgc2VsZWN0ZWQ6IDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk11bHRDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRNdWx0LCB7IHNlbGVjdGVkOiAyIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDbG9ja1dvcmxkUG9zKCkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmNsb2NrUm9vdC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuY2xvY2tSb290LnBvc2l0aW9uKTtcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEZHpQbGF5QWN0aW9uVmlldyBleHRlbmRzIERkekJhc2VWaWV3IHtcclxuICAgIHByaXZhdGUgY2xvY2tSb290OiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBwbGF5QnRuOiBjYy5CdXR0b247XHJcbiAgICBwcml2YXRlIF9jYW5QbGF5OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBwcm9tcHRCdG46IGNjLkJ1dHRvbjtcclxuICAgIHByaXZhdGUgcGFzc0J0bjogY2MuQnV0dG9uO1xyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImJ0bjBcIiwgdGhpcy5vbk5vUGxheUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnBhc3NCdG4gPSA8Y2MuQnV0dG9uPnRoaXMuZ2V0Q29tcG9uZW50KCdidG4wJywgY2MuQnV0dG9uKTtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImJ0bjFcIiwgdGhpcy5vblByb21wdENsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnByb21wdEJ0biA9IDxjYy5CdXR0b24+dGhpcy5nZXRDb21wb25lbnQoJ2J0bjEnLCBjYy5CdXR0b24pO1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiYnRuMlwiLCB0aGlzLm9uUGxheUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnBsYXlCdG4gPSA8Y2MuQnV0dG9uPnRoaXMuZ2V0Q29tcG9uZW50KCdidG4yJywgY2MuQnV0dG9uKTtcclxuICAgICAgICB0aGlzLmNsb2NrUm9vdCA9IHRoaXMuZ2V0Q2hpbGQoJ2Nsb2NrUm9vdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ob1BsYXlDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRQYXNzLCB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblByb21wdENsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuUGxheVJ1bGVIZWxwZXIuZ2V0T25lUmVjb21tZW5kKCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KERkekdhbWVFdmVudC5PblNlbGZQcm9tcHRQb2tlcnMsIHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXlSdWxlSGVscGVyLnJlc2V0UmVjb21tZW5kR2VuKCk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLlBsYXlSdWxlSGVscGVyLmdldE9uZVJlY29tbWVuZCgpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KERkekdhbWVFdmVudC5PblNlbGZQcm9tcHRQb2tlcnMsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuYWJsZVByb21wdEJ0bihmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KHRoaXMucHJvbXB0QnRuLm5vZGUsICFmbGFnKTtcclxuICAgICAgICB0aGlzLnByb21wdEJ0bi5pbnRlcmFjdGFibGUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmFibGVQYXNzQnRuKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuc2V0Tm9kZUdyYXkodGhpcy5wYXNzQnRuLm5vZGUsICFmbGFnKTtcclxuICAgICAgICB0aGlzLnBhc3NCdG4uaW50ZXJhY3RhYmxlID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUGxheUNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGN1clNlbGVjdFBva2VycyA9IHRoaXMuQ29udGV4dC5nZXRTZWxlY3RQb2tlcnMoKTtcclxuICAgICAgICBsZXQgY3VyU2VsZWN0UGxheURhdGEgPSB0aGlzLlBsYXlSdWxlSGVscGVyLmdldFBva2Vyc1R5cGUoY3VyU2VsZWN0UG9rZXJzKTtcclxuICAgICAgICBsZXQgdHlwZSA9IGN1clNlbGVjdFBsYXlEYXRhLnR5cGU7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRQbGF5LCB7IHR5cGU6IHR5cGUsIGNhcmRzOiBjdXJTZWxlY3RQb2tlcnMgfSk7XHJcbiAgICAgICAgdGhpcy5Db250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZE9uUGxheUFjdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlUGxheUJ0bigpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oRGR6R2FtZUV2ZW50LkVuYWJsZVNlbGVjdCwgdGhpcywgdGhpcy5lbmFibGVQbGF5QnRuKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IENhblBsYXkoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW5QbGF5ID09PSBmbGFnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fY2FuUGxheSA9IGZsYWc7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KHRoaXMucGxheUJ0bi5ub2RlLCAhZmxhZyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuLmludGVyYWN0YWJsZSA9IGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbmFibGVQbGF5QnRuKCkge1xyXG4gICAgICAgIGxldCBpc0NhblBsYXkgPSBmYWxzZTtcclxuICAgICAgICBsZXQgY3VyU2VsZWN0UG9rZXJzID0gdGhpcy5Db250ZXh0LmdldFNlbGVjdFBva2VycygpO1xyXG4gICAgICAgIGlmIChjdXJTZWxlY3RQb2tlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgY3VyT25QbGF5RGF0YSA9IHRoaXMuQ29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRPbk91dFBva2Vycyk7XHJcbiAgICAgICAgICAgIGxldCBjdXJTZWxlY3RQbGF5RGF0YSA9IHRoaXMuUGxheVJ1bGVIZWxwZXIuZ2V0UG9rZXJzVHlwZShjdXJTZWxlY3RQb2tlcnMpO1xyXG4gICAgICAgICAgICBpc0NhblBsYXkgPSB0aGlzLlBsYXlSdWxlSGVscGVyLmNoZWNrUGxheU9uUnVsZShjdXJPblBsYXlEYXRhLCBjdXJTZWxlY3RQbGF5RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FuUGxheSA9IGlzQ2FuUGxheTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2xvY2tXb3JsZFBvcygpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5jbG9ja1Jvb3QucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLmNsb2NrUm9vdC5wb3NpdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihEZHpHYW1lRXZlbnQuRW5hYmxlU2VsZWN0LCB0aGlzLCB0aGlzLmVuYWJsZVBsYXlCdG4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEZHpDYW5ub3RQbGF5IGV4dGVuZHMgRGR6QmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBjbG9ja1Jvb3Q6IGNjLk5vZGU7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiYnRuMFwiLCB0aGlzLm9uUGFzc0NsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNsb2NrUm9vdCA9IHRoaXMuZ2V0Q2hpbGQoJ2Nsb2NrUm9vdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25QYXNzQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkJ1dHRvbkNsaWNrLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kUGFzcywge30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDbG9ja1dvcmxkUG9zKCkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmNsb2NrUm9vdC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuY2xvY2tSb290LnBvc2l0aW9uKTtcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEZHpSZXdhcmRBY3Rpb25WaWV3IGV4dGVuZHMgRGR6QmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBjbGlja0xpbWl0ID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiZ2FtZUJ0blwiLCB0aGlzLm9uR2FtZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImV4aXRCdG5cIiwgdGhpcy5vbkV4aXRDbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdhbWVDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWNrTGltaXQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UucmVNYXRjaFBsYXllcigpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tMaW1pdCA9IHRydWU7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0xpbWl0ID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkV4aXRDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kTGVhdmUsIHsgXCJJc0Nsb3NlXCI6IDEgfSk7XHJcbiAgICAgICAgRGR6RHJpdmVyLmluc3RhbmNlLmxlYXZlR2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja0xpbWl0ID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=