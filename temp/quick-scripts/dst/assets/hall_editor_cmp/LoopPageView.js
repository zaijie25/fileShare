
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall_editor_cmp/LoopPageView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a8b2eKuyMtG1L1d1JveMRZN', 'LoopPageView');
// hall_editor_cmp/LoopPageView.js

"use strict";

cc.Class({
  "extends": cc.PageView,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/LoopPageView',
    help: 'i18n:COMPONENT.help_url.pageview',
    inspector: 'packages://inspector/inspectors/comps/ccpageview.js',
    executeInEditMode: false
  },
  ctor: function ctor() {
    //首页临时
    this._firstTempPage = null; //真实的第一页

    this._firstPage = null; //末页临时

    this._lastTempPage = null; //真实的末页

    this._lastPage = null; //真实页面列表

    this._realPages = []; //玩家是否操作中

    this.isTouched = false; //自动播放开关

    this.isAutoScroll = false; //自动切页滚动间隔

    this.autoScrollDelayTime = 3; //切页用时

    this.autoScrollTime = 1;
    this._curAutoScrollCountDown = this.autoScrollDelayTime;
  },
  onLoad: function onLoad() {
    this.node.on('scroll-ended', this._checkLoop, this); //this.node.on("scrolling",this.onScrollViewScroll,this)

    this._super();
  },
  _checkLoop: function _checkLoop() {
    var pageCount = this._pages.length;

    if (this._curPageIdx == pageCount - 1) {
      this._scrollToPage(1, false);
    } else if (this._curPageIdx == 0) {
      this._scrollToPage(pageCount - 2, false);
    } //this._updateFirstTempPage()
    // this._updateLastTempPage()

  },

  /**
   * !#en Scroll PageView to index.
   * !#zh 滚动到指定页面
   * @method scrollToPage
   * @param {Number} idx index of page.
   * @param {Number} timeInSecond scrolling time
   */
  _scrollToPage: function _scrollToPage(idx, timeInSecond) {
    if (idx < 0 || idx >= this._pages.length) return;
    this.onScrollViewScroll();
    timeInSecond = timeInSecond !== undefined ? timeInSecond : 0.3;
    this._curPageIdx = idx;
    this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);

    if (this.indicator) {
      this.indicator._changedState();
    }
  },
  _delFirstTempPage: function _delFirstTempPage() {
    if (this._pages.length == 0) return;

    if (this._firstTempPage) {
      if (this._firstTempPage == this._pages[0]) {
        this._pages.shift();
      }

      this._firstTempPage.active = false;

      this._firstTempPage.setParent(null);

      this._firstTempPage.destroy();

      this._firstTempPage = null;
    }
  },
  _delLastTempPage: function _delLastTempPage() {
    if (this._pages.length == 0) return;

    if (this._lastTempPage) {
      if (this._lastTempPage == this._pages[this._pages.length - 1]) {
        this._pages.pop();
      }

      this._lastTempPage.active = false;

      this._lastTempPage.setParent(null);

      this._lastTempPage.destroy();

      this._lastTempPage = null;
    }
  },
  _addFirstTempPage: function _addFirstTempPage() {
    if (!this._lastPage) return;
    this._firstTempPage = cc.instantiate(this._lastPage);
    this.content.addChild(this._firstTempPage);

    this._pages.splice(0, 0, this._firstTempPage);
  },
  _addLastTempPage: function _addLastTempPage() {
    if (!this._firstPage) return;
    this._lastTempPage = cc.instantiate(this._firstPage);
    this.content.addChild(this._lastTempPage);

    this._pages.push(this._lastTempPage);
  },
  _updateFirstLastPage: function _updateFirstLastPage() {
    if (this._pages.length > 0) {
      this._firstPage = this._pages[0];
      this._lastPage = this._pages[this._pages.length - 1];
    }
  },
  // 初始化页面
  _initPages: function _initPages() {
    if (!this.content) {
      return;
    }

    this._delFirstTempPage();

    this._delLastTempPage();

    var children = this.content.children;

    for (var i = 0; i < children.length; ++i) {
      var page = children[i];

      if (this._pages.indexOf(page) >= 0) {
        continue;
      }

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
  getCurrentPageIndex: function getCurrentPageIndex() {
    if (this._curPageIdx == 0) {
      return this._realPages.length - 1;
    } else if (this._curPageIdx == this._pages.length - 1) {
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
  setCurrentPageIndex: function setCurrentPageIndex(index) {
    index = Math.max(0, index);
    index = Math.min(this._realPages.length - 1, index);

    this._scrollToPage(index + 1, true);
  },

  /**
   * !#en Returns all pages of pageview
   * !#zh 返回视图中的所有页面
   * @method getPages
   * @returns {Node[]}
   */
  getPages: function getPages() {
    return this._realPages;
  },

  /**
   * !#en At the end of the current page view to insert a new view
   * !#zh 在当前页面视图的尾部插入一个新视图
   * @method addPage
   * @param {Node} page
   */
  addPage: function addPage(page) {
    if (!page || this._realPages.indexOf(page) !== -1 || !this.content) return;

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
  updatePage: function updatePage(page) {
    if (!page || !this._pages) {
      return;
    } // for (let index = 0; index < this._pages.length; index++) {  // debug 偶现进子游戏时this._pages报null 作容错过滤
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
  insertPage: function insertPage(page, index) {
    if (index < 0 || !page || this._realPages.indexOf(page) !== -1 || !this.content) return;
    var pageCount = this._realPages.length;
    if (index >= pageCount) this.addPage(page);else {
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
  onScrollViewScroll: function onScrollViewScroll() {
    var _ref = [this.getPageIndex(this._curPageIdx - 1), this.getPageIndex(this._curPageIdx), this.getPageIndex(this._curPageIdx + 1)],
        preCurIndex = _ref[0],
        curIndex = _ref[1],
        nextCurIndex = _ref[2];

    for (var i = 0; i < this._pages.length; i++) {
      if (i == preCurIndex || i == curIndex || i == nextCurIndex) {
        this._pages[i].children[0].active = true;
      } else {
        this._pages[i].children[0].active = false;
      }
    }
  },
  getPageIndex: function getPageIndex(index) {
    if (index > this._pages.length - 1) {
      return 1;
    }

    if (index < 0) {
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
  removePage: function removePage(page) {
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
  removePageAtIndex: function removePageAtIndex(index) {
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
  removeAllPages: function removeAllPages() {
    if (!this.content) {
      return;
    }

    this.isAutoScroll = false;
    var locPages = this._pages;

    for (var i = 0, len = locPages.length; i < len; i++) {
      this.content.removeChild(locPages[i]);
    }

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
  scrollToPage: function scrollToPage(idx, timeInSecond) {
    idx = Math.max(0, idx);
    idx = Math.min(this._realPages.length - 1, idx);
    idx = idx + 1;
    timeInSecond = timeInSecond !== undefined ? timeInSecond : 0.3;
    this._curPageIdx = idx;
    this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);

    if (this.indicator) {
      this.indicator._changedState();
    }
  },
  _updatePageView: function _updatePageView() {
    this._super();

    this._scrollToPage(1, false);
  },
  _autoScrollToPage: function _autoScrollToPage() {
    var bounceBackStarted = this._startBounceBackIfNeeded();

    var moveOffset = this._touchBeganPosition.sub(this._touchEndPosition);

    if (bounceBackStarted) {
      var dragDirection = this._getDragDirection(moveOffset);

      if (dragDirection === 0) {
        return;
      }

      if (dragDirection > 0) {
        this._curPageIdx = this._pages.length - 1;
      } else {
        this._curPageIdx = 0;
      }

      if (this.indicator) {
        this.indicator._changedState();
      }
    } else {
      var index = this._curPageIdx,
          nextIndex = index + this._getDragDirection(moveOffset);

      var timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);

      if (nextIndex < this._pages.length) {
        if (this._isScrollable(moveOffset, index, nextIndex)) {
          this._scrollToPage(nextIndex, timeInSecond);

          return;
        } else {
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
  _onTouchBegan: function _onTouchBegan(event, captureListeners) {
    this._super(event, captureListeners);

    this.isTouched = true;
    this._curAutoScrollCountDown = this.autoScrollDelayTime;
  },
  _onTouchMoved: function _onTouchMoved(event, captureListeners) {
    this._super(event, captureListeners);

    this.isTouched = true;
    this._curAutoScrollCountDown = this.autoScrollDelayTime;
    this.onScrollViewScroll();
  },
  _onTouchEnded: function _onTouchEnded(event, captureListeners) {
    this._super(event, captureListeners);

    this.isTouched = false;
    this._curAutoScrollCountDown = this.autoScrollDelayTime;
    this.onScrollViewScroll();
  },
  _onTouchCancelled: function _onTouchCancelled(event, captureListeners) {
    this._super(event, captureListeners);

    this.isTouched = false;
    this._curAutoScrollCountDown = this.autoScrollDelayTime;
    this.onScrollViewScroll();
  },
  update: function update(dt) {
    this._super(dt);

    if (this._pages.length < 3) return; //循环逻辑

    if (!this.isTouched && !this._autoScrolling) {
      this._checkLoop();
    } //自动滚动


    if (!this.isAutoScroll || this.isTouched) return;
    this._curAutoScrollCountDown -= dt;

    if (this._curAutoScrollCountDown <= 0) {
      this._curAutoScrollCountDown += this.autoScrollDelayTime;
      var nextIndex = this._curPageIdx + 1;

      this._scrollToPage(nextIndex, this.autoScrollTime);
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbF9lZGl0b3JfY21wXFxMb29wUGFnZVZpZXcuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIlBhZ2VWaWV3IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJpbnNwZWN0b3IiLCJleGVjdXRlSW5FZGl0TW9kZSIsImN0b3IiLCJfZmlyc3RUZW1wUGFnZSIsIl9maXJzdFBhZ2UiLCJfbGFzdFRlbXBQYWdlIiwiX2xhc3RQYWdlIiwiX3JlYWxQYWdlcyIsImlzVG91Y2hlZCIsImlzQXV0b1Njcm9sbCIsImF1dG9TY3JvbGxEZWxheVRpbWUiLCJhdXRvU2Nyb2xsVGltZSIsIl9jdXJBdXRvU2Nyb2xsQ291bnREb3duIiwib25Mb2FkIiwibm9kZSIsIm9uIiwiX2NoZWNrTG9vcCIsIl9zdXBlciIsInBhZ2VDb3VudCIsIl9wYWdlcyIsImxlbmd0aCIsIl9jdXJQYWdlSWR4IiwiX3Njcm9sbFRvUGFnZSIsImlkeCIsInRpbWVJblNlY29uZCIsIm9uU2Nyb2xsVmlld1Njcm9sbCIsInVuZGVmaW5lZCIsInNjcm9sbFRvT2Zmc2V0IiwiX21vdmVPZmZzZXRWYWx1ZSIsImluZGljYXRvciIsIl9jaGFuZ2VkU3RhdGUiLCJfZGVsRmlyc3RUZW1wUGFnZSIsInNoaWZ0IiwiYWN0aXZlIiwic2V0UGFyZW50IiwiZGVzdHJveSIsIl9kZWxMYXN0VGVtcFBhZ2UiLCJwb3AiLCJfYWRkRmlyc3RUZW1wUGFnZSIsImluc3RhbnRpYXRlIiwiY29udGVudCIsImFkZENoaWxkIiwic3BsaWNlIiwiX2FkZExhc3RUZW1wUGFnZSIsInB1c2giLCJfdXBkYXRlRmlyc3RMYXN0UGFnZSIsIl9pbml0UGFnZXMiLCJjaGlsZHJlbiIsImkiLCJwYWdlIiwiaW5kZXhPZiIsIl9zeW5jU2Nyb2xsRGlyZWN0aW9uIiwiX3N5bmNTaXplTW9kZSIsIl91cGRhdGVQYWdlVmlldyIsImdldEN1cnJlbnRQYWdlSW5kZXgiLCJzZXRDdXJyZW50UGFnZUluZGV4IiwiaW5kZXgiLCJNYXRoIiwibWF4IiwibWluIiwiZ2V0UGFnZXMiLCJhZGRQYWdlIiwidXBkYXRlUGFnZSIsImluc2VydFBhZ2UiLCJnZXRQYWdlSW5kZXgiLCJwcmVDdXJJbmRleCIsImN1ckluZGV4IiwibmV4dEN1ckluZGV4IiwicmVtb3ZlUGFnZSIsIndhcm5JRCIsIm5hbWUiLCJyZW1vdmVQYWdlQXRJbmRleCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQWxsUGFnZXMiLCJsb2NQYWdlcyIsImxlbiIsInNjcm9sbFRvUGFnZSIsIl9hdXRvU2Nyb2xsVG9QYWdlIiwiYm91bmNlQmFja1N0YXJ0ZWQiLCJfc3RhcnRCb3VuY2VCYWNrSWZOZWVkZWQiLCJtb3ZlT2Zmc2V0IiwiX3RvdWNoQmVnYW5Qb3NpdGlvbiIsInN1YiIsIl90b3VjaEVuZFBvc2l0aW9uIiwiZHJhZ0RpcmVjdGlvbiIsIl9nZXREcmFnRGlyZWN0aW9uIiwibmV4dEluZGV4IiwicGFnZVR1cm5pbmdTcGVlZCIsImFicyIsIl9pc1Njcm9sbGFibGUiLCJ0b3VjaE1vdmVWZWxvY2l0eSIsIl9jYWxjdWxhdGVUb3VjaE1vdmVWZWxvY2l0eSIsIl9pc1F1aWNrbHlTY3JvbGxhYmxlIiwiX29uVG91Y2hCZWdhbiIsImV2ZW50IiwiY2FwdHVyZUxpc3RlbmVycyIsIl9vblRvdWNoTW92ZWQiLCJfb25Ub3VjaEVuZGVkIiwiX29uVG91Y2hDYW5jZWxsZWQiLCJ1cGRhdGUiLCJkdCIsIl9hdXRvU2Nyb2xsaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsUUFEUDtBQUdMQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFLDBDQURXO0FBRWpCQyxJQUFBQSxJQUFJLEVBQUUsa0NBRlc7QUFHakJDLElBQUFBLFNBQVMsRUFBRSxxREFITTtBQUlqQkMsSUFBQUEsaUJBQWlCLEVBQUU7QUFKRixHQUhoQjtB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O0FBQ0gsR0E3Y0k7QUErY0x5RSxFQUFBQSxpQkFBaUIsRUFBRSwyQkFBVUosS0FBVixFQUFpQkMsZ0JBQWpCLEVBQW1DO0FBQ2xELFNBQUs5RSxNQUFMLENBQVk2RSxLQUFaLEVBQW1CQyxnQkFBbkI7O0FBQ0EsU0FBS3ZGLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLSSx1QkFBTCxHQUErQixLQUFLRixtQkFBcEM7QUFDQSxTQUFLZSxrQkFBTDtBQUNILEdBcGRJO0FBc2RMMEUsRUFBQUEsTUF0ZEssa0JBc2RFQyxFQXRkRixFQXNkSztBQUNOLFNBQUtuRixNQUFMLENBQVltRixFQUFaOztBQUNBLFFBQUcsS0FBS2pGLE1BQUwsQ0FBWUMsTUFBWixHQUFxQixDQUF4QixFQUEyQixPQUZyQixDQUlOOztBQUNBLFFBQUcsQ0FBQyxLQUFLWixTQUFOLElBQW1CLENBQUMsS0FBSzZGLGNBQTVCLEVBQTJDO0FBQ3ZDLFdBQUtyRixVQUFMO0FBQ0gsS0FQSyxDQVNOOzs7QUFDQSxRQUFHLENBQUMsS0FBS1AsWUFBTixJQUFzQixLQUFLRCxTQUE5QixFQUF5QztBQUN6QyxTQUFLSSx1QkFBTCxJQUFnQ3dGLEVBQWhDOztBQUNBLFFBQUcsS0FBS3hGLHVCQUFMLElBQWdDLENBQW5DLEVBQXFDO0FBQ2pDLFdBQUtBLHVCQUFMLElBQWdDLEtBQUtGLG1CQUFyQztBQUNBLFVBQUk0RSxTQUFTLEdBQUcsS0FBS2pFLFdBQUwsR0FBbUIsQ0FBbkM7O0FBQ0EsV0FBS0MsYUFBTCxDQUFtQmdFLFNBQW5CLEVBQTZCLEtBQUszRSxjQUFsQztBQUNIO0FBQ0o7QUF2ZUksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5QYWdlVmlldyxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC51aS9Mb29wUGFnZVZpZXcnLFxyXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5wYWdldmlldycsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9jY3BhZ2V2aWV3LmpzJyxcclxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v6aaW6aG15Li05pe2XHJcbiAgICAgICAgdGhpcy5fZmlyc3RUZW1wUGFnZSA9IG51bGw7XHJcbiAgICAgICAgLy/nnJ/lrp7nmoTnrKzkuIDpobVcclxuICAgICAgICB0aGlzLl9maXJzdFBhZ2UgPSBudWxsO1xyXG4gICAgICAgIC8v5pyr6aG15Li05pe2XHJcbiAgICAgICAgdGhpcy5fbGFzdFRlbXBQYWdlID0gbnVsbDtcclxuICAgICAgICAvL+ecn+WunueahOacq+mhtVxyXG4gICAgICAgIHRoaXMuX2xhc3RQYWdlID0gbnVsbDtcclxuICAgICAgICAvL+ecn+WunumhtemdouWIl+ihqFxyXG4gICAgICAgIHRoaXMuX3JlYWxQYWdlcyA9IFtdO1xyXG5cclxuICAgICAgICAvL+eOqeWutuaYr+WQpuaTjeS9nOS4rVxyXG4gICAgICAgIHRoaXMuaXNUb3VjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v6Ieq5Yqo5pKt5pS+5byA5YWzXHJcbiAgICAgICAgdGhpcy5pc0F1dG9TY3JvbGwgPSBmYWxzZTtcclxuICAgICAgICAvL+iHquWKqOWIh+mhtea7muWKqOmXtOmalFxyXG4gICAgICAgIHRoaXMuYXV0b1Njcm9sbERlbGF5VGltZSA9IDM7XHJcbiAgICAgICAgLy/liIfpobXnlKjml7ZcclxuICAgICAgICB0aGlzLmF1dG9TY3JvbGxUaW1lID0gMTtcclxuICAgICAgICB0aGlzLl9jdXJBdXRvU2Nyb2xsQ291bnREb3duID0gdGhpcy5hdXRvU2Nyb2xsRGVsYXlUaW1lO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oJ3Njcm9sbC1lbmRlZCcsdGhpcy5fY2hlY2tMb29wLHRoaXMpO1xyXG4gICAgICAgIC8vdGhpcy5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsdGhpcy5vblNjcm9sbFZpZXdTY3JvbGwsdGhpcylcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY2hlY2tMb29wKCl7XHJcbiAgICAgICAgdmFyIHBhZ2VDb3VudCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuICAgICAgICBpZih0aGlzLl9jdXJQYWdlSWR4ID09IChwYWdlQ291bnQgLSAxKSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFRvUGFnZSgxLCBmYWxzZSk7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5fY3VyUGFnZUlkeCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVG9QYWdlKHBhZ2VDb3VudCAtIDIsZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuX3VwZGF0ZUZpcnN0VGVtcFBhZ2UoKVxyXG4gICAgICAgLy8gdGhpcy5fdXBkYXRlTGFzdFRlbXBQYWdlKClcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNjcm9sbCBQYWdlVmlldyB0byBpbmRleC5cclxuICAgICAqICEjemgg5rua5Yqo5Yiw5oyH5a6a6aG16Z2iXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvUGFnZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBpbmRleCBvZiBwYWdlLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVJblNlY29uZCBzY3JvbGxpbmcgdGltZVxyXG4gICAgICovXHJcbiAgICBfc2Nyb2xsVG9QYWdlOiBmdW5jdGlvbiAoaWR4LCB0aW1lSW5TZWNvbmQpIHtcclxuICAgICAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fcGFnZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGwoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRpbWVJblNlY29uZCA9IHRpbWVJblNlY29uZCAhPT0gdW5kZWZpbmVkID8gdGltZUluU2Vjb25kIDogMC4zO1xyXG4gICAgICAgIHRoaXMuX2N1clBhZ2VJZHggPSBpZHg7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUb09mZnNldCh0aGlzLl9tb3ZlT2Zmc2V0VmFsdWUoaWR4KSwgdGltZUluU2Vjb25kLCB0cnVlKTtcclxuICAgICAgICBpZiAodGhpcy5pbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3IuX2NoYW5nZWRTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIF9kZWxGaXJzdFRlbXBQYWdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fcGFnZXMubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLl9maXJzdFRlbXBQYWdlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fZmlyc3RUZW1wUGFnZSA9PSB0aGlzLl9wYWdlc1swXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0VGVtcFBhZ2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0VGVtcFBhZ2Uuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLl9maXJzdFRlbXBQYWdlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyc3RUZW1wUGFnZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfZGVsTGFzdFRlbXBQYWdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fcGFnZXMubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLl9sYXN0VGVtcFBhZ2Upe1xyXG4gICAgICAgICAgICBpZih0aGlzLl9sYXN0VGVtcFBhZ2UgPT0gdGhpcy5fcGFnZXNbdGhpcy5fcGFnZXMubGVuZ3RoIC0gMV0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZXMucG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbGFzdFRlbXBQYWdlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0VGVtcFBhZ2Uuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0VGVtcFBhZ2UuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0VGVtcFBhZ2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2FkZEZpcnN0VGVtcFBhZ2UoKXtcclxuICAgICAgICBpZighdGhpcy5fbGFzdFBhZ2UpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9maXJzdFRlbXBQYWdlID0gY2MuaW5zdGFudGlhdGUodGhpcy5fbGFzdFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZCh0aGlzLl9maXJzdFRlbXBQYWdlKTtcclxuICAgICAgICB0aGlzLl9wYWdlcy5zcGxpY2UoMCwgMCwgdGhpcy5fZmlyc3RUZW1wUGFnZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9hZGRMYXN0VGVtcFBhZ2UoKXtcclxuICAgICAgICBpZighdGhpcy5fZmlyc3RQYWdlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fbGFzdFRlbXBQYWdlID0gY2MuaW5zdGFudGlhdGUodGhpcy5fZmlyc3RQYWdlKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQodGhpcy5fbGFzdFRlbXBQYWdlKTtcclxuICAgICAgICB0aGlzLl9wYWdlcy5wdXNoKHRoaXMuX2xhc3RUZW1wUGFnZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVGaXJzdExhc3RQYWdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fcGFnZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0UGFnZSA9IHRoaXMuX3BhZ2VzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0UGFnZSA9IHRoaXMuX3BhZ2VzW3RoaXMuX3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Yid5aeL5YyW6aG16Z2iXHJcbiAgICBfaW5pdFBhZ2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RlbEZpcnN0VGVtcFBhZ2UoKTtcclxuICAgICAgICB0aGlzLl9kZWxMYXN0VGVtcFBhZ2UoKTtcclxuXHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5jb250ZW50LmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2UgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhZ2VzLmluZGV4T2YocGFnZSkgPj0gMCkgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICB0aGlzLl9wYWdlcy5wdXNoKHBhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWFsUGFnZXMucHVzaChwYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRmlyc3RMYXN0UGFnZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2FkZEZpcnN0VGVtcFBhZ2UoKTtcclxuICAgICAgICB0aGlzLl9hZGRMYXN0VGVtcFBhZ2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3luY1Njcm9sbERpcmVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX3N5bmNTaXplTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVBhZ2VWaWV3KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIGN1cnJlbnQgcGFnZSBpbmRleFxyXG4gICAgICogISN6aCDov5Tlm57lvZPliY3pobXpnaLntKLlvJVcclxuICAgICAqIEBtZXRob2QgZ2V0Q3VycmVudFBhZ2VJbmRleFxyXG4gICAgICogQHJldHVybnMge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VycmVudFBhZ2VJbmRleDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKHRoaXMuX2N1clBhZ2VJZHggPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFsUGFnZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLl9jdXJQYWdlSWR4ID09ICh0aGlzLl9wYWdlcy5sZW5ndGggLSAxKSl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyUGFnZUlkeCAtIDE7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgY3VycmVudCBwYWdlIGluZGV4XHJcbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjemhtemdoue0ouW8lVxyXG4gICAgICogQG1ldGhvZCBzZXRDdXJyZW50UGFnZUluZGV4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgc2V0Q3VycmVudFBhZ2VJbmRleDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgaW5kZXggPSBNYXRoLm1heCgwLGluZGV4KTtcclxuICAgICAgICBpbmRleCA9IE1hdGgubWluKHRoaXMuX3JlYWxQYWdlcy5sZW5ndGggLSAxLGluZGV4KTsgXHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsVG9QYWdlKGluZGV4ICsgMSwgdHJ1ZSk7IFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyBhbGwgcGFnZXMgb2YgcGFnZXZpZXdcclxuICAgICAqICEjemgg6L+U5Zue6KeG5Zu+5Lit55qE5omA5pyJ6aG16Z2iXHJcbiAgICAgKiBAbWV0aG9kIGdldFBhZ2VzXHJcbiAgICAgKiBAcmV0dXJucyB7Tm9kZVtdfVxyXG4gICAgICovXHJcbiAgICBnZXRQYWdlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFsUGFnZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBdCB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHBhZ2UgdmlldyB0byBpbnNlcnQgYSBuZXcgdmlld1xyXG4gICAgICogISN6aCDlnKjlvZPliY3pobXpnaLop4blm77nmoTlsL7pg6jmj5LlhaXkuIDkuKrmlrDop4blm75cclxuICAgICAqIEBtZXRob2QgYWRkUGFnZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBwYWdlXHJcbiAgICAgKi9cclxuICAgIGFkZFBhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XHJcbiAgICAgICAgaWYgKCFwYWdlIHx8IHRoaXMuX3JlYWxQYWdlcy5pbmRleE9mKHBhZ2UpICE9PSAtMSB8fCAhdGhpcy5jb250ZW50KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2RlbEZpcnN0VGVtcFBhZ2UoKTtcclxuICAgICAgICB0aGlzLl9kZWxMYXN0VGVtcFBhZ2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKHBhZ2UpO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VzLnB1c2gocGFnZSk7XHJcbiAgICAgICAgdGhpcy5fcmVhbFBhZ2VzLnB1c2gocGFnZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUZpcnN0TGFzdFBhZ2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWRkRmlyc3RUZW1wUGFnZSgpO1xyXG4gICAgICAgIHRoaXMuX2FkZExhc3RUZW1wUGFnZSgpO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVQYWdlVmlldygpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVQYWdlOmZ1bmN0aW9uKHBhZ2UpIFxyXG4gICAge1xyXG4gICAgICAgIGlmKCFwYWdlIHx8ICF0aGlzLl9wYWdlcykgICAgICAgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX3BhZ2VzLmxlbmd0aDsgaW5kZXgrKykgeyAgLy8gZGVidWcg5YG2546w6L+b5a2Q5ri45oiP5pe2dGhpcy5fcGFnZXPmiqVudWxsIOS9nOWuuemUmei/h+a7pFxyXG4gICAgICAgIC8vICAgICBsZXQgdG1wcGFnZSA9IHRoaXMuX3BhZ2VzW2luZGV4XTtcclxuICAgICAgICAvLyAgICAgaWYodG1wcGFnZSlcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYodG1wcGFnZS51dWlkID09PSBwYWdlLnV1aWQpXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5fcGFnZXNbaW5kZXhdID0gcGFnZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fcmVhbFBhZ2VzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgdG1wcGFnZSA9IHRoaXMuX3JlYWxQYWdlc1tpbmRleF07XHJcbiAgICAgICAgLy8gICAgIGlmKHRtcHBhZ2UpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGlmKHRtcHBhZ2UudXVpZCA9PT0gcGFnZS51dWlkKVxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuX3JlYWxQYWdlc1tpbmRleF0gPSBwYWdlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5fbGFzdFRlbXBQYWdlKSB7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLl9sYXN0VGVtcFBhZ2UudXVpZCA9PT0gcGFnZS51dWlkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9sYXN0VGVtcFBhZ2UgPSBwYWdlXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX2ZpcnN0VGVtcFBhZ2UpIHtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMuX2ZpcnN0VGVtcFBhZ2UudXVpZCA9PT0gcGFnZS51dWlkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9maXJzdFRlbXBQYWdlID0gcGFnZVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5fZmlyc3RQYWdlKSB7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLl9maXJzdFBhZ2UudXVpZCA9PT0gcGFnZS51dWlkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9maXJzdFBhZ2UgPSBwYWdlXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGlmICh0aGlzLl9sYXN0UGFnZSkge1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5fbGFzdFBhZ2UudXVpZCA9PT0gcGFnZS51dWlkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9sYXN0UGFnZSA9IHBhZ2VcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEluc2VydHMgYSBwYWdlIGluIHRoZSBzcGVjaWZpZWQgbG9jYXRpb25cclxuICAgICAqICEjemgg5bCG6aG16Z2i5o+S5YWl5oyH5a6a5L2N572u5LitXHJcbiAgICAgKiBAbWV0aG9kIGluc2VydFBhZ2VcclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gcGFnZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XHJcbiAgICAgKi9cclxuICAgIGluc2VydFBhZ2U6IGZ1bmN0aW9uIChwYWdlLCBpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgIXBhZ2UgfHwgdGhpcy5fcmVhbFBhZ2VzLmluZGV4T2YocGFnZSkgIT09IC0xIHx8ICF0aGlzLmNvbnRlbnQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIHBhZ2VDb3VudCA9IHRoaXMuX3JlYWxQYWdlcy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGluZGV4ID49IHBhZ2VDb3VudClcclxuICAgICAgICAgICAgdGhpcy5hZGRQYWdlKHBhZ2UpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWxGaXJzdFRlbXBQYWdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbExhc3RUZW1wUGFnZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcGFnZXMuc3BsaWNlKGluZGV4LCAwLCBwYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVhbFBhZ2VzLnNwbGljZShpbmRleCwgMCwgcGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChwYWdlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZpcnN0TGFzdFBhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FkZEZpcnN0VGVtcFBhZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fYWRkTGFzdFRlbXBQYWdlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVQYWdlVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25TY3JvbGxWaWV3U2Nyb2xsOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBbcHJlQ3VySW5kZXgsIGN1ckluZGV4LCBuZXh0Q3VySW5kZXhdID0gW3RoaXMuZ2V0UGFnZUluZGV4KHRoaXMuX2N1clBhZ2VJZHggLSAxKSwgdGhpcy5nZXRQYWdlSW5kZXgodGhpcy5fY3VyUGFnZUlkeCksIHRoaXMuZ2V0UGFnZUluZGV4KHRoaXMuX2N1clBhZ2VJZHggKyAxKV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaTwgdGhpcy5fcGFnZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBwcmVDdXJJbmRleCB8fCBpID09IGN1ckluZGV4IHx8IGk9PW5leHRDdXJJbmRleCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlc1tpXS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWdlc1tpXS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UGFnZUluZGV4OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLl9wYWdlcy5sZW5ndGggLTEpe1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFsUGFnZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmVzIGEgcGFnZSBmcm9tIFBhZ2VWaWV3LlxyXG4gICAgICogISN6aCDnp7vpmaTmjIflrprpobXpnaJcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlUGFnZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBwYWdlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVBhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XHJcbiAgICAgICAgaWYgKCFwYWdlIHx8ICF0aGlzLmNvbnRlbnQpIHJldHVybjtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9yZWFsUGFnZXMuaW5kZXhPZihwYWdlKTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm5JRCg0MzAwLCBwYWdlLm5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlUGFnZUF0SW5kZXgoaW5kZXgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVtb3ZlcyBhIHBhZ2UgYXQgaW5kZXggb2YgUGFnZVZpZXcuXHJcbiAgICAgKiAhI3poIOenu+mZpOaMh+WumuS4i+agh+eahOmhtemdolxyXG4gICAgICogQG1ldGhvZCByZW1vdmVQYWdlQXRJbmRleFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVBhZ2VBdEluZGV4OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuX3JlYWxQYWdlcy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fZGVsRmlyc3RUZW1wUGFnZSgpO1xyXG4gICAgICAgIHRoaXMuX2RlbExhc3RUZW1wUGFnZSgpO1xyXG5cclxuICAgICAgICB2YXIgcGFnZSA9IHRoaXMuX3JlYWxQYWdlc1tpbmRleF07XHJcbiAgICAgICAgaWYgKHBhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUNoaWxkKHBhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9wYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWFsUGFnZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUZpcnN0TGFzdFBhZ2UoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9hZGRGaXJzdFRlbXBQYWdlKCk7XHJcbiAgICAgICAgdGhpcy5fYWRkTGFzdFRlbXBQYWdlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVBhZ2VWaWV3KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmVzIGFsbCBwYWdlcyBmcm9tIFBhZ2VWaWV3XHJcbiAgICAgKiAhI3poIOenu+mZpOaJgOaciemhtemdolxyXG4gICAgICogQG1ldGhvZCByZW1vdmVBbGxQYWdlc1xyXG4gICAgICovXHJcbiAgICByZW1vdmVBbGxQYWdlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250ZW50KSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuaXNBdXRvU2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciBsb2NQYWdlcyA9IHRoaXMuX3BhZ2VzO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsb2NQYWdlcy5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUNoaWxkKGxvY1BhZ2VzW2ldKTtcclxuICAgICAgICB0aGlzLl9wYWdlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX3JlYWxQYWdlcy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9kZWxGaXJzdFRlbXBQYWdlKCk7XHJcbiAgICAgICAgdGhpcy5fZGVsTGFzdFRlbXBQYWdlKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUGFnZVZpZXcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNjcm9sbCBQYWdlVmlldyB0byBpbmRleC5cclxuICAgICAqICEjemgg5rua5Yqo5Yiw5oyH5a6a6aG16Z2iXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvUGFnZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBpbmRleCBvZiBwYWdlLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVJblNlY29uZCBzY3JvbGxpbmcgdGltZVxyXG4gICAgICovXHJcbiAgICBzY3JvbGxUb1BhZ2U6IGZ1bmN0aW9uIChpZHgsIHRpbWVJblNlY29uZCkge1xyXG4gICAgICAgIGlkeCA9IE1hdGgubWF4KDAsaWR4KTtcclxuICAgICAgICBpZHggPSBNYXRoLm1pbih0aGlzLl9yZWFsUGFnZXMubGVuZ3RoIC0gMSxpZHgpOyBcclxuICAgICAgICBpZHggPSBpZHggKyAxO1xyXG4gICAgICAgIHRpbWVJblNlY29uZCA9IHRpbWVJblNlY29uZCAhPT0gdW5kZWZpbmVkID8gdGltZUluU2Vjb25kIDogMC4zO1xyXG4gICAgICAgIHRoaXMuX2N1clBhZ2VJZHggPSBpZHg7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUb09mZnNldCh0aGlzLl9tb3ZlT2Zmc2V0VmFsdWUoaWR4KSwgdGltZUluU2Vjb25kLCB0cnVlKTtcclxuICAgICAgICBpZiAodGhpcy5pbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3IuX2NoYW5nZWRTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVBhZ2VWaWV3OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxUb1BhZ2UoMSxmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9hdXRvU2Nyb2xsVG9QYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJvdW5jZUJhY2tTdGFydGVkID0gdGhpcy5fc3RhcnRCb3VuY2VCYWNrSWZOZWVkZWQoKTtcclxuICAgICAgICB2YXIgbW92ZU9mZnNldCA9IHRoaXMuX3RvdWNoQmVnYW5Qb3NpdGlvbi5zdWIodGhpcy5fdG91Y2hFbmRQb3NpdGlvbik7XHJcbiAgICAgICAgaWYgKGJvdW5jZUJhY2tTdGFydGVkKSB7XHJcbiAgICAgICAgICAgIHZhciBkcmFnRGlyZWN0aW9uID0gdGhpcy5fZ2V0RHJhZ0RpcmVjdGlvbihtb3ZlT2Zmc2V0KTtcclxuICAgICAgICAgICAgaWYgKGRyYWdEaXJlY3Rpb24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZHJhZ0RpcmVjdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1clBhZ2VJZHggPSB0aGlzLl9wYWdlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyUGFnZUlkeCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kaWNhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRvci5fY2hhbmdlZFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2N1clBhZ2VJZHgsIG5leHRJbmRleCA9IGluZGV4ICsgdGhpcy5fZ2V0RHJhZ0RpcmVjdGlvbihtb3ZlT2Zmc2V0KTtcclxuICAgICAgICAgICAgdmFyIHRpbWVJblNlY29uZCA9IHRoaXMucGFnZVR1cm5pbmdTcGVlZCAqIE1hdGguYWJzKGluZGV4IC0gbmV4dEluZGV4KTtcclxuICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IHRoaXMuX3BhZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzU2Nyb2xsYWJsZShtb3ZlT2Zmc2V0LCBpbmRleCwgbmV4dEluZGV4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbFRvUGFnZShuZXh0SW5kZXgsIHRpbWVJblNlY29uZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoTW92ZVZlbG9jaXR5ID0gdGhpcy5fY2FsY3VsYXRlVG91Y2hNb3ZlVmVsb2NpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNRdWlja2x5U2Nyb2xsYWJsZSh0b3VjaE1vdmVWZWxvY2l0eSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVG9QYWdlKG5leHRJbmRleCwgdGltZUluU2Vjb25kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxUb1BhZ2UoaW5kZXgsIHRpbWVJblNlY29uZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcihldmVudCwgY2FwdHVyZUxpc3RlbmVycyk7XHJcbiAgICAgICAgdGhpcy5pc1RvdWNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2N1ckF1dG9TY3JvbGxDb3VudERvd24gPSB0aGlzLmF1dG9TY3JvbGxEZWxheVRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoTW92ZWQ6IGZ1bmN0aW9uIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKTtcclxuICAgICAgICB0aGlzLmlzVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY3VyQXV0b1Njcm9sbENvdW50RG93biA9IHRoaXMuYXV0b1Njcm9sbERlbGF5VGltZTtcclxuICAgICAgICB0aGlzLm9uU2Nyb2xsVmlld1Njcm9sbCgpXHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoRW5kZWQ6IGZ1bmN0aW9uIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKTtcclxuICAgICAgICB0aGlzLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2N1ckF1dG9TY3JvbGxDb3VudERvd24gPSB0aGlzLmF1dG9TY3JvbGxEZWxheVRpbWU7XHJcbiAgICAgICAgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGwoKVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaENhbmNlbGxlZDogZnVuY3Rpb24gKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpO1xyXG4gICAgICAgIHRoaXMuaXNUb3VjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fY3VyQXV0b1Njcm9sbENvdW50RG93biA9IHRoaXMuYXV0b1Njcm9sbERlbGF5VGltZTtcclxuICAgICAgICB0aGlzLm9uU2Nyb2xsVmlld1Njcm9sbCgpXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZShkdCl7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuX3BhZ2VzLmxlbmd0aCA8IDMpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy/lvqrnjq/pgLvovpFcclxuICAgICAgICBpZighdGhpcy5pc1RvdWNoZWQgJiYgIXRoaXMuX2F1dG9TY3JvbGxpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLl9jaGVja0xvb3AoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+iHquWKqOa7muWKqFxyXG4gICAgICAgIGlmKCF0aGlzLmlzQXV0b1Njcm9sbCB8fCB0aGlzLmlzVG91Y2hlZCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2N1ckF1dG9TY3JvbGxDb3VudERvd24gLT0gZHQ7XHJcbiAgICAgICAgaWYodGhpcy5fY3VyQXV0b1Njcm9sbENvdW50RG93biA8PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fY3VyQXV0b1Njcm9sbENvdW50RG93biArPSB0aGlzLmF1dG9TY3JvbGxEZWxheVRpbWU7XHJcbiAgICAgICAgICAgIHZhciBuZXh0SW5kZXggPSB0aGlzLl9jdXJQYWdlSWR4ICsgMTtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVG9QYWdlKG5leHRJbmRleCx0aGlzLmF1dG9TY3JvbGxUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuIl19