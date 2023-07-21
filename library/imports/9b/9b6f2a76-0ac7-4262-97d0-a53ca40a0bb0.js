"use strict";
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