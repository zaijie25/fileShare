"use strict";
cc._RF.push(module, 'cb62bSCJjZHoqyDnxM5c2Xt', 'GameWebView');
// hall/scripts/framework/native/GameWebView.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LandscapeStr = {
    "zh-cn": "请转横屏",
    "en": "Please turn the horizontal screen",
    "vi-vn": "Vui lòng chuyển qua màn hình."
};
var PortraitStr = {
    "zh-cn": "请转竖屏",
    "en": "Please turn to the vertical screen",
    "vi-vn": "Hãy chuyển màn hình dọc"
};
var GameWebView = /** @class */ (function () {
    function GameWebView() {
        this.container = null;
        this.floatBtnMask = null;
        this.floatBtn = null;
        this.gameIframe = null;
        this.tipsContainer = null; //提示旋转容器
        this.tipsTextContent = null; //提示文本内容 
        this.tipsContainerTagName = "tipsContainer";
        this.tipsTextContentTagName = "tipsTextContent"; //提示文本内容 
        this.containerTagName = "GameContainer";
        this.floatBtnMaskTagName = "FloatBtnMask";
        this.floatBtnTagName = "FloatBtn";
        this.gameIframeTagName = "gameIframe";
        this.canClick = true; //浮标按钮是否能点击
        this.startTime = 0; //触碰开始时间
        this.maxLeft = 0;
        this.maxTop = 0;
        this.isShow = false; //是否在浏览iframe
        this.needLandscape = false; //是否需要强制横屏
        this.needPortrait = false; //是否需要强制竖屏
        this.floatButtonBg = ""; //浮标按钮背景图
        this.tipsBg = ""; //横竖屏提示背景图
    }
    GameWebView.prototype.init = function () {
        if (document.getElementById(this.containerTagName))
            return;
        this.createElement();
    };
    GameWebView.prototype.createElement = function () {
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
    };
    GameWebView.prototype.initStyle = function () {
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
    };
    GameWebView.prototype.initContainerStyle = function (isResize) {
        if (isResize === void 0) { isResize = false; }
        if (CC_DEV) { //调试模式
            this.container.style.width = document.getElementById("GameDiv").offsetWidth + "px";
            this.container.style.height = document.getElementById("GameDiv").offsetHeight + "px";
            this.container.style.position = "absolute";
            this.container.style.top = "50%";
            this.container.style.left = "50%";
            this.container.style.transform = "translate(-50%,-50%)";
            this.container.style.display = this.isShow ? "block" : "none";
        }
        else if (cc.sys.isMobile) { //手机上
            var Cocos2dGameContainer = document.getElementById("Cocos2dGameContainer");
            var widthTemp = Cocos2dGameContainer.style.width;
            var heightTemp = Cocos2dGameContainer.style.height;
            var topNum = Cocos2dGameContainer.style.paddingTop ? Cocos2dGameContainer.style.paddingTop : 0 + "px";
            var leftNum = Cocos2dGameContainer.style.paddingLeft ? Cocos2dGameContainer.style.paddingLeft : 0 + "px";
            if (window.innerHeight > window.innerWidth) {
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
        }
        else { //正式的pc端
            var Cocos2dGameContainer = document.getElementById("Cocos2dGameContainer");
            var widthnum = Cocos2dGameContainer.style.width ? Cocos2dGameContainer.style.width : 0 + "PX";
            this.container.style.width = widthnum;
            var heightnum = Cocos2dGameContainer.style.height ? Cocos2dGameContainer.style.height : 0 + "PX";
            this.container.style.height = heightnum;
            this.container.style.position = "absolute";
            var topNum = Cocos2dGameContainer.style.paddingTop ? Cocos2dGameContainer.style.paddingTop : 0 + "PX";
            this.container.style.top = topNum;
            var leftNum = Cocos2dGameContainer.style.paddingLeft ? Cocos2dGameContainer.style.paddingLeft : 0 + "PX";
            this.container.style.left = leftNum;
            this.container.style.display = this.isShow ? "block" : "none";
        }
    };
    GameWebView.prototype.mountingDom = function () {
        this.tipsContainer.insertBefore(this.tipsTextContent, this.tipsContainer.lastChild);
        this.container.insertBefore(this.floatBtn, this.container.lastChild);
        this.container.insertBefore(this.floatBtnMask, this.container.lastChild);
        this.container.insertBefore(this.gameIframe, this.container.lastChild);
        this.container.insertBefore(this.tipsContainer, this.container.lastChild);
        document.body.insertBefore(this.container, document.body.lastChild);
    };
    GameWebView.prototype.initEvent = function () {
        var _this = this;
        this.canClick = true; //是否能点击
        this.startTime = 0;
        if (cc.sys.isMobile) { //手机端
            this.floatBtn.ontouchstart = this.touchstart.bind(this);
        }
        else { //pc端
            this.floatBtn.onmouseleave = this.mouseleave.bind(this);
            this.floatBtn.onmouseenter = this.mouseenter.bind(this);
            this.floatBtn.onmousedown = this.mousedown.bind(this);
        }
        this.gameIframe.addEventListener("load", function (event) {
            // console.log("加载成功",this.isShow);
            //上分
            if (_this.isShow) {
                Global.Event.event(GlobalEvent.WebUpPoint, true);
            }
        }, false);
        this.gameIframe.addEventListener("error", function (event) {
        }, false);
        window.addEventListener("resize", function () {
            _this.initContainerStyle(true);
            // if()
            _this.isShowTipsOrNo();
        });
    };
    GameWebView.prototype.mousedown = function (event) {
        var _this = this;
        this.startTime = Date.now();
        this.canClick = false;
        var startX = event.clientX;
        var startY = event.clientY;
        //获取元素的left，top值
        var startLeft = this.floatBtn.offsetLeft;
        var startTop = this.floatBtn.offsetTop;
        this.maxLeft = this.container.offsetWidth - this.floatBtn.offsetWidth;
        this.maxTop = this.container.offsetHeight - this.floatBtn.offsetHeight;
        event.preventDefault();
        this.floatBtnMask.style.display = "block";
        document.onmousemove = (function (event) {
            _this.floatBtn.style.transform = "scale(1.2)";
            _this.floatBtn.style.opacity = "1";
            _this.floatBtn.style.transition = "none";
            var moveX = event.clientX;
            var moveY = event.clientY;
            var x = moveX - startX;
            var y = moveY - startY;
            var topNum = y + startTop;
            var leftNum = x + startLeft;
            if (topNum < 0 || leftNum < 0) {
                return;
            }
            if (topNum > _this.maxTop || leftNum > _this.maxLeft) {
                return;
            }
            _this.canClick = false; //移动过程中不可点击
            _this.floatBtn.style.top = topNum + "px";
            _this.floatBtn.style.left = leftNum + "px";
        });
        //清除事件
        document.onmouseup = (function (event) {
            document.onmousemove = null;
            _this.floatBtnMask.style.display = "none";
            var endTime = Date.now();
            _this.canClick = endTime - _this.startTime < 300;
            if (_this.canClick) {
                var backToHall = confirm("确认返回游戏大厅？");
                if (backToHall) {
                    _this.gameWebViewHiden();
                }
            }
        });
    };
    GameWebView.prototype.mouseleave = function (event) {
        this.floatBtn.style.transform = "scale(1.0)";
        this.floatBtn.style.opacity = "0.5";
        this.floatBtnMask.onmousemove = null;
    };
    GameWebView.prototype.mouseenter = function (event) {
        this.floatBtn.style.transform = "scale(1.2)";
        this.floatBtn.style.opacity = "1";
    };
    GameWebView.prototype.touchstart = function (event) {
        var _this = this;
        this.startTime = Date.now();
        this.canClick = false;
        this.floatBtn.style.transform = "scale(1.2)";
        this.floatBtn.style.opacity = "1";
        var startX = event.touches[0].clientX;
        var startY = event.touches[0].clientY;
        //获取元素的left，top值
        var startLeft = this.floatBtn.offsetLeft;
        var startTop = this.floatBtn.offsetTop;
        this.maxLeft = this.container.offsetWidth - this.floatBtn.offsetWidth;
        this.maxTop = this.container.offsetHeight - this.floatBtn.offsetHeight;
        event.preventDefault();
        this.floatBtnMask.style.display = "block";
        document.ontouchmove = (function (event) {
            _this.floatBtn.style.transform = "scale(1.2)";
            _this.floatBtn.style.opacity = "1";
            _this.floatBtn.style.transition = "none";
            var moveX = event.touches[0].clientX;
            var moveY = event.touches[0].clientY;
            var x = moveX - startX;
            var y = moveY - startY;
            var topNum = y + startTop;
            var leftNum = x + startLeft;
            if (topNum < 0 || leftNum < 0) {
                return;
            }
            if (topNum > _this.maxTop || leftNum > _this.maxLeft) {
                return;
            }
            _this.canClick = false; //移动过程中不可点击
            _this.floatBtn.style.top = topNum + "px";
            _this.floatBtn.style.left = leftNum + "px";
        });
        //清除事件
        document.ontouchend = document.ontouchcancel = (function (event) {
            document.onmousemove = null;
            _this.floatBtnMask.style.display = "none";
            _this.floatBtn.style.transform = "scale(1.0)";
            _this.floatBtn.style.opacity = "0.5";
            var endTime = Date.now();
            _this.canClick = endTime - _this.startTime < 300;
            if (_this.canClick) {
                var backToHall = confirm("确认返回游戏大厅？");
                if (backToHall) {
                    _this.gameWebViewHiden();
                }
            }
        });
    };
    GameWebView.prototype.getButtonImg = function () {
        var result = "";
        if (CC_DEV) {
            result = "http://s.bjfkwh.com/" + "Back.png";
        }
        else {
            var nowUrl = window.location.href;
            if (nowUrl.indexOf("?") > -1) {
                var StrArr = nowUrl.split("?");
                nowUrl = StrArr[0];
            }
            result = nowUrl + "Back.png";
        }
        return result;
    };
    GameWebView.prototype.getTipsUrl = function () {
        var result = "";
        if (CC_DEV) {
            result = "http://s.bjfkwh.com/" + "xuanzhuan.png";
        }
        else {
            var nowUrl = window.location.href;
            if (nowUrl.indexOf("?") > -1) {
                var StrArr = nowUrl.split("?");
                nowUrl = StrArr[0];
            }
            result = nowUrl + "xuanzhuan.png";
        }
        return result;
    };
    GameWebView.prototype.getTipsText = function () {
        if (!this.needLandscape && !this.needPortrait)
            return;
        var strMap = this.needPortrait ? "请转竖屏" : "请转横屏";
    };
    GameWebView.prototype.gameWebViewShow = function (url, needland, needPor) {
        if (!url)
            return;
        if (CC_DEV) {
            document.getElementById("content").style.display = "none";
        }
        else {
            document.getElementById("Cocos2dGameContainer").style.visibility = "hidden";
        }
        //进游戏关闭大厅音乐
        Global.Audio.stopMusic();
        this.container.style.display = "block";
        this.gameIframe.setAttribute("src", url);
        this.isShow = true;
        this.needLandscape = needland || false;
        this.needPortrait = needPor || false;
        this.isShowTipsOrNo();
        this.setBgImg();
    };
    GameWebView.prototype.gameWebViewHiden = function () {
        this.container.style.display = "none";
        if (CC_DEV) {
            document.getElementById("content").style.display = "flex";
        }
        else {
            document.getElementById("Cocos2dGameContainer").style.visibility = "visible";
        }
        //播放大厅音乐
        var model = Global.ModelManager.getModel("PlayerInfoModel");
        if (model) {
            model.InitBgm();
        }
        this.isShow = false;
        this.gameIframe.setAttribute("src", "");
        this.needLandscape = false;
        this.needPortrait = false;
        //下分
        Global.Event.event(GlobalEvent.WebDownPoint, true);
    };
    GameWebView.prototype.setBgImg = function () {
        if (this.floatButtonBg != "" && this.tipsBg != "")
            return;
        this.floatButtonBg = Global.customApp.getWebFilePath("Back.png");
        this.tipsBg = Global.customApp.getWebFilePath("xuanzhuan.png");
        this.floatBtn.style.backgroundImage = "url(" + this.floatButtonBg + ")";
        this.tipsContainer.style.backgroundImage = "url(" + this.tipsBg + ")";
    };
    GameWebView.prototype.isShowTipsOrNo = function () {
        if (!cc.sys.isMobile)
            return;
        if (!this.needLandscape && !this.needPortrait)
            return;
        if (this.needPortrait && this.island()) {
            this.showTipsContainer();
            return;
        }
        if (this.needLandscape && this.isPort()) {
            this.showTipsContainer();
            return;
        }
        this.hideTipsContainer();
    };
    GameWebView.prototype.island = function () {
        return window.innerWidth > window.innerHeight;
    };
    GameWebView.prototype.isPort = function () {
        return window.innerHeight > window.innerWidth;
    };
    //显示需要旋转
    GameWebView.prototype.showTipsContainer = function () {
        this.gameIframe.style.display = "none";
        this.floatBtn.style.display = "none";
        this.floatBtnMask.style.display = "none";
        this.tipsContainer.style.display = "block";
        this.tipsTextContent.textContent = this.getTipsText();
    };
    //隐藏需要旋转
    GameWebView.prototype.hideTipsContainer = function () {
        this.gameIframe.style.display = "block";
        this.floatBtn.style.display = "block";
        this.floatBtnMask.style.display = "block";
        this.tipsContainer.style.display = "none";
        this.tipsTextContent.textContent = "";
    };
    return GameWebView;
}());
exports.default = GameWebView;

cc._RF.pop();