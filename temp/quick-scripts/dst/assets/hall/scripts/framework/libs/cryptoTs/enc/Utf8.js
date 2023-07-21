
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/enc/Utf8.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4578fZA98lE/auRhmK3k1Fw', 'Utf8');
// hall/scripts/framework/libs/cryptoTs/enc/Utf8.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utf8 = void 0;
var Latin1_1 = require("./Latin1");
var Utf8 = /** @class */ (function () {
    function Utf8() {
    }
    /**
     * Converts a word array to a UTF-8 string.
     *
     * @param wordArray The word array.
     *
     * @return The UTF-8 string.
     *
     * @example
     *
     *     let utf8String = Utf8.stringify(wordArray);
     */
    Utf8.stringify = function (wordArray) {
        try {
            return decodeURIComponent(escape(Latin1_1.Latin1.stringify(wordArray)));
        }
        catch (e) {
            throw new Error('Malformed UTF-8 data');
        }
    };
    /**
     * Converts a UTF-8 string to a word array.
     *
     * @param utf8Str The UTF-8 string.
     *
     * @return The word array.
     *
     * @example
     *
     *     let wordArray = Utf8.parse(utf8String);
     */
    Utf8.parse = function (utf8Str) {
        return Latin1_1.Latin1.parse(unescape(encodeURIComponent(utf8Str)));
    };
    return Utf8;
}());
exports.Utf8 = Utf8;
// type guard for the formatter (to ensure it has the required static methods)
var _ = Utf8;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcZW5jXFxVdGY4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG1DQUFrQztBQUVsQztJQUFBO0lBa0NBLENBQUM7SUFqQ0c7Ozs7Ozs7Ozs7T0FVRztJQUNXLGNBQVMsR0FBdkIsVUFBd0IsU0FBb0I7UUFDeEMsSUFBSTtZQUNBLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNXLFVBQUssR0FBbkIsVUFBb0IsT0FBZTtRQUMvQixPQUFPLGVBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0wsV0FBQztBQUFELENBbENBLEFBa0NDLElBQUE7QUFsQ1ksb0JBQUk7QUFvQ2pCLDhFQUE4RTtBQUM5RSxJQUFNLENBQUMsR0FBYSxJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmNvZGluZyB9IGZyb20gJy4vRW5jb2RpbmcnO1xyXG5pbXBvcnQgeyBXb3JkQXJyYXkgfSBmcm9tICcuLi9saWIvV29yZEFycmF5JztcclxuaW1wb3J0IHsgTGF0aW4xIH0gZnJvbSAnLi9MYXRpbjEnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFV0Zjgge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBVVEYtOCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IHV0ZjhTdHJpbmcgPSBVdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0cmluZ2lmeSh3b3JkQXJyYXk6IFdvcmRBcnJheSk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIFRoZSB3b3JkIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIGxldCB3b3JkQXJyYXkgPSBVdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlKHV0ZjhTdHI6IHN0cmluZyk6IFdvcmRBcnJheSB7XHJcbiAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gdHlwZSBndWFyZCBmb3IgdGhlIGZvcm1hdHRlciAodG8gZW5zdXJlIGl0IGhhcyB0aGUgcmVxdWlyZWQgc3RhdGljIG1ldGhvZHMpXHJcbmNvbnN0IF86IEVuY29kaW5nID0gVXRmODsiXX0=