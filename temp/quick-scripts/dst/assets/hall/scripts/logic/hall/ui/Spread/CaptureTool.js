
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/CaptureTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXENhcHR1cmVUb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBMEdDO1FBdkdHLFlBQU0sR0FBYSxJQUFJLENBQUE7UUFDZixhQUFPLEdBQUcsSUFBSSxDQUFBO1FBQ2QsWUFBTSxHQUFHLElBQUksQ0FBQTtRQUNiLGFBQU8sR0FBRyxJQUFJLENBQUE7UUFDZCxjQUFRLEdBQUcsSUFBSSxDQUFBOztJQW1HM0IsQ0FBQztJQWhHVSxrQ0FBWSxHQUFuQixVQUFvQixHQUFHLEVBQUMsU0FBVSxFQUFDLFNBQWdCO1FBQW5ELGlCQXNCQztRQXRCa0MsMEJBQUEsRUFBQSxnQkFBZ0I7UUFFL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUE7UUFDekIsSUFBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQzNCO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLElBQUksT0FBTyxHQUFHLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDL0IsMkJBQTJCO2dCQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsU0FBUyxDQUFDLENBQUM7WUFDekMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7YUFDRztZQUNBLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFD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Qy9CLGdDQUFVLEdBQVYsVUFBWSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU07UUFDM0Isd0JBQXdCO1FBQ3hCLElBQUksT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN6QixLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ25DLElBQUksSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVCLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLElBQUksT0FBTyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLHVCQUF1QjtZQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMvQixPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDMUM7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFwR0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDRztJQUhOLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EwRy9CO0lBQUQsa0JBQUM7Q0ExR0QsQUEwR0MsQ0ExR3dDLEVBQUUsQ0FBQyxTQUFTLEdBMEdwRDtrQkExR29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcHR1cmVUb29sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQ2FtZXJhKVxyXG4gICAgY2FtZXJhOmNjLkNhbWVyYSA9IG51bGxcclxuICAgIHByaXZhdGUgdGV4dHVyZSA9IG51bGxcclxuICAgIHByaXZhdGUgX3dpZHRoID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBjYWxsYmFjayA9IG51bGxcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBCZWdpbkNhcHR1cmUodXJsLF9jYWxsYmFjaz8sY2xvc2VOb2RlID0gdHJ1ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gX2NhbGxiYWNrXHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tJbWdFeGlzdCh1cmwpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIFwiY2FwdHVyZUluZ1wiKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgY2FwdHVyZVxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGljRGF0YSA9IHRoaXMuaW5pdEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2hvd1Nwcml0ZShwaWNEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUZpbGUodXJsLHBpY0RhdGEsY2xvc2VOb2RlKTtcclxuICAgICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5jYWxsYmFjaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgICB0aGlzLmNhbWVyYS5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XHJcbiAgICAgICAgbGV0IGdsID0gY2MuZ2FtZS5fcmVuZGVyQ29udGV4dDtcclxuICAgICAgICB0ZXh0dXJlLmluaXRXaXRoU2l6ZShjYy52aXNpYmxlUmVjdC53aWR0aCwgY2MudmlzaWJsZVJlY3QuaGVpZ2h0LCBnbC5TVEVOQ0lMX0lOREVYOCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudGFyZ2V0VGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gb3ZlcnJpZGVcclxuICAgIGluaXRJbWFnZSAoKSB7IFxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy50ZXh0dXJlLnJlYWRQaXhlbHMoKTtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHRoaXMudGV4dHVyZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLnRleHR1cmUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBwaWNEYXRhID0gdGhpcy5maWxwWUltYWdlKGRhdGEsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiBwaWNEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHNhdmVGaWxlICh1cmwscGljRGF0YSxjbG9zZU5vZGUpIHtcclxuICAgICAgICBpZiAoQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWxlUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBHbG9iYWwuVG9vbGtpdC5tZDUodXJsKSArJ19jYXBJbWFnZS5wbmcnO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN1Y2Nlc3MgPSBqc2Iuc2F2ZUltYWdlRGF0YShwaWNEYXRhLCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0LCBmaWxlUGF0aClcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJzYXZlIGltYWdlIGRhdGEgc3VjY2VzcywgZmlsZTogXCIgKyBmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS50YXJnZXRUZXh0dXJlID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9ICFjbG9zZU5vZGVcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLCBcImNhcHR1cmVJbmdcIik7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJzYXZlIGltYWdlIGRhdGEgZmFpbGVkIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0ltZ0V4aXN0KHVybClcclxuICAgIHtcclxuICAgICAgICBpZihDQ19KU0IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZmlsZVBhdGggPSBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICtHbG9iYWwuVG9vbGtpdC5tZDUodXJsKSsnX2NhcEltYWdlLnBuZyc7XHJcbiAgICAgICAgICAgIHJldHVybiAganNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChmaWxlUGF0aClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc29sdXRpb25cclxuICAgIGZpbHBZSW1hZ2UgKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICAvLyBjcmVhdGUgdGhlIGRhdGEgYXJyYXlcclxuICAgICAgICBsZXQgcGljRGF0YSA9IG5ldyBVaW50OEFycmF5KHdpZHRoICogaGVpZ2h0ICogNCk7XHJcbiAgICAgICAgbGV0IHJvd0J5dGVzID0gd2lkdGggKiA0O1xyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGhlaWdodDsgcm93KyspIHtcclxuICAgICAgICAgICAgbGV0IHNyb3cgPSBoZWlnaHQgLSAxIC0gcm93O1xyXG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBzcm93ICogd2lkdGggKiA0O1xyXG4gICAgICAgICAgICBsZXQgcmVTdGFydCA9IHJvdyAqIHdpZHRoICogNDtcclxuICAgICAgICAgICAgLy8gc2F2ZSB0aGUgcGlleGxzIGRhdGFcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dCeXRlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwaWNEYXRhW3JlU3RhcnQgKyBpXSA9IGRhdGFbc3RhcnQgKyBpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGljRGF0YTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG59Il19