
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/MsgModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1980aakn7FIw4636iftOSH4', 'MsgModule');
// hall/scripts/logic/hallcommon/module/MsgModule.ts

"use strict";
/**
 * 邮件模块
 *
*/
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
var ModuleBase_1 = require("../../../framework/module/ModuleBase");
var MsgModule = /** @class */ (function (_super) {
    __extends(MsgModule, _super);
    function MsgModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndMsg";
        _this.modelClass = "MsgModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/msg/MsgUI"];
        _this.children = [];
        return _this;
    }
    return MsgModule;
}(ModuleBase_1.ModuleBase));
exports.default = MsgModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcTXNnTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0VBR0U7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG1FQUFrRTtBQUVsRTtJQUF1Qyw2QkFBVTtJQUFqRDtRQUFBLHFFQVNDO1FBUkcsZUFBUyxHQUFHLFFBQVEsQ0FBQTtRQUNwQixnQkFBVSxHQUFHLFVBQVUsQ0FBQTtRQUN2QixjQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsaUJBQVcsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUE7UUFDM0MsY0FBUSxHQUFHLEVBRVYsQ0FBQTs7SUFFTCxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQVRBLEFBU0MsQ0FUc0MsdUJBQVUsR0FTaEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6YKu5Lu25qih5Z2XXHJcbiAqIFxyXG4qL1xyXG5cclxuaW1wb3J0IHsgTW9kdWxlQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kdWxlL01vZHVsZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1zZ01vZHVsZSBleHRlbmRzIE1vZHVsZUJhc2Uge1xyXG4gICAgdmlld0NsYXNzID0gXCJXbmRNc2dcIlxyXG4gICAgbW9kZWxDbGFzcyA9IFwiTXNnTW9kZWxcIlxyXG4gICAgcmVzUGF0aHMgPSBbXVxyXG4gICAgcHJlZmFiUGF0aHMgPSBbXCJoYWxsL3ByZWZhYnMvdWkvbXNnL01zZ1VJXCJdXHJcbiAgICBjaGlsZHJlbiA9IFtcclxuICAgICAgIFxyXG4gICAgXVxyXG5cclxufSJdfQ==