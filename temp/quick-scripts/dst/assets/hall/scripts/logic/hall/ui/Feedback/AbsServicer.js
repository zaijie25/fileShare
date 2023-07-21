
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/AbsServicer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0b4b6T/mk1J6oVmBxkJH+6d', 'AbsServicer');
// hall/scripts/logic/hall/ui/Feedback/AbsServicer.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicerDataEntity = void 0;
//客服公共抽象类
var AbsServicer = /** @class */ (function () {
    function AbsServicer(serKey) {
        this._name = [];
        this._info = [];
        this._serKey = "";
        this.serviceDatas = null;
        this._serKey = serKey;
    }
    AbsServicer.prototype.initServicerData = function () {
        if (this.serviceDatas == null) {
            this.serviceDatas = new Array();
        }
        if (this.serviceDatas.length > 0) {
            return this.serviceDatas;
        }
        var info = this._info;
        var name = this._name || [];
        for (var i = 0; i < info.length; i++) {
            if (info[i].trim() == "" || !info[i]) {
                continue;
            }
            var entity = new ServicerDataEntity();
            entity.name = name[i];
            entity.info = info[i];
            entity.type = this._type;
            this.serviceDatas.push(entity);
        }
        return this.serviceDatas;
    };
    AbsServicer.prototype.acceptService = function (index) { };
    Object.defineProperty(AbsServicer.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbsServicer.prototype, "info", {
        get: function () {
            return this._info;
        },
        set: function (info) {
            this._info = info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbsServicer.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbsServicer.prototype, "serKey", {
        get: function () {
            return this._serKey;
        },
        enumerable: false,
        configurable: true
    });
    AbsServicer.prototype.isEmptyInfo = function () {
        return (!this._info) || this._info.length == 0;
    };
    return AbsServicer;
}());
exports.default = AbsServicer;
var ServicerDataEntity = /** @class */ (function () {
    function ServicerDataEntity() {
    }
    Object.defineProperty(ServicerDataEntity.prototype, "info", {
        get: function () {
            return this._info;
        },
        set: function (info) {
            this._info = info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServicerDataEntity.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServicerDataEntity.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: false,
        configurable: true
    });
    return ServicerDataEntity;
}());
exports.ServicerDataEntity = ServicerDataEntity;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcQWJzU2VydmljZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsU0FBUztBQUNUO0lBUUkscUJBQWEsTUFBYTtRQU5sQixVQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBVSxFQUFFLENBQUM7UUFFbEIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNoQixpQkFBWSxHQUE4QixJQUFJLENBQUM7UUFHckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVNLHNDQUFnQixHQUF2QjtRQUNJLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBRSxJQUFJLEVBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEtBQUssRUFBc0IsQ0FBQztTQUN2RDtRQUNELElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDO1lBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1QjtRQUNELElBQUksSUFBSSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxJQUFJLEdBQVUsSUFBSSxDQUFDLEtBQUssSUFBRSxFQUFFLENBQUM7UUFDakMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDMUIsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUUsRUFBRSxJQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUM1QixTQUFTO2FBQ1o7WUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDdEMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFTSxtQ0FBYSxHQUFwQixVQUFxQixLQUFZLElBQUcsQ0FBQztJQUVyQyxzQkFBVyw2QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixJQUFhO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsNkJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsSUFBYTtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLDZCQUFJO2FBSWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQU5ELFVBQWdCLElBQVc7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVywrQkFBTTthQUFqQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVNLGlDQUFXLEdBQWxCO1FBQ0ksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBR0wsa0JBQUM7QUFBRCxDQXJFQSxBQXFFQyxJQUFBOztBQUVEO0lBQUE7SUE2QkEsQ0FBQztJQXhCRyxzQkFBVyxvQ0FBSTthQUlmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFORCxVQUFnQixJQUFhO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBTUQsc0JBQVcsb0NBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsSUFBYTtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLG9DQUFJO2FBSWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQU5ELFVBQWdCLElBQVc7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFNTCx5QkFBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUE3QlksZ0RBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/lrqLmnI3mjqXlj6NcclxuaW50ZXJmYWNlIFNlcnZpY2Vye1xyXG5cclxuICAgIC8v5Yid5aeL5YyW5a6i5pyN5pWw5o2uXHJcbiAgICBpbml0U2VydmljZXJEYXRhKCk7XHJcbiAgICAvL+aOpeWPl+acjeWKoVxyXG4gICAgYWNjZXB0U2VydmljZShpbmRleDpudW1iZXIpO1xyXG5cclxufVxyXG5cclxuLy/lrqLmnI3lhazlhbHmir3osaHnsbtcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQWJzU2VydmljZXIgaW1wbGVtZW50cyBTZXJ2aWNlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbmFtZTpzdHJpbmdbXT1bXTtcclxuICAgIHByaXZhdGUgX2luZm86c3RyaW5nW109W107XHJcbiAgICBwcml2YXRlIF90eXBlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9zZXJLZXk6c3RyaW5nPVwiXCI7XHJcbiAgICBwcm90ZWN0ZWQgc2VydmljZURhdGFzOiBBcnJheTxTZXJ2aWNlckRhdGFFbnRpdHk+ID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoc2VyS2V5OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5fc2VyS2V5ID0gc2VyS2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0U2VydmljZXJEYXRhKCkgOkFycmF5PFNlcnZpY2VyRGF0YUVudGl0eT57XHJcbiAgICAgICAgaWYodGhpcy5zZXJ2aWNlRGF0YXM9PW51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VEYXRhcyA9IG5ldyBBcnJheTxTZXJ2aWNlckRhdGFFbnRpdHk+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc2VydmljZURhdGFzLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZURhdGFzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5mbzogYW55W10gPSB0aGlzLl9pbmZvO1xyXG4gICAgICAgIGxldCBuYW1lIDphbnlbXSA9IHRoaXMuX25hbWV8fFtdO1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8aW5mby5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoaW5mb1tpXS50cmltKCk9PVwiXCJ8fCFpbmZvW2ldKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBlbnRpdHkgPSBuZXcgU2VydmljZXJEYXRhRW50aXR5KCk7XHJcbiAgICAgICAgICAgIGVudGl0eS5uYW1lID0gbmFtZVtpXTtcclxuICAgICAgICAgICAgZW50aXR5LmluZm8gPSBpbmZvW2ldO1xyXG4gICAgICAgICAgICBlbnRpdHkudHlwZSA9IHRoaXMuX3R5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZURhdGFzLnB1c2goZW50aXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZURhdGFzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlcHRTZXJ2aWNlKGluZGV4Om51bWJlcikge31cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmdbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUobmFtZTpzdHJpbmdbXSl7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbmZvKCk6c3RyaW5nW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbmZvKGluZm86c3RyaW5nW10pe1xyXG4gICAgICAgIHRoaXMuX2luZm8gPSBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh0eXBlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2VyS2V5KCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXJLZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRW1wdHlJbmZvKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gKCF0aGlzLl9pbmZvKXx8dGhpcy5faW5mby5sZW5ndGg9PTA7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VyRGF0YUVudGl0eXtcclxuICAgIHByaXZhdGUgX3R5cGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2luZm86IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nW11cclxuXHJcbiAgICBwdWJsaWMgc2V0IGluZm8oaW5mbzpzdHJpbmdbXSl7XHJcbiAgICAgICAgdGhpcy5faW5mbyA9IGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbmZvKCk6c3RyaW5nW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuYW1lKCk6c3RyaW5nW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBuYW1lKG5hbWU6c3RyaW5nW10pe1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdHlwZSh0eXBlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0eXBlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==