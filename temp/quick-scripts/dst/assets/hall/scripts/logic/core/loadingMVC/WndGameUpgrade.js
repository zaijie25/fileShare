
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/WndGameUpgrade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e8a3b2X+4JB4pPREy97Zf1B', 'WndGameUpgrade');
// hall/scripts/logic/core/loadingMVC/WndGameUpgrade.ts

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
var WndBase_1 = require("../ui/WndBase");
var WndGameUpgrade = /** @class */ (function (_super) {
    __extends(WndGameUpgrade, _super);
    function WndGameUpgrade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndGameUpgrade.prototype.onInit = function () {
        this.name = "WndGameUpgrade";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameUpGradeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGameUpgrade.prototype.initView = function () {
        //this.addCommonClick("bg/close", this.onCloseClick, this);
    };
    WndGameUpgrade.prototype.onOpen = function () {
        if (this.commonBg) {
            this.commonBg.active = false;
        }
    };
    return WndGameUpgrade;
}(WndBase_1.default));
exports.default = WndGameUpgrade;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXFduZEdhbWVVcGdyYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFxRDtBQUdyRDtJQUE0QyxrQ0FBTztJQUFuRDs7SUF3QkEsQ0FBQztJQXRCYSwrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyw0Q0FBNEMsQ0FBQztRQUM1RCxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3hDLENBQUM7SUFFUyxpQ0FBUSxHQUFsQjtRQUNJLDJEQUEyRDtJQUUvRCxDQUFDO0lBS0QsK0JBQU0sR0FBTjtRQUVJLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFDaEI7WUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7U0FDL0I7SUFDTCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXhCQSxBQXdCQyxDQXhCMkMsaUJBQU8sR0F3QmxEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vdWkvV25kQmFzZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZEdhbWVVcGdyYWRlIGV4dGVuZHMgV25kQmFzZSB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEdhbWVVcGdyYWRlXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiUG9wTGF5ZXJcIjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9Mb2FkaW5nU2NlbmUvR2FtZVVwR3JhZGVVSVwiO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5Ob25lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICAvL3RoaXMuYWRkQ29tbW9uQ2xpY2soXCJiZy9jbG9zZVwiLCB0aGlzLm9uQ2xvc2VDbGljaywgdGhpcyk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcblxyXG4gICAgb25PcGVuKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmNvbW1vbkJnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tb25CZy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==