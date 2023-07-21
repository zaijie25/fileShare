
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjSettleView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtalNldHRsZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLHlEQUF3RTtBQUN4RSx1REFBa0Q7QUFDbEQsK0RBQTBEO0FBQzFELHVEQUFrRDtBQUNsRCw0Q0FBdUM7QUFFdkM7SUFBNEMsa0NBQVk7SUFzQnBELHdCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBeEJPLGdCQUFVLEdBQUcsS0FBSyxDQUFDO1FBUW5CLGtCQUFZLEdBQWtCLEVBQUUsQ0FBQztRQUNqQyxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLGVBQVMsR0FBb0IsRUFBRSxDQUFDO1FBSWhDLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFRL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLGlDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUYsdUJBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXBGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFB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QUFhO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksMkJBQWlCLENBQUMsY0FBYyxJQUFJLDJCQUFpQixDQUFDLGFBQWEsQ0FBQztJQUMxRyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQTFDQSxBQTBDQyxDQTFDMkIsc0JBQVksR0EwQ3ZDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVybWpCYXNlVmlldyBmcm9tIFwiLi9Fcm1qQmFzZVZpZXdcIjtcclxuaW1wb3J0IEVybWpQYXRoSGVscGVyLCB7IEVybWpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpSdWxlQ29uc3QgZnJvbSBcIi4uL2RhdGEvRXJtalJ1bGVDb25zdFwiO1xyXG5pbXBvcnQgRXJtak1qU3R5bGVIZWxwZXIgZnJvbSBcIi4uL3Rvb2wvRXJtak1qU3R5bGVIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpHYW1lQ29uc3QgZnJvbSBcIi4uL2RhdGEvRXJtakdhbWVDb25zdFwiO1xyXG5pbXBvcnQgRXJtakRyaXZlciBmcm9tIFwiLi4vRXJtakRyaXZlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtalNldHRsZVZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGNsaWNrTGltaXQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgbWFza05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNvbnRlbnROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3aW5JbmZvVmlldzogV2luSW5mb1ZpZXc7XHJcbiAgICBwcml2YXRlIGxvc2VJbmZvVmlldzogTG9zZUluZm9WaWV3O1xyXG4gICAgcHJpdmF0ZSBsaXN0TGF5b3V0OiBjYy5MYXlvdXQ7XHJcbiAgICBwcml2YXRlIGNvcHlUeXBlSXRlbTogRmFuVHlwZVZpZXc7XHJcbiAgICBwcml2YXRlIHR5cGVTY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3O1xyXG4gICAgcHJpdmF0ZSB0eXBlSXRlbUxpc3Q6IEZhblR5cGVWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgbmV4dEluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSB3aW5Nakxpc3ROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3aW5Nakxpc3Q6IFdpbk1qSXRlbVZpZXdbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBhY3Rpb25Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB0aW1lcjogTm9kZUpTLlRpbWVvdXQ7XHJcbiAgICBwcml2YXRlIGhpZGVCdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGlzUHJlc3NlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB1cEljb246IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGRvd25JY29uOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSByYXdQb3M6IGNjLlZlYzM7XHJcbiAgICBwcml2YXRlIHdpblR5cGVTcDogY2MuU3ByaXRlO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLm1hc2tOb2RlID0gdGhpcy5nZXRDaGlsZChcIm1hc2tcIik7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25Ob2RlID0gdGhpcy5nZXRDaGlsZChcImFjdGlvblwiKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJhY3Rpb24vY29udGludWVCdG5cIiwgdGhpcy5vbkNvbnRpbnVlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImFjdGlvbi9sZWF2ZUJ0blwiLCB0aGlzLm9uTGVhdmVDbGljaywgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSB0aGlzLmdldENoaWxkKFwiY29udGVudE1hc2svY29udGVudFwiKTtcclxuICAgICAgICB0aGlzLndpbkluZm9WaWV3ID0gbmV3IFdpbkluZm9WaWV3KHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50TWFzay9jb250ZW50L3dpbk5vZGVcIikpO1xyXG4gICAgICAgIHRoaXMubG9zZUluZm9WaWV3ID0gbmV3IExvc2VJbmZvVmlldyh0aGlzLmdldENoaWxkKFwiY29udGVudE1hc2svY29udGVudC9sb3NlTm9kZVwiKSk7XHJcbiAgICAgICAgdGhpcy50eXBlU2Nyb2xsVmlldyA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY29udGVudE1hc2svY29udGVudC90eXBlU2Nyb2xsVmlld1wiLCBjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICB0aGlzLmxpc3RMYXlvdXQgPSB0aGlzLmdldENvbXBvbmVudChcImNvbnRlbnRNYXNrL2NvbnRlbnQvdHlwZVNjcm9sbFZpZXcvbWFzay9saXN0TGF5b3V0XCIsIGNjLkxheW91dCk7XHJcbiAgICAgICAgdGhpcy5jb3B5VHlwZUl0ZW0gPSBuZXcgRmFuVHlwZVZpZXcodGhpcy5nZXRDaGlsZChcImNvbnRlbnRNYXNrL2NvbnRlbnQvdHlwZVNjcm9sbFZpZXcvbWFzay9saXN0TGF5b3V0L3R5cGVOb2RlXCIpKTtcclxuICAgICAgICB0aGlzLmNvcHlUeXBlSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndpblR5cGVTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY29udGVudE1hc2svY29udGVudC93aW5UeXBlXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5pbml0V2luTWpMaXN0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaGlkZUJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJoaWRlQnRuXCIpO1xyXG4gICAgICAgIHRoaXMudXBJY29uID0gdGhpcy5nZXRDaGlsZChcImhpZGVCdG4vdXBcIik7XHJcbiAgICAgICAgdGhpcy5kb3duSWNvbiA9IHRoaXMuZ2V0Q2hpbGQoXCJoaWRlQnRuL2Rvd25cIik7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLmhpZGVCdG4sIFwiXCIsIHRoaXMuaGlkZUJ0bkNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnJhd1BvcyA9IHRoaXMuY29udGVudE5vZGUucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0V2luTWpMaXN0KCl7XHJcbiAgICAgICAgdGhpcy53aW5Nakxpc3ROb2RlID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnRNYXNrL2NvbnRlbnQvd2luTWpMaXN0XCIpO1xyXG4gICAgICAgIGxldCBjb3B5TWpOb2RlID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnRNYXNrL2NvbnRlbnQvd2luTWpMaXN0L3dpbk1qVmlld1wiKTtcclxuICAgICAgICBsZXQgdmlldyA9IG5ldyBXaW5Nakl0ZW1WaWV3KGNvcHlNak5vZGUpO1xyXG4gICAgICAgIHZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndpbk1qTGlzdC5wdXNoKHZpZXcpO1xyXG4gICAgICAgIGxldCBtYXhDb3VudCA9IHRoaXMuRGVmaW5lLkhhbmRNak1heENvdW50ICsgNDsgICAgIC8vIOacgOWkmjTkuKrmnaAg5aSaNOW8oFxyXG4gICAgICAgIGZvciAobGV0IGk9IDA7IGk8IG1heENvdW50OyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKGNvcHlNak5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLndpbk1qTGlzdE5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBXaW5Nakl0ZW1WaWV3KG5vZGUpO1xyXG4gICAgICAgICAgICB2aWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2luTWpMaXN0LnB1c2godmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKXtcclxuICAgICAgICB0aGlzLmNsaWNrTGltaXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhpZGVCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8g5by65Yi25pi+56S657uT566X6Z2i5p2/XHJcbiAgICAgICAgdGhpcy5pc1ByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dDb250ZW50KGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIGNjLmZhZGVUbygwLjUsIDI1NSksXHJcbiAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICBdKSk7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVsYXlTaG93QWN0aW9uQnRuKDUwMDApOyAgICAgICAgIC8vIOS7pemYsuayoeaUtuWIsOacjeWKoeWZqOWNj+iuruaDheWGtVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnrYnlvoXlpJrlsJFtc+WQjuaYvuekuumAgOWHuuWSjOe7p+e7reaMiemSriDnrYnlvoXmnI3liqHlmajmuIXmoYwgKi9cclxuICAgIHB1YmxpYyBkZWxheVNob3dBY3Rpb25CdG4oZGVsYXk6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dBY3Rpb25CdG4odHJ1ZSk7IFxyXG4gICAgICAgICB9LCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dBY3Rpb25CdG4oZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25Ob2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICAgICAgaWYgKGZsYWcpe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbk5vZGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbk5vZGUucnVuQWN0aW9uKGNjLmZhZGVUbygwLjIsIDI1NSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKXtcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVCdG5DbGljaygpe1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkJ1dHRvbkNsaWNrLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNob3dDb250ZW50KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0NvbnRlbnQoaXNUd2VlbjogYm9vbGVhbiA9IHRydWUpe1xyXG4gICAgICAgIGlmICh0aGlzLmlzUHJlc3NlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBjYy52MygwLCA2MDApO1xyXG4gICAgICAgICAgICB0aGlzLmlzUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVwSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kb3duSWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnROb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm1hc2tOb2RlLm9wYWNpdHkgPSA1MDtcclxuICAgICAgICAgICAgaWYgKGlzVHdlZW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5ydW5BY3Rpb24oY2MubW92ZUJ5KDAuMiwgY2MudjIob2Zmc2V0LngsIG9mZnNldC55KSkuZWFzaW5nKGNjLmVhc2VJbigxKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnROb2RlLnNldFBvc2l0aW9uKHRoaXMucmF3UG9zLmFkZChvZmZzZXQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cEljb24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kb3duSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnROb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFza05vZGUub3BhY2l0eSA9IDE1MztcclxuICAgICAgICAgICAgaWYgKGlzVHdlZW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMiwgY2MudjIodGhpcy5yYXdQb3MueCwgdGhpcy5yYXdQb3MueSkpLmVhc2luZyhjYy5lYXNlT3V0KDEpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudE5vZGUuc2V0UG9zaXRpb24odGhpcy5yYXdQb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250aW51ZUNsaWNrKCl7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQ29udGludWVHYW1lLCB0cnVlKTtcclxuICAgICAgICBpZiAodGhpcy5jbGlja0xpbWl0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5yZU1hdGNoUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5jbGlja0xpbWl0ID0gdHJ1ZTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jbGlja0xpbWl0ID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxlYXZlQ2xpY2soKXtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRMZWF2ZSwgeyBcIklzQ2xvc2VcIjogMSB9KTtcclxuICAgICAgICBFcm1qRHJpdmVyLmluc3RhbmNlLmxlYXZlR2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93U2V0dGxlSW5mbyhpc1dpbjogYm9vbGVhbiwgYXdhcmQ6IG51bWJlciwgZmFuOiBudW1iZXIsIGRldGFpbHM6IGFueVtdLCBhbGxfaGFuZF9jYXJkczogYW55KXtcclxuICAgICAgICB0aGlzLndpbkluZm9WaWV3LmFjdGl2ZSA9IGlzV2luO1xyXG4gICAgICAgIHRoaXMubG9zZUluZm9WaWV3LmFjdGl2ZSA9ICFpc1dpbjtcclxuICAgICAgICBpZiAoaXNXaW4pe1xyXG4gICAgICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5SZXdhcmRXaW4sIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLndpbkluZm9WaWV3LnNob3dJbmZvKGZhbiwgYXdhcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5SZXdhcmRMb3NlLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5sb3NlSW5mb1ZpZXcuc2hvd0luZm8oZmFuLCBhd2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgY2hhaXIgaW4gZGV0YWlscyl7ICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGluZm8gPSBkZXRhaWxzW2NoYWlyXTtcclxuICAgICAgICAgICAgaWYgKGluZm8pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFuTGlzdChpbmZvLmZhbl9kZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93V2luQ2FyZHNMaXN0KGFsbF9oYW5kX2NhcmRzW2NoYWlyXSwgaW5mby5ibG9ja19saXN0IHx8IFtdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgICAgIC8vIOS6jOS6uum6u+WwhuWwseS4gOS4qui1ouWutlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRXaW5UeXBlKHR5cGU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHN0ciA9IHR5cGUgPT0gMSA/IEVybWpHYW1lQ29uc3QuU3RhdGVTcFN0ckNmZy5XaW5BbGwgOiB0eXBlID09IDIgPyBFcm1qR2FtZUNvbnN0LlN0YXRlU3BTdHJDZmcuV2luIDogRXJtakdhbWVDb25zdC5TdGF0ZVNwU3RyQ2ZnLlJvYldpbjtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoRXJtakdhbWVDb25zdC5HaWQsIHRoaXMud2luVHlwZVNwLCBFcm1qUGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImR5bmFtaWMvYXRsYXNfZHluYW1pY1wiLCBzdHIsIG51bGwsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0Zhbkxpc3QoZmFuRGV0YWlsOiBhbnkpe1xyXG4gICAgICAgIGlmICghZmFuRGV0YWlsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gZmFuRGV0YWlsKXtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IEVybWpSdWxlQ29uc3QuY2FyZFR5cGVDb25maWdba2V5XSB8fCB7fTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmdldE9uZVR5cGVJdGVtKCk7XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5uZXh0SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgaXRlbS5zZXRDb250ZXh0KGNvbmZpZy5uYW1lLCBmYW5EZXRhaWxba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHlwZVNjcm9sbFZpZXcuc2Nyb2xsVG9Ub3AoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsZXnpLrotaLpurvlsIZcclxuICAgICAqIEBwYXJhbSB1c2VyQ2FyZHMg6IOh5omL5LiK54mMICAgIOWKoOS4iuWQg+eisOadoDE05bygXHJcbiAgICAgKiBAcGFyYW0gb3Blckxpc3Qg5ZCD56Kw5p2g5pWw57uEIOWPr+iDveS4um51bGxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93V2luQ2FyZHNMaXN0KHVzZXJDYXJkczogbnVtYmVyW10sIG9wZXJMaXN0OiBhbnlbXSA9IFtdKXtcclxuICAgICAgICBpZiAoIXVzZXJDYXJkcylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBzdGFydCA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICBjb25zdCBvZmZzZXQgPSBjYy52Myg2MiwgMCk7XHJcbiAgICAgICAgY29uc3Qgc3BhY2VPZmZzZXQgPSBjYy52MygxNSwgMCk7XHJcbiAgICAgICAgY29uc3Qga29uZ0xhc3RPZmZzZXQgPSBjYy52MygwLCAyMik7XHJcbiAgICAgICAgbGV0IG1qSW5kZXggPSAwO1xyXG4gICAgICAgIC8vIOWQg+eisOadoOWxleekulxyXG4gICAgICAgIG9wZXJMaXN0LmZvckVhY2goaW5mbz0+e1xyXG4gICAgICAgICAgICBsZXQgYWxsX2NhcmRzOiBudW1iZXJbXSA9IGluZm8uYWxsX2NhcmRzIHx8IFtdO1xyXG4gICAgICAgICAgICBhbGxfY2FyZHMuZm9yRWFjaCgodmFsdWUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMud2luTWpMaXN0W21qSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1qSXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWpJdGVtLm1haGpvbmdWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLnR5cGUgPT0gNiAmJiBpbmRleCAhPSAzKSAgICAgICAvLyDmmpfmnaDlubbkuJTkuI3mmK/nrKzlm5vlvKBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWpJdGVtLmlzRnJvbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1qSXRlbS5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGluZm8udHlwZSA9PSA0IHx8IGluZm8udHlwZSA9PSA1IHx8IGluZm8udHlwZSA9PSA2KSAmJiBpbmRleCA9PSAzKXsgICAgICAgIC8vIOadoOeJjOesrOWbm+W8oCDloIbliLDliY3kuKTlvKDkuIrpnaJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBQb3MgPSBzdGFydC5zdWIob2Zmc2V0Lm11bCgyKSkuYWRkKGtvbmdMYXN0T2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWpJdGVtLm5vZGUuc2V0UG9zaXRpb24odGVtcFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1qSXRlbS5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBzdGFydC5hZGQob2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtakluZGV4ICsrO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBzdGFydCA9IHN0YXJ0LmFkZChzcGFjZU9mZnNldCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDmiYvniYzlsZXnpLpcclxuICAgICAgICB1c2VyQ2FyZHMuZm9yRWFjaCgodmFsdWUsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICBsZXQgbWpJdGVtID0gdGhpcy53aW5Nakxpc3RbbWpJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChtakl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gdXNlckNhcmRzLmxlbmd0aCAtIDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0LmFkZChzcGFjZU9mZnNldCkpOyAgICAvLyDmnIDlkI7kuIDlvKDmmK/og6HniYwsIOmalOW8gFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtakl0ZW0ubm9kZS5zZXRQb3NpdGlvbihzdGFydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IHN0YXJ0LmFkZChvZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1qSW5kZXggKys7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDpmpDol4/liankvZnmnKrkvb/nlKjniYxcclxuICAgICAgICBpZihtakluZGV4IDwgdGhpcy53aW5Nakxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gbWpJbmRleDsgaSA8IHRoaXMud2luTWpMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luTWpMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T25lVHlwZUl0ZW0oKXtcclxuICAgICAgICBpZiAoIXRoaXMudHlwZUl0ZW1MaXN0W3RoaXMubmV4dEluZGV4XSl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUodGhpcy5jb3B5VHlwZUl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMubGlzdExheW91dC5ub2RlKTtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgRmFuVHlwZVZpZXcobm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZUl0ZW1MaXN0LnB1c2godmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGVJdGVtTGlzdFt0aGlzLm5leHRJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlQWxsVHlwZUl0ZW0oKXtcclxuICAgICAgICB0aGlzLnR5cGVJdGVtTGlzdC5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLmhpZGVBbGxUeXBlSXRlbSgpO1xyXG4gICAgICAgIHRoaXMubmV4dEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLndpbkluZm9WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9zZUluZm9WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdpbkluZm9WaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBtdWx0TGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgd2luTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgZWZmZWN0U2s6IHNwLlNrZWxldG9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMubXVsdExibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibXVsdExibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy53aW5MYmwgPSB0aGlzLmdldENvbXBvbmVudChcIndpbkxibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTayA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiZWZmZWN0XCIsIHNwLlNrZWxldG9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0luZm8obk11bHQ6IG51bWJlciwgbldpbjogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLm11bHRMYmwuc3RyaW5nID0gbk11bHQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLndpbkxibC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihuV2luLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrLmFkZEFuaW1hdGlvbigwLCBcImlkbGUyXCIsIHRydWUsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2suY2xlYXJUcmFja3MoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTG9zZUluZm9WaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBtdWx0TGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgd2luTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgZWZmZWN0U2s6IHNwLlNrZWxldG9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMubXVsdExibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibXVsdExibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy53aW5MYmwgPSB0aGlzLmdldENvbXBvbmVudChcIndpbkxibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTayA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiZWZmZWN0XCIsIHNwLlNrZWxldG9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0luZm8obk11bHQ6IG51bWJlciwgbldpbjogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLm11bHRMYmwuc3RyaW5nID0gbk11bHQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLndpbkxibC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihuV2luLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrLmNsZWFyVHJhY2tzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEZhblR5cGVWaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSB0eXBlTGJsOiBjYy5MYWJlbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLnR5cGVMYmwgPSB0aGlzLmdldENvbXBvbmVudChcInR5cGVMYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDb250ZXh0KG5hbWU6IHN0cmluZywgbk11bHQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy50eXBlTGJsLnN0cmluZyA9IGAke25hbWV9ICAke25NdWx0feeVqmA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdpbk1qSXRlbVZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBmcm9udEJnOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGZyb250U3A6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgYmFja0JnOiBjYy5TcHJpdGU7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuZnJvbnRCZyA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYmdcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmZyb250U3AgPSB0aGlzLmdldENvbXBvbmVudChcImZyb250XCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5iYWNrQmcgPSB0aGlzLmdldENvbXBvbmVudChcImJhY2tcIiwgY2MuU3ByaXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6K6+572u54mM5YC85ZKM5Zu+5qGI5qC35byPICovXHJcbiAgICBwdWJsaWMgc2V0IG1haGpvbmdWYWx1ZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWUgPT0gdmFsdWUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhFcm1qR2FtZUNvbnN0LkdpZCwgdGhpcy5mcm9udFNwLCBFcm1qUGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcIm1haGpvbmcvYXRsYXNfbWFoam9uZ1wiLCBFcm1qTWpTdHlsZUhlbHBlci5takhhbmRNYXBbdmFsdWVdLCBudWxsLCB0cnVlKTtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3NlcilcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm5hbWUgPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbWFoam9uZ1ZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDorr7nva7purvlsIbmraPlj43pnaIgKi9cclxuICAgIHB1YmxpYyBzZXQgaXNGcm9udChmbGFnOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmZyb250Qmcubm9kZS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgICAgIHRoaXMuZnJvbnRTcC5ub2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy5iYWNrQmcubm9kZS5hY3RpdmUgPSAhZmxhZztcclxuICAgIH1cclxuXHJcbiAgICAvKiog6K6+572u5q2j6Z2i6IOM5pmv54m55q6K6Imy5o+Q56S6ICovXHJcbiAgICBwdWJsaWMgc2V0U3BlY2lhbENvbG9yKGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZnJvbnRCZy5ub2RlLmNvbG9yID0gZmxhZyAmJiBFcm1qTWpTdHlsZUhlbHBlci5TcGVjaWFsQmdDb2xvciB8fCBFcm1qTWpTdHlsZUhlbHBlci5Ob3JtYWxCZ0NvbG9yO1xyXG4gICAgfVxyXG59Il19