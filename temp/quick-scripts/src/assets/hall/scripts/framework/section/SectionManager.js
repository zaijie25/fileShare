"use strict";
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