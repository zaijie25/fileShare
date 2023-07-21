"use strict";
cc._RF.push(module, '2b811S4yFhInIxLzZpPNsEl', 'ErmjSettleView');
// ermj/Ermj/scripts/subView/ErmjSettleView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjRuleConst_1 = require("../data/ErmjRuleConst");
var ErmjMjStyleHelper_1 = require("../tool/ErmjMjStyleHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjSettleView = /** @class */ (function (_super) {
    __extends(ErmjSettleView, _super);
    function ErmjSettleView(node) {
        var _this = _super.call(this) || this;
        _this.clickLimit = false;
        _this.typeItemList = [];
        _this.nextIndex = 0;
        _this.winMjList = [];
        _this.isPressed = false;
        _this.setNode(node);
        return _this;
    }
    ErmjSettleView.prototype.initView = function () {
        this.maskNode = this.getChild("mask");
        this.actionNode = this.getChild("action");
        ErmjGameConst_1.default.addCommonClick(this.node, "action/continueBtn", this.onContinueClick, this);
        ErmjGameConst_1.default.addCommonClick(this.node, "action/leaveBtn", this.onLeaveClick, this);
        this.contentNode = this.getChild("contentMask/content");
        this.winInfoView = new WinInfoView(this.getChild("contentMask/content/winNode"));
        this.loseInfoView = new LoseInfoView(this.getChild("contentMask/content/loseNode"));
        this.typeScrollView = this.getComponent("contentMask/content/typeScrollView", cc.ScrollView);
        this.listLayout = this.getComponent("contentMask/content/typeScrollView/mask/listLayout", cc.Layout);
        this.copyTypeItem = new FanTypeView(this.getChild("contentMask/content/typeScrollView/mask/listLayout/typeNode"));
        this.copyTypeItem.active = false;
        this.winTypeSp = this.getComponent("contentMask/content/winType", cc.Sprite);
        this.initWinMjList();
        this.hideBtn = this.getChild("hideBtn");
        this.upIcon = this.getChild("hideBtn/up");
        this.downIcon = this.getChild("hideBtn/down");
        ErmjGameConst_1.default.addCommonClick(this.hideBtn, "", this.hideBtnClick, this);
        this.rawPos = this.contentNode.position;
    };
    ErmjSettleView.prototype.initWinMjList = function () {
        this.winMjListNode = this.getChild("contentMask/content/winMjList");
        var copyMjNode = this.getChild("contentMask/content/winMjList/winMjView");
        var view = new WinMjItemView(copyMjNode);
        view.active = true;
        this.winMjList.push(view);
        var maxCount = this.Define.HandMjMaxCount + 4; // 最多4个杠 多4张
        for (var i = 0; i < maxCount; i++) {
            var node = cc.instantiate(copyMjNode);
            node.setParent(this.winMjListNode);
            var view_1 = new WinMjItemView(node);
            view_1.active = true;
            this.winMjList.push(view_1);
        }
    };
    ErmjSettleView.prototype.onOpen = function () {
        var _this = this;
        this.clickLimit = false;
        this.hideBtn.active = false;
        // 强制显示结算面板
        this.isPressed = false;
        this.showContent(false);
        this.contentNode.opacity = 1;
        this.contentNode.runAction(cc.sequence([
            cc.fadeTo(0.5, 255),
            cc.callFunc(function () {
                _this.hideBtn.active = true;
            }, this)
        ]));
        this.actionNode.active = false;
        this.delayShowActionBtn(5000); // 以防没收到服务器协议情况
    };
    /** 等待多少ms后显示退出和继续按钮 等待服务器清桌 */
    ErmjSettleView.prototype.delayShowActionBtn = function (delay) {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.showActionBtn(true);
        }, delay);
    };
    ErmjSettleView.prototype.showActionBtn = function (flag) {
        this.actionNode.active = flag;
        if (flag) {
            this.actionNode.opacity = 1;
            this.actionNode.stopAllActions();
            this.actionNode.runAction(cc.fadeTo(0.2, 255));
        }
        clearTimeout(this.timer);
    };
    ErmjSettleView.prototype.onClose = function () {
        this.contentNode.stopAllActions();
        this.contentNode.opacity = 255;
        clearTimeout(this.timer);
    };
    ErmjSettleView.prototype.hideBtnClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.showContent(true);
    };
    ErmjSettleView.prototype.showContent = function (isTween) {
        if (isTween === void 0) { isTween = true; }
        if (this.isPressed) {
            var offset = cc.v3(0, 600);
            this.isPressed = false;
            this.upIcon.active = false;
            this.downIcon.active = true;
            this.contentNode.stopAllActions();
            this.maskNode.opacity = 50;
            if (isTween) {
                this.contentNode.runAction(cc.moveBy(0.2, cc.v2(offset.x, offset.y)).easing(cc.easeIn(1)));
            }
            else {
                this.contentNode.setPosition(this.rawPos.add(offset));
            }
        }
        else {
            this.isPressed = true;
            this.upIcon.active = true;
            this.downIcon.active = false;
            this.contentNode.active = true;
            this.contentNode.stopAllActions();
            this.maskNode.opacity = 153;
            if (isTween) {
                this.contentNode.runAction(cc.moveTo(0.2, cc.v2(this.rawPos.x, this.rawPos.y)).easing(cc.easeOut(1)));
            }
            else {
                this.contentNode.setPosition(this.rawPos);
            }
        }
    };
    ErmjSettleView.prototype.onContinueClick = function () {
        var _this = this;
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ContinueGame, true);
        if (this.clickLimit)
            return;
        ErmjDriver_1.default.instance.reMatchPlayer();
        this.clickLimit = true;
        Game.Component.scheduleOnce(function () {
            _this.clickLimit = false;
        }, 3);
    };
    ErmjSettleView.prototype.onLeaveClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
        ErmjDriver_1.default.instance.leaveGame();
    };
    ErmjSettleView.prototype.showSettleInfo = function (isWin, award, fan, details, all_hand_cards) {
        this.winInfoView.active = isWin;
        this.loseInfoView.active = !isWin;
        if (isWin) {
            ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.RewardWin, true);
            this.winInfoView.showInfo(fan, award);
        }
        else {
            ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.RewardLose, true);
            this.loseInfoView.showInfo(fan, award);
        }
        for (var chair in details) {
            var info = details[chair];
            if (info) {
                this.showFanList(info.fan_detail);
                this.showWinCardsList(all_hand_cards[chair], info.block_list || []);
                return; // 二人麻将就一个赢家
            }
        }
    };
    ErmjSettleView.prototype.setWinType = function (type) {
        var str = type == 1 ? ErmjGameConst_1.default.StateSpStrCfg.WinAll : type == 2 ? ErmjGameConst_1.default.StateSpStrCfg.Win : ErmjGameConst_1.default.StateSpStrCfg.RobWin;
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.winTypeSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", str, null, true);
    };
    ErmjSettleView.prototype.showFanList = function (fanDetail) {
        if (!fanDetail)
            return;
        for (var key in fanDetail) {
            var config = ErmjRuleConst_1.default.cardTypeConfig[key] || {};
            var item = this.getOneTypeItem();
            item.active = true;
            this.nextIndex += 1;
            item.setContext(config.name, fanDetail[key]);
        }
        this.typeScrollView.scrollToTop(0);
    };
    /**
     * 展示赢麻将
     * @param userCards 胡手上牌    加上吃碰杠14张
     * @param operList 吃碰杠数组 可能为null
     */
    ErmjSettleView.prototype.showWinCardsList = function (userCards, operList) {
        var _this = this;
        if (operList === void 0) { operList = []; }
        if (!userCards)
            return;
        var start = cc.Vec3.ZERO;
        var offset = cc.v3(62, 0);
        var spaceOffset = cc.v3(15, 0);
        var kongLastOffset = cc.v3(0, 22);
        var mjIndex = 0;
        // 吃碰杠展示
        operList.forEach(function (info) {
            var all_cards = info.all_cards || [];
            all_cards.forEach(function (value, index) {
                var mjItem = _this.winMjList[mjIndex];
                if (mjItem) {
                    mjItem.active = true;
                    mjItem.mahjongValue = value;
                    if (info.type == 6 && index != 3) // 暗杠并且不是第四张
                        mjItem.isFront = false;
                    else
                        mjItem.isFront = true;
                    if ((info.type == 4 || info.type == 5 || info.type == 6) && index == 3) { // 杠牌第四张 堆到前两张上面
                        var tempPos = start.sub(offset.mul(2)).add(kongLastOffset);
                        mjItem.node.setPosition(tempPos);
                    }
                    else {
                        mjItem.node.setPosition(start);
                        start = start.add(offset);
                    }
                }
                mjIndex++;
            });
            start = start.add(spaceOffset);
        });
        // 手牌展示
        userCards.forEach(function (value, index) {
            var mjItem = _this.winMjList[mjIndex];
            if (mjItem) {
                mjItem.active = true;
                mjItem.mahjongValue = value;
                mjItem.isFront = true;
                if (index == userCards.length - 1) {
                    mjItem.node.setPosition(start.add(spaceOffset)); // 最后一张是胡牌, 隔开
                }
                else {
                    mjItem.node.setPosition(start);
                }
                start = start.add(offset);
            }
            mjIndex++;
        });
        // 隐藏剩余未使用牌
        if (mjIndex < this.winMjList.length) {
            for (var i = mjIndex; i < this.winMjList.length; i++) {
                this.winMjList[i].active = false;
            }
        }
    };
    ErmjSettleView.prototype.getOneTypeItem = function () {
        if (!this.typeItemList[this.nextIndex]) {
            var node = cc.instantiate(this.copyTypeItem.node);
            node.setParent(this.listLayout.node);
            var view = new FanTypeView(node);
            this.typeItemList.push(view);
        }
        return this.typeItemList[this.nextIndex];
    };
    ErmjSettleView.prototype.hideAllTypeItem = function () {
        this.typeItemList.forEach(function (item) {
            item.active = false;
        });
    };
    ErmjSettleView.prototype.clearByRound = function () {
        this.hideAllTypeItem();
        this.nextIndex = 0;
        this.winInfoView.active = false;
        this.loseInfoView.active = false;
        this.active = false;
    };
    return ErmjSettleView;
}(ErmjBaseView_1.default));
exports.default = ErmjSettleView;
var WinInfoView = /** @class */ (function (_super) {
    __extends(WinInfoView, _super);
    function WinInfoView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    WinInfoView.prototype.initView = function () {
        this.multLbl = this.getComponent("multLbl", cc.Label);
        this.winLbl = this.getComponent("winLbl", cc.Label);
        this.effectSk = this.getComponent("effect", sp.Skeleton);
    };
    WinInfoView.prototype.showInfo = function (nMult, nWin) {
        this.multLbl.string = nMult.toString();
        this.winLbl.string = Global.Toolkit.formatPointStr(nWin, false, true);
        this.effectSk.node.active = true;
        this.effectSk.setAnimation(0, "idle", false);
        this.effectSk.addAnimation(0, "idle2", true, 1);
    };
    WinInfoView.prototype.onClose = function () {
        this.effectSk.node.active = false;
        this.effectSk.clearTracks();
    };
    return WinInfoView;
}(ErmjBaseView_1.default));
var LoseInfoView = /** @class */ (function (_super) {
    __extends(LoseInfoView, _super);
    function LoseInfoView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    LoseInfoView.prototype.initView = function () {
        this.multLbl = this.getComponent("multLbl", cc.Label);
        this.winLbl = this.getComponent("winLbl", cc.Label);
        this.effectSk = this.getComponent("effect", sp.Skeleton);
    };
    LoseInfoView.prototype.showInfo = function (nMult, nWin) {
        this.multLbl.string = nMult.toString();
        this.winLbl.string = Global.Toolkit.formatPointStr(nWin, false, true);
        this.effectSk.node.active = true;
        this.effectSk.setAnimation(0, "idle", false);
    };
    LoseInfoView.prototype.onClose = function () {
        this.effectSk.node.active = false;
        this.effectSk.clearTracks();
    };
    return LoseInfoView;
}(ErmjBaseView_1.default));
var FanTypeView = /** @class */ (function (_super) {
    __extends(FanTypeView, _super);
    function FanTypeView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    FanTypeView.prototype.initView = function () {
        this.typeLbl = this.getComponent("typeLbl", cc.Label);
    };
    FanTypeView.prototype.setContext = function (name, nMult) {
        this.typeLbl.string = name + "  " + nMult + "\u756A";
    };
    return FanTypeView;
}(ErmjBaseView_1.default));
var WinMjItemView = /** @class */ (function (_super) {
    __extends(WinMjItemView, _super);
    function WinMjItemView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    WinMjItemView.prototype.initView = function () {
        this.frontBg = this.getComponent("bg", cc.Sprite);
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.backBg = this.getComponent("back", cc.Sprite);
    };
    Object.defineProperty(WinMjItemView.prototype, "mahjongValue", {
        get: function () {
            return this._value;
        },
        /** 设置牌值和图案样式 */
        set: function (value) {
            if (this._value == value)
                return;
            this._value = value;
            Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjHandMap[value], null, true);
            if (cc.sys.isBrowser)
                this.node.name = String(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WinMjItemView.prototype, "isFront", {
        /** 设置麻将正反面 */
        set: function (flag) {
            this.frontBg.node.active = flag;
            this.frontSp.node.active = flag;
            this.backBg.node.active = !flag;
        },
        enumerable: false,
        configurable: true
    });
    /** 设置正面背景特殊色提示 */
    WinMjItemView.prototype.setSpecialColor = function (flag) {
        this.frontBg.node.color = flag && ErmjMjStyleHelper_1.default.SpecialBgColor || ErmjMjStyleHelper_1.default.NormalBgColor;
    };
    return WinMjItemView;
}(ErmjBaseView_1.default));

cc._RF.pop();