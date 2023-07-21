
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/model/ModelMananger.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '96635gKJrJIipoo7oG+br39', 'ModelMananger');
// hall/scripts/framework/model/ModelMananger.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 各数据模块管理器
 */
var ModelManager = /** @class */ (function () {
    function ModelManager() {
        this.modelMap = {};
    }
    Object.defineProperty(ModelManager, "Instance", {
        get: function () {
            if (ModelManager._instance == null) {
                ModelManager._instance = new ModelManager();
            }
            return ModelManager._instance;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化函数
     */
    ModelManager.prototype.init = function () {
    };
    /**
     * 根据名字获取对应的数据模块(非泛型方式)
     * @param modelName 数据模块名字
     */
    ModelManager.prototype.getModel = function (modelName) {
        if (this.modelMap[modelName] == null) {
            Logger.log("ModelManager::getModel() 未找到 " + modelName);
            return null;
        }
        return this.modelMap[modelName];
    };
    /**
     * 根据名字获取对应的数据模块(泛型方式)
     * @param modelName 数据模块名字
     */
    ModelManager.prototype.getModelEx = function (modelName) {
        if (this.modelMap[modelName] == null) {
            Logger.log("ModelManager::getModelEx() 未找到 " + modelName);
            return null;
        }
        return this.modelMap[modelName];
    };
    /**
     * 注册数据模块
     * @param model 数据模块实例
     */
    ModelManager.prototype.registerModel = function (model) {
        if (model == null) {
            Logger.error("ModelManager::registerModel() model == null, return");
            return;
        }
        if (model.Name == "" || model.Name == "ModelBase") {
            Logger.error("ModelManager::registerModel() 请在构造函数中给model模块指定名字, return");
            return;
        }
        if (this.modelMap.hasOwnProperty(model.Name)) {
            Logger.log("ModelManager::registerModel() 重复注册 " + model.Name);
            return;
        }
        this.modelMap[model.Name] = model;
    };
    /**
     * 反注册数据模块
     * @param modelName 数据模块名字
     */
    ModelManager.prototype.unRegisterModel = function (modelName) {
        if (this.modelMap.hasOwnProperty(modelName)) {
            var model = this.modelMap[modelName];
            if (model != null) {
                model.clear();
            }
            this.modelMap[modelName] = null;
        }
    };
    /**
     * 反注册所有数据模块
     * @param modelName 数据模块名字
     */
    ModelManager.prototype.unRegisterAll = function () {
        this.clear();
        this.modelMap = {};
    };
    /**
     * 清理所有数据模块
     */
    ModelManager.prototype.clear = function () {
        for (var key in this.modelMap) {
            var model = this.modelMap[key];
            if (model != null) {
                model.clear();
            }
        }
    };
    return ModelManager;
}());
exports.default = ModelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxtb2RlbFxcTW9kZWxNYW5hbmdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztHQUVHO0FBQ0g7SUFZSTtRQVZVLGFBQVEsR0FBNEIsRUFBRSxDQUFDO0lBWWpELENBQUM7SUFURCxzQkFBa0Isd0JBQVE7YUFBMUI7WUFDSSxJQUFHLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUMvQixZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7YUFDL0M7WUFDRCxPQUFPLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFNRDs7T0FFRztJQUNJLDJCQUFJLEdBQVg7SUFFQSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksK0JBQVEsR0FBZixVQUFnQixTQUFnQjtRQUM1QixJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDeEQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUNBQVUsR0FBakIsVUFBdUMsU0FBZ0I7UUFDbkQsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQzFELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFNLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG9DQUFhLEdBQXBCLFVBQXFCLEtBQWU7UUFDaEMsSUFBRyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQ3BFLE9BQU87U0FDVjtRQUNELElBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxXQUFXLEVBQUU7WUFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1lBQzFFLE9BQU87U0FDVjtRQUNELElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUMzQztZQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0NBQWUsR0FBdEIsVUFBdUIsU0FBZ0I7UUFDbkMsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN4QyxJQUFJLEtBQUssR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLElBQUcsS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDZCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDakI7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxvQ0FBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFLLEdBQVo7UUFDSSxLQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDMUIsSUFBSSxLQUFLLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxJQUFHLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2pCO1NBQ0o7SUFDTCxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQXZHQSxBQXVHQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi9Nb2RlbEJhc2VcIjtcclxuXHJcbi8qKlxyXG4gKiDlkITmlbDmja7mqKHlnZfnrqHnkIblmahcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVsTWFuYWdlclxyXG57XHJcbiAgICBwcm90ZWN0ZWQgbW9kZWxNYXA6e1trZXk6c3RyaW5nXTpNb2RlbEJhc2V9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOk1vZGVsTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmKE1vZGVsTWFuYWdlci5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBNb2RlbE1hbmFnZXIuX2luc3RhbmNlID0gbmV3IE1vZGVsTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTW9kZWxNYW5hZ2VyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWQjeWtl+iOt+WPluWvueW6lOeahOaVsOaNruaooeWdlyjpnZ7ms5vlnovmlrnlvI8pXHJcbiAgICAgKiBAcGFyYW0gbW9kZWxOYW1lIOaVsOaNruaooeWdl+WQjeWtl1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TW9kZWwobW9kZWxOYW1lOnN0cmluZyk6YW55IHtcclxuICAgICAgICBpZih0aGlzLm1vZGVsTWFwW21vZGVsTmFtZV0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiTW9kZWxNYW5hZ2VyOjpnZXRNb2RlbCgpIOacquaJvuWIsCBcIiArIG1vZGVsTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbE1hcFttb2RlbE5hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5ZCN5a2X6I635Y+W5a+55bqU55qE5pWw5o2u5qih5Z2XKOazm+Wei+aWueW8jylcclxuICAgICAqIEBwYXJhbSBtb2RlbE5hbWUg5pWw5o2u5qih5Z2X5ZCN5a2XXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRNb2RlbEV4PFQgZXh0ZW5kcyBNb2RlbEJhc2U+KG1vZGVsTmFtZTpzdHJpbmcpOlQge1xyXG4gICAgICAgIGlmKHRoaXMubW9kZWxNYXBbbW9kZWxOYW1lXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJNb2RlbE1hbmFnZXI6OmdldE1vZGVsRXgoKSDmnKrmib7liLAgXCIgKyBtb2RlbE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxNYXBbbW9kZWxOYW1lXSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rOo5YaM5pWw5o2u5qih5Z2XXHJcbiAgICAgKiBAcGFyYW0gbW9kZWwg5pWw5o2u5qih5Z2X5a6e5L6LXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWdpc3Rlck1vZGVsKG1vZGVsOk1vZGVsQmFzZSkge1xyXG4gICAgICAgIGlmKG1vZGVsID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiTW9kZWxNYW5hZ2VyOjpyZWdpc3Rlck1vZGVsKCkgbW9kZWwgPT0gbnVsbCwgcmV0dXJuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1vZGVsLk5hbWUgPT0gXCJcIiB8fCBtb2RlbC5OYW1lID09IFwiTW9kZWxCYXNlXCIpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiTW9kZWxNYW5hZ2VyOjpyZWdpc3Rlck1vZGVsKCkg6K+35Zyo5p6E6YCg5Ye95pWw5Lit57uZbW9kZWzmqKHlnZfmjIflrprlkI3lrZcsIHJldHVyblwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm1vZGVsTWFwLmhhc093blByb3BlcnR5KG1vZGVsLk5hbWUpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIk1vZGVsTWFuYWdlcjo6cmVnaXN0ZXJNb2RlbCgpIOmHjeWkjeazqOWGjCBcIiArIG1vZGVsLk5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWxNYXBbbW9kZWwuTmFtZV0gPSBtb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPjeazqOWGjOaVsOaNruaooeWdl1xyXG4gICAgICogQHBhcmFtIG1vZGVsTmFtZSDmlbDmja7mqKHlnZflkI3lrZdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVuUmVnaXN0ZXJNb2RlbChtb2RlbE5hbWU6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5tb2RlbE1hcC5oYXNPd25Qcm9wZXJ0eShtb2RlbE5hbWUpKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbDpNb2RlbEJhc2UgPSB0aGlzLm1vZGVsTWFwW21vZGVsTmFtZV07XHJcbiAgICAgICAgICAgIGlmKG1vZGVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb2RlbE1hcFttb2RlbE5hbWVdID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Y+N5rOo5YaM5omA5pyJ5pWw5o2u5qih5Z2XXHJcbiAgICAgKiBAcGFyYW0gbW9kZWxOYW1lIOaVsOaNruaooeWdl+WQjeWtl1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdW5SZWdpc3RlckFsbCgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbE1hcCA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF55CG5omA5pyJ5pWw5o2u5qih5Z2XXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLm1vZGVsTWFwKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbDpNb2RlbEJhc2UgPSB0aGlzLm1vZGVsTWFwW2tleV07XHJcbiAgICAgICAgICAgIGlmKG1vZGVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19