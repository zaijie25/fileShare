
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/mode/ECB.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2881cZgK8tCP5nrlU+ioMJX', 'ECB');
// hall/scripts/framework/libs/cryptoTs/mode/ECB.ts

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
exports.ECB = void 0;
var BlockCipherMode_1 = require("./BlockCipherMode");
var ECBEncryptor_1 = require("./ECBEncryptor");
var ECBDecryptor_1 = require("./ECBDecryptor");
/**
 * Cipher Block Chaining mode.
 */
var ECB = /** @class */ (function (_super) {
    __extends(ECB, _super);
    function ECB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ECB.Encryptor = ECBEncryptor_1.ECBEncryptor;
    ECB.Decryptor = ECBDecryptor_1.ECBDecryptor;
    return ECB;
}(BlockCipherMode_1.BlockCipherMode));
exports.ECB = ECB;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbW9kZVxcRUNCLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBb0Q7QUFDcEQsK0NBQThDO0FBQzlDLCtDQUE4QztBQUU5Qzs7R0FFRztBQUNIO0lBQWtDLHVCQUFlO0lBQWpEOztJQUlBLENBQUM7SUFIaUIsYUFBUyxHQUF3QiwyQkFBWSxDQUFDO0lBRTlDLGFBQVMsR0FBd0IsMkJBQVksQ0FBQztJQUNoRSxVQUFDO0NBSkQsQUFJQyxDQUppQyxpQ0FBZSxHQUloRDtBQUpxQixrQkFBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJsb2NrQ2lwaGVyTW9kZSB9IGZyb20gJy4vQmxvY2tDaXBoZXJNb2RlJztcclxuaW1wb3J0IHsgRUNCRW5jcnlwdG9yIH0gZnJvbSAnLi9FQ0JFbmNyeXB0b3InO1xyXG5pbXBvcnQgeyBFQ0JEZWNyeXB0b3IgfSBmcm9tICcuL0VDQkRlY3J5cHRvcic7XHJcblxyXG4vKipcclxuICogQ2lwaGVyIEJsb2NrIENoYWluaW5nIG1vZGUuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRUNCIGV4dGVuZHMgQmxvY2tDaXBoZXJNb2RlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgRW5jcnlwdG9yOiB0eXBlb2YgRUNCRW5jcnlwdG9yID0gRUNCRW5jcnlwdG9yO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRGVjcnlwdG9yOiB0eXBlb2YgRUNCRGVjcnlwdG9yID0gRUNCRGVjcnlwdG9yO1xyXG59Il19