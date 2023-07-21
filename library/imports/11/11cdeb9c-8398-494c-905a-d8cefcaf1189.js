"use strict";
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