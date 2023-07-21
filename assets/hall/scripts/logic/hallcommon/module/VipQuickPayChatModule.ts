/**
 * 艾特客服模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class VipQuickPayChatModule extends ModuleBase {
    viewClass = "WndVipQuickPayChat"
    modelClass = ""
    resPaths = []
    prefabPaths = [""]
    children = [
        {
            viewClass: "WndChatImage",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndBankRechange",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndAliPayRechange",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndWeChatRechange",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
    ]

}