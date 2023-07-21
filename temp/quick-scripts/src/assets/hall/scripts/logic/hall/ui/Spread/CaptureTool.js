"use strict";
cc._RF.push(module, '7d459iqB4dH9a69/wal+i1T', 'CaptureTool');
// hall/scripts/logic/hall/ui/Spread/CaptureTool.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CaptureTool = /** @class */ (function (_super) {
    __extends(CaptureTool, _super);
    function CaptureTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        _this.texture = null;
        _this._width = null;
        _this._height = null;
        _this.callback = null;
        return _this;
    }
    CaptureTool.prototype.BeginCapture = function (url, _callback, closeNode) {
        var _this = this;
        if (closeNode === void 0) { closeNode = true; }
        this.callback = _callback;
        if (!this.checkImgExist(url)) {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "captureIng");
            this.init();
            // create the capture
            this.scheduleOnce(function () {
                var picData = _this.initImage();
                //this.showSprite(picData);
                _this.saveFile(url, picData, closeNode);
            }, 0.2);
        }
        else {
            if (this.callback) {
                this.callback();
                this.callback = null;
            }
        }
    };
    CaptureTool.prototype.init = function () {
        this.camera.node.active = true;
        var texture = new cc.RenderTexture();
        var gl = cc.game._renderContext;
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        this.camera.targetTexture = texture;
        this.texture = texture;
    };
    // override
    CaptureTool.prototype.initImage = function () {
        var data = this.texture.readPixels();
        this._width = this.texture.width;
        this._height = this.texture.height;
        var picData = this.filpYImage(data, this._width, this._height);
        return picData;
    };
    CaptureTool.prototype.saveFile = function (url, picData, closeNode) {
        if (CC_JSB) {
            var filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(url) + '_capImage.png';
            var success = jsb.saveImageData(picData, this._width, this._height, filePath);
            if (success) {
                Logger.log("save image data success, file: " + filePath);
                this.camera.targetTexture = null;
                this.camera.node.active = false;
                this.node.active = !closeNode;
                Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "captureIng");
                if (this.callback) {
                    this.callback();
                    this.callback = null;
                }
            }
            else {
                Logger.error("save image data failed!");
            }
        }
    };
    CaptureTool.prototype.checkImgExist = function (url) {
        if (CC_JSB) {
            var filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(url) + '_capImage.png';
            return jsb.fileUtils.isFileExist(filePath);
        }
    };
    // This is a temporary solution
    CaptureTool.prototype.filpYImage = function (data, width, height) {
        // create the data array
        var picData = new Uint8Array(width * height * 4);
        var rowBytes = width * 4;
        for (var row = 0; row < height; row++) {
            var srow = height - 1 - row;
            var start = srow * width * 4;
            var reStart = row * width * 4;
            // save the piexls data
            for (var i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }
        return picData;
    };
    __decorate([
        property(cc.Camera)
    ], CaptureTool.prototype, "camera", void 0);
    CaptureTool = __decorate([
        ccclass
    ], CaptureTool);
    return CaptureTool;
}(cc.Component));
exports.default = CaptureTool;

cc._RF.pop();