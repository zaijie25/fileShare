
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/section/SectionManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a44b6T1yfZAjpyEILDr1g77', 'SectionManager');
// hall/scripts/framework/section/SectionManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 把整个游戏分成多个阶段,每个阶段的管理器
 */
var SectionManager = /** @class */ (function () {
    function SectionManager() {
        this.sctionMap = {};
    }
    Object.defineProperty(SectionManager, "Instance", {
        get: function () {
            if (SectionManager._instance == null) {
                SectionManager._instance = new SectionManager();
            }
            return SectionManager._instance;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param sectionName
     */
    SectionManager.prototype.hasSection = function (sectionName) {
        if (sectionName == null && sectionName.length < 1) {
            Logger.error("SectionManager::getSection() sectionName == null || sectionName.length < 1");
            return null;
        }
        return this.sctionMap[sectionName] != null;
    };
    SectionManager.prototype.callSectionInit = function (sectionName) {
        var section = this.sctionMap[sectionName];
        if (!section.isInit) {
            section.declareModel();
            section.declareWnd();
            section.loadLanguage();
            section.isInit = true;
        }
        section.init();
    };
    SectionManager.prototype.register = function (sectionName, section) {
        if (section == null) {
            Logger.error("SectionManager::register() section == null, return!!!!");
            return false;
        }
        this.sctionMap[sectionName] = section;
        return true;
    };
    SectionManager.prototype.unregister = function (sectionName) {
        if (sectionName == null && sectionName.length < 1) {
            Logger.error("SectionManager::unregister() sectionName == null || sectionName.length < 1");
            return null;
        }
        this.sctionMap[sectionName] = null;
    };
    SectionManager.prototype.unregisterAll = function () {
        for (var key in this.sctionMap) {
            this.unregister(key);
        }
        this.sctionMap = {};
    };
    return SectionManager;
}());
exports.default = SectionManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxzZWN0aW9uXFxTZWN0aW9uTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztHQUVHO0FBQ0g7SUFZSTtRQVZRLGNBQVMsR0FBMkIsRUFBRSxDQUFDO0lBWS9DLENBQUM7SUFURCxzQkFBa0IsMEJBQVE7YUFBMUI7WUFDSSxJQUFHLGNBQWMsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUNqQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7YUFDbkQ7WUFDRCxPQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFNRDs7O09BR0c7SUFDSSxtQ0FBVSxHQUFqQixVQUFrQixXQUFrQjtRQUNoQyxJQUFHLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2hEO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1lBQzNGLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQy9DLENBQUM7SUFFTSx3Q0FBZSxHQUF0QixVQUF1QixXQUFrQjtRQUVyQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLElBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUNsQjtZQUNJLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN2QixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDckIsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFTSxpQ0FBUSxHQUFmLFVBQWdCLFdBQWtCLEVBQUUsT0FBZ0I7UUFDaEQsSUFBRyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUN2RSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxtQ0FBVSxHQUFqQixVQUFrQixXQUFrQjtRQUNoQyxJQUFHLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2hEO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1lBQzNGLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRU0sc0NBQWEsR0FBcEI7UUFDSSxLQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTCxxQkFBQztBQUFELENBbkVBLEFBbUVDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSVNlY3Rpb24gZnJvbSBcIi4vSVNlY3Rpb25cIjtcclxuXHJcbi8qKlxyXG4gKiDmiormlbTkuKrmuLjmiI/liIbmiJDlpJrkuKrpmLbmrrUs5q+P5Liq6Zi25q6155qE566h55CG5ZmoXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uTWFuYWdlclxyXG57XHJcbiAgICBwcml2YXRlIHNjdGlvbk1hcDp7W2tleTpzdHJpbmddOklTZWN0aW9ufSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpTZWN0aW9uTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmKFNlY3Rpb25NYW5hZ2VyLl9pbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFNlY3Rpb25NYW5hZ2VyLl9pbnN0YW5jZSA9IG5ldyBTZWN0aW9uTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gU2VjdGlvbk1hbmFnZXIuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzZWN0aW9uTmFtZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhc1NlY3Rpb24oc2VjdGlvbk5hbWU6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYoc2VjdGlvbk5hbWUgPT0gbnVsbCAmJiBzZWN0aW9uTmFtZS5sZW5ndGggPCAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiU2VjdGlvbk1hbmFnZXI6OmdldFNlY3Rpb24oKSBzZWN0aW9uTmFtZSA9PSBudWxsIHx8IHNlY3Rpb25OYW1lLmxlbmd0aCA8IDFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zY3Rpb25NYXBbc2VjdGlvbk5hbWVdICE9IG51bGw7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxsU2VjdGlvbkluaXQoc2VjdGlvbk5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzZWN0aW9uID0gdGhpcy5zY3Rpb25NYXBbc2VjdGlvbk5hbWVdO1xyXG4gICAgICAgIGlmKCFzZWN0aW9uLmlzSW5pdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlY3Rpb24uZGVjbGFyZU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHNlY3Rpb24uZGVjbGFyZVduZCgpO1xyXG4gICAgICAgICAgICBzZWN0aW9uLmxvYWRMYW5ndWFnZSgpO1xyXG4gICAgICAgICAgICBzZWN0aW9uLmlzSW5pdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlY3Rpb24uaW5pdCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyKHNlY3Rpb25OYW1lOnN0cmluZywgc2VjdGlvbjpJU2VjdGlvbikge1xyXG4gICAgICAgIGlmKHNlY3Rpb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJTZWN0aW9uTWFuYWdlcjo6cmVnaXN0ZXIoKSBzZWN0aW9uID09IG51bGwsIHJldHVybiEhISFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY3Rpb25NYXBbc2VjdGlvbk5hbWVdID0gc2VjdGlvbjtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5yZWdpc3RlcihzZWN0aW9uTmFtZTpzdHJpbmcpIHtcclxuICAgICAgICBpZihzZWN0aW9uTmFtZSA9PSBudWxsICYmIHNlY3Rpb25OYW1lLmxlbmd0aCA8IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJTZWN0aW9uTWFuYWdlcjo6dW5yZWdpc3RlcigpIHNlY3Rpb25OYW1lID09IG51bGwgfHwgc2VjdGlvbk5hbWUubGVuZ3RoIDwgMVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2N0aW9uTWFwW3NlY3Rpb25OYW1lXSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVucmVnaXN0ZXJBbGwoKSB7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5zY3Rpb25NYXApIHtcclxuICAgICAgICAgICAgdGhpcy51bnJlZ2lzdGVyKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2N0aW9uTWFwID0ge307XHJcbiAgICB9XHJcblxyXG59Il19