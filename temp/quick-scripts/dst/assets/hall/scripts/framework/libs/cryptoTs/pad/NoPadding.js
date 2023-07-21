
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/pad/NoPadding.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'abd69n3lotGJ5L43j1dAHpZ', 'NoPadding');
// hall/scripts/framework/libs/cryptoTs/pad/NoPadding.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoPadding = void 0;
var NoPadding = /** @class */ (function () {
    function NoPadding() {
    }
    /**
     * Doesn't pad the data provided.
     *
     * @param data The data to pad.
     * @param blockSize The multiple that the data should be padded to.
     *
     * @example
     *
     *     NoPadding.pad(wordArray, 4);
     */
    NoPadding.pad = function (data, blockSize) {
    };
    /**
     * Doesn't unpad the data provided.
     *
     * @param data The data to unpad.
     *
     * @example
     *
     *     NoPadding.unpad(wordArray);
     */
    NoPadding.unpad = function (data) {
    };
    return NoPadding;
}());
exports.NoPadding = NoPadding;
// type guard for the padding (to ensure it has the required static methods)
var _ = NoPadding;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xccGFkXFxOb1BhZGRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7SUFBQTtJQXlCQSxDQUFDO0lBeEJHOzs7Ozs7Ozs7T0FTRztJQUNXLGFBQUcsR0FBakIsVUFBa0IsSUFBZSxFQUFFLFNBQWlCO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNXLGVBQUssR0FBbkIsVUFBb0IsSUFBZTtJQUNuQyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXpCQSxBQXlCQyxJQUFBO0FBekJZLDhCQUFTO0FBMkJ0Qiw0RUFBNEU7QUFDNUUsSUFBTSxDQUFDLEdBQVksU0FBUyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV29yZEFycmF5IH0gZnJvbSAnLi4vbGliL1dvcmRBcnJheSc7XHJcbmltcG9ydCB7IFBhZGRpbmcgfSBmcm9tICcuL1BhZGRpbmcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vUGFkZGluZyB7XHJcbiAgICAvKipcclxuICAgICAqIERvZXNuJ3QgcGFkIHRoZSBkYXRhIHByb3ZpZGVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIHBhZC5cclxuICAgICAqIEBwYXJhbSBibG9ja1NpemUgVGhlIG11bHRpcGxlIHRoYXQgdGhlIGRhdGEgc2hvdWxkIGJlIHBhZGRlZCB0by5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBOb1BhZGRpbmcucGFkKHdvcmRBcnJheSwgNCk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFkKGRhdGE6IFdvcmRBcnJheSwgYmxvY2tTaXplOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERvZXNuJ3QgdW5wYWQgdGhlIGRhdGEgcHJvdmlkZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gdW5wYWQuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgTm9QYWRkaW5nLnVucGFkKHdvcmRBcnJheSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdW5wYWQoZGF0YTogV29yZEFycmF5KTogdm9pZCB7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIHR5cGUgZ3VhcmQgZm9yIHRoZSBwYWRkaW5nICh0byBlbnN1cmUgaXQgaGFzIHRoZSByZXF1aXJlZCBzdGF0aWMgbWV0aG9kcylcclxuY29uc3QgXzogUGFkZGluZyA9IE5vUGFkZGluZzsiXX0=