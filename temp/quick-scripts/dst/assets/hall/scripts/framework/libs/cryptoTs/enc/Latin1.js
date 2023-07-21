
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/enc/Latin1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f0385q3TeRCoofF/yaApeLO', 'Latin1');
// hall/scripts/framework/libs/cryptoTs/enc/Latin1.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latin1 = void 0;
var WordArray_1 = require("../lib/WordArray");
var Latin1 = /** @class */ (function () {
    function Latin1() {
    }
    /**
     * Converts a word array to a Latin1 string.
     *
     * @param wordArray The word array.
     *
     * @return The Latin1 string.
     *
     * @example
     *
     *     let latin1String = Latin1.stringify(wordArray);
     */
    Latin1.stringify = function (wordArray) {
        // Convert
        var latin1Chars = [];
        for (var i = 0; i < wordArray.sigBytes; i++) {
            var bite = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            latin1Chars.push(String.fromCharCode(bite));
        }
        return latin1Chars.join('');
    };
    /**
     * Converts a Latin1 string to a word array.
     *
     * @param latin1Str The Latin1 string.
     *
     * @return The word array.
     *
     * @example
     *
     *     let wordArray = Latin1.parse(latin1String);
     */
    Latin1.parse = function (latin1Str) {
        // Shortcut
        var latin1StrLength = latin1Str.length;
        // Convert
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
        }
        return new WordArray_1.WordArray(words, latin1StrLength);
    };
    return Latin1;
}());
exports.Latin1 = Latin1;
// type guard for the formatter (to ensure it has the required static methods)
var _ = Latin1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcZW5jXFxMYXRpbjEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQTZDO0FBSzdDO0lBQUE7SUE4Q0EsQ0FBQztJQTdDRzs7Ozs7Ozs7OztPQVVHO0lBQ1csZ0JBQVMsR0FBdkIsVUFBd0IsU0FBb0I7UUFDeEMsVUFBVTtRQUNWLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFNLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RFLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ1csWUFBSyxHQUFuQixVQUFvQixTQUFpQjtRQUNqQyxXQUFXO1FBQ1gsSUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUV6QyxVQUFVO1FBQ1YsSUFBTSxLQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzVFO1FBRUQsT0FBTyxJQUFJLHFCQUFTLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDTCxhQUFDO0FBQUQsQ0E5Q0EsQUE4Q0MsSUFBQTtBQTlDWSx3QkFBTTtBQWdEbkIsOEVBQThFO0FBQzlFLElBQU0sQ0FBQyxHQUFhLE1BQU0sQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuY29kaW5nIH0gZnJvbSAnLi9FbmNvZGluZyc7XHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4uL2xpYi9Xb3JkQXJyYXknO1xyXG5cclxuZGVjbGFyZSBmdW5jdGlvbiBlc2NhcGUoczogc3RyaW5nKTogc3RyaW5nO1xyXG5kZWNsYXJlIGZ1bmN0aW9uIHVuZXNjYXBlKHM6IHN0cmluZyk6IHN0cmluZztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXRpbjEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgTGF0aW4xIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgbGF0aW4xU3RyaW5nID0gTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0cmluZ2lmeSh3b3JkQXJyYXk6IFdvcmRBcnJheSk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gQ29udmVydFxyXG4gICAgICAgIGNvbnN0IGxhdGluMUNoYXJzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JkQXJyYXkuc2lnQnl0ZXM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBiaXRlID0gKHdvcmRBcnJheS53b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XHJcbiAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsYXRpbjFTdHIgVGhlIExhdGluMSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgd29yZCBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgd29yZEFycmF5ID0gTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2UobGF0aW4xU3RyOiBzdHJpbmcpOiBXb3JkQXJyYXkge1xyXG4gICAgICAgIC8vIFNob3J0Y3V0XHJcbiAgICAgICAgY29uc3QgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydFxyXG4gICAgICAgIGNvbnN0IHdvcmRzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheSh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gdHlwZSBndWFyZCBmb3IgdGhlIGZvcm1hdHRlciAodG8gZW5zdXJlIGl0IGhhcyB0aGUgcmVxdWlyZWQgc3RhdGljIG1ldGhvZHMpXHJcbmNvbnN0IF86IEVuY29kaW5nID0gTGF0aW4xOyJdfQ==