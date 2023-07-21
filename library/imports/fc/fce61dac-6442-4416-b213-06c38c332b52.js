"use strict";
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