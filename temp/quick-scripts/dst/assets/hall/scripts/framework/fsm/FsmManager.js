
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/fsm/FsmManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a3191yI7ddDS4cQjMFSSXOi', 'FsmManager');
// hall/scripts/framework/fsm/FsmManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fsm_1 = require("./Fsm");
var FsmManager = /** @class */ (function () {
    function FsmManager() {
        this.fsmList = [];
        this.removeIndexArr = [];
    }
    FsmManager.prototype.createFsm = function (name) {
        if (name === void 0) { name = ""; }
        var fsm = new Fsm_1.default();
        this.fsmList.push(fsm);
        return fsm;
    };
    FsmManager.prototype.onUpdate = function () {
        if (this.fsmList.length == 0)
            return;
        for (var i = 0; i < this.fsmList.length; i++) {
            if (this.fsmList[i].isDestroyed) {
                this.removeIndexArr.push(i);
                continue;
            }
            this.fsmList[i].onUpdate();
        }
        if (this.removeIndexArr.length > 0) {
            for (var i = this.removeIndexArr.length - 1; i >= 0; i--) {
                this.fsmList.splice(this.removeIndexArr[i], 1);
            }
            this.removeIndexArr.length = 0;
        }
    };
    return FsmManager;
}());
exports.default = FsmManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxmc21cXEZzbU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBd0I7QUFFeEI7SUFBQTtRQUVZLFlBQU8sR0FBUyxFQUFFLENBQUM7UUFDbkIsbUJBQWMsR0FBWSxFQUFFLENBQUM7SUFpQ3pDLENBQUM7SUE5QlUsOEJBQVMsR0FBaEIsVUFBaUIsSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztRQUV0QixJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLDZCQUFRLEdBQWY7UUFFSSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDdkIsT0FBTztRQUNYLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDM0M7WUFDSSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUM5QjtnQkFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsU0FBUzthQUNaO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM5QjtRQUVELElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNqQztZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQ3hEO2dCQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQXBDQSxBQW9DQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZzbSBmcm9tIFwiLi9Gc21cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZzbU1hbmFnZXJcclxue1xyXG4gICAgcHJpdmF0ZSBmc21MaXN0OkZzbVtdID0gW107XHJcbiAgICBwcml2YXRlIHJlbW92ZUluZGV4QXJyOm51bWJlcltdID0gW107XHJcblxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVGc20obmFtZSA9IFwiXCIpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGZzbSA9IG5ldyBGc20oKTtcclxuICAgICAgICB0aGlzLmZzbUxpc3QucHVzaChmc20pO1xyXG4gICAgICAgIHJldHVybiBmc207XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmZzbUxpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5mc21MaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5mc21MaXN0W2ldLmlzRGVzdHJveWVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUluZGV4QXJyLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZzbUxpc3RbaV0ub25VcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVtb3ZlSW5kZXhBcnIubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHRoaXMucmVtb3ZlSW5kZXhBcnIubGVuZ3RoIC0gMTsgaSA+PSAwIDsgaS0tKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZzbUxpc3Quc3BsaWNlKHRoaXMucmVtb3ZlSW5kZXhBcnJbaV0sIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlSW5kZXhBcnIubGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=