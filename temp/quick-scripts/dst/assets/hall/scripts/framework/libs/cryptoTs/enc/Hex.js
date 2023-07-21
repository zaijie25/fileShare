
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/enc/Hex.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c4749+wapKU7r3KJ/FXnwa', 'Hex');
// hall/scripts/framework/libs/cryptoTs/enc/Hex.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hex = void 0;
var WordArray_1 = require("../lib/WordArray");
var Hex = /** @class */ (function () {
    function Hex() {
    }
    /**
     * Converts a word array to a hex string.
     *
     * @param wordArray The word array.
     *
     * @return The hex string.
     *
     * @example
     *
     *     let hexString = Hex.stringify(wordArray);
     */
    Hex.stringify = function (wordArray) {
        // Convert
        var hexChars = [];
        for (var i = 0; i < wordArray.sigBytes; i++) {
            var bite = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 0x0f).toString(16));
        }
        return hexChars.join('');
    };
    /**
     * Converts a hex string to a word array.
     *
     * @param hexStr The hex string.
     *
     * @return The word array.
     *
     * @example
     *
     *     let wordArray = Hex.parse(hexString);
     */
    Hex.parse = function (hexStr) {
        // Shortcut
        var hexStrLength = hexStr.length;
        // Convert
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
        }
        return new WordArray_1.WordArray(words, hexStrLength / 2);
    };
    return Hex;
}());
exports.Hex = Hex;
// type guard for the formatter (to ensure it has the required static methods)
var _ = Hex;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcZW5jXFxIZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQTZDO0FBRTdDO0lBQUE7SUErQ0EsQ0FBQztJQTlDRzs7Ozs7Ozs7OztPQVVHO0lBQ1csYUFBUyxHQUF2QixVQUF3QixTQUFvQjtRQUN4QyxVQUFVO1FBQ1YsSUFBTSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFNLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNXLFNBQUssR0FBbkIsVUFBb0IsTUFBYztRQUM5QixXQUFXO1FBQ1gsSUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUVuQyxVQUFVO1FBQ1YsSUFBTSxLQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0U7UUFFRCxPQUFPLElBQUkscUJBQVMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDTCxVQUFDO0FBQUQsQ0EvQ0EsQUErQ0MsSUFBQTtBQS9DWSxrQkFBRztBQWlEaEIsOEVBQThFO0FBQzlFLElBQU0sQ0FBQyxHQUFhLEdBQUcsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuY29kaW5nIH0gZnJvbSAnLi9FbmNvZGluZyc7XHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4uL2xpYi9Xb3JkQXJyYXknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhleCB7XHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBoZXggc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIGxldCBoZXhTdHJpbmcgPSBIZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5naWZ5KHdvcmRBcnJheTogV29yZEFycmF5KTogc3RyaW5nIHtcclxuICAgICAgICAvLyBDb252ZXJ0XHJcbiAgICAgICAgY29uc3QgaGV4Q2hhcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmRBcnJheS5zaWdCeXRlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJpdGUgPSAod29yZEFycmF5LndvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcclxuICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcclxuICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSAmIDB4MGYpLnRvU3RyaW5nKDE2KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaGV4Q2hhcnMuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgd29yZCBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgd29yZEFycmF5ID0gSGV4LnBhcnNlKGhleFN0cmluZyk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2UoaGV4U3RyOiBzdHJpbmcpOiBXb3JkQXJyYXkge1xyXG4gICAgICAgIC8vIFNob3J0Y3V0XHJcbiAgICAgICAgY29uc3QgaGV4U3RyTGVuZ3RoID0gaGV4U3RyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydFxyXG4gICAgICAgIGNvbnN0IHdvcmRzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICB3b3Jkc1tpID4+PiAzXSB8PSBwYXJzZUludChoZXhTdHIuc3Vic3RyKGksIDIpLCAxNikgPDwgKDI0IC0gKGkgJSA4KSAqIDQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyB0eXBlIGd1YXJkIGZvciB0aGUgZm9ybWF0dGVyICh0byBlbnN1cmUgaXQgaGFzIHRoZSByZXF1aXJlZCBzdGF0aWMgbWV0aG9kcylcclxuY29uc3QgXzogRW5jb2RpbmcgPSBIZXg7Il19