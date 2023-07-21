"use strict";
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