import ViewBase from "../../../core/ui/ViewBase";
import ServicerModel, { CustomerEntranceType, PopItemType } from "../../../hallcommon/model/ServicerModel";

export default class SpreadServices extends ViewBase{

    private servicerNode = [];
    private ServicerModel:ServicerModel;

    protected initView(){
        this.ServicerModel = <ServicerModel>Global.ModelManager.getModel("ServicerModel")
        let leftNode = this.getChild("left");
        Global.UIHelper.addCommonClick(leftNode, "btn_ljlx", this.openServicerApp, this);
        leftNode.active = false;
        let rightNode = this.getChild("right");
        Global.UIHelper.addCommonClick(rightNode, "btn_ljlx", this.openServicerApp, this);
        rightNode.active = false;
        this.servicerNode.push(leftNode)
        this.servicerNode.push(rightNode)
        
    }

    private servicerType ={
        1:"icon_kfwx",          //微信
        2:"icon_kfqq",          //QQ
        3:"icon_kfwx",          //默认
        4:"icon_kfat",          //艾特
        5:"icon_zxkf" ,          //在线客服
        6:"icon_zxkf"           //在线客服
    }
    private servicerName ={
        1:"客服微信",           //微信
        2:"客服QQ",             //QQ
        3:"公众号",             //公众号
        4:"客服艾特",           //艾特
        5:"在线客服" ,           //默认
        6:"在线客服"
    }

    onSubViewShow(){
        let serviceData = this.ServicerModel.getServiceInfo(CustomerEntranceType.SpreadService)
        this.updateUI(serviceData);
    }

    onSubViewHide(){
        
    }

    onDispose(){
        this.servicerNode = [];
    }

    private updateUI(data){
        if(!data || data.length ==0) return
        let severArr = data.arr;
        //暂时显示
        // this.servicerNode[0].active = true;
        // this.servicerNode[1].active = true;
        for (let index = 0; index < severArr.length; index++) {
            let servicerItem = this.servicerNode[index]
            let data = severArr[index]
            if(data.type != 0){
                servicerItem.active = true;
                let labe1 = cc.find("label1", servicerItem).getComponent(cc.Label);
                let labe2 = cc.find("label2", servicerItem).getComponent(cc.Label);
                let icon = cc.find("icon_kfqq", servicerItem).getComponent(cc.Sprite);
                let btnNode = cc.find("btn_ljlx", servicerItem);
                btnNode.data = data;
                labe1.string = this.servicerName[data.type]
                labe2.string =  Global.Toolkit.substrEndWithElli(data.data,10)
                Global.ResourceManager.loadAutoAtlas(icon, "hall/texture/Proxy/Proxy", this.servicerType[data.type])
            }
        }
    }

    private openServicerApp(target) {
        if (target && target.node && target.node.data) {
            Global.NativeEvent.copyTextToClipboard(target.node.data.data, (retStr) => {
                if (retStr.result == 0) {
                    if (target.node.data.type == PopItemType.QQ) {
                        Global.UI.fastTip("复制成功");
                        Global.NativeEvent.awakeQQApp(this.awakeQQCallBack.bind(this));
                    } else if (target.node.data.type == PopItemType.WX || target.node.data.type == PopItemType.WXPUBLIC) {
                        Global.UI.fastTip("复制成功");
                        Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
                    } else if (target.node.data.type == PopItemType.AtWnd) {
                        Global.ChatServer.serverType = CustomerEntranceType.HallService;
                        Global.ChatServer.userSetting(null,target.node.data.data);
                    } else if (target.node.data.type == PopItemType.Link) {
                        cc.sys.openURL(Global.Toolkit.DealWithUrl(target.node.data.data));
                    } 
                    else if (target.node.data.type == PopItemType.AtLink) {
                        cc.sys.openURL(Global.Toolkit.DealWithUrl(target.node.data.data));
                    } else {
                        Global.UI.fastTip("复制失败");
                    }
                }
            });
        }
    }

    
    awakeQQCallBack( retStr ){
        if (retStr.result == 0) {
        } 
        else {
            let ret = retStr.result
            if (ret == -1) {
                Logger.log("请先安装QQ");
                Global.UI.showSingleBox("请先安装QQ", null);
            } else {
                Logger.log("打开QQ失败");
                Global.UI.showSingleBox("打开QQ失败", null);
            }
        }
    }

    awakeWeChatCallBack( retStr ){
        if (retStr.result == 0) {
        } else {
            let ret = retStr.result
            if (ret == -1) {
                Logger.log("请先安装微信");
                Global.UI.showSingleBox("请先安装微信", null);
            } else {
                Logger.log("打开微信失败");
                Global.UI.showSingleBox("打开微信失败", null);
            }
        }
    }
}