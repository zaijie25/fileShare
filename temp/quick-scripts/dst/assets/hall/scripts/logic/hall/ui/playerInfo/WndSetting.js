
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/WndSetting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a59911MeUtNA7H+CydQiKK8', 'WndSetting');
// hall/scripts/logic/hall/ui/playerInfo/WndSetting.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var HallBtnHelper_1 = require("../hall/views/HallBtnHelper");
/**
 * 选择头像界面
 */
var WndSetting = /** @class */ (function (_super) {
    __extends(WndSetting, _super);
    function WndSetting() {
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
    WndSetting.prototype.onInit = function () {
        this.name = "WndSetting";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/SettingBox";
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndSetting.prototype.initView = function () {
        var musicNode = this.addCommonClick("musicSwitch", this.onMusicSwitch, this);
        var soundNode = this.addCommonClick("audioSwitch", this.onAudioSwitch, this);
        this.officalUrlText = this.getComponent("officalNode/url", cc.Label);
        this.save_bg = this.getComponent("officalNode/save_bg", cc.Sprite);
        this.addCommonClick("close", this.onCloseUI, this);
        this.addCommonClick("officalNode/btn", this.onBackUpGameBtn, this);
        this.musicNodeArr[0] = cc.find("control_shut", musicNode);
        this.musicNodeArr[1] = cc.find("control_open", musicNode);
        this.soundNodeArr[0] = cc.find("control_shut", soundNode);
        this.soundNodeArr[1] = cc.find("control_open", soundNode);
        this.versionLbl = this.getComponent("versionLabel", cc.Label);
        var verStr = Global.HotUpdateManager.nativeVersions["hall"]; //Global.Setting.SystemInfo.Version
        this.setVersionLblText(verStr);
        this.initOfficalUrl();
    };
    WndSetting.prototype.onBackUpGameBtn = function () {
        HallBtnHelper_1.default.WndBackUpOpen();
    };
    WndSetting.prototype.initOfficalUrl = function () {
        var _this = this;
        var url = Global.Setting.Urls.downLoadUrl;
        var arr = url.split("//");
        var arr1 = arr[arr.length - 1].split("/");
        var name = arr1[0];
        var baseWide = 123;
        this.officalUrlText.string = name;
        setTimeout(function () {
            if (cc.isValid(_this.save_bg.node)) {
                _this.save_bg.node.width = baseWide + _this.officalUrlText.node.width;
            }
        }, 20);
    };
    WndSetting.prototype.onCloseUI = function () {
        this.close();
    };
    WndSetting.prototype.onOpen = function () {
        this.UpdateUI();
        this.setVersionLblText();
    };
    /**
     * 更新界面
     */
    WndSetting.prototype.UpdateUI = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        this.musicNodeArr[0].active = !musicEnable;
        this.musicNodeArr[1].active = musicEnable;
        this.soundNodeArr[0].active = !soundEnable;
        this.soundNodeArr[1].active = soundEnable;
    };
    /**
     * 设置版本号文本
     * @param str
     */
    WndSetting.prototype.setVersionLblText = function (str) {
        this.versionLbl.string = "版本号:" + Global.Toolkit.genLoadingAppInfo();
    };
    /**
     * 音乐点击
     */
    WndSetting.prototype.onMusicSwitch = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        Global.Audio.setMusicEnable(!musicEnable);
        this.UpdateUI();
    };
    /**
     * 音效点击
     */
    WndSetting.prototype.onAudioSwitch = function () {
        var soundEnable = Global.Setting.settingData.soundEnable;
        Global.Audio.setSoundEnable(!soundEnable);
        this.UpdateUI();
    };
    return WndSetting;
}(WndBase_1.default));
exports.default = WndSetting;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxXbmRTZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUErQztBQUUvQyw2REFBd0Q7QUFFeEQ7O0dBRUc7QUFDSDtJQUF3Qyw4QkFBTztJQUEvQztRQUFBLHFFQTJIQztRQWpIRzs7V0FFRztRQUNILGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCOztXQUVHO1FBQ0gsa0JBQVksR0FBYSxFQUFFLENBQUM7UUFDNUI7O1dBRUc7UUFDSCxrQkFBWSxHQUFhLEVBQUUsQ0FBQzs7SUFzR2hDLENBQUM7SUFwR2EsMkJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsdUNBQXVDLENBQUM7UUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBb0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRVMsNkJBQVEsR0FBbEI7UUFFSSxJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JGLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFC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QUMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBRTFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssc0NBQWlCLEdBQXpCLFVBQTBCLEdBQVk7UUFFbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtJQUN4RSxDQUFDO0lBRUQ7O09BRUc7SUFDSyxrQ0FBYSxHQUFyQjtRQUNJLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxrQ0FBYSxHQUFyQjtRQUNJLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQTNIQSxBQTJIQyxDQTNIdUMsaUJBQU8sR0EySDlDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuaW1wb3J0IEhhbGxCdG5IZWxwZXIgZnJvbSBcIi4uL2hhbGwvdmlld3MvSGFsbEJ0bkhlbHBlclwiO1xyXG5cclxuLyoqXHJcbiAqIOmAieaLqeWktOWDj+eVjOmdolxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kU2V0dGluZyBleHRlbmRzIFduZEJhc2UgXHJcbntcclxuXHJcblxyXG4gICAgICAvKipcclxuICAgICAqIOaVsOaNruWvueixoVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vZGVsOiBQbGF5ZXJJbmZvTW9kZWw7XHJcbiAgICBwcml2YXRlIG9mZmljYWxVcmxUZXh0OmNjLkxhYmVsXHJcbiAgICBwcml2YXRlIHNhdmVfYmcgOmNjLlNwcml0ZVxyXG4gICAgLyoqXHJcbiAgICAgKiDniYjmnKzlj7fmlofmnKxcclxuICAgICAqL1xyXG4gICAgdmVyc2lvbkxibDpjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOmfs+S5kOiuvue9ruiKgueCuembhuWQiFxyXG4gICAgICovXHJcbiAgICBtdXNpY05vZGVBcnI6Y2MuTm9kZVtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOmfs+aViOiuvue9ruiKgueCuembhuWQiFxyXG4gICAgICovXHJcbiAgICBzb3VuZE5vZGVBcnI6Y2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFNldHRpbmdcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1BsYXllckluZm8vU2V0dGluZ0JveFwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8UGxheWVySW5mb01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJQbGF5ZXJJbmZvTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbXVzaWNOb2RlOmNjLk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibXVzaWNTd2l0Y2hcIiwgdGhpcy5vbk11c2ljU3dpdGNoLCB0aGlzKTtcclxuICAgICAgICB2YXIgc291bmROb2RlOmNjLk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYXVkaW9Td2l0Y2hcIiwgdGhpcy5vbkF1ZGlvU3dpdGNoLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm9mZmljYWxVcmxUZXh0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJvZmZpY2FsTm9kZS91cmxcIixjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnNhdmVfYmcgPSB0aGlzLmdldENvbXBvbmVudChcIm9mZmljYWxOb2RlL3NhdmVfYmdcIixjYy5TcHJpdGUpXHJcblxyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIiwgdGhpcy5vbkNsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJvZmZpY2FsTm9kZS9idG5cIix0aGlzLm9uQmFja1VwR2FtZUJ0bix0aGlzKVxyXG4gICAgICAgIHRoaXMubXVzaWNOb2RlQXJyWzBdID0gY2MuZmluZChcImNvbnRyb2xfc2h1dFwiLCBtdXNpY05vZGUpO1xyXG4gICAgICAgIHRoaXMubXVzaWNOb2RlQXJyWzFdID0gY2MuZmluZChcImNvbnRyb2xfb3BlblwiLCBtdXNpY05vZGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc291bmROb2RlQXJyWzBdID0gY2MuZmluZChcImNvbnRyb2xfc2h1dFwiLCBzb3VuZE5vZGUpO1xyXG4gICAgICAgIHRoaXMuc291bmROb2RlQXJyWzFdID0gY2MuZmluZChcImNvbnRyb2xfb3BlblwiLCBzb3VuZE5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnNpb25MYmwgPSB0aGlzLmdldENvbXBvbmVudChcInZlcnNpb25MYWJlbFwiLGNjLkxhYmVsKVxyXG5cclxuICAgICAgICBsZXQgdmVyU3RyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIubmF0aXZlVmVyc2lvbnNbXCJoYWxsXCJdOyAvL0dsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uVmVyc2lvblxyXG4gICAgICAgIHRoaXMuc2V0VmVyc2lvbkxibFRleHQodmVyU3RyKTtcclxuICAgICAgICB0aGlzLmluaXRPZmZpY2FsVXJsKClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQmFja1VwR2FtZUJ0bigpe1xyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kQmFja1VwT3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdE9mZmljYWxVcmwoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmw9IEdsb2JhbC5TZXR0aW5nLlVybHMuZG93bkxvYWRVcmw7XHJcbiAgICAgICAgbGV0IGFyciA9IHVybC5zcGxpdChcIi8vXCIpO1xyXG4gICAgICAgIGxldCBhcnIxID0gYXJyW2Fyci5sZW5ndGggLSAxXS5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBhcnIxWzBdO1xyXG4gICAgICAgIGxldCBiYXNlV2lkZSA9IDEyM1xyXG4gICAgICAgIHRoaXMub2ZmaWNhbFVybFRleHQuc3RyaW5nID0gIG5hbWU7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuc2F2ZV9iZy5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlX2JnLm5vZGUud2lkdGggPSBiYXNlV2lkZSArdGhpcy5vZmZpY2FsVXJsVGV4dC5ub2RlLndpZHRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMCk7XHJcbiAgICB9XHJcbiAgICBvbkNsb3NlVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKVxyXG4gICAgfVxyXG5cclxuICAgIG9uT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVVSSgpO1xyXG4gICAgICAgIHRoaXMuc2V0VmVyc2lvbkxibFRleHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeVjOmdolxyXG4gICAgICovXHJcbiAgICBVcGRhdGVVSSgpe1xyXG4gICAgICAgIGxldCBtdXNpY0VuYWJsZSA9IEdsb2JhbC5TZXR0aW5nLnNldHRpbmdEYXRhLm11c2ljRW5hYmxlO1xyXG4gICAgICAgIGxldCBzb3VuZEVuYWJsZSA9IEdsb2JhbC5TZXR0aW5nLnNldHRpbmdEYXRhLnNvdW5kRW5hYmxlO1xyXG5cclxuICAgICAgICB0aGlzLm11c2ljTm9kZUFyclswXS5hY3RpdmUgPSAhbXVzaWNFbmFibGU7XHJcbiAgICAgICAgdGhpcy5tdXNpY05vZGVBcnJbMV0uYWN0aXZlID0gbXVzaWNFbmFibGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zb3VuZE5vZGVBcnJbMF0uYWN0aXZlID0gIXNvdW5kRW5hYmxlO1xyXG4gICAgICAgIHRoaXMuc291bmROb2RlQXJyWzFdLmFjdGl2ZSA9IHNvdW5kRW5hYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u54mI5pys5Y+35paH5pysXHJcbiAgICAgKiBAcGFyYW0gc3RyIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFZlcnNpb25MYmxUZXh0KHN0cj86IHN0cmluZyl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy52ZXJzaW9uTGJsLnN0cmluZyA9IFwi54mI5pys5Y+3OlwiICsgR2xvYmFsLlRvb2xraXQuZ2VuTG9hZGluZ0FwcEluZm8oKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Z+z5LmQ54K55Ye7XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25NdXNpY1N3aXRjaCgpe1xyXG4gICAgICAgIGxldCBtdXNpY0VuYWJsZSA9IEdsb2JhbC5TZXR0aW5nLnNldHRpbmdEYXRhLm11c2ljRW5hYmxlO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5zZXRNdXNpY0VuYWJsZSghbXVzaWNFbmFibGUpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmfs+aViOeCueWHu1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQXVkaW9Td2l0Y2goKXtcclxuICAgICAgICBsZXQgc291bmRFbmFibGUgPSBHbG9iYWwuU2V0dGluZy5zZXR0aW5nRGF0YS5zb3VuZEVuYWJsZTtcclxuICAgICAgICBHbG9iYWwuQXVkaW8uc2V0U291bmRFbmFibGUoIXNvdW5kRW5hYmxlKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcblxyXG59Il19