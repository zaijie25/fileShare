
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/tcp/italkmsg_unit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'abb95JsDS5JGpQoARRJ4yB8', 'italkmsg_unit');
// hall/scripts/logic/core/net/tcp/italkmsg_unit.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItalkUnit = /** @class */ (function () {
    function ItalkUnit() {
    }
    ItalkUnit.getLocalId = function () {
        var now = (new Date()).getTime();
        if (now != this.localidcurrtime) {
            this.localidcurrtime = now;
            this.localidindex = 0;
        }
        else {
            ++this.localidindex;
        }
        now = now * 1000;
        now += (this.localidindex % 100) * 10;
        now += 5;
        return now;
    };
    //   static  getLocalId():Int64{
    //     return new Int64(Date.parse(new Date().toString()));
    //   }
    ItalkUnit.localidcurrtime = 0;
    ItalkUnit.localidindex = 0;
    return ItalkUnit;
}());
exports.default = ItalkUnit;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcdGNwXFxpdGFsa21zZ191bml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQXFCQSxDQUFDO0lBYlcsb0JBQVUsR0FBbEI7UUFDSSxJQUFJLEdBQUcsR0FBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO2FBQU07WUFDSCxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDdkI7UUFDRCxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNqQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QyxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQ1IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBbkJMLGdDQUFnQztJQUNoQywyREFBMkQ7SUFDM0QsTUFBTTtJQUVhLHlCQUFlLEdBQVUsQ0FBQyxDQUFDO0lBQzNCLHNCQUFZLEdBQVUsQ0FBQyxDQUFDO0lBZTNDLGdCQUFDO0NBckJELEFBcUJDLElBQUE7QUFDRCxrQkFBZSxTQUFTLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBJdGFsa1VuaXQge1xyXG4vLyAgIHN0YXRpYyAgZ2V0TG9jYWxJZCgpOkludDY0e1xyXG4vLyAgICAgcmV0dXJuIG5ldyBJbnQ2NChEYXRlLnBhcnNlKG5ldyBEYXRlKCkudG9TdHJpbmcoKSkpO1xyXG4vLyAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2NhbGlkY3VycnRpbWU6bnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgc3RhdGljIGxvY2FsaWRpbmRleDpudW1iZXIgPSAwO1xyXG5cclxuICAgIHN0YXRpYyAgZ2V0TG9jYWxJZCgpOm51bWJlcntcclxuICAgICAgICBsZXQgbm93Om51bWJlciA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgaWYgKG5vdyAhPSB0aGlzLmxvY2FsaWRjdXJydGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsaWRjdXJydGltZSA9IG5vdztcclxuICAgICAgICAgICAgdGhpcy5sb2NhbGlkaW5kZXggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICsrdGhpcy5sb2NhbGlkaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdyA9IG5vdyAqIDEwMDA7XHJcbiAgICAgICAgbm93ICs9ICh0aGlzLmxvY2FsaWRpbmRleCAlIDEwMCkgKiAxMDtcclxuICAgICAgICBub3cgKz0gNVxyXG4gICAgICAgIHJldHVybiBub3c7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgSXRhbGtVbml0Il19