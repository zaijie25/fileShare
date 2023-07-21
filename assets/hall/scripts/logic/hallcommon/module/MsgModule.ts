/**
 * 邮件模块
 * 
*/

import { ModuleBase } from "../../../framework/module/ModuleBase";

export default class MsgModule extends ModuleBase {
    viewClass = "WndMsg"
    modelClass = "MsgModel"
    resPaths = []
    prefabPaths = ["hall/prefabs/ui/msg/MsgUI"]
    children = [
       
    ]

}