import ViewBase from "../../../core/ui/ViewBase";
import AppHelper from "../../../core/tool/AppHelper";
import CaptureTool from "../Spread/CaptureTool";
import { CustomerEntranceType } from "../../../hallcommon/model/ServicerModel";

export default class ScanCodeView extends ViewBase{
    private qrNode:cc.Sprite
    private timerLabel:cc.RichText
    private moneyLabel:cc.Label
    private CaptureTool:CaptureTool
    private timeID = null;
    private intervalTime = 180
    private checkInerval = 1000

    public amount = ""

    public data = null

    private formastr = "<color=#CCE198>付款倒计时</c><color=#FFF100>%s</color><color=#CCE198>秒</c>"

    protected initView()
    {
        this.qrNode = this.getComponent("sewm_t/qrnode",cc.Sprite)
        this.timerLabel = this.getComponent("sewm_t/countDown",cc.RichText)
        this.timerLabel.string = ""
        this.moneyLabel = this.getComponent("sewm_t/money",cc.Label)
        this.moneyLabel.string = ""
        this.CaptureTool = this.getComponent("sewm_t",CaptureTool)
        this.addCommonClick("buttonGroup/saveToAlbum",this.onSavePicBtnClicked,this)
        this.addCommonClick("buttonGroup/openAli",this.onOpenAliBtnClicked,this)
        this.addCommonClick("buttonGroup/uploadBtn",this.onUploadBtnClicked,this)


    }

    initQrcode(url:string)
    {
        let self = this
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"initQrcode")
        cc.loader.load(url, function (err, texture:cc.Texture2D) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"initQrcode")
            if(err)
            {
                Global.UI.fastTip("拉取付款码失败")
                return
            }
            if(cc.isValid(self.qrNode.node))
            {
                var frame = new cc.SpriteFrame(texture);
                self.qrNode.spriteFrame = frame
                self.startTimer()
            }
        })
    }
    onSavePicBtnClicked() {
            let orderId = this.data.order_no
            let filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(orderId) + '_capImage.png';
            let callback = () => {
                Global.NativeEvent.saveToAlbum(filePath, () => {
                    //Global.UI.fastTip("保存相册成功")
                    Logger.log("保存相册成功")
                })
            }
            if(this.CaptureTool)
            {
                this.CaptureTool.BeginCapture(orderId, callback,false)
            }
    }

    onOpenAliBtnClicked() {
         if (AppHelper.enableAliPaySDK) {
            // 类型为支付宝支付时调用原生支付包支付
            Global.NativeEvent.checkAliPayInstalled((retObj) => {
                if (retObj.result == 0) {
                    Logger.error("AliPayInstalled true")
                   Global.NativeEvent.awakeALiPayApp();
                } 
                else if(retObj.result == -1){
                    Global.UI.showSingleBox("请先安装支付宝", null);
                }
            })
        }
        
    }
    onUploadBtnClicked() {
        let model =  Global.ModelManager.getModel("ServicerModel")
        if(model)
        {
            model.enterCustomerService(CustomerEntranceType.HallService);
        }
    }

    protected onSubViewShow()
    {
        this.reset()
        if(!this.data)
        {
            return
        }
        try {
            let content = JSON.parse(this.data.url)
            this.initQrcode(content.url)
            let money = content.amount / 100
            this.moneyLabel.string = money.toString()

        } catch (error) {
            Global.UI.fastTip("解析订单失败，请重试！")
        }
       
    }
    reset()
    {
        this.moneyLabel.string = ""
        this.intervalTime = 180
        this.qrNode.spriteFrame = null
        if(this.timeID)
        {
            clearInterval(this.timeID)
        }
    }

    startTimer()
    {
        if(this.timeID)
        {
            clearInterval(this.timeID)
        }
        this.timerLabel.string = cc.js.formatStr(this.formastr,this.intervalTime)
        this.timeID = setInterval(()=>{
            this.intervalTime -= 1
            this.timerLabel.string = cc.js.formatStr(this.formastr,this.intervalTime)
            if(this.intervalTime == 0)
            {
                this.node.active = false
            }
        },this.checkInerval)
    }
    protected onSubViewHide()
    {
        this.data = null
        this.amount = ""
        this.node.active = false
        if(this.timeID)
        {
            clearInterval(this.timeID)
        }
    }
    protected onDispose()
    {
        this.amount = ""
        this.data = null
        if(this.timeID)
        {
            clearInterval(this.timeID)
        }
    }
}
