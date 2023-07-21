/**
 * 充值模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class SafeModule extends ModuleBase {
    viewClass = "WndBuySafeUI"
    modelClass = "SafeModule"
    resPaths = []
    prefabPaths = [""]
    children = [
        {
            viewClass: "WndSafeRuleUI",
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