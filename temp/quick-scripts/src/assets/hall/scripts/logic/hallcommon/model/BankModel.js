"use strict";
cc._RF.push(module, 'da6b7ZpJXdM4bz0HFP95uGT', 'BankModel');
// hall/scripts/logic/hallcommon/model/BankModel.ts

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
var GlobalEvent_1 = require("../../core/GlobalEvent");
var BankModel = /** @class */ (function (_super) {
    __extends(BankModel, _super);
    function BankModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._defaultPassword = "888888";
        _this._bankPassword = null;
        return _this;
    }
    Object.defineProperty(BankModel.prototype, "Name", {
        get: function () {
            return "BankModel";
        },
        enumerable: false,
        configurable: true
    });
    BankModel.prototype.onInit = function () {
    };
    /**
     * 数据清理时的回调
    */
    BankModel.prototype.onClear = function () {
        this._bankPassword = null;
    };
    BankModel.prototype.getDefaultPassword = function () {
        return this._defaultPassword;
    };
    BankModel.prototype.IntoWnd = function () {
        if (this._bankPassword) {
            this.reqLoginBank(this._bankPassword);
        }
        else {
            Global.UI.show("WndBankLogin");
        }
    };
    BankModel.prototype.bankErronFunc = function (data) {
        if (data._errstr != null) {
            this.showBankTips(data._errstr);
            return false;
        }
        return true;
    };
    /** 显示银行Tip */
    BankModel.prototype.showBankTips = function (msg) {
        Global.UI.fastTip(msg);
    };
    /**
     * 登录银行
     * @param pwd 银行密码
     */
    BankModel.prototype.reqLoginBank = function (pwd) {
        var pwdMD5 = Global.Toolkit.md5(pwd);
        var _param = {
            "pwd": pwdMD5,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.LoginBank, _param, function (data) {
            this._bankPassword = pwd;
            this.onResLoginBank(data);
        }.bind(this), function (data) {
            this._bankPassword = null;
            return this.bankErronFunc(data);
        }.bind(this));
    };
    /**
     * "_param": {
            "bank_point": 银行金额
        }
     */
    BankModel.prototype.onResLoginBank = function (data) {
        Global.Event.event(GlobalEvent_1.default.SHOW_NET_WAITING, "WndBankUI");
        Global.PlayerData.bank_point = data.bank_point;
        Global.UI.close("WndBankLogin");
        Global.UI.show("WndBankUI");
    };
    /**
     * 修改密码
     * @param oldpwd 旧银行密码
     * @param newpwd 新银行密码
     */
    BankModel.prototype.reqSetBankPwd = function (oldpwd, newpwd) {
        var oldpwdMD5 = Global.Toolkit.md5(oldpwd);
        var newpwdMD5 = Global.Toolkit.md5(newpwd);
        var _param = {
            "old_pwd": oldpwdMD5,
            "new_pwd": newpwdMD5,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.SetBankPwd, _param, function (data) {
            this._bankPassword = newpwd;
            this.onResSetBankPwd(data);
        }.bind(this), this.bankErronFunc.bind(this));
    };
    /**
     *
     */
    BankModel.prototype.onResSetBankPwd = function (data) {
        this.showBankTips("修改密码成功");
        Global.UI.close("WndBankChangePW");
        this.IntoWnd();
        // Global.Event.event(GlobalEvent.BANK_CHANGE_PWD_SUCCEED);
    };
    /**
     * 忘记密码
     * @param phone 手机号
     * @param code 验证码
     * @param pwd 新密码
     * @param acode 区号
     */
    BankModel.prototype.reqForgetBankPwd = function (phone, code, pwd, acode) {
        var pwdMD5 = Global.Toolkit.md5(pwd);
        var _param = {
            "phone": Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phone),
            "code": code,
            "pwd": pwdMD5,
            "acode": acode,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ForgetBankPwd, _param, this.onResForgetBankPwd.bind(this), this.bankErronFunc.bind(this));
    };
    /**
     *
     */
    BankModel.prototype.onResForgetBankPwd = function (data) {
        this.showBankTips("修改密码成功");
        Global.UI.close("WndBankForgetPW");
    };
    /**
      * 存钱
      * @param point 存钱金额
      */
    BankModel.prototype.reqSaveBankPoint = function (point) {
        var fixPoint = point.toFixed(0); //2019-5-25 xiaoC number类型可能出现.99999999
        var intPoint = parseInt(fixPoint, 10);
        var _param = {
            "type": 1,
            "point": intPoint,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.DealBankPoint, _param, this.onResSaveDealBankPoint.bind(this), this.bankErronFunc.bind(this));
    };
    /**
      * 取钱
      * @param point 取钱金额
      */
    BankModel.prototype.reqDrawBankPoint = function (point) {
        var fixPoint = point.toFixed(0); //2019-5-25 xiaoC number类型可能出现.99999999
        var intPoint = parseInt(fixPoint, 10);
        var _param = {
            "type": 2,
            "point": intPoint,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.DealBankPoint, _param, this.onResDarwDealBankPoint.bind(this), this.bankErronFunc.bind(this));
    };
    /**
     "_param": {
        "bank_point":操作之后银行卡金额
        "point":自身金额
    }
     */
    BankModel.prototype.onResSaveDealBankPoint = function (data) {
        this.showBankTips("存款成功");
        Global.PlayerData.point = data.point;
        Global.PlayerData.bank_point = data.bank_point;
    };
    /**
     "_param": {
        "bank_point":操作之后银行卡金额
        "point":自身金额
    }
     */
    BankModel.prototype.onResDarwDealBankPoint = function (data) {
        this.showBankTips("取款成功");
        Global.PlayerData.point = data.point;
        Global.PlayerData.bank_point = data.bank_point;
    };
    return BankModel;
}(ModelBase_1.default));
exports.default = BankModel;

cc._RF.pop();