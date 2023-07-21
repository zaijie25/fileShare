"use strict";
cc._RF.push(module, 'e90c4kCQpJPA4ymbuSSolQe', 'MusicLayerView');
// hall/scripts/logic/hall/ui/playerInfo/MusicLayerView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var PlayerInfoModel_1 = require("../../../hallcommon/model/PlayerInfoModel");
var DiantaiItem_1 = require("./DiantaiItem");
/**
 * 音乐电台
 */
var MusicLayerView = /** @class */ (function (_super) {
    __extends(MusicLayerView, _super);
    function MusicLayerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 滚动容器
         */
        _this.scrollView = null;
        /**
         * 音乐集合
         */
        _this.musicArr = [];
        return _this;
    }
    MusicLayerView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
        this.scrollView = this.getComponent("scrollview", cc.ScrollView);
        this.copyItem = this.getChild("scrollview/item");
        if (this.copyItem) {
            this.copyItem.active = false;
        }
        this.InitScrollViewObj();
        this.initMusic();
    };
    MusicLayerView.prototype.initMusic = function () {
        var _this = this;
        var musicData = this.model.musicData;
        if (musicData) {
            this.transMusicData(musicData);
            return;
        }
        this.model.requestBgmList(function (data) {
            console.log(data);
            _this.transMusicData(data);
        });
    };
    MusicLayerView.prototype.transMusicData = function (musicData) {
        if (!musicData) {
            return;
        }
        var dataObj = this.model.diantaiMusicArr[0];
        this.musicArr.push(dataObj);
        var arrName = musicData.keys();
        for (var i = 0; i < musicData.size; i++) {
            var key = arrName.next().value;
            var entity = musicData.get(key);
            this.musicArr.push(entity);
        }
        for (var i = 0; i < this.musicArr.length; i++) {
            var diantaiObj = this.musicArr[i];
            diantaiObj.url = diantaiObj.file;
            if (CC_JSB) {
                diantaiObj.surl = this.model.getLocalFileName(diantaiObj.file);
            }
            if (i == this.musicArr.length - 1) {
                this.initItem();
            }
        }
    };
    MusicLayerView.prototype.initItem = function () {
        this.listView.allDatas = this.musicArr;
        this.listView.updateView();
    };
    MusicLayerView.prototype.InitScrollViewObj = function () {
        var _this = this;
        var item_setter = function (item, index) {
            var data = _this.listView.allDatas[index];
            item.getComponent(DiantaiItem_1.default).init(data);
        };
        this.listView = Global.UIHelper.addScrollViewCarmackComp(this.scrollView.node, this.copyItem, 5, 0, this, item_setter);
    };
    MusicLayerView.prototype.refreshUI = function () {
        this.listView.updateView();
    };
    MusicLayerView.prototype.onSubViewHide = function () {
        this.model.off(PlayerInfoModel_1.default.UpdateScrollView, this, this.refreshUI);
    };
    MusicLayerView.prototype.onSubViewShow = function () {
        this.refreshUI();
        this.model.on(PlayerInfoModel_1.default.UpdateScrollView, this, this.refreshUI);
    };
    return MusicLayerView;
}(ViewBase_1.default));
exports.default = MusicLayerView;

cc._RF.pop();