/**
 * 推广模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class SpreadModule extends ModuleBase {
    viewClass = "WndSpread"
    modelClass = "SpreadModel"
    resPaths = []
    prefabPaths = [""]
    children = [
        {
            viewClass: "WndSpreadCenter",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndAwardRecord",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndLowerSearch",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        },
        {
            viewClass: "WndAwardDetail",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        }
        ,{
            viewClass: "WndCommissionlist",
            modelClass: "",
            resPaths: [],
            prefabPaths: [""],
            children: []
        }
    ]

}