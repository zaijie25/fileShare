
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/BankModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxCYW5rTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBQzNELHlEQUEwRDtBQUMxRCxzREFBaUQ7QUFFakQ7SUFBdUMsNkJBQVM7SUFBaEQ7UUFBQSxxRUFrTUM7UUEvTFcsc0JBQWdCLEdBQVksUUFBUSxDQUFDO1FBQ3JDLG1CQUFhLEdBQVksSUFBSSxDQUFDOztJQThMMUMsQ0FBQztJQTVMRyxzQkFBVywyQkFBSTthQUFmO1lBRUksT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFUywwQkFBTSxHQUFoQjtJQUVBLENBQUM7SUFFRDs7TUFFRTtJQUNRLDJCQUFPLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVNLHNDQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFFTSwyQkFBTyxHQUFkO1FBQ0ksSUFBRyxJQUFJLENBQUMsYUFBYSxFQUFDO1lBRWxCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3pDO2FBQUk7WUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFTyxpQ0FBYSxHQUFyQixVQUF1QixJQUFVO1FBQzdCLElBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsY0FBYztJQUNQLGdDQUFZLEdBQW5CLFVBQXFCLEdBQVk7UUFD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ImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2RlbC9Nb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCI7XHJcbmltcG9ydCBHbG9iYWxFdmVudCBmcm9tIFwiLi4vLi4vY29yZS9HbG9iYWxFdmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFua01vZGVsIGV4dGVuZHMgTW9kZWxCYXNlXHJcbntcclxuXHJcbiAgICBwcml2YXRlIF9kZWZhdWx0UGFzc3dvcmQgOiBzdHJpbmcgPSBcIjg4ODg4OFwiO1xyXG4gICAgcHJpdmF0ZSBfYmFua1Bhc3N3b3JkIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkJhbmtNb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pWw5o2u5riF55CG5pe255qE5Zue6LCDXHJcbiAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5fYmFua1Bhc3N3b3JkID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdFBhc3N3b3JkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRQYXNzd29yZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW50b1duZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuX2JhbmtQYXNzd29yZCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlcUxvZ2luQmFuayh0aGlzLl9iYW5rUGFzc3dvcmQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEJhbmtMb2dpblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiYW5rRXJyb25GdW5jKCBkYXRhIDogYW55ICl7XHJcbiAgICAgICAgaWYoZGF0YS5fZXJyc3RyICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dCYW5rVGlwcyhkYXRhLl9lcnJzdHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmmL7npLrpk7booYxUaXAgKi9cclxuICAgIHB1YmxpYyBzaG93QmFua1RpcHMoIG1zZyA6IHN0cmluZyl7XHJcbiAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeZu+W9lemTtuihjFxyXG4gICAgICogQHBhcmFtIHB3ZCDpk7booYzlr4bnoIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcUxvZ2luQmFuayggcHdkIDogc3RyaW5nICl7XHJcbiAgICAgICAgdmFyIHB3ZE1ENSA9IEdsb2JhbC5Ub29sa2l0Lm1kNShwd2QpO1xyXG4gICAgICAgIGxldCBfcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwicHdkXCI6IHB3ZE1ENSxcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5Mb2dpbkJhbmssIF9wYXJhbSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEgOiBhbnkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFua1Bhc3N3b3JkID0gcHdkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc0xvZ2luQmFuayggZGF0YSApO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSA6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFua1Bhc3N3b3JkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJhbmtFcnJvbkZ1bmMoZGF0YSk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcIl9wYXJhbVwiOiB7XHJcblx0XHQgICAgXCJiYW5rX3BvaW50XCI6IOmTtuihjOmHkeminVxyXG4gICAgICAgIH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblJlc0xvZ2luQmFuayggZGF0YSA6IGFueSApe1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcIlduZEJhbmtVSVwiKVxyXG4gICAgICAgIEdsb2JhbC5QbGF5ZXJEYXRhLmJhbmtfcG9pbnQgPSBkYXRhLmJhbmtfcG9pbnQ7XHJcbiAgICAgICAgR2xvYmFsLlVJLmNsb3NlKFwiV25kQmFua0xvZ2luXCIpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmFua1VJXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55a+G56CBXHJcbiAgICAgKiBAcGFyYW0gb2xkcHdkIOaXp+mTtuihjOWvhueggVxyXG4gICAgICogQHBhcmFtIG5ld3B3ZCDmlrDpk7booYzlr4bnoIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcVNldEJhbmtQd2QoIG9sZHB3ZCA6IHN0cmluZyAsIG5ld3B3ZCA6IHN0cmluZyApe1xyXG4gICAgICAgIHZhciBvbGRwd2RNRDUgPSBHbG9iYWwuVG9vbGtpdC5tZDUob2xkcHdkKTtcclxuICAgICAgICB2YXIgbmV3cHdkTUQ1ID0gR2xvYmFsLlRvb2xraXQubWQ1KG5ld3B3ZCk7XHJcbiAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJvbGRfcHdkXCI6b2xkcHdkTUQ1LC8vTUQ1XHJcbiAgICAgICAgICAgIFwibmV3X3B3ZFwiOm5ld3B3ZE1ENSwvL01ENVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLlNldEJhbmtQd2QsIF9wYXJhbSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEgOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JhbmtQYXNzd29yZCA9IG5ld3B3ZDtcclxuICAgICAgICAgICAgICAgIHRoaXMub25SZXNTZXRCYW5rUHdkKCBkYXRhICk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFua0Vycm9uRnVuYy5iaW5kKHRoaXMpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUmVzU2V0QmFua1B3ZCggZGF0YSA6IGFueSApe1xyXG4gICAgICAgIHRoaXMuc2hvd0JhbmtUaXBzKFwi5L+u5pS55a+G56CB5oiQ5YqfXCIpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5jbG9zZShcIlduZEJhbmtDaGFuZ2VQV1wiKTtcclxuICAgICAgICB0aGlzLkludG9XbmQoKTtcclxuICAgICAgICAvLyBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuQkFOS19DSEFOR0VfUFdEX1NVQ0NFRUQpO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAgKiDlv5jorrDlr4bnoIFcclxuICAgICAgKiBAcGFyYW0gcGhvbmUg5omL5py65Y+3XHJcbiAgICAgICogQHBhcmFtIGNvZGUg6aqM6K+B56CBXHJcbiAgICAgICogQHBhcmFtIHB3ZCDmlrDlr4bnoIFcclxuICAgICAgKiBAcGFyYW0gYWNvZGUg5Yy65Y+3XHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgcmVxRm9yZ2V0QmFua1B3ZCggcGhvbmUgOiBzdHJpbmcgLCBjb2RlIDogc3RyaW5nICwgcHdkIDogc3RyaW5nICwgYWNvZGUgOiBzdHJpbmcgKXtcclxuICAgICAgICB2YXIgcHdkTUQ1ID0gR2xvYmFsLlRvb2xraXQubWQ1KHB3ZCk7XHJcbiAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwaG9uZVwiOkdsb2JhbC5BRVNVdGlsLmFlc0VuY3J5cHQoR2xvYmFsLlRvb2xraXQuY3J5cHRvS2V5LEdsb2JhbC5Ub29sa2l0LmNyeXB0b0l2LHBob25lKSxcclxuICAgICAgICAgICAgXCJjb2RlXCI6Y29kZSxcclxuICAgICAgICAgICAgXCJwd2RcIjpwd2RNRDUsXHJcbiAgICAgICAgICAgIFwiYWNvZGVcIjphY29kZSxcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5Gb3JnZXRCYW5rUHdkLCBfcGFyYW0sdGhpcy5vblJlc0ZvcmdldEJhbmtQd2QuYmluZCh0aGlzKSx0aGlzLmJhbmtFcnJvbkZ1bmMuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblJlc0ZvcmdldEJhbmtQd2QoIGRhdGEgOiBhbnkgKXtcclxuICAgICAgICB0aGlzLnNob3dCYW5rVGlwcyhcIuS/ruaUueWvhueggeaIkOWKn1wiKTtcclxuICAgICAgICBHbG9iYWwuVUkuY2xvc2UoXCJXbmRCYW5rRm9yZ2V0UFdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5a2Y6ZKxXHJcbiAgICAgICogQHBhcmFtIHBvaW50IOWtmOmSsemHkeminVxyXG4gICAgICAqL1xyXG4gICAgcHVibGljIHJlcVNhdmVCYW5rUG9pbnQoIHBvaW50IDogTnVtYmVyICl7XHJcbiAgICAgICAgbGV0IGZpeFBvaW50ID0gcG9pbnQudG9GaXhlZCgwKTsvLzIwMTktNS0yNSB4aWFvQyBudW1iZXLnsbvlnovlj6/og73lh7rnjrAuOTk5OTk5OTlcclxuICAgICAgICBsZXQgaW50UG9pbnQgPSBwYXJzZUludChmaXhQb2ludCwgMTApO1xyXG4gICAgICAgIGxldCBfcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiIDogMSwgLy8x5a2YIDLlj5ZcclxuXHRcdCAgICBcInBvaW50XCIgOiBpbnRQb2ludCxcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5EZWFsQmFua1BvaW50LCBfcGFyYW0sdGhpcy5vblJlc1NhdmVEZWFsQmFua1BvaW50LmJpbmQodGhpcyksdGhpcy5iYW5rRXJyb25GdW5jLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOWPlumSsVxyXG4gICAgICAqIEBwYXJhbSBwb2ludCDlj5bpkrHph5Hpop1cclxuICAgICAgKi9cclxuICAgIHB1YmxpYyByZXFEcmF3QmFua1BvaW50KCBwb2ludCA6IE51bWJlciApe1xyXG4gICAgICAgIGxldCBmaXhQb2ludCA9IHBvaW50LnRvRml4ZWQoMCk7Ly8yMDE5LTUtMjUgeGlhb0MgbnVtYmVy57G75Z6L5Y+v6IO95Ye6546wLjk5OTk5OTk5XHJcbiAgICAgICAgbGV0IGludFBvaW50ID0gcGFyc2VJbnQoZml4UG9pbnQsIDEwKTtcclxuICAgICAgICBsZXQgX3BhcmFtID0ge1xyXG4gICAgICAgICAgICBcInR5cGVcIiA6IDIsIC8vMeWtmCAy5Y+WXHJcblx0XHQgICAgXCJwb2ludFwiIDogaW50UG9pbnQsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuRGVhbEJhbmtQb2ludCwgX3BhcmFtLHRoaXMub25SZXNEYXJ3RGVhbEJhbmtQb2ludC5iaW5kKHRoaXMpLHRoaXMuYmFua0Vycm9uRnVuYy5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICBcIl9wYXJhbVwiOiB7XHJcblx0XHRcImJhbmtfcG9pbnRcIjrmk43kvZzkuYvlkI7pk7booYzljaHph5Hpop1cclxuXHRcdFwicG9pbnRcIjroh6rouqvph5Hpop1cclxuICAgIH0gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25SZXNTYXZlRGVhbEJhbmtQb2ludCggZGF0YSA6IGFueSApe1xyXG4gICAgICAgIHRoaXMuc2hvd0JhbmtUaXBzKFwi5a2Y5qy+5oiQ5YqfXCIpXHJcbiAgICAgICAgR2xvYmFsLlBsYXllckRhdGEucG9pbnQgPSBkYXRhLnBvaW50O1xyXG4gICAgICAgIEdsb2JhbC5QbGF5ZXJEYXRhLmJhbmtfcG9pbnQgPSBkYXRhLmJhbmtfcG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgXCJfcGFyYW1cIjoge1xyXG5cdFx0XCJiYW5rX3BvaW50XCI65pON5L2c5LmL5ZCO6ZO26KGM5Y2h6YeR6aKdXHJcblx0XHRcInBvaW50XCI66Ieq6Lqr6YeR6aKdXHJcbiAgICB9IFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUmVzRGFyd0RlYWxCYW5rUG9pbnQoIGRhdGEgOiBhbnkgKXtcclxuICAgICAgICB0aGlzLnNob3dCYW5rVGlwcyhcIuWPluasvuaIkOWKn1wiKVxyXG4gICAgICAgIEdsb2JhbC5QbGF5ZXJEYXRhLnBvaW50ID0gZGF0YS5wb2ludDtcclxuICAgICAgICBHbG9iYWwuUGxheWVyRGF0YS5iYW5rX3BvaW50ID0gZGF0YS5iYW5rX3BvaW50O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgIFxyXG59XHJcbiJdfQ==