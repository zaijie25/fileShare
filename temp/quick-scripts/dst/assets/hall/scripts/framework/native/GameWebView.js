
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/native/GameWebView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuYXRpdmVcXEdhbWVXZWJWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTSxZQUFZLEdBQUc7SUFDakIsT0FBTyxFQUFDLE1BQU07SUFDZCxJQUFJLEVBQUMsbUNBQW1DO0lBQ3hDLE9BQU8sRUFBQywrQkFBK0I7Q0FDMUMsQ0FBQTtBQUVELElBQU0sV0FBVyxHQUFHO0lBQ2hCLE9BQU8sRUFBQyxNQUFNO0lBQ2QsSUFBSSxFQUFDLG9DQUFvQztJQUN6QyxPQUFPLEVBQUMseUJBQXlCO0NBQ3BDLENBQUE7QUFDRDtJQUFBO1FBQ1ksY0FBUyxHQUFlLElBQUksQ0FBQztRQUM3QixpQkFBWSxHQUFlLElBQUksQ0FBQztRQUNoQyxhQUFRLEdBQWUsSUFBSSxDQUFDO1FBQzVCLGVBQVUsR0FBZSxJQUFJLENBQUM7UUFDOUIsa0JBQWEsR0FBZSxJQUFJLENBQUMsQ0FBRyxRQUFRO1FBQzVDLG9CQUFlLEdBQXdCLElBQUksQ0FBQyxDQUFJLFNBQVM7UUFDekQseUJBQW9CLEdBQVUsZUFBZSxDQUFDO1FBQzlDLDJCQUFzQixHQUFVLGlCQUFpQixDQUFDLENBQUksU0FBUztRQUMvRCxxQkFBZ0IsR0FBVSxlQUFlLENBQUM7UUFDMUMsd0JBQW1CLEdBQVUsY0FBYyxDQUFBO1FBQzNDLG9CQUFlLEdBQVUsVUFBVSxDQUFDO1FBQ3BDLHNCQUFpQixHQUFVLFlBQVksQ0FBQztRQUN4QyxhQUFRLEdBQVcsSUFBSSxDQUFDLENBQUksV0FBVztRQUN2QyxjQUFTLEdBQVUsQ0FBQyxDQUFDLENBQU0sUUFBUTtRQUNuQyxZQUFPLEdBQVUsQ0FBQyxDQUFDO1FBQ25CLFdBQU0sR0FBVSxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFXLEtBQUssQ0FBQyxDQUFNLGFBQWE7UUFDMUMsa0JBQWEsR0FBRyxLQUFLLENBQUMsQ0FBTyxVQUFVO1FBQ3ZDLGlCQUFZLEdBQUcs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QUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFDTCxrQkFBQztBQUFELENBdmJBLEFBdWJDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgTGFuZHNjYXBlU3RyID0ge1xyXG4gICAgXCJ6aC1jblwiOlwi6K+36L2s5qiq5bGPXCIsXHJcbiAgICBcImVuXCI6XCJQbGVhc2UgdHVybiB0aGUgaG9yaXpvbnRhbCBzY3JlZW5cIixcclxuICAgIFwidmktdm5cIjpcIlZ1aSBsw7JuZyBjaHV54buDbiBxdWEgbcOgbiBow6xuaC5cIlxyXG59XHJcblxyXG5jb25zdCBQb3J0cmFpdFN0ciA9IHtcclxuICAgIFwiemgtY25cIjpcIuivt+i9rOerluWxj1wiLFxyXG4gICAgXCJlblwiOlwiUGxlYXNlIHR1cm4gdG8gdGhlIHZlcnRpY2FsIHNjcmVlblwiLFxyXG4gICAgXCJ2aS12blwiOlwiSMOjeSBjaHV54buDbiBtw6BuIGjDrG5oIGThu41jXCJcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lV2ViVmlld3tcclxuICAgIHByaXZhdGUgY29udGFpbmVyOkhUTUxFbGVtZW50ID0gbnVsbDtcclxuICAgIHByaXZhdGUgZmxvYXRCdG5NYXNrOkhUTUxFbGVtZW50ID0gbnVsbDtcclxuICAgIHByaXZhdGUgZmxvYXRCdG46SFRNTEVsZW1lbnQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBnYW1lSWZyYW1lOkhUTUxFbGVtZW50ID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGlwc0NvbnRhaW5lcjpIVE1MRWxlbWVudCA9IG51bGw7ICAgLy/mj5DnpLrml4vovazlrrnlmahcclxuICAgIHByaXZhdGUgdGlwc1RleHRDb250ZW50OkhUTUxQYXJhZ3JhcGhFbGVtZW50ID0gbnVsbDsgICAgLy/mj5DnpLrmlofmnKzlhoXlrrkgXHJcbiAgICBwcml2YXRlIHRpcHNDb250YWluZXJUYWdOYW1lOnN0cmluZyA9IFwidGlwc0NvbnRhaW5lclwiO1xyXG4gICAgcHJpdmF0ZSB0aXBzVGV4dENvbnRlbnRUYWdOYW1lOnN0cmluZyA9IFwidGlwc1RleHRDb250ZW50XCI7ICAgIC8v5o+Q56S65paH5pys5YaF5a65IFxyXG4gICAgcHJpdmF0ZSBjb250YWluZXJUYWdOYW1lOnN0cmluZyA9IFwiR2FtZUNvbnRhaW5lclwiO1xyXG4gICAgcHJpdmF0ZSBmbG9hdEJ0bk1hc2tUYWdOYW1lOnN0cmluZyA9IFwiRmxvYXRCdG5NYXNrXCJcclxuICAgIHByaXZhdGUgZmxvYXRCdG5UYWdOYW1lOnN0cmluZyA9IFwiRmxvYXRCdG5cIjtcclxuICAgIHByaXZhdGUgZ2FtZUlmcmFtZVRhZ05hbWU6c3RyaW5nID0gXCJnYW1lSWZyYW1lXCI7XHJcbiAgICBwcml2YXRlIGNhbkNsaWNrOmJvb2xlYW4gPSB0cnVlOyAgICAvL+a1ruagh+aMiemSruaYr+WQpuiDveeCueWHu1xyXG4gICAgcHJpdmF0ZSBzdGFydFRpbWU6bnVtYmVyID0gMDsgICAgICAvL+inpueisOW8gOWni+aXtumXtFxyXG4gICAgcHJpdmF0ZSBtYXhMZWZ0Om51bWJlciA9IDA7ICAgICAgICAgXHJcbiAgICBwcml2YXRlIG1heFRvcDpudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBpc1Nob3c6Ym9vbGVhbiA9IGZhbHNlOyAgICAgIC8v5piv5ZCm5Zyo5rWP6KeIaWZyYW1lXHJcbiAgICBwcml2YXRlIG5lZWRMYW5kc2NhcGUgPSBmYWxzZTsgICAgICAgLy/mmK/lkKbpnIDopoHlvLrliLbmqKrlsY9cclxuICAgIHByaXZhdGUgbmVlZFBvcnRyYWl0ID0gZmFsc2U7ICAgICAgICAvL+aYr+WQpumcgOimgeW8uuWItuerluWxj1xyXG4gICAgcHJpdmF0ZSBmbG9hdEJ1dHRvbkJnID0gXCJcIjsgICAgICAgICAgLy/mta7moIfmjInpkq7og4zmma/lm75cclxuICAgIHByaXZhdGUgdGlwc0JnID0gXCJcIjsgICAgICAgICAgICAgICAgIC8v5qiq56uW5bGP5o+Q56S66IOM5pmv5Zu+XHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5jb250YWluZXJUYWdOYW1lKSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRWxlbWVudCgpe1xyXG4gICAgICAgIC8v5Yib5bu65YWD57SgXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlkID0gdGhpcy5jb250YWluZXJUYWdOYW1lO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG5NYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuTWFzay5pZCA9IHRoaXMuZmxvYXRCdG5NYXNrVGFnTmFtZTtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuLmlkID0gdGhpcy5mbG9hdEJ0blRhZ05hbWU7XHJcbiAgICAgICAgdGhpcy5nYW1lSWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVJZnJhbWUuaWQgPSB0aGlzLmdhbWVJZnJhbWVUYWdOYW1lO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy50aXBzQ29udGFpbmVyLmlkID0gdGhpcy50aXBzQ29udGFpbmVyVGFnTmFtZTtcclxuICAgICAgICB0aGlzLnRpcHNUZXh0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIHRoaXMudGlwc1RleHRDb250ZW50LmlkID0gdGhpcy50aXBzVGV4dENvbnRlbnRUYWdOYW1lO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5qC35byPXHJcbiAgICAgICAgdGhpcy5pbml0U3R5bGUoKTtcclxuICAgICAgICAvL+aMgui9veiKgueCuVxyXG4gICAgICAgIHRoaXMubW91bnRpbmdEb20oKTtcclxuICAgICAgICAvL+WIneWni+WMluS6i+S7tlxyXG4gICAgICAgIHRoaXMuaW5pdEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0U3R5bGUoKXtcclxuICAgICAgICAvL+acgOWkluWxguWuueWZqOagt+W8j1xyXG4gICAgICAgIHRoaXMuaW5pdENvbnRhaW5lclN0eWxlKCk7XHJcbiAgICAgICAgLy/mta7moIfmjInpkq7pga7nvanlsYLmoLflvI9cclxuICAgICAgICB0aGlzLmZsb2F0QnRuTWFzay5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuTWFzay5zdHlsZS56SW5kZXggPSBcIjUwXCI7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bk1hc2suc3R5bGUubGVmdCA9IFwiMHB4XCI7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bk1hc2suc3R5bGUudG9wID0gXCIwcHhcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuTWFzay5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG5NYXNrLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG5NYXNrLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAvL+a1ruagh+aMiemSruagt+W8j1xyXG4gICAgICAgIC8vIGxldCBpbWFnZVVybCA9IHRoaXMuZ2V0QnV0dG9uSW1nKCk7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLmxlZnQgPSBcIjMwcHhcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLnRvcCA9IFwiMzBweFwiO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUud2lkdGggPSBjYy5zeXMuaXNNb2JpbGUgfHwgQ0NfREVWID8gXCI1MHB4XCIgOiBcIjgwcHhcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLmhlaWdodCA9IGNjLnN5cy5pc01vYmlsZSB8fCBDQ19ERVYgPyBcIjUwcHhcIiA6IFwiODBweFwiO1xyXG4gICAgICAgIC8vIHRoaXMuZmxvYXRCdG4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltYWdlVXJsfSlgO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gXCJyb3VuZFwiO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUub3V0bGluZSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUudHJhbnNpdGlvbiA9IFwiYWxsIDAuM3NcIjsgXHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLnpJbmRleCA9IFwiMTAwXCI7XHJcbiAgICAgICAgLy9pZnJhbWXmoLflvI9cclxuICAgICAgICB0aGlzLmdhbWVJZnJhbWUuc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpXCI7XHJcbiAgICAgICAgdGhpcy5nYW1lSWZyYW1lLnN0eWxlLmNvbG9yID0gXCJyZ2IoNTEsIDUxLCA1MSlcIjtcclxuICAgICAgICB0aGlzLmdhbWVJZnJhbWUuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XHJcbiAgICAgICAgdGhpcy5nYW1lSWZyYW1lLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XHJcbiAgICAgICAgdGhpcy5nYW1lSWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIHRoaXMuZ2FtZUlmcmFtZS5zdHlsZS5ib3R0b20gPSBcIjBweFwiO1xyXG4gICAgICAgIHRoaXMuZ2FtZUlmcmFtZS5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcclxuICAgICAgICB0aGlzLmdhbWVJZnJhbWUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XHJcbiAgICAgICAgLy/mj5DnpLrmoLflvI9cclxuICAgICAgICAvLyBsZXQgdGlwc1VybCA9IHRoaXMuZ2V0VGlwc1VybCgpO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcclxuICAgICAgICB0aGlzLnRpcHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS56SW5kZXggPSBcIjkwMFwiO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICB0aGlzLnRpcHNDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwwLDApXCI7XHJcbiAgICAgICAgLy8gdGhpcy50aXBzQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt0aXBzVXJsfSlgO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gXCJuby1yZXBlYXRcIjtcclxuICAgICAgICB0aGlzLnRpcHNDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjIwJVwiO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBcImNlbnRlciBjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLnRpcHNUZXh0Q29udGVudC5zdHlsZS5jb2xvciA9IFwicmdiKDI1NSwyNTUsMjU1KVwiO1xyXG4gICAgICAgIHRoaXMudGlwc1RleHRDb250ZW50LnN0eWxlLmZvbnRTaXplID0gXCIzMnB4XCI7XHJcbiAgICAgICAgdGhpcy50aXBzVGV4dENvbnRlbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgdGhpcy50aXBzVGV4dENvbnRlbnQuc3R5bGUudG9wID0gdGhpcy50aXBzQ29udGFpbmVyLmhlaWdodCAqIDAuNiArIFwicHhcIjtcclxuICAgICAgICB0aGlzLnRpcHNUZXh0Q29udGVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG4gICAgICAgIHRoaXMudGlwc1RleHRDb250ZW50LnN0eWxlLnRvcCA9IFwiNjAlXCI7XHJcbiAgICAgICAgdGhpcy50aXBzVGV4dENvbnRlbnQuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdENvbnRhaW5lclN0eWxlKGlzUmVzaXplID0gZmFsc2Upe1xyXG4gICAgICAgIGlmKENDX0RFVil7IC8v6LCD6K+V5qih5byPXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJHYW1lRGl2XCIpLm9mZnNldFdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkdhbWVEaXZcIikub2Zmc2V0SGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gXCI1MCVcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IFwiNTAlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKC01MCUsLTUwJSlcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IHRoaXMuaXNTaG93ID8gXCJibG9ja1wiIDogXCJub25lXCI7XHJcbiAgICAgICAgfWVsc2UgaWYoY2Muc3lzLmlzTW9iaWxlKXsgIC8v5omL5py65LiKXHJcbiAgICAgICAgICAgIGxldCBDb2NvczJkR2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29jb3MyZEdhbWVDb250YWluZXJcIik7XHJcbiAgICAgICAgICAgIGxldCB3aWR0aFRlbXAgPSBDb2NvczJkR2FtZUNvbnRhaW5lci5zdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgbGV0IGhlaWdodFRlbXAgPSBDb2NvczJkR2FtZUNvbnRhaW5lci5zdHlsZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGxldCB0b3BOdW0gPSBDb2NvczJkR2FtZUNvbnRhaW5lci5zdHlsZS5wYWRkaW5nVG9wID8gQ29jb3MyZEdhbWVDb250YWluZXIuc3R5bGUucGFkZGluZ1RvcCA6IDAgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIGxldCBsZWZ0TnVtID0gQ29jb3MyZEdhbWVDb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQgPyBDb2NvczJkR2FtZUNvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA6IDAgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoKXtcclxuICAgICAgICAgICAgICAgIHdpZHRoVGVtcCA9IHdpbmRvdy5pbm5lcldpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0VGVtcCA9IHdpbmRvdy5pbm5lckhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIHRvcE51bSA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgICAgICBsZWZ0TnVtID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLmxlZnQgPSBcIjMwcHhcIjtcclxuICAgICAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS50b3AgPSBcIjUwcHhcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSB3aWR0aFRlbXA7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGhlaWdodFRlbXA7IFxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wTnVtO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbGVmdE51bTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IHRoaXMuaXNTaG93ID8gXCJibG9ja1wiIDogXCJub25lXCI7XHJcbiAgICAgICAgICAgIC8vIGlmKGlzUmVzaXplICYmIGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKXsgICAvL2lvc+aoquWxj+eahOaXtuWAmeaJjeiHquWKqOa7muWKqFxyXG4gICAgICAgICAgICAvLyAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLDApXHJcbiAgICAgICAgICAgIC8vICAgICB9LDEwKVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfWVsc2V7ICAvL+ato+W8j+eahHBj56uvXHJcbiAgICAgICAgICAgIGxldCBDb2NvczJkR2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ29jb3MyZEdhbWVDb250YWluZXJcIik7XHJcbiAgICAgICAgICAgIGxldCB3aWR0aG51bSA9IENvY29zMmRHYW1lQ29udGFpbmVyLnN0eWxlLndpZHRoID8gQ29jb3MyZEdhbWVDb250YWluZXIuc3R5bGUud2lkdGggOiAwICsgXCJQWFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHdpZHRobnVtO1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0bnVtID0gQ29jb3MyZEdhbWVDb250YWluZXIuc3R5bGUuaGVpZ2h0ID8gQ29jb3MyZEdhbWVDb250YWluZXIuc3R5bGUuaGVpZ2h0IDogMCArIFwiUFhcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0bnVtO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgbGV0IHRvcE51bSA9IENvY29zMmRHYW1lQ29udGFpbmVyLnN0eWxlLnBhZGRpbmdUb3AgPyBDb2NvczJkR2FtZUNvbnRhaW5lci5zdHlsZS5wYWRkaW5nVG9wIDogMCArIFwiUFhcIiA7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcE51bTtcclxuICAgICAgICAgICAgbGV0IGxlZnROdW0gPSBDb2NvczJkR2FtZUNvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA/IENvY29zMmRHYW1lQ29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0IDogMCArIFwiUFhcIjtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IGxlZnROdW07XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSB0aGlzLmlzU2hvdyA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdW50aW5nRG9tKCl7XHJcbiAgICAgICAgdGhpcy50aXBzQ29udGFpbmVyLmluc2VydEJlZm9yZSh0aGlzLnRpcHNUZXh0Q29udGVudCx0aGlzLnRpcHNDb250YWluZXIubGFzdENoaWxkKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbnNlcnRCZWZvcmUodGhpcy5mbG9hdEJ0bix0aGlzLmNvbnRhaW5lci5sYXN0Q2hpbGQpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmluc2VydEJlZm9yZSh0aGlzLmZsb2F0QnRuTWFzayx0aGlzLmNvbnRhaW5lci5sYXN0Q2hpbGQpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmluc2VydEJlZm9yZSh0aGlzLmdhbWVJZnJhbWUsdGhpcy5jb250YWluZXIubGFzdENoaWxkKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbnNlcnRCZWZvcmUodGhpcy50aXBzQ29udGFpbmVyLHRoaXMuY29udGFpbmVyLmxhc3RDaGlsZCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUodGhpcy5jb250YWluZXIsZG9jdW1lbnQuYm9keS5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEV2ZW50KCl7XHJcbiAgICAgICAgdGhpcy5jYW5DbGljayA9IHRydWU7ICAgIC8v5piv5ZCm6IO954K55Ye7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSAwO1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc01vYmlsZSl7ICAgICAvL+aJi+acuuerr1xyXG4gICAgICAgICAgICB0aGlzLmZsb2F0QnRuLm9udG91Y2hzdGFydCA9IHRoaXMudG91Y2hzdGFydC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1lbHNleyAgICAgICAgICAgICAgICAgICAvL3Bj56uvXHJcbiAgICAgICAgICAgIHRoaXMuZmxvYXRCdG4ub25tb3VzZWxlYXZlID0gdGhpcy5tb3VzZWxlYXZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZmxvYXRCdG4ub25tb3VzZWVudGVyID0gdGhpcy5tb3VzZWVudGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZmxvYXRCdG4ub25tb3VzZWRvd24gPSB0aGlzLm1vdXNlZG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhbWVJZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwoZXZlbnQpPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5Yqg6L295oiQ5YqfXCIsdGhpcy5pc1Nob3cpO1xyXG4gICAgICAgICAgICAvL+S4iuWIhlxyXG4gICAgICAgICAgICBpZih0aGlzLmlzU2hvdyl7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuV2ViVXBQb2ludCx0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sZmFsc2UpXHJcbiAgICAgICAgdGhpcy5nYW1lSWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLChldmVudCk9PntcclxuICAgICAgICB9LGZhbHNlKVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyU3R5bGUodHJ1ZSlcclxuICAgICAgICAgICAgLy8gaWYoKVxyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd1RpcHNPck5vKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgIG1vdXNlZG93bihldmVudCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmNhbkNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgbGV0IHN0YXJ0WSA9IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgLy/ojrflj5blhYPntKDnmoRsZWZ077yMdG9w5YC8XHJcbiAgICAgICAgbGV0IHN0YXJ0TGVmdCA9IHRoaXMuZmxvYXRCdG4ub2Zmc2V0TGVmdDtcclxuICAgICAgICBsZXQgc3RhcnRUb3AgPSB0aGlzLmZsb2F0QnRuLm9mZnNldFRvcDtcclxuXHJcbiAgICAgICAgdGhpcy5tYXhMZWZ0ID0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGggLSB0aGlzLmZsb2F0QnRuLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRoaXMubWF4VG9wID0gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0IC0gdGhpcy5mbG9hdEJ0bi5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZmxvYXRCdG5NYXNrLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gKChldmVudCk9PntcclxuICAgICAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKDEuMilcIjtcclxuICAgICAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiOyBcclxuICAgICAgICAgICAgbGV0IG1vdmVYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgICAgICAgbGV0IG1vdmVZID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgICAgICAgbGV0IHggPSBtb3ZlWCAtIHN0YXJ0WDtcclxuICAgICAgICAgICAgbGV0IHkgPSBtb3ZlWSAtIHN0YXJ0WTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0b3BOdW0gPSB5ICsgc3RhcnRUb3A7XHJcbiAgICAgICAgICAgIGxldCBsZWZ0TnVtID0geCArIHN0YXJ0TGVmdDtcclxuICAgICAgICAgICAgaWYodG9wTnVtIDwgMCB8fCBsZWZ0TnVtIDwgMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodG9wTnVtID4gdGhpcy5tYXhUb3AgfHwgbGVmdE51bSA+IHRoaXMubWF4TGVmdCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FuQ2xpY2sgPSBmYWxzZTsgICAvL+enu+WKqOi/h+eoi+S4reS4jeWPr+eCueWHu1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS50b3AgPSB0b3BOdW0gKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUubGVmdCA9IGxlZnROdW0gKyBcInB4XCI7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/muIXpmaTkuovku7ZcclxuICAgICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSAoKGV2ZW50KT0+e1xyXG4gICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZmxvYXRCdG5NYXNrLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgbGV0IGVuZFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbkNsaWNrID0gZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lIDwgMzAwIFxyXG4gICAgICAgICAgICBpZih0aGlzLmNhbkNsaWNrKXtcclxuICAgICAgICAgICAgICAgIGxldCBiYWNrVG9IYWxsID0gY29uZmlybShcIuehruiupOi/lOWbnua4uOaIj+Wkp+WOhe+8n1wiKTtcclxuICAgICAgICAgICAgICAgIGlmKGJhY2tUb0hhbGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVdlYlZpZXdIaWRlbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlICBtb3VzZWxlYXZlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKDEuMClcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLm9wYWNpdHkgPSBcIjAuNVwiO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG5NYXNrLm9ubW91c2Vtb3ZlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlICBtb3VzZWVudGVyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKDEuMilcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvdWNoc3RhcnQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5jYW5DbGljayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxLjIpXCI7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9ICBldmVudC50b3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgbGV0IHN0YXJ0WSA9ICBldmVudC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgLy/ojrflj5blhYPntKDnmoRsZWZ077yMdG9w5YC8XHJcbiAgICAgICAgbGV0IHN0YXJ0TGVmdCA9IHRoaXMuZmxvYXRCdG4ub2Zmc2V0TGVmdDtcclxuICAgICAgICBsZXQgc3RhcnRUb3AgPSB0aGlzLmZsb2F0QnRuLm9mZnNldFRvcDtcclxuXHJcbiAgICAgICAgdGhpcy5tYXhMZWZ0ID0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGggLSB0aGlzLmZsb2F0QnRuLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRoaXMubWF4VG9wID0gdGhpcy5jb250YWluZXIub2Zmc2V0SGVpZ2h0IC0gdGhpcy5mbG9hdEJ0bi5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZmxvYXRCdG5NYXNrLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZG9jdW1lbnQub250b3VjaG1vdmUgPSAoKGV2ZW50KT0+e1xyXG4gICAgICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGUoMS4yKVwiO1xyXG4gICAgICAgICAgICB0aGlzLmZsb2F0QnRuLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7IFxyXG4gICAgICAgICAgICBsZXQgbW92ZVggPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlWSA9IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuXHJcbiAgICAgICAgICAgIGxldCB4ID0gbW92ZVggLSBzdGFydFg7XHJcbiAgICAgICAgICAgIGxldCB5ID0gbW92ZVkgLSBzdGFydFk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9wTnVtID0geSArIHN0YXJ0VG9wO1xyXG4gICAgICAgICAgICBsZXQgbGVmdE51bSA9IHggKyBzdGFydExlZnQ7XHJcblxyXG4gICAgICAgICAgICBpZih0b3BOdW0gPCAwIHx8IGxlZnROdW0gPCAwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodG9wTnVtID4gdGhpcy5tYXhUb3AgfHwgbGVmdE51bSA+IHRoaXMubWF4TGVmdCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FuQ2xpY2sgPSBmYWxzZTsgICAvL+enu+WKqOi/h+eoi+S4reS4jeWPr+eCueWHu1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS50b3AgPSB0b3BOdW0gKyBcInB4XCIgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS5sZWZ0ID0gbGVmdE51bSArIFwicHhcIjtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL+a4hemZpOS6i+S7tlxyXG4gICAgICAgIGRvY3VtZW50Lm9udG91Y2hlbmQgPSBkb2N1bWVudC5vbnRvdWNoY2FuY2VsID0gKChldmVudCk9PntcclxuICAgICAgICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmZsb2F0QnRuTWFzay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxLjApXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUub3BhY2l0eSA9IFwiMC41XCI7XHJcbiAgICAgICAgICAgIGxldCBlbmRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgdGhpcy5jYW5DbGljayA9IGVuZFRpbWUgLSB0aGlzLnN0YXJ0VGltZSA8IDMwMCBcclxuICAgICAgICAgICAgaWYodGhpcy5jYW5DbGljayl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFja1RvSGFsbCA9IGNvbmZpcm0oXCLnoa7orqTov5Tlm57muLjmiI/lpKfljoXvvJ9cIik7XHJcbiAgICAgICAgICAgICAgICBpZihiYWNrVG9IYWxsKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVXZWJWaWV3SGlkZW4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEJ1dHRvbkltZygpe1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgIGlmKENDX0RFVil7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiaHR0cDovL3MuYmpma3doLmNvbS9cIiArIFwiQmFjay5wbmdcIjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IG5vd1VybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICBpZihub3dVcmwuaW5kZXhPZihcIj9cIik+LTEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IFN0ckFyciA9IG5vd1VybC5zcGxpdChcIj9cIik7XHJcbiAgICAgICAgICAgICAgICBub3dVcmwgPSBTdHJBcnJbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0ID0gbm93VXJsICsgXCJCYWNrLnBuZ1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VGlwc1VybCgpe1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgIGlmKENDX0RFVil7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiaHR0cDovL3MuYmpma3doLmNvbS9cIiArIFwieHVhbnpodWFuLnBuZ1wiO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbm93VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgICAgIGlmKG5vd1VybC5pbmRleE9mKFwiP1wiKT4tMSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgU3RyQXJyID0gbm93VXJsLnNwbGl0KFwiP1wiKTtcclxuICAgICAgICAgICAgICAgIG5vd1VybCA9IFN0ckFyclswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXN1bHQgPSBub3dVcmwgKyBcInh1YW56aHVhbi5wbmdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRpcHNUZXh0KCl7XHJcbiAgICAgICAgaWYoIXRoaXMubmVlZExhbmRzY2FwZSAmJiAhdGhpcy5uZWVkUG9ydHJhaXQpIHJldHVybjtcclxuICAgICAgICBsZXQgc3RyTWFwID0gdGhpcy5uZWVkUG9ydHJhaXQgPyBcIuivt+i9rOerluWxj1wiIDogXCLor7fovazmqKrlsY9cIjtcclxuICAgIH1cclxuXHJcbiAgICBnYW1lV2ViVmlld1Nob3codXJsOnN0cmluZyxuZWVkbGFuZD86Ym9vbGVhbixuZWVkUG9yPzpib29sZWFuKXtcclxuICAgICAgICBpZighdXJsKSByZXR1cm47XHJcbiAgICAgICAgaWYoQ0NfREVWKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDb2NvczJkR2FtZUNvbnRhaW5lclwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ov5vmuLjmiI/lhbPpl63lpKfljoXpn7PkuZBcclxuICAgICAgICBHbG9iYWwuQXVkaW8uc3RvcE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB0aGlzLmdhbWVJZnJhbWUuc2V0QXR0cmlidXRlKFwic3JjXCIsdXJsKTtcclxuICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5uZWVkTGFuZHNjYXBlID0gbmVlZGxhbmQgfHwgZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uZWVkUG9ydHJhaXQgPSBuZWVkUG9yIHx8IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTaG93VGlwc09yTm8oKTtcclxuICAgICAgICB0aGlzLnNldEJnSW1nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2FtZVdlYlZpZXdIaWRlbigpe1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBpZihDQ19ERVYpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkNvY29zMmRHYW1lQ29udGFpbmVyXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mkq3mlL7lpKfljoXpn7PkuZBcclxuICAgICAgICB2YXIgbW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGxheWVySW5mb01vZGVsXCIpXHJcbiAgICAgICAgaWYobW9kZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbC5Jbml0QmdtKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdhbWVJZnJhbWUuc2V0QXR0cmlidXRlKFwic3JjXCIsXCJcIik7XHJcbiAgICAgICAgdGhpcy5uZWVkTGFuZHNjYXBlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uZWVkUG9ydHJhaXQgPSBmYWxzZTtcclxuICAgICAgICAvL+S4i+WIhlxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5XZWJEb3duUG9pbnQsdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QmdJbWcoKXtcclxuICAgICAgICBpZih0aGlzLmZsb2F0QnV0dG9uQmcgIT0gXCJcIiAmJiB0aGlzLnRpcHNCZyAhPSBcIlwiKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ1dHRvbkJnID0gR2xvYmFsLmN1c3RvbUFwcC5nZXRXZWJGaWxlUGF0aChcIkJhY2sucG5nXCIpO1xyXG4gICAgICAgIHRoaXMudGlwc0JnID0gR2xvYmFsLmN1c3RvbUFwcC5nZXRXZWJGaWxlUGF0aChcInh1YW56aHVhbi5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7dGhpcy5mbG9hdEJ1dHRvbkJnfSlgO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7dGhpcy50aXBzQmd9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTaG93VGlwc09yTm8oKXsgICBcclxuICAgICAgICBpZighY2Muc3lzLmlzTW9iaWxlKSByZXR1cm47XHJcbiAgICAgICAgaWYoIXRoaXMubmVlZExhbmRzY2FwZSAmJiAhdGhpcy5uZWVkUG9ydHJhaXQpIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLm5lZWRQb3J0cmFpdCAmJiB0aGlzLmlzbGFuZCgpKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGlwc0NvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubmVlZExhbmRzY2FwZSAmJiB0aGlzLmlzUG9ydCgpKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGlwc0NvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZVRpcHNDb250YWluZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc2xhbmQoKXtcclxuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPiB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXNQb3J0KCl7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66ZyA6KaB5peL6L2sXHJcbiAgICBzaG93VGlwc0NvbnRhaW5lcigpe1xyXG4gICAgICAgIHRoaXMuZ2FtZUlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdGhpcy5mbG9hdEJ0bk1hc2suc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHRoaXMudGlwc1RleHRDb250ZW50LnRleHRDb250ZW50ID0gdGhpcy5nZXRUaXBzVGV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZqQ6JeP6ZyA6KaB5peL6L2sXHJcbiAgICBoaWRlVGlwc0NvbnRhaW5lcigpe1xyXG4gICAgICAgIHRoaXMuZ2FtZUlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHRoaXMuZmxvYXRCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB0aGlzLmZsb2F0QnRuTWFzay5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHRoaXMudGlwc0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgdGhpcy50aXBzVGV4dENvbnRlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgfVxyXG59Il19