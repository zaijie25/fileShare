import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import { italk } from "../../../core/net/tcp/italkmsg_pb";
import { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import { CustomerEntranceType } from "../../../hallcommon/model/ServicerModel";
import ChatCenterNode from "./ChatCenterNode";

export default class WndVipQuickPayChat extends WndBase {

    public centerNode: ChatCenterNode;
    private endEditNode: cc.Node;//点击收起键盘的Node
    private botNode: cc.Node;
    private depositNode: cc.Node;
    private inputBox: cc.EditBox;
    private title: cc.Label;
    private plus: cc.Node;
    private sendBtn: cc.Node;
    private emojPanel: cc.Node;
    private photoPanel: cc.Node;
    private emojScrollView: cc.ScrollView;
    private emojTemplateItem: cc.Node;
    private depositScrollView: cc.ScrollView;//充值列表
    private depositItem: cc.Node;
    private spriteString= {
        1000:"用支付宝充值",
        1001:"用微信充值",
        1002:"用银行卡充值",
        10000:"我充好了"
    };
    private isPressed: boolean = false;
    private isPhoto: boolean = false;
    private emojText:string = "<img src='%s' />";
    public severHeadFrame:cc.SpriteFrame = null;
    public data = new Array();
    public depositBottom = 165;
    public depositH = 60; //间距
    public depositData = new Array();
    public isOpen = false;
    public copyBtn:cc.Node
    private copyText = ""
    emojMap={
        0:"大笑",1:"开心",2:"泪哭",3:"尴尬",4:"快乐",5:"媚眼",6:"微笑",7:"馋嘴",8:"墨镜",9:"色",10:"飞吻",
        11:"爱情",12:"嘟嘴",13:"吹口哨",14:"可爱",15:"幸福",16:"拍手",17:"崇拜",18:"思考",19:"挑眉",20:"平淡",21:"无奈",
        22:"失望",23:"白眼",24:"坏笑",25:"衰",26:"压力",27:"吃惊",28:"闭嘴",29:"惊讶",30:"困",31:"厌烦",32:"睡觉",
        33:"如释重负",34:"鬼脸",35:"舌头",36:"调皮",37:"流口水",38:"不屑",39:"悲伤",40:"困惑",41:"财迷",42:"兴奋",43:"不满",
        44:"委屈",45:"纠结",46:"伤心",47:"担忧",48:"愤怒",49:"哭",50:"流泪",51:"呆",52:"害怕",53:"震惊",54:"悲伤疲倦",
        55:"抓狂",56:"尴尬地笑",57:"冷汗",58:"惊吓",59:"不明",60:"滑稽",61:"中毒",62:"发怒",63:"不爽",64:"语无伦次",65:"口罩",
        66:"感冒",67:"受伤",68:"恶心",69:"吐",70:"打喷嚏",71:"天使",72:"牛仔",73:"匹诺曹",74:"嘘",75:"捂嘴",76:"观察",
        77:"发呆",78:"魔王",79:"恶魔生气",80:"小丑",81:"怪物",82:"妖怪",83:"死亡",84:"海盗",85:"外星人",86:"蒙住眼睛",87:"堵上耳朵",
        88:"捂住嘴巴",89:"青苹果",90:"茄子",91:"牛油果",92:"香蕉",93:"樱桃",94:"葡萄",95:"胡萝卜",96:"黄瓜",97:"玉米",98:"辣椒",
        99:"猕猴桃",100:"柠檬",101:"哈密瓜",102:"梨",103:"苹果",104:"草莓",105:"橙子",106:"西瓜",107:"椰子",108:"番茄",109:"桃子",
        110:"花生",111:"地瓜",112:"土豆",113:"蛋",114:"肉",115:"玫瑰",116:"向日葵",117:"奶瓶",118:"法式面包",119:"甜甜圈",120:"蛋糕",
        121:"面包",122:"巧克力",123:"奶酪",124:"饺子",125:"米饭",126:"煎蛋",127:"牛角包",128:"香槟",129:"咖啡",130:"饮料",131:"薯条",
        132:"汉堡",133:"热狗",134:"爆米花",135:"披萨",136:"鸡腿",137:"炸虾",138:"三明治",139:"便当",140:"果冻",141:"团子",142:"寿司",
        143:"清酒",144:"饭团",145:"肉夹馍",146:"卷饼",147:"烙饼",148:"米饼",149:"椒盐卷饼",150:"幸运饼干",151:"曲奇",152:"蜜罐",153:"排骨",
        154:"糖果",155:"棒棒糖",
    }

    protected onInit() {
        this.name = "WndVipQuickPayChat";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/VipQuickPayChatUI";
        this.destoryType = DestoryType.None;
    }
    
    protected initView() {
        if(cc.Canvas.instance.node.width < cc.Canvas.instance.node.height)
        {
            this.node.width = cc.Canvas.instance.node.width;
            this.node.height = cc.Canvas.instance.node.height;
        }else{
            this.node.width = cc.Canvas.instance.node.height;
            this.node.height = cc.Canvas.instance.node.width;
        }
        this.title = this.getChild("content/topNode/title_label").getComponent(cc.Label);
        this.centerNode = this.getChild("content/centerNode").getComponent(ChatCenterNode);
        this.endEditNode = this.getChild("content/centerNode/endEditNode");
        this.addCommonClick("content/centerNode/endEditNode", this.endEditing, this);
        this.botNode = this.getChild("content/botNode");
        this.copyBtn = this.getChild("copy");
        this.depositNode = this.getChild("content/botNode/depositNode");
        this.depositNode.active = false;
        this.inputBox = this.getChild("content/botNode/botBox/contentNode/inputEditBox").getComponent(cc.EditBox);

        this.inputBox.node.on('editing-return', this.editingReturn, this); //点击return时触发事件
        this.inputBox.node.on('text-changed', this.textChangeCallback, this);
        this.inputBox.node.on('editing-did-began', this.editingBeganCallback, this);
        this.emojPanel = this.getChild("content/botNode/emojPanel");
        this.photoPanel = this.getChild("content/botNode/photoPanel");
        

        this.emojScrollView = this.getChild("content/botNode/emojPanel/ScrollView").getComponent(cc.ScrollView);
        this.emojTemplateItem = this.getChild("content/botNode/emojPanel/emojTemplateItem");
        this.emojTemplateItem.active = false;

        this.depositScrollView = this.getChild("content/botNode/depositNode/scrollView").getComponent(cc.ScrollView);
        this.depositItem = this.getChild("content/botNode/depositNode/scrollView/view/content/item");
        this.depositItem.active = false;
        

        this.plus = this.addCommonClick("content/botNode/botBox/key_btnPlus/kuozhan", this.kuoZhan, this);
        this.addCommonClick("content/botNode/botBox/key_btnEmoj", this.openEmojPanel, this);
        this.addCommonClick("content/topNode/btnBack", this.goBack, this);

        this.addCommonClick("content/botNode/photoPanel/album", this.openAlbum, this);
        this.addCommonClick("content/botNode/photoPanel/camera", this.openCamera, this);
        this.sendBtn = this.addCommonClick("content/botNode/botBox/key_btnPlus/send_btn", this.sendMessage, this);
        this.copyBtn = this.addCommonClick("copy", this.copyMsgText, this);
        this.copyBtn.active = false;
        this.initEmoj();
    }
    initEmoj(){
        for(let key in this.emojMap){
            let node = cc.instantiate(this.emojTemplateItem).getComponent(cc.Sprite);
            node.node.active = true;
            let name = this.emojMap[key];
            node.spriteFrame = this.getLocalEmoj(name);
            node.node.attr({key,name});
            node.node.on(cc.Node.EventType.TOUCH_END,this.clickEmoj,this);
            this.emojScrollView.content.addChild(node.node);
        }
    }
    private initDepositList(data){
        this.depositScrollView.content.removeAllChildren();
        var w = 0;
        let centerLayout = this.centerNode.getComponent(cc.Widget);
        centerLayout.bottom = this.depositBottom;
        if(data.length > 1){
            this.depositNode.active = true;
        }
        for(var i = 0; i < data.length; i++){
            if(this.spriteString[data[i]]){
                let node = cc.instantiate(this.depositItem);
                let bgFrame = cc.find("bg",node).getComponent(cc.Sprite);
                Global.ResourceManager.loadAutoAtlas(bgFrame,"hall/texture/hall/chat/chat", data[i]+"_s", null, false);
                let photo =  Global.UIHelper.addCommonClick(node, "bg", this.depositSend, this, cc.Button.Transition.NONE);
                    photo.string = data[i];
                node.width = bgFrame.node.width;
                w += node.width - 5;
                node.active = true;
                this.depositScrollView.content.addChild(node);
            }
        }
        this.depositScrollView.content.setContentSize(w, 0);
    }
    depositSend(target){ //自动回复
        if(target && target.node && this.spriteString[target.node.string]){
            Global.ChatServer.sendChatTextMsg(this.spriteString[target.node.string],target.node.string+"");
        }
    }
    clickEmoj(event){
        let node = event.target;
        this.inputBox.string = this.inputBox.string.concat("&["+node.name+"]&");
        this.textChangeCallback();
    }

    onOpen() {
        //切换成竖屏
        this.isOpen = true;
        if(!Global.ChatServer.severUserid || Global.ChatServer.severUserid.length == 0)
        {
            Global.UI.fastTip("当前没有客服在线，请留言");
        }
        let frameSize = cc.view.getFrameSize()
        this.node.height = frameSize.height *(this.node.width/frameSize.width);
        if(this.args!=null&&this.args.length>0){
            this.title.string = this.args[0]||"default";
        }
        Global.ChatServer.sendOfflineMsg();
        if(Global.ChatServer.QuickData && Global.ChatServer.QuickData.pay_type && Global.ChatServer.QuickData.pay_type.length > 0){//手动添加我充好了按钮
            this.depositData = Global.ChatServer.QuickData.pay_type.concat([10000]);
            // console.log("添加后",this.depositData);
            this.initDepositList(this.depositData);
        }
        Global.Event.on(GlobalEvent.setCopypostion,this,this.setCopypostion)
    }
    //结束编辑
    private endEditing(){
        this.endEditNode.active = false;
        this.isPhoto = false;
        this.isPressed = false;
        this.hideToolBar();
    }
    //输入框开始编辑
    private editingBeganCallback(){
        this.endEditNode.active = false;
        this.isPhoto = false;
        this.isPressed = false;
        this.hideToolBar();
    }
    public editingReturn(){
        this.sendMessage();
    }

    private textChangeCallback() {
        //当前输入字符大于0 并且不全部为空格或换行
        if (this.inputBox.string.length > 0 && !(this.isNull(this.inputBox.string))) {
            this.plus.active = false;
            this.sendBtn.active = true;
        } else {
            this.plus.active = true;
            this.sendBtn.active = false;
        }
    }
    private openAlbum() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.Component.scheduleOnce(() => {
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "videcompress", 120, "上传中");
            }, 0.5);
        } else {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "videcompress", 120, "上传中");
        }
        Global.NativeEvent.nstartOpenAlbum(2, 51200, 120, 200, 20, (path) => {
            Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING, "videcompress")
            if (path.result == 0) {
                if (!Global.ChatServer.socketStatus()) {
                    Global.UI.fastTip("聊天系统暂无连接,请稍后再试");
                    Global.ChatServer.connect();
                    return;
                }
                let param = path.funcParam;
                if (param.type == 2) {//视频  
                    let msgcontent = new italk.pb.ItalkMsgContent(); //消息内容 
                    msgcontent.size = param.size;
                    msgcontent.second = param.second;//视频时长
                    msgcontent.width = param.width;
                    msgcontent.height = param.height;
                    msgcontent.url = Global.Setting.alioss_file_url + param.url;
                    msgcontent.thumburl = Global.Setting.alioss_file_url + param.url;
                    Global.ChatServer.sendChatMoveMsg(msgcontent);
                } else {

                    this.sendChatImage(path.funcParam);
                }

            } else {
                Logger.error("取消选择图片---");
            }
        })
    }
    private openCamera() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.Component.scheduleOnce(() => {
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "videcompress", 60, "上传中");
            }, 0.5);
        } else {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "videcompress", 60, "上传中");
        }
        Global.NativeEvent.nstartOpenCamera(2, 200, 20, (path) => {
            Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING, "videcompress")
            if (!Global.ChatServer.socketStatus()) {
                Global.UI.fastTip("聊天系统暂无连接,请稍后再试");
                Global.ChatServer.connect();
                return;
            }
            if (path.result == 0) {
                this.sendChatImage(path.funcParam);
            }
        })
    }
    //上传选择的视频或者图片
    sendChatImage(funcParam){
        Logger.error("取消选择 -- 上传中loading");
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "uploadfile",15,"上传中");
        let dateArr =  funcParam.filePath.split(".");
        let fileName =  dateArr[dateArr.length-1];
        var imageData = null;
        //新版本因为视频原因 直接从底层传文件的base64String 到上层
        imageData = funcParam.fileData 
        // 上传原文件
        let param = {
            name:Global.ChatServer.uuid()+"."+fileName,
            value:imageData,
            token:Global.ChatServer.token,
        }
        let func = "SetOssFile" //上传图片
        if(fileName == "mp4"){
            func = "SetOssVideoFile"
        }
        Global.ChatServer.sendImageWithParam("/login/ossfile",func,param,(bigRes)=>{
            // 上传缩略图
            this.getThumbuImageData(funcParam,bigRes,fileName)
        },(error)=>{
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"uploadfile");
            Global.UI.fastTip(error._errstr);
        })
    }
    //获取压缩后的图片资源
    getThumbuImageData(funcParam,bigRes,fileName){
        let baseData = funcParam.thumImage;
        let param = {
            name:Global.ChatServer.uuid()+".jpg",
            value:baseData,
            token:Global.ChatServer.token,
        }
        Global.ChatServer.sendImageWithParam("/login/ossfile","SetOssFile",param,(res)=>{
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"uploadfile")
            let msgcontent = new italk.pb.ItalkMsgContent(); //消息内容
            msgcontent.size = funcParam.size;
            if(funcParam.second){
                msgcontent.second = funcParam.second;//视频时长
            }
            msgcontent.width = funcParam.width;
            msgcontent.height = funcParam.height;
            msgcontent.url = bigRes.url;
            msgcontent.thumburl = res.url;
            if(fileName == "mp4")
            {       //选择的mp4文件
                Global.ChatServer.sendChatMoveMsg(msgcontent);
            }else{  //选择的图片
                Global.ChatServer.sendChatImageMsg(msgcontent);
            }
        },(error)=>{
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"uploadfile")
            Global.UI.fastTip(error._errstr);
        })
    }
    transformArrayBufferToBase64 (buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        for (var len = bytes.byteLength, i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
        //TODO
    private kuoZhan() {
        this.endEditNode.active = true;
        this.photoPanel.active = true;
        this.emojPanel.active = false;
        this.isPhoto = !this.isPhoto;
        this.isPressed = false;
        if (this.isPhoto) {
            // this.botNode.stopAllActions();
            // this.botNode.runAction(cc.moveTo(0.2, 0, -340).easing(cc.easeBackOut()));
            let botNodeLayout = this.botNode.getComponent(cc.Widget);
            botNodeLayout.bottom = -140;
            let centerNodeLayout = this.centerNode.getComponent(cc.Widget);
            centerNodeLayout.bottom = 470+botNodeLayout.bottom + (this.depositNode.active ? this.depositH:0);;
            this.botNode.getComponent(cc.Widget).updateAlignment();
            this.centerNode.getComponent(cc.Widget).updateAlignment();
            this.updateUI(this.title.string);
            // this.centerNode.node.stopAllActions();
            // this.centerNode.node.runAction(cc.moveTo(0.2, 0, 200).easing(cc.easeBackOut()));
        } else {
            this.hideToolBar();
        }
        
    }
    private openEmojPanel() {
        this.endEditNode.active = true;
        this.photoPanel.active = false;
        this.emojPanel.active = true;
        this.isPressed = !this.isPressed;
        this.isPhoto = false;
        if (this.isPressed) {
            // this.botNode.stopAllActions();
            // this.botNode.runAction(cc.moveTo(0.2, 0, -175).easing(cc.easeBackOut()));
            let botNodeLayout = this.botNode.getComponent(cc.Widget);
            botNodeLayout.bottom = 0;
            let centerNodeLayout = this.centerNode.getComponent(cc.Widget);
            centerNodeLayout.bottom = 470+botNodeLayout.bottom + (this.depositNode.active ? this.depositH:0);
            this.botNode.getComponent(cc.Widget).updateAlignment();
            this.centerNode.getComponent(cc.Widget).updateAlignment();
            this.updateUI(this.title.string);
            // this.centerNode.node.stopAllActions();
            // this.centerNode.node.runAction(cc.moveTo(0.2, 0, 365).easing(cc.easeBackOut()));
        } else {
            this.hideToolBar();
        }
    }
    private hideToolBar(){
        // this.botNode.stopAllActions();
        let botNodeLayout = this.botNode.getComponent(cc.Widget);
        botNodeLayout.bottom = -365;
        // this.botNode.runAction(cc.moveTo(0.2, 0, -540).easing(cc.easeBackIn()));
        let centerNodeLayout = this.centerNode.getComponent(cc.Widget);
        centerNodeLayout.bottom = 105 + (this.depositNode.active ? this.depositH:0);;
        this.botNode.getComponent(cc.Widget).updateAlignment();
        this.centerNode.getComponent(cc.Widget).updateAlignment();
        this.updateUI(this.title.string);
        // this.centerNode.node.stopAllActions();
        // this.centerNode.node.runAction(cc.moveTo(0.2, 0, -5).easing(cc.easeBackOut()));
    }
    private goBack() {
        this.data = [];
        this.depositNode.active = false;
        this.close();
    }

    onClose(){
        this.data =[];
        Global.ChatServer.QuickData = null
        this.updateUI(this.title.string);
        this.isOpen = false;
        //客服状态清理
        if(Global.ChatServer.serverType == CustomerEntranceType.LoginService){ //登陆客服
            Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.LoginKefu);
        }else if(Global.ChatServer.serverType == CustomerEntranceType.HallService){ //大厅联系客服
            Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.Kefu);
        }
        this.hideToolBar();
        this.clearInputMsg();
        //切换回横屏
        Global.NativeEvent.changeOrientationH(true);
        Global.UI.adjuestCanvasScreenStretch(cc.Canvas.instance); 
    }
    isNull( str ){
        if ( str == "" ) return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    }
    private sendMessage() {
        if(!Global.ChatServer.socketStatus()){
            Global.UI.fastTip("聊天系统暂无连接,请稍后再试");
            Global.ChatServer.connect();
            return;
        }
        let str = this.inputBox.string.trim();
        if((this.isNull(str))){ //当前输入的全部是空格或者换行符
            this.clearInputMsg();
            return;
        }
        let strArr:string[] = str.split("&");
        let tempStr = "";
        let tempStr2 ="";
        if(strArr.length>1){
            for(let i=0;i<strArr.length;i++){
                let s = strArr[i];
                tempStr2+=s;
                if(s.indexOf("[")!=-1&&s.indexOf("]")!=-1){
                    tempStr+=cc.js.formatStr(this.emojText,s);
                    continue;
                }
                tempStr+=s;
            }
        }else{
            tempStr2 = str;
        }
        Global.ChatServer.sendChatTextMsg(tempStr2);
        this.clearInputMsg();
    }

    clearBracket(str:string):string{
        const reg = new RegExp(/\[|]/g);
        return str.replace(reg,"");
    }

    // getImageHttp
    //接收表情解析
    public replaceLocalImg(str:string):string{
        let temp = str;
        const reg = new RegExp(/\[.*?\]/g);
        let repAft = temp.replace(reg,"&[");
        let matchArr = str.match(reg);
        if(matchArr!=null){
            for(let i=0;i<matchArr.length;i++){
                let val = cc.js.formatStr(this.emojText,matchArr[i]);
                repAft = repAft.replace("&[",val);
            }
        }
        return this.clearBracket(repAft);
    }
    clearInputMsg(){
        this.inputBox.string = "";
        this.textChangeCallback();
    }

    onDispose() {
        this.isOpen = false;
        this.title = null
        this.centerNode = null;
    }

    public getLocalEmoj(sfName: string, sprite?: cc.Sprite, width?: number, height?: number) {

        if (sfName == null || sfName == undefined || sfName == "") {
            Logger.error("sfName is empty, return!!!");
            return null;
        }

        let spriteFrame = Global.ResourceManager.getSprite("hall/texture/chat/emoj", sfName);
        
        if (spriteFrame == null) {
            Logger.error("找不到表情 sfName = " + sfName + ", return!!!");
            return null;
        }

        if (sprite != null && sprite != undefined) {
            width = (width != null) ? width : sprite.node.width;
            height = (height != null) ? height : sprite.node.height;
            sprite.spriteFrame = spriteFrame;
            sprite.node.width = width;
            sprite.node.height = height;
        }
        return spriteFrame;
    }
    public loadSeverHeader(url,callback:Function){
        //获取图片
        cc.loader.load({
            url: url,
            type: "jpg"
        }, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                callback(frame);
        })
    }
    public updateUI(title,isClear=true){
        if(this.centerNode){
            this.title.string = title;
            this.centerNode.data = this.data;
            this.centerNode.severHeadFrame = this.severHeadFrame;
            if(this.isOpen){
                this.centerNode.updateUI(isClear);
            }
        }else{
            this.data =[];
            Logger.error("this.centerNode 为空");
        }
    }

    public setCopypostion(postion,text){
        let localPos = this.copyBtn.parent.convertToNodeSpaceAR(postion);
        this.copyBtn.position = localPos
        this.copyBtn.active = true;
        this.copyText = text;
    }
    //点击复制
    private copyMsgText(){
        this.copyBtn.active = false;
        this.centerNode.copyBtnActive = false;
        Global.NativeEvent.copyTextToClipboard(this.copyText, (retStr)=>{
            if (retStr.result == 0) {
                Global.UI.fastTip("复制成功");
            }else {
                Global.UI.fastTip("复制失败");
            }
        });
    }
}