
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/MVC/command/PreViewCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '240b02BN/5E94Gw3m5XyuXk', 'PreViewCommand');
// hall/scripts/logic/hall/MVC/command/PreViewCommand.ts

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
var ViewMediator_1 = require("../mediator/ViewMediator");
var PreViewCommand = /** @class */ (function (_super) {
    __extends(PreViewCommand, _super);
    function PreViewCommand() {
        return _super.call(this) || this;
    }
    PreViewCommand.prototype.execute = function (notification) {
        _super.prototype.execute.call(this, notification);
        this.facade.registerMediator(new ViewMediator_1.default());
    };
    return PreViewCommand;
}(puremvc.SimpleCommand));
exports.default = PreViewCommand;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXE1WQ1xcY29tbWFuZFxcUHJlVmlld0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseURBQW1EO0FBR25EO0lBQTRDLGtDQUFxQjtJQUM3RDtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxZQUFZO1FBQ2hCLGlCQUFNLE9BQU8sWUFBQyxZQUFZLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksc0JBQVksRUFBRSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FWQSxBQVVDLENBVjJDLE9BQU8sQ0FBQyxhQUFhLEdBVWhFIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBWaWV3TWVkaWF0b3IgZnJvbSAnLi4vbWVkaWF0b3IvVmlld01lZGlhdG9yJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZVZpZXdDb21tYW5kIGV4dGVuZHMgcHVyZW12Yy5TaW1wbGVDb21tYW5kIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhlY3V0ZShub3RpZmljYXRpb24pe1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGUobm90aWZpY2F0aW9uKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBWaWV3TWVkaWF0b3IoKSlcclxuICAgIH1cclxufSJdfQ==