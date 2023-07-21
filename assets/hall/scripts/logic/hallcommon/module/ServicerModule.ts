/**
 * 客服模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class ServicerModule extends ModuleBase {
    viewClass = "WndServicerUI"
    modelClass = "ServicerModel"
    resPaths = []
    prefabPaths = ["hall/prefabs/ui/ServiceUI"]
    children = [
       
    ]

}