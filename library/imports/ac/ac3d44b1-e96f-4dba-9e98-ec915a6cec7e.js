"use strict";
cc._RF.push(module, 'ac3d4Sx6W9Nup6Y7JFabOx+', 'RankItem');
// hall/scripts/logic/hall/ui/rank/RankItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//游戏列表item
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankItem = /** @class */ (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LabelName = null;
        _this.LabelID = null;
        _this.LabelCount = null;
        _this.selfRankLab = null;
        _this.headImg = null;
        _this.selfRankSprite = null;
        return _this;
    }
    RankItem.prototype.onLoad = function () {
        this.headImg.on(cc.Node.EventType.TOUCH_END, this.onHeadClick, this);
    };
    RankItem.prototype.Init = function (data) {
        if (Number(data.headimg)) {
            var headSprite = this.headImg.getComponent(cc.Sprite);
            var tempFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
            headSprite.spriteFrame = tempFrame;
        }
        else {
            Global.Toolkit.loadWebPic(this.headImg, data.headimg);
        }
        var LabelStr = data.uid + "";
        this.LabelID.string = Global.Toolkit.formateStrWithAsterisk(LabelStr, LabelStr.length - 4, 1);
        this.LabelName.string = Global.Toolkit.substrEndWithElli(data.name, 8);
        this.LabelCount.string = Global.Toolkit.GetText(data.point);
        this.selfRankLab.string = (data.rank == null) ? "W" : data.rank;
        var self = this;
        this.selfRankLab.node.active = false;
        var atlasPath = "hall/texture/rank/rankAtlas";
        if (data.rank > 3) {
            //大于三 排名后紫色有背景图，红色没有背景图
            if (Global.Setting.SkinConfig.isPurple) {
                Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_04", null, false);
            }
            else {
                self.selfRankSprite.spriteFrame = null;
            }
            self.selfRankLab.node.active = true;
        }
        else {
            //中国红前三是图标和文本一起组成，需要显示
            if (Global.Setting.SkinConfig.isRed) {
                self.selfRankLab.node.active = true;
            }
            switch (data.rank) {
                case 1:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_01", null, false);
                    break;
                case 2:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_02", null, false);
                    break;
                case 3:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_03", null, false);
                    break;
            }
        }
    };
    RankItem.prototype.onHeadClick = function () {
        //Global.UI.getWindow<WndRank>("WndRank").RefreshInfoPanel()
    };
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "LabelName", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "LabelID", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "LabelCount", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "selfRankLab", void 0);
    __decorate([
        property(cc.Node)
    ], RankItem.prototype, "headImg", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankItem.prototype, "selfRankSprite", void 0);
    RankItem = __decorate([
        ccclass
    ], RankItem);
    return RankItem;
}(cc.Component));
exports.default = RankItem;

cc._RF.pop();