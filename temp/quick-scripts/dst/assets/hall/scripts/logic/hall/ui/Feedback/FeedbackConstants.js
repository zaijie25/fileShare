
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/FeedbackConstants.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b6f2p2CsdCYpfQpTykCguw', 'FeedbackConstants');
// hall/scripts/logic/hall/ui/Feedback/FeedbackConstants.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServEntityType = exports.RightViewType = exports.TagType = exports.FeedbackConstants = void 0;
var FeedbackConstants = /** @class */ (function () {
    function FeedbackConstants() {
    }
    FeedbackConstants.FeedbackListCallback = "FeedbackListCallback";
    FeedbackConstants.DealFeedbackCommit = "DealFeedbackCommit";
    FeedbackConstants.DealFeedbackDelete = "DealFeedbackDelete";
    return FeedbackConstants;
}());
exports.FeedbackConstants = FeedbackConstants;
//页签类型 1反馈 2 在线 3微信 4qq客服  5公众号 6阿里  7阿特
var TagType;
(function (TagType) {
    TagType[TagType["FEEDBACK"] = 1] = "FEEDBACK";
    TagType[TagType["ONLINE"] = 2] = "ONLINE";
    TagType[TagType["WX"] = 3] = "WX";
    TagType[TagType["QQ"] = 4] = "QQ";
    TagType[TagType["GZH"] = 5] = "GZH";
    TagType[TagType["ALI"] = 6] = "ALI";
    TagType[TagType["AT"] = 7] = "AT";
})(TagType = exports.TagType || (exports.TagType = {}));
var RightViewType;
(function (RightViewType) {
    RightViewType[RightViewType["feedback"] = 0] = "feedback";
    RightViewType[RightViewType["onlineService"] = 1] = "onlineService";
    RightViewType[RightViewType["wxService"] = 2] = "wxService";
    RightViewType[RightViewType["qqService"] = 3] = "qqService";
    RightViewType[RightViewType["gzhService"] = 4] = "gzhService";
    RightViewType[RightViewType["aliService"] = 5] = "aliService";
    RightViewType[RightViewType["atService"] = 6] = "atService";
    RightViewType[RightViewType["FQA"] = 7] = "FQA";
    RightViewType[RightViewType["feedbackShowAndWrite"] = 8] = "feedbackShowAndWrite";
    RightViewType[RightViewType["noMsgTips"] = 9] = "noMsgTips";
    RightViewType[RightViewType["feedback2"] = 10] = "feedback2";
})(RightViewType = exports.RightViewType || (exports.RightViewType = {}));
var ServEntityType;
(function (ServEntityType) {
    ServEntityType["onlineService"] = "onlineService";
    ServEntityType["wxService"] = "wxService";
    ServEntityType["qqService"] = "qqService";
    ServEntityType["atService"] = "atService";
})(ServEntityType = exports.ServEntityType || (exports.ServEntityType = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcRmVlZGJhY2tDb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQUlBLENBQUM7SUFIMEIsc0NBQW9CLEdBQVcsc0JBQXNCLENBQUE7SUFDckQsb0NBQWtCLEdBQVcsb0JBQW9CLENBQUM7SUFDbEQsb0NBQWtCLEdBQVksb0JBQW9CLENBQUM7SUFDOUUsd0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSw4Q0FBaUI7QUFNOUIsd0NBQXdDO0FBQ3hDLElBQVksT0FRWDtBQVJELFdBQVksT0FBTztJQUNmLDZDQUFZLENBQUE7SUFDWix5Q0FBVSxDQUFBO0lBQ1YsaUNBQU0sQ0FBQTtJQUNOLGlDQUFNLENBQUE7SUFDTixtQ0FBTyxDQUFBO0lBQ1AsbUNBQU8sQ0FBQTtJQUNQLGlDQUFNLENBQUE7QUFDVixDQUFDLEVBUlcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBUWxCO0FBRUQsSUFBWSxhQVlYO0FBWkQsV0FBWSxhQUFhO0lBQ3JCLHlEQUFVLENBQUE7SUFDVixtRUFBZSxDQUFBO0lBQ2YsMkRBQVcsQ0FBQTtJQUNYLDJEQUFXLENBQUE7SUFDWCw2REFBWSxDQUFBO0lBQ1osNkRBQVksQ0FBQTtJQUNaLDJEQUFXLENBQUE7SUFDWCwrQ0FBSyxDQUFBO0lBQ0wsaUZBQXNCLENBQUE7SUFDdEIsMkRBQVcsQ0FBQTtJQUNYLDREQUFZLENBQUE7QUFDaEIsQ0FBQyxFQVpXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBWXhCO0FBRUQsSUFBWSxjQU1YO0FBTkQsV0FBWSxjQUFjO0lBQ3RCLGlEQUE2QixDQUFBO0lBQzdCLHlDQUFxQixDQUFBO0lBQ3JCLHlDQUFxQixDQUFBO0lBQ3JCLHlDQUFxQixDQUFBO0FBRXpCLENBQUMsRUFOVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQU16QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBGZWVkYmFja0NvbnN0YW50cyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEZlZWRiYWNrTGlzdENhbGxiYWNrIDpzdHJpbmcgPSBcIkZlZWRiYWNrTGlzdENhbGxiYWNrXCJcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVhbEZlZWRiYWNrQ29tbWl0OiBzdHJpbmcgPSBcIkRlYWxGZWVkYmFja0NvbW1pdFwiOyAgIFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEZWFsRmVlZGJhY2tEZWxldGUgOiBzdHJpbmcgPSBcIkRlYWxGZWVkYmFja0RlbGV0ZVwiOyAgICAgICAgICBcclxufVxyXG5cclxuLy/pobXnrb7nsbvlnosgMeWPjemmiCAyIOWcqOe6vyAz5b6u5L+hIDRxceWuouacjSAgNeWFrOS8l+WPtyA26Zi/6YeMICA36Zi/54m5XHJcbmV4cG9ydCBlbnVtIFRhZ1R5cGV7XHJcbiAgICBGRUVEQkFDSyA9IDEsXHJcbiAgICBPTkxJTkUgPSAyLFxyXG4gICAgV1ggPSAzLFxyXG4gICAgUVEgPSA0LFxyXG4gICAgR1pIID0gNSxcclxuICAgIEFMSSA9IDYsXHJcbiAgICBBVCA9IDcsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFJpZ2h0Vmlld1R5cGV7XHJcbiAgICBmZWVkYmFjaz0wLFxyXG4gICAgb25saW5lU2VydmljZT0xLFxyXG4gICAgd3hTZXJ2aWNlPTIsXHJcbiAgICBxcVNlcnZpY2U9MyxcclxuICAgIGd6aFNlcnZpY2U9NCxcclxuICAgIGFsaVNlcnZpY2U9NSxcclxuICAgIGF0U2VydmljZT02LFxyXG4gICAgRlFBPTcsXHJcbiAgICBmZWVkYmFja1Nob3dBbmRXcml0ZT04LFxyXG4gICAgbm9Nc2dUaXBzPTksXHJcbiAgICBmZWVkYmFjazI9MTBcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU2VydkVudGl0eVR5cGV7XHJcbiAgICBvbmxpbmVTZXJ2aWNlPVwib25saW5lU2VydmljZVwiLFxyXG4gICAgd3hTZXJ2aWNlPVwid3hTZXJ2aWNlXCIsXHJcbiAgICBxcVNlcnZpY2U9XCJxcVNlcnZpY2VcIixcclxuICAgIGF0U2VydmljZT1cImF0U2VydmljZVwiLFxyXG4gICBcclxufVxyXG5cclxuIl19