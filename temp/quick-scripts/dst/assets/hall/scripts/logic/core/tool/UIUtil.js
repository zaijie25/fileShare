
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/UIUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4965c+FkCBOyoScIn90bvi4', 'UIUtil');
// hall/scripts/logic/core/tool/UIUtil.ts

"use strict";
/**
 * UIUtils:UI节点工具类
 * @author Peter
 */
Object.defineProperty(exports, "__esModule", { value: true });
var qrcode_1 = require("../libs/qrcode");
var UIUtil = /** @class */ (function () {
    function UIUtil() {
    }
    /**
    * 调整iphoneX坐标
    * @param widgetsList  需要调整的widget节点
    * @param offset 偏移值，默认为60
    * @param isPortrait 新增竖屏变量, 处理按钮在顶部状态栏点不到
    */
    UIUtil.prototype.adjustIphoneX = function (widgetsList, offset, isPortrait) {
        if (offset === void 0) { offset = 60; }
        if (isPortrait === void 0) { isPortrait = false; }
        if (widgetsList == null)
            return;
        if (!cc.sys.isNative)
            return;
        if (!Global.Setting.SystemInfo.isIphoneX)
            return;
        for (var i = 0; i < widgetsList.length; i++) {
            var node = widgetsList[i];
            if (node == null || !node.isValid)
                continue;
            var widght = node.getComponent(cc.Widget);
            if (widght) {
                if (isPortrait)
                    widght.top += offset;
                else
                    widght.left += offset;
            }
        }
    };
    /* 设置节点的父节点，保持位置不变
    * @param child 要操作节点
    * @param parent 要设置到的父节点
    * @param isFixed 是否保持位置不变
    */
    UIUtil.prototype.setNodeParent = function (child, parent, isFixed) {
        if (isFixed === void 0) { isFixed = true; }
        if (child && parent && cc.isValid(child) && cc.isValid(parent)) {
            if (isFixed) {
                var pos = this.convertSameNodePos(child.parent, parent, child.position);
                child.setParent(parent);
                child.setPosition(pos);
            }
            else {
                child.setParent(parent);
            }
        }
        else {
            Logger.error('父子节点非法');
        }
    };
    /**
    * 将node1坐标系下的point转换到node2坐标系下的本地坐标
    * @param node1 要转换坐标的父节点
    * @param node2 目的父节点
    * @param point 转换坐标
    */
    UIUtil.prototype.convertSameNodePos = function (node1, node2, point) {
        if (point === void 0) { point = cc.Vec3.ZERO; }
        var worldPos = node1.convertToWorldSpaceAR(point);
        return node2.convertToNodeSpaceAR(worldPos);
    };
    UIUtil.prototype.loadWebPic = function (node, url) {
        Global.ResourceManager.load(url, function (error, texture) {
            if (error) {
                Logger.error("--------------load pic error-------" + error.msg);
                return;
            }
            var sp = node.getComponent(cc.Sprite);
            if (!sp) {
                return Logger.error("_________找不到Sprite_________");
            }
            var headwidth = node.width;
            var headHeight = node.height;
            sp.spriteFrame = new cc.SpriteFrame(texture);
            node.width = headwidth;
            node.height = headHeight;
        });
    };
    UIUtil.prototype.getLocalHeadSf = function (sfName, sprite, width, height) {
        // return Global.ResourceManager.getSprite("hall/texture/common/headImg", sfName);
        if (sfName == null || sfName == undefined || sfName == "") {
            Logger.error("getLocalHeadSf() sfName is empty, return!!!");
            return null;
        }
        if (Number(sfName) && Number(sfName) > Global.Setting.headNameRange) {
            var id = Number(sfName) % Global.Setting.headNameRange; // 2020.1.20暂时特殊处理 防止大批头像一样的问题 // grace
            if (id == 0) {
                id = 1;
            }
            sfName = (id).toString();
        }
        var spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/headImg", sfName);
        if (spriteFrame == null) {
            Logger.error("getLocalHeadSf() 找不到头像, sfName = " + sfName + ", return!!!");
            return null;
        }
        if (sprite != null && sprite != undefined) {
            width = (width != null) ? width : sprite.node.width;
            height = (height != null) ? height : sprite.node.height;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            sprite.trim = false;
            sprite.spriteFrame = spriteFrame;
            sprite.node.width = width;
            sprite.node.height = height;
        }
        return spriteFrame;
    };
    /**
    * 加载头像框
    * @param sprite 图片精灵
    * @param headKuang 头像框的id值字符串
    * @param bGuang 是否发光的框
    */
    UIUtil.prototype.loadLocalHeadFrame = function (sprite, headKuang, bGuang) {
        if (bGuang === void 0) { bGuang = false; }
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "txkuang_vip" + headKuang;
        if (bGuang) {
            sfString += "_guang";
        }
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, function () {
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            sprite.trim = false;
        }, false);
    };
    /**
     * 加载vip大图标
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    UIUtil.prototype.loadLocalVip = function (sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "icon_v" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    };
    /**
     * 加载vip小标识
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    UIUtil.prototype.loadLocalVipIcon = function (sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "vip_tq" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    };
    /**
 * 加载vip小标识子游戏调用
 * @param sprite 图片精灵
 * @param vip vip等级
 */
    UIUtil.prototype.loadLocalVipIconGame = function (sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "icon_v" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    };
    /**
     *
     * @param node 生成二维码的节点
     * @param url 二维码的url
     * @param margin 二维码边界空隙长宽
     */
    UIUtil.prototype.initQRCode = function (node, url, margin) {
        if (margin === void 0) { margin = 10; }
        var ctx = Global.UIHelper.safeGetComponent(node, "", cc.Graphics); //node.addComponent(cc.Graphics);
        if (ctx) {
            ctx.clear();
        }
        // let Tip = new QRCodeTip()
        // Global.ResourceManager.loadRes("hall/prefabs/ui/QRCodeTip", (error, prefab)=>
        // {
        //     if(prefab)
        //     {
        //         Tip.setNode(cc.instantiate(prefab));
        //         Tip.node.setParent(node);
        //     }
        // })
        // Global.UI.showLodingTip("加载中",node);
        if (typeof (url) !== 'string') {
            Logger.log('url is not string', url);
            // Global.UI.hideLodingTip("加载失败",node);
            return;
        }
        this.QRCreate(ctx, url, margin, node);
        // Global.UI.hideLodingTip("加载成功",node);
    };
    /**
     *
     * @param ctx 绘制api
     * @param url 二维码的url
     * @param margin 二维码边界空隙长宽
     * @param node 生成二维码的节点
     */
    UIUtil.prototype.QRCreate = function (ctx, url, margin, node) {
        ctx.clear();
        //背景色
        ctx.fillColor = cc.Color.WHITE;
        var width = node.width;
        ctx.rect(0 - width * 0.5, 0 - width * 0.5, width, width);
        ctx.fill();
        ctx.close();
        //生成二维码数据
        var qrcode = new qrcode_1.QRCode(-1, qrcode_1.QRErrorCorrectLevel.H);
        qrcode.addData(url);
        qrcode.make();
        ctx.fillColor = cc.Color.BLACK;
        var size = width - margin * 2;
        var num = qrcode.getModuleCount();
        var tileW = size / num;
        var tileH = size / num;
        var w = Math.ceil(tileW);
        var h = Math.ceil(tileH);
        for (var row = 0; row < num; row++) {
            for (var col = 0; col < num; col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.rect(margin + col * tileW - width * 0.5, size - tileH - Math.round(row * tileH) + margin - width * 0.5, w, h);
                    ctx.fill();
                }
            }
        }
    };
    return UIUtil;
}());
exports.default = UIUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFVJVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztHQUdHOztBQUVILHlDQUE2RDtBQUU3RDtJQUFBO0lBZ1BBLENBQUM7SUE5T0c7Ozs7O01BS0U7SUFDSyw4QkFBYSxHQUFwQixVQUFxQixXQUFzQixFQUFFLE1BQVcsRUFBRSxVQUEyQjtRQUF4Qyx1QkFBQSxFQUFBLFdBQVc7UUFBRSwyQkFBQSxFQUFBLGtCQUEyQjtRQUNqRixJQUFJLFdBQVcsSUFBSSxJQUFJO1lBQ25CLE9BQU87UUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRO1lBQ2hCLE9BQU87UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUztZQUNwQyxPQUFPO1FBQ1gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2dCQUM3QixTQUFTO1lBQ2IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxVQUFVO29CQUNWLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDOztvQkFFckIsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7SUFFRDs7OztNQUlFO0lBQ0ssOEJBQWEsR0FBcEIsVUFBcUIsS0FBYyxFQUFFLE1BQWUsRUFBRSxPQUF1QjtRQUF2Qix3QkFBQSxFQUFBLGNBQXVCO1FBQ3pF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Z0JBQ2hDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsRUFBRSxJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDbEgsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNkO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFTCxhQUFDO0FBQUQsQ0FoUEEsQUFnUEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBVSVV0aWxzOlVJ6IqC54K55bel5YW357G7XHJcbiAqIEBhdXRob3IgUGV0ZXJcclxuICovXHJcblxyXG5pbXBvcnQgeyBRUkNvZGUsIFFSRXJyb3JDb3JyZWN0TGV2ZWwgfSBmcm9tIFwiLi4vbGlicy9xcmNvZGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiwg+aVtGlwaG9uZVjlnZDmoIdcclxuICAgICogQHBhcmFtIHdpZGdldHNMaXN0ICDpnIDopoHosIPmlbTnmoR3aWRnZXToioLngrlcclxuICAgICogQHBhcmFtIG9mZnNldCDlgY/np7vlgLzvvIzpu5jorqTkuLo2MFxyXG4gICAgKiBAcGFyYW0gaXNQb3J0cmFpdCDmlrDlop7nq5blsY/lj5jph48sIOWkhOeQhuaMiemSruWcqOmhtumDqOeKtuaAgeagj+eCueS4jeWIsFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBhZGp1c3RJcGhvbmVYKHdpZGdldHNMaXN0OiBjYy5Ob2RlW10sIG9mZnNldCA9IDYwLCBpc1BvcnRyYWl0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAod2lkZ2V0c0xpc3QgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKCFHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmlzSXBob25lWClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkZ2V0c0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB3aWRnZXRzTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCB8fCAhbm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCB3aWRnaHQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgICAgICBpZiAod2lkZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNQb3J0cmFpdClcclxuICAgICAgICAgICAgICAgICAgICB3aWRnaHQudG9wICs9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB3aWRnaHQubGVmdCArPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyog6K6+572u6IqC54K555qE54i26IqC54K577yM5L+d5oyB5L2N572u5LiN5Y+YXHJcbiAgICAqIEBwYXJhbSBjaGlsZCDopoHmk43kvZzoioLngrlcclxuICAgICogQHBhcmFtIHBhcmVudCDopoHorr7nva7liLDnmoTniLboioLngrlcclxuICAgICogQHBhcmFtIGlzRml4ZWQg5piv5ZCm5L+d5oyB5L2N572u5LiN5Y+YXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNldE5vZGVQYXJlbnQoY2hpbGQ6IGNjLk5vZGUsIHBhcmVudDogY2MuTm9kZSwgaXNGaXhlZDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAoY2hpbGQgJiYgcGFyZW50ICYmIGNjLmlzVmFsaWQoY2hpbGQpICYmIGNjLmlzVmFsaWQocGFyZW50KSkge1xyXG4gICAgICAgICAgICBpZiAoaXNGaXhlZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMuY29udmVydFNhbWVOb2RlUG9zKGNoaWxkLnBhcmVudCwgcGFyZW50LCBjaGlsZC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRQYXJlbnQocGFyZW50KTtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRQYXJlbnQocGFyZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKCfniLblrZDoioLngrnpnZ7ms5UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICog5bCGbm9kZTHlnZDmoIfns7vkuIvnmoRwb2ludOi9rOaNouWIsG5vZGUy5Z2Q5qCH57O75LiL55qE5pys5Zyw5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gbm9kZTEg6KaB6L2s5o2i5Z2Q5qCH55qE54i26IqC54K5XHJcbiAgICAgKiBAcGFyYW0gbm9kZTIg55uu55qE54i26IqC54K5XHJcbiAgICAgKiBAcGFyYW0gcG9pbnQg6L2s5o2i5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb252ZXJ0U2FtZU5vZGVQb3Mobm9kZTE6IGNjLk5vZGUsIG5vZGUyOiBjYy5Ob2RlLCBwb2ludCA9IGNjLlZlYzMuWkVSTykge1xyXG4gICAgICAgIGxldCB3b3JsZFBvcyA9IG5vZGUxLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwb2ludCk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUyLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFdlYlBpYyhub2RlOiBjYy5Ob2RlLCB1cmw6IHN0cmluZykge1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZCh1cmwsIChlcnJvciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIi0tLS0tLS0tLS0tLS0tbG9hZCBwaWMgZXJyb3ItLS0tLS0tXCIgKyBlcnJvci5tc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzcCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGlmICghc3ApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBMb2dnZXIuZXJyb3IoXCJfX19fX19fX1/mib7kuI3liLBTcHJpdGVfX19fX19fX19cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGhlYWR3aWR0aCA9IG5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBoZWFkSGVpZ2h0ID0gbm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICBub2RlLndpZHRoID0gaGVhZHdpZHRoO1xyXG4gICAgICAgICAgICBub2RlLmhlaWdodCA9IGhlYWRIZWlnaHQ7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TG9jYWxIZWFkU2Yoc2ZOYW1lOiBzdHJpbmcsIHNwcml0ZT86IGNjLlNwcml0ZSwgd2lkdGg/OiBudW1iZXIsIGhlaWdodD86IG51bWJlcikge1xyXG4gICAgICAgIC8vIHJldHVybiBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldFNwcml0ZShcImhhbGwvdGV4dHVyZS9jb21tb24vaGVhZEltZ1wiLCBzZk5hbWUpO1xyXG4gICAgICAgIGlmIChzZk5hbWUgPT0gbnVsbCB8fCBzZk5hbWUgPT0gdW5kZWZpbmVkIHx8IHNmTmFtZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdldExvY2FsSGVhZFNmKCkgc2ZOYW1lIGlzIGVtcHR5LCByZXR1cm4hISFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE51bWJlcihzZk5hbWUpICYmIE51bWJlcihzZk5hbWUpID4gR2xvYmFsLlNldHRpbmcuaGVhZE5hbWVSYW5nZSkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBOdW1iZXIoc2ZOYW1lKSAlIEdsb2JhbC5TZXR0aW5nLmhlYWROYW1lUmFuZ2UgLy8gMjAyMC4xLjIw5pqC5pe254m55q6K5aSE55CGIOmYsuatouWkp+aJueWktOWDj+S4gOagt+eahOmXrumimCAvLyBncmFjZVxyXG4gICAgICAgICAgICBpZiAoaWQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2ZOYW1lID0gKGlkKS50b1N0cmluZygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0U3ByaXRlKFwiaGFsbC90ZXh0dXJlL2NvbW1vbi9oZWFkSW1nXCIsIHNmTmFtZSk7XHJcbiAgICAgICAgaWYgKHNwcml0ZUZyYW1lID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2V0TG9jYWxIZWFkU2YoKSDmib7kuI3liLDlpLTlg48sIHNmTmFtZSA9IFwiICsgc2ZOYW1lICsgXCIsIHJldHVybiEhIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3ByaXRlICE9IG51bGwgJiYgc3ByaXRlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB3aWR0aCA9ICh3aWR0aCAhPSBudWxsKSA/IHdpZHRoIDogc3ByaXRlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IChoZWlnaHQgIT0gbnVsbCkgPyBoZWlnaHQgOiBzcHJpdGUubm9kZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuUkFXXHJcbiAgICAgICAgICAgIHNwcml0ZS50cmltID0gZmFsc2VcclxuICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIHNwcml0ZS5ub2RlLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHNwcml0ZS5ub2RlLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwcml0ZUZyYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDliqDovb3lpLTlg4/moYZcclxuICAgICogQHBhcmFtIHNwcml0ZSDlm77niYfnsr7ngbVcclxuICAgICogQHBhcmFtIGhlYWRLdWFuZyDlpLTlg4/moYbnmoRpZOWAvOWtl+espuS4slxyXG4gICAgKiBAcGFyYW0gYkd1YW5nIOaYr+WQpuWPkeWFieeahOahhlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTG9jYWxIZWFkRnJhbWUoc3ByaXRlOiBjYy5TcHJpdGUsIGhlYWRLdWFuZzogc3RyaW5nLCBiR3Vhbmc6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIC8vdmFyIGF0bGFzU3RyaW5nID0gXCJoYWxsL3RleHR1cmUvaGFsbC9wbGF5ZXJJbmZvL0F1dG9BdGxhc19wbGF5ZXJpbmZvXCI7XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5wbGF5ZXJJbmZvQXRsYXNQYXRoO1xyXG4gICAgICAgIHZhciBzZlN0cmluZyA9IFwidHhrdWFuZ192aXBcIiArIGhlYWRLdWFuZztcclxuICAgICAgICBpZiAoYkd1YW5nKSB7XHJcbiAgICAgICAgICAgIHNmU3RyaW5nICs9IFwiX2d1YW5nXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXMoc3ByaXRlLCBhdGxhc1N0cmluZywgc2ZTdHJpbmcsICgpID0+IHtcclxuICAgICAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLlJBV1xyXG4gICAgICAgICAgICBzcHJpdGUudHJpbSA9IGZhbHNlXHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29dmlw5aSn5Zu+5qCHXHJcbiAgICAgKiBAcGFyYW0gc3ByaXRlIOWbvueJh+eyvueBtVxyXG4gICAgICogQHBhcmFtIHZpcCB2aXDnrYnnuqdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRMb2NhbFZpcChzcHJpdGU6IGNjLlNwcml0ZSwgdmlwKSB7XHJcbiAgICAgICAgLy92YXIgYXRsYXNTdHJpbmcgPSBcImhhbGwvdGV4dHVyZS9oYWxsL3BsYXllckluZm8vQXV0b0F0bGFzX3BsYXllcmluZm9cIjtcclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnBsYXllckluZm9BdGxhc1BhdGg7XHJcbiAgICAgICAgdmFyIHNmU3RyaW5nID0gXCJpY29uX3ZcIiArIHZpcDtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHNwcml0ZSwgYXRsYXNTdHJpbmcsIHNmU3RyaW5nLCBudWxsLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb12aXDlsI/moIfor4ZcclxuICAgICAqIEBwYXJhbSBzcHJpdGUg5Zu+54mH57K+54G1XHJcbiAgICAgKiBAcGFyYW0gdmlwIHZpcOetiee6p1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZExvY2FsVmlwSWNvbihzcHJpdGU6IGNjLlNwcml0ZSwgdmlwKSB7XHJcbiAgICAgICAgLy92YXIgYXRsYXNTdHJpbmcgPSBcImhhbGwvdGV4dHVyZS9oYWxsL3BsYXllckluZm8vQXV0b0F0bGFzX3BsYXllcmluZm9cIjtcclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnBsYXllckluZm9BdGxhc1BhdGg7XHJcbiAgICAgICAgdmFyIHNmU3RyaW5nID0gXCJ2aXBfdHFcIiArIHZpcDtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHNwcml0ZSwgYXRsYXNTdHJpbmcsIHNmU3RyaW5nLCBudWxsLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gKiDliqDovb12aXDlsI/moIfor4blrZDmuLjmiI/osIPnlKhcclxuICogQHBhcmFtIHNwcml0ZSDlm77niYfnsr7ngbVcclxuICogQHBhcmFtIHZpcCB2aXDnrYnnuqdcclxuICovXHJcbiAgICBwdWJsaWMgbG9hZExvY2FsVmlwSWNvbkdhbWUoc3ByaXRlOiBjYy5TcHJpdGUsIHZpcCkge1xyXG4gICAgICAgIC8vdmFyIGF0bGFzU3RyaW5nID0gXCJoYWxsL3RleHR1cmUvaGFsbC9wbGF5ZXJJbmZvL0F1dG9BdGxhc19wbGF5ZXJpbmZvXCI7XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5wbGF5ZXJJbmZvQXRsYXNQYXRoO1xyXG4gICAgICAgIHZhciBzZlN0cmluZyA9IFwiaWNvbl92XCIgKyB2aXA7XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhzcHJpdGUsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBub2RlIOeUn+aIkOS6jOe7tOeggeeahOiKgueCuVxyXG4gICAgICogQHBhcmFtIHVybCDkuoznu7TnoIHnmoR1cmxcclxuICAgICAqIEBwYXJhbSBtYXJnaW4g5LqM57u056CB6L6555WM56m66ZqZ6ZW/5a69XHJcbiAgICAgKi9cclxuICAgIGluaXRRUkNvZGUobm9kZSwgdXJsLCBtYXJnaW4gPSAxMCkge1xyXG4gICAgICAgIHZhciBjdHggPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudChub2RlLCBcIlwiLCBjYy5HcmFwaGljcykvL25vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpZiAoY3R4KSB7XHJcbiAgICAgICAgICAgIGN0eC5jbGVhcigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCBUaXAgPSBuZXcgUVJDb2RlVGlwKClcclxuICAgICAgICAvLyBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRSZXMoXCJoYWxsL3ByZWZhYnMvdWkvUVJDb2RlVGlwXCIsIChlcnJvciwgcHJlZmFiKT0+XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBpZihwcmVmYWIpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIFRpcC5zZXROb2RlKGNjLmluc3RhbnRpYXRlKHByZWZhYikpO1xyXG4gICAgICAgIC8vICAgICAgICAgVGlwLm5vZGUuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvLyBHbG9iYWwuVUkuc2hvd0xvZGluZ1RpcChcIuWKoOi9veS4rVwiLG5vZGUpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHVybCkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coJ3VybCBpcyBub3Qgc3RyaW5nJywgdXJsKTtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLmhpZGVMb2RpbmdUaXAoXCLliqDovb3lpLHotKVcIixub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlFSQ3JlYXRlKGN0eCwgdXJsLCBtYXJnaW4sIG5vZGUpO1xyXG4gICAgICAgIC8vIEdsb2JhbC5VSS5oaWRlTG9kaW5nVGlwKFwi5Yqg6L295oiQ5YqfXCIsbm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjdHgg57uY5Yi2YXBpXHJcbiAgICAgKiBAcGFyYW0gdXJsIOS6jOe7tOeggeeahHVybFxyXG4gICAgICogQHBhcmFtIG1hcmdpbiDkuoznu7TnoIHovrnnlYznqbrpmpnplb/lrr1cclxuICAgICAqIEBwYXJhbSBub2RlIOeUn+aIkOS6jOe7tOeggeeahOiKgueCuVxyXG4gICAgICovXHJcbiAgICBRUkNyZWF0ZShjdHgsIHVybCwgbWFyZ2luLCBub2RlKSB7XHJcblxyXG4gICAgICAgIGN0eC5jbGVhcigpO1xyXG5cclxuICAgICAgICAvL+iDjOaZr+iJslxyXG4gICAgICAgIGN0eC5maWxsQ29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub2RlLndpZHRoO1xyXG4gICAgICAgIGN0eC5yZWN0KDAgLSB3aWR0aCAqIDAuNSwgMCAtIHdpZHRoICogMC41LCB3aWR0aCwgd2lkdGgpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgY3R4LmNsb3NlKCk7XHJcblxyXG4gICAgICAgIC8v55Sf5oiQ5LqM57u056CB5pWw5o2uXHJcbiAgICAgICAgbGV0IHFyY29kZSA9IG5ldyBRUkNvZGUoLTEsIFFSRXJyb3JDb3JyZWN0TGV2ZWwuSCk7XHJcbiAgICAgICAgcXJjb2RlLmFkZERhdGEodXJsKTtcclxuICAgICAgICBxcmNvZGUubWFrZSgpO1xyXG4gICAgICAgIGN0eC5maWxsQ29sb3IgPSBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICBsZXQgc2l6ZSA9IHdpZHRoIC0gbWFyZ2luICogMjtcclxuICAgICAgICBsZXQgbnVtID0gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XHJcblxyXG4gICAgICAgIGxldCB0aWxlVyA9IHNpemUgLyBudW07XHJcbiAgICAgICAgbGV0IHRpbGVIID0gc2l6ZSAvIG51bTtcclxuICAgICAgICBsZXQgdyA9IE1hdGguY2VpbCh0aWxlVyk7XHJcbiAgICAgICAgbGV0IGggPSBNYXRoLmNlaWwodGlsZUgpO1xyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG51bTsgcm93KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgbnVtOyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHFyY29kZS5pc0Rhcmsocm93LCBjb2wpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJlY3QobWFyZ2luICsgY29sICogdGlsZVcgLSB3aWR0aCAqIDAuNSwgc2l6ZSAtIHRpbGVIIC0gTWF0aC5yb3VuZChyb3cgKiB0aWxlSCkgKyBtYXJnaW4gLSB3aWR0aCAqIDAuNSwgdywgaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=