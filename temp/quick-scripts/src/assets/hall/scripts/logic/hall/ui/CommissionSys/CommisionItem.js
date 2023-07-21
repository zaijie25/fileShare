"use strict";
cc._RF.push(module, '2f05c+Js99OkJIpCFBg667/', 'CommisionItem');
// hall/scripts/logic/hall/ui/CommissionSys/CommisionItem.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommisionModel_1 = require("../../../hallcommon/model/CommisionModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CommisionItem = /** @class */ (function (_super) {
    __extends(CommisionItem, _super);
    function CommisionItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnArrary = [];
        _this.awardLable = null;
        _this.progress = null;
        _this.commisionName = null;
        _this.commisionDescribe = null;
        _this.progressLabel = null;
        _this.getAwardBtn = null;
        _this.data = null;
        _this.model = null;
        _this.global_task_type = -1;
        return _this;
    }
    CommisionItem.prototype.onLoad = function () {
        Global.UIHelper.addCommonClick(this.node, "getAward", this.onGetAwardBtnClicked, this);
        this.model = Global.ModelManager.getModel("CommisionModel");
        this.model.on(CommisionModel_1.default.GetCommisionAward, this, this.onGetAward);
    };
    CommisionItem.prototype.onGetAward = function (data) {
        if (!data || !data.task_reward)
            return;
        if (data.global_task_type == this.global_task_type && this.data.task_id == data.task_id) {
            Global.UI.show("WndRebateGet", data.task_reward);
            // Global.UI.show("WndCongratulationGet",data.task_reward);
            this.data.task_status = 2;
            this.UpdateUI(this.data, this.global_task_type);
        }
    };
    CommisionItem.prototype.onDestroy = function () {
        this.model.off(CommisionModel_1.default.GetCommisionAward, this, this.onGetAward);
    };
    CommisionItem.prototype.onGetAwardBtnClicked = function (target) {
        if (!this.data) {
            return;
        }
        this.model.reqGetCommisionAward(this.global_task_type, this.data.task_id);
    };
    /**
     * name
     */
    CommisionItem.prototype.UpdateUI = function (data, type) {
        if (!data || !cc.isValid(this.node))
            return;
        this.data = data;
        this.global_task_type = type;
        if (this.btnArrary) {
            this.btnArrary[0].active = data.task_status == 0;
            this.btnArrary[1].active = data.task_status == 1;
            this.btnArrary[2].active = data.task_status == 2;
        }
        if (this.getAwardBtn) {
            var btn = this.getAwardBtn.getComponent(cc.Button);
            if (btn) {
                btn.interactable = data.task_status == 1;
            }
        }
        if (this.awardLable) {
            this.awardLable.string = Global.Toolkit.formatPointStr(data.task_reward);
        }
        if (this.progress) {
            this.progress.progress = data.task_num != 0 ? (data.task_self_num / data.task_num) : 0;
        }
        if (this.progressLabel) {
            this.progressLabel.string = cc.js.formatStr("%s/%s", data.task_self_num, data.task_num);
        }
        if (this.commisionName) {
            this.commisionName.string = data.name;
        }
        if (this.commisionDescribe) {
            this.commisionDescribe.string = data.task_desc;
        }
    };
    __decorate([
        property([cc.Node])
    ], CommisionItem.prototype, "btnArrary", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionItem.prototype, "awardLable", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], CommisionItem.prototype, "progress", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionItem.prototype, "commisionName", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionItem.prototype, "commisionDescribe", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionItem.prototype, "progressLabel", void 0);
    __decorate([
        property(cc.Node)
    ], CommisionItem.prototype, "getAwardBtn", void 0);
    CommisionItem = __decorate([
        ccclass
    ], CommisionItem);
    return CommisionItem;
}(cc.Component));
exports.default = CommisionItem;

cc._RF.pop();