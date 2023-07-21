
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/lib/BlockCipher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b1dfevA/cBGtJtXU9B+zJY2', 'BlockCipher');
// hall/scripts/framework/libs/cryptoTs/lib/BlockCipher.ts

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
exports.BlockCipher = void 0;
var Cipher_1 = require("./Cipher");
var CBC_1 = require("../mode/CBC");
var PKCS7_1 = require("../pad/PKCS7");
var BlockCipher = /** @class */ (function (_super) {
    __extends(BlockCipher, _super);
    function BlockCipher(xformMode, key, cfg) {
        return _super.call(this, xformMode, key, Object.assign({
            // default: 128 / 32
            blockSize: 4,
            mode: CBC_1.CBC,
            padding: PKCS7_1.PKCS7
        }, cfg)) || this;
    }
    BlockCipher.prototype.reset = function () {
        // Reset cipher
        _super.prototype.reset.call(this);
        // Check if we have a blockSize
        if (this.cfg.mode === undefined) {
            throw new Error('missing mode in config');
        }
        // Reset block mode
        var modeCreator;
        if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
            modeCreator = this.cfg.mode.createEncryptor;
        }
        else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
            modeCreator = this.cfg.mode.createDecryptor;
            // Keep at least one block in the buffer for unpadding
            this._minBufferSize = 1;
        }
        if (this._mode && this._mode.__creator === modeCreator) {
            this._mode.init(this, this.cfg.iv && this.cfg.iv.words);
        }
        else {
            this._mode = modeCreator.call(this.cfg.mode, this, this.cfg.iv && this.cfg.iv.words);
            this._mode.__creator = modeCreator;
        }
    };
    BlockCipher.prototype._doProcessBlock = function (words, offset) {
        this._mode.processBlock(words, offset);
    };
    BlockCipher.prototype._doFinalize = function () {
        // Check if we have a padding strategy
        if (this.cfg.padding === undefined) {
            throw new Error('missing padding in config');
        }
        // Finalize
        var finalProcessedBlocks;
        if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
            // Check if we have a blockSize
            if (this.cfg.blockSize === undefined) {
                throw new Error('missing blockSize in config');
            }
            // Pad data
            this.cfg.padding.pad(this._data, this.cfg.blockSize);
            // Process final blocks
            finalProcessedBlocks = this._process(!!'flush');
        }
        else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
            // Process final blocks
            finalProcessedBlocks = this._process(!!'flush');
            // Unpad data
            this.cfg.padding.unpad(finalProcessedBlocks);
        }
        return finalProcessedBlocks;
    };
    return BlockCipher;
}(Cipher_1.Cipher));
exports.BlockCipher = BlockCipher;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbGliXFxCbG9ja0NpcGhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWtDO0FBSWxDLG1DQUFrQztBQUNsQyxzQ0FBcUM7QUFFckM7SUFBMEMsK0JBQU07SUFHNUMscUJBQVksU0FBaUIsRUFBRSxHQUFjLEVBQUUsR0FBa0M7ZUFDN0Usa0JBQU0sU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2hDLG9CQUFvQjtZQUNwQixTQUFTLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRSxTQUFHO1lBQ1QsT0FBTyxFQUFFLGFBQUs7U0FDakIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTSwyQkFBSyxHQUFaO1FBQ0ksZUFBZTtRQUNmLGlCQUFNLEtBQUssV0FBRSxDQUFDO1FBRWQsK0JBQStCO1FBQy9CLElBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUM3QztRQUVELG1CQUFtQjtRQUNuQixJQUFJLFdBQVcsQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQTJCLElBQUksQ0FBQyxXQUFZLENBQUMsZUFBZSxFQUFFO1lBQzdFLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDL0M7YUFBTSxrREFBa0QsQ0FBQztZQUN0RCxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzVDLHNEQUFzRDtZQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztTQUMzQjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxXQUFXLEVBQUU7WUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFRCxxQ0FBZSxHQUFmLFVBQWdCLEtBQW9CLEVBQUUsTUFBYztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFDSSxzQ0FBc0M7UUFDdEMsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsV0FBVztRQUNYLElBQUksb0JBQW9CLENBQUM7UUFDekIsSUFBRyxJQUFJLENBQUMsVUFBVSxLQUEyQixJQUFJLENBQUMsV0FBWSxDQUFDLGVBQWUsRUFBRTtZQUM1RSwrQkFBK0I7WUFDL0IsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUNsRDtZQUVELFdBQVc7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJELHVCQUF1QjtZQUN2QixvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuRDthQUFNLGtEQUFrRCxDQUFDO1lBQ3RELHVCQUF1QjtZQUN2QixvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVoRCxhQUFhO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDaEQ7UUFFRCxPQUFPLG9CQUFvQixDQUFDO0lBQ2hDLENBQUM7SUFLTCxrQkFBQztBQUFELENBNUVBLEFBNEVDLENBNUV5QyxlQUFNLEdBNEUvQztBQTVFcUIsa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaXBoZXIgfSBmcm9tICcuL0NpcGhlcic7XHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4vV29yZEFycmF5JztcclxuaW1wb3J0IHsgQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyB9IGZyb20gJy4vQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyc7XHJcbmltcG9ydCB7IEJsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobSB9IGZyb20gJy4uL21vZGUvQmxvY2tDaXBoZXJNb2RlQWxnb3JpdGhtJztcclxuaW1wb3J0IHsgQ0JDIH0gZnJvbSAnLi4vbW9kZS9DQkMnO1xyXG5pbXBvcnQgeyBQS0NTNyB9IGZyb20gJy4uL3BhZC9QS0NTNyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmxvY2tDaXBoZXIgZXh0ZW5kcyBDaXBoZXIge1xyXG4gICAgcHVibGljIF9tb2RlITogQmxvY2tDaXBoZXJNb2RlQWxnb3JpdGhtO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHhmb3JtTW9kZTogbnVtYmVyLCBrZXk6IFdvcmRBcnJheSwgY2ZnPzogQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZykge1xyXG4gICAgICAgIHN1cGVyKHhmb3JtTW9kZSwga2V5LCBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAgLy8gZGVmYXVsdDogMTI4IC8gMzJcclxuICAgICAgICAgICAgYmxvY2tTaXplOiA0LFxyXG4gICAgICAgICAgICBtb2RlOiBDQkMsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IFBLQ1M3XHJcbiAgICAgICAgfSwgY2ZnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIC8vIFJlc2V0IGNpcGhlclxyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYSBibG9ja1NpemVcclxuICAgICAgICBpZih0aGlzLmNmZy5tb2RlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIG1vZGUgaW4gY29uZmlnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNldCBibG9jayBtb2RlXHJcbiAgICAgICAgbGV0IG1vZGVDcmVhdG9yO1xyXG4gICAgICAgIGlmICh0aGlzLl94Zm9ybU1vZGUgPT09ICg8dHlwZW9mIEJsb2NrQ2lwaGVyPiB0aGlzLmNvbnN0cnVjdG9yKS5fRU5DX1hGT1JNX01PREUpIHtcclxuICAgICAgICAgICAgbW9kZUNyZWF0b3IgPSB0aGlzLmNmZy5tb2RlLmNyZWF0ZUVuY3J5cHRvcjtcclxuICAgICAgICB9IGVsc2UgLyogaWYgKHRoaXMuX3hmb3JtTW9kZSA9PSB0aGlzLl9ERUNfWEZPUk1fTU9ERSkgKi8ge1xyXG4gICAgICAgICAgICBtb2RlQ3JlYXRvciA9IHRoaXMuY2ZnLm1vZGUuY3JlYXRlRGVjcnlwdG9yO1xyXG4gICAgICAgICAgICAvLyBLZWVwIGF0IGxlYXN0IG9uZSBibG9jayBpbiB0aGUgYnVmZmVyIGZvciB1bnBhZGRpbmdcclxuICAgICAgICAgICAgdGhpcy5fbWluQnVmZmVyU2l6ZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbW9kZSAmJiB0aGlzLl9tb2RlLl9fY3JlYXRvciA9PT0gbW9kZUNyZWF0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW9kZS5pbml0KHRoaXMsIHRoaXMuY2ZnLml2ICYmIHRoaXMuY2ZnLml2LndvcmRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tb2RlID0gbW9kZUNyZWF0b3IuY2FsbCh0aGlzLmNmZy5tb2RlLCB0aGlzLCB0aGlzLmNmZy5pdiAmJiB0aGlzLmNmZy5pdi53b3Jkcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vZGUuX19jcmVhdG9yID0gbW9kZUNyZWF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9kb1Byb2Nlc3NCbG9jayh3b3JkczogQXJyYXk8bnVtYmVyPiwgb2Zmc2V0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9tb2RlLnByb2Nlc3NCbG9jayh3b3Jkcywgb2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBfZG9GaW5hbGl6ZSgpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgcGFkZGluZyBzdHJhdGVneVxyXG4gICAgICAgIGlmKHRoaXMuY2ZnLnBhZGRpbmcgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcGFkZGluZyBpbiBjb25maWcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbmFsaXplXHJcbiAgICAgICAgbGV0IGZpbmFsUHJvY2Vzc2VkQmxvY2tzO1xyXG4gICAgICAgIGlmKHRoaXMuX3hmb3JtTW9kZSA9PT0gKDx0eXBlb2YgQmxvY2tDaXBoZXI+IHRoaXMuY29uc3RydWN0b3IpLl9FTkNfWEZPUk1fTU9ERSkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgYmxvY2tTaXplXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2ZnLmJsb2NrU2l6ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgYmxvY2tTaXplIGluIGNvbmZpZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQYWQgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmNmZy5wYWRkaW5nLnBhZCh0aGlzLl9kYXRhLCB0aGlzLmNmZy5ibG9ja1NpemUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJvY2VzcyBmaW5hbCBibG9ja3NcclxuICAgICAgICAgICAgZmluYWxQcm9jZXNzZWRCbG9ja3MgPSB0aGlzLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XHJcbiAgICAgICAgfSBlbHNlIC8qIGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fREVDX1hGT1JNX01PREUpICovIHtcclxuICAgICAgICAgICAgLy8gUHJvY2VzcyBmaW5hbCBibG9ja3NcclxuICAgICAgICAgICAgZmluYWxQcm9jZXNzZWRCbG9ja3MgPSB0aGlzLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBVbnBhZCBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuY2ZnLnBhZGRpbmcudW5wYWQoZmluYWxQcm9jZXNzZWRCbG9ja3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZpbmFsUHJvY2Vzc2VkQmxvY2tzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBlbmNyeXB0QmxvY2soTTogQXJyYXk8bnVtYmVyPiwgb2Zmc2V0OiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkZWNyeXB0QmxvY2soTTogQXJyYXk8bnVtYmVyPiwgb2Zmc2V0OiBudW1iZXIpOiB2b2lkO1xyXG59Il19