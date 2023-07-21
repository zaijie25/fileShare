"use strict";
cc._RF.push(module, 'b79a5XQiDFAkL0ccVkKRvSo', 'BbwzPathHelper');
// bbwz/Bbwz/scripts/tool/BbwzPathHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzPathHelper = /** @class */ (function () {
    function BbwzPathHelper() {
    }
    //图集路径
    BbwzPathHelper.atlasPath = function (atlas) {
        return BbwzPathHelper.gameTexturePath + atlas;
    };
    BbwzPathHelper.basePath = "";
    BbwzPathHelper.gameAudioPath = BbwzPathHelper.basePath + "sound/";
    BbwzPathHelper.gamePrefabsPath = BbwzPathHelper.basePath + "prefabs/";
    BbwzPathHelper.gameTexturePath = BbwzPathHelper.basePath + "texture/";
    BbwzPathHelper.gameEffectPath = BbwzPathHelper.basePath + "effect/";
    BbwzPathHelper.gameSoundPath = BbwzPathHelper.basePath + "sound/";
    return BbwzPathHelper;
}());
exports.default = BbwzPathHelper;

cc._RF.pop();