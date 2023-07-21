
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/ui/PersistUIControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHVpXFxQZXJzaXN0VUlDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHNEQUFrRDtBQUVsRDtJQUFBO0lBdUZBLENBQUM7SUFsRkcsZ0JBQWdCO0lBQ2hCLGlDQUFpQztJQUMxQiwwQ0FBZSxHQUF0QixVQUF1QixTQUF1QztRQUUxRCxLQUFJLElBQUksR0FBRyxJQUFJLFNBQVMsRUFBQztZQUNyQixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBRyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUNoRTtnQkFDSSxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSTtvQkFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7cUJBRS9CO29CQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2lCQUMvQzthQUNKO1NBQ0o7UUFFRCxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUM1QjtZQUNJLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3pDLElBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyx1QkFBdUI7Z0JBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBRU0sd0NBQWEsR0FBcEIsVUFBcUIsU0FBdUM7UUFFeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUMvQixJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUM1QjtZQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDM0Y7SUFDTCxDQUFDO0lBR00seUNBQWMsR0FBckIsVUFBc0IsR0FBRztRQUVyQixJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSTtZQUN4QixPQUFPLElBQUksQ0FBQztRQUNoQixJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ2xFO1lBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUE7WUFDakMsNEJBQTRCO1lBQzVCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFLLENBQUMsQ0FBQTtZQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUE7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFBO1lBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0QsVUFBVTtJQUNILHNDQUFXLEdBQWxCLFVBQW1CLE9BQWM7UUFDN0IsSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUk7WUFDeEIsT0FBTyxLQUFLLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUE7SUFDNUMsQ0FBQztJQUVNLHdDQUFhLEdBQXBCO1FBQ0ksSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUk7WUFDeEIsT0FBTztRQUNYLHNDQUFzQztRQUN0QyxJQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLHdCQUFTLENBQUMsSUFBSSxFQUNsRDtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQztJQUdNLHlDQUFjLEdBQXJCO1FBRUksSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUk7WUFDeEIsT0FBTztRQUNYLElBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUM1QixPQUFPO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0F2RkEsQUF1RkMsSUFBQTtBQXZGWSw0Q0FBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi9XbmRCYXNlXCI7XHJcbmltcG9ydCB7IFNjZW5lVHlwZSB9IGZyb20gXCIuLi9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJzaXN0VUlDb250cm9sXHJcbntcclxuICAgIC8v57yT5a2Y5Yiw5oyB5LmF5YyW6IqC54K555qEdWkgIOavj+asoeWPquS/neeVmeS4gOS4qu+8jOmAieWcuuaIluiAheWkp+WOhVxyXG4gICAgcHVibGljIGN1clBlcnNpc3RVSSA6IFduZEJhc2VcclxuXHJcbiAgICAvL+mAieaLqemcgOimgeaUvuWIsOaMgeS5heWMluiKgueCueeahFVJXHJcbiAgICAvL+S8mOWFiOetm+mAiemdnk1haW5VSeeVjOmdoiAgICDmib7kuI3liLDlsLHmiorlpKfljoXmlL7liLDmjIHkuYXljJboioLngrlcclxuICAgIHB1YmxpYyBzZWxlY3RQZXJzaXN0VUkod2luZG93TWFwIDogIHsgW2tleTogc3RyaW5nXTogV25kQmFzZSB9IClcclxuICAgIHsgICBcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB3aW5kb3dNYXApe1xyXG4gICAgICAgICAgICBsZXQgd2luZG93ID0gd2luZG93TWFwW2tleV07XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5hY3RpdmUgPT0gdHJ1ZSAgJiYgd2luZG93LmxheWVyICE9IEdsb2JhbC5VSS5NYWluTGF5ZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyUGVyc2lzdFVJID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJQZXJzaXN0VUkgPSB3aW5kb3c7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5ZCM5pe25pi+56S65aSa5Liq5oyB5LmF5YyW55WM6Z2i77yB77yB77yB77yBXCIsIHdpbmRvdy5uYW1lKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmN1clBlcnNpc3RVSSA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGhhbGwgPSBHbG9iYWwuVUkuZ2V0V2luZG93KFwiV25kSGFsbFwiKVxyXG4gICAgICAgICAgICBpZihoYWxsICYmIGhhbGwucHV0VG9QZXJzaXN0V2hlblZpc2libGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1clBlcnNpc3RVSSA9IEdsb2JhbC5VSS5nZXRXaW5kb3coXCJXbmRIYWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZVBlcnNpc3RVSSh3aW5kb3dNYXAgOiAgeyBba2V5OiBzdHJpbmddOiBXbmRCYXNlIH0gKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0UGVyc2lzdFVJKHdpbmRvd01hcClcclxuICAgICAgICBpZih0aGlzLmN1clBlcnNpc3RVSSAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlBlcnNpc3QuYWRkVUlUb1BlcnNpc2l0Tm9kZSh0aGlzLmN1clBlcnNpc3RVSS5uYW1lLCB0aGlzLmN1clBlcnNpc3RVSS5ub2RlLCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlbW92ZVBlcnNpc1VJKGtleSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1clBlcnNpc3RVSSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZih0aGlzLmN1clBlcnNpc3RVSS5uYW1lID09IGtleSAmJiB0aGlzLmN1clBlcnNpc3RVSS5ub2RlLmlzVmFsaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuY3VyUGVyc2lzdFVJLm5vZGVcclxuICAgICAgICAgICAgLy/niLboioLngrnliIfmjaLml7bvvIzmm7/mjaJjbGVhbnVw5pa55rOV77yM6Ziy5q2i5Yqo55S76KKr5YGc5q2iXHJcbiAgICAgICAgICAgIGxldCB0bXBDbGVhbnVwRnVuYyA9IG5vZGUuY2xlYW51cDtcclxuICAgICAgICAgICAgbm9kZS5jbGVhbnVwID0gKCk9Pnt9XHJcbiAgICAgICAgICAgIEdsb2JhbC5QZXJzaXN0LnJlbW92ZVVJRnJvbVBlcnNpc2l0Tm9kZSh0aGlzLmN1clBlcnNpc3RVSS5uYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5jbGVhbnVwID0gdG1wQ2xlYW51cEZ1bmNcclxuICAgICAgICAgICAgdGhpcy5jdXJQZXJzaXN0VUkubm9kZS5hY3RpdmUgPSB0aGlzLmN1clBlcnNpc3RVSS5hY3RpdmVcclxuICAgICAgICAgICAgdGhpcy5jdXJQZXJzaXN0VUkgPSBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/mmK/lkKbmmK/mjIHkuYXljJZVSVxyXG4gICAgcHVibGljIGlzUGVyc2lzdFVJKHduZE5hbWU6c3RyaW5nKXtcclxuICAgICAgICBpZih0aGlzLmN1clBlcnNpc3RVSSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyUGVyc2lzdFVJLm5hbWUgPT0gd25kTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UGVyc2lzdFVJKCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJQZXJzaXN0VUkgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8v6L+Z5Liq5pe25YCZ5a6e6ZmF6L+Y5Zyo5ri45oiP5Zy65pmv6YeM77yMU2NlbmVUeXBl5YWI5YiH5YiwaGFsbCAg6ZyA6KaB6YeN5p6EXHJcbiAgICAgICAgaWYoR2xvYmFsLlNjZW5lTWFuYWdlci5zY2VuZVR5cGUgPT0gU2NlbmVUeXBlLkhhbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1clBlcnNpc3RVSS5hY3RpdmVJblBlcnNpc3ROb2RlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbG9zZVBlcnNpc3RVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJQZXJzaXN0VUkgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKCFHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJQZXJzaXN0VUkuYWN0aXZlSW5QZXJzaXN0Tm9kZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==