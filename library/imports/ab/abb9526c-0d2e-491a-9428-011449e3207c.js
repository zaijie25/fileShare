"use strict";
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