"use strict";
cc._RF.push(module, 'c5f55YHe3tFTLyeLjUdHWB1', 'DdzGameCfgHandler');
// ddz/ddz/scripts/handlers/DdzGameCfgHandler.ts

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
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzDriver_1 = require("../DdzDriver");
var DdzGameCfgHandler = /** @class */ (function (_super) {
    __extends(DdzGameCfgHandler, _super);
    function DdzGameCfgHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzGameCfgHandler.prototype.refreshData = function (msgParam) {
        this.context.serverGameCfg = msgParam._para;
        this.context.set(this.Define.FieldBasePoint, msgParam._para.base_point);
        this.context.set(this.Define.FieldEnterLimit, msgParam._para.point_low);
        this.context.mode = msgParam._para.mode;
        this.context.playerList = [];
        if (this.Define.MaxPlayerCount < msgParam._para.seat_count) {
            Logger.error('客户端不支持服务器配置的最大人数', this.Define.MaxPlayerCount, String(msgParam._para.seat_count));
            return;
        }
        for (var i = 0; i < this.Define.MaxPlayerCount; i++) {
            this.context.playerList.push(new PVPPlayerData(i));
        }
    };
    DdzGameCfgHandler.prototype.execute = function (msgParam) {
        var lv = "l0";
        if (this.context.session && this.context.session._glv) {
            lv = this.context.session._glv;
        }
        this.mainUI.updateLevelBase(msgParam._para.base_point);
        this.mainUI.updateMode(msgParam._para.mode);
        this.mainUI.updateLevel(lv);
        //进入游戏
        DdzDriver_1.default.instance.enterGame();
        DdzDriver_1.default.instance.mainUI.taskManager.reqGetCommisionInfo();
    };
    DdzGameCfgHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
        // let levelInfoView = this.mainUI.viewSet.getViewEx<ZJHLevelInfoView>(this.Define.CompLevelInfo)
        // levelInfoView.setLevelInfo(msgParam._para.base_point, msgParam._para.bet_limit, msgParam._para.max_round, "");
    };
    return DdzGameCfgHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzGameCfgHandler;

cc._RF.pop();