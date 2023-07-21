import ViewBase from "../../../../core/ui/ViewBase";
import ZhuanpanModel from "../../../../hallcommon/model/ZhuanpanModel";

export default class TurnTable extends ViewBase {


    private timer: NodeJS.Timeout

    /**
     * 每帧时间 (估值)
     */
    private frameTime = 16
    /**
     * 活动图集
     */
    private atlasPath = "hall/texture/hall/activity/activity"
    /**
     * 转盘面板图集
     */
    private turnTablePathCrow = "hall/texture/hall/turnTableCrow/turnTableCrow"

    /**
     * 中奖区域闪光节点
     */
    shineNode: sp.Skeleton = null;

    /**
     * X秒内连点抽奖按钮无效
     */
    clickTime = 0;
    /**
     * 最大速度
     */
    speedMax = 270;
    /**
     * 最小速度
     */
    speedMin = 10;
    /**
     * 加速度
     */
    speedAdd = 160;
    /**
     * 减速度
     */
    speedReduce = 140;
    /**
     * 当前速度
     */
    currSpeed = 0;
    /**
     * 速度状态 -1：减速 0：匀速 1：加速
     */
    speedState = 0;

    /**
    * 旋转根节点
    */
    turnNode: cc.Node = null;
    /**
     * 转盘转动结果(中第几个奖品，从0开始)
     */
    result = -1;
    /**
    * 转盘上的奖品图标集合
    */
    awardSpriteArr: cc.Sprite[] = [];
    /**
     * 转盘上的奖品文本集合
     */
    awardLabelArr: cc.Label[] = [];
    /**
     * 抽奖按钮特效
     */
    /**
     * 当前面板
     */
    private curPanel = "silver"

    /**
    * 当前页签索引
    */
    curPanelIndex = 0;
    /**
     * 转盘合集
     */
    private panelNameArr = ["silver", "gold", "masonry"];

    private model: ZhuanpanModel
    /**
     * 转盘外框集合
     */
    private backgroundSprite: cc.Sprite = null

    /**
     * 转盘外框图片配置 为空表示三种级别转盘公用一个外框
     */
    private backgroundSpriteCfg = ["img_bywh", "img_hjwh", "img_zswh"]

    /**
     * 转盘
     */
    private spritePanel: cc.Sprite = null

    /**
     * 转盘面板名称配置表
     */
    private spritePanelCfg = ["img_byzp", "img_hjzp", "img_zszp"]

    /**
       * 开始按钮动效
       */
    spineStart: sp.Skeleton = null;
    /**
     * 转盘指针
     */
    private arrowSprite: cc.Sprite = null

    /**
       * 指针图片配置 为空表示三种级别转盘共用一个外框
       */
    private arrowSpriteCfg = ["img_bycj", "img_hjcj", "img_zscj"]

    /**
     * 奖品图片配置
     */
    private awardSpriteCfg = ["hd_13", "heijin", "jd200", "jd1000", "jintiao", "jd5888", "xs"]

    /**
     * 金币奖品配置
     */
    private awardCoinCfg = ["caijin-01", "caijin-02", "caijin-03", "caijin-04", "caijin-05", "caijin-06", "caijin-07"]


    /**
   * 页签按钮集合
   */
    private buttonArr = [];

    /**
    * 底座
    */
    private img_bydzCfg = ["img_bydz", "img_hjdz", "img_zsdz"]
    private img_bydzSprite: cc.Sprite = null;
    /**
     * 箭头
     */
    private img_byzjCfg = ["img_byzj", "img_hjkzj", "img_zskzj"]
    private img_byzjSprite: cc.Sprite = null;
    /**
     * 黄金箭头
     */
    private img_zsjbNode: cc.Node = null;

    /**
     * 转盘上的动画合集
     */
    private turnTableSpinArr = [];
    /**
     * 各转盘转动一次需要多少积分节点集合
     */
    private turnTableLabelArr = []

    isChoujiang: boolean = false;//是否正在抽奖

    num: number = 8;//转盘中分区数量


    rotateTime: number = 10;//转盘动画旋转次数


    time: number = 5;//抽奖动画持续时间
    private StartChoujiang(num, call) {
        this.isChoujiang = true;
        //随机确定奖品分区
        let index = num;
        //过场动作
        let targetAngle = this.rotateTime * 360 + (-index * (360 / this.num));
        this.turnNode.rotation %= 360
        //过场动作+缓入缓出
        let action = cc.rotateTo(this.time, -targetAngle).easing(cc.easeCubicActionInOut());
        //添加动作结束回调，显示中奖信息
        this.turnNode.runAction(cc.sequence(action, cc.callFunc(() => {
            this.isChoujiang = false;
            if (call) { call() }
        })));
    }
    protected initView() {
        this.clickTime = 0;
        this.result = -1;

        this.model = Global.ModelManager.getModel("ZhuanpanModel");
        this.model.on(ZhuanpanModel.StartDrawLucky, this, this.startDrawLucky)
        this.model.on(ZhuanpanModel.RefreshPanelUI, this, this.refreshPanel)
        this.backgroundSprite = this.getComponent("bgNode/panelBg", cc.Sprite)
        // this.backgroundSprite1 = this.getComponent("bgNode/panelBg1", cc.Sprite)
        this.spritePanel = this.getComponent("TurnNode/panelNode/spritepanel", cc.Sprite)
        // this.spritePanel1 = this.getComponent("TurnNode/panelNode/spritepanel1", cc.Sprite)
        this.arrowSprite = this.getComponent("arrowNode/drawBtn/sprite_label", cc.Sprite)
        this.turnNode = this.getChild("TurnNode")
        this.shineNode = this.getComponent("arrowNode/spine_choose", sp.Skeleton);
        this.img_bydzSprite = this.getComponent("img_bydz", cc.Sprite)
        this.img_byzjSprite = this.getComponent("bgNode/panelBg/img_byzj", cc.Sprite)
        this.img_zsjbNode = this.getChild("bgNode/panelBg/img_zsjb")
        //蓝色皮肤没有此节点动效
        this.spineStart = this.getComponent("arrowNode/spine_qianghongbaoanniu", sp.Skeleton);
        this.addCommonClick("arrowNode/drawBtn", this.onDrawBtnClicked, this)
        for (var i = 0; i < 8; i++) {
            this.awardLabelArr[i] = this.getComponent(cc.js.formatStr("TurnNode/reward/reward_%s/label", (i + 1)), cc.Label)
            this.awardSpriteArr[i] = this.getComponent(cc.js.formatStr("TurnNode/reward/reward_%s/sprite_icon", (i + 1)), cc.Sprite)
        }

        for (var i = 0; i < 3; i++) {
            this.turnTableSpinArr[i] = this.getChild("bgNode/zhuanpan_" + i);

            this.addCommonClick(cc.js.formatStr("TurnBtnGroup/%s", this.panelNameArr[i]), this.onTurnTypeBtnClick, this)
            var yeqianArr = [];
            this.buttonArr[i] = yeqianArr;
            var darkNode: cc.Node = this.getChild(cc.js.formatStr("TurnBtnGroup/%s/button_dark", this.panelNameArr[i]))
            yeqianArr[0] = darkNode;
            var lightNode: cc.Node = this.getChild(cc.js.formatStr("TurnBtnGroup/%s/button_light", this.panelNameArr[i]))
            yeqianArr[1] = lightNode;

            let laNode = this.getChild(cc.js.formatStr("TurnBtnGroup/%s/button_dark/layout/la", this.panelNameArr[i]))
            let laNode11 = this.getChild(cc.js.formatStr("TurnBtnGroup/%s/button_light/layout/la", this.panelNameArr[i]))

            this.turnTableLabelArr[i] = laNode;
            this.turnTableLabelArr[i + 3] = laNode11;
        }

        this.turnNode.rotation = 0;

        if (this.shineNode) {
            this.shineNode.node.active = false;
        }


    }
    onDrawBtnClicked() {
        if (this.result >= 0) {
            return;
        }
        if (this.clickTime > 0) {
            return;
        }
        if (this.spineStart) {
            this.spineStart.setAnimation(0, "idle2", false);
        }
        var haveJifen = 0;
        var needJifen = 1;
        var data = this.model.data;
        if (data) {
            haveJifen = data["coin"];

            var yeqianObj = data[this.curPanel];
            needJifen = yeqianObj["coin"];
        }
        if (haveJifen < needJifen) {
            Global.UI.fastTip("积分不足");
            return;
        }
        this.clickTime = 1;
        this.model.reqChoujiang(this.curPanelIndex + 1)
    }

    onTurnTypeBtnClick(target) {

        if (this.result >= 0) {
            //正在转动
            return;
        }
        if (this.shineNode) {
            this.shineNode.node.active = false;
        }
        if (this.curPanel != target.node.name) {
            this.curPanel = target.node.name;
            this.curPanelIndex = this.panelNameArr.indexOf(this.curPanel);
            this.refreshPanel();
        }
    }
    startDrawLucky(resultIndex: number) {
        this.turnNode.rotation = this.turnNode.rotation % 360;
        this.currSpeed = 0;
        this.speedState = 1;
        if (this.shineNode) {
            this.shineNode.node.active = false;
        }
        this.result = resultIndex;
        this.starTurn()
    }

    starTurn() {
        // let self = this
        // Global.Component.schedule(self.runTurnTable.bind(self),0)
        // this.timer = setInterval(this.runTurnTable.bind(this), this.frameTime)
        this.StartChoujiang(this.result, () => {
            this.turnEnd();
        })
    }


    runTurnTable() {
        let dt = this.frameTime / 1000
        if (this.clickTime > 0) {
            this.clickTime -= dt;
        }
        if (this.result >= 0) {
            var endRotation = 360 * 5 - this.result * 45;
            var speedJiasu = this.speedAdd;
            if (this.turnNode.rotation >= endRotation - 270) {
                //减速
                this.speedState = -1;
                speedJiasu = this.speedReduce;
            }
            this.currSpeed += dt * speedJiasu * this.speedState;
            if (this.speedState > 0 && this.currSpeed > this.speedMax) {
                this.currSpeed = this.speedMax;
            } else if (this.speedState < 0 && this.currSpeed < this.speedMin) {
                this.currSpeed = this.speedMin;
            }
            this.turnNode.rotation += this.currSpeed * dt;

            if (this.turnNode.rotation >= endRotation) {
                this.turnNode.rotation = endRotation;
                //结束
                this.turnEnd();
            }
        }
    }

    private refreshPanel() {
        let data = this.model.data
        if (!data) {
            //this.model.reqActivityCfg()
            return
        }
        this.updateAward(data)
        this.updateAwardPanel()
        this.updateBtn()
    }

    updateAward(data: any) {
        if (!data) {
            return;
        }
        let coinIndex = 0
        var yeqianObj = data[this.curPanel];
        for (var i = 0; i < this.awardLabelArr.length; i++) {
            var label: cc.Label = this.awardLabelArr[i];
            var sprite: cc.Sprite = this.awardSpriteArr[i];

            var awardObj = yeqianObj["award"][i];
            if (awardObj) {
                var name = awardObj.name;
                var type = awardObj.type;
                if (type > 1) {
                    label.string = "";
                    sprite.node.y = 250;
                    sprite.node.scale = 1.5
                    Global.ResourceManager.loadAutoAtlas(sprite, this.atlasPath, this.awardSpriteCfg[type])
                }
                else {
                    label.string = "" + name;
                    if (type == 1) {
                        sprite.node.y = 186;
                        sprite.node.scale = 2;
                        Global.ResourceManager.loadAutoAtlas(sprite, this.atlasPath, this.awardCoinCfg[coinIndex])
                        coinIndex += 1
                    }
                }
            }
            else {
                sprite.node.y = 186;
                sprite.node.scale = 2;
                label.string = "";
                sprite.spriteFrame = null;
            }
        }
    }
    /**
       * 更新抽奖盘子
       */
    updateAwardPanel() {
        let spriteBgName = this.backgroundSpriteCfg ? this.backgroundSpriteCfg[this.curPanelIndex] : ""
        if (spriteBgName) {
            Global.ResourceManager.loadAutoAtlas(this.backgroundSprite, this.turnTablePathCrow, spriteBgName)

            // Global.ResourceManager.loadAutoAtlas(this.backgroundSprite1,this.turnTablePath,spriteBgName) 
        }

        let panelName = this.spritePanelCfg ? this.spritePanelCfg[this.curPanelIndex] : ""

        if (panelName) {
            Global.ResourceManager.loadAutoAtlas(this.spritePanel, this.turnTablePathCrow, panelName)

            // Global.ResourceManager.loadAutoAtlas(this.spritePanel1,this.turnTablePath,panelName) 
        }

        let arrName = this.arrowSpriteCfg ? this.arrowSpriteCfg[this.curPanelIndex] : ""

        if (arrName) {
            Global.ResourceManager.loadAutoAtlas(this.arrowSprite, this.turnTablePathCrow, arrName)
        }
        let img_bydzName = this.img_bydzCfg ? this.img_bydzCfg[this.curPanelIndex] : ""

        if (img_bydzName) {
            Global.ResourceManager.loadAutoAtlas(this.img_bydzSprite, this.turnTablePathCrow, img_bydzName)
        }
        let img_byzjName = this.img_byzjCfg ? this.img_byzjCfg[this.curPanelIndex] : ""

        if (img_byzjName) {
            Global.ResourceManager.loadAutoAtlas(this.img_byzjSprite, this.turnTablePathCrow, img_byzjName)
        }


    }


    updateBtn() {
        for (var i = 0; i < this.buttonArr.length; i++) {
            var arr = this.buttonArr[i];
            if (this.curPanelIndex == i) {
                arr[0].active = false;
                arr[1].active = true;
            } else {
                arr[0].active = true;
                arr[1].active = false;
            }
        }
        if (this.curPanelIndex == 2) {
            this.img_zsjbNode.active = true;
        } else {
            this.img_zsjbNode.active = false;
        }
        this.turnTableSpinArr.forEach(element => {
            element.active = false;
        });
        this.turnTableSpinArr[this.curPanelIndex].active = true
        let data = this.model.data;
        this.turnTableLabelArr.forEach((e, index) => {
            if (index < 3) {
                e.getComponent(cc.Label).string = data[this.panelNameArr[index]].coin
                this.turnTableLabelArr[index + 3].getComponent(cc.Label).string = data[this.panelNameArr[index]].coin
            }
        })
    }

    /**
     * 转动结束
     */
    turnEnd() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.currSpeed = 0
        // let self = this
        // Global.Component.unschedule(self.runTurnTable.bind(self)) 
        if (this.shineNode) {
            this.shineNode.node.active = true;
        }
        this.spineStart.setAnimation(0, "idle", true);
        this.result = -1;
        this.clickTime = 0;
        this.refreshPanel();
        Global.UI.show("WndRebateGet", this.model.awardResult)
    }




    protected onSubViewShow() {
        this.turnNode.rotation = 0;
        this.clickTime = 0;
        this.currSpeed = 0;
        this.result = -1;
        if (this.shineNode) {
            this.shineNode.node.active = false;
        }
        this.refreshPanel()
    }

    protected onSubViewHide() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    onDispose() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.model.off(ZhuanpanModel.StartDrawLucky, this, this.startDrawLucky)
        this.model.off(ZhuanpanModel.RefreshPanelUI, this, this.refreshPanel)

    }

}