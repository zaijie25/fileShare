
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/crypto-ts.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7c0cdLJMOZIM7nYUxsW9Zog', 'crypto-ts');
// hall/scripts/framework/libs/cryptoTs/crypto-ts.ts

"use strict";
// DEPENDENCIES ////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHA256 = exports.AES = exports.mode = exports.pad = exports.enc = exports.algo = exports.lib = void 0;
// LIB /////////////////////////////////////////////////////////////////////////////////////////////
var WordArray_1 = require("./lib/WordArray");
var BlockCipher_1 = require("./lib/BlockCipher");
var CipherParams_1 = require("./lib/CipherParams");
var Hasher_1 = require("./lib/Hasher");
var SerializableCipher_1 = require("./lib/SerializableCipher");
var PasswordBasedCipher_1 = require("./lib/PasswordBasedCipher");
exports.lib = {
    BlockCipher: BlockCipher_1.BlockCipher,
    WordArray: WordArray_1.WordArray,
    CipherParams: CipherParams_1.CipherParams,
    Hasher: Hasher_1.Hasher,
    SerializableCipher: SerializableCipher_1.SerializableCipher,
    PasswordBasedCipher: PasswordBasedCipher_1.PasswordBasedCipher
};
// ALGORITHMS //////////////////////////////////////////////////////////////////////////////////////
var AES_1 = require("./algo/AES");
var SHA256_1 = require("./algo/SHA256");
exports.algo = {
    AES: AES_1.AES,
    SHA256: SHA256_1.SHA256
};
// ENCODINGS ///////////////////////////////////////////////////////////////////////////////////////
var Utf8_1 = require("./enc/Utf8");
var Hex_1 = require("./enc/Hex");
exports.enc = {
    Utf8: Utf8_1.Utf8,
    Hex: Hex_1.Hex
};
// PADDING /////////////////////////////////////////////////////////////////////////////////////////
var NoPadding_1 = require("./pad/NoPadding");
var PKCS7_1 = require("./pad/PKCS7");
exports.pad = {
    NoPadding: NoPadding_1.NoPadding,
    PKCS7: PKCS7_1.PKCS7
};
// MODES ///////////////////////////////////////////////////////////////////////////////////////////
var CBC_1 = require("./mode/CBC");
var ECB_1 = require("./mode/ECB");
exports.mode = {
    CBC: CBC_1.CBC,
    ECB: ECB_1.ECB
};
// HELPERS /////////////////////////////////////////////////////////////////////////////////////////
exports.AES = exports.lib.BlockCipher._createHelper(exports.algo.AES);
exports.SHA256 = exports.lib.Hasher._createHelper(exports.algo.SHA256);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcY3J5cHRvLXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvR0FBb0c7OztBQUtwRyxvR0FBb0c7QUFFcEcsNkNBQTRDO0FBQzVDLGlEQUFnRDtBQUNoRCxtREFBa0Q7QUFDbEQsdUNBQXNDO0FBQ3RDLCtEQUE4RDtBQUM5RCxpRUFBZ0U7QUFFbkQsUUFBQSxHQUFHLEdBQUc7SUFDZixXQUFXLEVBQUUseUJBQVc7SUFDeEIsU0FBUyxFQUFFLHFCQUFTO0lBQ3BCLFlBQVksRUFBRSwyQkFBWTtJQUMxQixNQUFNLEVBQUUsZUFBTTtJQUNkLGtCQUFrQixFQUFFLHVDQUFrQjtJQUN0QyxtQkFBbUIsRUFBRSx5Q0FBbUI7Q0FDM0MsQ0FBQztBQUVGLG9HQUFvRztBQUVwRyxrQ0FBaUQ7QUFDakQsd0NBQTBEO0FBRTdDLFFBQUEsSUFBSSxHQUFHO0lBQ2hCLEdBQUcsRUFBRSxTQUFZO0lBQ2pCLE1BQU0sRUFBRSxlQUFlO0NBQzFCLENBQUM7QUFFRixvR0FBb0c7QUFFcEcsbUNBQWtDO0FBQ2xDLGlDQUFnQztBQUVuQixRQUFBLEdBQUcsR0FBRztJQUNmLElBQUksRUFBRSxXQUFJO0lBQ1YsR0FBRyxFQUFFLFNBQUc7Q0FDWCxDQUFDO0FBRUYsb0dBQW9HO0FBRXBHLDZDQUE0QztBQUM1QyxxQ0FBb0M7QUFFdkIsUUFBQSxHQUFHLEdBQUc7SUFDZixTQUFTLEVBQUUscUJBQVM7SUFDcEIsS0FBSyxFQUFFLGFBQUs7Q0FDZixDQUFDO0FBRUYsb0dBQW9HO0FBRXBHLGtDQUFpQztBQUNqQyxrQ0FBaUM7QUFFcEIsUUFBQSxJQUFJLEdBQUc7SUFDaEIsR0FBRyxFQUFFLFNBQUc7SUFDUixHQUFHLEVBQUUsU0FBRztDQUNYLENBQUM7QUFFRixvR0FBb0c7QUFFdkYsUUFBQSxHQUFHLEdBQUcsV0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLFFBQUEsTUFBTSxHQUFHLFdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERFUEVOREVOQ0lFUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vIGltcG9ydCBpbmRpcmVjdGx5IHJlZmVyZW5jZWQgZGVjbGFyYXRpb25zXHJcbmltcG9ydCB7IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWcgfSBmcm9tICcuL2xpYi9CdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnJztcclxuXHJcbi8vIExJQiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4vbGliL1dvcmRBcnJheSc7XHJcbmltcG9ydCB7IEJsb2NrQ2lwaGVyIH0gZnJvbSAnLi9saWIvQmxvY2tDaXBoZXInO1xyXG5pbXBvcnQgeyBDaXBoZXJQYXJhbXMgfSBmcm9tICcuL2xpYi9DaXBoZXJQYXJhbXMnO1xyXG5pbXBvcnQgeyBIYXNoZXIgfSBmcm9tICcuL2xpYi9IYXNoZXInO1xyXG5pbXBvcnQgeyBTZXJpYWxpemFibGVDaXBoZXIgfSBmcm9tICcuL2xpYi9TZXJpYWxpemFibGVDaXBoZXInO1xyXG5pbXBvcnQgeyBQYXNzd29yZEJhc2VkQ2lwaGVyIH0gZnJvbSAnLi9saWIvUGFzc3dvcmRCYXNlZENpcGhlcic7XHJcblxyXG5leHBvcnQgY29uc3QgbGliID0ge1xyXG4gICAgQmxvY2tDaXBoZXI6IEJsb2NrQ2lwaGVyLFxyXG4gICAgV29yZEFycmF5OiBXb3JkQXJyYXksXHJcbiAgICBDaXBoZXJQYXJhbXM6IENpcGhlclBhcmFtcyxcclxuICAgIEhhc2hlcjogSGFzaGVyLFxyXG4gICAgU2VyaWFsaXphYmxlQ2lwaGVyOiBTZXJpYWxpemFibGVDaXBoZXIsXHJcbiAgICBQYXNzd29yZEJhc2VkQ2lwaGVyOiBQYXNzd29yZEJhc2VkQ2lwaGVyXHJcbn07XHJcblxyXG4vLyBBTEdPUklUSE1TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5pbXBvcnQgeyBBRVMgYXMgQUVTQWxnb3JpdGhtIH0gZnJvbSAnLi9hbGdvL0FFUyc7XHJcbmltcG9ydCB7IFNIQTI1NiBhcyBTSEEyNTZBbGdvcml0aG0gfSBmcm9tICcuL2FsZ28vU0hBMjU2JztcclxuXHJcbmV4cG9ydCBjb25zdCBhbGdvID0ge1xyXG4gICAgQUVTOiBBRVNBbGdvcml0aG0sXHJcbiAgICBTSEEyNTY6IFNIQTI1NkFsZ29yaXRobVxyXG59O1xyXG5cclxuLy8gRU5DT0RJTkdTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuaW1wb3J0IHsgVXRmOCB9IGZyb20gJy4vZW5jL1V0ZjgnO1xyXG5pbXBvcnQgeyBIZXggfSBmcm9tICcuL2VuYy9IZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGVuYyA9IHtcclxuICAgIFV0Zjg6IFV0ZjgsXHJcbiAgICBIZXg6IEhleFxyXG59O1xyXG5cclxuLy8gUEFERElORyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuaW1wb3J0IHsgTm9QYWRkaW5nIH0gZnJvbSAnLi9wYWQvTm9QYWRkaW5nJztcclxuaW1wb3J0IHsgUEtDUzcgfSBmcm9tICcuL3BhZC9QS0NTNyc7XHJcblxyXG5leHBvcnQgY29uc3QgcGFkID0ge1xyXG4gICAgTm9QYWRkaW5nOiBOb1BhZGRpbmcsXHJcbiAgICBQS0NTNzogUEtDUzdcclxufTtcclxuXHJcbi8vIE1PREVTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmltcG9ydCB7IENCQyB9IGZyb20gJy4vbW9kZS9DQkMnO1xyXG5pbXBvcnQgeyBFQ0IgfSBmcm9tICcuL21vZGUvRUNCJztcclxuXHJcbmV4cG9ydCBjb25zdCBtb2RlID0ge1xyXG4gICAgQ0JDOiBDQkMsXHJcbiAgICBFQ0I6IEVDQlxyXG59O1xyXG5cclxuLy8gSEVMUEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFFUyA9IGxpYi5CbG9ja0NpcGhlci5fY3JlYXRlSGVscGVyKGFsZ28uQUVTKTtcclxuZXhwb3J0IGNvbnN0IFNIQTI1NiA9IGxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihhbGdvLlNIQTI1Nik7Il19