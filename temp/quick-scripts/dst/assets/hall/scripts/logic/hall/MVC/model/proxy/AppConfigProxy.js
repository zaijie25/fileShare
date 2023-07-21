
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/MVC/model/proxy/AppConfigProxy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '129ebSsIkpFZaz1/cCCFpgd', 'AppConfigProxy');
// hall/scripts/logic/hall/MVC/model/proxy/AppConfigProxy.ts

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
var AppConfigProxy = /** @class */ (function (_super) {
    __extends(AppConfigProxy, _super);
    function AppConfigProxy() {
        return _super.call(this) || this;
    }
    AppConfigProxy.prototype.loadData = function () {
        Logger.log("----------------------AppConfigProxy loadData-----------");
    };
    AppConfigProxy.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.loadData();
        Logger.log('-------------AppConfigProxy onRegister--------------');
    };
    return AppConfigProxy;
}(puremvc.Proxy));
exports.default = AppConfigProxy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXE1WQ1xcbW9kZWxcXHByb3h5XFxBcHBDb25maWdQcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQUE0QyxrQ0FBYTtJQUNyRDtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUNELGlDQUFRLEdBQVI7UUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVELG1DQUFVLEdBQVY7UUFDSSxpQkFBTSxVQUFVLFdBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsQ0FBQyxDQUFBO0lBQ3RFLENBQUM7SUFHTCxxQkFBQztBQUFELENBZkEsQUFlQyxDQWYyQyxPQUFPLENBQUMsS0FBSyxHQWV4RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb25maWdQcm94eSBleHRlbmRzIHB1cmVtdmMuUHJveHkge1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgbG9hZERhdGEoKXtcclxuICAgICAgICBMb2dnZXIubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUFwcENvbmZpZ1Byb3h5IGxvYWREYXRhLS0tLS0tLS0tLS1cIilcclxuICAgIH1cclxuXHJcbiAgICBvblJlZ2lzdGVyKCl7XHJcbiAgICAgICAgc3VwZXIub25SZWdpc3RlcigpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICBMb2dnZXIubG9nKCctLS0tLS0tLS0tLS0tQXBwQ29uZmlnUHJveHkgb25SZWdpc3Rlci0tLS0tLS0tLS0tLS0tJylcclxuICAgIH1cclxuXHJcblxyXG59Il19