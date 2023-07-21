
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/data/DdzPathHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'db83ft++ABABbFWuCJBHEfm', 'DdzPathHelper');
// ddz/ddz/scripts/data/DdzPathHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DdzAudioConst = void 0;
var DdzPathHelper = /** @class */ (function () {
    function DdzPathHelper() {
    }
    //图集路径
    DdzPathHelper.prototype.atlasPath = function (atlas) {
        return DdzPathHelper.gameTexturePath + atlas;
    };
    DdzPathHelper.basePath = "";
    DdzPathHelper.configPath = DdzPathHelper.basePath + "config/";
    DdzPathHelper.gameAudioPath = DdzPathHelper.basePath + "sound/";
    DdzPathHelper.gamePrefabsPath = DdzPathHelper.basePath + "prefabs/";
    DdzPathHelper.gameTexturePath = DdzPathHelper.basePath + "texture/";
    return DdzPathHelper;
}());
exports.default = DdzPathHelper;
var DdzAudioConst = /** @class */ (function () {
    function DdzAudioConst() {
    }
    //获取带性别的语音
    DdzAudioConst.genderSoundPath = function (soundName, sex) {
        if (sex === void 0) { sex = 0; }
        var genderPath = "sound/man/";
        if (sex == 1)
            genderPath = "sound/woman/";
        return DdzPathHelper.basePath + genderPath + soundName;
    };
    DdzAudioConst.audioCommonPath = DdzPathHelper.gameAudioPath + "common/";
    DdzAudioConst.audioCardTypePath = DdzPathHelper.gameAudioPath + "cardType/";
    DdzAudioConst.Bgm1 = DdzPathHelper.gameAudioPath + "background";
    DdzAudioConst.Bgm2 = DdzPathHelper.gameAudioPath + "afterboom";
    DdzAudioConst.commonAudio = {
        ButtonClick: "ButtonClick",
    };
    // 男女声
    DdzAudioConst.CallLandordArr = ["cs1", "cs2", "cs3"];
    DdzAudioConst.NotCallLandordArr = ["cs0"];
    DdzAudioConst.WarningOneArr = ["other1"];
    DdzAudioConst.WarningTwoArr = ["other2"];
    DdzAudioConst.Mult = "jiabei";
    DdzAudioConst.NotMult = "bujiabei";
    DdzAudioConst.Spring = "chuntian1";
    DdzAudioConst.HurryUp = "dida";
    DdzAudioConst.LordWin = "play_lord_win";
    DdzAudioConst.FarmerWin = "play_farmer_win";
    DdzAudioConst.LandlordPokers = "sendcard";
    DdzAudioConst.WinGame = "wingame";
    DdzAudioConst.LoseGame = "losegame";
    DdzAudioConst.DispatchPoker = "dispatch";
    DdzAudioConst.SelectPoker = "xuanpai";
    DdzAudioConst.CancelSelect = "pop_craked";
    DdzAudioConst.SpringAudio = "chuntian";
    DdzAudioConst.WarningAudio = "common_alert";
    return DdzAudioConst;
}());
exports.DdzAudioConst = DdzAudioConst;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGRhdGFcXERkelBhdGhIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQWFBLENBQUM7SUFMRyxNQUFNO0lBQ0MsaUNBQVMsR0FBaEIsVUFBaUIsS0FBSztRQUVsQixPQUFPLGFBQWEsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQ2pELENBQUM7SUFYc0Isc0JBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCx3QkFBVSxHQUFHLGFBQWEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0lBQ2hELDJCQUFhLEdBQUcsYUFBYSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDbEQsNkJBQWUsR0FBRyxhQUFhLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0RCw2QkFBZSxHQUFHLGFBQWEsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBUWpGLG9CQUFDO0NBYkQsQUFhQyxJQUFBO2tCQWJvQixhQUFhO0FBZWxDO0lBQUE7SUF1Q0EsQ0FBQztJQVJHLFVBQVU7SUFDSSw2QkFBZSxHQUE3QixVQUE4QixTQUFnQixFQUFFLEdBQWM7UUFBZCxvQkFBQSxFQUFBLE9BQWM7UUFFMUQsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFBO1FBQzdCLElBQUcsR0FBRyxJQUFJLENBQUM7WUFDUCxVQUFVLEdBQUcsY0FBYyxDQUFBO1FBQy9CLE9BQU8sYUFBYSxDQUFDLFFBQVEsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzNELENBQUM7SUFyQ2EsNkJBQWUsR0FBRyxhQUFhLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUMxRCwrQkFBaUIsR0FBRyxhQUFhLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztJQUM5RCxrQkFBSSxHQUFHLGFBQWEsQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO0lBQ2xELGtCQUFJLEdBQUcsYUFBYSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7SUFDakQseUJBQVcsR0FBRztRQUN4QixXQUFXLEVBQUUsYUFBYTtLQUM3QixDQUFBO0lBQ0QsTUFBTTtJQUNRLDRCQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLCtCQUFpQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsMkJBQWEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLDJCQUFhLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQixrQkFBSSxHQUFHLFFBQVEsQ0FBQztJQUNoQixxQkFBTyxHQUFHLFVBQVUsQ0FBQztJQUNyQixvQkFBTSxHQUFHLFdBQVcsQ0FBQztJQUdyQixxQkFBTyxHQUFHLE1BQU0sQ0FBQztJQUNqQixxQkFBTyxHQUFHLGVBQWUsQ0FBQztJQUMxQix1QkFBUyxHQUFHLGlCQUFpQixDQUFDO0lBQzlCLDRCQUFjLEdBQUcsVUFBVSxDQUFDO0lBQzVCLHFCQUFPLEdBQUcsU0FBUyxDQUFDO0lBQ3BCLHNCQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLDJCQUFhLEdBQUcsVUFBVSxDQUFDO0lBQzNCLHlCQUFXLEdBQUcsU0FBUyxDQUFDO0lBQ3hCLDBCQUFZLEdBQUcsWUFBWSxDQUFDO0lBQzVCLHlCQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLDBCQUFZLEdBQUcsY0FBYyxDQUFDO0lBV2hELG9CQUFDO0NBdkNELEFBdUNDLElBQUE7QUF2Q1ksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpQYXRoSGVscGVye1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBiYXNlUGF0aCA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGNvbmZpZ1BhdGggPSBEZHpQYXRoSGVscGVyLmJhc2VQYXRoICsgXCJjb25maWcvXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdhbWVBdWRpb1BhdGggPSBEZHpQYXRoSGVscGVyLmJhc2VQYXRoICsgXCJzb3VuZC9cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2FtZVByZWZhYnNQYXRoID0gRGR6UGF0aEhlbHBlci5iYXNlUGF0aCArIFwicHJlZmFicy9cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2FtZVRleHR1cmVQYXRoID0gRGR6UGF0aEhlbHBlci5iYXNlUGF0aCArIFwidGV4dHVyZS9cIjtcclxuXHJcblxyXG4gICAgLy/lm77pm4bot6/lvoRcclxuICAgIHB1YmxpYyBhdGxhc1BhdGgoYXRsYXMpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIERkelBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgYXRsYXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZHpBdWRpb0NvbnN0e1xyXG4gICAgcHVibGljIHN0YXRpYyBhdWRpb0NvbW1vblBhdGggPSBEZHpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcImNvbW1vbi9cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgYXVkaW9DYXJkVHlwZVBhdGggPSBEZHpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcImNhcmRUeXBlL1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBCZ20xID0gRGR6UGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJiYWNrZ3JvdW5kXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJnbTIgPSBEZHpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcImFmdGVyYm9vbVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBjb21tb25BdWRpbyA9IHtcclxuICAgICAgICBCdXR0b25DbGljazogXCJCdXR0b25DbGlja1wiLFxyXG4gICAgfVxyXG4gICAgLy8g55S35aWz5aOwXHJcbiAgICBwdWJsaWMgc3RhdGljIENhbGxMYW5kb3JkQXJyID0gW1wiY3MxXCIsIFwiY3MyXCIsIFwiY3MzXCJdOyAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBOb3RDYWxsTGFuZG9yZEFyciA9IFtcImNzMFwiXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgV2FybmluZ09uZUFyciA9IFtcIm90aGVyMVwiXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgV2FybmluZ1R3b0FyciA9IFtcIm90aGVyMlwiXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgTXVsdCA9IFwiamlhYmVpXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIE5vdE11bHQgPSBcImJ1amlhYmVpXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNwcmluZyA9IFwiY2h1bnRpYW4xXCI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSHVycnlVcCA9IFwiZGlkYVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBMb3JkV2luID0gXCJwbGF5X2xvcmRfd2luXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEZhcm1lcldpbiA9IFwicGxheV9mYXJtZXJfd2luXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIExhbmRsb3JkUG9rZXJzID0gXCJzZW5kY2FyZFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBXaW5HYW1lID0gXCJ3aW5nYW1lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIExvc2VHYW1lID0gXCJsb3NlZ2FtZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBEaXNwYXRjaFBva2VyID0gXCJkaXNwYXRjaFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTZWxlY3RQb2tlciA9IFwieHVhbnBhaVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBDYW5jZWxTZWxlY3QgPSBcInBvcF9jcmFrZWRcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU3ByaW5nQXVkaW8gPSBcImNodW50aWFuXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdhcm5pbmdBdWRpbyA9IFwiY29tbW9uX2FsZXJ0XCI7XHJcblxyXG4gICAgXHJcbiAgICAvL+iOt+WPluW4puaAp+WIq+eahOivremfs1xyXG4gICAgcHVibGljIHN0YXRpYyBnZW5kZXJTb3VuZFBhdGgoc291bmROYW1lOnN0cmluZywgc2V4Om51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdlbmRlclBhdGggPSBcInNvdW5kL21hbi9cIlxyXG4gICAgICAgIGlmKHNleCA9PSAxKVxyXG4gICAgICAgICAgICBnZW5kZXJQYXRoID0gXCJzb3VuZC93b21hbi9cIlxyXG4gICAgICAgIHJldHVybiBEZHpQYXRoSGVscGVyLmJhc2VQYXRoICsgZ2VuZGVyUGF0aCArIHNvdW5kTmFtZTtcclxuICAgIH1cclxufVxyXG4iXX0=