"use strict";
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