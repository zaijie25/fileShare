import { ModuleBase } from "./ModuleBase";
import { JSUtil } from "../../logic/core/tool/JSUtil";
import WndBase from "../../logic/core/ui/WndBase";

export class ModuleManager {

    loadSkinModuleCfg(cfg: string[]) {
        if (!cfg || cfg.length == 0) {
            Logger.error("loadSkinModuleCfg cfg == null")
            return;
        }
        for (let i = 0; i < cfg.length; i++) {
            let moduleName = cfg[i];
            JSUtil.importCls(moduleName).then((module)=>{
                // console.error("loadModule " + moduleName)
                this.loadModule(new module())
            })
        }
    }

    loadModule(cfg: ModuleBase) {
        let viewClass = cfg.viewClass
        let modelClass = cfg.modelClass;
        let children = cfg.children
        let prefabPaths = cfg.prefabPaths
        //先加载model
        let model = null
        let rootView = null
        if (modelClass){
            JSUtil.importCls(modelClass).then((modelModule) => {
                model = modelModule
                new modelModule()
                return JSUtil.importCls(viewClass)
            }).then((viewModule) => {
                if (JSUtil.isChildClassOf(viewModule, WndBase)) {
                    rootView = viewModule
                    new viewModule()
                    if (children && children.length > 0) {
                        this.loadSubViews(children, viewClass)
                    }
                }
            })
        }else {
            JSUtil.importCls(viewClass).then((viewModule) => {
                if (JSUtil.isChildClassOf(viewModule, WndBase)) {
                    rootView = viewModule
                    new viewModule()
                    if (children && children.length > 0) {
                        this.loadSubViews(children, viewClass)
                    }
                }
            })
        }
    }

    loadSubViews(views: ModuleBase[], parent: string = "") {
        if (views && views.length > 0) {
            for (let i = 0; i < views.length; i++) {
                let subModelBase: ModuleBase = views[i]
                let viewClass = subModelBase.viewClass
                let modelClass = subModelBase.modelClass
                let children = subModelBase.children
                let prefabPaths = subModelBase.prefabPaths
                if (modelClass) {
                    JSUtil.importCls(modelClass).then((modelModule) => {
                        new modelModule()
                        return JSUtil.importCls(viewClass)
                    }).then((viewModule) => {
                        if (JSUtil.isChildClassOf(viewModule, WndBase)) {
                            new viewModule()
                        } else {
                            let parentView = Global.UI.getWindow(parent)
                            parentView.addView(viewClass, parentView.node, viewModule)
                        }

                        if (children && children.length > 0) {
                            this.loadSubViews(children, viewClass)
                        }
                    })
                } else {
                    JSUtil.importCls(viewClass).then((viewModule) => {
                        if (JSUtil.isChildClassOf(viewModule, WndBase)) {
                            new viewModule()
                        } else {
                            let parentView = Global.UI.getWindow(parent)
                            parentView.addView(viewClass, parentView.node, viewModule)
                        }

                        if (children && children.length > 0) {
                            this.loadSubViews(children, viewClass)
                        }
                    })
                }

            }
        }
    }
}