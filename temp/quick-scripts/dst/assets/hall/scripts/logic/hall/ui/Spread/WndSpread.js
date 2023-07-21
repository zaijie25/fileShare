
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/WndSpread.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b2764O5t6tDLq3+BijLfan6', 'WndSpread');
// hall/scripts/logic/hall/ui/Spread/WndSpread.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var WndBase_1 = require("../../../../../scripts/logic/core/ui/WndBase");
var WndMyGroup_1 = require("./WndMyGroup");
var SpreadTutorialWin_1 = require("./SpreadTutorialWin");
var WndMySpread_1 = require("./WndMySpread");
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var CaptureTool_1 = require("./CaptureTool");
var WndAwardDetail_1 = require("./WndAwardDetail");
var ProxyWin_1 = require("./ProxyWin");
var WndSpread = /** @class */ (function (_super) {
    __extends(WndSpread, _super);
    function WndSpread() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleArray = [];
        _this.curWin = 1; //1代理分红 2我的业绩 3推广教程 4返佣比例
        _this.subViewPath = {
            "MySpread": "hall/prefabs/ui/SpreadUI/subView/MySpread",
            "MyGroup": "hall/prefabs/ui/SpreadUI/subView/MyGroup",
            "SpreadTutorial": "hall/prefabs/ui/SpreadUI/subView/SpreadTutorial",
            "WndAwardDetail": "hall/prefabs/ui/SpreadUI/subView/AwardDetailPanel",
            "ProxyWin": "hall/prefabs/ui/SpreadUI/subView/ProxyUI"
        };
        _this.viewKeyTypeMap = {
            "MySpread": WndMySpread_1.default,
            "MyGroup": WndMyGroup_1.default,
            "SpreadTutorial": SpreadTutorialWin_1.default,
            "WndAwardDetail": WndAwardDetail_1.default,
            "ProxyWin": ProxyWin_1.default,
        };
        return _this;
    }
    WndSpread.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndSpread";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/SpreadUI";
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
    };
    WndSpread.prototype.initView = function () {
        this.subViewParentNode = this.getChild("RightPanel");
        this.CaptureTool = this.getChild("SpreedCenterUI").getComponent(CaptureTool_1.default);
        if (this.CaptureTool) {
            this.CaptureTool.node.active = false;
        }
        this.qrNode = this.getChild("SpreedCenterUI/qrNode");
        this.MySpreadToggle = this.getChild("LeftPanel/scrollview/view/content/MySpread");
        this.MyGroupToggle = this.getChild("LeftPanel/scrollview/view/content/MyGroup");
        this.SpreadTutorialToggle = this.getChild("LeftPanel/scrollview/view/content/SpreadTutorial");
        this.GradeSearchToggle = this.getChild("LeftPanel/scrollview/view/content/GradeSearch");
        this.ProxyWinToggle = this.getChild("LeftPanel/scrollview/view/content/ProxyBonus");
        this.MySpreadToggle.on("click", this.changeInfoNode, this);
        this.MyGroupToggle.on("click", this.changeInfoNode, this);
        this.SpreadTutorialToggle.on("click", this.changeInfoNode, this);
        this.GradeSearchToggle.on("click", this.changeInfoNode, this);
        this.ProxyWinToggle.on("click", this.changeInfoNode, this);
        this.addCommonClick("bg_popup_almost/close", this.close, this);
        this.initSubViewClass(this.viewKeyTypeMap);
        this.InitScripts();
        var bg = this.getComponent("SpreedCenterUI/bg", cc.Sprite);
        if (bg) {
            Global.customApp.loadSpreedBg(bg);
        }
        this.toggleArray.push(this.MySpreadToggle);
        this.toggleArray.push(this.MyGroupToggle);
        this.toggleArray.push(this.SpreadTutorialToggle);
        this.toggleArray.push(this.GradeSearchToggle);
        this.toggleArray.push(this.ProxyWinToggle);
    };
    WndSpread.prototype.InitQrcode = function (url) {
        Global.Toolkit.initQRCode(this.qrNode, url, 10);
    };
    WndSpread.prototype.InitScripts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initSubView(this.subViewPath, this.viewKeyTypeMap, this.subViewParentNode)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WndSpread.prototype.changeInfoNode = function (target) {
        Global.Audio.playBtnSound();
        var curWin = 1;
        if (target.node == this.MySpreadToggle) {
            curWin = 1;
        }
        else if (target.node == this.MyGroupToggle) {
            curWin = 2;
        }
        else if (target.node == this.SpreadTutorialToggle) {
            curWin = 3;
        }
        else if (target.node == this.GradeSearchToggle) {
            curWin = 4;
        }
        else if (target.node == this.ProxyWinToggle) {
            curWin = 5;
        }
        if (curWin == this.curWin) {
            return;
        }
        this.curWin = curWin;
        this.updateInfoNode();
    };
    WndSpread.prototype.updateInfoNode = function () {
        this.closeAllWin();
        if (this.curWin == 1) {
            this.MySpread.subViewState = true;
            this.ToggleClicked(this.MySpreadToggle);
        }
        else if (this.curWin == 2) {
            if (this.MyGroup) {
                this.MyGroup.subViewState = true;
            }
            this.ToggleClicked(this.MyGroupToggle);
        }
        else if (this.curWin == 3) {
            if (this.SpreadTutorial) {
                this.SpreadTutorial.subViewState = true;
            }
            this.ToggleClicked(this.SpreadTutorialToggle);
        }
        else if (this.curWin == 4) {
            if (this.WndAwardDetail) {
                this.WndAwardDetail.subViewState = true;
            }
            this.ToggleClicked(this.GradeSearchToggle);
        }
        else if (this.curWin == 5) {
            if (this.ProxyWin) {
                this.ProxyWin.subViewState = true;
            }
            this.ToggleClicked(this.ProxyWinToggle);
        }
    };
    WndSpread.prototype.closeAllWin = function () {
        if (this.MySpread) {
            this.MySpread.subViewState = false;
        }
        if (this.MyGroup) {
            this.MyGroup.subViewState = false;
        }
        if (this.SpreadTutorial) {
            this.SpreadTutorial.subViewState = false;
        }
        if (this.WndAwardDetail) {
            this.WndAwardDetail.subViewState = false;
        }
        if (this.ProxyWin) {
            this.ProxyWin.subViewState = false;
        }
    };
    WndSpread.prototype.ToggleClicked = function (toggle) {
        if (toggle == null) {
            return;
        }
        for (var index = 0; index < this.toggleArray.length; index++) {
            var tmptgl = this.toggleArray[index];
            var checkmark = tmptgl.getChildByName("checkmark");
            var normal = tmptgl.getChildByName("Background");
            if (tmptgl == toggle) {
                checkmark.active = true;
                normal.active = false;
            }
            else {
                checkmark.active = false;
                normal.active = true;
            }
        }
    };
    WndSpread.prototype.ResetToggle = function () {
        for (var index = 0; index < this.toggleArray.length; index++) {
            var tmptgl = this.toggleArray[index];
            var checkmark = tmptgl.getChildByName("checkmark");
            var normal = tmptgl.getChildByName("Background");
            checkmark.active = false;
            normal.active = true;
        }
    };
    WndSpread.prototype.OnDataPrepared = function () {
        _super.prototype.OnDataPrepared.call(this);
    };
    WndSpread.prototype.afterOpen = function () {
    };
    WndSpread.prototype.onOpen = function (args) {
        this.updateInfoNode();
        var url = Global.Setting.Urls.inviteUrl;
        url = this.SpreadModel.Url || url;
        this.InitQrcode(url);
    };
    WndSpread.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.Spread);
        this.SpreadModel.CheckRedFlag();
        this.curWin = 1;
    };
    WndSpread.prototype.onDispose = function () {
        this.toggleArray = [];
    };
    return WndSpread;
}(WndBase_1.default));
exports.default = WndSpread;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFduZFNwcmVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBbUU7QUFFbkUsMkNBQXNDO0FBQ3RDLHlEQUFvRDtBQUNwRCw2Q0FBd0M7QUFDeEMsZ0VBQTJFO0FBRTNFLDZDQUF3QztBQUN4QyxtREFBOEM7QUFDOUMsdUNBQWtDO0FBQ2xDO0lBQXVDLDZCQUFPO0lBQTlDO1FBQUEscUVBOE9DO1FBbk9XLGlCQUFXLEdBQUcsRUFBRSxDQUFBO1FBRXhCLFlBQU0sR0FBVyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7UUFXckMsaUJBQVcsR0FBUTtZQUN2QixVQUFVLEVBQUMsMkNBQTJDO1lBQ3RELFNBQVMsRUFBQywwQ0FBMEM7WUFDcEQsZ0JBQWdCLEVBQUMsaURBQWlEO1lBQ2xFLGdCQUFnQixFQUFDLG1EQUFtRDtZQUNwRSxVQUFVLEVBQUMsMENBQTBDO1NBQ3hELENBQUE7UUFFTyxvQkFBYyxHQUFRO1lBQzFCLFVBQVUsRUFBQyxxQkFBVztZQUN0QixTQUFTLEVBQUMsb0JBQVU7WUFDcEIsZ0JBQWdCLEVBQUMsMkJBQWlCO1lBQ2xDLGdCQUFnQixFQUFDLHdCQUFjO1lBQy9CLFVBQVUsRUFBQyxrQkFBUTtTQUN0QixDQUFBOztJQXdNTCxDQUFDO0lBck1hLDBCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLEdBQWdCLE1BQU0sQ0FB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LENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUN6QixDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQTlPQSxBQThPQyxDQTlPc0MsaUJBQU8sR0E4TzdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3NjcmlwdHMvbG9naWMvY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBTcHJlYWRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9TcHJlYWRNb2RlbFwiO1xyXG5pbXBvcnQgV25kTXlHcm91cCBmcm9tIFwiLi9XbmRNeUdyb3VwXCI7XHJcbmltcG9ydCBTcHJlYWRUdXRvcmlhbFdpbiBmcm9tIFwiLi9TcHJlYWRUdXRvcmlhbFdpblwiO1xyXG5pbXBvcnQgV25kTXlTcHJlYWQgZnJvbSBcIi4vV25kTXlTcHJlYWRcIjtcclxuaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIsIHsgUG9wV25kTmFtZSB9IGZyb20gXCIuLi8uLi90b29sL0hhbGxQb3BNc2dIZWxwZXJcIjtcclxuaW1wb3J0IFduZENvbW1pc3Npb25saXN0IGZyb20gXCIuL1duZENvbW1pc3Npb25saXN0XCI7XHJcbmltcG9ydCBDYXB0dXJlVG9vbCBmcm9tIFwiLi9DYXB0dXJlVG9vbFwiO1xyXG5pbXBvcnQgV25kQXdhcmREZXRhaWwgZnJvbSBcIi4vV25kQXdhcmREZXRhaWxcIjtcclxuaW1wb3J0IFByb3h5V2luIGZyb20gXCIuL1Byb3h5V2luXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFNwcmVhZCBleHRlbmRzIFduZEJhc2Uge1xyXG5cclxuICAgIFNwcmVhZE1vZGVsOiBTcHJlYWRNb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIE15U3ByZWFkVG9nZ2xlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBNeUdyb3VwVG9nZ2xlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBTcHJlYWRUdXRvcmlhbFRvZ2dsZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgR3JhZGVTZWFyY2hUb2dnbGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIFByb3h5V2luVG9nZ2xlOiBjYy5Ob2RlO1xyXG5cclxuICAgIHByaXZhdGUgc3ViVmlld1BhcmVudE5vZGU6Y2MuTm9kZVxyXG4gICAgcHJpdmF0ZSB0b2dnbGVBcnJheSA9IFtdXHJcblxyXG4gICAgY3VyV2luOiBudW1iZXIgPSAxOyAvLzHku6PnkIbliIbnuqIgMuaIkeeahOS4mue7qSAz5o6o5bm/5pWZ56iLIDTov5TkvaPmr5TkvotcclxuXHJcbiAgICBNeVNwcmVhZDogV25kTXlTcHJlYWQ7XHJcbiAgICBNeUdyb3VwOiBXbmRNeUdyb3VwO1xyXG4gICAgU3ByZWFkVHV0b3JpYWw6IFNwcmVhZFR1dG9yaWFsV2luO1xyXG4gICAgV25kQXdhcmREZXRhaWw6V25kQXdhcmREZXRhaWw7XHJcbiAgICBQcm94eVdpbjpQcm94eVdpbjtcclxuXHJcbiAgICBwdWJsaWMgQ2FwdHVyZVRvb2w6IENhcHR1cmVUb29sO1xyXG4gICAgcHJpdmF0ZSBxck5vZGU6IGNjLk5vZGU7XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJWaWV3UGF0aCA6YW55ID0ge1xyXG4gICAgICAgIFwiTXlTcHJlYWRcIjpcImhhbGwvcHJlZmFicy91aS9TcHJlYWRVSS9zdWJWaWV3L015U3ByZWFkXCIsXHJcbiAgICAgICAgXCJNeUdyb3VwXCI6XCJoYWxsL3ByZWZhYnMvdWkvU3ByZWFkVUkvc3ViVmlldy9NeUdyb3VwXCIsXHJcbiAgICAgICAgXCJTcHJlYWRUdXRvcmlhbFwiOlwiaGFsbC9wcmVmYWJzL3VpL1NwcmVhZFVJL3N1YlZpZXcvU3ByZWFkVHV0b3JpYWxcIixcclxuICAgICAgICBcIlduZEF3YXJkRGV0YWlsXCI6XCJoYWxsL3ByZWZhYnMvdWkvU3ByZWFkVUkvc3ViVmlldy9Bd2FyZERldGFpbFBhbmVsXCIsXHJcbiAgICAgICAgXCJQcm94eVdpblwiOlwiaGFsbC9wcmVmYWJzL3VpL1NwcmVhZFVJL3N1YlZpZXcvUHJveHlVSVwiXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2aWV3S2V5VHlwZU1hcCA6YW55ID0ge1xyXG4gICAgICAgIFwiTXlTcHJlYWRcIjpXbmRNeVNwcmVhZCxcclxuICAgICAgICBcIk15R3JvdXBcIjpXbmRNeUdyb3VwLFxyXG4gICAgICAgIFwiU3ByZWFkVHV0b3JpYWxcIjpTcHJlYWRUdXRvcmlhbFdpbixcclxuICAgICAgICBcIlduZEF3YXJkRGV0YWlsXCI6V25kQXdhcmREZXRhaWwsXHJcbiAgICAgICAgXCJQcm94eVdpblwiOlByb3h5V2luLFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuaXNOZWVkRGVsYXkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRTcHJlYWRcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1NwcmVhZFVJL1NwcmVhZFVJXCI7XHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbCA9IDxTcHJlYWRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLnN1YlZpZXdQYXJlbnROb2RlID0gdGhpcy5nZXRDaGlsZChcIlJpZ2h0UGFuZWxcIilcclxuXHJcbiAgICAgICAgdGhpcy5DYXB0dXJlVG9vbCA9IHRoaXMuZ2V0Q2hpbGQoXCJTcHJlZWRDZW50ZXJVSVwiKS5nZXRDb21wb25lbnQoQ2FwdHVyZVRvb2wpXHJcbiAgICAgICAgaWYodGhpcy5DYXB0dXJlVG9vbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2FwdHVyZVRvb2wubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnFyTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJTcHJlZWRDZW50ZXJVSS9xck5vZGVcIilcclxuXHJcbiAgICAgICAgdGhpcy5NeVNwcmVhZFRvZ2dsZSA9IHRoaXMuZ2V0Q2hpbGQoXCJMZWZ0UGFuZWwvc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQvTXlTcHJlYWRcIilcclxuICAgICAgICB0aGlzLk15R3JvdXBUb2dnbGUgPSB0aGlzLmdldENoaWxkKFwiTGVmdFBhbmVsL3Njcm9sbHZpZXcvdmlldy9jb250ZW50L015R3JvdXBcIilcclxuICAgICAgICB0aGlzLlNwcmVhZFR1dG9yaWFsVG9nZ2xlID0gdGhpcy5nZXRDaGlsZChcIkxlZnRQYW5lbC9zY3JvbGx2aWV3L3ZpZXcvY29udGVudC9TcHJlYWRUdXRvcmlhbFwiKTtcclxuICAgICAgICB0aGlzLkdyYWRlU2VhcmNoVG9nZ2xlID0gdGhpcy5nZXRDaGlsZChcIkxlZnRQYW5lbC9zY3JvbGx2aWV3L3ZpZXcvY29udGVudC9HcmFkZVNlYXJjaFwiKTtcclxuICAgICAgICB0aGlzLlByb3h5V2luVG9nZ2xlID0gdGhpcy5nZXRDaGlsZChcIkxlZnRQYW5lbC9zY3JvbGx2aWV3L3ZpZXcvY29udGVudC9Qcm94eUJvbnVzXCIpO1xyXG5cclxuICAgICAgICB0aGlzLk15U3ByZWFkVG9nZ2xlLm9uKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VJbmZvTm9kZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5NeUdyb3VwVG9nZ2xlLm9uKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VJbmZvTm9kZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TcHJlYWRUdXRvcmlhbFRvZ2dsZS5vbihcImNsaWNrXCIsIHRoaXMuY2hhbmdlSW5mb05vZGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuR3JhZGVTZWFyY2hUb2dnbGUub24oXCJjbGlja1wiLCB0aGlzLmNoYW5nZUluZm9Ob2RlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLlByb3h5V2luVG9nZ2xlLm9uKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VJbmZvTm9kZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiZ19wb3B1cF9hbG1vc3QvY2xvc2VcIiwgdGhpcy5jbG9zZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5pbml0U3ViVmlld0NsYXNzKHRoaXMudmlld0tleVR5cGVNYXApXHJcbiAgICAgICAgdGhpcy5Jbml0U2NyaXB0cygpXHJcblxyXG4gICAgICAgIGxldCBiZyA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiU3ByZWVkQ2VudGVyVUkvYmdcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICBpZihiZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5jdXN0b21BcHAubG9hZFNwcmVlZEJnKGJnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9nZ2xlQXJyYXkucHVzaCh0aGlzLk15U3ByZWFkVG9nZ2xlKVxyXG4gICAgICAgIHRoaXMudG9nZ2xlQXJyYXkucHVzaCh0aGlzLk15R3JvdXBUb2dnbGUpXHJcbiAgICAgICAgdGhpcy50b2dnbGVBcnJheS5wdXNoKHRoaXMuU3ByZWFkVHV0b3JpYWxUb2dnbGUpXHJcbiAgICAgICAgdGhpcy50b2dnbGVBcnJheS5wdXNoKHRoaXMuR3JhZGVTZWFyY2hUb2dnbGUpXHJcbiAgICAgICAgdGhpcy50b2dnbGVBcnJheS5wdXNoKHRoaXMuUHJveHlXaW5Ub2dnbGUpXHJcbiAgICB9XHJcblxyXG4gICAgSW5pdFFyY29kZSh1cmwpIHtcclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5pbml0UVJDb2RlKHRoaXMucXJOb2RlLCB1cmwsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBJbml0U2NyaXB0cygpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLmluaXRTdWJWaWV3KHRoaXMuc3ViVmlld1BhdGgsdGhpcy52aWV3S2V5VHlwZU1hcCx0aGlzLnN1YlZpZXdQYXJlbnROb2RlKVxyXG4gICAgfVxyXG4gICBcclxuICAgIFxyXG4gICAgY2hhbmdlSW5mb05vZGUodGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdmFyIGN1cldpbiA9IDE7XHJcbiAgICAgICAgaWYgKHRhcmdldC5ub2RlID09IHRoaXMuTXlTcHJlYWRUb2dnbGUpIHtcclxuICAgICAgICAgICAgY3VyV2luID0gMTtcclxuICAgICAgICB9ZWxzZSBpZiAodGFyZ2V0Lm5vZGUgPT0gdGhpcy5NeUdyb3VwVG9nZ2xlKSB7XHJcbiAgICAgICAgICAgIGN1cldpbiA9IDI7XHJcbiAgICAgICAgfWVsc2UgaWYgKHRhcmdldC5ub2RlID09IHRoaXMuU3ByZWFkVHV0b3JpYWxUb2dnbGUpIHtcclxuICAgICAgICAgICAgY3VyV2luID0gMztcclxuICAgICAgICB9ZWxzZSBpZiAodGFyZ2V0Lm5vZGUgPT0gdGhpcy5HcmFkZVNlYXJjaFRvZ2dsZSkge1xyXG4gICAgICAgICAgICBjdXJXaW4gPSA0O1xyXG4gICAgICAgIH1lbHNlIGlmKHRhcmdldC5ub2RlID09IHRoaXMuUHJveHlXaW5Ub2dnbGUpe1xyXG4gICAgICAgICAgICBjdXJXaW4gPSA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VyV2luID09IHRoaXMuY3VyV2luKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJXaW4gPSBjdXJXaW47XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvTm9kZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9Ob2RlKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VBbGxXaW4oKTtcclxuICAgICAgICBpZiAodGhpcy5jdXJXaW4gPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLk15U3ByZWFkLnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVDbGlja2VkKHRoaXMuTXlTcHJlYWRUb2dnbGUpXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJXaW4gPT0gMikge1xyXG4gICAgICAgICAgICBpZiggdGhpcy5NeUdyb3VwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk15R3JvdXAuc3ViVmlld1N0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVDbGlja2VkKHRoaXMuTXlHcm91cFRvZ2dsZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5jdXJXaW4gPT0gMykge1xyXG4gICAgICAgICAgICBpZiggdGhpcy5TcHJlYWRUdXRvcmlhbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TcHJlYWRUdXRvcmlhbC5zdWJWaWV3U3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQ2xpY2tlZCh0aGlzLlNwcmVhZFR1dG9yaWFsVG9nZ2xlKVxyXG4gICAgICAgIH1lbHNlIGlmICh0aGlzLmN1cldpbiA9PSA0KSB7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLlduZEF3YXJkRGV0YWlsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlduZEF3YXJkRGV0YWlsLnN1YlZpZXdTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVDbGlja2VkKHRoaXMuR3JhZGVTZWFyY2hUb2dnbGUpXHJcbiAgICAgICAgfWVsc2UgaWYgKHRoaXMuY3VyV2luID09IDUpIHtcclxuICAgICAgICAgICAgaWYoIHRoaXMuUHJveHlXaW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHJveHlXaW4uc3ViVmlld1N0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUNsaWNrZWQodGhpcy5Qcm94eVdpblRvZ2dsZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VBbGxXaW4oKSB7XHJcbiAgICAgICAgaWYodGhpcy5NeVNwcmVhZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTXlTcHJlYWQuc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuTXlHcm91cClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTXlHcm91cC5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5TcHJlYWRUdXRvcmlhbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3ByZWFkVHV0b3JpYWwuc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuV25kQXdhcmREZXRhaWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlduZEF3YXJkRGV0YWlsLnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLlByb3h5V2luKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Qcm94eVdpbi5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgVG9nZ2xlQ2xpY2tlZCh0b2dnbGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBpZiAodG9nZ2xlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRvZ2dsZUFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgdG1wdGdsID0gdGhpcy50b2dnbGVBcnJheVtpbmRleF1cclxuICAgICAgICAgICAgbGV0IGNoZWNrbWFyayA9IHRtcHRnbC5nZXRDaGlsZEJ5TmFtZShcImNoZWNrbWFya1wiKVxyXG4gICAgICAgICAgICBsZXQgbm9ybWFsID0gdG1wdGdsLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKVxyXG4gICAgICAgICAgICBpZiAodG1wdGdsID09IHRvZ2dsZSkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2ttYXJrLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIG5vcm1hbC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hlY2ttYXJrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBub3JtYWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBSZXNldFRvZ2dsZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2dnbGVBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IHRtcHRnbCA9IHRoaXMudG9nZ2xlQXJyYXlbaW5kZXhdXHJcbiAgICAgICAgICAgIGxldCBjaGVja21hcmsgPSB0bXB0Z2wuZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja21hcmtcIilcclxuICAgICAgICAgICAgbGV0IG5vcm1hbCA9IHRtcHRnbC5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIilcclxuICAgICAgICAgICAgY2hlY2ttYXJrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIG5vcm1hbC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPbkRhdGFQcmVwYXJlZCgpIHtcclxuICAgICAgICBzdXBlci5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFmdGVyT3BlbigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcmdzPzogYW55W10pIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9Ob2RlKClcclxuICAgICAgICBsZXQgdXJsID0gR2xvYmFsLlNldHRpbmcuVXJscy5pbnZpdGVVcmw7XHJcbiAgICAgICAgdXJsID0gdGhpcy5TcHJlYWRNb2RlbC5VcmwgfHwgdXJsXHJcbiAgICAgICAgdGhpcy5Jbml0UXJjb2RlKHVybClcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5yZWxlYXNlTG9jayhQb3BXbmROYW1lLlNwcmVhZCk7XHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbC5DaGVja1JlZEZsYWcoKVxyXG4gICAgICAgIHRoaXMuY3VyV2luID0gMVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBcnJheSA9IFtdXHJcbiAgICB9XHJcblxyXG59Il19