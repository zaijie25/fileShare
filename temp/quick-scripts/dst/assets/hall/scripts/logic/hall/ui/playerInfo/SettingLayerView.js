
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/SettingLayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2502a4qM+lAG4CucOUqhA40', 'SettingLayerView');
// hall/scripts/logic/hall/ui/playerInfo/SettingLayerView.ts

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
var HallBtnHelper_1 = require("../hall/views/HallBtnHelper");
/**
 * 选择头像界面
 */
var SettingLayerView = /** @class */ (function (_super) {
    __extends(SettingLayerView, _super);
    function SettingLayerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 版本号文本
         */
        _this.versionLbl = null;
        /**
         * 音乐设置节点集合
         */
        _this.musicNodeArr = [];
        /**
         * 音效设置节点集合
         */
        _this.soundNodeArr = [];
        return _this;
    }
    SettingLayerView.prototype.initView = function () {
        var musicNode = this.addCommonClick("musicSwitch", this.onMusicSwitch, this);
        var soundNode = this.addCommonClick("audioSwitch", this.onAudioSwitch, this);
        this.officalUrlText = this.getComponent("officalNode/url", cc.Label);
        this.addCommonClick("officalNode/btn", this.onBackUpGameBtn, this);
        this.musicNodeArr[0] = cc.find("control_shut", musicNode);
        this.musicNodeArr[1] = cc.find("control_open", musicNode);
        this.soundNodeArr[0] = cc.find("control_shut", soundNode);
        this.soundNodeArr[1] = cc.find("control_open", soundNode);
        this.versionLbl = this.getComponent("versionLbl", cc.Label);
        var verStr = Global.HotUpdateManager.nativeVersions["hall"]; //Global.Setting.SystemInfo.Version
        this.setVersionLblText(verStr);
        this.initOfficalUrl();
    };
    SettingLayerView.prototype.onSubViewShow = function () {
        this.UpdateUI();
        this.setVersionLblText();
    };
    /**
     * 更新界面
     */
    SettingLayerView.prototype.UpdateUI = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        this.musicNodeArr[0].active = !musicEnable;
        this.musicNodeArr[1].active = musicEnable;
        this.soundNodeArr[0].active = !soundEnable;
        this.soundNodeArr[1].active = soundEnable;
    };
    SettingLayerView.prototype.onBackUpGameBtn = function () {
        HallBtnHelper_1.default.WndBackUpOpen();
    };
    /**
     * 设置版本号文本
     * @param str
     */
    SettingLayerView.prototype.setVersionLblText = function (str) {
        this.versionLbl.string = "版本号:" + Global.Toolkit.genAppInfo() + "•" + Global.PlayerData.merge_type;
    };
    SettingLayerView.prototype.initOfficalUrl = function () {
        var url = Global.Setting.Urls.downLoadUrl;
        var arr = url.split("//");
        var arr1 = arr[arr.length - 1].split("/");
        var name = arr1[0];
        var baseWide = 123;
        this.officalUrlText.string = name;
        // setTimeout(() => {
        //     if (cc.isValid(this.save_bg.node)) {
        //         this.save_bg.node.width = baseWide +this.officalUrlText.node.width
        //     }
        // }, 20);
    };
    /**
     * 音乐点击
     */
    SettingLayerView.prototype.onMusicSwitch = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        Global.Audio.setMusicEnable(!musicEnable);
        this.UpdateUI();
    };
    /**
     * 音效点击
     */
    SettingLayerView.prototype.onAudioSwitch = function () {
        var soundEnable = Global.Setting.settingData.soundEnable;
        Global.Audio.setSoundEnable(!soundEnable);
        this.UpdateUI();
    };
    return SettingLayerView;
}(ViewBase_1.default));
exports.default = SettingLayerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxTZXR0aW5nTGF5ZXJWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCw2REFBd0Q7QUFFeEQ7O0dBRUc7QUFDSDtJQUE4QyxvQ0FBUTtJQUF0RDtRQUFBLHFFQXlHQztRQXRHRzs7V0FFRztRQUNILGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCOztXQUVHO1FBQ0gsa0JBQVksR0FBYSxFQUFFLENBQUM7UUFDNUI7O1dBRUc7UUFDSCxrQkFBWSxHQUFhLEVBQUUsQ0FBQzs7SUEyRmhDLENBQUM7SUF2RmEsbUNBQVEsR0FBbEI7UUFFSSxJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JGLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuRSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFDLElBQUksQ0FBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFFaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxD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QyxXQUFXLENBQUM7UUFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0F6R0EsQUF5R0MsQ0F6RzZDLGtCQUFRLEdBeUdyRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgSGFsbEJ0bkhlbHBlciBmcm9tIFwiLi4vaGFsbC92aWV3cy9IYWxsQnRuSGVscGVyXCI7XHJcblxyXG4vKipcclxuICog6YCJ5oup5aS05YOP55WM6Z2iXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nTGF5ZXJWaWV3IGV4dGVuZHMgVmlld0Jhc2UgXHJcbntcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeJiOacrOWPt+aWh+acrFxyXG4gICAgICovXHJcbiAgICB2ZXJzaW9uTGJsOmNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog6Z+z5LmQ6K6+572u6IqC54K56ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIG11c2ljTm9kZUFycjpjYy5Ob2RlW10gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICog6Z+z5pWI6K6+572u6IqC54K56ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIHNvdW5kTm9kZUFycjpjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIG9mZmljYWxVcmxUZXh0OmNjLkxhYmVsXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbXVzaWNOb2RlOmNjLk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibXVzaWNTd2l0Y2hcIiwgdGhpcy5vbk11c2ljU3dpdGNoLCB0aGlzKTtcclxuICAgICAgICB2YXIgc291bmROb2RlOmNjLk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYXVkaW9Td2l0Y2hcIiwgdGhpcy5vbkF1ZGlvU3dpdGNoLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm9mZmljYWxVcmxUZXh0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJvZmZpY2FsTm9kZS91cmxcIixjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwib2ZmaWNhbE5vZGUvYnRuXCIsdGhpcy5vbkJhY2tVcEdhbWVCdG4sdGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5tdXNpY05vZGVBcnJbMF0gPSBjYy5maW5kKFwiY29udHJvbF9zaHV0XCIsIG11c2ljTm9kZSk7XHJcbiAgICAgICAgdGhpcy5tdXNpY05vZGVBcnJbMV0gPSBjYy5maW5kKFwiY29udHJvbF9vcGVuXCIsIG11c2ljTm9kZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zb3VuZE5vZGVBcnJbMF0gPSBjYy5maW5kKFwiY29udHJvbF9zaHV0XCIsIHNvdW5kTm9kZSk7XHJcbiAgICAgICAgdGhpcy5zb3VuZE5vZGVBcnJbMV0gPSBjYy5maW5kKFwiY29udHJvbF9vcGVuXCIsIHNvdW5kTm9kZSk7XHJcblxyXG4gICAgICAgIHRoaXMudmVyc2lvbkxibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwidmVyc2lvbkxibFwiLGNjLkxhYmVsKVxyXG5cclxuICAgICAgICBsZXQgdmVyU3RyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIubmF0aXZlVmVyc2lvbnNbXCJoYWxsXCJdOyAvL0dsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uVmVyc2lvblxyXG4gICAgICAgIHRoaXMuc2V0VmVyc2lvbkxibFRleHQodmVyU3RyKTtcclxuICAgICAgICB0aGlzLmluaXRPZmZpY2FsVXJsKClcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdTaG93KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICAgICAgdGhpcy5zZXRWZXJzaW9uTGJsVGV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIFVwZGF0ZVVJKCl7XHJcbiAgICAgICAgbGV0IG11c2ljRW5hYmxlID0gR2xvYmFsLlNldHRpbmcuc2V0dGluZ0RhdGEubXVzaWNFbmFibGU7XHJcbiAgICAgICAgbGV0IHNvdW5kRW5hYmxlID0gR2xvYmFsLlNldHRpbmcuc2V0dGluZ0RhdGEuc291bmRFbmFibGU7XHJcblxyXG4gICAgICAgIHRoaXMubXVzaWNOb2RlQXJyWzBdLmFjdGl2ZSA9ICFtdXNpY0VuYWJsZTtcclxuICAgICAgICB0aGlzLm11c2ljTm9kZUFyclsxXS5hY3RpdmUgPSBtdXNpY0VuYWJsZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNvdW5kTm9kZUFyclswXS5hY3RpdmUgPSAhc291bmRFbmFibGU7XHJcbiAgICAgICAgdGhpcy5zb3VuZE5vZGVBcnJbMV0uYWN0aXZlID0gc291bmRFbmFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJhY2tVcEdhbWVCdG4oKXtcclxuICAgICAgICBIYWxsQnRuSGVscGVyLlduZEJhY2tVcE9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rueJiOacrOWPt+aWh+acrFxyXG4gICAgICogQHBhcmFtIHN0ciBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRWZXJzaW9uTGJsVGV4dChzdHI/OiBzdHJpbmcpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudmVyc2lvbkxibC5zdHJpbmcgPSBcIueJiOacrOWPtzpcIiArIEdsb2JhbC5Ub29sa2l0LmdlbkFwcEluZm8oKSArIFwi4oCiXCIrR2xvYmFsLlBsYXllckRhdGEubWVyZ2VfdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRPZmZpY2FsVXJsKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdXJsPSBHbG9iYWwuU2V0dGluZy5VcmxzLmRvd25Mb2FkVXJsO1xyXG4gICAgICAgIGxldCBhcnIgPSB1cmwuc3BsaXQoXCIvL1wiKTtcclxuICAgICAgICBsZXQgYXJyMSA9IGFyclthcnIubGVuZ3RoIC0gMV0uc3BsaXQoXCIvXCIpO1xyXG4gICAgICAgIGxldCBuYW1lID0gYXJyMVswXTtcclxuICAgICAgICBsZXQgYmFzZVdpZGUgPSAxMjNcclxuICAgICAgICB0aGlzLm9mZmljYWxVcmxUZXh0LnN0cmluZyA9ICBuYW1lO1xyXG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLnNhdmVfYmcubm9kZSkpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2F2ZV9iZy5ub2RlLndpZHRoID0gYmFzZVdpZGUgK3RoaXMub2ZmaWNhbFVybFRleHQubm9kZS53aWR0aFxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSwgMjApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Z+z5LmQ54K55Ye7XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25NdXNpY1N3aXRjaCgpe1xyXG4gICAgICAgIGxldCBtdXNpY0VuYWJsZSA9IEdsb2JhbC5TZXR0aW5nLnNldHRpbmdEYXRhLm11c2ljRW5hYmxlO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5zZXRNdXNpY0VuYWJsZSghbXVzaWNFbmFibGUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmfs+aViOeCueWHu1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQXVkaW9Td2l0Y2goKXtcclxuICAgICAgICBsZXQgc291bmRFbmFibGUgPSBHbG9iYWwuU2V0dGluZy5zZXR0aW5nRGF0YS5zb3VuZEVuYWJsZTtcclxuICAgICAgICBHbG9iYWwuQXVkaW8uc2V0U291bmRFbmFibGUoIXNvdW5kRW5hYmxlKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcblxyXG59Il19