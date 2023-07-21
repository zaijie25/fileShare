"use strict";
cc._RF.push(module, 'ae3c4fyqaRJjKB9DrOQBIX/', 'InnerServicer');
// hall/scripts/logic/hall/ui/Feedback/InnerServicer.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtServicer = void 0;
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var AbsServicer_1 = require("./AbsServicer");
/**
   应用内部打开的客服。如：艾特客服等
 */
var InnerServicer = /** @class */ (function (_super) {
    __extends(InnerServicer, _super);
    function InnerServicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerServicer.prototype.acceptService = function (index) {
        this.openServicer(this.serviceDatas[index]);
    };
    return InnerServicer;
}(AbsServicer_1.default));
exports.default = InnerServicer;
var AtServicer = /** @class */ (function (_super) {
    __extends(AtServicer, _super);
    function AtServicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AtServicer.prototype.openServicer = function (data) {
        Global.ChatServer.serverType = ServicerModel_1.CustomerEntranceType.HallService;
        Global.ChatServer.userSetting(null, data.info);
    };
    return AtServicer;
}(InnerServicer));
exports.AtServicer = AtServicer;

cc._RF.pop();