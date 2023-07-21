/**
 * 活动模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class ActivityCenterModule extends ModuleBase {
    viewClass = "WndActivityCenter"
    modelClass = ""
    resPaths = []
    prefabPaths = ["hall/prefabs/ui/PlayerInfo/PlayerInfoUI"]
    children = [
        {
            viewClass: "",
            modelClass: "",
            resPaths: [],
            prefabPaths: [],
            children: []
        }
    ]

}