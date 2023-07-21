
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/MVC/command/PreModelCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4bc38NwAjVHyLsZvx7pGq9X', 'PreModelCommand');
// hall/scripts/logic/hall/MVC/command/PreModelCommand.ts

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
var AppConfigProxy_1 = require("../model/proxy/AppConfigProxy");
var PreModelCommand = /** @class */ (function (_super) {
    __extends(PreModelCommand, _super);
    function PreModelCommand() {
        return _super.call(this) || this;
    }
    PreModelCommand.prototype.execute = function (notification) {
        _super.prototype.execute.call(this, notification);
        this.facade.registerProxy(new AppConfigProxy_1.default());
    };
    return PreModelCommand;
}(puremvc.SimpleCommand));
exports.default = PreModelCommand;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXE1WQ1xcY29tbWFuZFxcUHJlTW9kZWxDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdFQUEwRDtBQUcxRDtJQUE2QyxtQ0FBcUI7SUFDOUQ7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFRCxpQ0FBTyxHQUFQLFVBQVEsWUFBaUM7UUFDckMsaUJBQU0sT0FBTyxZQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksd0JBQWMsRUFBRSxDQUFDLENBQUM7SUFFcEQsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FWQSxBQVVDLENBVjRDLE9BQU8sQ0FBQyxhQUFhLEdBVWpFIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBBcHBDb25maWdQcm94eSBmcm9tICcuLi9tb2RlbC9wcm94eS9BcHBDb25maWdQcm94eSdcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVNb2RlbENvbW1hbmQgZXh0ZW5kcyBwdXJlbXZjLlNpbXBsZUNvbW1hbmQge1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4ZWN1dGUobm90aWZpY2F0aW9uOnB1cmVtdmMuTm90aWZpY2F0aW9uKXtcclxuICAgICAgICBzdXBlci5leGVjdXRlKG5vdGlmaWNhdGlvbik7XHJcbiAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJQcm94eShuZXcgQXBwQ29uZmlnUHJveHkoKSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=