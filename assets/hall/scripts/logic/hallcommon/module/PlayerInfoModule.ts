/**
 * 个人信息模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class PlayerInfoModule extends ModuleBase {
    viewClass = "WndPlayerInfo"
    modelClass = "PlayerInfoModel"
    resPaths = []
    prefabPaths = ["hall/prefabs/ui/PlayerInfo/NewPlayerInfoUI"]
    children = [
        // {
        //     viewClass: "WndVip",
        //     modelClass: "",
        //     resPaths: [],
        //     prefabPaths: ["hall/prefabs/ui/PlayerInfo/VipUI"],
        //     children: []
        // },
        // {
        //     viewClass: "WndVip2",
        //     modelClass: "",
        //     resPaths: [],
        //     prefabPaths: ["hall/prefabs/ui/PlayerInfo/VipUI2"],
        //     children: []
        // },
        {
            viewClass: "WndVip3",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/PlayerInfo/VipUI3"],
            children: []
        },
        {
            viewClass: "WndVipRule",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/PlayerInfo/vipRule"],
            children: []
        } 
    ]

}