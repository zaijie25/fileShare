"use strict";
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