"use strict";
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