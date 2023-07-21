

cc.Class({
    extends: cc.PageView,

    editor: CC_EDITOR && {
        menu: 'i18n:MAIN_MENU.component.ui/LoopPageView',
        help: 'i18n:COMPONENT.help_url.pageview',
        inspector: 'packages://inspector/inspectors/comps/ccpageview.js',
        executeInEditMode: false
    },

    ctor: function () {
        //首页临时
        this._firstTempPage = null;
        //真实的第一页
        this._firstPage = null;
        //末页临时
        this._lastTempPage = null;
        //真实的末页
        this._lastPage = null;
        //真实页面列表
        this._realPages = [];

        //玩家是否操作中
        this.isTouched = false;

        //自动播放开关
        this.isAutoScroll = false;
        //自动切页滚动间隔
        this.autoScrollDelayTime = 3;
        //切页用时
        this.autoScrollTime = 1;
        this._curAutoScrollCountDown = this.autoScrollDelayTime;
    },


    onLoad () {
        this.node.on('scroll-ended',this._checkLoop,this);
        //this.node.on("scrolling",this.onScrollViewScroll,this)
        this._super();
    },

    _checkLoop(){
        var pageCount = this._pages.length;
        if(this._curPageIdx == (pageCount - 1)){
            this._scrollToPage(1, false);
        }else if(this._curPageIdx == 0){
            this._scrollToPage(pageCount - 2,false);
        }
        //this._updateFirstTempPage()
       // this._updateLastTempPage()
    },

    /**
     * !#en Scroll PageView to index.
     * !#zh 滚动到指定页面
     * @method scrollToPage
     * @param {Number} idx index of page.
     * @param {Number} timeInSecond scrolling time
     */
    _scrollToPage: function (idx, timeInSecond) {
        if (idx < 0 || idx >= this._pages.length)
            return;
        this.onScrollViewScroll()
        
        timeInSecond = timeInSecond !== undefined ? timeInSecond : 0.3;
        this._curPageIdx = idx;
        this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);
        if (this.indicator) {
            this.indicator._changedState();
        }
    },


    _delFirstTempPage(){
        if(this._pages.length == 0) return;
        if(this._firstTempPage){
            if(this._firstTempPage == this._pages[0]){
                this._pages.shift();
            }
            this._firstTempPage.active = false;
            this._firstTempPage.setParent(null);
            this._firstTempPage.destroy();
            this._firstTempPage = null;
        }
    },

    _delLastTempPage(){
        if(this._pages.length == 0) return;
        if(this._lastTempPage){
            if(this._lastTempPage == this._pages[this._pages.length - 1]){
                this._pages.pop();
            }
            this._lastTempPage.active = false;
            this._lastTempPage.setParent(null);
            this._lastTempPage.destroy();
            this._lastTempPage = null;
        }
    },

    _addFirstTempPage(){
        if(!this._lastPage) return;
        this._firstTempPage = cc.instantiate(this._lastPage);
        this.content.addChild(this._firstTempPage);
        this._pages.splice(0, 0, this._firstTempPage);
    },

    _addLastTempPage(){
        if(!this._firstPage) return;
        this._lastTempPage = cc.instantiate(this._firstPage);
        this.content.addChild(this._lastTempPage);
        this._pages.push(this._lastTempPage);
    },

    _updateFirstLastPage(){
        if(this._pages.length > 0){
            this._firstPage = this._pages[0];
            this._lastPage = this._pages[this._pages.length - 1];
        }
    },

    // 初始化页面
    _initPages: function () {
        if (!this.content) { return; }

        this._delFirstTempPage();
        this._delLastTempPage();

        var children = this.content.children;
        for (var i = 0; i < children.length; ++i) {
            var page = children[i];
            if (this._pages.indexOf(page) >= 0) { continue; }
            this._pages.push(page);
            this._realPages.push(page);
        }
        
        this._updateFirstLastPage();
        
        this._addFirstTempPage();
        this._addLastTempPage();

        this._syncScrollDirection();
        this._syncSizeMode();
        this._updatePageView();
    },

    /**
     * !#en Returns current page index
     * !#zh 返回当前页面索引
     * @method getCurrentPageIndex
     * @returns {Number}
     */
    getCurrentPageIndex: function () {
        if(this._curPageIdx == 0){
            return this._realPages.length - 1;
        }else if(this._curPageIdx == (this._pages.length - 1)){
            return 0;
        }
        return this._curPageIdx - 1;
    },

    /**
     * !#en Set current page index
     * !#zh 设置当前页面索引
     * @method setCurrentPageIndex
     * @param {Number} index
     */
    setCurrentPageIndex: function (index) {
        index = Math.max(0,index);
        index = Math.min(this._realPages.length - 1,index); 
        this._scrollToPage(index + 1, true); 
    },

    /**
     * !#en Returns all pages of pageview
     * !#zh 返回视图中的所有页面
     * @method getPages
     * @returns {Node[]}
     */
    getPages: function () {
        return this._realPages;
    },

    /**
     * !#en At the end of the current page view to insert a new view
     * !#zh 在当前页面视图的尾部插入一个新视图
     * @method addPage
     * @param {Node} page
     */
    addPage: function (page) {
        if (!page || this._realPages.indexOf(page) !== -1 || !this.content)
            return;

        this._delFirstTempPage();
        this._delLastTempPage();

        this.content.addChild(page);
        this._pages.push(page);
        this._realPages.push(page);

        this._updateFirstLastPage();

        this._addFirstTempPage();
        this._addLastTempPage();

        this._updatePageView();
    },

    updatePage:function(page) 
    {
        if(!page || !this._pages)       
        {
            return
        }
        // for (let index = 0; index < this._pages.length; index++) {  // debug 偶现进子游戏时this._pages报null 作容错过滤
        //     let tmppage = this._pages[index];
        //     if(tmppage)
        //     {
        //         if(tmppage.uuid === page.uuid)
        //         {
        //             this._pages[index] = page
        //             break
        //         }

        //     }
            
        // }
        // for (let index = 0; index < this._realPages.length; index++) {
        //     let tmppage = this._realPages[index];
        //     if(tmppage)
        //     {
        //         if(tmppage.uuid === page.uuid)
        //         {
        //             this._realPages[index] = page
        //             break
        //         }

        //     }
            
        // }

        // if (this._lastTempPage) {
        //     if (this._lastTempPage.uuid === page.uuid) {
        //         this._lastTempPage = page
        //     }
        // }
        // if (this._firstTempPage) {
        //     if (this._firstTempPage.uuid === page.uuid) {
        //         this._firstTempPage = page
        //     }
        // }

        // if (this._firstPage) {
        //     if (this._firstPage.uuid === page.uuid) {
        //         this._firstPage = page
        //     }
        // }

        // if (this._lastPage) {
        //     if (this._lastPage.uuid === page.uuid) {
        //         this._lastPage = page
        //     }
        // }
    },

    /**
     * !#en Inserts a page in the specified location
     * !#zh 将页面插入指定位置中
     * @method insertPage
     * @param {Node} page
     * @param {Number} index
     */
    insertPage: function (page, index) {
        if (index < 0 || !page || this._realPages.indexOf(page) !== -1 || !this.content)
            return;

        var pageCount = this._realPages.length;
        if (index >= pageCount)
            this.addPage(page);
        else {
            this._delFirstTempPage();
            this._delLastTempPage();

            this._pages.splice(index, 0, page);
            this._realPages.splice(index, 0, page);
            this.content.addChild(page);

            this._updateFirstLastPage();

            this._addFirstTempPage();
            this._addLastTempPage();

            this._updatePageView();
        }
    },

    onScrollViewScroll: function(){
        let [preCurIndex, curIndex, nextCurIndex] = [this.getPageIndex(this._curPageIdx - 1), this.getPageIndex(this._curPageIdx), this.getPageIndex(this._curPageIdx + 1)];
        
        for(let i = 0; i< this._pages.length; i++){
            if (i == preCurIndex || i == curIndex || i==nextCurIndex){
                this._pages[i].children[0].active = true;
            }
            else{
                this._pages[i].children[0].active = false;
            }
        }
    },

    getPageIndex: function (index) {
        if (index > this._pages.length -1){
            return 1;
        }
        if (index < 0){
            return this._realPages.length;
        }
        return index;
    },

    /**
     * !#en Removes a page from PageView.
     * !#zh 移除指定页面
     * @method removePage
     * @param {Node} page
     */
    removePage: function (page) {
        if (!page || !this.content) return;
        var index = this._realPages.indexOf(page);
        if (index === -1) {
            cc.warnID(4300, page.name);
            return;
        }
        this.removePageAtIndex(index);
    },

    /**
     * !#en Removes a page at index of PageView.
     * !#zh 移除指定下标的页面
     * @method removePageAtIndex
     * @param {Number} index
     */
    removePageAtIndex: function (index) {
        if (index < 0 || index >= this._realPages.length) return;

        this._delFirstTempPage();
        this._delLastTempPage();

        var page = this._realPages[index];
        if (page) {
            this.content.removeChild(page);
            this._pages.splice(index, 1);
            this._realPages.splice(index, 1);
        }

        this._updateFirstLastPage();
        
        this._addFirstTempPage();
        this._addLastTempPage();

        this._updatePageView();
    },

    /**
     * !#en Removes all pages from PageView
     * !#zh 移除所有页面
     * @method removeAllPages
     */
    removeAllPages: function () {
        if (!this.content) { return; }
        this.isAutoScroll = false;

        var locPages = this._pages;
        for (var i = 0, len = locPages.length; i < len; i++)
            this.content.removeChild(locPages[i]);
        this._pages.length = 0;
        this._realPages.length = 0;

        this._delFirstTempPage();
        this._delLastTempPage();
        this._updatePageView();
    },

    /**
     * !#en Scroll PageView to index.
     * !#zh 滚动到指定页面
     * @method scrollToPage
     * @param {Number} idx index of page.
     * @param {Number} timeInSecond scrolling time
     */
    scrollToPage: function (idx, timeInSecond) {
        idx = Math.max(0,idx);
        idx = Math.min(this._realPages.length - 1,idx); 
        idx = idx + 1;
        timeInSecond = timeInSecond !== undefined ? timeInSecond : 0.3;
        this._curPageIdx = idx;
        this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);
        if (this.indicator) {
            this.indicator._changedState();
        }
    },

    _updatePageView: function () {
        this._super();
        this._scrollToPage(1,false);
    },

    _autoScrollToPage: function () {
        var bounceBackStarted = this._startBounceBackIfNeeded();
        var moveOffset = this._touchBeganPosition.sub(this._touchEndPosition);
        if (bounceBackStarted) {
            var dragDirection = this._getDragDirection(moveOffset);
            if (dragDirection === 0) {
                return;
            }
            if (dragDirection > 0) {
                this._curPageIdx = this._pages.length - 1;
            }
            else {
                this._curPageIdx = 0;
            }
            if (this.indicator) {
                this.indicator._changedState();
            }
        }
        else {
            var index = this._curPageIdx, nextIndex = index + this._getDragDirection(moveOffset);
            var timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);
            if (nextIndex < this._pages.length) {
                if (this._isScrollable(moveOffset, index, nextIndex)) {
                    this._scrollToPage(nextIndex, timeInSecond);
                    return;
                }
                else {
                    var touchMoveVelocity = this._calculateTouchMoveVelocity();
                    if (this._isQuicklyScrollable(touchMoveVelocity)) {
                        this._scrollToPage(nextIndex, timeInSecond);
                        return;
                    }
                }
            }
            this._scrollToPage(index, timeInSecond);
        }
    },

    _onTouchBegan: function (event, captureListeners) {
        this._super(event, captureListeners);
        this.isTouched = true;
        this._curAutoScrollCountDown = this.autoScrollDelayTime;
    },

    _onTouchMoved: function (event, captureListeners) {
        this._super(event, captureListeners);
        this.isTouched = true;
        this._curAutoScrollCountDown = this.autoScrollDelayTime;
        this.onScrollViewScroll()
    },

    _onTouchEnded: function (event, captureListeners) {
        this._super(event, captureListeners);
        this.isTouched = false;
        this._curAutoScrollCountDown = this.autoScrollDelayTime;
        this.onScrollViewScroll()
    },

    _onTouchCancelled: function (event, captureListeners) {
        this._super(event, captureListeners);
        this.isTouched = false;
        this._curAutoScrollCountDown = this.autoScrollDelayTime;
        this.onScrollViewScroll()
    },

    update(dt){
        this._super(dt);
        if(this._pages.length < 3) return;

        //循环逻辑
        if(!this.isTouched && !this._autoScrolling){
            this._checkLoop();
        }
    
        //自动滚动
        if(!this.isAutoScroll || this.isTouched) return;
        this._curAutoScrollCountDown -= dt;
        if(this._curAutoScrollCountDown <= 0){
            this._curAutoScrollCountDown += this.autoScrollDelayTime;
            var nextIndex = this._curPageIdx + 1;
            this._scrollToPage(nextIndex,this.autoScrollTime);
        }
    }

});
