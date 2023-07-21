/**
 * 银行模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class BankModule extends ModuleBase {
    viewClass = "WndBankUI"
    modelClass = "BankModel"
    resPaths = []
    prefabPaths = ["hall/prefabs/ui/money/bank/BankUI"]
    children = [
        {
            viewClass: "WndBankLogin",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/money/bank/BankLoginBankUI"],
            children: []
        },
        {
            viewClass: "WndBankForgetPW",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/money/bank/BankForgetPWUI"],
            children: []
        },
        {
            viewClass: "WndBankChangePW",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/money/bank/BankChangePWUI"],
            children: []
        },
        {
            viewClass: "WndUnionBandConfirm",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/money/extractCash/unionBandConfirmUI"],
            children: []
        },
        {
            viewClass: "WndOverseasBandConfirm",
            modelClass: "",
            resPaths: [],
            prefabPaths: ["hall/prefabs/ui/money/extractCash/overseasBandConfirmUI"],
            children: []
        },
    ]

}