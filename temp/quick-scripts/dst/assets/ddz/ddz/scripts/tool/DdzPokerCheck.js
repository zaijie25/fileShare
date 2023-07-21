
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/tool/DdzPokerCheck.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHRvb2xcXERkelBva2VyQ2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFLLGVBR0o7QUFIRCxXQUFLLGVBQWU7SUFDaEIsOERBQWEsQ0FBQTtJQUNiLGtFQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhJLGVBQWUsS0FBZixlQUFlLFFBR25CO0FBRUQsSUFBSyxhQUtKO0FBTEQsV0FBSyxhQUFhO0lBQ2QsdURBQVcsQ0FBQTtJQUNkLGlEQUFRLENBQUE7SUFDUixtREFBUyxDQUFBO0lBQ1QsbURBQVMsQ0FBQTtBQUNWLENBQUMsRUFMSSxhQUFhLEtBQWIsYUFBYSxRQUtqQjtBQUVELElBQUssY0FnQko7QUFoQkQsV0FBSyxjQUFjO0lBQ2YscURBQVMsQ0FBQTtJQUNULG1EQUFJLENBQUE7SUFDSixtREFBSSxDQUFBO0lBQ0osaURBQUcsQ0FBQTtJQUNILHFEQUFLLENBQUE7SUFDTCxxREFBSyxDQUFBO0lBQ0wsbURBQUksQ0FBQTtJQUNKLGtEQUFHLENBQUE7SUFDSCxvREFBSSxDQUFBO0lBQ0osc0RBQUssQ0FBQTtJQUNMLG9EQUFJLENBQUE7SUFDSixrREFBUSxDQUFBO0lBQ1Isa0RBQVEsQ0FBQTtJQUNSLGdFQUFlLENBQUE7SUFDZiw0REFBYSxDQUFBO0FBQ2pCLENBQUMsRUFoQkksY0FBYyxLQUFkLGNBQWMsUUFnQmxCO0FBRUQ7SUFBQTtJQW9DQSxDQUFDO0lBbkNpQiw0QkFBYyxHQUE1QixVQUE2QixLQUFhO1FBQ3RDLElBQUksS0FBSyxJQUFJLGVBQWUsQ0FBQyxRQUFRO1lBQ2pDLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxJQUFJLGVBQWUsQ0FBQyxVQUFVO1lBQ25DLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUEsS0FBZSxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFoRCxHQUFHLFFBQUEsRUFBRSxLQUFLLFFBQXNDLENBQUM7UUFDdEQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksR0FBRyxJQUFJLENBQUM7WUFDUixNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUNoQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFYSwwQkFBWSxHQUExQixVQUEyQixLQUFLO1FBQzVCLE9BQU8sS0FBSyxJQUFJLGVBQWUsQ0FBQyxRQUFRLElBQUksS0FBSyxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUM7SUFDcEYsQ0FBQztJQUVhLDJCQUFhLEdBQTNCLFVBQTRCLEtBQUs7UUFDN0IsSUFBSSxLQUFLLElBQUksZUFBZSxDQUFDLFFBQVE7WUFDakMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLEtBQUssSUFBSSxlQUFlLENBQUMsVUFBVTtZQUNuQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVhLDZCQUFlLEdBQTdCLFVBQThCLEtBQUs7UUFDL0IsSUFBSSxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNqQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1YsSUFBQSxLQUFlLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQWhELEdBQUcsUUFBQSxFQUFFLEtBQUssUUFBc0MsQ0FBQztRQUN0RCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxLQUFLLElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxLQUFLLElBQUksYUFBYSxDQUFDLEtBQUssRUFBQztZQUN4RixPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2I7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImVudW0gRGR6UG9rZXJTcGVjaWFse1xyXG4gICAgUmVkR2hvc3QgPSA5NSxcclxuICAgIEJsYWNrR2hvc3QgPSA3OSxcclxufVxyXG5cclxuZW51bSBEZHpQb2tlckNvbG9ye1xyXG4gICAgRGlhbW9uZCA9IDEsXHJcblx0Q2x1YiA9IDIsXHJcblx0SGVhcnQgPSAzLFxyXG5cdFNwYWRlID0gNCxcclxufVxyXG5cclxuZW51bSBEZHpQb2tlcldlaWdodHtcclxuICAgIFRocmVlID0gMyxcclxuICAgIEZvdXIsXHJcbiAgICBGaXZlLFxyXG4gICAgU2l4LFxyXG4gICAgU2V2ZW4sXHJcbiAgICBFaWdodCxcclxuICAgIE5pbmUsXHJcbiAgICBUZW4sXHJcbiAgICBKYWNrLFxyXG4gICAgUXVlZW4sXHJcbiAgICBLaW5nLFxyXG4gICAgQWNlID0gMTQsXHJcbiAgICBUd28gPSAxNiwgICAgICAgICAgIC8vIHZhbHVlID0gMiwgMisxNipuXHJcbiAgICBCbGFja0dob3N0ID0gNzksICAgIC8vIHZhbHVlID0gNzlcclxuICAgIFJlZEdob3N0ID0gOTUsICAgICAgLy8gdmFsdWUgPSA5NVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpQb2tlckNoZWNre1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQb2tlcldlaWdodCh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBpZiAodmFsdWUgPT0gRGR6UG9rZXJTcGVjaWFsLlJlZEdob3N0KVxyXG4gICAgICAgICAgICByZXR1cm4gW0RkelBva2VyV2VpZ2h0LlJlZEdob3N0LCAwXTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gRGR6UG9rZXJTcGVjaWFsLkJsYWNrR2hvc3QpXHJcbiAgICAgICAgICAgIHJldHVybiBbRGR6UG9rZXJXZWlnaHQuQmxhY2tHaG9zdCwgMF07XHJcbiAgICAgICAgbGV0IFtudW0sIGNvbG9yXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgbGV0IHdlaWdodCA9IG51bTtcclxuICAgICAgICBpZiAobnVtID09IDIpXHJcbiAgICAgICAgICAgIHdlaWdodCA9IERkelBva2VyV2VpZ2h0LlR3bztcclxuICAgICAgICByZXR1cm4gW3dlaWdodCwgY29sb3JdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tJc0dob3N0KHZhbHVlKXtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT0gRGR6UG9rZXJTcGVjaWFsLlJlZEdob3N0IHx8IHZhbHVlID09IERkelBva2VyU3BlY2lhbC5CbGFja0dob3N0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UG9rZXJWYWx1ZSh2YWx1ZSl7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IERkelBva2VyU3BlY2lhbC5SZWRHaG9zdClcclxuICAgICAgICAgICAgcmV0dXJuIFs5NSwgMF07XHJcbiAgICAgICAgaWYgKHZhbHVlID09IERkelBva2VyU3BlY2lhbC5CbGFja0dob3N0KVxyXG4gICAgICAgICAgICByZXR1cm4gWzc5LCAwXTtcclxuICAgICAgICBsZXQgbnVtID0gdmFsdWUgJSAxNjtcclxuICAgICAgICBsZXQgY29sb3IgPSBNYXRoLmZsb29yKHZhbHVlIC8gMTYpICsgMTtcclxuICAgICAgICByZXR1cm4gW251bSwgY29sb3JdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tQb2tlclZhbGlkKHZhbHVlKXtcclxuICAgICAgICBpZiAoRGR6UG9rZXJDaGVjay5jaGVja0lzR2hvc3QodmFsdWUpKVxyXG4gICAgICAgICAgICByZXR1cm4gITA7XHJcbiAgICAgICAgbGV0IFtudW0sIGNvbG9yXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKG51bSA+PSAyICYmIG51bSA8PSAxNCAmJiBjb2xvciA+PSBEZHpQb2tlckNvbG9yLkRpYW1vbmQgJiYgY29sb3IgPD0gRGR6UG9rZXJDb2xvci5TcGFkZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAhMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICExO1xyXG4gICAgfVxyXG59Il19