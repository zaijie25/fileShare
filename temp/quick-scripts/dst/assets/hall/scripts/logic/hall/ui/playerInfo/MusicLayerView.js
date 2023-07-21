
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/MusicLayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxNdXNpY0xheWVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQsNkVBQXVGO0FBQ3ZGLDZDQUF3QztBQUd4Qzs7R0FFRztBQUNIO0lBQTRDLGtDQUFRO0lBQXBEO1FBQUEscUVBc0dDO1FBcEdHOztXQUVHO1FBQ0gsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBRWhDOztXQUVHO1FBQ0gsY0FBUSxHQUFTLEVBQUUsQ0FBQzs7SUE0RnhCLENBQUM7SUF0RmEsaUNBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFFNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDL0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDakQsSUFBRyxJQUFJLENBQUMsUUFBUSxFQUNoQjtZQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtTQUMvQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBRUQsa0NBQVMsR0FBVDtRQUFBLGlCQVdDO1FBVkcsSUFBSSxTQUFTLEdBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBO1FBQzVELElBQUcsU0FBUyxFQUNaO1lBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM5QixPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMs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ZSxDQUFDLGdCQUFnQixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDdkUsQ0FBQztJQUdMLHFCQUFDO0FBQUQsQ0F0R0EsQUFzR0MsQ0F0RzJDLGtCQUFRLEdBc0duRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgUGxheWVySW5mb01vZGVsLCB7IEJnbUVudGl0eSB9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1BsYXllckluZm9Nb2RlbFwiO1xyXG5pbXBvcnQgRGlhbnRhaUl0ZW0gZnJvbSBcIi4vRGlhbnRhaUl0ZW1cIjtcclxuaW1wb3J0IFNjcm9sbFZpZXdDYXJtYWNrIGZyb20gXCIuLi8uLi8uLi9jb3JlL2NvbXBvbmVudC9TY3JvbGxWaWV3Q2FybWFja1wiO1xyXG5cclxuLyoqXHJcbiAqIOmfs+S5kOeUteWPsFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVzaWNMYXllclZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICBwcml2YXRlIG1vZGVsOlBsYXllckluZm9Nb2RlbFxyXG4gICAgLyoqXHJcbiAgICAgKiDmu5rliqjlrrnlmahcclxuICAgICAqL1xyXG4gICAgc2Nyb2xsVmlldzpjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmfs+S5kOmbhuWQiFxyXG4gICAgICovXHJcbiAgICBtdXNpY0FycjphbnlbXSA9IFtdO1xyXG5cclxuICAgIGNvcHlJdGVtIDpjYy5Ob2RlXHJcblxyXG5cclxuICAgIGxpc3RWaWV3IDpTY3JvbGxWaWV3Q2FybWFja1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlBsYXllckluZm9Nb2RlbFwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldyA9IHRoaXMuZ2V0Q29tcG9uZW50KFwic2Nyb2xsdmlld1wiLGNjLlNjcm9sbFZpZXcpXHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJzY3JvbGx2aWV3L2l0ZW1cIik7XHJcbiAgICAgICAgaWYodGhpcy5jb3B5SXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29weUl0ZW0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Jbml0U2Nyb2xsVmlld09iaigpXHJcbiAgICAgICAgdGhpcy5pbml0TXVzaWMoKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbml0TXVzaWMoKSB7XHJcbiAgICAgICAgbGV0IG11c2ljRGF0YSA6IE1hcDxzdHJpbmcsQmdtRW50aXR5PiA9IHRoaXMubW9kZWwubXVzaWNEYXRhXHJcbiAgICAgICAgaWYobXVzaWNEYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50cmFuc011c2ljRGF0YShtdXNpY0RhdGEpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsLnJlcXVlc3RCZ21MaXN0KChkYXRhIDpNYXA8c3RyaW5nLEJnbUVudGl0eT4pID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zTXVzaWNEYXRhKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgdHJhbnNNdXNpY0RhdGEobXVzaWNEYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFtdXNpY0RhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGFPYmogPSB0aGlzLm1vZGVsLmRpYW50YWlNdXNpY0FyclswXTtcclxuICAgICAgICB0aGlzLm11c2ljQXJyLnB1c2goZGF0YU9iaik7XHJcbiAgICAgICAgbGV0IGFyck5hbWUgPSBtdXNpY0RhdGEua2V5cygpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtdXNpY0RhdGEuc2l6ZTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IGFyck5hbWUubmV4dCgpLnZhbHVlIGFzIHN0cmluZztcclxuICAgICAgICAgICAgbGV0IGVudGl0eSA9IG11c2ljRGF0YS5nZXQoa2V5KTtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY0Fyci5wdXNoKGVudGl0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm11c2ljQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGRpYW50YWlPYmogPSB0aGlzLm11c2ljQXJyW2ldO1xyXG4gICAgICAgICAgICBkaWFudGFpT2JqLnVybCA9IGRpYW50YWlPYmouZmlsZTtcclxuICAgICAgICAgICAgaWYgKENDX0pTQil7XHJcbiAgICAgICAgICAgICAgICBkaWFudGFpT2JqLnN1cmwgPSB0aGlzLm1vZGVsLmdldExvY2FsRmlsZU5hbWUoZGlhbnRhaU9iai5maWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpID09IHRoaXMubXVzaWNBcnIubGVuZ3RoIC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRJdGVtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbml0SXRlbSgpe1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RWaWV3LmFsbERhdGFzID0gdGhpcy5tdXNpY0FycjtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3LnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBJbml0U2Nyb2xsVmlld09iaigpIHtcclxuICAgICAgICBsZXQgaXRlbV9zZXR0ZXIgPSAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmxpc3RWaWV3LmFsbERhdGFzW2luZGV4XTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRGlhbnRhaUl0ZW0pLmluaXQoZGF0YSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXcgPSBHbG9iYWwuVUlIZWxwZXIuYWRkU2Nyb2xsVmlld0Nhcm1hY2tDb21wKHRoaXMuc2Nyb2xsVmlldy5ub2RlLCB0aGlzLmNvcHlJdGVtLCA1LCAwLCB0aGlzLCBpdGVtX3NldHRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVJKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3LnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihQbGF5ZXJJbmZvTW9kZWwuVXBkYXRlU2Nyb2xsVmlldyx0aGlzLHRoaXMucmVmcmVzaFVJKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU3ViVmlld1Nob3coKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVJKClcclxuICAgICAgICB0aGlzLm1vZGVsLm9uKFBsYXllckluZm9Nb2RlbC5VcGRhdGVTY3JvbGxWaWV3LHRoaXMsdGhpcy5yZWZyZXNoVUkpXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn0iXX0=