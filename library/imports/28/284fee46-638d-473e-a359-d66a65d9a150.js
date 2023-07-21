"use strict";
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