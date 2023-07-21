
const LandscapeStr = {
    "zh-cn":"请转横屏",
    "en":"Please turn the horizontal screen",
    "vi-vn":"Vui lòng chuyển qua màn hình."
}

const PortraitStr = {
    "zh-cn":"请转竖屏",
    "en":"Please turn to the vertical screen",
    "vi-vn":"Hãy chuyển màn hình dọc"
}
export default class GameWebView{
    private container:HTMLElement = null;
    private floatBtnMask:HTMLElement = null;
    private floatBtn:HTMLElement = null;
    private gameIframe:HTMLElement = null;
    private tipsContainer:HTMLElement = null;   //提示旋转容器
    private tipsTextContent:HTMLParagraphElement = null;    //提示文本内容 
    private tipsContainerTagName:string = "tipsContainer";
    private tipsTextContentTagName:string = "tipsTextContent";    //提示文本内容 
    private containerTagName:string = "GameContainer";
    private floatBtnMaskTagName:string = "FloatBtnMask"
    private floatBtnTagName:string = "FloatBtn";
    private gameIframeTagName:string = "gameIframe";
    private canClick:boolean = true;    //浮标按钮是否能点击
    private startTime:number = 0;      //触碰开始时间
    private maxLeft:number = 0;         
    private maxTop:number = 0;
    private isShow:boolean = false;      //是否在浏览iframe
    private needLandscape = false;       //是否需要强制横屏
    private needPortrait = false;        //是否需要强制竖屏
    private floatButtonBg = "";          //浮标按钮背景图
    private tipsBg = "";                 //横竖屏提示背景图
    init(){
        if(document.getElementById(this.containerTagName)) return;
        this.createElement();
    }

    private createElement(){
        //创建元素
        this.container = document.createElement("div");
        this.container.id = this.containerTagName;
        this.floatBtnMask = document.createElement("div");
        this.floatBtnMask.id = this.floatBtnMaskTagName;
        this.floatBtn = document.createElement("button");
        this.floatBtn.id = this.floatBtnTagName;
        this.gameIframe = document.createElement("iframe");
        this.gameIframe.id = this.gameIframeTagName;
        this.tipsContainer = document.createElement("div");
        this.tipsContainer.id = this.tipsContainerTagName;
        this.tipsTextContent = document.createElement("p");
        this.tipsTextContent.id = this.tipsTextContentTagName;
        //初始化样式
        this.initStyle();
        //挂载节点
        this.mountingDom();
        //初始化事件
        this.initEvent();
    }

    private initStyle(){
        //最外层容器样式
        this.initContainerStyle();
        //浮标按钮遮罩层样式
        this.floatBtnMask.style.position = "absolute";
        this.floatBtnMask.style.zIndex = "50";
        this.floatBtnMask.style.left = "0px";
        this.floatBtnMask.style.top = "0px";
        this.floatBtnMask.style.width = "100%";
        this.floatBtnMask.style.height = "100%";
        this.floatBtnMask.style.display = "none";
        //浮标按钮样式
        // let imageUrl = this.getButtonImg();
        this.floatBtn.style.position = "absolute";
        this.floatBtn.style.left = "30px";
        this.floatBtn.style.top = "30px";
        this.floatBtn.style.width = cc.sys.isMobile || CC_DEV ? "50px" : "80px";
        this.floatBtn.style.height = cc.sys.isMobile || CC_DEV ? "50px" : "80px";
        // this.floatBtn.style.backgroundImage = `url(${imageUrl})`;
        this.floatBtn.style.border = "none";
        this.floatBtn.style.backgroundRepeat = "round";
        this.floatBtn.style.outline = "none";
        this.floatBtn.style.backgroundColor = "transparent";
        this.floatBtn.style.transition = "all 0.3s"; 
        this.floatBtn.style.opacity = "0.5";
        this.floatBtn.style.zIndex = "100";
        //iframe样式
        this.gameIframe.style.background = "rgba(255, 255, 255, 0.8)";
        this.gameIframe.style.color = "rgb(51, 51, 51)";
        this.gameIframe.style.height = "100%";
        this.gameIframe.style.width = "100%";
        this.gameIframe.style.position = "absolute";
        this.gameIframe.style.bottom = "0px";
        this.gameIframe.style.left = "0px";
        this.gameIframe.style.border = "none";
        //提示样式
        // let tipsUrl = this.getTipsUrl();
        this.tipsContainer.style.width = "100%";
        this.tipsContainer.style.height = "100%";
        this.tipsContainer.style.display = "none";
        this.tipsContainer.style.zIndex = "900";
        this.tipsContainer.style.position = "absolute";
        this.tipsContainer.style.backgroundColor = "rgb(0,0,0)";
        // this.tipsContainer.style.backgroundImage = `url(${tipsUrl})`;
        this.tipsContainer.style.backgroundRepeat = "no-repeat";
        this.tipsContainer.style.backgroundSize = "20%";
        this.tipsContainer.style.backgroundPosition = "center center";
        this.tipsTextContent.style.color = "rgb(255,255,255)";
        this.tipsTextContent.style.fontSize = "32px";
        this.tipsTextContent.style.position = "absolute";
        this.tipsTextContent.style.top = this.tipsContainer.height * 0.6 + "px";
        this.tipsTextContent.style.width = "100%";
        this.tipsTextContent.style.top = "60%";
        this.tipsTextContent.style.textAlign = "center";
        
    }

    public initContainerStyle(isResize = false){
        if(CC_DEV){ //调试模式
            this.container.style.width = document.getElementById("GameDiv").offsetWidth + "px";
            this.container.style.height = document.getElementById("GameDiv").offsetHeight + "px";
            this.container.style.position = "absolute";
            this.container.style.top = "50%";
            this.container.style.left = "50%";
            this.container.style.transform = "translate(-50%,-50%)";
            this.container.style.display = this.isShow ? "block" : "none";
        }else if(cc.sys.isMobile){  //手机上
            let Cocos2dGameContainer = document.getElementById("Cocos2dGameContainer");
            let widthTemp = Cocos2dGameContainer.style.width;
            let heightTemp = Cocos2dGameContainer.style.height;
            let topNum = Cocos2dGameContainer.style.paddingTop ? Cocos2dGameContainer.style.paddingTop : 0 + "px";
            let leftNum = Cocos2dGameContainer.style.paddingLeft ? Cocos2dGameContainer.style.paddingLeft : 0 + "px";
            if(window.innerHeight > window.innerWidth){
                widthTemp = window.innerWidth + "px";
                heightTemp = window.innerHeight + "px";
                topNum = "0px";
                leftNum = "0px";
            }
            this.floatBtn.style.left = "30px";
            this.floatBtn.style.top = "50px";
            this.container.style.width = widthTemp;
            this.container.style.height = heightTemp; 
            this.container.style.position = "absolute";
            this.container.style.top = topNum;
            this.container.style.left = leftNum;
            this.container.style.display = this.isShow ? "block" : "none";
            // if(isResize && cc.sys.os == cc.sys.OS_IOS){   //ios横屏的时候才自动滚动
            //     setTimeout(function(){
            //         window.scrollTo(0,0)
            //     },10)
            // }
        }else{  //正式的pc端
            let Cocos2dGameContainer = document.getElementById("Cocos2dGameContainer");
            let widthnum = Cocos2dGameContainer.style.width ? Cocos2dGameContainer.style.width : 0 + "PX";
            this.container.style.width = widthnum;
            let heightnum = Cocos2dGameContainer.style.height ? Cocos2dGameContainer.style.height : 0 + "PX";
            this.container.style.height = heightnum;
            this.container.style.position = "absolute";
            let topNum = Cocos2dGameContainer.style.paddingTop ? Cocos2dGameContainer.style.paddingTop : 0 + "PX" ;
            this.container.style.top = topNum;
            let leftNum = Cocos2dGameContainer.style.paddingLeft ? Cocos2dGameContainer.style.paddingLeft : 0 + "PX";
            this.container.style.left = leftNum;
            this.container.style.display = this.isShow ? "block" : "none";
        }
    }

    private mountingDom(){
        this.tipsContainer.insertBefore(this.tipsTextContent,this.tipsContainer.lastChild);
        this.container.insertBefore(this.floatBtn,this.container.lastChild);
        this.container.insertBefore(this.floatBtnMask,this.container.lastChild);
        this.container.insertBefore(this.gameIframe,this.container.lastChild);
        this.container.insertBefore(this.tipsContainer,this.container.lastChild);
        document.body.insertBefore(this.container,document.body.lastChild);
    }

    private initEvent(){
        this.canClick = true;    //是否能点击
        this.startTime = 0;
        if(cc.sys.isMobile){     //手机端
            this.floatBtn.ontouchstart = this.touchstart.bind(this);
        }else{                   //pc端
            this.floatBtn.onmouseleave = this.mouseleave.bind(this);
            this.floatBtn.onmouseenter = this.mouseenter.bind(this);
            this.floatBtn.onmousedown = this.mousedown.bind(this);
        }
        this.gameIframe.addEventListener("load",(event)=>{
            // console.log("加载成功",this.isShow);
            //上分
            if(this.isShow){
                Global.Event.event(GlobalEvent.WebUpPoint,true);
            }
        },false)
        this.gameIframe.addEventListener("error",(event)=>{
        },false)
        window.addEventListener("resize",()=>{
            this.initContainerStyle(true)
            // if()
            this.isShowTipsOrNo()
        })
    }

    private  mousedown(event) {
        this.startTime = Date.now();
        this.canClick = false;
        let startX = event.clientX;
        let startY = event.clientY;
        //获取元素的left，top值
        let startLeft = this.floatBtn.offsetLeft;
        let startTop = this.floatBtn.offsetTop;

        this.maxLeft = this.container.offsetWidth - this.floatBtn.offsetWidth;
        this.maxTop = this.container.offsetHeight - this.floatBtn.offsetHeight;

        event.preventDefault();

        this.floatBtnMask.style.display = "block";

        document.onmousemove = ((event)=>{
            this.floatBtn.style.transform = "scale(1.2)";
            this.floatBtn.style.opacity = "1";
            this.floatBtn.style.transition = "none"; 
            let moveX = event.clientX;
            let moveY = event.clientY;
            let x = moveX - startX;
            let y = moveY - startY;

            let topNum = y + startTop;
            let leftNum = x + startLeft;
            if(topNum < 0 || leftNum < 0){
                return;
            }
            if(topNum > this.maxTop || leftNum > this.maxLeft){
                return;
            }

            this.canClick = false;   //移动过程中不可点击

            this.floatBtn.style.top = topNum + "px";
            this.floatBtn.style.left = leftNum + "px";
        })

        //清除事件
        document.onmouseup = ((event)=>{
            document.onmousemove = null;
            this.floatBtnMask.style.display = "none";
            let endTime = Date.now();
            this.canClick = endTime - this.startTime < 300 
            if(this.canClick){
                let backToHall = confirm("确认返回游戏大厅？");
                if(backToHall){
                    this.gameWebViewHiden();
                }
            }
        })
    }

    private  mouseleave(event) {
        this.floatBtn.style.transform = "scale(1.0)";
        this.floatBtn.style.opacity = "0.5";
        this.floatBtnMask.onmousemove = null;
    }

    private  mouseenter(event) {
        this.floatBtn.style.transform = "scale(1.2)";
        this.floatBtn.style.opacity = "1";
    }

    private touchstart(event) {
        this.startTime = Date.now();
        this.canClick = false;
        this.floatBtn.style.transform = "scale(1.2)";
        this.floatBtn.style.opacity = "1";
        let startX =  event.touches[0].clientX;
        let startY =  event.touches[0].clientY;
        //获取元素的left，top值
        let startLeft = this.floatBtn.offsetLeft;
        let startTop = this.floatBtn.offsetTop;

        this.maxLeft = this.container.offsetWidth - this.floatBtn.offsetWidth;
        this.maxTop = this.container.offsetHeight - this.floatBtn.offsetHeight;

        event.preventDefault();

        this.floatBtnMask.style.display = "block";
        document.ontouchmove = ((event)=>{
            this.floatBtn.style.transform = "scale(1.2)";
            this.floatBtn.style.opacity = "1";
            this.floatBtn.style.transition = "none"; 
            let moveX = event.touches[0].clientX;
            let moveY = event.touches[0].clientY;

            let x = moveX - startX;
            let y = moveY - startY;

            let topNum = y + startTop;
            let leftNum = x + startLeft;

            if(topNum < 0 || leftNum < 0){
                return;
            }

            if(topNum > this.maxTop || leftNum > this.maxLeft){
                return;
            }

            this.canClick = false;   //移动过程中不可点击
            
            this.floatBtn.style.top = topNum + "px" ;
            
            this.floatBtn.style.left = leftNum + "px";
        })

        //清除事件
        document.ontouchend = document.ontouchcancel = ((event)=>{
            document.onmousemove = null;
            this.floatBtnMask.style.display = "none";
            this.floatBtn.style.transform = "scale(1.0)";
            this.floatBtn.style.opacity = "0.5";
            let endTime = Date.now();
            this.canClick = endTime - this.startTime < 300 
            if(this.canClick){
                let backToHall = confirm("确认返回游戏大厅？");
                if(backToHall){
                    this.gameWebViewHiden()
                }
            }
        })
    }

    private getButtonImg(){
        let result = "";
        if(CC_DEV){
            result = "http://s.bjfkwh.com/" + "Back.png";
        }else{
            let nowUrl = window.location.href;
            if(nowUrl.indexOf("?")>-1){
                let StrArr = nowUrl.split("?");
                nowUrl = StrArr[0];
            }
            result = nowUrl + "Back.png";
        }
        return result;
    }

    private getTipsUrl(){
        let result = "";
        if(CC_DEV){
            result = "http://s.bjfkwh.com/" + "xuanzhuan.png";
        }else{
            let nowUrl = window.location.href;
            if(nowUrl.indexOf("?")>-1){
                let StrArr = nowUrl.split("?");
                nowUrl = StrArr[0];
            }
            result = nowUrl + "xuanzhuan.png";
        }
        return result;
    }

    private getTipsText(){
        if(!this.needLandscape && !this.needPortrait) return;
        let strMap = this.needPortrait ? "请转竖屏" : "请转横屏";
    }

    gameWebViewShow(url:string,needland?:boolean,needPor?:boolean){
        if(!url) return;
        if(CC_DEV){
            document.getElementById("content").style.display = "none";
        }else{
            document.getElementById("Cocos2dGameContainer").style.visibility = "hidden";
        }
        //进游戏关闭大厅音乐
        Global.Audio.stopMusic();
        this.container.style.display = "block";
        this.gameIframe.setAttribute("src",url);
        this.isShow = true;
        this.needLandscape = needland || false;
        this.needPortrait = needPor || false;
        this.isShowTipsOrNo();
        this.setBgImg();
    }

    gameWebViewHiden(){
        this.container.style.display = "none";
        if(CC_DEV){
            document.getElementById("content").style.display = "flex";
        }else{
            document.getElementById("Cocos2dGameContainer").style.visibility = "visible";
        }
        //播放大厅音乐
        var model = Global.ModelManager.getModel("PlayerInfoModel")
        if(model)
        {
            model.InitBgm()
        }
        this.isShow = false;
        this.gameIframe.setAttribute("src","");
        this.needLandscape = false;
        this.needPortrait = false;
        //下分
        Global.Event.event(GlobalEvent.WebDownPoint,true);
    }

    setBgImg(){
        if(this.floatButtonBg != "" && this.tipsBg != "") return;
        this.floatButtonBg = Global.customApp.getWebFilePath("Back.png");
        this.tipsBg = Global.customApp.getWebFilePath("xuanzhuan.png");
        this.floatBtn.style.backgroundImage = `url(${this.floatButtonBg})`;
        this.tipsContainer.style.backgroundImage = `url(${this.tipsBg})`;
    }

    isShowTipsOrNo(){   
        if(!cc.sys.isMobile) return;
        if(!this.needLandscape && !this.needPortrait) return;
        if(this.needPortrait && this.island()){
            this.showTipsContainer();
            return;
        }
        if(this.needLandscape && this.isPort()){
            this.showTipsContainer();
            return;
        }
        this.hideTipsContainer();
    }

    island(){
        return window.innerWidth > window.innerHeight;
    }

    isPort(){
        return window.innerHeight > window.innerWidth;
    }

    //显示需要旋转
    showTipsContainer(){
        this.gameIframe.style.display = "none";
        this.floatBtn.style.display = "none";
        this.floatBtnMask.style.display = "none";
        this.tipsContainer.style.display = "block";
        this.tipsTextContent.textContent = this.getTipsText();
    }

    //隐藏需要旋转
    hideTipsContainer(){
        this.gameIframe.style.display = "block";
        this.floatBtn.style.display = "block";
        this.floatBtnMask.style.display = "block";
        this.tipsContainer.style.display = "none";
        this.tipsTextContent.textContent = "";
    }
}