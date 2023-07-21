"use strict";
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