/**
 * 通用模块:网络
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class CommonModule extends ModuleBase {
    viewClass = "WndNetReconnect"
    modelClass = "WaitingModel"
    resPaths = []
    prefabPaths = ["hall/prefabs/ui/NetReconnect"]
    children = [
        {
            viewClass: "WndNetWaiting",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/NetWaitUI"],
            children: []
        },
        {
            viewClass: "WndScreenPortraitNotice",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndMessageBox",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndRebateGet",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndRedEnvelope",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndHallRedEnvelope",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndDailyRedEnvelope",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndGetRedEnvelope",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndDownLoadApkUI",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndGameMaintainUI",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndGameRestoreUI",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndGameUpdateUI",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndGameUpgrade",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndDailyGiftMoneyUI",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndGiftMoneyListUI",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
    ]

}