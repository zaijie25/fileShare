"use strict";
cc._RF.push(module, 'a3efeC4Q2VN86d7HaX8MzeO', 'Language');
// hall/scripts/logic/core/tool/Language.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Language = /** @class */ (function () {
    function Language() {
        this.languageMap = {};
    }
    //每个场景注册自己的语言包
    Language.prototype.registLanguage = function (languagePath) {
        var _this = this;
        if (languagePath == "")
            return;
        Global.ResourceManager.loadRes(languagePath, function (error, jsonAsset) {
            if (error != null) {
                Logger.error("加载语言包失败", languagePath);
                return;
            }
            if (jsonAsset == null || jsonAsset.json == null)
                return;
            for (var key in jsonAsset.json) {
                if (_this.languageMap[key] != null) {
                    Logger.error("重复注册语言包", key, _this.languageMap[key]);
                    return;
                }
                _this.languageMap[key] = jsonAsset.json[key].content;
            }
        }, cc.JsonAsset);
    };
    Language.prototype.getWord = function (key) {
        var word = this.languageMap[key];
        if (word == null) {
            Logger.error("找不到语言包", key);
            return "";
        }
        return word;
    };
    Language.prototype.getWordEx = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var word = this.getWord(key);
        var param = [word];
        if (args) {
            for (var i = 0; i < args.length; i++) {
                param.push(args[i]);
            }
        }
        return cc.js.formatStr.apply(param);
    };
    return Language;
}());
exports.default = Language;

cc._RF.pop();