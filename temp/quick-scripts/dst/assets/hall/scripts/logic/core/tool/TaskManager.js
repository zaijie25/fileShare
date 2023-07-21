
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/TaskManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '284fe5GY41HPqNZ1mpl2aFQ', 'TaskManager');
// hall/scripts/logic/core/tool/TaskManager.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TaskComp_1 = require("../component/TaskComp");
var baseBundle = "resources";
var taskPath = "hall/prefabs/ui/taskNode";
var interval = 5;
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.gameId = 0;
        this.taskList = [];
        this.curTaskId = "";
        this.curTaskType = 0;
        this.taskStateMap = {};
        this.isTimerPause = false;
    }
    /** 设置任务宝箱功能是否开放 */
    TaskManager.setTaskEnable = function (flag) {
        this.isEnable = flag;
    };
    TaskManager.preloadRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Global.ResourceManager.loadBundleRes(baseBundle, [taskPath], function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    })];
            });
        });
    };
    TaskManager.prototype.init = function (rootNode, gameId, dir) {
        var _this = this;
        if (!TaskManager.isEnable)
            return;
        if (!rootNode || !cc.isValid(rootNode))
            return;
        this.gameId = gameId;
        var prefab = Global.ResourceManager.getBundleRes(baseBundle, taskPath, cc.Prefab);
        if (!prefab) {
            Global.ResourceManager.loadBundleRes(baseBundle, taskPath, function (error, prefab) {
                if (error != null || prefab == null) {
                    Logger.error("加载资源错误", baseBundle, taskPath);
                    return;
                }
                var copyNode = cc.instantiate(prefab);
                copyNode.setParent(rootNode);
                copyNode.active = true;
                _this.taskComp = Global.UIHelper.safeGetComponent(copyNode, "", TaskComp_1.default);
                _this.taskComp.initTask(dir);
            });
        }
        else {
            var copyNode = cc.instantiate(prefab);
            copyNode.setParent(rootNode);
            copyNode.active = true;
            this.taskComp = Global.UIHelper.safeGetComponent(copyNode, "", TaskComp_1.default);
            this.taskComp.initTask(dir);
        }
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
    };
    TaskManager.prototype.reqGetGameTaskList = function () {
        var _this = this;
        if (!this.gameId)
            return; // console.error("gameid not init 1", this.gameId);
        var param = {};
        param["game_id"] = this.gameId;
        Global.HallServer.send(NetAppface.mod, "GetGameTaskActivityList", param, function (msg) {
            if (!_this.taskComp || !cc.isValid(_this.taskComp))
                return;
            _this.taskList = msg.data || [];
            _this.searchNotWorked();
        }, null, false);
    };
    TaskManager.prototype.searchNotWorked = function () {
        if (this.taskList.length > 0) {
            for (var i = 0; i < this.taskList.length; i++) {
                var task = this.taskList[i];
                this.taskStateMap[task.task_id] = task.task_status;
                if (task.task_status != 2) {
                    this.curTaskId = task.task_id;
                    this.curTaskType = task.global_task_type;
                    break;
                }
            }
        }
    };
    TaskManager.prototype.reqGetCommisionInfo = function () {
        var _this = this;
        if (!TaskManager.isEnable)
            return;
        if (!this.curTaskId || !this.curTaskType)
            return;
        if (!this.gameId)
            return; // console.error("gameid not init 2", this.gameId);
        var param = {};
        param["global_task_type"] = this.curTaskType || 0;
        param["task_id"] = this.curTaskId || "";
        Global.HallServer.send(NetAppface.mod, "GetOneTaskActivityInfo", param, function (msg) {
            if (!_this.taskComp || !cc.isValid(_this.taskComp))
                return;
            if (!msg || !msg.task_id) {
                return; // 1S内重复请求, 会返回空的默认数据, 直接剔除掉, debug 处理请求时重连会连续请求两次 弹频繁请求
            }
            _this.taskComp.updateTask(msg);
            _this.taskStateMap[msg.task_id] = msg.task_status;
            if (msg.task_status == 2) {
                _this.searchNotWorked();
            }
        }, null, false);
    };
    TaskManager.prototype.startReqTimer = function () {
        var _this = this;
        if (!TaskManager.isEnable)
            return;
        if (this.timer) {
            this.stopReqTimer();
        }
        this.timer = setInterval(function () {
            _this.reqGetCommisionInfo();
        }, interval * 1000);
    };
    TaskManager.prototype.onResume = function () {
        if (this.isTimerPause)
            this.startReqTimer();
    };
    TaskManager.prototype.onPause = function () {
        if (this.timer) {
            this.isTimerPause = true;
            this.stopReqTimer();
        }
    };
    TaskManager.prototype.stopReqTimer = function () {
        clearInterval(this.timer);
        this.timer = null;
    };
    TaskManager.prototype.onDispose = function () {
        if (!TaskManager.isEnable)
            return;
        this.stopReqTimer();
        this.gameId = 0;
        this.taskList = [];
        this.curTaskId = "";
        this.curTaskType = 0;
        this.taskStateMap = {};
        this.isTimerPause = false;
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
    };
    TaskManager.isEnable = true; // 功能开关 兼容有些皮肤不开放
    return TaskManager;
}());
exports.default = TaskManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFRhc2tNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTZDO0FBRTdDLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQztBQUMvQixJQUFNLFFBQVEsR0FBRywwQkFBMEIsQ0FBQztBQUM1QyxJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDbkI7SUFBQTtRQXFCWSxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztJQTZIakMsQ0FBQztJQXRKRyxtQkFBbUI7SUFDTCx5QkFBYSxHQUEzQixVQUE0QixJQUFhO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFbUIsc0JBQVUsR0FBOUI7OztnQkFDSSxzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUMvQixNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHOzRCQUNsRSxJQUFJLEdBQUcsRUFBQztnQ0FDSixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ2Y7aUNBQ0c7Z0NBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUNoQjt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsRUFBQTs7O0tBQ0w7SUFXTSwwQkFBSSxHQUFYLFVBQVksUUFBaUIsRUFBRSxNQUFjLEVBQUUsR0FBVztRQUExRCxpQkE2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SyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVNLCtCQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO1lBQ3JCLE9BQU87UUFDWCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUF0SmMsb0JBQVEsR0FBRyxJQUFJLENBQUMsQ0FBSSxpQkFBaUI7SUF1SnhELGtCQUFDO0NBeEpELEFBd0pDLElBQUE7a0JBeEpvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhc2tDb21wIGZyb20gXCIuLi9jb21wb25lbnQvVGFza0NvbXBcIjtcclxuXHJcbmNvbnN0IGJhc2VCdW5kbGUgPSBcInJlc291cmNlc1wiO1xyXG5jb25zdCB0YXNrUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL3Rhc2tOb2RlXCI7XHJcbmNvbnN0IGludGVydmFsID0gNTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza01hbmFnZXJ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc0VuYWJsZSA9IHRydWU7ICAgIC8vIOWKn+iDveW8gOWFsyDlhbzlrrnmnInkupvnmq7ogqTkuI3lvIDmlL5cclxuICAgIC8qKiDorr7nva7ku7vliqHlrp3nrrHlip/og73mmK/lkKblvIDmlL4gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0VGFza0VuYWJsZShmbGFnOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmlzRW5hYmxlID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHByZWxvYWRSZXMoKXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlUmVzKGJhc2VCdW5kbGUsIFt0YXNrUGF0aF0sIChlcnIsIHJlcyk9PntcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgdGltZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZ2FtZUlkOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSB0YXNrTGlzdDogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgY3VyVGFza0lkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBjdXJUYXNrVHlwZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgdGFza1N0YXRlTWFwID0ge307XHJcbiAgICBwcml2YXRlIHRhc2tDb21wOiBUYXNrQ29tcDtcclxuICAgIHByaXZhdGUgaXNUaW1lclBhdXNlID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGluaXQocm9vdE5vZGU6IGNjLk5vZGUsIGdhbWVJZDogbnVtYmVyLCBkaXI6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKCFUYXNrTWFuYWdlci5pc0VuYWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghcm9vdE5vZGUgfHwgIWNjLmlzVmFsaWQocm9vdE5vZGUpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5nYW1lSWQgPSBnYW1lSWQ7XHJcbiAgICAgICAgbGV0IHByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKGJhc2VCdW5kbGUsIHRhc2tQYXRoLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGlmICghcHJlZmFiKXtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlUmVzKGJhc2VCdW5kbGUsIHRhc2tQYXRoLCAoZXJyb3IsIHByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwgfHwgcHJlZmFiID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLliqDovb3otYTmupDplJnor69cIiwgYmFzZUJ1bmRsZSwgdGFza1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvcHlOb2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUocHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgY29weU5vZGUuc2V0UGFyZW50KHJvb3ROb2RlKTtcclxuICAgICAgICAgICAgICAgIGNvcHlOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tDb21wID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQoY29weU5vZGUsIFwiXCIsIFRhc2tDb21wKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza0NvbXAuaW5pdFRhc2soZGlyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNvcHlOb2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgY29weU5vZGUuc2V0UGFyZW50KHJvb3ROb2RlKTtcclxuICAgICAgICAgICAgY29weU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrQ29tcCA9IEdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50KGNvcHlOb2RlLCBcIlwiLCBUYXNrQ29tcCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0NvbXAuaW5pdFRhc2soZGlyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMub25SZXN1bWUsIHRoaXMpO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLm9uUGF1c2UsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXFHZXRHYW1lVGFza0xpc3QoKXtcclxuICAgICAgICBpZiAoIXRoaXMuZ2FtZUlkKVxyXG4gICAgICAgICAgICByZXR1cm4vLyBjb25zb2xlLmVycm9yKFwiZ2FtZWlkIG5vdCBpbml0IDFcIiwgdGhpcy5nYW1lSWQpO1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHt9O1xyXG4gICAgICAgIHBhcmFtW1wiZ2FtZV9pZFwiXSA9IHRoaXMuZ2FtZUlkO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIFwiR2V0R2FtZVRhc2tBY3Rpdml0eUxpc3RcIiwgcGFyYW0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRhc2tDb21wIHx8ICFjYy5pc1ZhbGlkKHRoaXMudGFza0NvbXApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0ID0gbXNnLmRhdGEgfHwgW107XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTm90V29ya2VkKCk7XHJcbiAgICAgICAgfSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VhcmNoTm90V29ya2VkKCl7XHJcbiAgICAgICAgaWYgKHRoaXMudGFza0xpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRhc2tMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrID0gdGhpcy50YXNrTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza1N0YXRlTWFwW3Rhc2sudGFza19pZF0gPSB0YXNrLnRhc2tfc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sudGFza19zdGF0dXMgIT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJUYXNrSWQgPSB0YXNrLnRhc2tfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJUYXNrVHlwZSA9IHRhc2suZ2xvYmFsX3Rhc2tfdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVxR2V0Q29tbWlzaW9uSW5mbygpe1xyXG4gICAgICAgIGlmICghVGFza01hbmFnZXIuaXNFbmFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoIXRoaXMuY3VyVGFza0lkIHx8ICF0aGlzLmN1clRhc2tUeXBlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVJZClcclxuICAgICAgICAgICAgcmV0dXJuLy8gY29uc29sZS5lcnJvcihcImdhbWVpZCBub3QgaW5pdCAyXCIsIHRoaXMuZ2FtZUlkKTtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7fTtcclxuICAgICAgICBwYXJhbVtcImdsb2JhbF90YXNrX3R5cGVcIl0gPSB0aGlzLmN1clRhc2tUeXBlIHx8IDA7XHJcbiAgICAgICAgcGFyYW1bXCJ0YXNrX2lkXCJdID0gdGhpcy5jdXJUYXNrSWQgfHwgXCJcIjtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBcIkdldE9uZVRhc2tBY3Rpdml0eUluZm9cIiwgcGFyYW0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRhc2tDb21wIHx8ICFjYy5pc1ZhbGlkKHRoaXMudGFza0NvbXApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZighbXNnIHx8ICFtc2cudGFza19pZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47ICAgICAvLyAxU+WGhemHjeWkjeivt+axgiwg5Lya6L+U5Zue56m655qE6buY6K6k5pWw5o2uLCDnm7TmjqXliZTpmaTmjoksIGRlYnVnIOWkhOeQhuivt+axguaXtumHjei/nuS8mui/nue7reivt+axguS4pOasoSDlvLnpopHnuYHor7fmsYJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRhc2tDb21wLnVwZGF0ZVRhc2sobXNnKTtcclxuICAgICAgICAgICAgdGhpcy50YXNrU3RhdGVNYXBbbXNnLnRhc2tfaWRdID0gbXNnLnRhc2tfc3RhdHVzO1xyXG4gICAgICAgICAgICBpZiAobXNnLnRhc2tfc3RhdHVzID09IDIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hOb3RXb3JrZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIG51bGwsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRSZXFUaW1lcigpe1xyXG4gICAgICAgIGlmICghVGFza01hbmFnZXIuaXNFbmFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy50aW1lcil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFJlcVRpbWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnJlcUdldENvbW1pc2lvbkluZm8oKTtcclxuICAgICAgICB9LCBpbnRlcnZhbCAqIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25SZXN1bWUoKXtcclxuICAgICAgICBpZiAodGhpcy5pc1RpbWVyUGF1c2UpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRSZXFUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25QYXVzZSgpe1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVyKXtcclxuICAgICAgICAgICAgdGhpcy5pc1RpbWVyUGF1c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BSZXFUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0b3BSZXFUaW1lcigpe1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGlzcG9zZSgpe1xyXG4gICAgICAgIGlmICghVGFza01hbmFnZXIuaXNFbmFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnN0b3BSZXFUaW1lcigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUlkID0gMDtcclxuICAgICAgICB0aGlzLnRhc2tMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJUYXNrSWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY3VyVGFza1R5cGUgPSAwO1xyXG4gICAgICAgIHRoaXMudGFza1N0YXRlTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5pc1RpbWVyUGF1c2UgPSBmYWxzZTtcclxuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMub25SZXN1bWUsIHRoaXMpO1xyXG4gICAgICAgIGNjLmdhbWUub2ZmKGNjLmdhbWUuRVZFTlRfSElERSwgdGhpcy5vblBhdXNlLCB0aGlzKTtcclxuICAgIH1cclxufSJdfQ==