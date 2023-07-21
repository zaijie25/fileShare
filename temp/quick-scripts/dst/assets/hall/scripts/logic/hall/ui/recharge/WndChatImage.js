
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndChatImage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7f556HysPhGY7Uf1WnF52DM', 'WndChatImage');
// hall/scripts/logic/hall/ui/recharge/WndChatImage.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndChatImage = /** @class */ (function (_super) {
    __extends(WndChatImage, _super);
    function WndChatImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndChatImage.prototype.onInit = function () {
        this.name = "WndChatImage";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/ChatImage";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndChatImage.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.imageNode = this.getChild("imageNode").getComponent(cc.Sprite);
        // this.bgNode.node.active = false;
        this.imageNode.spriteFrame = null;
        this.addCommonClick("btnBack", this.goBack, this);
    };
    WndChatImage.prototype.onOpen = function () {
        var _this = this;
        var data = this.args[0];
        // console.log("URL= ",data.url);
        this.imageNode.spriteFrame = null;
        this.loadSeverHeader(data.url, function (frame) {
            _this.imageNode.spriteFrame = frame;
            _this.imageNode.node.width = _this.node.width;
            _this.imageNode.node.height = (_this.node.width / data.imageWidth) * data.imageHeight;
        });
    };
    WndChatImage.prototype.goBack = function () {
        this.close();
    };
    WndChatImage.prototype.loadSeverHeader = function (url, callback) {
        //获取图片
        cc.loader.load({
            url: url,
            type: "jpg"
        }, function (err, texture) {
            var frame = new cc.SpriteFrame(texture);
            callback(frame);
        });
    };
    return WndChatImage;
}(WndBase_1.default));
exports.default = WndChatImage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kQ2hhdEltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUVoRTtJQUEwQyxnQ0FBTztJQUFqRDs7SUF1Q0EsQ0FBQztJQXJDYSw2QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQ0FBb0MsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3hDLENBQUM7SUFDUywrQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELDZCQUFNLEdBQU47UUFBQSxpQkFTQztRQVJHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsVUFBQyxLQUFLO1lBQ2hDLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNuQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEYsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ08sNkJBQU0sR0FBZDtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ00sc0NBQWUsR0FBdEIsVUFBdUIsR0FBRyxFQUFDLFFBQWlCO1FBQ3hDLE1BQU07UUFDTixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNYLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLEtBQUs7U0FDZCxFQUFFLFVBQVUsR0FBRyxFQUFFLE9BQU87WUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxtQkFBQztBQUFELENBdkNBLEFBdUNDLENBdkN5QyxpQkFBTyxHQXVDaEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZENoYXRJbWFnZSBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBpbWFnZU5vZGU6IGNjLlNwcml0ZTtcclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRDaGF0SW1hZ2VcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1JlY2hhcmdlL0NoYXRJbWFnZVwiO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5Ob25lO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5pbWFnZU5vZGUgPSB0aGlzLmdldENoaWxkKFwiaW1hZ2VOb2RlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIC8vIHRoaXMuYmdOb2RlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZU5vZGUuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidG5CYWNrXCIsIHRoaXMuZ29CYWNrLCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uT3Blbigpe1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5hcmdzWzBdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVVJMPSBcIixkYXRhLnVybCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZU5vZGUuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9hZFNldmVySGVhZGVyKGRhdGEudXJsLChmcmFtZSk9PntcclxuICAgICAgICAgICAgdGhpcy5pbWFnZU5vZGUuc3ByaXRlRnJhbWUgPSBmcmFtZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZU5vZGUubm9kZS53aWR0aCA9IHRoaXMubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZU5vZGUubm9kZS5oZWlnaHQgPSAodGhpcy5ub2RlLndpZHRoL2RhdGEuaW1hZ2VXaWR0aCkqZGF0YS5pbWFnZUhlaWdodDtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWRTZXZlckhlYWRlcih1cmwsY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIC8v6I635Y+W5Zu+54mHXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWQoe1xyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgdHlwZTogXCJqcGdcIlxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIsIHRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZyYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il19