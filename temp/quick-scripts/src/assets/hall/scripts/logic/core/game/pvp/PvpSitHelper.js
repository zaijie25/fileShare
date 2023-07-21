"use strict";
cc._RF.push(module, '40e00tt30BPTZAZXYybi+FK', 'PvpSitHelper');
// hall/scripts/logic/core/game/pvp/PvpSitHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//p0 为公共位置 1-n 为玩家座位
var PVPSitHelper = /** @class */ (function () {
    function PVPSitHelper() {
        this.localSitToViewSitMap = {};
    }
    PVPSitHelper.prototype.init = function (serverSit, maxPlayerNum, map) {
        if (map === void 0) { map = {}; }
        this.selfSvrSit = serverSit;
        this.maxPlayerNum = maxPlayerNum;
        this.localSitToViewSitMap = map;
    };
    PVPSitHelper.prototype.clear = function () {
        this.localSitToViewSitMap = {};
        this.selfSvrSit = 0;
        this.maxPlayerNum = 0;
    };
    PVPSitHelper.prototype.getSelfServerSeat = function () {
        return this.selfSvrSit;
    };
    PVPSitHelper.prototype.getSelfServerSeatS = function () {
        return "p" + this.selfSvrSit;
    };
    PVPSitHelper.prototype.serverToLocal = function (svrSeat) {
        if (!this.selfSvrSit || this.selfSvrSit == -1)
            return svrSeat;
        var selfViewSeat = this.getSelfViewSeat();
        var localSeat = ((svrSeat - this.selfSvrSit + this.maxPlayerNum) % this.maxPlayerNum + selfViewSeat) % this.maxPlayerNum;
        localSeat = this.localToView(localSeat);
        return localSeat;
    };
    //local -> ui的映射    如 ：2人时 二号位对应的是head3  4人时 2号位对应的是head2 
    PVPSitHelper.prototype.localToView = function (localSeat) {
        if (this.localSitToViewSitMap == null || Global.Toolkit.isEmptyObject(this.localSitToViewSitMap))
            return localSeat;
        return this.localSitToViewSitMap[localSeat];
    };
    PVPSitHelper.prototype.viewToLocal = function (viewSeat) {
        if (this.localSitToViewSitMap == null || Global.Toolkit.isEmptyObject(this.localSitToViewSitMap))
            return viewSeat;
        for (var local in this.localSitToViewSitMap) {
            if (this.localSitToViewSitMap[local] == viewSeat)
                return local;
        }
    };
    PVPSitHelper.prototype.localToServer = function (localSeat) {
        if (!this.selfSvrSit || this.selfSvrSit == -1)
            return localSeat;
        var seat = this.viewToLocal(localSeat);
        var sitOffset = seat - this.getSelfViewSeat() + this.selfSvrSit;
        if (sitOffset == this.maxPlayerNum) {
            return this.maxPlayerNum;
        }
        else {
            return sitOffset % this.maxPlayerNum;
        }
    };
    //server seat string  ->  local seat number
    PVPSitHelper.prototype.serverSToLocalN = function (svrSeat) {
        // let num = this.serverSeatStrToNum(svrSeatStr);
        return this.serverToLocal(svrSeat);
    };
    //local seat number  -> server seat string
    PVPSitHelper.prototype.localNToServerS = function (localToServer) {
        var num = this.localToServer(localToServer);
        //return "p" + num;
        return num;
    };
    //"p1" => 1
    PVPSitHelper.prototype.serverSeatStrToNum = function (serverSeatStr) {
        // let numstr = serverSeatStr.substr(1);
        // let num = Number(numstr);
        // if(isNaN(num))
        // {
        //     Logger.error("转换失败", serverSeatStr);
        //     num = -1;
        // }
        return serverSeatStr;
    };
    //自己的viewSit为0
    PVPSitHelper.prototype.getSelfViewSeat = function () {
        return 0;
    };
    return PVPSitHelper;
}());
exports.default = PVPSitHelper;

cc._RF.pop();