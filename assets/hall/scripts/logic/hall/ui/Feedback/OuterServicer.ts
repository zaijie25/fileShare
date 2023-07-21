import AbsServicer from "./AbsServicer";



/**
   跳转外部打开的客服。如：在线客服，QQ，微信，在线客服等
 */
export default abstract class OuterServicer extends AbsServicer {

    public acceptService(index:number){
        this.jumpOrOpen(this.serviceDatas[index]);
    }
    //跳转或打开
    abstract jumpOrOpen(data);

}

export class QqServicer extends OuterServicer {


    jumpOrOpen(data: any) {
        Global.NativeEvent.copyTextToClipboard(data.info, (retStr)=>{
            if (retStr.result == 0) {
                Global.UI.fastTip("复制成功");
                Global.NativeEvent.awakeQQApp(this.awakeQQCallBack.bind(this));
            }else {
                Global.UI.fastTip("复制失败");
            }
        } );
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

   
}

export class WxServicer extends OuterServicer {

    jumpOrOpen(data: any) {
        Global.NativeEvent.copyTextToClipboard(data.info, (retStr)=>{
            if (retStr.result == 0) {
                Global.UI.fastTip("复制成功");
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            }else {
                Global.UI.fastTip("复制失败");
            }
        } );
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

export class OnlineServicer extends OuterServicer {


    jumpOrOpen(data: any) {
        cc.sys.openURL(Global.Toolkit.DealWithUrl(data.info));
    }


   
}