
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzGameCfgHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpHYW1lQ2ZnSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsMENBQXFDO0FBRXJDO0lBQStDLHFDQUFjO0lBQTdEOztJQW9DQSxDQUFDO0lBbkNhLHVDQUFXLEdBQXJCLFVBQXNCLFFBQVE7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRTdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUM7WUFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLE9BQU87U0FDVjtRQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFHUyxtQ0FBTyxHQUFqQixVQUFrQixRQUFRO1FBQ3RCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDO1lBQ2pELEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsTUFBTTtRQUNOLG1CQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9CLG1CQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRVMsdUNBQVcsR0FBckIsVUFBc0IsUUFBUTtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLGlHQUFpRztRQUNqRyxpSEFBaUg7SUFDckgsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsQ0FwQzhDLHdCQUFjLEdBb0M1RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgRGR6RHJpdmVyIGZyb20gXCIuLi9EZHpEcml2ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkekdhbWVDZmdIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaERhdGEobXNnUGFyYW0pe1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zZXJ2ZXJHYW1lQ2ZnID0gbXNnUGFyYW0uX3BhcmE7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEJhc2VQb2ludCwgbXNnUGFyYW0uX3BhcmEuYmFzZV9wb2ludCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEVudGVyTGltaXQsIG1zZ1BhcmFtLl9wYXJhLnBvaW50X2xvdyk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vZGUgPSBtc2dQYXJhbS5fcGFyYS5tb2RlO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkRlZmluZS5NYXhQbGF5ZXJDb3VudCA8IG1zZ1BhcmFtLl9wYXJhLnNlYXRfY291bnQpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoJ+WuouaIt+err+S4jeaUr+aMgeacjeWKoeWZqOmFjee9rueahOacgOWkp+S6uuaVsCcsIHRoaXMuRGVmaW5lLk1heFBsYXllckNvdW50LCBTdHJpbmcobXNnUGFyYW0uX3BhcmEuc2VhdF9jb3VudCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLkRlZmluZS5NYXhQbGF5ZXJDb3VudDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBsYXllckxpc3QucHVzaChuZXcgUFZQUGxheWVyRGF0YShpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2dQYXJhbSl7XHJcbiAgICAgICAgbGV0IGx2ID0gXCJsMFwiO1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dC5zZXNzaW9uICYmIHRoaXMuY29udGV4dC5zZXNzaW9uLl9nbHYpe1xyXG4gICAgICAgICAgICBsdiA9IHRoaXMuY29udGV4dC5zZXNzaW9uLl9nbHY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFpblVJLnVwZGF0ZUxldmVsQmFzZShtc2dQYXJhbS5fcGFyYS5iYXNlX3BvaW50KTtcclxuICAgICAgICB0aGlzLm1haW5VSS51cGRhdGVNb2RlKG1zZ1BhcmFtLl9wYXJhLm1vZGUpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLnVwZGF0ZUxldmVsKGx2KTtcclxuICAgICAgICAvL+i/m+WFpea4uOaIj1xyXG4gICAgICAgIERkekRyaXZlci5pbnN0YW5jZS5lbnRlckdhbWUoKTtcclxuICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UubWFpblVJLnRhc2tNYW5hZ2VyLnJlcUdldENvbW1pc2lvbkluZm8oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZVN5bmMobXNnUGFyYW0pe1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZShtc2dQYXJhbSk7XHJcbiAgICAgICAgLy8gbGV0IGxldmVsSW5mb1ZpZXcgPSB0aGlzLm1haW5VSS52aWV3U2V0LmdldFZpZXdFeDxaSkhMZXZlbEluZm9WaWV3Pih0aGlzLkRlZmluZS5Db21wTGV2ZWxJbmZvKVxyXG4gICAgICAgIC8vIGxldmVsSW5mb1ZpZXcuc2V0TGV2ZWxJbmZvKG1zZ1BhcmFtLl9wYXJhLmJhc2VfcG9pbnQsIG1zZ1BhcmFtLl9wYXJhLmJldF9saW1pdCwgbXNnUGFyYW0uX3BhcmEubWF4X3JvdW5kLCBcIlwiKTtcclxuICAgIH1cclxufSJdfQ==