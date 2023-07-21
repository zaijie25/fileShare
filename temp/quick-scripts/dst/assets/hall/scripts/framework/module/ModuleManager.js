
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/module/ModuleManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d7ae2VgCZFLKOYBCsw/TAj', 'ModuleManager');
// hall/scripts/framework/module/ModuleManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleManager = void 0;
var JSUtil_1 = require("../../logic/core/tool/JSUtil");
var WndBase_1 = require("../../logic/core/ui/WndBase");
var ModuleManager = /** @class */ (function () {
    function ModuleManager() {
    }
    ModuleManager.prototype.loadSkinModuleCfg = function (cfg) {
        var _this = this;
        if (!cfg || cfg.length == 0) {
            Logger.error("loadSkinModuleCfg cfg == null");
            return;
        }
        for (var i = 0; i < cfg.length; i++) {
            var moduleName = cfg[i];
            JSUtil_1.JSUtil.importCls(moduleName).then(function (module) {
                // console.error("loadModule " + moduleName)
                _this.loadModule(new module());
            });
        }
    };
    ModuleManager.prototype.loadModule = function (cfg) {
        var _this = this;
        var viewClass = cfg.viewClass;
        var modelClass = cfg.modelClass;
        var children = cfg.children;
        var prefabPaths = cfg.prefabPaths;
        //先加载model
        var model = null;
        var rootView = null;
        if (modelClass) {
            JSUtil_1.JSUtil.importCls(modelClass).then(function (modelModule) {
                model = modelModule;
                new modelModule();
                return JSUtil_1.JSUtil.importCls(viewClass);
            }).then(function (viewModule) {
                if (JSUtil_1.JSUtil.isChildClassOf(viewModule, WndBase_1.default)) {
                    rootView = viewModule;
                    new viewModule();
                    if (children && children.length > 0) {
                        _this.loadSubViews(children, viewClass);
                    }
                }
            });
        }
        else {
            JSUtil_1.JSUtil.importCls(viewClass).then(function (viewModule) {
                if (JSUtil_1.JSUtil.isChildClassOf(viewModule, WndBase_1.default)) {
                    rootView = viewModule;
                    new viewModule();
                    if (children && children.length > 0) {
                        _this.loadSubViews(children, viewClass);
                    }
                }
            });
        }
    };
    ModuleManager.prototype.loadSubViews = function (views, parent) {
        var _this = this;
        if (parent === void 0) { parent = ""; }
        if (views && views.length > 0) {
            var _loop_1 = function (i) {
                var subModelBase = views[i];
                var viewClass = subModelBase.viewClass;
                var modelClass = subModelBase.modelClass;
                var children = subModelBase.children;
                var prefabPaths = subModelBase.prefabPaths;
                if (modelClass) {
                    JSUtil_1.JSUtil.importCls(modelClass).then(function (modelModule) {
                        new modelModule();
                        return JSUtil_1.JSUtil.importCls(viewClass);
                    }).then(function (viewModule) {
                        if (JSUtil_1.JSUtil.isChildClassOf(viewModule, WndBase_1.default)) {
                            new viewModule();
                        }
                        else {
                            var parentView = Global.UI.getWindow(parent);
                            parentView.addView(viewClass, parentView.node, viewModule);
                        }
                        if (children && children.length > 0) {
                            _this.loadSubViews(children, viewClass);
                        }
                    });
                }
                else {
                    JSUtil_1.JSUtil.importCls(viewClass).then(function (viewModule) {
                        if (JSUtil_1.JSUtil.isChildClassOf(viewModule, WndBase_1.default)) {
                            new viewModule();
                        }
                        else {
                            var parentView = Global.UI.getWindow(parent);
                            parentView.addView(viewClass, parentView.node, viewModule);
                        }
                        if (children && children.length > 0) {
                            _this.loadSubViews(children, viewClass);
                        }
                    });
                }
            };
            for (var i = 0; i < views.length; i++) {
                _loop_1(i);
            }
        }
    };
    return ModuleManager;
}());
exports.ModuleManager = ModuleManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxtb2R1bGVcXE1vZHVsZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdURBQXNEO0FBQ3RELHVEQUFrRDtBQUVsRDtJQUFBO0lBNkZBLENBQUM7SUEzRkcseUNBQWlCLEdBQWpCLFVBQWtCLEdBQWE7UUFBL0IsaUJBWUM7UUFYRyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQTtZQUM3QyxPQUFPO1NBQ1Y7UUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsZUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO2dCQUNyQyw0Q0FBNEM7Z0JBQzVDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQ2pDLENBQUMsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLEdBQWU7UUFBMUIsaUJBaUNDO1FBaENHLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUE7UUFDN0IsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO1FBQzNCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUE7UUFDakMsVUFBVTtRQUNWLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUE7UUFDbkIs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eEMsSUFBSSxlQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxpQkFBTyxDQUFDLEVBQUU7NEJBQzVDLElBQUksVUFBVSxFQUFFLENBQUE7eUJBQ25COzZCQUFNOzRCQUNILElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBOzRCQUM1QyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO3lCQUM3RDt3QkFFRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDakMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUE7eUJBQ3pDO29CQUNMLENBQUMsQ0FBQyxDQUFBO2lCQUNMOztZQW5DTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7d0JBQTVCLENBQUM7YUFxQ1Q7U0FDSjtJQUNMLENBQUM7SUFDTCxvQkFBQztBQUFELENBN0ZBLEFBNkZDLElBQUE7QUE3Rlksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVCYXNlIH0gZnJvbSBcIi4vTW9kdWxlQmFzZVwiO1xyXG5pbXBvcnQgeyBKU1V0aWwgfSBmcm9tIFwiLi4vLi4vbG9naWMvY29yZS90b29sL0pTVXRpbFwiO1xyXG5pbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vbG9naWMvY29yZS91aS9XbmRCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kdWxlTWFuYWdlciB7XHJcblxyXG4gICAgbG9hZFNraW5Nb2R1bGVDZmcoY2ZnOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGlmICghY2ZnIHx8IGNmZy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2FkU2tpbk1vZHVsZUNmZyBjZmcgPT0gbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2ZnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2R1bGVOYW1lID0gY2ZnW2ldO1xyXG4gICAgICAgICAgICBKU1V0aWwuaW1wb3J0Q2xzKG1vZHVsZU5hbWUpLnRoZW4oKG1vZHVsZSk9PntcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJsb2FkTW9kdWxlIFwiICsgbW9kdWxlTmFtZSlcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZE1vZHVsZShuZXcgbW9kdWxlKCkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRNb2R1bGUoY2ZnOiBNb2R1bGVCYXNlKSB7XHJcbiAgICAgICAgbGV0IHZpZXdDbGFzcyA9IGNmZy52aWV3Q2xhc3NcclxuICAgICAgICBsZXQgbW9kZWxDbGFzcyA9IGNmZy5tb2RlbENsYXNzO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IGNmZy5jaGlsZHJlblxyXG4gICAgICAgIGxldCBwcmVmYWJQYXRocyA9IGNmZy5wcmVmYWJQYXRoc1xyXG4gICAgICAgIC8v5YWI5Yqg6L29bW9kZWxcclxuICAgICAgICBsZXQgbW9kZWwgPSBudWxsXHJcbiAgICAgICAgbGV0IHJvb3RWaWV3ID0gbnVsbFxyXG4gICAgICAgIGlmIChtb2RlbENsYXNzKXtcclxuICAgICAgICAgICAgSlNVdGlsLmltcG9ydENscyhtb2RlbENsYXNzKS50aGVuKChtb2RlbE1vZHVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwgPSBtb2RlbE1vZHVsZVxyXG4gICAgICAgICAgICAgICAgbmV3IG1vZGVsTW9kdWxlKClcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU1V0aWwuaW1wb3J0Q2xzKHZpZXdDbGFzcylcclxuICAgICAgICAgICAgfSkudGhlbigodmlld01vZHVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKEpTVXRpbC5pc0NoaWxkQ2xhc3NPZih2aWV3TW9kdWxlLCBXbmRCYXNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3RWaWV3ID0gdmlld01vZHVsZVxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyB2aWV3TW9kdWxlKClcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTdWJWaWV3cyhjaGlsZHJlbiwgdmlld0NsYXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIEpTVXRpbC5pbXBvcnRDbHModmlld0NsYXNzKS50aGVuKCh2aWV3TW9kdWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSlNVdGlsLmlzQ2hpbGRDbGFzc09mKHZpZXdNb2R1bGUsIFduZEJhc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdFZpZXcgPSB2aWV3TW9kdWxlXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IHZpZXdNb2R1bGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFN1YlZpZXdzKGNoaWxkcmVuLCB2aWV3Q2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkU3ViVmlld3Modmlld3M6IE1vZHVsZUJhc2VbXSwgcGFyZW50OiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgaWYgKHZpZXdzICYmIHZpZXdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aWV3cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1Yk1vZGVsQmFzZTogTW9kdWxlQmFzZSA9IHZpZXdzW2ldXHJcbiAgICAgICAgICAgICAgICBsZXQgdmlld0NsYXNzID0gc3ViTW9kZWxCYXNlLnZpZXdDbGFzc1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vZGVsQ2xhc3MgPSBzdWJNb2RlbEJhc2UubW9kZWxDbGFzc1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gc3ViTW9kZWxCYXNlLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJlZmFiUGF0aHMgPSBzdWJNb2RlbEJhc2UucHJlZmFiUGF0aHNcclxuICAgICAgICAgICAgICAgIGlmIChtb2RlbENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgSlNVdGlsLmltcG9ydENscyhtb2RlbENsYXNzKS50aGVuKChtb2RlbE1vZHVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgbW9kZWxNb2R1bGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNVdGlsLmltcG9ydENscyh2aWV3Q2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigodmlld01vZHVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSlNVdGlsLmlzQ2hpbGRDbGFzc09mKHZpZXdNb2R1bGUsIFduZEJhc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgdmlld01vZHVsZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyZW50VmlldyA9IEdsb2JhbC5VSS5nZXRXaW5kb3cocGFyZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Vmlldy5hZGRWaWV3KHZpZXdDbGFzcywgcGFyZW50Vmlldy5ub2RlLCB2aWV3TW9kdWxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkU3ViVmlld3MoY2hpbGRyZW4sIHZpZXdDbGFzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEpTVXRpbC5pbXBvcnRDbHModmlld0NsYXNzKS50aGVuKCh2aWV3TW9kdWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChKU1V0aWwuaXNDaGlsZENsYXNzT2Yodmlld01vZHVsZSwgV25kQmFzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyB2aWV3TW9kdWxlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnRWaWV3ID0gR2xvYmFsLlVJLmdldFdpbmRvdyhwYXJlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRWaWV3LmFkZFZpZXcodmlld0NsYXNzLCBwYXJlbnRWaWV3Lm5vZGUsIHZpZXdNb2R1bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRTdWJWaWV3cyhjaGlsZHJlbiwgdmlld0NsYXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=