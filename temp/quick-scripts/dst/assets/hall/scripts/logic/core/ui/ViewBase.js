
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/ui/ViewBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8edd0A4ABED6YkUJn/7xm+', 'ViewBase');
// hall/scripts/logic/core/ui/ViewBase.ts

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
exports.LoadingState = void 0;
var ViewBase = /** @class */ (function () {
    function ViewBase() {
        //private resPath :string
        this.viewList = [];
        this._loadingState = LoadingState.None;
        this._active = false;
    }
    Object.defineProperty(ViewBase.prototype, "subViewState", {
        /**
         * 子view的显示隐藏状态
         */
        get: function () {
            return this._subViewState;
        },
        /**
         * 子view状态 true 显示 false 隐藏
         */
        set: function (value) {
            if (this._subViewState == value) {
                return;
            }
            this._subViewState = value;
            if (this.loadingState != LoadingState.Loaded || !cc.isValid(this.node)) {
                return;
            }
            this.node.active = value;
            if (value) {
                this.onSubViewShow();
            }
            else {
                this.onSubViewHide();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBase.prototype, "loadingState", {
        /**
        * 子view加载状态
        */
        get: function () {
            return this._loadingState;
        },
        /**
         * 子view加载状态
         */
        set: function (state) {
            /**
             * 如果加载完成时subViewState为true则说明 需要显示
             */
            if (this.subViewState == true && state == LoadingState.Loaded) {
                this.onSubViewShow();
                if (cc.isValid(this.node)) {
                    this.node.active = true;
                }
            }
            this._loadingState = state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBase.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            this._active = value;
            if (this.node && cc.isValid(this.node)) {
                this.node.active = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    ViewBase.prototype.setNode = function (node) {
        if (node == null)
            return;
        this.node = node;
        this.initView();
    };
    //界面加载完后初始化
    ViewBase.prototype.initView = function () { };
    //面板打开回调
    ViewBase.prototype.onOpen = function (args) { };
    //界面关闭时回调
    ViewBase.prototype.onClose = function () { };
    //界面销毁
    ViewBase.prototype.onDispose = function () { };
    ViewBase.prototype.onSubViewShow = function () {
    };
    ViewBase.prototype.onSubViewHide = function () {
    };
    ViewBase.prototype.getComponent = function (path, type) {
        if (this.node == null)
            return null;
        if (path == "" || path == null)
            return this.node.getComponent(type);
        var node = cc.find(path, this.node);
        if (node == null)
            return null;
        return node.getComponent(type);
    };
    ViewBase.prototype.getChild = function (path) {
        if (path === "") {
            return this.node;
        }
        return cc.find(path, this.node);
    };
    ViewBase.prototype.addCommonClick = function (path, callback, target, transition, time) {
        if (transition === void 0) { transition = cc.Button.Transition.SCALE; }
        return Global.UIHelper.addCommonClick(this.node, path, callback, target, transition, time);
    };
    ViewBase.prototype.addView = function (key, node, viewClass, active) {
        if (active === void 0) { active = null; }
        var view = this.getView(key);
        if (view != null) {
            Logger.error("重复注册子View");
            return view;
        }
        if (node == null) {
            Logger.error("没有给子View设置节点");
            return;
        }
        view = new viewClass();
        view.internalEvent = this.internalEvent;
        view.setNode(node);
        view.loadingState = LoadingState.Loaded;
        view.viewKey = key;
        this.viewList.push(view);
        if (active != null) {
            view.subViewState = active;
        }
        return view;
    };
    /**
     *
     * @param subViewPath key 跟预设资源的映射
     * @param viewKeyTypeMap key 跟类型的预设
     * @param parentNode 子view的父节点
     */
    ViewBase.prototype.initSubView = function (subViewPath, viewKeyTypeMap, parentNode) {
        var _this = this;
        if (!subViewPath || !viewKeyTypeMap || !parentNode) {
            return;
        }
        var frameLoadingKey = [];
        for (var key in subViewPath) {
            if (subViewPath.hasOwnProperty(key)) {
                frameLoadingKey.push(key);
            }
        }
        return new Promise(function (resolve) {
            var execute = function () { return __awaiter(_this, void 0, void 0, function () {
                var loadingKey, path, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(frameLoadingKey.length > 0)) return [3 /*break*/, 2];
                            loadingKey = frameLoadingKey.shift();
                            path = null;
                            if (subViewPath.hasOwnProperty(loadingKey)) {
                                path = subViewPath[loadingKey];
                            }
                            _a = this;
                            _b = loadingKey;
                            return [4 /*yield*/, this.addSubView(loadingKey, viewKeyTypeMap[loadingKey], path, parentNode)];
                        case 1:
                            _a[_b] = _c.sent();
                            return [3 /*break*/, 0];
                        case 2:
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); };
            // 运行执行函数
            execute();
        });
    };
    /**
     * 初始化子View组件 不含node
     */
    ViewBase.prototype.initSubViewClass = function (viewKeyTypeMap) {
        if (!viewKeyTypeMap) {
            return;
        }
        for (var key in viewKeyTypeMap) {
            if (viewKeyTypeMap.hasOwnProperty(key)) {
                this[key] = this.initOneSubView(key, viewKeyTypeMap[key]);
            }
        }
    };
    ViewBase.prototype.initOneSubView = function (key, viewClass) {
        var view = this.getView(key);
        if (view != null) {
            Logger.error("重复注册子View");
            return view;
        }
        view = new viewClass();
        view.internalEvent = this.internalEvent;
        view.viewKey = key;
        this.viewList.push(view);
        return view;
    };
    /**
     * 初始化子view含Node
     * @param key viewKey
     * @param viewClass 子view类
     * @param path 预设资源路径
     * @param parentNode 子view父节点
     */
    ViewBase.prototype.addSubView = function (key, viewClass, path, parentNode) {
        return __awaiter(this, void 0, void 0, function () {
            var view, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = this.getView(key);
                        if (view == null) {
                            view = new viewClass();
                            view.internalEvent = this.internalEvent;
                            view.viewKey = key;
                            this.viewList.push(view);
                        }
                        view.loadingState = LoadingState.Loading;
                        return [4 /*yield*/, this.getSubView(path)];
                    case 1:
                        node = _a.sent();
                        if (!node) {
                            return [2 /*return*/, null];
                        }
                        view.setNode(node);
                        node.active = false;
                        parentNode.addChild(node);
                        view.loadingState = LoadingState.Loaded;
                        return [2 /*return*/, view];
                }
            });
        });
    };
    /**
     *
     * @param path 加载子View的预设的资源路径
     * @param viewKey 子view的viewKey
     */
    ViewBase.prototype.getSubView = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!path) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadOneNode(path)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ViewBase.prototype.loadOneNode = function (path) {
        return new Promise(function (resolve) {
            var execute = function () {
                Global.ResourceManager.loadRes(path, function (error, prefab) {
                    if (error != null) {
                        Logger.error(path, "加载失败");
                    }
                    var node = cc.instantiate(prefab);
                    if (cc.isValid(node)) {
                        resolve(node);
                    }
                });
            };
            execute();
        });
    };
    ViewBase.prototype.getView = function (key) {
        for (var i = 0; i < this.viewList.length; i++) {
            if (this.viewList[i].viewKey == key) {
                return this.viewList[i];
            }
        }
        return null;
    };
    ViewBase.prototype.open = function (args) {
        if (!this.active)
            return;
        this.onOpen(args);
    };
    ViewBase.prototype.tryOpen = function (args) {
        this.onOpen(args);
    };
    ViewBase.prototype.dispose = function () {
        this.onDispose();
        this.callAllView("onDispose");
        this.viewList = [];
    };
    ViewBase.prototype.resetState = function () {
    };
    /**
     * 关闭本界面所有子view
     * @param subView 显示的子view
     */
    ViewBase.prototype.closeAllSubView = function (subView) {
        for (var i = 0; i < this.viewList.length; i++) {
            var view = this.viewList[i];
            if (view) {
                view.subViewState = view == subView;
                view.realClose();
            }
        }
    };
    //所有子view调用方法
    ViewBase.prototype.callAllView = function (funcName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < this.viewList.length; i++) {
            var view = this.viewList[i];
            if (view[funcName]) {
                view[funcName].apply(view, args);
            }
            if (view) {
                view.callAllView(funcName, args);
            }
        }
    };
    ViewBase.prototype.realClose = function () {
        for (var i = 0; i < this.viewList.length; i++) {
            var view = this.viewList[i];
            if (view) {
                view.subViewState = false;
                view.realClose();
            }
        }
    };
    //调用单个组件方法
    ViewBase.prototype.callView = function (key, funcName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var view = this.getView(key);
        if (view == null) {
            Logger.error("找不到view", key);
            return null;
        }
        if (view[funcName]) {
            return view[funcName].apply(view, args);
        }
        return null;
    };
    return ViewBase;
}());
exports.default = ViewBase;
var LoadingState;
(function (LoadingState) {
    LoadingState[LoadingState["None"] = 1] = "None";
    LoadingState[LoadingState["Loading"] = 2] = "Loading";
    LoadingState[LoadingState["Loaded"] = 3] = "Loaded";
})(LoadingState = exports.LoadingState || (exports.LoadingState = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHVpXFxWaWV3QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTtJQUFBO1FBT0kseUJBQXlCO1FBQ2YsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQW1DekIsa0JBQWEsR0FBZ0IsWUFBWSxDQUFDLElBQUksQ0FBQTtRQW9DOUMsWUFBTyxHQUFHLEtBQUssQ0FBQztJQTJVOUIsQ0FBQztJQTNZRyxzQkFBVyxrQ0FBWTtRQUh2Qjs7V0FFRzthQUNIO1lBRUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFBO1FBQzdCLENBQUM7UUFFRDs7V0FFRzthQUNILFVBQXdCLEtBQUs7WUFDekIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLEtBQUssRUFDOUI7Z0JBQ0ksT0FBTTthQUNUO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDMUIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDcEUsT0FBTTthQUNUO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBRXhCLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTthQUN2QjtpQkFDSTtnQkFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7YUFDdkI7UUFDTCxDQUFDOzs7T0F2QkE7SUErQkQsc0JBQUksa0NBQVk7UUFpQmY7O1VBRUU7YUFDSDtZQUVJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUM3QixDQUFDO1FBMUJEOztXQUVHO2FBQ0gsVUFBa0IsS0FBa0I7WUFFaEM7O2VBRUc7WUFDSCxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxZQUFZLENBQUMsTUFBTSxFQUM1RDtnQkFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7Z0JBQ3BCLElBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ3hCO29CQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtpQkFDMUI7YUFFSjtZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFBO1FBQzlCLENBQUM7OztPQUFBO0lBaUJELHNCQUFXLDRCQUFNO2FBT2pCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFURCxVQUFrQixLQUFLO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQzs7O09BQUE7SUFNTSwwQkFBTyxHQUFkLFVBQWUsSUFBWTtRQUV2QixJQUFHLElBQUksSUFBSSxJQUFJO1lBQ1gsT0FBTztRQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVztJQUNELDJCQUFRLEdBQWxCLGNBQ0MsQ0FBQztJQUNGLFFBQVE7SUFDRSx5QkFBTSxHQUFoQixVQUFpQixJQUFXLElBQzNCLENBQUM7SUFDRixTQUFTO0lBQ0MsMEJBQU8sR0FBakIsY0FDQyxDQUFDO0lBRUYsTUFBTTtJQUNJLDRCQUFTLEdBQW5CLGNBQ0MsQ0FBQztJQUVRLGdDQUFhLEdBQXZCO0lBR0EsQ0FBQztJQUVTLGdDQUFhLEdBQXZCO0lBR0EsQ0FBQztJQUdNLCtCQUFZLEdBQW5CLFVBQTRDLElBQVcsRUFBRSxJQUFRO1FBRTdELElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLElBQUcsSUFBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksSUFBSTtZQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFHLElBQUksSUFBSSxJQUFJO1lBQ1gsT0FBTyxJQUFJLENBQUM7UUFDaEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLElBQVc7UUFFdkIsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFDO1lBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVTLGlDQUFjLEdBQXhCLFVBQXlCLElBQVcsRUFBRSxRQUFpQixFQUFFLE1BQVcsRUFBRSxVQUF1QyxFQUFFLElBQVk7UUFBckQsMkJBQUEsRUFBQSxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUs7UUFFekcsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRU0sMEJBQU8sR0FBZCxVQUFlLEdBQVUsRUFBRSxJQUFZLEVBQUUsU0FBUyxFQUFFLE1BQWE7UUFBYix1QkFBQSxFQUFBLGFBQWE7UUFFN0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM1QixJQUFJLElBQUksSUFBSSxJQUFJLEVBQ2hCO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBRyxJQUFJLElBQUksSUFBSSxFQUNmO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUE7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekIsSUFBRyxNQUFNLElBQUksSUFBSSxFQUNqQjtZQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw4QkFBVyxHQUFYLFVBQVksV0FBVyxFQUFDLGNBQWMsRUFBQyxVQUFVO1FBQWpELGlCQTJCQztRQTFCRyxJQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsVUFBVSxFQUNqRDtZQUNJLE9BQU07U0FDVDtRQUNELElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQTtRQUN4QixLQUFLLElBQUksR0FBRyxJQUFJLFdBQVcsRUFBRTtZQUN6QixJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDNUI7U0FDSjtRQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3RCLElBQUksT0FBTyxHQUFHOzs7OztpQ0FDSCxDQUFBLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBOzRCQUN6QixVQUFVLEdBQUcsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFBOzRCQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFBOzRCQUNmLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQ0FDeEMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTs2QkFDakM7NEJBQ0QsS0FBQSxJQUFJLENBQUE7NEJBQUMsS0FBQSxVQUFVLENBQUE7NEJBQUkscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFDLElBQUksRUFBQyxVQUFVLENBQUMsRUFBQTs7NEJBQWhHLE1BQWdCLEdBQUcsU0FBNkUsQ0FBQzs7OzRCQUVyRyxPQUFPLEVBQUUsQ0FBQTs7OztpQkFDWixDQUFDO1lBQ0YsU0FBUztZQUNULE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQ0FBZ0IsR0FBdkIsVUFBd0IsY0FBa0I7UUFFdEMsSUFBRyxDQUFDLGNBQWMsRUFDbEI7WUFDSSxPQUFNO1NBQ1Q7UUFDRCxLQUFLLElBQUksR0FBRyxJQUFJLGNBQWMsRUFBRTtZQUM1QixJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUMzRDtTQUNKO0lBQ0wsQ0FBQztJQUVNLGlDQUFjLEdBQXJCLFVBQXNCLEdBQUcsRUFBQyxTQUFTO1FBRS9CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDNUIsSUFBSSxJQUFJLElBQUksSUFBSSxFQUNoQjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVSw2QkFBVSxHQUF2QixVQUF3QixHQUFVLEVBQUMsU0FBUyxFQUFDLElBQVcsRUFBQyxVQUFrQjs7Ozs7O3dCQUVuRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDNUIsSUFBSSxJQUFJLElBQUksSUFBSSxFQUNoQjs0QkFDSSxJQUFJLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzs0QkFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzRCQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzVCO3dCQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQTt3QkFDN0IscUJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQW5DLElBQUksR0FBRyxTQUF1Qzt3QkFDbEQsSUFBSSxDQUFDLElBQUksRUFBRTs0QkFDUCxzQkFBTyxJQUFJLEVBQUE7eUJBQ2Q7d0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTt3QkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7d0JBQ25CLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQTt3QkFDdkMsc0JBQU8sSUFBSSxFQUFBOzs7O0tBQ2Q7SUFHRDs7OztPQUlHO0lBQ1csNkJBQVUsR0FBeEIsVUFBeUIsSUFBVzs7Ozs7d0JBRWhDLElBQUcsQ0FBQyxJQUFJLEVBQ1I7NEJBQ0ksc0JBQU07eUJBQ1Q7d0JBQ08scUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQTs0QkFBcEMsc0JBQVEsU0FBNEIsRUFBQTs7OztLQUN2QztJQUVELDhCQUFXLEdBQVgsVUFBWSxJQUFJO1FBRVosT0FBTyxJQUFJLE9BQU8sQ0FBRSxVQUFBLE9BQU87WUFDdkIsSUFBSSxPQUFPLEdBQUc7Z0JBQ1YsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQUMsS0FBSyxFQUFFLE1BQU07b0JBQy9DLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTt3QkFDZixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDOUI7b0JBQ0QsSUFBSSxJQUFJLEdBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBQ2hCO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFBO1lBQ0QsT0FBTyxFQUFFLENBQUE7UUFDYixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFTSwwQkFBTyxHQUFkLFVBQWUsR0FBVTtRQUVyQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQzVDO1lBQ0ksSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxHQUFHLEVBQ2xDO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHVCQUFJLEdBQVgsVUFBWSxJQUFXO1FBRW5CLElBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUNYLE9BQU87UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFTSwwQkFBTyxHQUFkLFVBQWUsSUFBVztRQUV0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFTSwwQkFBTyxHQUFkO1FBRUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUlNLDZCQUFVLEdBQWpCO0lBR0EsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtDQUFlLEdBQWYsVUFBZ0IsT0FBaUI7UUFFN0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUM1QztZQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBRyxJQUFJLEVBQ1A7Z0JBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksT0FBTyxDQUFBO2dCQUNuQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7YUFDbkI7U0FDSjtJQUNMLENBQUM7SUFFRCxhQUFhO0lBQ04sOEJBQVcsR0FBbEIsVUFBbUIsUUFBZTtRQUFFLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBRXZDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDNUM7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUNqQjtnQkFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNwQztZQUNELElBQUcsSUFBSSxFQUNQO2dCQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2xDO1NBQ0o7SUFDTCxDQUFDO0lBR0QsNEJBQVMsR0FBVDtRQUVJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDNUM7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUcsSUFBSSxFQUNQO2dCQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO2dCQUN6QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7YUFDbkI7U0FDSjtJQUNMLENBQUM7SUFJRCxVQUFVO0lBQ0gsMkJBQVEsR0FBZixVQUFnQixHQUFVLEVBQUUsUUFBZTtRQUFFLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBRWhELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBRyxJQUFJLElBQUksSUFBSSxFQUNmO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUNqQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0M7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUwsZUFBQztBQUFELENBMVpBLEFBMFpDLElBQUE7O0FBR0QsSUFBWSxZQU1YO0FBTkQsV0FBWSxZQUFZO0lBRXBCLCtDQUFRLENBQUE7SUFDUixxREFBVyxDQUFBO0lBQ1gsbURBQVUsQ0FBQTtBQUVkLENBQUMsRUFOVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQU12QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudC9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi9XbmRCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3QmFzZVxyXG57XHJcbiAgICBwdWJsaWMgbm9kZTpjYy5Ob2RlO1xyXG5cclxuICAgIC8v5a2Qdmlld+eahGtleSAgd25k5LiN6YCC55SoXHJcbiAgICBwdWJsaWMgdmlld0tleTpzdHJpbmc7XHJcblxyXG4gICAgLy9wcml2YXRlIHJlc1BhdGggOnN0cmluZ1xyXG4gICAgcHJvdGVjdGVkIHZpZXdMaXN0OlZpZXdCYXNlW10gPSBbXTtcclxuXHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfc3ViVmlld1N0YXRlIFxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZB2aWV355qE5pi+56S66ZqQ6JeP54q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc3ViVmlld1N0YXRlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViVmlld1N0YXRlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZB2aWV354q25oCBIHRydWUg5pi+56S6IGZhbHNlIOmakOiXjyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBzdWJWaWV3U3RhdGUodmFsdWUpIHtcclxuICAgICAgICBpZih0aGlzLl9zdWJWaWV3U3RhdGUgPT0gdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3ViVmlld1N0YXRlID0gdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5sb2FkaW5nU3RhdGUgIT0gTG9hZGluZ1N0YXRlLkxvYWRlZCB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHZhbHVlXHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uU3ViVmlld1Nob3coKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vblN1YlZpZXdIaWRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9sb2FkaW5nU3RhdGU6TG9hZGluZ1N0YXRlID0gTG9hZGluZ1N0YXRlLk5vbmVcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrZB2aWV35Yqg6L2954q25oCBXHJcbiAgICAgKi9cclxuICAgIHNldCBsb2FkaW5nU3RhdGUgKHN0YXRlOkxvYWRpbmdTdGF0ZSlcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlpoLmnpzliqDovb3lrozmiJDml7ZzdWJWaWV3U3RhdGXkuLp0cnVl5YiZ6K+05piOIOmcgOimgeaYvuekulxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmKHRoaXMuc3ViVmlld1N0YXRlID09IHRydWUgJiYgc3RhdGUgPT0gTG9hZGluZ1N0YXRlLkxvYWRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub25TdWJWaWV3U2hvdygpXHJcbiAgICAgICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy5ub2RlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9hZGluZ1N0YXRlID0gc3RhdGVcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiDlrZB2aWV35Yqg6L2954q25oCBXHJcbiAgICAgKi9cclxuICAgIGdldCBsb2FkaW5nU3RhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkaW5nU3RhdGVcclxuICAgIH1cclxuXHJcbiAgIFxyXG5cclxuICAgIC8v5YaF6YOo5LqL5Lu2ICDotJ/otKPnu4Tku7bkuYvpl7TlkIzkv6EgIHduZOWIm+W7uiDkvKDpgJLnu5nlrZB2aWV3XHJcbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxFdmVudDpFdmVudERpc3BhdGNoZXI7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9hY3RpdmUgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgcHVibGljIHNldCBhY3RpdmUodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlICYmIGNjLmlzVmFsaWQodGhpcy5ub2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE5vZGUobm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKG5vZGUgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55WM6Z2i5Yqg6L295a6M5ZCO5Yid5aeL5YyWXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge31cclxuICAgIC8v6Z2i5p2/5omT5byA5Zue6LCDXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGFyZ3M/OmFueVtdKVxyXG4gICAge31cclxuICAgIC8v55WM6Z2i5YWz6Zet5pe25Zue6LCDXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpXHJcbiAgICB7fVxyXG5cclxuICAgIC8v55WM6Z2i6ZSA5q+BXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKClcclxuICAgIHt9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKVxyXG4gICAge1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKVxyXG4gICAge1xyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29tcG9uZW50PFQgZXh0ZW5kcyBjYy5Db21wb25lbnQ+KHBhdGg6c3RyaW5nLCB0eXBlOmFueSk6VFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubm9kZSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZihwYXRoID09IFwiXCIgfHwgcGF0aCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldENvbXBvbmVudCh0eXBlKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmZpbmQocGF0aCwgdGhpcy5ub2RlKTtcclxuICAgICAgICBpZihub2RlID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBub2RlLmdldENvbXBvbmVudCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2hpbGQocGF0aDpzdHJpbmcpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBpZiAocGF0aCA9PT0gXCJcIil7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5maW5kKHBhdGgsIHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZENvbW1vbkNsaWNrKHBhdGg6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwgdGFyZ2V0PzphbnksIHRyYW5zaXRpb24gPSBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgdGltZT86bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBwYXRoLCBjYWxsYmFjaywgdGFyZ2V0LCB0cmFuc2l0aW9uLCB0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVmlldyhrZXk6c3RyaW5nLCBub2RlOmNjLk5vZGUsIHZpZXdDbGFzcywgYWN0aXZlID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuZ2V0VmlldyhrZXkpXHJcbiAgICAgICAgaWYoIHZpZXcgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumHjeWkjeazqOWGjOWtkFZpZXdcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihub2RlID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmsqHmnInnu5nlrZBWaWV36K6+572u6IqC54K5XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpZXcgPSBuZXcgdmlld0NsYXNzKCk7XHJcbiAgICAgICAgdmlldy5pbnRlcm5hbEV2ZW50ID0gdGhpcy5pbnRlcm5hbEV2ZW50O1xyXG4gICAgICAgIHZpZXcuc2V0Tm9kZShub2RlKTtcclxuICAgICAgICB2aWV3LmxvYWRpbmdTdGF0ZSA9IExvYWRpbmdTdGF0ZS5Mb2FkZWRcclxuICAgICAgICB2aWV3LnZpZXdLZXkgPSBrZXk7XHJcbiAgICAgICAgdGhpcy52aWV3TGlzdC5wdXNoKHZpZXcpO1xyXG5cclxuICAgICAgICBpZihhY3RpdmUgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXcuc3ViVmlld1N0YXRlID0gYWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmlld1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gc3ViVmlld1BhdGgga2V5IOi3n+mihOiuvui1hOa6kOeahOaYoOWwhFxyXG4gICAgICogQHBhcmFtIHZpZXdLZXlUeXBlTWFwIGtleSDot5/nsbvlnovnmoTpooTorr5cclxuICAgICAqIEBwYXJhbSBwYXJlbnROb2RlIOWtkHZpZXfnmoTniLboioLngrlcclxuICAgICAqL1xyXG4gICAgaW5pdFN1YlZpZXcoc3ViVmlld1BhdGgsdmlld0tleVR5cGVNYXAscGFyZW50Tm9kZSkge1xyXG4gICAgICAgIGlmKCFzdWJWaWV3UGF0aCB8fCAhdmlld0tleVR5cGVNYXAgfHwgIXBhcmVudE5vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZyYW1lTG9hZGluZ0tleSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN1YlZpZXdQYXRoKSB7XHJcbiAgICAgICAgICAgIGlmIChzdWJWaWV3UGF0aC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBmcmFtZUxvYWRpbmdLZXkucHVzaChrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZXhlY3V0ZSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChmcmFtZUxvYWRpbmdLZXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2FkaW5nS2V5ID0gZnJhbWVMb2FkaW5nS2V5LnNoaWZ0KClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViVmlld1BhdGguaGFzT3duUHJvcGVydHkobG9hZGluZ0tleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCA9IHN1YlZpZXdQYXRoW2xvYWRpbmdLZXldXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbG9hZGluZ0tleV0gPSBhd2FpdCB0aGlzLmFkZFN1YlZpZXcobG9hZGluZ0tleSwgdmlld0tleVR5cGVNYXBbbG9hZGluZ0tleV0scGF0aCxwYXJlbnROb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyDov5DooYzmiafooYzlh73mlbBcclxuICAgICAgICAgICAgZXhlY3V0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluWtkFZpZXfnu4Tku7Yg5LiN5ZCrbm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdFN1YlZpZXdDbGFzcyh2aWV3S2V5VHlwZU1hcDphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXZpZXdLZXlUeXBlTWFwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB2aWV3S2V5VHlwZU1hcCkge1xyXG4gICAgICAgICAgICBpZiAodmlld0tleVR5cGVNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdGhpcy5pbml0T25lU3ViVmlldyhrZXksdmlld0tleVR5cGVNYXBba2V5XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdE9uZVN1YlZpZXcoa2V5LHZpZXdDbGFzcylcclxuICAgIHtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuZ2V0VmlldyhrZXkpXHJcbiAgICAgICAgaWYoIHZpZXcgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumHjeWkjeazqOWGjOWtkFZpZXdcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2aWV3ID0gbmV3IHZpZXdDbGFzcygpO1xyXG4gICAgICAgIHZpZXcuaW50ZXJuYWxFdmVudCA9IHRoaXMuaW50ZXJuYWxFdmVudDtcclxuICAgICAgICB2aWV3LnZpZXdLZXkgPSBrZXk7XHJcbiAgICAgICAgdGhpcy52aWV3TGlzdC5wdXNoKHZpZXcpO1xyXG4gICAgICAgIHJldHVybiB2aWV3XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJblrZB2aWV35ZCrTm9kZVxyXG4gICAgICogQHBhcmFtIGtleSB2aWV3S2V5XHJcbiAgICAgKiBAcGFyYW0gdmlld0NsYXNzIOWtkHZpZXfnsbtcclxuICAgICAqIEBwYXJhbSBwYXRoIOmihOiuvui1hOa6kOi3r+W+hFxyXG4gICAgICogQHBhcmFtIHBhcmVudE5vZGUg5a2Qdmlld+eItuiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgYWRkU3ViVmlldyhrZXk6c3RyaW5nLHZpZXdDbGFzcyxwYXRoOnN0cmluZyxwYXJlbnROb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmdldFZpZXcoa2V5KVxyXG4gICAgICAgIGlmKCB2aWV3ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3ID0gbmV3IHZpZXdDbGFzcygpO1xyXG4gICAgICAgICAgICB2aWV3LmludGVybmFsRXZlbnQgPSB0aGlzLmludGVybmFsRXZlbnQ7XHJcbiAgICAgICAgICAgIHZpZXcudmlld0tleSA9IGtleTtcclxuICAgICAgICAgICAgdGhpcy52aWV3TGlzdC5wdXNoKHZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2aWV3LmxvYWRpbmdTdGF0ZSA9IExvYWRpbmdTdGF0ZS5Mb2FkaW5nXHJcbiAgICAgICAgbGV0IG5vZGUgPSBhd2FpdCAgdGhpcy5nZXRTdWJWaWV3KHBhdGgpIGFzIGNjLk5vZGVcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGwgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB2aWV3LnNldE5vZGUobm9kZSlcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgcGFyZW50Tm9kZS5hZGRDaGlsZChub2RlKVxyXG4gICAgICAgIHZpZXcubG9hZGluZ1N0YXRlID0gTG9hZGluZ1N0YXRlLkxvYWRlZFxyXG4gICAgICAgIHJldHVybiB2aWV3XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBhdGgg5Yqg6L295a2QVmlld+eahOmihOiuvueahOi1hOa6kOi3r+W+hFxyXG4gICAgICogQHBhcmFtIHZpZXdLZXkg5a2Qdmlld+eahHZpZXdLZXlcclxuICAgICAqL1xyXG4gICAgcHVibGljICBhc3luYyBnZXRTdWJWaWV3KHBhdGg6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFwYXRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAgYXdhaXQgdGhpcy5sb2FkT25lTm9kZShwYXRoKVxyXG4gICAgfVxyXG4gICBcclxuICAgIGxvYWRPbmVOb2RlKHBhdGgpIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PntcclxuICAgICAgICAgICAgbGV0IGV4ZWN1dGUgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkUmVzKHBhdGgsIChlcnJvciwgcHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKHBhdGgsIFwi5Yqg6L295aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQobm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShub2RlKSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4ZWN1dGUoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmlldyhrZXk6c3RyaW5nKTpWaWV3QmFzZVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnZpZXdMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy52aWV3TGlzdFtpXS52aWV3S2V5ID09IGtleSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld0xpc3RbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW4oYXJncz86YW55W10pXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuYWN0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vbk9wZW4oYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyeU9wZW4oYXJncz86YW55W10pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vbk9wZW4oYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25EaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsVmlldyhcIm9uRGlzcG9zZVwiKTtcclxuICAgICAgICB0aGlzLnZpZXdMaXN0ID0gW107XHJcbiAgICB9XHJcbiBcclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyByZXNldFN0YXRlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5pys55WM6Z2i5omA5pyJ5a2Qdmlld1xyXG4gICAgICogQHBhcmFtIHN1YlZpZXcg5pi+56S655qE5a2Qdmlld1xyXG4gICAgICovXHJcbiAgICBjbG9zZUFsbFN1YlZpZXcoc3ViVmlldz86Vmlld0Jhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmlld0xpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IHRoaXMudmlld0xpc3RbaV07XHJcbiAgICAgICAgICAgIGlmKHZpZXcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuc3ViVmlld1N0YXRlID0gdmlldyA9PSBzdWJWaWV3XHJcbiAgICAgICAgICAgICAgICB2aWV3LnJlYWxDbG9zZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/miYDmnInlrZB2aWV36LCD55So5pa55rOVXHJcbiAgICBwdWJsaWMgY2FsbEFsbFZpZXcoZnVuY05hbWU6c3RyaW5nLCAuLi5hcmdzKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnZpZXdMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGlzLnZpZXdMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZih2aWV3W2Z1bmNOYW1lXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmlld1tmdW5jTmFtZV0uYXBwbHkodmlldywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodmlldylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmlldy5jYWxsQWxsVmlldyhmdW5jTmFtZSxhcmdzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZWFsQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnZpZXdMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGlzLnZpZXdMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZih2aWV3KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB2aWV3LnJlYWxDbG9zZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG4gICAgLy/osIPnlKjljZXkuKrnu4Tku7bmlrnms5VcclxuICAgIHB1YmxpYyBjYWxsVmlldyhrZXk6c3RyaW5nLCBmdW5jTmFtZTpzdHJpbmcsIC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmdldFZpZXcoa2V5KTtcclxuICAgICAgICBpZih2aWV3ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmib7kuI3liLB2aWV3XCIsIGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih2aWV3W2Z1bmNOYW1lXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3W2Z1bmNOYW1lXS5hcHBseSh2aWV3LCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gTG9hZGluZ1N0YXRlXHJcbntcclxuICAgIE5vbmUgPSAxLFxyXG4gICAgTG9hZGluZyA9IDIsXHJcbiAgICBMb2FkZWQgPSAzXHJcbiAgICBcclxufSJdfQ==