"use strict";
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