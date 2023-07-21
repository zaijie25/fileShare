"use strict";
cc._RF.push(module, '7ac385Hn7VG/ZFPJ3RX5P/u', 'PersistUIControl');
// hall/scripts/logic/core/ui/PersistUIControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistUIControl = void 0;
var SceneManager_1 = require("../scene/SceneManager");
var PersistUIControl = /** @class */ (function () {
    function PersistUIControl() {
    }
    //选择需要放到持久化节点的UI
    //优先筛选非MainUI界面    找不到就把大厅放到持久化节点
    PersistUIControl.prototype.selectPersistUI = function (windowMap) {
        for (var key in windowMap) {
            var window = windowMap[key];
            if (window.active == true && window.layer != Global.UI.MainLayer) {
                if (this.curPersistUI == null)
                    this.curPersistUI = window;
                else {
                    Logger.error("同时显示多个持久化界面！！！！", window.name);
                }
            }
        }
        if (this.curPersistUI == null) {
            var hall = Global.UI.getWindow("WndHall");
            if (hall && hall.putToPersistWhenVisible)
                this.curPersistUI = Global.UI.getWindow("WndHall");
        }
    };
    PersistUIControl.prototype.savePersistUI = function (windowMap) {
        this.selectPersistUI(windowMap);
        if (this.curPersistUI != null) {
            Global.Persist.addUIToPersisitNode(this.curPersistUI.name, this.curPersistUI.node, true);
        }
    };
    PersistUIControl.prototype.removePersisUI = function (key) {
        if (this.curPersistUI == null)
            return null;
        if (this.curPersistUI.name == key && this.curPersistUI.node.isValid) {
            var node = this.curPersistUI.node;
            //父节点切换时，替换cleanup方法，防止动画被停止
            var tmpCleanupFunc = node.cleanup;
            node.cleanup = function () { };
            Global.Persist.removeUIFromPersisitNode(this.curPersistUI.name);
            node.cleanup = tmpCleanupFunc;
            this.curPersistUI.node.active = this.curPersistUI.active;
            this.curPersistUI = null;
            return node;
        }
        return null;
    };
    //是否是持久化UI
    PersistUIControl.prototype.isPersistUI = function (wndName) {
        if (this.curPersistUI == null)
            return false;
        return this.curPersistUI.name == wndName;
    };
    PersistUIControl.prototype.showPersistUI = function () {
        if (this.curPersistUI == null)
            return;
        //这个时候实际还在游戏场景里，SceneType先切到hall  需要重构
        if (Global.SceneManager.sceneType == SceneManager_1.SceneType.Hall) {
            this.curPersistUI.activeInPersistNode = true;
        }
    };
    PersistUIControl.prototype.closePersistUI = function () {
        if (this.curPersistUI == null)
            return;
        if (!Global.SceneManager.inGame())
            return;
        this.curPersistUI.activeInPersistNode = false;
    };
    return PersistUIControl;
}());
exports.PersistUIControl = PersistUIControl;

cc._RF.pop();