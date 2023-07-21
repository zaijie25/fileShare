
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/pvp/PvpSitHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHB2cFxcUHZwU2l0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCO0lBQUE7UUFJVyx5QkFBb0IsR0FBRyxFQUFFLENBQUE7SUFzR3BDLENBQUM7SUFwR1UsMkJBQUksR0FBWCxVQUFZLFNBQWlCLEVBQUUsWUFBb0IsRUFBRSxHQUFhO1FBQWIsb0JBQUEsRUFBQSxRQUFhO1FBRTlELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7SUFDcEMsQ0FBQztJQUVNLDRCQUFLLEdBQVo7UUFFSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFBO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSx3Q0FBaUIsR0FBeEI7UUFFSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVNLHlDQUFrQixHQUF6QjtRQUVJLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUdNLG9DQUFhLEdBQXBCLFVBQXFCLE9BQWM7UUFFL0IsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7WUFDeEMsT0FBTyxPQUFPLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzFDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO1FBQ3hILFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3ZDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCwwREFBMEQ7SUFDbkQsa0NBQVcsR0FBbEIsVUFBbUIsU0FBUztRQUV4QixJQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1lBQzNGLE9BQU8sU0FBUyxDQUFBO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxrQ0FBVyxHQUFsQixVQUFtQixRQUFRO1FBQ3ZCLElBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7WUFDM0YsT0FBTyxRQUFRLENBQUM7UUFDcEIsS0FBSSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUTtnQkFDNUMsT0FBTyxLQUFLLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU0sb0NBQWEsR0FBcEIsVUFBcUIsU0FBZ0I7UUFFakMsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7WUFDeEMsT0FBTyxTQUFTLENBQUM7UUFDckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEUsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksRUFBQztZQUMvQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDNUI7YUFDRztZQUNBLE9BQU8sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsMkNBQTJDO0lBQ3BDLHNDQUFlLEdBQXRCLFVBQXVCLE9BQWM7UUFFakMsaURBQWlEO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMENBQTBDO0lBQ25DLHNDQUFlLEdBQXRCLFVBQXVCLGFBQW9CO1FBRXZDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUMsbUJBQW1CO1FBQ25CLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELFdBQVc7SUFDSix5Q0FBa0IsR0FBekIsVUFBMEIsYUFBb0I7UUFFMUMsd0NBQXdDO1FBQ3hDLDRCQUE0QjtRQUM1QixpQkFBaUI7UUFDakIsSUFBSTtRQUNKLDJDQUEyQztRQUMzQyxnQkFBZ0I7UUFDaEIsSUFBSTtRQUNKLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFHRCxjQUFjO0lBQ04sc0NBQWUsR0FBdkI7UUFFSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDTCxtQkFBQztBQUFELENBMUdBLEFBMEdDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL3AwIOS4uuWFrOWFseS9jee9riAxLW4g5Li6546p5a625bqn5L2NXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBWUFNpdEhlbHBlclxyXG57XHJcbiAgICBwdWJsaWMgc2VsZlN2clNpdDpudW1iZXI7XHJcbiAgICBwdWJsaWMgbWF4UGxheWVyTnVtOm51bWJlcjtcclxuICAgIHB1YmxpYyBsb2NhbFNpdFRvVmlld1NpdE1hcCA9IHt9XHJcblxyXG4gICAgcHVibGljIGluaXQoc2VydmVyU2l0OiBudW1iZXIsIG1heFBsYXllck51bTogbnVtYmVyLCBtYXA6IGFueSA9IHt9KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2VsZlN2clNpdCA9IHNlcnZlclNpdDtcclxuICAgICAgICB0aGlzLm1heFBsYXllck51bSA9IG1heFBsYXllck51bTtcclxuICAgICAgICB0aGlzLmxvY2FsU2l0VG9WaWV3U2l0TWFwID0gbWFwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2NhbFNpdFRvVmlld1NpdE1hcCA9IHt9XHJcbiAgICAgICAgdGhpcy5zZWxmU3ZyU2l0ID0gMDtcclxuICAgICAgICB0aGlzLm1heFBsYXllck51bSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNlbGZTZXJ2ZXJTZWF0KCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZlN2clNpdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VsZlNlcnZlclNlYXRTKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwicFwiICsgdGhpcy5zZWxmU3ZyU2l0O1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIHNlcnZlclRvTG9jYWwoc3ZyU2VhdDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuc2VsZlN2clNpdCB8fCB0aGlzLnNlbGZTdnJTaXQgPT0gLTEpXHJcbiAgICAgICAgICAgIHJldHVybiBzdnJTZWF0O1xyXG4gICAgICAgIGxldCBzZWxmVmlld1NlYXQgPSB0aGlzLmdldFNlbGZWaWV3U2VhdCgpO1xyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSAoKHN2clNlYXQgLSB0aGlzLnNlbGZTdnJTaXQgKyB0aGlzLm1heFBsYXllck51bSkgJSB0aGlzLm1heFBsYXllck51bSArIHNlbGZWaWV3U2VhdCkgJSB0aGlzLm1heFBsYXllck51bVxyXG4gICAgICAgIGxvY2FsU2VhdCA9IHRoaXMubG9jYWxUb1ZpZXcobG9jYWxTZWF0KVxyXG4gICAgICAgIHJldHVybiBsb2NhbFNlYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy9sb2NhbCAtPiB1aeeahOaYoOWwhCAgICDlpoIg77yaMuS6uuaXtiDkuozlj7fkvY3lr7nlupTnmoTmmK9oZWFkMyAgNOS6uuaXtiAy5Y+35L2N5a+55bqU55qE5pivaGVhZDIgXHJcbiAgICBwdWJsaWMgbG9jYWxUb1ZpZXcobG9jYWxTZWF0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubG9jYWxTaXRUb1ZpZXdTaXRNYXAgPT0gbnVsbCB8fCBHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRoaXMubG9jYWxTaXRUb1ZpZXdTaXRNYXApKVxyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTZWF0XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxTaXRUb1ZpZXdTaXRNYXBbbG9jYWxTZWF0XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlld1RvTG9jYWwodmlld1NlYXQpe1xyXG4gICAgICAgIGlmKHRoaXMubG9jYWxTaXRUb1ZpZXdTaXRNYXAgPT0gbnVsbCB8fCBHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRoaXMubG9jYWxTaXRUb1ZpZXdTaXRNYXApKVxyXG4gICAgICAgICAgICByZXR1cm4gdmlld1NlYXQ7XHJcbiAgICAgICAgZm9yKGxldCBsb2NhbCBpbiB0aGlzLmxvY2FsU2l0VG9WaWV3U2l0TWFwKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxTaXRUb1ZpZXdTaXRNYXBbbG9jYWxdID09IHZpZXdTZWF0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9jYWxUb1NlcnZlcihsb2NhbFNlYXQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLnNlbGZTdnJTaXQgfHwgdGhpcy5zZWxmU3ZyU2l0ID09IC0xKVxyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTZWF0O1xyXG4gICAgICAgIGxldCBzZWF0ID0gdGhpcy52aWV3VG9Mb2NhbChsb2NhbFNlYXQpO1xyXG4gICAgICAgIGxldCBzaXRPZmZzZXQgPSBzZWF0IC0gdGhpcy5nZXRTZWxmVmlld1NlYXQoKSArIHRoaXMuc2VsZlN2clNpdDtcclxuICAgICAgICBpZiAoc2l0T2Zmc2V0ID09IHRoaXMubWF4UGxheWVyTnVtKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF4UGxheWVyTnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gc2l0T2Zmc2V0ICUgdGhpcy5tYXhQbGF5ZXJOdW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vc2VydmVyIHNlYXQgc3RyaW5nICAtPiAgbG9jYWwgc2VhdCBudW1iZXJcclxuICAgIHB1YmxpYyBzZXJ2ZXJTVG9Mb2NhbE4oc3ZyU2VhdDpudW1iZXIpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBudW0gPSB0aGlzLnNlcnZlclNlYXRTdHJUb051bShzdnJTZWF0U3RyKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJUb0xvY2FsKHN2clNlYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vbG9jYWwgc2VhdCBudW1iZXIgIC0+IHNlcnZlciBzZWF0IHN0cmluZ1xyXG4gICAgcHVibGljIGxvY2FsTlRvU2VydmVyUyhsb2NhbFRvU2VydmVyOm51bWJlcik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bSA9IHRoaXMubG9jYWxUb1NlcnZlcihsb2NhbFRvU2VydmVyKTtcclxuICAgICAgICAvL3JldHVybiBcInBcIiArIG51bTtcclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vXCJwMVwiID0+IDFcclxuICAgIHB1YmxpYyBzZXJ2ZXJTZWF0U3RyVG9OdW0oc2VydmVyU2VhdFN0cjpudW1iZXIpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBudW1zdHIgPSBzZXJ2ZXJTZWF0U3RyLnN1YnN0cigxKTtcclxuICAgICAgICAvLyBsZXQgbnVtID0gTnVtYmVyKG51bXN0cik7XHJcbiAgICAgICAgLy8gaWYoaXNOYU4obnVtKSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIExvZ2dlci5lcnJvcihcIui9rOaNouWksei0pVwiLCBzZXJ2ZXJTZWF0U3RyKTtcclxuICAgICAgICAvLyAgICAgbnVtID0gLTE7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHJldHVybiBzZXJ2ZXJTZWF0U3RyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+iHquW3seeahHZpZXdTaXTkuLowXHJcbiAgICBwcml2YXRlIGdldFNlbGZWaWV3U2VhdCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn0iXX0=