
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/WndVipRule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '76022t0lq1Buqdd3s9rFewD', 'WndVipRule');
// hall/scripts/logic/hall/ui/playerInfo/WndVipRule.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndVipRule = /** @class */ (function (_super) {
    __extends(WndVipRule, _super);
    function WndVipRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndVipRule.prototype.onInit = function () {
        this.name = "WndVipRule";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/vipRule";
        // this.destoryType = DestoryType.ChangeScene;
    };
    WndVipRule.prototype.onDispose = function () {
    };
    /**
     * 初始化UI
     */
    WndVipRule.prototype.initView = function () {
        this.addCommonClick("close", this.close, this);
    };
    /**
     * 界面打开回调
     */
    WndVipRule.prototype.onOpen = function () {
    };
    return WndVipRule;
}(WndBase_1.default));
exports.default = WndVipRule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxXbmRWaXBSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUtoRTtJQUF3Qyw4QkFBTztJQUEvQzs7SUErQkEsQ0FBQztJQTdCYSwyQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQ0FBb0MsQ0FBQztRQUNwRCw4Q0FBOEM7SUFDbEQsQ0FBQztJQUVELDhCQUFTLEdBQVQ7SUFFQSxDQUFDO0lBRUQ7O09BRUc7SUFDTyw2QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFFaEQsQ0FBQztJQUVEOztPQUVHO0lBQ08sMkJBQU0sR0FBaEI7SUFJQSxDQUFDO0lBR0wsaUJBQUM7QUFBRCxDQS9CQSxBQStCQyxDQS9CdUMsaUJBQU8sR0ErQjlDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGxheWVySW5mb01vZGVsXCI7XHJcbmltcG9ydCBWaXBWaWV3IGZyb20gXCIuL1ZpcFZpZXdcIjtcclxuaW1wb3J0IFZpcFZpZXdVSSBmcm9tIFwiLi9WaXBWaWV3VUlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFZpcFJ1bGUgZXh0ZW5kcyBXbmRCYXNlIHtcclxuICAgXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kVmlwUnVsZVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUGxheWVySW5mby92aXBSdWxlXCI7XHJcbiAgICAgICAgLy8gdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLkNoYW5nZVNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzcG9zZSgpIHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZVSVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsdGhpcy5jbG9zZSx0aGlzKVxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLmiZPlvIDlm57osINcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgXHJcbn1cclxuXHJcbiJdfQ==