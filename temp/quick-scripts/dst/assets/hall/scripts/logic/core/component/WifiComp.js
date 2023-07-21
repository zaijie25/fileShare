
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/WifiComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a55eTewLlOprZ5aQym/Dlk', 'WifiComp');
// hall/scripts/logic/core/component/WifiComp.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WifiComp = /** @class */ (function (_super) {
    __extends(WifiComp, _super);
    function WifiComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stateSpriteArr = [];
        _this.EventString = "";
        return _this;
        // update (dt) {}
    }
    WifiComp.prototype.onLoad = function () {
        for (var index = 0; index < 3; index++) {
            this.stateSpriteArr[index] = cc.find("state" + (index + 1), this.node);
            this.stateSpriteArr[index].active = false;
        }
        this.msLabel = cc.find("msLabel", this.node).getComponent(cc.RichText);
        this.msLabel.node.active = false;
    };
    WifiComp.prototype.init = function (type) {
        if (type == 1) {
            this.EventString = GlobalEvent.RefreshHallNetCost;
        }
        else if (type == 2) {
            this.EventString = GlobalEvent.RefreshGameNetCost;
        }
    };
    WifiComp.prototype.startListen = function () {
        Global.Event.on(this.EventString, this, this.refreshState);
    };
    WifiComp.prototype.refreshState = function (ms) {
        if (!this.stateSpriteArr || this.stateSpriteArr.length == 0) {
            return;
        }
        if (ms <= 300) {
            this.msLabel.node.color = new cc.Color().fromHEX("#9DD500");
            this.stateSpriteArr[0].active = true;
            this.stateSpriteArr[1].active = false;
            this.stateSpriteArr[2].active = false;
        }
        else if (ms > 300 && ms <= 700) {
            this.msLabel.node.color = new cc.Color().fromHEX("#FFE500");
            this.stateSpriteArr[0].active = false;
            this.stateSpriteArr[1].active = true;
            this.stateSpriteArr[2].active = false;
        }
        else {
            this.msLabel.node.color = new cc.Color().fromHEX("#FF0000");
            this.stateSpriteArr[0].active = false;
            this.stateSpriteArr[1].active = false;
            this.stateSpriteArr[2].active = true;
        }
        this.msLabel.node.active = true;
        this.msLabel.string = "<b>" + ms + "ms</b>";
    };
    WifiComp.prototype.onDestroy = function () {
        Global.Event.off(this.EventString, this, this.refreshState);
        this.stateSpriteArr = [];
    };
    WifiComp = __decorate([
        ccclass
    ], WifiComp);
    return WifiComp;
}(cc.Component));
exports.default = WifiComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcV2lmaUNvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFvRUM7UUFsRUcsb0JBQWMsR0FBYyxFQUFFLENBQUM7UUFDL0IsaUJBQVcsR0FBRyxFQUFFLENBQUE7O1FBZ0VoQixpQkFBaUI7SUFDckIsQ0FBQztJQS9ERyx5QkFBTSxHQUFOO1FBRUksS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFDdEM7WUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7U0FDNUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUNELHVCQUFJLEdBQUosVUFBSyxJQUFJO1FBRUwsSUFBRyxJQUFJLElBQUksQ0FBQyxFQUNaO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUE7U0FDcEQ7YUFDSSxJQUFHLElBQUksSUFBSSxDQUFDLEVBQ2pCO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUE7U0FDcEQ7SUFFTCxDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUVJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBQ0QsK0JBQVksR0FBWixVQUFhLEVBQUU7UUFDWCxJQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQzFEO1lBQ0ksT0FBTTtTQUNUO1FBQ0QsSUFBRyxFQUFFLElBQUksR0FBRyxFQUNaO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtTQUN4QzthQUNJLElBQUcsRUFBRSxHQUFDLEdBQUcsSUFBSSxFQUFFLElBQUUsR0FBRyxFQUN6QjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7U0FDeEM7YUFFRDtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7U0FDdkM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLFFBQU0sRUFBRSxXQUFRLENBQUE7SUFDekMsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFFSSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQWxFZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQW9FNUI7SUFBRCxlQUFDO0NBcEVELEFBb0VDLENBcEVxQyxFQUFFLENBQUMsU0FBUyxHQW9FakQ7a0JBcEVvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lmaUNvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXRlU3ByaXRlQXJyOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIEV2ZW50U3RyaW5nID0gXCJcIlxyXG4gICAgbXNMYWJlbDpjYy5SaWNoVGV4dDtcclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM7IGluZGV4KyspIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVNwcml0ZUFycltpbmRleF0gPSBjYy5maW5kKFwic3RhdGVcIisoaW5kZXgrMSksdGhpcy5ub2RlKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3ByaXRlQXJyW2luZGV4XS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1zTGFiZWwgPSBjYy5maW5kKFwibXNMYWJlbFwiLHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICB0aGlzLm1zTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGluaXQodHlwZSlcclxuICAgIHtcclxuICAgICAgICBpZih0eXBlID09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkV2ZW50U3RyaW5nID0gR2xvYmFsRXZlbnQuUmVmcmVzaEhhbGxOZXRDb3N0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZSA9PSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5FdmVudFN0cmluZyA9IEdsb2JhbEV2ZW50LlJlZnJlc2hHYW1lTmV0Q29zdFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRMaXN0ZW4oKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbih0aGlzLkV2ZW50U3RyaW5nICx0aGlzLHRoaXMucmVmcmVzaFN0YXRlKVxyXG4gICAgfVxyXG4gICAgcmVmcmVzaFN0YXRlKG1zKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuc3RhdGVTcHJpdGVBcnIgfHwgdGhpcy5zdGF0ZVNwcml0ZUFyci5sZW5ndGggPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtcyA8PSAzMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1zTGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoXCIjOURENTAwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3ByaXRlQXJyWzBdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVNwcml0ZUFyclsxXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3ByaXRlQXJyWzJdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYobXM+MzAwICYmIG1zPD03MDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1zTGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoXCIjRkZFNTAwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3ByaXRlQXJyWzBdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVTcHJpdGVBcnJbMV0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3ByaXRlQXJyWzJdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubXNMYWJlbC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChcIiNGRjAwMDBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVTcHJpdGVBcnJbMF0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVNwcml0ZUFyclsxXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlU3ByaXRlQXJyWzJdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tc0xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1zTGFiZWwuc3RyaW5nID1gPGI+JHttc31tczwvYj5gXHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KClcclxuICAgIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKHRoaXMuRXZlbnRTdHJpbmcsdGhpcyx0aGlzLnJlZnJlc2hTdGF0ZSlcclxuICAgICAgICB0aGlzLnN0YXRlU3ByaXRlQXJyID0gW11cclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19