
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/CommisionModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a6464kE6dJAgqAuTLPN6af8', 'CommisionModel');
// hall/scripts/logic/hallcommon/model/CommisionModel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var CommisionModel = /** @class */ (function (_super) {
    __extends(CommisionModel, _super);
    function CommisionModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 红点控制
         */
        _this._redFlag = false;
        _this.commisionList = null;
        _this.commisionInfoTable = {};
        return _this;
    }
    Object.defineProperty(CommisionModel.prototype, "Name", {
        get: function () {
            return "CommisionModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommisionModel.prototype, "redSwitch", {
        get: function () {
            return this._redFlag;
        },
        set: function (flag) {
            this._redFlag = flag;
        },
        enumerable: false,
        configurable: true
    });
    CommisionModel.prototype.onInit = function () {
    };
    /**
     * 请求所有任务列表
     */
    CommisionModel.prototype.reqGetCommisionAllList = function () {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetTaskActivityAllList, {}, function (msg) {
            _this.commisionList = msg.data;
            _this.event(CommisionModel.UpdateleftView, msg.data);
        }, this.CommisionModelErrorFunc.bind(this), false);
    };
    /**
     *
     * @param type 请求任务数据
     */
    CommisionModel.prototype.reqGetCommisionInfo = function (type) {
        var _this = this;
        // Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"requestTaskInfo")
        var param = {};
        param["global_task_type"] = type;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetMyTaskActivityInfo, param, function (msg) {
            _this.commisionInfoTable[type] = msg;
            // Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"requestTaskInfo")
            _this.event(CommisionModel.UpdateScrollview, msg);
        }, this.CommisionModelErrorFunc.bind(this), false);
    };
    /**
     * 领取任务奖励
     * @param type 任务类型
     * @param id 任务id
     */
    CommisionModel.prototype.reqGetCommisionAward = function (type, id) {
        var _this = this;
        var param = {};
        param["task_id"] = id;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetMyTaskActivityReward, param, function (msg) {
            _this.updataCommisionData(type, id);
            _this.event(CommisionModel.GetCommisionAward, { "task_reward": msg.task_reward, "task_id": id, "global_task_type": type });
        }, this.CommisionModelErrorFunc.bind(this), false);
    };
    CommisionModel.prototype.CommisionModelErrorFunc = function (data) {
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr + "");
            //Global.UI.fastTip(data._errstr + "[" + data._errno + "]");
        }
    };
    CommisionModel.prototype.GetCommisionInfoByType = function (type) {
        if (this.commisionInfoTable.hasOwnProperty(type)) {
            return this.commisionInfoTable[type];
        }
        return null;
    };
    /**
     * 根据任务类型检查该项任务是否有可以领取的
     * @param type 任务类型
     */
    CommisionModel.prototype.checkIsAnyCommisionCanGet = function (type) {
        if (!this.commisionInfoTable.hasOwnProperty(type)) {
            return false;
        }
        var commisionData = this.commisionInfoTable[type].data;
        for (var index = 0; index < commisionData.length; index++) {
            var element = commisionData[index];
            if (element.task_status == 1) {
                return true;
            }
        }
        return false;
    };
    /**
     * 领取后根据任务类型和id刷新本地数据
     * @param type 任务类型
     * @param id  任务id
     */
    CommisionModel.prototype.updataCommisionData = function (type, id) {
        if (!this.commisionInfoTable.hasOwnProperty(type)) {
            return;
        }
        var commisionReduce = false; //本地维护任务数量
        var commisionData = this.commisionInfoTable[type].data;
        for (var index = 0; index < commisionData.length; index++) {
            var element = commisionData[index];
            if (element.task_id == id) {
                commisionReduce = true;
                element.task_status = 2;
                break;
            }
        }
        if (commisionReduce) {
            var subItem = this.commisionList.find(function (item) {
                return item.global_task_type == type;
            });
            if (subItem != null) {
                subItem.task_num -= 1;
            }
        }
    };
    CommisionModel.prototype.checkShowHallRedSpot = function () {
        if (!this.commisionList) {
            this.redSwitch = false;
            return false;
        }
        for (var index = 0; index < this.commisionList.length; index++) {
            var element = this.commisionList[index];
            // if(element.global_task_type == 7){//屏蔽掉游戏活跃
            //     continue;
            // }
            if (element.task_num > 0) {
                this.redSwitch = true;
                return true;
            }
        }
        this.redSwitch = false;
        return false;
    };
    CommisionModel.prototype.resetData = function () {
        this.commisionList = null;
        this.commisionInfoTable = {};
    };
    CommisionModel.UpdateScrollview = "UpdateScrollview";
    CommisionModel.UpdateleftView = "UpdateleftView";
    CommisionModel.GetCommisionAward = "GetCommisionAward";
    return CommisionModel;
}(ModelBase_1.default));
exports.default = CommisionModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxDb21taXNpb25Nb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0QseURBQTBEO0FBRzFEO0lBQTRDLGtDQUFTO0lBQXJEO1FBQUEscUVBdUxDO1FBL0tHOztXQUVHO1FBQ0ssY0FBUSxHQUFXLEtBQUssQ0FBQTtRQWF6QixtQkFBYSxHQUFHLElBQUksQ0FBQTtRQUVwQix3QkFBa0IsR0FBMEIsRUFBRSxDQUFBOztJQTZKekQsQ0FBQztJQXBMRyxzQkFBVyxnQ0FBSTthQUFmO1lBRUksT0FBTyxnQkFBZ0IsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQU9ELHNCQUFXLHFDQUFTO2FBTXBCO1lBRUcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3ZCLENBQUM7YUFURCxVQUFxQixJQUFJO1lBRXJCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBRXhCLENBQUM7OztPQUFBO0lBaUJTLCtCQUFNLEdBQWhCO0lBRUEsQ0FBQztJQUVEOztPQUVHO0lBQ0ksK0NBQXNCLEdBQTdCO1FBQUEsaUJBUUM7UUFORyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsRUFBRSxVQUFDLEdBQUc7WUFDOUUsS0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1lBQzdCLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEQsQ0FBQyxFQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFHcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJ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LENBQUM7WUFDeEMsOENBQThDO1lBQzlDLGdCQUFnQjtZQUNoQixJQUFJO1lBQ0osSUFBRyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsRUFDdkI7Z0JBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFBO2FBQ2Q7U0FDSjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO1FBQ3RCLE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFTSxrQ0FBUyxHQUFoQjtRQUVJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUE7SUFDaEMsQ0FBQztJQXRKYSwrQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUN0Qyw2QkFBYyxHQUFHLGdCQUFnQixDQUFDO0lBQ2xDLGdDQUFpQixHQUFHLG1CQUFtQixDQUFDO0lBeUoxRCxxQkFBQztDQXZMRCxBQXVMQyxDQXZMMkMsbUJBQVMsR0F1THBEO2tCQXZMb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2RlbC9Nb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWlzaW9uTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcbiAgIFxyXG4gICBcclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiQ29tbWlzaW9uTW9kZWxcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe6oueCueaOp+WItlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZWRGbGFnOmJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcmVkU3dpdGNoKGZsYWcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fcmVkRmxhZyA9IGZsYWdcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlZFN3aXRjaCgpXHJcbiAgICB7XHJcbiAgICAgICByZXR1cm4gdGhpcy5fcmVkRmxhZ1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb21taXNpb25MaXN0ID0gbnVsbFxyXG5cclxuICAgIHB1YmxpYyBjb21taXNpb25JbmZvVGFibGUgOnsgW2tleTogbnVtYmVyXTogYW55IH0gPXt9IFxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVXBkYXRlU2Nyb2xsdmlldyA9IFwiVXBkYXRlU2Nyb2xsdmlld1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBVcGRhdGVsZWZ0VmlldyA9IFwiVXBkYXRlbGVmdFZpZXdcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0Q29tbWlzaW9uQXdhcmQgPSBcIkdldENvbW1pc2lvbkF3YXJkXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBVcGRhdGVEYXRhIDogXCJVcGRhdGVEYXRhXCJcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivt+axguaJgOacieS7u+WKoeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVxR2V0Q29tbWlzaW9uQWxsTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRUYXNrQWN0aXZpdHlBbGxMaXN0LCB7fSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1pc2lvbkxpc3QgPSBtc2cuZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KENvbW1pc2lvbk1vZGVsLlVwZGF0ZWxlZnRWaWV3LG1zZy5kYXRhKVxyXG4gICAgICAgIH0sdGhpcy5Db21taXNpb25Nb2RlbEVycm9yRnVuYy5iaW5kKHRoaXMpLGZhbHNlKVxyXG4gICAgICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHR5cGUg6K+35rGC5Lu75Yqh5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXFHZXRDb21taXNpb25JbmZvKHR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsXCJyZXF1ZXN0VGFza0luZm9cIilcclxuICAgICAgICBsZXQgcGFyYW0gPSB7fVxyXG4gICAgICAgIHBhcmFtW1wiZ2xvYmFsX3Rhc2tfdHlwZVwiXSA9IHR5cGVcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldE15VGFza0FjdGl2aXR5SW5mbywgcGFyYW0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb21taXNpb25JbmZvVGFibGVbdHlwZV0gPSBtc2dcclxuICAgICAgICAgICAgLy8gR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsXCJyZXF1ZXN0VGFza0luZm9cIilcclxuICAgICAgICAgICAgdGhpcy5ldmVudChDb21taXNpb25Nb2RlbC5VcGRhdGVTY3JvbGx2aWV3LG1zZylcclxuICAgICAgICB9LHRoaXMuQ29tbWlzaW9uTW9kZWxFcnJvckZ1bmMuYmluZCh0aGlzKSxmYWxzZSlcclxuICAgICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpooblj5bku7vliqHlpZblirFcclxuICAgICAqIEBwYXJhbSB0eXBlIOS7u+WKoeexu+Wei1xyXG4gICAgICogQHBhcmFtIGlkIOS7u+WKoWlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXFHZXRDb21taXNpb25Bd2FyZCh0eXBlLGlkKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHt9XHJcbiAgICAgICAgcGFyYW1bXCJ0YXNrX2lkXCJdID0gaWRcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldE15VGFza0FjdGl2aXR5UmV3YXJkLCBwYXJhbSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0YUNvbW1pc2lvbkRhdGEodHlwZSxpZClcclxuICAgICAgICAgICAgdGhpcy5ldmVudChDb21taXNpb25Nb2RlbC5HZXRDb21taXNpb25Bd2FyZCx7XCJ0YXNrX3Jld2FyZFwiOm1zZy50YXNrX3Jld2FyZCxcInRhc2tfaWRcIjppZCxcImdsb2JhbF90YXNrX3R5cGVcIjp0eXBlfSlcclxuICAgICAgICB9LHRoaXMuQ29tbWlzaW9uTW9kZWxFcnJvckZ1bmMuYmluZCh0aGlzKSxmYWxzZSlcclxuICAgICAgICAgICBcclxuXHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIHByaXZhdGUgQ29tbWlzaW9uTW9kZWxFcnJvckZ1bmMoZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX2VycnN0ciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGRhdGEuX2VycnN0ciArIFwiXCIpO1xyXG4gICAgICAgICAgICAvL0dsb2JhbC5VSS5mYXN0VGlwKGRhdGEuX2VycnN0ciArIFwiW1wiICsgZGF0YS5fZXJybm8gKyBcIl1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDb21taXNpb25JbmZvQnlUeXBlKHR5cGU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbW1pc2lvbkluZm9UYWJsZS5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21taXNpb25JbmZvVGFibGVbdHlwZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5Lu75Yqh57G75Z6L5qOA5p+l6K+l6aG55Lu75Yqh5piv5ZCm5pyJ5Y+v5Lul6aKG5Y+W55qEXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDku7vliqHnsbvlnotcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrSXNBbnlDb21taXNpb25DYW5HZXQodHlwZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29tbWlzaW9uSW5mb1RhYmxlLmhhc093blByb3BlcnR5KHR5cGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29tbWlzaW9uRGF0YSA9IHRoaXMuY29tbWlzaW9uSW5mb1RhYmxlW3R5cGVdLmRhdGFcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29tbWlzaW9uRGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjb21taXNpb25EYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgaWYoZWxlbWVudC50YXNrX3N0YXR1cyA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpooblj5blkI7moLnmja7ku7vliqHnsbvlnovlkoxpZOWIt+aWsOacrOWcsOaVsOaNrlxyXG4gICAgICogQHBhcmFtIHR5cGUg5Lu75Yqh57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaWQgIOS7u+WKoWlkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRhQ29tbWlzaW9uRGF0YSh0eXBlLGlkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5jb21taXNpb25JbmZvVGFibGUuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb21taXNpb25SZWR1Y2UgPSBmYWxzZTsgICAgICAgIC8v5pys5Zyw57u05oqk5Lu75Yqh5pWw6YePXHJcbiAgICAgICAgbGV0IGNvbW1pc2lvbkRhdGEgPSB0aGlzLmNvbW1pc2lvbkluZm9UYWJsZVt0eXBlXS5kYXRhXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbW1pc2lvbkRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY29tbWlzaW9uRGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQudGFza19pZCA9PSBpZClcclxuICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgY29tbWlzaW9uUmVkdWNlID10cnVlO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC50YXNrX3N0YXR1cyA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb21taXNpb25SZWR1Y2Upe1xyXG4gICAgICAgICAgICBsZXQgc3ViSXRlbSA9IHRoaXMuY29tbWlzaW9uTGlzdC5maW5kKChpdGVtKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2xvYmFsX3Rhc2tfdHlwZSA9PSB0eXBlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZihzdWJJdGVtICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS50YXNrX251bSAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNoZWNrU2hvd0hhbGxSZWRTcG90KClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5jb21taXNpb25MaXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWRTd2l0Y2ggPSBmYWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuY29tbWlzaW9uTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmNvbW1pc2lvbkxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAvLyBpZihlbGVtZW50Lmdsb2JhbF90YXNrX3R5cGUgPT0gNyl7Ly/lsY/olL3mjonmuLjmiI/mtLvot4NcclxuICAgICAgICAgICAgLy8gICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQudGFza19udW0gPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZFN3aXRjaCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWRTd2l0Y2ggPSBmYWxzZVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldERhdGEoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY29tbWlzaW9uTGlzdCA9IG51bGxcclxuICAgICAgICB0aGlzLmNvbW1pc2lvbkluZm9UYWJsZSA9IHt9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG59Il19