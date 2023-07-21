"use strict";
cc._RF.push(module, 'c7278pIYONEXbTuQUXLILQ1', 'ErmjGameCfgHandler');
// ermj/Ermj/scripts/handlers/ErmjGameCfgHandler.ts

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
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjGameCfgHandler = /** @class */ (function (_super) {
    __extends(ErmjGameCfgHandler, _super);
    function ErmjGameCfgHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjGameCfgHandler.prototype.refreshData = function (msgParam) {
        this.context.serverGameCfg = msgParam._para;
        this.context.playerList = [];
        if (ErmjGameConst_1.default.maxPlayerCount < msgParam._para.seat_count) {
            Logger.error('客户端不支持服务器配置的最大人数', ErmjGameConst_1.default.maxPlayerCount, String(msgParam._para.seat_count));
            return;
        }
        for (var i = 0; i < ErmjGameConst_1.default.maxPlayerCount; i++) {
            this.context.playerList.push(new PVPPlayerData(i));
        }
    };
    ErmjGameCfgHandler.prototype.execute = function (msgParam) {
        var lv = "l0";
        if (this.context.session && this.context.session._glv) {
            lv = this.context.session._glv;
        }
        this.mainUI.updateLevelBase(msgParam._para.base_point, lv);
        //进入游戏
        ErmjDriver_1.default.instance.enterGame();
        ErmjDriver_1.default.instance.mainUI.taskManager.reqGetCommisionInfo();
    };
    ErmjGameCfgHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
    };
    return ErmjGameCfgHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjGameCfgHandler;

cc._RF.pop();