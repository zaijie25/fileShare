
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/Language.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXExhbmd1YWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtRQUVZLGdCQUFXLEdBQUcsRUFBRSxDQUFDO0lBcUQ3QixDQUFDO0lBbkRHLGNBQWM7SUFDUCxpQ0FBYyxHQUFyQixVQUFzQixZQUFZO1FBQWxDLGlCQXdCQztRQXRCRyxJQUFHLFlBQVksSUFBSSxFQUFFO1lBQ2pCLE9BQU87UUFDWCxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsVUFBQyxLQUFLLEVBQUUsU0FBUztZQUUxRCxJQUFHLEtBQUssSUFBSSxJQUFJLEVBQ2hCO2dCQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUN0QyxPQUFPO2FBQ1Y7WUFDRCxJQUFHLFNBQVMsSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJO2dCQUMxQyxPQUFPO1lBQ1gsS0FBSSxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUM3QjtnQkFDSSxJQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUNoQztvQkFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO29CQUNuRCxPQUFPO2lCQUNWO2dCQUNELEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7YUFDdkQ7UUFFTCxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFTSwwQkFBTyxHQUFkLFVBQWUsR0FBRztRQUVkLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBRyxJQUFJLElBQUksSUFBSSxFQUNmO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUIsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSw0QkFBUyxHQUFoQixVQUFpQixHQUFHO1FBQUUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7UUFFekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUcsSUFBSSxFQUNQO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQ25DO2dCQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkI7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0F2REEsQUF1REMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIExhbmd1YWdlXHJcbntcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VNYXAgPSB7fTtcclxuXHJcbiAgICAvL+avj+S4quWcuuaZr+azqOWGjOiHquW3seeahOivreiogOWMhVxyXG4gICAgcHVibGljIHJlZ2lzdExhbmd1YWdlKGxhbmd1YWdlUGF0aClcclxuICAgIHtcclxuICAgICAgICBpZihsYW5ndWFnZVBhdGggPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyhsYW5ndWFnZVBhdGgsIChlcnJvciwganNvbkFzc2V0KT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihlcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLliqDovb3or63oqIDljIXlpLHotKVcIiwgbGFuZ3VhZ2VQYXRoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihqc29uQXNzZXQgPT0gbnVsbCB8fCBqc29uQXNzZXQuanNvbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IobGV0IGtleSBpbiBqc29uQXNzZXQuanNvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sYW5ndWFnZU1hcFtrZXldICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6YeN5aSN5rOo5YaM6K+t6KiA5YyFXCIsIGtleSwgdGhpcy5sYW5ndWFnZU1hcFtrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VNYXBba2V5XSA9IGpzb25Bc3NldC5qc29uW2tleV0uY29udGVudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCBjYy5Kc29uQXNzZXQpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdvcmQoa2V5KVxyXG4gICAge1xyXG4gICAgICAgIGxldCB3b3JkID0gdGhpcy5sYW5ndWFnZU1hcFtrZXldO1xyXG4gICAgICAgIGlmKHdvcmQgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsOivreiogOWMhVwiLCBrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdvcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdvcmRFeChrZXksIC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHdvcmQgPSB0aGlzLmdldFdvcmQoa2V5KTtcclxuICAgICAgICBsZXQgcGFyYW0gPSBbd29yZF07XHJcbiAgICAgICAgaWYoYXJncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5wdXNoKGFyZ3NbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5qcy5mb3JtYXRTdHIuYXBwbHkocGFyYW0pO1xyXG4gICAgfVxyXG59Il19