
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/lib/Hasher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '959falAV7JBsZFnaeekkcPH', 'Hasher');
// hall/scripts/framework/libs/cryptoTs/lib/Hasher.ts

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
exports.Hasher = void 0;
var BufferedBlockAlgorithm_1 = require("./BufferedBlockAlgorithm");
var Hasher = /** @class */ (function (_super) {
    __extends(Hasher, _super);
    /**
     * Initializes a newly created hasher.
     *
     * @param cfg (Optional) The configuration options to use for this hash computation.
     *
     * @example
     *
     *     let hasher = CryptoJS.algo.SHA256.create();
     */
    function Hasher(cfg) {
        var _this = 
        // Apply config defaults
        _super.call(this, Object.assign({
            blockSize: 512 / 32
        }, cfg)) || this;
        // Set initial values
        _this.reset();
        return _this;
    }
    /**
     * Creates a shortcut function to a hasher's object interface.
     *
     * @param hasher The hasher to create a helper for.
     *
     * @return The shortcut function.
     *
     * @example
     *
     *     let SHA256 = Hasher._createHelper(SHA256);
     */
    Hasher._createHelper = function (hasher) {
        function helper(message, cfg) {
            var hasherClass = hasher;
            var hasherInstance = new hasherClass(cfg);
            return hasherInstance.finalize(message);
        }
        return helper;
    };
    /**
     * Updates this hasher with a message.
     *
     * @param messageUpdate The message to append.
     *
     * @return This hasher.
     *
     * @example
     *
     *     hasher.update('message');
     *     hasher.update(wordArray);
     */
    Hasher.prototype.update = function (messageUpdate) {
        // Append
        this._append(messageUpdate);
        // Update the hash
        this._process();
        // Chainable
        return this;
    };
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param messageUpdate (Optional) A final message update.
     *
     * @return The hash.
     *
     * @example
     *
     *     let hash = hasher.finalize();
     *     let hash = hasher.finalize('message');
     *     let hash = hasher.finalize(wordArray);
     */
    Hasher.prototype.finalize = function (messageUpdate) {
        // Final message update
        if (messageUpdate) {
            this._append(messageUpdate);
        }
        // Perform concrete-hasher logic
        var hash = this._doFinalize();
        return hash;
    };
    return Hasher;
}(BufferedBlockAlgorithm_1.BufferedBlockAlgorithm));
exports.Hasher = Hasher;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbGliXFxIYXNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1FQUFrRTtBQUlsRTtJQUFxQywwQkFBc0I7SUF3QnZEOzs7Ozs7OztPQVFHO0lBQ0gsZ0JBQW1CLEdBQWtDO1FBQXJEO1FBQ0ksd0JBQXdCO1FBQ3hCLGtCQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEIsU0FBUyxFQUFFLEdBQUcsR0FBRyxFQUFFO1NBQ3RCLEVBQUUsR0FBRyxDQUFDLENBQUMsU0FJWDtRQUZHLHFCQUFxQjtRQUNyQixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O0lBQ2pCLENBQUM7SUF4Q0Q7Ozs7Ozs7Ozs7T0FVRztJQUNXLG9CQUFhLEdBQTNCLFVBQTRCLE1BQXFCO1FBQzdDLFNBQVMsTUFBTSxDQUFDLE9BQTJCLEVBQUUsR0FBa0M7WUFDM0UsSUFBTSxXQUFXLEdBQVEsTUFBTSxDQUFDO1lBRWhDLElBQU0sY0FBYyxHQUFRLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpELE9BQU8sY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQXFCRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILHVCQUFNLEdBQU4sVUFBTyxhQUFpQztRQUNwQyxTQUFTO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1QixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNJLHlCQUFRLEdBQWYsVUFBZ0IsYUFBaUM7UUFDN0MsdUJBQXVCO1FBQ3ZCLElBQUcsYUFBYSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMvQjtRQUVELGdDQUFnQztRQUNoQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFaEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdMLGFBQUM7QUFBRCxDQTdGQSxBQTZGQyxDQTdGb0MsK0NBQXNCLEdBNkYxRDtBQTdGcUIsd0JBQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtIH0gZnJvbSAnLi9CdWZmZXJlZEJsb2NrQWxnb3JpdGhtJztcclxuaW1wb3J0IHsgQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyB9IGZyb20gJy4vQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyc7XHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4vV29yZEFycmF5JztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIYXNoZXIgZXh0ZW5kcyBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMjU2KTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfY3JlYXRlSGVscGVyKGhhc2hlcjogdHlwZW9mIEhhc2hlcikge1xyXG4gICAgICAgIGZ1bmN0aW9uIGhlbHBlcihtZXNzYWdlOiBXb3JkQXJyYXkgfCBzdHJpbmcsIGNmZz86IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWcpIHtcclxuICAgICAgICAgICAgY29uc3QgaGFzaGVyQ2xhc3M6IGFueSA9IGhhc2hlcjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhhc2hlckluc3RhbmNlOiBhbnkgPSBuZXcgaGFzaGVyQ2xhc3MoY2ZnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBoYXNoZXJJbnN0YW5jZS5maW5hbGl6ZShtZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoZWxwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgaGFzaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIGxldCBoYXNoZXIgPSBDcnlwdG9KUy5hbGdvLlNIQTI1Ni5jcmVhdGUoKTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNmZz86IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWcpIHtcclxuICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcclxuICAgICAgICBzdXBlcihPYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAgYmxvY2tTaXplOiA1MTIgLyAzMlxyXG4gICAgICAgIH0sIGNmZykpO1xyXG5cclxuICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIFRoaXMgaGFzaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcclxuICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShtZXNzYWdlVXBkYXRlOiBXb3JkQXJyYXkgfCBzdHJpbmcpOiBIYXNoZXIge1xyXG4gICAgICAgIC8vIEFwcGVuZFxyXG4gICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBoYXNoXHJcbiAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xyXG5cclxuICAgICAgICAvLyBDaGFpbmFibGVcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmFsaXplcyB0aGUgaGFzaCBjb21wdXRhdGlvbi5cclxuICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gVGhlIGhhc2guXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcclxuICAgICAqICAgICBsZXQgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xyXG4gICAgICogICAgIGxldCBoYXNoID0gaGFzaGVyLmZpbmFsaXplKHdvcmRBcnJheSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5hbGl6ZShtZXNzYWdlVXBkYXRlOiBXb3JkQXJyYXkgfCBzdHJpbmcpOiBXb3JkQXJyYXkge1xyXG4gICAgICAgIC8vIEZpbmFsIG1lc3NhZ2UgdXBkYXRlXHJcbiAgICAgICAgaWYobWVzc2FnZVVwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xyXG4gICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBfZG9GaW5hbGl6ZSgpOiBXb3JkQXJyYXk7XHJcbn0iXX0=