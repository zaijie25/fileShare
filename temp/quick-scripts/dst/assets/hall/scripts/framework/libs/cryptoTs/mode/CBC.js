
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/mode/CBC.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1690bfez9NT52Jg4MqoMSC', 'CBC');
// hall/scripts/framework/libs/cryptoTs/mode/CBC.ts

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
exports.CBC = void 0;
var BlockCipherMode_1 = require("./BlockCipherMode");
var CBCEncryptor_1 = require("./CBCEncryptor");
var CBCDecryptor_1 = require("./CBCDecryptor");
/**
 * Cipher Block Chaining mode.
 */
var CBC = /** @class */ (function (_super) {
    __extends(CBC, _super);
    function CBC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CBC.Encryptor = CBCEncryptor_1.CBCEncryptor;
    CBC.Decryptor = CBCDecryptor_1.CBCDecryptor;
    return CBC;
}(BlockCipherMode_1.BlockCipherMode));
exports.CBC = CBC;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbW9kZVxcQ0JDLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBb0Q7QUFDcEQsK0NBQThDO0FBQzlDLCtDQUE4QztBQUU5Qzs7R0FFRztBQUNIO0lBQWtDLHVCQUFlO0lBQWpEOztJQUlBLENBQUM7SUFIaUIsYUFBUyxHQUFRLDJCQUFZLENBQUM7SUFFOUIsYUFBUyxHQUFRLDJCQUFZLENBQUM7SUFDaEQsVUFBQztDQUpELEFBSUMsQ0FKaUMsaUNBQWUsR0FJaEQ7QUFKcUIsa0JBQUciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCbG9ja0NpcGhlck1vZGUgfSBmcm9tICcuL0Jsb2NrQ2lwaGVyTW9kZSc7XHJcbmltcG9ydCB7IENCQ0VuY3J5cHRvciB9IGZyb20gJy4vQ0JDRW5jcnlwdG9yJztcclxuaW1wb3J0IHsgQ0JDRGVjcnlwdG9yIH0gZnJvbSAnLi9DQkNEZWNyeXB0b3InO1xyXG5cclxuLyoqXHJcbiAqIENpcGhlciBCbG9jayBDaGFpbmluZyBtb2RlLlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENCQyBleHRlbmRzIEJsb2NrQ2lwaGVyTW9kZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVuY3J5cHRvcjogYW55ID0gQ0JDRW5jcnlwdG9yO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRGVjcnlwdG9yOiBhbnkgPSBDQkNEZWNyeXB0b3I7XHJcbn0iXX0=