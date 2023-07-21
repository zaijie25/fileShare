"use strict";
cc._RF.push(module, 'cadae9XJZVLDpiHhA3nUSaU', 'PersonalInfoModel');
// hall/scripts/logic/hallcommon/model/PersonalInfoModel.ts

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
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var PersonalInfoModel = /** @class */ (function (_super) {
    __extends(PersonalInfoModel, _super);
    function PersonalInfoModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PersonalInfoModel.prototype, "Name", {
        get: function () {
            return "PersonalInfoModel";
        },
        enumerable: false,
        configurable: true
    });
    PersonalInfoModel.prototype.reqGetUserInfo = function () {
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserInfo, param);
    };
    PersonalInfoModel.prototype.reqEditPwd = function (phone, code, acode, pwd, callback) {
        var param = {
            "phone": Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phone),
            "code": code,
            "acode": acode,
            "pwd": pwd
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.EditPwd, param, callback);
    };
    PersonalInfoModel.prototype.reqBindPhone = function (phone, code, acode, pwd, callback) {
        var param = {
            "phone": Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phone),
            "code": code,
            "acode": acode,
            "pwd": pwd
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.BindPhone, param, callback);
    };
    PersonalInfoModel.prototype.reqEditUserInfo = function (param, callback) {
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.EditUserInfo, param, callback);
    };
    return PersonalInfoModel;
}(ModelBase_1.default));
exports.default = PersonalInfoModel;

cc._RF.pop();