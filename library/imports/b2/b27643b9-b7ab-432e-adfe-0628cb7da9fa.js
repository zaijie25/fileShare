"use strict";
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