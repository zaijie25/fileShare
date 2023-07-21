
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/ExtractModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4cfefUvJuFGsIdxRio71law', 'ExtractModel');
// hall/scripts/logic/hallcommon/model/ExtractModel.ts

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
var ExtractEvent_1 = require("../../hall/ui/money/ui/extractCash/ExtractEvent");
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var AppHelper_1 = require("../../core/tool/AppHelper");
var ExtractModel = /** @class */ (function (_super) {
    __extends(ExtractModel, _super);
    function ExtractModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**银行列表 */
        _this.bankArray = [
            "中国邮政储蓄银行",
            "中国工商银行",
            "兴业银行",
            "中国建设银行",
            "中国银行",
            "中国农业银行",
            "中国光大银行",
            "广发银行",
            "华夏银行",
            "交通银行",
            "招商银行",
            "中国民生银行",
            "平安银行",
            "北京银行",
            "浦发银行",
            "上海银行",
            "中信银行",
            "渤海银行",
            "东亚银行",
            "宁波银行",
        ];
        /**海外银行列表 */
        _this.overseasBankArray = [
            "艾芬銀行（Affin Bank）",
            "安联銀行（Alliance Bank）",
            "大马銀行（Am Bank）",
            "联昌銀行（CIMB Bank）",
            "豐隆銀行（Hong Leong Bank）",
            "马来西亚銀行（May Bank）",
            "大众銀行（Public Bank）",
            "興業銀行（RHB Bank）",
            "国民储蓄銀行（Bank Simpanan National）",
            "匯豐銀行 （HSBC Bank）",
            "華僑銀行 （OCBC bank）",
            "花旗銀行 （Citi bank）",
            "人民銀行（bank rakyat）",
            "大華银行 （United Overseas Bank）",
        ];
        /**银行缩写转换 */
        _this.bankCoke = {
            "中国邮政储蓄银行": "POST",
            "中国工商银行": "ICBC",
            "兴业银行": "CIB",
            "中国建设银行": "CCB",
            "中国银行": "BOC",
            "中国农业银行": "ABC",
            "中国光大银行": "CEB",
            "广发银行": "CGB",
            "华夏银行": "HXB",
            "交通银行": "BOCO",
            "招商银行": "CMBCHINA",
            "中国民生银行": "CMBC",
            "平安银行": "PAB",
            "北京银行": "BCCB",
            "浦发银行": "SPDB",
            "上海银行": "SHB",
            "中信银行": "ECITIC",
            "渤海银行": "CBHB",
            "东亚银行": "BEA",
            "宁波银行": "NB",
            "": "",
        };
        /** 阿里提现筹码列表 */
        _this.aliChipsArray = [
            100,
            200,
            300,
            400,
            500,
        ];
        /** 银联提现筹码列表 */
        _this.unionChipsArray = [
            500,
            1000,
            2000,
            3000,
            5000,
        ];
        _this.bankDatas = null; //账户信息
        _this.applyCashList = null;
        //提现记录数据
        _this.cashListPage = 1;
        _this.cashListData = [];
        _this.cashTotal = 0;
        _this.allPutList = null;
        _this.defautProvinceCode = 100000;
        return _this;
    }
    /**银行列表 */
    ExtractModel.prototype.getBankArray = function () {
        return this.bankArray;
    };
    ExtractModel.prototype.getOverseasBankArray = function () {
        return this.overseasBankArray;
    };
    // 传入银行名获取银行缩写
    ExtractModel.prototype.getBankCoke = function (text) {
        return this.bankCoke[text];
    };
    Object.defineProperty(ExtractModel.prototype, "Name", {
        get: function () {
            return "ExtractModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtractModel.prototype, "BankLocationInfo", {
        get: function () {
            return this.banklocationInfo;
        },
        set: function (info) {
            this.banklocationInfo = info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExtractModel.prototype, "DefautProvinceCode", {
        get: function () {
            return this.defautProvinceCode;
        },
        set: function (code) {
            this.defautProvinceCode = code;
        },
        enumerable: false,
        configurable: true
    });
    ExtractModel.prototype.GetDefautCityCode = function (provinceCode) {
        if (this.banklocationInfo.hasOwnProperty(provinceCode)) {
            for (var citycode in this.banklocationInfo[provinceCode].city) {
                if (this.banklocationInfo[provinceCode].city.hasOwnProperty(citycode)) {
                    return citycode;
                }
            }
        }
    };
    ExtractModel.prototype.onInit = function () {
        //Global.HallServer.on(NetAppface.BindPayInfo,this,this.onResBindPayInfo);
    };
    ExtractModel.prototype.IntoWnd = function () {
        this.reqGetBankInfo();
        AppHelper_1.default.isCash = true;
        Global.UI.show("WndRecharge");
    };
    /**
     * 请求绑定信息
     * @param bind_type 0全部 1银行卡 2支付宝
     */
    ExtractModel.prototype.reqGetBankInfo = function (bNew) {
        if (bNew === void 0) { bNew = false; }
        this.bankDatas = null;
        var _param = {
            "bind_type": 0,
        };
        if (bNew) {
            _param["random"] = Math.floor(Math.random() * 10000);
        }
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetBankInfo, _param, this.onResGetBankInfo.bind(this), null, false);
    };
    /**
     * 绑定信息回复
      "_param":{
            ali_account: "" //阿里号
            ali_day_max_put_point: 0 //支付宝一天最大
            ali_max_put_point: 0 //支付宝单笔最大
            ali_min_put_point: 0 //支付宝单笔最小
            ali_name: "" //"阿里用户名"
            ali_put_day_max_num: 0 //支付宝提现次数
            ali_put_server_charge: 0 //支付宝手续费

            ali_status: 0 //支付宝提现 0不可展示 1展示
            bank_status: 0 //银行卡提现 0不可展示 1展示 如果2个都是0那就要展示一个 空白页

            bank_day_max_put_point: 0 //银行卡一天最大
            bank_max_put_point: 0 //银行卡单笔最大
            bank_min_put_point: 0 //支付宝单笔最小
            bank_put_day_max_num: 0 //"银行卡提现次数"
            bank_put_server_charge: 0 //银行卡手续费
            
            entrus_bank_account: "6212264000031392323",
            entrus_bank_name: "中国工商银行",
            entrus_bank_user: "王小二",
            forzen_point: 6 //冻结金额  不可以提现的金额
            min_put_server_charge: 0 //最低手续费
        }
     * @param data 数据
     */
    ExtractModel.prototype.onResGetBankInfo = function (data) {
        this.bankDatas = data;
        this.event(ExtractEvent_1.ExtractEvent.OnUpdateBankBindInfo);
    };
    /** 阿里提现筹码列表 */
    ExtractModel.prototype.getAliChipsArray = function () {
        return this.aliChipsArray;
    };
    /** 银联提现筹码列表 */
    ExtractModel.prototype.getUnionChipsArray = function () {
        return this.unionChipsArray;
    };
    ExtractModel.prototype.getAliOneDayMax = function () {
        return this.bankDatas.ali_day_max_put_point;
    };
    ExtractModel.prototype.getUnionOneDayMax = function () {
        return this.bankDatas.bank_day_max_put_point;
    };
    /** 阿里最小提现限制 */
    ExtractModel.prototype.getAliMinLimit = function () {
        return this.bankDatas.ali_min_put_point;
    };
    ;
    /** 阿里最大提现限制 */
    ExtractModel.prototype.getAliMaxLimit = function () {
        return this.bankDatas.ali_max_put_point;
    };
    /** 银联最小提现限制 */
    ExtractModel.prototype.getUnionMinLimit = function () {
        return this.bankDatas.bank_min_put_point;
    };
    ;
    /** 银联最大提现限制 */
    ExtractModel.prototype.getUnionMaxLimit = function () {
        return this.bankDatas.bank_max_put_point;
    };
    /**
     * 支付宝提现手续费配置[支付宝手续费，最低手续费]
     */
    ExtractModel.prototype.getAliPutServerRecharge = function () {
        var aliPut = this.bankDatas.ali_put_server_charge;
        var minPut = this.bankDatas.min_put_server_charge;
        return [aliPut, minPut];
    };
    ExtractModel.prototype.getRateInfo = function () {
        var ratio = this.bankDatas.put_code_per_cen;
        ratio = ratio / 100;
        var infoStr = "\u5F53\u524D\u6253\u7801\u6D41\u6C34:" + ratio + "\u500D" || "";
        return infoStr;
    };
    /**
     *
     * @param type 类型1银行卡 2 支付宝 3 海外支付
     */
    ExtractModel.prototype.getPutInfo = function (type) {
        var charge = type == 1 ? this.bankDatas.bank_put_server_charge_set : this.bankDatas.ali_put_server_charge_set;
        var strInfo = "";
        if (charge && charge.length == 1) {
            if (charge[0]) {
                var fee = charge[0].fee;
                if (fee > 0) {
                    var str = fee + '%';
                    strInfo = "\n4.\u5355\u6B21\u63D0\u73B0\u6536\u53D6\u63D0\u73B0\u989D\u5EA6" + str + "\u7684\u624B\u7EED\u8D39";
                }
            }
        }
        else if (charge && charge.length > 1) {
            strInfo += '\n4.';
            for (var index = 0; index < charge.length; index++) {
                var level = charge[index];
                var fee = level.fee;
                var min = level.min_point / 100;
                var max = level.max_point / 100;
                if (fee > 0) {
                    strInfo += "\u5145\u503C\u6D41\u6C34" + min + "\u500D~" + max + "\u500D\u6536\u53D6" + fee + "%\u7684\u624B\u7EED\u8D39\uFF0C";
                }
                else {
                    strInfo += "\u5145\u503C\u6D41\u6C34" + min + "\u500D\u4EE5\u4E0A\u65E0\u9700\u624B\u7EED\u8D39";
                }
            }
        }
        if (!strInfo) {
            var charge_1 = type == 1 ? this.bankDatas.min_put_server_charge : this.bankDatas.ali_put_server_charge;
            if (charge_1 > 0) {
                var str = charge_1 + '%';
                strInfo = "\n4.\u5355\u6B21\u63D0\u73B0\u6536\u53D6\u63D0\u73B0\u989D\u5EA6" + str + "\u7684\u624B\u7EED\u8D39";
            }
        }
        return strInfo;
    };
    /**
     * 银行卡提现手续费配置[银行手续费，最低手续费]
     */
    ExtractModel.prototype.getBankPutServerRecharge = function () {
        var bankPut = this.bankDatas.bank_put_server_charge;
        var minPut = this.bankDatas.min_put_server_charge;
        return [bankPut, minPut];
    };
    /**
     * 有无阿里账户数据
     */
    ExtractModel.prototype.haveAli = function () {
        return this.bankDatas.ali_account != null && this.bankDatas.ali_account != "";
    };
    /**
     * 有无银联账户数据
     */
    ExtractModel.prototype.haveUnion = function () {
        return this.bankDatas.entrus_bank_account != null && this.bankDatas.entrus_bank_account != "";
    };
    /**
     * 有无海外账户数据
     */
    ExtractModel.prototype.haveOverseas = function () {
        return this.bankDatas.over_sea_entrus_bank_account != null && this.bankDatas.over_sea_entrus_bank_account != "";
    };
    /**
     * 绑定阿里账号信息
     * @param aliName 支付宝姓名
     * @param aliAccount 支付宝账号
     */
    ExtractModel.prototype.reqBindAliInfo = function (aliName, aliAccount) {
        var _param = {
            "bind_type": 2,
            "aliAccount": aliAccount,
            "aliName": aliName,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.BindBankInfo, _param, this.onResBindAliInfo.bind(this));
    };
    /**
     * 支付宝绑定返回
     */
    ExtractModel.prototype.onResBindAliInfo = function (data) {
        Global.UI.fastTip("绑定成功");
        this.reqGetBankInfo(true);
        this.event(ExtractEvent_1.ExtractEvent.BankBindInfoOver);
    };
    /**
     *
     "_param":{
        "entrusBankAccount":"62122640000312312",
        "entrusBankUser":"王小二",
        "entrusBankName":"中国工商银行",
        "bankName":"莲塘支行",
        "bankProvcince":"广东省",
        "bankCity":"深圳市",
        "certificateCode":"430426199111072323",//
        "bankCode":"ICBC"
        上面银行卡需要
        "bind_type":1银行卡2支付宝
        下面支付宝
        "aliAccount":"阿里号"
        "aliName":"阿里用户名"
    }
     */
    /**
     * 绑定银联账号信息
     * @param entrusBankAccount 卡号
     * @param entrusBankUser 名字
     * @param entrusBankName 开户行名称
     * @param bankName 支行名称
     * @param bankProvcince 省份
     * @param bankCity 城市
     * @param bankCode 银行代码
     */
    ExtractModel.prototype.reqBindUnionInfo = function (entrusBankUser, entrusBankAccount, entrusBankName, bankName, bankProvcince, bankCity, bankCode) {
        var _param = {
            "bind_type": 1,
            "entrusBankUser": entrusBankUser,
            "entrusBankAccount": entrusBankAccount,
            "entrusBankName": entrusBankName,
            "bankName": bankName,
            "bankProvcince": bankProvcince,
            "bankCity": bankCity,
            "bankCode": bankCode
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.BindBankInfo, _param, this.onResBindUnionInfo.bind(this));
    };
    /**
     * 银联卡绑定返回
     */
    ExtractModel.prototype.onResBindUnionInfo = function (data) {
        Global.UI.fastTip("绑定成功");
        this.reqGetBankInfo(true);
        this.event(ExtractEvent_1.ExtractEvent.BankBindInfoOver);
    };
    /**
     * 请求提现到阿里
     * @param point 提现金额
     */
    ExtractModel.prototype.reqAliApplyCash = function (point) {
        var _this = this;
        if (Global.PlayerData.phone == "") {
            Global.UI.showYesNoBox("该功能需要账号绑定手机后才能使用，是否立刻绑定手机？", function () {
                Global.UI.show("WndBindPhone");
            });
            return;
        }
        var flag = this.checkEnough(2);
        if (!flag) {
            return;
        }
        var str = this.checkStr(2);
        if (str) {
            Global.UI.showYesNoBox(str, function () {
                _this.reqApplyCash(2, point);
            });
            return;
        }
        this.reqApplyCash(2, point);
    };
    ExtractModel.prototype.reqApplyCash = function (type, point) {
        var _this = this;
        var _param = {
            "type": type,
            "point": point,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ApplyCash, _param, function (msg) { _this.onResApplyCash(msg, type); });
    };
    /**
     * 请求提现到银联
     * @param point 提现金额
     */
    ExtractModel.prototype.reqUnionApplyCash = function (point) {
        var _this = this;
        if (Global.PlayerData.phone == "") {
            Global.UI.showYesNoBox("该功能需要账号绑定手机后才能使用，是否立刻绑定手机？", function () {
                Global.UI.show("WndBindPhone");
            });
            return;
        }
        var flag = this.checkEnough(1);
        if (!flag) {
            return;
        }
        var str = this.checkStr(1);
        if (str) {
            Global.UI.showYesNoBox(str, function () {
                _this.reqApplyCash(1, point);
            });
            return;
        }
        this.reqApplyCash(1, point);
    };
    /**
     *
     * @param type 类型1银行卡 2 支付宝 3 海外支付
     * @returns
     */
    ExtractModel.prototype.checkStr = function (type) {
        var ratio = this.bankDatas.put_code_per_cen;
        var charge = type == 1 ? this.bankDatas.bank_put_server_charge_set : this.bankDatas.ali_put_server_charge_set;
        ratio = (ratio / 100).toFixed(2);
        var str = '';
        // if (charge && charge.length > 0) {
        //     let level = this.getExtralLevel(ratio, charge)
        //     let freeLevel = this.getFreeExtralLevel(charge)
        //     let fee = level.fee
        //     if (fee > 0) {
        //         if (freeLevel) {
        //             let min = freeLevel.min_point / 100
        //             let need = (min - ratio).toFixed(2)
        //             str = `您当前打码倍数为${ratio}倍，将收取${fee}%的手续费，继续打码${need}倍可免除手续费哦，是否现在提现？`
        //         }
        //         else {
        //             str = `您当前打码倍数为${ratio}倍，将收取${fee}%的手续费，是否现在提现？`
        //         }
        //     }
        //     else {
        //         str = `您当前打码倍数为${ratio}倍，已免扣手续费，是否现在提现？`
        //         // 您当前打码倍数为X，已免扣手续费，是否现在提现？
        //     }
        // }
        if (charge && charge.length > 1) {
            for (var index = 0; index < charge.length; index++) {
                var level = charge[index];
                var fee = level.fee;
                var min = (level.min_point / 100).toFixed(2);
                var max = (level.max_point / 100).toFixed(2);
                if (fee > 0) {
                    str += min + "\u500D\u6253\u7801\u91CF\uFF1A" + fee + "%\u624B\u7EED\u8D39\n";
                }
                else {
                    str += min + "\u500D\u6253\u7801\u91CF\uFF1A\u514D\u624B\u7EED\u8D39\n";
                }
            }
            var curStr = "\u5F53\u524D\u6253\u7801\u500D\u6570<color = red>" + ratio + "</c>\u500D\uFF0C\u662F\u5426\u73B0\u5728\u63D0\u73B0\uFF1F";
            str += curStr;
        }
        return str;
    };
    ExtractModel.prototype.checkEnough = function (type) {
        var ratio = this.bankDatas.put_code_per_cen;
        ratio = ratio / 100;
        if (ratio < 1) {
            Global.UI.fastTip("当前打码流水不足1倍，无法发起提现");
            return false;
        }
        return true;
    };
    /**
     *
     * @param ratio 当前打码倍数
     * @param charge 提现手续费配置
     */
    ExtractModel.prototype.getExtralLevel = function (ratio, charge) {
        for (var index = charge.length - 1; index >= 0; index--) {
            var level = charge[index];
            var min = level.min_point / 100;
            if (ratio >= min) {
                return level;
            }
        }
    };
    /**
     *
     * @param charge 提现手续费配置
     */
    ExtractModel.prototype.getFreeExtralLevel = function (charge) {
        for (var index = charge.length - 1; index >= 0; index--) {
            var level = charge[index];
            var fee = level.fee;
            if (fee <= 0) {
                return level;
            }
        }
        return null;
    };
    /**
     * 提现消息返回
     */
    ExtractModel.prototype.onResApplyCash = function (data, type) {
        var str = "申请出款后3分钟内到账，提现前请确认绑定账户信息准确无误，感谢您对平台的支持与理解!";
        Global.UI.showSingleBox(str);
        // Global.UI.fastTip("提现申请提交成功"); 
        //请求最新金币
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserPoint, {});
    };
    /**
     * 请求提现记录数据
     */
    ExtractModel.prototype.reqApplyCashList = function (next) {
        var _this = this;
        if (next === void 0) { next = false; }
        if (next) {
            if (this.cashListData.length >= this.cashTotal) {
                Global.UI.fastTip("无更多信息");
                return;
            }
            this.cashListPage++;
        }
        else {
            this.cashListPage = 1;
        }
        var listCount = this.cashTotal - (this.cashListPage - 1) * 6 > 6 ? 6 : this.cashTotal - (this.cashListPage - 1) * 6;
        var param = {
            "page": this.cashListPage,
            "pagesize": listCount == 0 ? 6 : listCount,
            "type": 0,
        };
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "ApplyCashList", 3);
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ApplyCashList, param, function (res) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "ApplyCashList");
            if (res.list.length < 6) {
                _this.cashTotal = (_this.cashListPage - 1) * 6 + res.list.length;
                if (res.list.length == 0) {
                    _this.cashListPage--;
                    _this.cashTotal = _this.cashListData.length;
                }
            }
            else {
                _this.cashTotal = res.total;
            }
            var list = res.list || [];
            if (!list) {
                return;
            }
            if (_this.cashListPage == 1) {
                _this.cashListData = list;
            }
            else {
                if (_this.cashListData.length > _this.cashTotal)
                    return;
                _this.cashListData = _this.cashListData.concat(list);
            }
            _this.event(ExtractEvent_1.ExtractEvent.OnUpdateApplyCashList);
        });
    };
    ExtractModel.prototype.getCashListData = function () {
        return this.cashListData;
    };
    /**
     * 请求提现记录数据返回
     * "_param":{
        "total":1,
        "list":[
            {
                "create_date":"0000-00-00 00:00:00",
                "account":"6212264000031391242",
                "point":20000,
                "status": 1 // -1 拒绝 0默认 待审核 1已审核 2确认中 3 兑换成功
            }
        ]
    }
     */
    /**  请求所有玩家提现记录数据 */
    ExtractModel.prototype.reqGetAllPutList = function () {
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetAllPayPutList, null, this.onResGetAllPutList.bind(this), null, false); // 轮播 数据界面缓存 关闭清空
    };
    /**
     * 请求所有玩家提现记录数据返回
     * "_param":{
        "total":1,
        "list":[
            {
                "create_date":"0000-00-00 00:00:00",
                "account":"6212264000031391242",
                "point":20000,
                "status": 1 // -1 拒绝 0默认 待审核 1已审核 2确认中 3 兑换成功
            }
        ]
    }
     */
    ExtractModel.prototype.onResGetAllPutList = function (data) {
        this.allPutList = data;
        this.event(ExtractEvent_1.ExtractEvent.OnUpdateAllPutList, this.allPutList);
    };
    /**
     * 绑定海外账号信息
     * @param entrusBankAccount 卡号
     * @param entrusBankUser 名字
     * @param entrusBankName 开户行名称
     */
    ExtractModel.prototype.reqBindOverseasInfo = function (entrusBankUser, entrusBankAccount, entrusBankName) {
        var _param = {
            "bind_type": 3,
            "entrusBankUser": entrusBankUser,
            "entrusBankAccount": entrusBankAccount,
            "entrusBankName": entrusBankName,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.BindBankInfo, _param, this.onResBindOverseasInfo.bind(this));
    };
    /**
     * 海外提现绑定返回
     */
    ExtractModel.prototype.onResBindOverseasInfo = function (data) {
        Global.UI.fastTip("绑定成功");
        this.reqGetBankInfo(true);
        this.event(ExtractEvent_1.ExtractEvent.BankBindInfoOver);
    };
    /** 海外最小提现限制 */
    ExtractModel.prototype.getOverseasMinLimit = function () {
        return this.bankDatas.over_sea_bank_max_put_point;
    };
    ;
    /** 海外最大提现限制 */
    ExtractModel.prototype.getOverseasMaxLimit = function () {
        return this.bankDatas.over_sea_bank_min_put_point;
    };
    /**
     * 海外每天提现最大限额
     */
    ExtractModel.prototype.getOverseasOneDayMax = function () {
        return this.bankDatas.over_sea_bank_day_max_put_point;
    };
    /**
     * 海外提现手续费配置[银行手续费，最低手续费]
     */
    ExtractModel.prototype.getOverseasPutServerRecharge = function () {
        var bankPut = this.bankDatas.over_sea_bank_put_server_charge;
        var minPut = this.bankDatas.min_put_server_charge;
        return [bankPut, minPut];
    };
    /**
     * 请求提现 海外提现
     * @param point 提现金额
     */
    ExtractModel.prototype.reqOverseasApplyCash = function (point) {
        var _this = this;
        if (Global.PlayerData.phone == "") {
            Global.UI.showYesNoBox("该功能需要账号绑定手机后才能使用，是否立刻绑定手机？", function () {
                Global.UI.show("WndBindPhone");
            });
            return;
        }
        var _param = {
            "type": 3,
            "point": point,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ApplyCash, _param, function (msg) { _this.onResApplyCash(msg, 3); });
    };
    return ExtractModel;
}(ModelBase_1.default));
exports.default = ExtractModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxFeHRyYWN0TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0ZBQStFO0FBQy9FLGdFQUEyRDtBQUMzRCx5REFBMEQ7QUFDMUQsdURBQWtEO0FBR2xEO0lBQTBDLGdDQUFTO0lBQW5EO1FBQUEscUVBZ3ZCQztRQTl1QkcsVUFBVTtRQUNGLGVBQVMsR0FBZTtZQUM1QixVQUFVO1lBQ1YsUUFBUTtZQUNSLE1BQU07WUFDTixRQUFRO1lBQ1IsTUFBTTtZQUNOLFFBQVE7WUFDUixRQUFRO1lBQ1IsTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sTUFBTTtZQUNOLFFBQVE7WUFDUixNQUFNO1lBQ04sTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sTUFBTTtTQUNULENBQUM7UUFPRixZQUFZO1FBQ0osdUJBQWlCLEdBQWE7WUFDbEMsa0JBQWtCO1lBQ2xCLHFCQUFxQjtZQUNyQixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLHVCQUF1QjtZQUN2QixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLGdCQUFnQjtZQUNoQixnQ0FBZ0M7WUFDaEMsa0JBQWtCO1lBQ2xCLGtCQUFrQjtZQUNsQixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLDZCQUE2QjtTQUNoQyxDQUFDO1FBTUwsWUFBWTtRQUNKLGNBQVEsR0FBRztZQUNoQixVQUFVLEVBQUUsTUFBTTtZQUNsQixRQUFRLEVBQUUsTUFBTTtZQUNoQixNQUFNLEVBQUUsS0FBSztZQUNiLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsS0FBSztZQUNi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QyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWO1FBQ0QsSUFBSSxNQUFNLEdBQUc7WUFDVCxNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBQyxHQUFHLElBQUksS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUMvRyxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQWh2QkEsQUFndkJDLENBaHZCeUMsbUJBQVMsR0FndkJsRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4dHJhY3RFdmVudCB9IGZyb20gXCIuLi8uLi9oYWxsL3VpL21vbmV5L3VpL2V4dHJhY3RDYXNoL0V4dHJhY3RFdmVudFwiO1xyXG5pbXBvcnQgTW9kZWxCYXNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kZWwvTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5pbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi8uLi9jb3JlL3Rvb2wvQXBwSGVscGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdE1vZGVsIGV4dGVuZHMgTW9kZWxCYXNlXHJcbntcclxuICAgIC8qKumTtuihjOWIl+ihqCAqL1xyXG4gICAgcHJpdmF0ZSBiYW5rQXJyYXk6IEFycmF5PGFueT4gPSBbXHJcbiAgICAgICAgXCLkuK3lm73pgq7mlL/lgqjok4Tpk7booYxcIixcclxuICAgICAgICBcIuS4reWbveW3peWVhumTtuihjFwiLFxyXG4gICAgICAgIFwi5YW05Lia6ZO26KGMXCIsXHJcbiAgICAgICAgXCLkuK3lm73lu7rorr7pk7booYxcIixcclxuICAgICAgICBcIuS4reWbvemTtuihjFwiLFxyXG4gICAgICAgIFwi5Lit5Zu95Yac5Lia6ZO26KGMXCIsXHJcbiAgICAgICAgXCLkuK3lm73lhYnlpKfpk7booYxcIixcclxuICAgICAgICBcIuW5v+WPkemTtuihjFwiLFxyXG4gICAgICAgIFwi5Y2O5aSP6ZO26KGMXCIsXHJcbiAgICAgICAgXCLkuqTpgJrpk7booYxcIixcclxuICAgICAgICBcIuaLm+WVhumTtuihjFwiLFxyXG4gICAgICAgIFwi5Lit5Zu95rCR55Sf6ZO26KGMXCIsXHJcbiAgICAgICAgXCLlubPlronpk7booYxcIixcclxuICAgICAgICBcIuWMl+S6rOmTtuihjFwiLFxyXG4gICAgICAgIFwi5rWm5Y+R6ZO26KGMXCIsXHJcbiAgICAgICAgXCLkuIrmtbfpk7booYxcIixcclxuICAgICAgICBcIuS4reS/oemTtuihjFwiLFxyXG4gICAgICAgIFwi5rik5rW36ZO26KGMXCIsXHJcbiAgICAgICAgXCLkuJzkuprpk7booYxcIixcclxuICAgICAgICBcIuWugeazoumTtuihjFwiLFxyXG4gICAgXTtcclxuICAgIGJhbmtsb2NhdGlvbkluZm86IGFueTtcclxuICAgIC8qKumTtuihjOWIl+ihqCAqL1xyXG4gICAgcHVibGljIGdldEJhbmtBcnJheSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhbmtBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmtbflpJbpk7booYzliJfooaggKi9cclxuICAgIHByaXZhdGUgb3ZlcnNlYXNCYW5rQXJyYXk6QXJyYXk8YW55PiA9W1xyXG4gICAgICAgIFwi6Im+6Iqs6YqA6KGM77yIQWZmaW4gQmFua++8iVwiLFxyXG4gICAgICAgIFwi5a6J6IGU6YqA6KGM77yIQWxsaWFuY2UgQmFua++8iVwiLFxyXG4gICAgICAgIFwi5aSn6ams6YqA6KGM77yIQW0gQmFua++8iVwiLFxyXG4gICAgICAgIFwi6IGU5piM6YqA6KGM77yIQ0lNQiBCYW5r77yJXCIsXHJcbiAgICAgICAgXCLosZDpmobpioDooYzvvIhIb25nIExlb25nIEJhbmvvvIlcIixcclxuICAgICAgICBcIumprOadpeilv+S6mumKgOihjO+8iE1heSBCYW5r77yJXCIsXHJcbiAgICAgICAgXCLlpKfkvJfpioDooYzvvIhQdWJsaWMgQmFua++8iVwiLFxyXG4gICAgICAgIFwi6IiI5qWt6YqA6KGM77yIUkhCIEJhbmvvvIlcIixcclxuICAgICAgICBcIuWbveawkeWCqOiThOmKgOihjO+8iEJhbmsgU2ltcGFuYW4gTmF0aW9uYWzvvIlcIixcclxuICAgICAgICBcIuWMr+ixkOmKgOihjCDvvIhIU0JDIEJhbmvvvIlcIixcclxuICAgICAgICBcIuiPr+WDkemKgOihjCDvvIhPQ0JDIGJhbmvvvIlcIixcclxuICAgICAgICBcIuiKseaXl+mKgOihjCDvvIhDaXRpIGJhbmvvvIlcIixcclxuICAgICAgICBcIuS6uuawkemKgOihjO+8iGJhbmsgcmFreWF077yJXCIsXHJcbiAgICAgICAgXCLlpKfoj6/pk7booYwg77yIVW5pdGVkIE92ZXJzZWFzIEJhbmvvvIlcIixcclxuICAgIF07XHJcblxyXG4gICAgcHVibGljIGdldE92ZXJzZWFzQmFua0FycmF5KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcnNlYXNCYW5rQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gLyoq6ZO26KGM57yp5YaZ6L2s5o2iICovXHJcbiBwcml2YXRlIGJhbmtDb2tlID0ge1xyXG4gICAgXCLkuK3lm73pgq7mlL/lgqjok4Tpk7booYxcIjogXCJQT1NUXCIsXHJcbiAgICBcIuS4reWbveW3peWVhumTtuihjFwiOiBcIklDQkNcIixcclxuICAgIFwi5YW05Lia6ZO26KGMXCI6IFwiQ0lCXCIsXHJcbiAgICBcIuS4reWbveW7uuiuvumTtuihjFwiOiBcIkNDQlwiLFxyXG4gICAgXCLkuK3lm73pk7booYxcIjogXCJCT0NcIixcclxuICAgIFwi5Lit5Zu95Yac5Lia6ZO26KGMXCI6IFwiQUJDXCIsXHJcbiAgICBcIuS4reWbveWFieWkp+mTtuihjFwiOiBcIkNFQlwiLFxyXG4gICAgXCLlub/lj5Hpk7booYxcIjogXCJDR0JcIixcclxuICAgIFwi5Y2O5aSP6ZO26KGMXCI6IFwiSFhCXCIsXHJcbiAgICBcIuS6pOmAmumTtuihjFwiOiBcIkJPQ09cIixcclxuICAgIFwi5oub5ZWG6ZO26KGMXCI6IFwiQ01CQ0hJTkFcIixcclxuICAgIFwi5Lit5Zu95rCR55Sf6ZO26KGMXCI6IFwiQ01CQ1wiLFxyXG4gICAgXCLlubPlronpk7booYxcIjogXCJQQUJcIixcclxuICAgIFwi5YyX5Lqs6ZO26KGMXCI6IFwiQkNDQlwiLFxyXG4gICAgXCLmtablj5Hpk7booYxcIjogXCJTUERCXCIsXHJcbiAgICBcIuS4iua1t+mTtuihjFwiOiBcIlNIQlwiLFxyXG4gICAgXCLkuK3kv6Hpk7booYxcIjogXCJFQ0lUSUNcIixcclxuICAgIFwi5rik5rW36ZO26KGMXCI6IFwiQ0JIQlwiLFxyXG4gICAgXCLkuJzkuprpk7booYxcIjogXCJCRUFcIixcclxuICAgIFwi5a6B5rOi6ZO26KGMXCI6IFwiTkJcIixcclxuICAgIFwiXCI6IFwiXCIsXHJcbn1cclxuLy8g5Lyg5YWl6ZO26KGM5ZCN6I635Y+W6ZO26KGM57yp5YaZXHJcbnB1YmxpYyBnZXRCYW5rQ29rZSh0ZXh0KXtcclxuICAgIHJldHVybiB0aGlzLmJhbmtDb2tlW3RleHRdO1xyXG59XHJcbiAgICBcclxuXHJcbiAgICAvKiog6Zi/6YeM5o+Q546w562556CB5YiX6KGoICovXHJcbiAgICBwcml2YXRlIGFsaUNoaXBzQXJyYXk6IEFycmF5PE51bWJlcj4gPSBbXHJcbiAgICAgICAgMTAwLFxyXG4gICAgICAgIDIwMCxcclxuICAgICAgICAzMDAsXHJcbiAgICAgICAgNDAwLFxyXG4gICAgICAgIDUwMCxcclxuICAgIF07XHJcblxyXG4gICAgLyoqIOmTtuiBlOaPkOeOsOetueeggeWIl+ihqCAqL1xyXG4gICAgcHJpdmF0ZSB1bmlvbkNoaXBzQXJyYXk6IEFycmF5PE51bWJlcj4gPSBbXHJcbiAgICAgICAgNTAwLFxyXG4gICAgICAgIDEwMDAsXHJcbiAgICAgICAgMjAwMCxcclxuICAgICAgICAzMDAwLFxyXG4gICAgICAgIDUwMDAsXHJcbiAgICBdOyBcclxuXHJcbiAgICBwdWJsaWMgYmFua0RhdGFzIDogYW55ID0gbnVsbDsgICAgICAgICAgLy/otKbmiLfkv6Hmga9cclxuICAgIHB1YmxpYyBhcHBseUNhc2hMaXN0IDogYW55ID0gbnVsbDsgXHJcbiAgICAvL+aPkOeOsOiusOW9leaVsOaNrlxyXG4gICAgcHVibGljIGNhc2hMaXN0UGFnZTogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgY2FzaExpc3REYXRhOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBwdWJsaWMgY2FzaFRvdGFsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBhbGxQdXRMaXN0IDogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgZGVmYXV0UHJvdmluY2VDb2RlID0gMTAwMDAwXHJcbiAgIFxyXG5cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiRXh0cmFjdE1vZGVsXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBCYW5rTG9jYXRpb25JbmZvKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFua2xvY2F0aW9uSW5mbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IEJhbmtMb2NhdGlvbkluZm8oaW5mbyl7XHJcbiAgICAgICAgdGhpcy5iYW5rbG9jYXRpb25JbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IERlZmF1dFByb3ZpbmNlQ29kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXV0UHJvdmluY2VDb2RlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBEZWZhdXRQcm92aW5jZUNvZGUoIGNvZGUpXHJcbiAgICB7XHJcbiAgICAgICAgIHRoaXMuZGVmYXV0UHJvdmluY2VDb2RlID0gY29kZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXREZWZhdXRDaXR5Q29kZShwcm92aW5jZUNvZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5iYW5rbG9jYXRpb25JbmZvLmhhc093blByb3BlcnR5KHByb3ZpbmNlQ29kZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNpdHljb2RlIGluIHRoaXMuYmFua2xvY2F0aW9uSW5mb1twcm92aW5jZUNvZGVdLmNpdHkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhbmtsb2NhdGlvbkluZm9bcHJvdmluY2VDb2RlXS5jaXR5Lmhhc093blByb3BlcnR5KGNpdHljb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaXR5Y29kZSAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICAvL0dsb2JhbC5IYWxsU2VydmVyLm9uKE5ldEFwcGZhY2UuQmluZFBheUluZm8sdGhpcyx0aGlzLm9uUmVzQmluZFBheUluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJbnRvV25kKCl7XHJcbiAgICAgICAgdGhpcy5yZXFHZXRCYW5rSW5mbygpO1xyXG4gICAgICAgIEFwcEhlbHBlci5pc0Nhc2ggPSB0cnVlO1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7fmsYLnu5Hlrprkv6Hmga9cclxuICAgICAqIEBwYXJhbSBiaW5kX3R5cGUgMOWFqOmDqCAx6ZO26KGM5Y2hIDLmlK/ku5jlrp1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcUdldEJhbmtJbmZvKGJOZXc6Ym9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLmJhbmtEYXRhcyA9IG51bGw7XHJcbiAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJiaW5kX3R5cGVcIjogMCwgXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZihiTmV3KXtcclxuICAgICAgICAgICAgX3BhcmFtW1wicmFuZG9tXCJdID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLE5ldEFwcGZhY2UuR2V0QmFua0luZm8sX3BhcmFtLHRoaXMub25SZXNHZXRCYW5rSW5mby5iaW5kKHRoaXMpLCBudWxsLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5Hlrprkv6Hmga/lm57lpI1cclxuICAgICAgXCJfcGFyYW1cIjp7XHJcbiAgICAgICAgICAgIGFsaV9hY2NvdW50OiBcIlwiIC8v6Zi/6YeM5Y+3XHJcbiAgICAgICAgICAgIGFsaV9kYXlfbWF4X3B1dF9wb2ludDogMCAvL+aUr+S7mOWuneS4gOWkqeacgOWkp1xyXG4gICAgICAgICAgICBhbGlfbWF4X3B1dF9wb2ludDogMCAvL+aUr+S7mOWuneWNleeslOacgOWkp1xyXG4gICAgICAgICAgICBhbGlfbWluX3B1dF9wb2ludDogMCAvL+aUr+S7mOWuneWNleeslOacgOWwj1xyXG4gICAgICAgICAgICBhbGlfbmFtZTogXCJcIiAvL1wi6Zi/6YeM55So5oi35ZCNXCJcclxuICAgICAgICAgICAgYWxpX3B1dF9kYXlfbWF4X251bTogMCAvL+aUr+S7mOWuneaPkOeOsOasoeaVsFxyXG4gICAgICAgICAgICBhbGlfcHV0X3NlcnZlcl9jaGFyZ2U6IDAgLy/mlK/ku5jlrp3miYvnu63otLlcclxuXHJcbiAgICAgICAgICAgIGFsaV9zdGF0dXM6IDAgLy/mlK/ku5jlrp3mj5DnjrAgMOS4jeWPr+WxleekuiAx5bGV56S6XHJcbiAgICAgICAgICAgIGJhbmtfc3RhdHVzOiAwIC8v6ZO26KGM5Y2h5o+Q546wIDDkuI3lj6/lsZXnpLogMeWxleekuiDlpoLmnpwy5Liq6YO95pivMOmCo+WwseimgeWxleekuuS4gOS4qiDnqbrnmb3pobVcclxuXHJcbiAgICAgICAgICAgIGJhbmtfZGF5X21heF9wdXRfcG9pbnQ6IDAgLy/pk7booYzljaHkuIDlpKnmnIDlpKdcclxuICAgICAgICAgICAgYmFua19tYXhfcHV0X3BvaW50OiAwIC8v6ZO26KGM5Y2h5Y2V56yU5pyA5aSnXHJcbiAgICAgICAgICAgIGJhbmtfbWluX3B1dF9wb2ludDogMCAvL+aUr+S7mOWuneWNleeslOacgOWwj1xyXG4gICAgICAgICAgICBiYW5rX3B1dF9kYXlfbWF4X251bTogMCAvL1wi6ZO26KGM5Y2h5o+Q546w5qyh5pWwXCJcclxuICAgICAgICAgICAgYmFua19wdXRfc2VydmVyX2NoYXJnZTogMCAvL+mTtuihjOWNoeaJi+e7rei0uVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZW50cnVzX2JhbmtfYWNjb3VudDogXCI2MjEyMjY0MDAwMDMxMzkyMzIzXCIsXHJcbiAgICAgICAgICAgIGVudHJ1c19iYW5rX25hbWU6IFwi5Lit5Zu95bel5ZWG6ZO26KGMXCIsXHJcbiAgICAgICAgICAgIGVudHJ1c19iYW5rX3VzZXI6IFwi546L5bCP5LqMXCIsXHJcbiAgICAgICAgICAgIGZvcnplbl9wb2ludDogNiAvL+WGu+e7k+mHkeminSAg5LiN5Y+v5Lul5o+Q546w55qE6YeR6aKdXHJcbiAgICAgICAgICAgIG1pbl9wdXRfc2VydmVyX2NoYXJnZTogMCAvL+acgOS9juaJi+e7rei0uVxyXG4gICAgICAgIH1cclxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUmVzR2V0QmFua0luZm8oZGF0YSA6IGFueSl7XHJcbiAgICAgICAgdGhpcy5iYW5rRGF0YXMgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuZXZlbnQoRXh0cmFjdEV2ZW50Lk9uVXBkYXRlQmFua0JpbmRJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Zi/6YeM5o+Q546w562556CB5YiX6KGoICovXHJcbiAgICBwdWJsaWMgZ2V0QWxpQ2hpcHNBcnJheSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsaUNoaXBzQXJyYXk7XHJcbiAgICB9XHJcbiAgICAvKiog6ZO26IGU5o+Q546w562556CB5YiX6KGoICovXHJcbiAgICBwdWJsaWMgZ2V0VW5pb25DaGlwc0FycmF5KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pb25DaGlwc0FycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGlPbmVEYXlNYXgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYW5rRGF0YXMuYWxpX2RheV9tYXhfcHV0X3BvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVbmlvbk9uZURheU1heCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhbmtEYXRhcy5iYW5rX2RheV9tYXhfcHV0X3BvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpmL/ph4zmnIDlsI/mj5DnjrDpmZDliLYgKi9cclxuICAgIHB1YmxpYyBnZXRBbGlNaW5MaW1pdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhbmtEYXRhcy5hbGlfbWluX3B1dF9wb2ludDtcclxuICAgIH07ICAgXHJcbiAgICAvKiog6Zi/6YeM5pyA5aSn5o+Q546w6ZmQ5Yi2ICovXHJcbiAgICBwdWJsaWMgZ2V0QWxpTWF4TGltaXQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYW5rRGF0YXMuYWxpX21heF9wdXRfcG9pbnQ7XHJcbiAgICB9ICAgXHJcbiAgICAvKiog6ZO26IGU5pyA5bCP5o+Q546w6ZmQ5Yi2ICovXHJcbiAgICBwdWJsaWMgZ2V0VW5pb25NaW5MaW1pdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhbmtEYXRhcy5iYW5rX21pbl9wdXRfcG9pbnQ7XHJcbiAgICB9OyAgIFxyXG4gICAgLyoqIOmTtuiBlOacgOWkp+aPkOeOsOmZkOWItiAqL1xyXG4gICAgcHVibGljIGdldFVuaW9uTWF4TGltaXQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYW5rRGF0YXMuYmFua19tYXhfcHV0X3BvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pSv5LuY5a6d5o+Q546w5omL57ut6LS56YWN572uW+aUr+S7mOWuneaJi+e7rei0ue+8jOacgOS9juaJi+e7rei0uV1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFsaVB1dFNlcnZlclJlY2hhcmdlKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFsaVB1dCA9IHRoaXMuYmFua0RhdGFzLmFsaV9wdXRfc2VydmVyX2NoYXJnZTtcclxuICAgICAgICBsZXQgbWluUHV0ID0gdGhpcy5iYW5rRGF0YXMubWluX3B1dF9zZXJ2ZXJfY2hhcmdlO1xyXG4gICAgICAgIHJldHVybiBbYWxpUHV0LCBtaW5QdXRdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSYXRlSW5mbygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gdGhpcy5iYW5rRGF0YXMucHV0X2NvZGVfcGVyX2NlblxyXG4gICAgICAgIHJhdGlvID0gcmF0aW8vMTAwXHJcbiAgICAgICAgbGV0IGluZm9TdHIgPSBg5b2T5YmN5omT56CB5rWB5rC0OiR7cmF0aW995YCNYCB8fCBcIlwiXHJcbiAgICAgICAgcmV0dXJuIGluZm9TdHJcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LMemTtuihjOWNoSAyIOaUr+S7mOWunSAzIOa1t+WkluaUr+S7mFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UHV0SW5mbyh0eXBlKSB7XHJcbiAgICAgICAgbGV0IGNoYXJnZSA9IHR5cGUgPT0gMSA/IHRoaXMuYmFua0RhdGFzLmJhbmtfcHV0X3NlcnZlcl9jaGFyZ2Vfc2V0IDogdGhpcy5iYW5rRGF0YXMuYWxpX3B1dF9zZXJ2ZXJfY2hhcmdlX3NldDtcclxuICAgICAgICBsZXQgc3RySW5mbyA9IFwiXCJcclxuICAgICAgICBpZiAoY2hhcmdlICYmIGNoYXJnZS5sZW5ndGggPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYXJnZVswXSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZlZSA9IGNoYXJnZVswXS5mZWVcclxuICAgICAgICAgICAgICAgIGlmKGZlZT4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSBmZWUgKyAnJSdcclxuICAgICAgICAgICAgICAgICAgICBzdHJJbmZvID0gYFxcbjQu5Y2V5qyh5o+Q546w5pS25Y+W5o+Q546w6aKd5bqmJHtzdHJ955qE5omL57ut6LS5YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoY2hhcmdlICYmIGNoYXJnZS5sZW5ndGggPiAxKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ckluZm8gKz0gJ1xcbjQuJ1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hhcmdlLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsID0gY2hhcmdlW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgbGV0IGZlZSA9IGxldmVsLmZlZVxyXG4gICAgICAgICAgICAgICAgbGV0IG1pbiA9IGxldmVsLm1pbl9wb2ludC8xMDBcclxuICAgICAgICAgICAgICAgIGxldCBtYXggPSBsZXZlbC5tYXhfcG9pbnQvMTAwXHJcbiAgICAgICAgICAgICAgICBpZihmZWU+MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJJbmZvICs9IGDlhYXlgLzmtYHmsLQke21pbn3lgI1+JHttYXh95YCN5pS25Y+WJHtmZWV9JeeahOaJi+e7rei0ue+8jGBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJJbmZvICs9IGDlhYXlgLzmtYHmsLQke21pbn3lgI3ku6XkuIrml6DpnIDmiYvnu63otLlgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXN0ckluZm8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY2hhcmdlID0gdHlwZSA9PSAxID8gdGhpcy5iYW5rRGF0YXMubWluX3B1dF9zZXJ2ZXJfY2hhcmdlIDp0aGlzLmJhbmtEYXRhcy5hbGlfcHV0X3NlcnZlcl9jaGFyZ2VcclxuICAgICAgICAgICAgaWYoY2hhcmdlPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHIgPSBjaGFyZ2UgKyAnJSdcclxuICAgICAgICAgICAgICAgIHN0ckluZm8gPSBgXFxuNC7ljZXmrKHmj5DnjrDmlLblj5bmj5DnjrDpop3luqYke3N0cn3nmoTmiYvnu63otLlgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0ckluZm9cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpk7booYzljaHmj5DnjrDmiYvnu63otLnphY3nva5b6ZO26KGM5omL57ut6LS577yM5pyA5L2O5omL57ut6LS5XVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFua1B1dFNlcnZlclJlY2hhcmdlKCl7XHJcbiAgICAgICAgbGV0IGJhbmtQdXQgPSB0aGlzLmJhbmtEYXRhcy5iYW5rX3B1dF9zZXJ2ZXJfY2hhcmdlO1xyXG4gICAgICAgIGxldCBtaW5QdXQgPSB0aGlzLmJhbmtEYXRhcy5taW5fcHV0X3NlcnZlcl9jaGFyZ2U7XHJcbiAgICAgICAgcmV0dXJuIFtiYW5rUHV0LCBtaW5QdXRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyJ5peg6Zi/6YeM6LSm5oi35pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXZlQWxpKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFua0RhdGFzLmFsaV9hY2NvdW50ICE9IG51bGwgJiYgdGhpcy5iYW5rRGF0YXMuYWxpX2FjY291bnQgIT0gXCJcIjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pyJ5peg6ZO26IGU6LSm5oi35pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXZlVW5pb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYW5rRGF0YXMuZW50cnVzX2JhbmtfYWNjb3VudCAhPSBudWxsICYmIHRoaXMuYmFua0RhdGFzLmVudHJ1c19iYW5rX2FjY291bnQgIT0gXCJcIjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pyJ5peg5rW35aSW6LSm5oi35pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXZlT3ZlcnNlYXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYW5rRGF0YXMub3Zlcl9zZWFfZW50cnVzX2JhbmtfYWNjb3VudCAhPSBudWxsICYmIHRoaXMuYmFua0RhdGFzLm92ZXJfc2VhX2VudHJ1c19iYW5rX2FjY291bnQgIT0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7keWumumYv+mHjOi0puWPt+S/oeaBr1xyXG4gICAgICogQHBhcmFtIGFsaU5hbWUg5pSv5LuY5a6d5aeT5ZCNXHJcbiAgICAgKiBAcGFyYW0gYWxpQWNjb3VudCDmlK/ku5jlrp3otKblj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcUJpbmRBbGlJbmZvKGFsaU5hbWU6c3RyaW5nLGFsaUFjY291bnQ6c3RyaW5nKXtcclxuICAgICAgICBsZXQgX3BhcmFtID0ge1xyXG4gICAgICAgICAgICBcImJpbmRfdHlwZVwiOiAyLCBcclxuICAgICAgICAgICAgXCJhbGlBY2NvdW50XCI6IGFsaUFjY291bnQsIFxyXG4gICAgICAgICAgICBcImFsaU5hbWVcIjogYWxpTmFtZSwgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsTmV0QXBwZmFjZS5CaW5kQmFua0luZm8sX3BhcmFtLHRoaXMub25SZXNCaW5kQWxpSW5mby5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUr+S7mOWunee7keWumui/lOWbnlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUmVzQmluZEFsaUluZm8oZGF0YSl7XHJcbiAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLnu5HlrprmiJDlip9cIik7XHJcbiAgICAgICAgdGhpcy5yZXFHZXRCYW5rSW5mbyh0cnVlKTsgICBcclxuICAgICAgICB0aGlzLmV2ZW50KEV4dHJhY3RFdmVudC5CYW5rQmluZEluZm9PdmVyKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICBcIl9wYXJhbVwiOntcclxuICAgICAgICBcImVudHJ1c0JhbmtBY2NvdW50XCI6XCI2MjEyMjY0MDAwMDMxMjMxMlwiLFxyXG4gICAgICAgIFwiZW50cnVzQmFua1VzZXJcIjpcIueOi+Wwj+S6jFwiLFxyXG4gICAgICAgIFwiZW50cnVzQmFua05hbWVcIjpcIuS4reWbveW3peWVhumTtuihjFwiLFxyXG4gICAgICAgIFwiYmFua05hbWVcIjpcIuiOsuWhmOaUr+ihjFwiLFxyXG4gICAgICAgIFwiYmFua1Byb3ZjaW5jZVwiOlwi5bm/5Lic55yBXCIsXHJcbiAgICAgICAgXCJiYW5rQ2l0eVwiOlwi5rex5Zyz5biCXCIsXHJcbiAgICAgICAgXCJjZXJ0aWZpY2F0ZUNvZGVcIjpcIjQzMDQyNjE5OTExMTA3MjMyM1wiLC8vXHJcbiAgICAgICAgXCJiYW5rQ29kZVwiOlwiSUNCQ1wiXHJcblx0XHTkuIrpnaLpk7booYzljaHpnIDopoFcclxuXHRcdFwiYmluZF90eXBlXCI6MemTtuihjOWNoTLmlK/ku5jlrp1cclxuXHRcdOS4i+mdouaUr+S7mOWunVxyXG5cdFx0XCJhbGlBY2NvdW50XCI6XCLpmL/ph4zlj7dcIlxyXG5cdFx0XCJhbGlOYW1lXCI6XCLpmL/ph4znlKjmiLflkI1cIlxyXG4gICAgfVxyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqIOe7keWumumTtuiBlOi0puWPt+S/oeaBr1xyXG4gICAgICogQHBhcmFtIGVudHJ1c0JhbmtBY2NvdW50IOWNoeWPt1xyXG4gICAgICogQHBhcmFtIGVudHJ1c0JhbmtVc2VyIOWQjeWtl1xyXG4gICAgICogQHBhcmFtIGVudHJ1c0JhbmtOYW1lIOW8gOaIt+ihjOWQjeensFxyXG4gICAgICogQHBhcmFtIGJhbmtOYW1lIOaUr+ihjOWQjeensFxyXG4gICAgICogQHBhcmFtIGJhbmtQcm92Y2luY2Ug55yB5Lu9XHJcbiAgICAgKiBAcGFyYW0gYmFua0NpdHkg5Z+O5biCIFxyXG4gICAgICogQHBhcmFtIGJhbmtDb2RlIOmTtuihjOS7o+eggVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVxQmluZFVuaW9uSW5mbyhlbnRydXNCYW5rVXNlcjpzdHJpbmcsZW50cnVzQmFua0FjY291bnQ6c3RyaW5nLGVudHJ1c0JhbmtOYW1lOnN0cmluZyxiYW5rTmFtZTpzdHJpbmcsYmFua1Byb3ZjaW5jZTpzdHJpbmcsYmFua0NpdHk6c3RyaW5nLGJhbmtDb2RlOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJiaW5kX3R5cGVcIjogMSwgXHJcbiAgICAgICAgICAgIFwiZW50cnVzQmFua1VzZXJcIjogZW50cnVzQmFua1VzZXIsIFxyXG4gICAgICAgICAgICBcImVudHJ1c0JhbmtBY2NvdW50XCI6IGVudHJ1c0JhbmtBY2NvdW50LCBcclxuICAgICAgICAgICAgXCJlbnRydXNCYW5rTmFtZVwiOiBlbnRydXNCYW5rTmFtZSwgXHJcbiAgICAgICAgICAgIFwiYmFua05hbWVcIjogYmFua05hbWUsIFxyXG4gICAgICAgICAgICBcImJhbmtQcm92Y2luY2VcIjpiYW5rUHJvdmNpbmNlLFxyXG4gICAgICAgICAgICBcImJhbmtDaXR5XCI6YmFua0NpdHksXHJcbiAgICAgICAgICAgIFwiYmFua0NvZGVcIjpiYW5rQ29kZVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkJpbmRCYW5rSW5mbywgX3BhcmFtLHRoaXMub25SZXNCaW5kVW5pb25JbmZvLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZO26IGU5Y2h57uR5a6a6L+U5ZueXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25SZXNCaW5kVW5pb25JbmZvKGRhdGEpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi57uR5a6a5oiQ5YqfXCIpOyBcclxuICAgICAgICB0aGlzLnJlcUdldEJhbmtJbmZvKHRydWUpO1xyXG4gICAgICAgIHRoaXMuZXZlbnQoRXh0cmFjdEV2ZW50LkJhbmtCaW5kSW5mb092ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5o+Q546w5Yiw6Zi/6YeMXHJcbiAgICAgKiBAcGFyYW0gcG9pbnQg5o+Q546w6YeR6aKdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXFBbGlBcHBseUNhc2gocG9pbnQgOiBOdW1iZXIpe1xyXG4gICAgICAgIGlmKEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lID09IFwiXCIpe1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KFwi6K+l5Yqf6IO96ZyA6KaB6LSm5Y+357uR5a6a5omL5py65ZCO5omN6IO95L2/55So77yM5piv5ZCm56uL5Yi757uR5a6a5omL5py677yfXCIsICgpPT57XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEJpbmRQaG9uZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmxhZyA9IHRoaXMuY2hlY2tFbm91Z2goMilcclxuICAgICAgICBpZighZmxhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RyID0gdGhpcy5jaGVja1N0cigyKVxyXG4gICAgICAgIGlmKHN0cilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93WWVzTm9Cb3goc3RyLCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcUFwcGx5Q2FzaCgyLHBvaW50KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXFBcHBseUNhc2goMixwb2ludClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVxQXBwbHlDYXNoKHR5cGUscG9pbnQpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IHR5cGUsIFxyXG4gICAgICAgICAgICBcInBvaW50XCI6IHBvaW50LCBcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5BcHBseUNhc2gsIF9wYXJhbSwobXNnKT0+e3RoaXMub25SZXNBcHBseUNhc2gobXNnLCB0eXBlKX0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5o+Q546w5Yiw6ZO26IGUXHJcbiAgICAgKiBAcGFyYW0gcG9pbnQg5o+Q546w6YeR6aKdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXFVbmlvbkFwcGx5Q2FzaChwb2ludCA6IE51bWJlcil7XHJcbiAgICAgICAgaWYoR2xvYmFsLlBsYXllckRhdGEucGhvbmUgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93WWVzTm9Cb3goXCLor6Xlip/og73pnIDopoHotKblj7fnu5HlrprmiYvmnLrlkI7miY3og73kvb/nlKjvvIzmmK/lkKbnq4vliLvnu5HlrprmiYvmnLrvvJ9cIiwgKCk9PntcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmluZFBob25lXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmbGFnID0gdGhpcy5jaGVja0Vub3VnaCgxKVxyXG4gICAgICAgIGlmKCFmbGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdHIgPSB0aGlzLmNoZWNrU3RyKDEpXHJcbiAgICAgICAgaWYoc3RyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dZZXNOb0JveChzdHIsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxQXBwbHlDYXNoKDEscG9pbnQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlcUFwcGx5Q2FzaCgxLHBvaW50KVxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIOexu+WeizHpk7booYzljaEgMiDmlK/ku5jlrp0gMyDmtbflpJbmlK/ku5hcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tTdHIodHlwZSkge1xyXG4gICAgICAgIGxldCByYXRpbyA9IHRoaXMuYmFua0RhdGFzLnB1dF9jb2RlX3Blcl9jZW5cclxuICAgICAgICBsZXQgY2hhcmdlID0gdHlwZSA9PSAxID8gdGhpcy5iYW5rRGF0YXMuYmFua19wdXRfc2VydmVyX2NoYXJnZV9zZXQgOiB0aGlzLmJhbmtEYXRhcy5hbGlfcHV0X3NlcnZlcl9jaGFyZ2Vfc2V0O1xyXG4gICAgICAgIHJhdGlvID0gKHJhdGlvIC8gMTAwKS50b0ZpeGVkKDIpXHJcbiAgICAgICAgbGV0IHN0ciA9ICcnXHJcbiAgICAgICAgLy8gaWYgKGNoYXJnZSAmJiBjaGFyZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vICAgICBsZXQgbGV2ZWwgPSB0aGlzLmdldEV4dHJhbExldmVsKHJhdGlvLCBjaGFyZ2UpXHJcbiAgICAgICAgLy8gICAgIGxldCBmcmVlTGV2ZWwgPSB0aGlzLmdldEZyZWVFeHRyYWxMZXZlbChjaGFyZ2UpXHJcbiAgICAgICAgLy8gICAgIGxldCBmZWUgPSBsZXZlbC5mZWVcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGlmIChmZWUgPiAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoZnJlZUxldmVsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG1pbiA9IGZyZWVMZXZlbC5taW5fcG9pbnQgLyAxMDBcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgbmVlZCA9IChtaW4gLSByYXRpbykudG9GaXhlZCgyKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHN0ciA9IGDmgqjlvZPliY3miZPnoIHlgI3mlbDkuLoke3JhdGlvfeWAje+8jOWwhuaUtuWPliR7ZmVlfSXnmoTmiYvnu63otLnvvIznu6fnu63miZPnoIEke25lZWR95YCN5Y+v5YWN6Zmk5omL57ut6LS55ZOm77yM5piv5ZCm546w5Zyo5o+Q546w77yfYFxyXG5cclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHN0ciA9IGDmgqjlvZPliY3miZPnoIHlgI3mlbDkuLoke3JhdGlvfeWAje+8jOWwhuaUtuWPliR7ZmVlfSXnmoTmiYvnu63otLnvvIzmmK/lkKbnjrDlnKjmj5DnjrDvvJ9gXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgc3RyID0gYOaCqOW9k+WJjeaJk+eggeWAjeaVsOS4uiR7cmF0aW995YCN77yM5bey5YWN5omj5omL57ut6LS577yM5piv5ZCm546w5Zyo5o+Q546w77yfYFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgIC8vIOaCqOW9k+WJjeaJk+eggeWAjeaVsOS4uljvvIzlt7LlhY3miaPmiYvnu63otLnvvIzmmK/lkKbnjrDlnKjmj5DnjrDvvJ9cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZihjaGFyZ2UgJiYgY2hhcmdlLmxlbmd0aD4xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNoYXJnZS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZXZlbCA9IGNoYXJnZVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBsZXQgZmVlID0gbGV2ZWwuZmVlXHJcbiAgICAgICAgICAgICAgICBsZXQgbWluID0gKGxldmVsLm1pbl9wb2ludC8xMDApLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgIGxldCBtYXggPSAobGV2ZWwubWF4X3BvaW50LzEwMCkudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICAgICAgaWYoZmVlPjApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IGAke21pbn3lgI3miZPnoIHph4/vvJoke2ZlZX0l5omL57ut6LS5XFxuYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBgJHttaW595YCN5omT56CB6YeP77ya5YWN5omL57ut6LS5XFxuYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJTdHIgPSBg5b2T5YmN5omT56CB5YCN5pWwPGNvbG9yID0gcmVkPiR7cmF0aW99PC9jPuWAje+8jOaYr+WQpueOsOWcqOaPkOeOsO+8n2BcclxuICAgICAgICAgICAgc3RyICs9IGN1clN0clxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrRW5vdWdoKHR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gdGhpcy5iYW5rRGF0YXMucHV0X2NvZGVfcGVyX2NlblxyXG4gICAgICAgIHJhdGlvID0gcmF0aW8gLyAxMDBcclxuICAgICAgICBpZiAocmF0aW8gPCAxKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5b2T5YmN5omT56CB5rWB5rC05LiN6LazMeWAje+8jOaXoOazleWPkei1t+aPkOeOsFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSByYXRpbyDlvZPliY3miZPnoIHlgI3mlbBcclxuICAgICAqIEBwYXJhbSBjaGFyZ2Ug5o+Q546w5omL57ut6LS56YWN572uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFeHRyYWxMZXZlbChyYXRpbyxjaGFyZ2UpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBjaGFyZ2UubGVuZ3RoIC0gMTsgaW5kZXggPj0wOyBpbmRleC0tKSB7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbCA9IGNoYXJnZVtpbmRleF07XHJcbiAgICAgICAgICAgIGxldCBtaW4gPSBsZXZlbC5taW5fcG9pbnQvMTAwXHJcbiAgICAgICAgICAgIGlmKHJhdGlvPj1taW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZXZlbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNoYXJnZSDmj5DnjrDmiYvnu63otLnphY3nva5cclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyBnZXRGcmVlRXh0cmFsTGV2ZWwoY2hhcmdlKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gY2hhcmdlLmxlbmd0aCAtIDE7IGluZGV4ID49MDsgaW5kZXgtLSkge1xyXG4gICAgICAgICAgICBsZXQgbGV2ZWwgPSBjaGFyZ2VbaW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgZmVlID0gbGV2ZWwuZmVlXHJcbiAgICAgICAgICAgIGlmKGZlZTw9MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxldmVsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5DnjrDmtojmga/ov5Tlm55cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblJlc0FwcGx5Q2FzaChkYXRhLCB0eXBlKXtcclxuICAgICAgIFxyXG5cclxuICAgICAgICBsZXQgc3RyID0gXCLnlLPor7flh7rmrL7lkI4z5YiG6ZKf5YaF5Yiw6LSm77yM5o+Q546w5YmN6K+356Gu6K6k57uR5a6a6LSm5oi35L+h5oGv5YeG56Gu5peg6K+v77yM5oSf6LCi5oKo5a+55bmz5Y+w55qE5pSv5oyB5LiO55CG6KejIVwiXHJcbiAgICAgICBcclxuICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChzdHIpO1xyXG4gICAgICAgIC8vIEdsb2JhbC5VSS5mYXN0VGlwKFwi5o+Q546w55Sz6K+35o+Q5Lqk5oiQ5YqfXCIpOyBcclxuICAgICAgICAvL+ivt+axguacgOaWsOmHkeW4gVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsTmV0QXBwZmFjZS5HZXRVc2VyUG9pbnQse30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5o+Q546w6K6w5b2V5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXFBcHBseUNhc2hMaXN0KG5leHQ6IGJvb2xlYW4gPSBmYWxzZSl7XHJcblxyXG4gICAgICAgIGlmIChuZXh0KXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FzaExpc3REYXRhLmxlbmd0aCA+PSB0aGlzLmNhc2hUb3RhbCl7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaXoOabtOWkmuS/oeaBr1wiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FzaExpc3RQYWdlKys7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzaExpc3RQYWdlID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpc3RDb3VudCA9IHRoaXMuY2FzaFRvdGFsIC0gKHRoaXMuY2FzaExpc3RQYWdlLTEpKjYgPiA2PzY6dGhpcy5jYXNoVG90YWwgLSAodGhpcy5jYXNoTGlzdFBhZ2UtMSkqNlxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwYWdlXCI6IHRoaXMuY2FzaExpc3RQYWdlLFxyXG4gICAgICAgICAgICBcInBhZ2VzaXplXCI6IGxpc3RDb3VudD09MD82Omxpc3RDb3VudCxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IDAsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcIkFwcGx5Q2FzaExpc3RcIiwgMyk7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5BcHBseUNhc2hMaXN0LCBwYXJhbSwgKHJlcyk9PntcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsIFwiQXBwbHlDYXNoTGlzdFwiKTtcclxuICAgICAgICAgICAgaWYocmVzLmxpc3QubGVuZ3RoIDwgNil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhc2hUb3RhbCA9ICh0aGlzLmNhc2hMaXN0UGFnZSAtMSkgKjYgKyByZXMubGlzdC5sZW5ndGggO1xyXG4gICAgICAgICAgICAgICAgaWYocmVzLmxpc3QubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FzaExpc3RQYWdlLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNoVG90YWwgPSB0aGlzLmNhc2hMaXN0RGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXNoVG90YWwgPSByZXMudG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMubGlzdCB8fCBbXTtcclxuICAgICAgICAgICAgaWYgKCFsaXN0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYXNoTGlzdFBhZ2UgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhc2hMaXN0RGF0YSA9IGxpc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhc2hMaXN0RGF0YS5sZW5ndGggPiB0aGlzLmNhc2hUb3RhbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhc2hMaXN0RGF0YSA9IHRoaXMuY2FzaExpc3REYXRhLmNvbmNhdChsaXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KEV4dHJhY3RFdmVudC5PblVwZGF0ZUFwcGx5Q2FzaExpc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENhc2hMaXN0RGF0YSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhc2hMaXN0RGF0YTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5o+Q546w6K6w5b2V5pWw5o2u6L+U5ZueXHJcbiAgICAgKiBcIl9wYXJhbVwiOntcclxuICAgICAgICBcInRvdGFsXCI6MSxcclxuICAgICAgICBcImxpc3RcIjpbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY3JlYXRlX2RhdGVcIjpcIjAwMDAtMDAtMDAgMDA6MDA6MDBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNjb3VudFwiOlwiNjIxMjI2NDAwMDAzMTM5MTI0MlwiLFxyXG4gICAgICAgICAgICAgICAgXCJwb2ludFwiOjIwMDAwLFxyXG4gICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogMSAvLyAtMSDmi5Lnu50gMOm7mOiupCDlvoXlrqHmoLggMeW3suWuoeaguCAy56Gu6K6k5LitIDMg5YWR5o2i5oiQ5YqfXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbiAgICAgKi9cclxuXHJcblxyXG4gICAgLyoqICDor7fmsYLmiYDmnInnjqnlrrbmj5DnjrDorrDlvZXmlbDmja4gKi9cclxuICAgIHB1YmxpYyByZXFHZXRBbGxQdXRMaXN0KCl7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRBbGxQYXlQdXRMaXN0LCBudWxsICx0aGlzLm9uUmVzR2V0QWxsUHV0TGlzdC5iaW5kKHRoaXMpLCBudWxsLCBmYWxzZSk7IC8vIOi9ruaSrSDmlbDmja7nlYzpnaLnvJPlrZgg5YWz6Zet5riF56m6XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7fmsYLmiYDmnInnjqnlrrbmj5DnjrDorrDlvZXmlbDmja7ov5Tlm55cclxuICAgICAqIFwiX3BhcmFtXCI6e1xyXG4gICAgICAgIFwidG90YWxcIjoxLFxyXG4gICAgICAgIFwibGlzdFwiOltcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVfZGF0ZVwiOlwiMDAwMC0wMC0wMCAwMDowMDowMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY2NvdW50XCI6XCI2MjEyMjY0MDAwMDMxMzkxMjQyXCIsXHJcbiAgICAgICAgICAgICAgICBcInBvaW50XCI6MjAwMDAsXHJcbiAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiAxIC8vIC0xIOaLkue7nSAw6buY6K6kIOW+heWuoeaguCAx5bey5a6h5qC4IDLnoa7orqTkuK0gMyDlhZHmjaLmiJDlip9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblJlc0dldEFsbFB1dExpc3QoZGF0YSl7XHJcbiAgICAgICAgdGhpcy5hbGxQdXRMaXN0ID0gZGF0YTtcclxuICAgICAgICB0aGlzLmV2ZW50KEV4dHJhY3RFdmVudC5PblVwZGF0ZUFsbFB1dExpc3QsIHRoaXMuYWxsUHV0TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5HlrprmtbflpJbotKblj7fkv6Hmga9cclxuICAgICAqIEBwYXJhbSBlbnRydXNCYW5rQWNjb3VudCDljaHlj7dcclxuICAgICAqIEBwYXJhbSBlbnRydXNCYW5rVXNlciDlkI3lrZdcclxuICAgICAqIEBwYXJhbSBlbnRydXNCYW5rTmFtZSDlvIDmiLfooYzlkI3np7BcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcUJpbmRPdmVyc2Vhc0luZm8oZW50cnVzQmFua1VzZXI6c3RyaW5nLGVudHJ1c0JhbmtBY2NvdW50OnN0cmluZyxlbnRydXNCYW5rTmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBfcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwiYmluZF90eXBlXCI6IDMsIFxyXG4gICAgICAgICAgICBcImVudHJ1c0JhbmtVc2VyXCI6IGVudHJ1c0JhbmtVc2VyLCBcclxuICAgICAgICAgICAgXCJlbnRydXNCYW5rQWNjb3VudFwiOiBlbnRydXNCYW5rQWNjb3VudCwgXHJcbiAgICAgICAgICAgIFwiZW50cnVzQmFua05hbWVcIjogZW50cnVzQmFua05hbWUsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuQmluZEJhbmtJbmZvLCBfcGFyYW0sdGhpcy5vblJlc0JpbmRPdmVyc2Vhc0luZm8uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmtbflpJbmj5DnjrDnu5Hlrprov5Tlm55cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblJlc0JpbmRPdmVyc2Vhc0luZm8oZGF0YSl7XHJcbiAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLnu5HlrprmiJDlip9cIik7IFxyXG4gICAgICAgIHRoaXMucmVxR2V0QmFua0luZm8odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5ldmVudChFeHRyYWN0RXZlbnQuQmFua0JpbmRJbmZvT3Zlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOa1t+WkluacgOWwj+aPkOeOsOmZkOWItiAqL1xyXG4gICAgcHVibGljIGdldE92ZXJzZWFzTWluTGltaXQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYW5rRGF0YXMub3Zlcl9zZWFfYmFua19tYXhfcHV0X3BvaW50O1xyXG4gICAgfTsgICBcclxuICAgIC8qKiDmtbflpJbmnIDlpKfmj5DnjrDpmZDliLYgKi9cclxuICAgIHB1YmxpYyBnZXRPdmVyc2Vhc01heExpbWl0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFua0RhdGFzLm92ZXJfc2VhX2JhbmtfbWluX3B1dF9wb2ludDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5rW35aSW5q+P5aSp5o+Q546w5pyA5aSn6ZmQ6aKdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRPdmVyc2Vhc09uZURheU1heCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhbmtEYXRhcy5vdmVyX3NlYV9iYW5rX2RheV9tYXhfcHV0X3BvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rW35aSW5o+Q546w5omL57ut6LS56YWN572uW+mTtuihjOaJi+e7rei0ue+8jOacgOS9juaJi+e7rei0uV1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE92ZXJzZWFzUHV0U2VydmVyUmVjaGFyZ2UoKXtcclxuICAgICAgICBsZXQgYmFua1B1dCA9IHRoaXMuYmFua0RhdGFzLm92ZXJfc2VhX2JhbmtfcHV0X3NlcnZlcl9jaGFyZ2U7XHJcbiAgICAgICAgbGV0IG1pblB1dCA9IHRoaXMuYmFua0RhdGFzLm1pbl9wdXRfc2VydmVyX2NoYXJnZTtcclxuICAgICAgICByZXR1cm4gW2JhbmtQdXQsIG1pblB1dF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7fmsYLmj5DnjrAg5rW35aSW5o+Q546wXHJcbiAgICAgKiBAcGFyYW0gcG9pbnQg5o+Q546w6YeR6aKdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXFPdmVyc2Vhc0FwcGx5Q2FzaChwb2ludCA6IE51bWJlcil7XHJcbiAgICAgICAgaWYoR2xvYmFsLlBsYXllckRhdGEucGhvbmUgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93WWVzTm9Cb3goXCLor6Xlip/og73pnIDopoHotKblj7fnu5HlrprmiYvmnLrlkI7miY3og73kvb/nlKjvvIzmmK/lkKbnq4vliLvnu5HlrprmiYvmnLrvvJ9cIiwgKCk9PntcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmluZFBob25lXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgX3BhcmFtID0ge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogMywgXHJcbiAgICAgICAgICAgIFwicG9pbnRcIjogcG9pbnQsIFxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkFwcGx5Q2FzaCwgX3BhcmFtLCAobXNnKT0+e3RoaXMub25SZXNBcHBseUNhc2gobXNnLCAzKX0pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==