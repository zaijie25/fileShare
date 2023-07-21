
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/data/ErmjPathHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fce612sZEJEFrITBsOMMytS', 'ErmjPathHelper');
// ermj/Ermj/scripts/data/ErmjPathHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErmjAudioConst = void 0;
var ErmjPathHelper = /** @class */ (function () {
    function ErmjPathHelper() {
    }
    //图集路径
    ErmjPathHelper.prototype.atlasPath = function (atlas) {
        return ErmjPathHelper.gameTexturePath + atlas;
    };
    ErmjPathHelper.basePath = "";
    ErmjPathHelper.gameAudioPath = ErmjPathHelper.basePath + "sound/";
    ErmjPathHelper.gamePrefabsPath = ErmjPathHelper.basePath + "prefabs/";
    ErmjPathHelper.gameTexturePath = ErmjPathHelper.basePath + "texture/";
    ErmjPathHelper.gameEffectPath = ErmjPathHelper.basePath + "effect/";
    return ErmjPathHelper;
}());
exports.default = ErmjPathHelper;
var ErmjAudioConst = /** @class */ (function () {
    function ErmjAudioConst() {
    }
    //获取带性别的语音
    ErmjAudioConst.genderSoundPath = function (soundName, sex) {
        if (sex === void 0) { sex = 0; }
        var genderPath = this.audioHumanPath + "man/";
        if (sex == 1)
            genderPath = this.audioHumanPath + "woman/";
        return genderPath + soundName;
    };
    ErmjAudioConst.audioHumanPath = ErmjPathHelper.gameAudioPath + "human/";
    ErmjAudioConst.bgm = ErmjPathHelper.gameAudioPath + "bgm";
    ErmjAudioConst.commonAudio = {
        ButtonClick: ErmjPathHelper.gameAudioPath + "ButtonClick",
        Dice: ErmjPathHelper.gameAudioPath + "Dice",
        DrawCard: ErmjPathHelper.gameAudioPath + "DrawCard",
        Hu: ErmjPathHelper.gameAudioPath + "Hu",
        RewardLose: ErmjPathHelper.gameAudioPath + "Lose",
        OutCard: ErmjPathHelper.gameAudioPath + "OutCard",
        SeatDown: ErmjPathHelper.gameAudioPath + "Seat",
        RewardWin: ErmjPathHelper.gameAudioPath + "Win",
        ContinueGame: ErmjPathHelper.gameAudioPath + "ContinueGame",
        DealCard: ErmjPathHelper.gameAudioPath + "DealCard",
    };
    return ErmjAudioConst;
}());
exports.ErmjAudioConst = ErmjAudioConst;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcZGF0YVxcRXJtalBhdGhIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQVlBLENBQUM7SUFMRyxNQUFNO0lBQ0Msa0NBQVMsR0FBaEIsVUFBaUIsS0FBSztRQUVsQixPQUFPLGNBQWMsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQ2xELENBQUM7SUFWc0IsdUJBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCw0QkFBYSxHQUFHLGNBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ25ELDhCQUFlLEdBQUcsY0FBYyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDdkQsOEJBQWUsR0FBRyxjQUFjLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN2RCw2QkFBYyxHQUFHLGNBQWMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0lBT2hGLHFCQUFDO0NBWkQsQUFZQyxJQUFBO2tCQVpvQixjQUFjO0FBY25DO0lBQUE7SUF1QkEsQ0FBQztJQVBHLFVBQVU7SUFDSSw4QkFBZSxHQUE3QixVQUE4QixTQUFnQixFQUFFLEdBQWM7UUFBZCxvQkFBQSxFQUFBLE9BQWM7UUFDMUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUE7UUFDN0MsSUFBRyxHQUFHLElBQUksQ0FBQztZQUNQLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQTtRQUMvQyxPQUFPLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQXJCYSw2QkFBYyxHQUFHLGNBQWMsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQ3pELGtCQUFHLEdBQUcsY0FBYyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDM0MsMEJBQVcsR0FBRztRQUN4QixXQUFXLEVBQUUsY0FBYyxDQUFDLGFBQWEsR0FBRyxhQUFhO1FBQ3pELElBQUksRUFBRSxjQUFjLENBQUMsYUFBYSxHQUFHLE1BQU07UUFDM0MsUUFBUSxFQUFFLGNBQWMsQ0FBQyxhQUFhLEdBQUcsVUFBVTtRQUNuRCxFQUFFLEVBQUUsY0FBYyxDQUFDLGFBQWEsR0FBRyxJQUFJO1FBQ3ZDLFVBQVUsRUFBRSxjQUFjLENBQUMsYUFBYSxHQUFHLE1BQU07UUFDakQsT0FBTyxFQUFFLGNBQWMsQ0FBQyxhQUFhLEdBQUcsU0FBUztRQUNqRCxRQUFRLEVBQUUsY0FBYyxDQUFDLGFBQWEsR0FBRyxNQUFNO1FBQy9DLFNBQVMsRUFBRSxjQUFjLENBQUMsYUFBYSxHQUFHLEtBQUs7UUFDL0MsWUFBWSxFQUFFLGNBQWMsQ0FBQyxhQUFhLEdBQUcsY0FBYztRQUMzRCxRQUFRLEVBQUUsY0FBYyxDQUFDLGFBQWEsR0FBRyxVQUFVO0tBQ3RELENBQUE7SUFTTCxxQkFBQztDQXZCRCxBQXVCQyxJQUFBO0FBdkJZLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtalBhdGhIZWxwZXJ7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGJhc2VQYXRoID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2FtZUF1ZGlvUGF0aCA9IEVybWpQYXRoSGVscGVyLmJhc2VQYXRoICsgXCJzb3VuZC9cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2FtZVByZWZhYnNQYXRoID0gRXJtalBhdGhIZWxwZXIuYmFzZVBhdGggKyBcInByZWZhYnMvXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdhbWVUZXh0dXJlUGF0aCA9IEVybWpQYXRoSGVscGVyLmJhc2VQYXRoICsgXCJ0ZXh0dXJlL1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBnYW1lRWZmZWN0UGF0aCA9IEVybWpQYXRoSGVscGVyLmJhc2VQYXRoICsgXCJlZmZlY3QvXCI7XHJcblxyXG4gICAgLy/lm77pm4bot6/lvoRcclxuICAgIHB1YmxpYyBhdGxhc1BhdGgoYXRsYXMpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEVybWpQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIGF0bGFzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJtakF1ZGlvQ29uc3R7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1ZGlvSHVtYW5QYXRoID0gRXJtalBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiaHVtYW4vXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGJnbSA9IEVybWpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcImJnbVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBjb21tb25BdWRpbyA9IHtcclxuICAgICAgICBCdXR0b25DbGljazogRXJtalBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiQnV0dG9uQ2xpY2tcIixcclxuICAgICAgICBEaWNlOiBFcm1qUGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJEaWNlXCIsXHJcbiAgICAgICAgRHJhd0NhcmQ6IEVybWpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcIkRyYXdDYXJkXCIsXHJcbiAgICAgICAgSHU6IEVybWpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcIkh1XCIsXHJcbiAgICAgICAgUmV3YXJkTG9zZTogRXJtalBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiTG9zZVwiLFxyXG4gICAgICAgIE91dENhcmQ6IEVybWpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcIk91dENhcmRcIixcclxuICAgICAgICBTZWF0RG93bjogRXJtalBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiU2VhdFwiLFxyXG4gICAgICAgIFJld2FyZFdpbjogRXJtalBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiV2luXCIsXHJcbiAgICAgICAgQ29udGludWVHYW1lOiBFcm1qUGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJDb250aW51ZUdhbWVcIixcclxuICAgICAgICBEZWFsQ2FyZDogRXJtalBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiRGVhbENhcmRcIixcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ojrflj5bluKbmgKfliKvnmoTor63pn7NcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2VuZGVyU291bmRQYXRoKHNvdW5kTmFtZTpzdHJpbmcsIHNleDpudW1iZXIgPSAwKXtcclxuICAgICAgICBsZXQgZ2VuZGVyUGF0aCA9IHRoaXMuYXVkaW9IdW1hblBhdGggKyBcIm1hbi9cIlxyXG4gICAgICAgIGlmKHNleCA9PSAxKVxyXG4gICAgICAgICAgICBnZW5kZXJQYXRoID0gdGhpcy5hdWRpb0h1bWFuUGF0aCArIFwid29tYW4vXCJcclxuICAgICAgICByZXR1cm4gZ2VuZGVyUGF0aCArIHNvdW5kTmFtZTtcclxuICAgIH1cclxufVxyXG4iXX0=