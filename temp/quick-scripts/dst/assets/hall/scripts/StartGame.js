
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/StartGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b1f74npq1BDxbnLnLjbAi3v', 'StartGame');
// hall/scripts/StartGame.js

"use strict";

var _LoadingFacade = _interopRequireDefault(require("./logic/core/loadingMVC/LoadingFacade"));

var _Setting = require("./logic/core/setting/Setting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    manifest: {
      type: [cc.Asset],
      "default": []
    },
    //
    isStartHotUpdate: false,
    serverType: {
      type: cc.Enum(_Setting.ServerType),
      "default": _Setting.ServerType.DEVELOP,
      serializable: true
    }
  },
  onLoad: function onLoad() {
    //文档中没有 
    if (cc.Device && cc.Device.setKeepScreenOn) {
      cc.Device.setKeepScreenOn(true);
    }

    cc.macro.DOWNLOAD_MAX_CONCURRENT = 8;

    _LoadingFacade["default"].Instance.startUp(this.manifest, this, this.isStartHotUpdate, this.serverType);

    Logger.log("---------isStartHotUpdate------" + this.isStartHotUpdate);
  },
  start: function start() {},
  onDestory: function onDestory() {},
  update: function update(dt) {
    if (Global && Global.Http) {
      Global.Http.onUpdate(dt);
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcU3RhcnRHYW1lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibWFuaWZlc3QiLCJ0eXBlIiwiQXNzZXQiLCJpc1N0YXJ0SG90VXBkYXRlIiwic2VydmVyVHlwZSIsIkVudW0iLCJTZXJ2ZXJUeXBlIiwiREVWRUxPUCIsInNlcmlhbGl6YWJsZSIsIm9uTG9hZCIsIkRldmljZSIsInNldEtlZXBTY3JlZW5PbiIsIm1hY3JvIiwiRE9XTkxPQURfTUFYX0NPTkNVUlJFTlQiLCJMb2FkaW5nRmFjYWRlIiwiSW5zdGFuY2UiLCJzdGFydFVwIiwiTG9nZ2VyIiwibG9nIiwic3RhcnQiLCJvbkRlc3RvcnkiLCJ1cGRhdGUiLCJkdCIsIkdsb2JhbCIsIkh0dHAiLCJvblVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFDO0FBQ0xDLE1BQUFBLElBQUksRUFBQyxDQUFDTCxFQUFFLENBQUNNLEtBQUosQ0FEQTtBQUVMLGlCQUFRO0FBRkgsS0FERDtBQUtSO0FBQ0FDLElBQUFBLGdCQUFnQixFQUFDLEtBTlQ7QUFRUkMsSUFBQUEsVUFBVSxFQUFDO0FBQ1BILE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDUyxJQUFILENBQVFDLG1CQUFSLENBREU7QUFFUCxpQkFBUUEsb0JBQVdDLE9BRlo7QUFHUEMsTUFBQUEsWUFBWSxFQUFDO0FBSE47QUFSSCxHQUhQO0FBa0JMQyxFQUFBQSxNQWxCSyxvQkFrQks7QUFDTjtBQUNBLFFBQUdiLEVBQUUsQ0FBQ2MsTUFBSCxJQUFhZCxFQUFFLENBQUNjLE1BQUgsQ0FBVUMsZUFBMUIsRUFDQTtBQUNJZixNQUFBQSxFQUFFLENBQUNjLE1BQUgsQ0FBVUMsZUFBVixDQUEwQixJQUExQjtBQUNIOztBQUNEZixJQUFBQSxFQUFFLENBQUNnQixLQUFILENBQVNDLHVCQUFULEdBQW1DLENBQW5DOztBQUNBQyw4QkFBY0MsUUFBZCxDQUF1QkMsT0FBdkIsQ0FBK0IsS0FBS2hCLFFBQXBDLEVBQTZDLElBQTdDLEVBQWtELEtBQUtHLGdCQUF2RCxFQUF5RSxLQUFLQyxVQUE5RTs7QUFDQWEsSUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVcsb0NBQW9DLEtBQUtmLGdCQUFwRDtBQUNILEdBM0JJO0FBNEJMZ0IsRUFBQUEsS0E1QkssbUJBNEJFLENBR04sQ0EvQkk7QUFnQ0xDLEVBQUFBLFNBaENLLHVCQWdDTSxDQUVWLENBbENJO0FBb0NMQyxFQUFBQSxNQXBDSyxrQkFvQ0VDLEVBcENGLEVBcUNMO0FBQ0ksUUFBSUMsTUFBTSxJQUFJQSxNQUFNLENBQUNDLElBQXJCLEVBQTBCO0FBQ3RCRCxNQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWUMsUUFBWixDQUFxQkgsRUFBckI7QUFDSDtBQUVKO0FBMUNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2FkaW5nRmFjYWRlIGZyb20gJy4vbG9naWMvY29yZS9sb2FkaW5nTVZDL0xvYWRpbmdGYWNhZGUnO1xyXG5pbXBvcnQgeyBTZXJ2ZXJUeXBlIH0gZnJvbSAnLi9sb2dpYy9jb3JlL3NldHRpbmcvU2V0dGluZyc7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG1hbmlmZXN0OntcclxuICAgICAgICAgICAgdHlwZTpbY2MuQXNzZXRdLFxyXG4gICAgICAgICAgICBkZWZhdWx0OltdXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL1xyXG4gICAgICAgIGlzU3RhcnRIb3RVcGRhdGU6ZmFsc2UsXHJcblxyXG4gICAgICAgIHNlcnZlclR5cGU6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLkVudW0oU2VydmVyVHlwZSksXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6U2VydmVyVHlwZS5ERVZFTE9QLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6dHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy/mlofmoaPkuK3msqHmnIkgXHJcbiAgICAgICAgaWYoY2MuRGV2aWNlICYmIGNjLkRldmljZS5zZXRLZWVwU2NyZWVuT24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5EZXZpY2Uuc2V0S2VlcFNjcmVlbk9uKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5tYWNyby5ET1dOTE9BRF9NQVhfQ09OQ1VSUkVOVCA9IDg7XHJcbiAgICAgICAgTG9hZGluZ0ZhY2FkZS5JbnN0YW5jZS5zdGFydFVwKHRoaXMubWFuaWZlc3QsdGhpcyx0aGlzLmlzU3RhcnRIb3RVcGRhdGUsIHRoaXMuc2VydmVyVHlwZSk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIi0tLS0tLS0tLWlzU3RhcnRIb3RVcGRhdGUtLS0tLS1cIiArIHRoaXMuaXNTdGFydEhvdFVwZGF0ZSlcclxuICAgIH0sXHJcbiAgICBzdGFydCgpe1xyXG5cclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBvbkRlc3RvcnkoKXtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmIChHbG9iYWwgJiYgR2xvYmFsLkh0dHApe1xyXG4gICAgICAgICAgICBHbG9iYWwuSHR0cC5vblVwZGF0ZShkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIFxyXG59KTtcclxuIl19