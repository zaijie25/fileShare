"use strict";
cc._RF.push(module, '03c7euicuZNKbg0friNWWOo', 'DdzSelfInfoView');
// ddz/ddz/scripts/subView/DdzSelfInfoView.ts

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
var DdzBaseView_1 = require("./DdzBaseView");
var DdzDriver_1 = require("../DdzDriver");
/**
 * 玩家自己的个人信息view
 */
var DdzSelfInfoView = /** @class */ (function (_super) {
    __extends(DdzSelfInfoView, _super);
    function DdzSelfInfoView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    DdzSelfInfoView.prototype.initView = function () {
        this.nameLbl = this.getComponent('nameNode/nameLbl', cc.Label);
        this.idLbl = this.getComponent('nameNode/idLbl', cc.Label);
        this.headImg = this.getComponent('nameNode/mask/headImg', cc.Sprite);
        this.headBox = this.getComponent("nameNode/headBox", cc.Sprite);
        this.coinLbl = this.getComponent('coinNode/coinLbl', cc.Label);
        this.vip = this.getComponent("nameNode/vip", cc.Sprite);
    };
    DdzSelfInfoView.prototype.updateSelfInfo = function () {
        var player = Global.PlayerData;
        if (this.headBox) {
            DdzDriver_1.default.instance.LoadVipHeadKuang(this.headBox, player.headkuang);
        }
        this.loadHeadImg(player.headimg);
        this.nameLbl.string = player.nickname;
        this.idLbl.string = 'ID:' + player.uid;
        // this.idLbl.string = Global.Toolkit.formatPointStr(player.point, true);
        this.coinLbl.string = Global.Toolkit.formatPointStr(player.point, true);
        if (this.vip)
            Global.Toolkit.loadLocalVipIconGame(this.vip, player.vip);
    };
    DdzSelfInfoView.prototype.loadHeadImg = function (str) {
        this.headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(str);
    };
    DdzSelfInfoView.prototype.updateSelfPoint = function (point) {
        this.coinLbl.string = Global.Toolkit.formatPointStr(point, true);
    };
    return DdzSelfInfoView;
}(DdzBaseView_1.default));
exports.default = DdzSelfInfoView;

cc._RF.pop();