
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/tool/BbwzPathHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcdG9vbFxcQmJ3elBhdGhIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBWUEsQ0FBQztJQUpHLE1BQU07SUFDUSx3QkFBUyxHQUF2QixVQUF3QixLQUFLO1FBQ3pCLE9BQU8sY0FBYyxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQVZzQix1QkFBUSxHQUFHLEVBQUUsQ0FBQztJQUNkLDRCQUFhLEdBQUcsY0FBYyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDbkQsOEJBQWUsR0FBRyxjQUFjLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN2RCw4QkFBZSxHQUFHLGNBQWMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3ZELDZCQUFjLEdBQUcsY0FBYyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDckQsNEJBQWEsR0FBRyxjQUFjLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQU05RSxxQkFBQztDQVpELEFBWUMsSUFBQTtrQkFab0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pQYXRoSGVscGVye1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBiYXNlUGF0aCA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdhbWVBdWRpb1BhdGggPSBCYnd6UGF0aEhlbHBlci5iYXNlUGF0aCArIFwic291bmQvXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdhbWVQcmVmYWJzUGF0aCA9IEJid3pQYXRoSGVscGVyLmJhc2VQYXRoICsgXCJwcmVmYWJzL1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBnYW1lVGV4dHVyZVBhdGggPSBCYnd6UGF0aEhlbHBlci5iYXNlUGF0aCArIFwidGV4dHVyZS9cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2FtZUVmZmVjdFBhdGggPSBCYnd6UGF0aEhlbHBlci5iYXNlUGF0aCArIFwiZWZmZWN0L1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBnYW1lU291bmRQYXRoID0gQmJ3elBhdGhIZWxwZXIuYmFzZVBhdGggKyBcInNvdW5kL1wiO1xyXG4gICAgXHJcbiAgICAvL+Wbvumbhui3r+W+hFxyXG4gICAgcHVibGljIHN0YXRpYyBhdGxhc1BhdGgoYXRsYXMpe1xyXG4gICAgICAgIHJldHVybiBCYnd6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBhdGxhcztcclxuICAgIH1cclxufSJdfQ==