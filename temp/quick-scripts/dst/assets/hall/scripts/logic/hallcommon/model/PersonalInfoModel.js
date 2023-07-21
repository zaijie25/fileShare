
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/PersonalInfoModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxQZXJzb25hbEluZm9Nb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0QseURBQTBEO0FBRTFEO0lBQStDLHFDQUFTO0lBQXhEOztJQWlDQSxDQUFDO0lBaENHLHNCQUFXLG1DQUFJO2FBQWY7WUFDSSxPQUFPLG1CQUFtQixDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRU0sMENBQWMsR0FBckI7UUFDSSxJQUFJLEtBQUssR0FBTyxFQUFFLENBQUE7UUFDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVNLHNDQUFVLEdBQWpCLFVBQWtCLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRO1FBQy9DLElBQUksS0FBSyxHQUFHO1lBQ1IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLEtBQUssQ0FBQztZQUMxRixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLEdBQUc7U0FDYixDQUFBO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFTSx3Q0FBWSxHQUFuQixVQUFvQixLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUTtRQUNqRCxJQUFJLEtBQUssR0FBRztZQUNSLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBQyxLQUFLLENBQUM7WUFDMUYsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxHQUFHO1NBQ2IsQ0FBQTtRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU0sMkNBQWUsR0FBdEIsVUFBdUIsS0FBSyxFQUFFLFFBQVE7UUFDbEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFDTCx3QkFBQztBQUFELENBakNBLEFBaUNDLENBakM4QyxtQkFBUyxHQWlDdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWxCYXNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kZWwvTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyc29uYWxJbmZvTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gXCJQZXJzb25hbEluZm9Nb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXFHZXRVc2VySW5mbygpe1xyXG4gICAgICAgIGxldCBwYXJhbTphbnkgPSB7fVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0VXNlckluZm8sIHBhcmFtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVxRWRpdFB3ZChwaG9uZSwgY29kZSwgYWNvZGUsIHB3ZCwgY2FsbGJhY2spe1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwaG9uZVwiOiBHbG9iYWwuQUVTVXRpbC5hZXNFbmNyeXB0KEdsb2JhbC5Ub29sa2l0LmNyeXB0b0tleSxHbG9iYWwuVG9vbGtpdC5jcnlwdG9JdixwaG9uZSksXHJcbiAgICAgICAgICAgIFwiY29kZVwiOiBjb2RlLFxyXG4gICAgICAgICAgICBcImFjb2RlXCI6IGFjb2RlLFxyXG4gICAgICAgICAgICBcInB3ZFwiOiBwd2RcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5FZGl0UHdkLCBwYXJhbSwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXFCaW5kUGhvbmUocGhvbmUsIGNvZGUsIGFjb2RlLCBwd2QsIGNhbGxiYWNrKXtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwicGhvbmVcIjogR2xvYmFsLkFFU1V0aWwuYWVzRW5jcnlwdChHbG9iYWwuVG9vbGtpdC5jcnlwdG9LZXksR2xvYmFsLlRvb2xraXQuY3J5cHRvSXYscGhvbmUpLFxyXG4gICAgICAgICAgICBcImNvZGVcIjogY29kZSxcclxuICAgICAgICAgICAgXCJhY29kZVwiOiBhY29kZSxcclxuICAgICAgICAgICAgXCJwd2RcIjogcHdkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuQmluZFBob25lLCBwYXJhbSwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXFFZGl0VXNlckluZm8ocGFyYW0sIGNhbGxiYWNrKXtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkVkaXRVc2VySW5mbywgcGFyYW0sIGNhbGxiYWNrKTtcclxuICAgIH1cclxufSJdfQ==