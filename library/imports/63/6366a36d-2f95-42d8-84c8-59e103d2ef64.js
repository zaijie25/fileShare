"use strict";
cc._RF.push(module, '6366aNtL5VC2ITIWeED0u9k', 'ListItem');
// hall/scripts/logic/core/net/chat/ListItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/6/6
 * @doc 列表Item组件.
 * 说明：
 *      1、此组件须配合List组件使用。（配套的配套的..）
 * @end
 ******************************************/
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu, executionOrder = _a.executionOrder;
var SelectedType;
(function (SelectedType) {
    SelectedType[SelectedType["NONE"] = 0] = "NONE";
    SelectedType[SelectedType["TOGGLE"] = 1] = "TOGGLE";
    SelectedType[SelectedType["SWITCH"] = 2] = "SWITCH";
})(SelectedType || (SelectedType = {}));
var ListItem = /** @class */ (function (_super) {
    __extends(ListItem, _super);
    function ListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //图标
        _this.icon = null;
        //标题
        _this.title = null;
        //选择模式
        _this.selectedMode = SelectedType.NONE;
        //被选标志
        _this.selectedFlag = null;
        //被选择的SpriteFrame
        _this.selectedSpriteFrame = null;
        //未被选择的SpriteFrame
        _this._unselectedSpriteFrame = null;
        //自适应尺寸
        _this.adaptiveSize = false;
        //选择
        _this._selected = false;
        //是否已经注册过事件
        _this._eventReg = false;
        return _this;
    }
    Object.defineProperty(ListItem.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = val;
            if (!this.selectedFlag)
                return;
            switch (this.selectedMode) {
                case SelectedType.TOGGLE:
                    this.selectedFlag.active = val;
                    break;
                case SelectedType.SWITCH:
                    var sp = this.selectedFlag.getComponent(cc.Sprite);
                    if (sp)
                        sp.spriteFrame = val ? this.selectedSpriteFrame : this._unselectedSpriteFrame;
                    break;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "btnCom", {
        get: function () {
            if (!this._btnCom)
                this._btnCom = this.node.getComponent(cc.Button);
            return this._btnCom;
        },
        enumerable: false,
        configurable: true
    });
    ListItem.prototype.onLoad = function () {
        // //没有按钮组件的话，selectedFlag无效
        // if (!this.btnCom)
        //     this.selectedMode == SelectedType.NONE;
        //有选择模式时，保存相应的东西
        if (this.selectedMode == SelectedType.SWITCH) {
            var com = this.selectedFlag.getComponent(cc.Sprite);
            this._unselectedSpriteFrame = com.spriteFrame;
        }
    };
    ListItem.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
    };
    ListItem.prototype._registerEvent = function () {
        if (!this._eventReg) {
            if (this.btnCom && this.list.selectedMode > 0) {
                this.btnCom.clickEvents.unshift(this.createEvt(this, 'onClickThis'));
            }
            if (this.adaptiveSize) {
                this.node.on(cc.Node.EventType.SIZE_CHANGED, this._onSizeChange, this);
            }
            this._eventReg = true;
        }
    };
    ListItem.prototype._onSizeChange = function () {
        this.list._onItemAdaptive(this.node);
    };
    /**
     * 创建事件
     * @param {cc.Component} component 组件脚本
     * @param {string} handlerName 触发函数名称
     * @param {cc.Node} node 组件所在node（不传的情况下取component.node）
     * @returns cc.Component.EventHandler
     */
    ListItem.prototype.createEvt = function (component, handlerName, node) {
        if (node === void 0) { node = null; }
        if (!component.isValid)
            return; //有些异步加载的，节点以及销毁了。
        component['comName'] = component['comName'] || component.name.match(/\<(.*?)\>/g).pop().replace(/\<|>/g, '');
        var evt = new cc.Component.EventHandler();
        evt.target = node || component.node;
        evt.component = component['comName'];
        evt.handler = handlerName;
        return evt;
    };
    ListItem.prototype.showAni = function (aniType, callFunc, del) {
        var _this = this;
        var acts;
        switch (aniType) {
            case 0: //向上消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, 0, this.node.height * 2),
                ];
                break;
            case 1: //向右消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, this.node.width * 2, 0),
                ];
                break;
            case 2: //向下消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, 0, this.node.height * -2),
                ];
                break;
            case 3: //向左消失
                acts = [
                    cc.scaleTo(.2, .7),
                    cc.moveBy(.3, this.node.width * -2, 0),
                ];
                break;
            default: //默认：缩小消失
                acts = [
                    cc.scaleTo(.3, .1),
                ];
                break;
        }
        if (callFunc || del) {
            acts.push(cc.callFunc(function () {
                if (del) {
                    _this.list._delSingleItem(_this.node);
                    for (var n = _this.list.displayData.length - 1; n >= 0; n--) {
                        if (_this.list.displayData[n].id == _this.listId) {
                            _this.list.displayData.splice(n, 1);
                            break;
                        }
                    }
                }
                callFunc();
            }));
        }
        this.node.runAction(cc.sequence(acts));
    };
    ListItem.prototype.onClickThis = function () {
        this.list.selectedId = this.listId;
    };
    __decorate([
        property({ type: cc.Sprite, tooltip: CC_DEV && '图标' })
    ], ListItem.prototype, "icon", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: CC_DEV && '标题' })
    ], ListItem.prototype, "title", void 0);
    __decorate([
        property({
            type: cc.Enum(SelectedType),
            tooltip: CC_DEV && '选择模式'
        })
    ], ListItem.prototype, "selectedMode", void 0);
    __decorate([
        property({
            type: cc.Node, tooltip: CC_DEV && '被选标志',
            visible: function () { return this.selectedMode > SelectedType.NONE; }
        })
    ], ListItem.prototype, "selectedFlag", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame, tooltip: CC_DEV && '被选择的SpriteFrame',
            visible: function () { return this.selectedMode == SelectedType.SWITCH; }
        })
    ], ListItem.prototype, "selectedSpriteFrame", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && '自适应尺寸（宽或高）',
        })
    ], ListItem.prototype, "adaptiveSize", void 0);
    ListItem = __decorate([
        ccclass,
        disallowMultiple(),
        menu('自定义组件/List Item'),
        executionOrder(-5001) //先于List
    ], ListItem);
    return ListItem;
}(cc.Component));
exports.default = ListItem;

cc._RF.pop();