/**
 * UIUtils:UI节点工具类
 * @author Peter
 */

import { QRCode, QRErrorCorrectLevel } from "../libs/qrcode";

export default class UIUtil {

    /**
    * 调整iphoneX坐标
    * @param widgetsList  需要调整的widget节点
    * @param offset 偏移值，默认为60
    * @param isPortrait 新增竖屏变量, 处理按钮在顶部状态栏点不到
    */
    public adjustIphoneX(widgetsList: cc.Node[], offset = 60, isPortrait: boolean = false) {
        if (widgetsList == null)
            return;
        if (!cc.sys.isNative)
            return;
        if (!Global.Setting.SystemInfo.isIphoneX)
            return;
        for (let i = 0; i < widgetsList.length; i++) {
            let node = widgetsList[i];
            if (node == null || !node.isValid)
                continue;
            let widght = node.getComponent(cc.Widget);
            if (widght) {
                if (isPortrait)
                    widght.top += offset;
                else
                    widght.left += offset;
            }
        }
    }

    /* 设置节点的父节点，保持位置不变
    * @param child 要操作节点
    * @param parent 要设置到的父节点
    * @param isFixed 是否保持位置不变
    */
    public setNodeParent(child: cc.Node, parent: cc.Node, isFixed: boolean = true) {
        if (child && parent && cc.isValid(child) && cc.isValid(parent)) {
            if (isFixed) {
                let pos = this.convertSameNodePos(child.parent, parent, child.position);
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
    }

     /**
     * 将node1坐标系下的point转换到node2坐标系下的本地坐标
     * @param node1 要转换坐标的父节点
     * @param node2 目的父节点
     * @param point 转换坐标
     */
    public convertSameNodePos(node1: cc.Node, node2: cc.Node, point = cc.Vec3.ZERO) {
        let worldPos = node1.convertToWorldSpaceAR(point);
        return node2.convertToNodeSpaceAR(worldPos);
    }

    public loadWebPic(node: cc.Node, url: string) {
        Global.ResourceManager.load(url, (error, texture) => {
            if (error) {
                Logger.error("--------------load pic error-------" + error.msg);
                return;
            }
            let sp = node.getComponent(cc.Sprite);
            if (!sp) {
                return Logger.error("_________找不到Sprite_________");
            }
            let headwidth = node.width;
            let headHeight = node.height;
            sp.spriteFrame = new cc.SpriteFrame(texture);
            node.width = headwidth;
            node.height = headHeight;
        })
    }

    public getLocalHeadSf(sfName: string, sprite?: cc.Sprite, width?: number, height?: number) {
        // return Global.ResourceManager.getSprite("hall/texture/common/headImg", sfName);
        if (sfName == null || sfName == undefined || sfName == "") {
            Logger.error("getLocalHeadSf() sfName is empty, return!!!");
            return null;
        }

        if (Number(sfName) && Number(sfName) > Global.Setting.headNameRange) {
            let id = Number(sfName) % Global.Setting.headNameRange // 2020.1.20暂时特殊处理 防止大批头像一样的问题 // grace
            if (id == 0) {
                id = 1
            }
            sfName = (id).toString()
        }
        let spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/headImg", sfName);
        if (spriteFrame == null) {
            Logger.error("getLocalHeadSf() 找不到头像, sfName = " + sfName + ", return!!!");
            return null;
        }

        if (sprite != null && sprite != undefined) {
            width = (width != null) ? width : sprite.node.width;
            height = (height != null) ? height : sprite.node.height;

            sprite.sizeMode = cc.Sprite.SizeMode.RAW
            sprite.trim = false
            sprite.spriteFrame = spriteFrame;
            sprite.node.width = width;
            sprite.node.height = height;
        }
        return spriteFrame;
    }

    /**
    * 加载头像框
    * @param sprite 图片精灵
    * @param headKuang 头像框的id值字符串
    * @param bGuang 是否发光的框
    */
    public loadLocalHeadFrame(sprite: cc.Sprite, headKuang: string, bGuang: boolean = false) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "txkuang_vip" + headKuang;
        if (bGuang) {
            sfString += "_guang";
        }
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, () => {
            sprite.sizeMode = cc.Sprite.SizeMode.RAW
            sprite.trim = false
        }, false);
    }

    /**
     * 加载vip大图标
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    public loadLocalVip(sprite: cc.Sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "icon_v" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    }

    /**
     * 加载vip小标识
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    public loadLocalVipIcon(sprite: cc.Sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "vip_tq" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    }


    /**
 * 加载vip小标识子游戏调用
 * @param sprite 图片精灵
 * @param vip vip等级
 */
    public loadLocalVipIconGame(sprite: cc.Sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "icon_v" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    }



    /**
     * 
     * @param node 生成二维码的节点
     * @param url 二维码的url
     * @param margin 二维码边界空隙长宽
     */
    initQRCode(node, url, margin = 10) {
        var ctx = Global.UIHelper.safeGetComponent(node, "", cc.Graphics)//node.addComponent(cc.Graphics);
        if (ctx) {
            ctx.clear()
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
    }

    /**
     * 
     * @param ctx 绘制api
     * @param url 二维码的url
     * @param margin 二维码边界空隙长宽
     * @param node 生成二维码的节点
     */
    QRCreate(ctx, url, margin, node) {

        ctx.clear();

        //背景色
        ctx.fillColor = cc.Color.WHITE;
        let width = node.width;
        ctx.rect(0 - width * 0.5, 0 - width * 0.5, width, width);
        ctx.fill();
        ctx.close();

        //生成二维码数据
        let qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrcode.addData(url);
        qrcode.make();
        ctx.fillColor = cc.Color.BLACK;
        let size = width - margin * 2;
        let num = qrcode.getModuleCount();

        let tileW = size / num;
        let tileH = size / num;
        let w = Math.ceil(tileW);
        let h = Math.ceil(tileH);
        for (let row = 0; row < num; row++) {
            for (let col = 0; col < num; col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.rect(margin + col * tileW - width * 0.5, size - tileH - Math.round(row * tileH) + margin - width * 0.5, w, h);
                    ctx.fill();
                }
            }
        }
    }

}