"use strict";
cc._RF.push(module, '319dbgJd9FAMLSv1V+QdBjR', 'DdzSyncHandler');
// ddz/ddz/scripts/handlers/DdzSyncHandler.ts

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
exports.DdzSyncRefreshHandler = exports.DdzSyncEndHandler = exports.DdzSyncBeginHandler = void 0;
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzDriver_1 = require("../DdzDriver");
var DdzSyncBeginHandler = /** @class */ (function (_super) {
    __extends(DdzSyncBeginHandler, _super);
    function DdzSyncBeginHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzSyncBeginHandler.prototype.refreshData = function (msg) {
        this.context.syncMode = true;
    };
    DdzSyncBeginHandler.prototype.execute = function (msg) {
        DdzDriver_1.default.instance.beginSync();
    };
    return DdzSyncBeginHandler;
}(DdzBaseHandler_1.default));
exports.DdzSyncBeginHandler = DdzSyncBeginHandler;
var DdzSyncEndHandler = /** @class */ (function (_super) {
    __extends(DdzSyncEndHandler, _super);
    function DdzSyncEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzSyncEndHandler.prototype.refreshData = function (msg) {
        this.context.syncMode = false;
    };
    return DdzSyncEndHandler;
}(DdzBaseHandler_1.default));
exports.DdzSyncEndHandler = DdzSyncEndHandler;
var DdzSyncRefreshHandler = /** @class */ (function (_super) {
    __extends(DdzSyncRefreshHandler, _super);
    function DdzSyncRefreshHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzSyncRefreshHandler.prototype.execute = function (msg) {
        var _this = this;
        this.context.updateMarkerData(msg._para.out_cards);
        var userPlays = msg._para.user_plays;
        var bombCount = msg._para.bomb_count;
        if (bombCount && bombCount > 0) {
            if (!this.context.get(this.Define.FieldBombBgm)) {
                Global.Audio.playGameBundleMusic(DdzPathHelper_1.DdzAudioConst.Bgm2, true);
                this.context.set(this.Define.FieldBombBgm, true);
            }
        }
        if (userPlays && userPlays.length > 0) {
            userPlays.forEach(function (user) {
                var pokers = user.cards;
                var type = user.type;
                var localSeat = _this.SitHelper.serverSToLocalN(user.chair);
                var isPlay = user.status == 1;
                if (isPlay && pokers && type) {
                    // 已出牌显示
                    _this.context.set(_this.Define.FieldOnOutPokers, DdzDriver_1.default.instance.PlayRuleHelper.getPokersType(pokers)); // 需要按顺序来
                    _this.mainUI.callPlayer(localSeat, 'showPlayPokers', true, pokers, false);
                }
                else {
                    _this.mainUI.callPlayer(localSeat, 'setState', true, DdzGameConst_1.DdzGameActState.Play, 0);
                }
            });
        }
    };
    return DdzSyncRefreshHandler;
}(DdzBaseHandler_1.default));
exports.DdzSyncRefreshHandler = DdzSyncRefreshHandler;

cc._RF.pop();