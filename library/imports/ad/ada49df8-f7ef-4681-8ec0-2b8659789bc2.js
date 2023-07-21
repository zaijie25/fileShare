"use strict";
cc._RF.push(module, 'ada49349+9GgY7AK4ZZeJvC', 'DdzPokerCheck');
// ddz/ddz/scripts/tool/DdzPokerCheck.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzPokerSpecial;
(function (DdzPokerSpecial) {
    DdzPokerSpecial[DdzPokerSpecial["RedGhost"] = 95] = "RedGhost";
    DdzPokerSpecial[DdzPokerSpecial["BlackGhost"] = 79] = "BlackGhost";
})(DdzPokerSpecial || (DdzPokerSpecial = {}));
var DdzPokerColor;
(function (DdzPokerColor) {
    DdzPokerColor[DdzPokerColor["Diamond"] = 1] = "Diamond";
    DdzPokerColor[DdzPokerColor["Club"] = 2] = "Club";
    DdzPokerColor[DdzPokerColor["Heart"] = 3] = "Heart";
    DdzPokerColor[DdzPokerColor["Spade"] = 4] = "Spade";
})(DdzPokerColor || (DdzPokerColor = {}));
var DdzPokerWeight;
(function (DdzPokerWeight) {
    DdzPokerWeight[DdzPokerWeight["Three"] = 3] = "Three";
    DdzPokerWeight[DdzPokerWeight["Four"] = 4] = "Four";
    DdzPokerWeight[DdzPokerWeight["Five"] = 5] = "Five";
    DdzPokerWeight[DdzPokerWeight["Six"] = 6] = "Six";
    DdzPokerWeight[DdzPokerWeight["Seven"] = 7] = "Seven";
    DdzPokerWeight[DdzPokerWeight["Eight"] = 8] = "Eight";
    DdzPokerWeight[DdzPokerWeight["Nine"] = 9] = "Nine";
    DdzPokerWeight[DdzPokerWeight["Ten"] = 10] = "Ten";
    DdzPokerWeight[DdzPokerWeight["Jack"] = 11] = "Jack";
    DdzPokerWeight[DdzPokerWeight["Queen"] = 12] = "Queen";
    DdzPokerWeight[DdzPokerWeight["King"] = 13] = "King";
    DdzPokerWeight[DdzPokerWeight["Ace"] = 14] = "Ace";
    DdzPokerWeight[DdzPokerWeight["Two"] = 16] = "Two";
    DdzPokerWeight[DdzPokerWeight["BlackGhost"] = 79] = "BlackGhost";
    DdzPokerWeight[DdzPokerWeight["RedGhost"] = 95] = "RedGhost";
})(DdzPokerWeight || (DdzPokerWeight = {}));
var DdzPokerCheck = /** @class */ (function () {
    function DdzPokerCheck() {
    }
    DdzPokerCheck.getPokerWeight = function (value) {
        if (value == DdzPokerSpecial.RedGhost)
            return [DdzPokerWeight.RedGhost, 0];
        if (value == DdzPokerSpecial.BlackGhost)
            return [DdzPokerWeight.BlackGhost, 0];
        var _a = DdzPokerCheck.getPokerValue(value), num = _a[0], color = _a[1];
        var weight = num;
        if (num == 2)
            weight = DdzPokerWeight.Two;
        return [weight, color];
    };
    DdzPokerCheck.checkIsGhost = function (value) {
        return value == DdzPokerSpecial.RedGhost || value == DdzPokerSpecial.BlackGhost;
    };
    DdzPokerCheck.getPokerValue = function (value) {
        if (value == DdzPokerSpecial.RedGhost)
            return [95, 0];
        if (value == DdzPokerSpecial.BlackGhost)
            return [79, 0];
        var num = value % 16;
        var color = Math.floor(value / 16) + 1;
        return [num, color];
    };
    DdzPokerCheck.checkPokerValid = function (value) {
        if (DdzPokerCheck.checkIsGhost(value))
            return !0;
        var _a = DdzPokerCheck.getPokerValue(value), num = _a[0], color = _a[1];
        if (num >= 2 && num <= 14 && color >= DdzPokerColor.Diamond && color <= DdzPokerColor.Spade) {
            return !0;
        }
        return !1;
    };
    return DdzPokerCheck;
}());
exports.default = DdzPokerCheck;

cc._RF.pop();