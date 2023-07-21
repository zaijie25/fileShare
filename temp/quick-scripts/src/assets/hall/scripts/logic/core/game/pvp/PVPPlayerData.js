"use strict";
cc._RF.push(module, '7ac8cuPAVVOHYgHoZSk2PPq', 'PVPPlayerData');
// hall/scripts/logic/core/game/pvp/PVPPlayerData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//玩家游戏数据
var PVPPlayerData = /** @class */ (function () {
    function PVPPlayerData(sit) {
        this.in_game = false;
        this.isEmpty = true;
        this.nickname = "";
        this.point = 0;
        this.headimg = "";
        this.sit = sit;
        this.in_game = false;
        this.isEmpty = true;
        this.headkuang = 0;
        this.enterPoint = 0;
        this.vip = 0;
    }
    PVPPlayerData.prototype.setInfo = function (serverInfo) {
        this.nickname = serverInfo.nickname || "";
        this.headimg = serverInfo.headimg || "";
        this.point = serverInfo.point || 0;
        if (serverInfo._chair)
            this.chair = serverInfo._chair;
        this.in_game = serverInfo.in_game;
        this.area = serverInfo.area;
        this.headkuang = serverInfo.a_box || 0;
        if (this.area == null || this.area == "")
            this.area = "未知地点";
        this.isEmpty = false;
        this.enterPoint = serverInfo.EnterPoint == undefined ? this.point : serverInfo.EnterPoint;
        this.vip = serverInfo.vip || 0;
    };
    PVPPlayerData.prototype.refresh = function (msg) {
        this.point = msg.point;
        this.chair = msg._chair;
        this.in_game = msg.in_game;
        this.enterPoint = msg.EnterPoint == undefined ? this.point : msg.EnterPoint;
        this.vip = msg.vip;
    };
    PVPPlayerData.prototype.clear = function () {
        this.nickname = "";
        this.point = 0;
        this.headimg = "";
        this.chair = -1;
        this.in_game = false;
        this.isEmpty = true;
        this.enterPoint = 0;
        this.vip = 0;
    };
    return PVPPlayerData;
}());
exports.default = PVPPlayerData;

cc._RF.pop();