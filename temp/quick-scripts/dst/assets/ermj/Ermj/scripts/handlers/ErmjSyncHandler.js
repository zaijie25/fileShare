
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjSyncHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eeb62whMWZCtJTeApE34wO2', 'ErmjSyncHandler');
// ermj/Ermj/scripts/handlers/ErmjSyncHandler.ts

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
exports.ErmjSyncRefreshHandler = exports.ErmjSyncEndHandler = exports.ErmjSyncBeginHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjSyncBeginHandler = /** @class */ (function (_super) {
    __extends(ErmjSyncBeginHandler, _super);
    function ErmjSyncBeginHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjSyncBeginHandler.prototype.refreshData = function (msg) {
        this.context.syncMode = true;
    };
    ErmjSyncBeginHandler.prototype.execute = function (msg) {
        ErmjDriver_1.default.instance.beginSync();
    };
    return ErmjSyncBeginHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjSyncBeginHandler = ErmjSyncBeginHandler;
var ErmjSyncEndHandler = /** @class */ (function (_super) {
    __extends(ErmjSyncEndHandler, _super);
    function ErmjSyncEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjSyncEndHandler.prototype.refreshData = function (msg) {
        this.context.syncMode = false;
    };
    return ErmjSyncEndHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjSyncEndHandler = ErmjSyncEndHandler;
var ErmjSyncRefreshHandler = /** @class */ (function (_super) {
    __extends(ErmjSyncRefreshHandler, _super);
    function ErmjSyncRefreshHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjSyncRefreshHandler.prototype.execute = function (msg) {
        this.mainUI.leftTipsView.updateLeftLbl(msg._para.left_count);
        // 复盘
        this.mainUI.mjHillView.doDeal(msg._para.head_count || 0);
        this.mainUI.mjHillView.doPatchwork(msg._para.tail_count || 0);
        var flowerCards = msg._para.flower_cards || {};
        for (var chair in flowerCards) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            this.mainUI.callMjPlayer(localSeat, "flowerCardAdd", flowerCards[chair]);
        }
        var lastOutLocalSeat = this.SitHelper.serverSToLocalN(msg._para.last_out_chair);
        var outCards = msg._para.out_cards || {};
        for (var chair in outCards) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            if (localSeat != lastOutLocalSeat) { // debug 先还原其他人, 最后还原最近一次出牌者, 服务器牌数组按出牌顺序, 保证可以拿到最后一张出牌引用
                this.mainUI.callMjPlayer(localSeat, "showOutCardDirectly", outCards[chair]);
            }
        }
        if (outCards[msg._para.last_out_chair]) { // 出过牌才显示
            this.mainUI.callMjPlayer(lastOutLocalSeat, "showOutCardDirectly", outCards[msg._para.last_out_chair]);
            this.mainUI.showLastOutSign(true);
        }
        var setCards = msg._para.set_cards || {};
        for (var chair in setCards) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            this.mainUI.callMjPlayer(localSeat, "syncAllOperView", setCards[chair]);
        }
    };
    return ErmjSyncRefreshHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjSyncRefreshHandler = ErmjSyncRefreshHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpTeW5jSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELDRDQUF1QztBQUV2QztJQUEwQyx3Q0FBZTtJQUF6RDs7SUFRQSxDQUFDO0lBUGEsMENBQVcsR0FBckIsVUFBc0IsR0FBRztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUVTLHNDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsb0JBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FSQSxBQVFDLENBUnlDLHlCQUFlLEdBUXhEO0FBUlksb0RBQW9CO0FBVWpDO0lBQXdDLHNDQUFlO0lBQXZEOztJQUlBLENBQUM7SUFIYSx3Q0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKdUMseUJBQWUsR0FJdEQ7QUFKWSxnREFBa0I7QUFNL0I7SUFBNEMsMENBQWU7SUFBM0Q7O0lBZ0NBLENBQUM7SUEvQmEsd0NBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3RCxLQUFLO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUU5RCxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7UUFDL0MsS0FBSSxJQUFJLEtBQUssSUFBSSxXQUFXLEVBQUM7WUFDekIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1RTtRQUVELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDekMsS0FBSSxJQUFJLEtBQUssSUFBSSxRQUFRLEVBQUM7WUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBRyxTQUFTLElBQUksZ0JBQWdCLEVBQUMsRUFBVyx5REFBeUQ7Z0JBQ2pHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMvRTtTQUNKO1FBQ0QsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBQyxFQUFTLFNBQVM7WUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0RyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQztRQUVELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxLQUFJLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBQztZQUN0QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQWhDQSxBQWdDQyxDQWhDMkMseUJBQWUsR0FnQzFEO0FBaENZLHdEQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZUhhbmRsZXIgZnJvbSBcIi4vRXJtakJhc2VIYW5kbGVyXCI7XHJcbmltcG9ydCBFcm1qRHJpdmVyIGZyb20gXCIuLi9Fcm1qRHJpdmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXJtalN5bmNCZWdpbkhhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaERhdGEobXNnKXtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc3luY01vZGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5iZWdpblN5bmMoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpTeW5jRW5kSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCByZWZyZXNoRGF0YShtc2cpe1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zeW5jTW9kZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJtalN5bmNSZWZyZXNoSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgdGhpcy5tYWluVUkubGVmdFRpcHNWaWV3LnVwZGF0ZUxlZnRMYmwobXNnLl9wYXJhLmxlZnRfY291bnQpO1xyXG4gICAgICAgIC8vIOWkjeebmFxyXG4gICAgICAgIHRoaXMubWFpblVJLm1qSGlsbFZpZXcuZG9EZWFsKG1zZy5fcGFyYS5oZWFkX2NvdW50IHx8IDApO1xyXG4gICAgICAgIHRoaXMubWFpblVJLm1qSGlsbFZpZXcuZG9QYXRjaHdvcmsobXNnLl9wYXJhLnRhaWxfY291bnQgfHwgMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZsb3dlckNhcmRzID0gbXNnLl9wYXJhLmZsb3dlcl9jYXJkcyB8fCB7fTtcclxuICAgICAgICBmb3IobGV0IGNoYWlyIGluIGZsb3dlckNhcmRzKXtcclxuICAgICAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihOdW1iZXIoY2hhaXIpKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbE1qUGxheWVyKGxvY2FsU2VhdCwgXCJmbG93ZXJDYXJkQWRkXCIsIGZsb3dlckNhcmRzW2NoYWlyXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGFzdE91dExvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3BhcmEubGFzdF9vdXRfY2hhaXIpO1xyXG4gICAgICAgIGxldCBvdXRDYXJkcyA9IG1zZy5fcGFyYS5vdXRfY2FyZHMgfHwge307XHJcbiAgICAgICAgZm9yKGxldCBjaGFpciBpbiBvdXRDYXJkcyl7XHJcbiAgICAgICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4oTnVtYmVyKGNoYWlyKSk7XHJcbiAgICAgICAgICAgIGlmKGxvY2FsU2VhdCAhPSBsYXN0T3V0TG9jYWxTZWF0KXsgICAgICAgICAgLy8gZGVidWcg5YWI6L+Y5Y6f5YW25LuW5Lq6LCDmnIDlkI7ov5jljp/mnIDov5HkuIDmrKHlh7rniYzogIUsIOacjeWKoeWZqOeJjOaVsOe7hOaMieWHuueJjOmhuuW6jywg5L+d6K+B5Y+v5Lul5ou/5Yiw5pyA5ZCO5LiA5byg5Ye654mM5byV55SoXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsTWpQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dPdXRDYXJkRGlyZWN0bHlcIiwgb3V0Q2FyZHNbY2hhaXJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3V0Q2FyZHNbbXNnLl9wYXJhLmxhc3Rfb3V0X2NoYWlyXSl7ICAgICAgICAvLyDlh7rov4fniYzmiY3mmL7npLpcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbE1qUGxheWVyKGxhc3RPdXRMb2NhbFNlYXQsIFwic2hvd091dENhcmREaXJlY3RseVwiLCBvdXRDYXJkc1ttc2cuX3BhcmEubGFzdF9vdXRfY2hhaXJdKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuc2hvd0xhc3RPdXRTaWduKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNldENhcmRzID0gbXNnLl9wYXJhLnNldF9jYXJkcyB8fCB7fTtcclxuICAgICAgICBmb3IobGV0IGNoYWlyIGluIHNldENhcmRzKXtcclxuICAgICAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihOdW1iZXIoY2hhaXIpKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbE1qUGxheWVyKGxvY2FsU2VhdCwgXCJzeW5jQWxsT3BlclZpZXdcIiwgc2V0Q2FyZHNbY2hhaXJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=