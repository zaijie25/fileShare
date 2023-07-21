/**
 * 充值模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class RechargeModule extends ModuleBase {
    viewClass = "WndRecharge"
    modelClass = "RechargeModel"
    resPaths = []
    prefabPaths = [""]
    children = [
        {
            viewClass: "WndRechangeBankInfo",
            modelClass: "ExtractModel",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndaliBandConfirm",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/money/extractCash/aliBandConfirmUI"],
            children: []
        },
        {
            viewClass: "WndRechargeVipShow",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndRechangeTip",
            modelClass: "RechagreTipModel",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndChooseProvince",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseProvince"],
            children: []
        },
        {
            viewClass: "WndChooseBank",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseBank"],
            children: []
        },
        {
            viewClass: "WndChooseCity",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseCity"],
            children: []
        }
        
    ]

}