"use strict";
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