
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall_editor_cmp/SwitchNodeToggle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7346d6kRZNeICqjQlsdEcn', 'SwitchNodeToggle');
// hall_editor_cmp/SwitchNodeToggle.js

"use strict";

cc.Class({
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/SwitchNodeToggle',
    requireComponent: cc.Toggle,
    executeInEditMode: true
  },
  properties: {
    checked: cc.Node,
    unChecked: cc.Node
  },

  /**
   * 加载
   */
  onLoad: function onLoad() {
    this.toggle = this.node.getComponent(cc.Toggle);
    this.node.on('toggle', this.updateCheck, this);
    this.updateCheck();
  },
  update: function update(dt) {
    this.updateCheck();
  },
  updateCheck: function updateCheck() {
    if (this.checked.active != this.toggle.isChecked) {
      this.checked.active = this.toggle.isChecked;
    }

    if (this.unChecked.active == this.toggle.isChecked) {
      this.unChecked.active = !this.toggle.isChecked;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbF9lZGl0b3JfY21wXFxTd2l0Y2hOb2RlVG9nZ2xlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwicmVxdWlyZUNvbXBvbmVudCIsIlRvZ2dsZSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicHJvcGVydGllcyIsImNoZWNrZWQiLCJOb2RlIiwidW5DaGVja2VkIiwib25Mb2FkIiwidG9nZ2xlIiwibm9kZSIsImdldENvbXBvbmVudCIsIm9uIiwidXBkYXRlQ2hlY2siLCJ1cGRhdGUiLCJkdCIsImFjdGl2ZSIsImlzQ2hlY2tlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLElBQUksRUFBRSw4Q0FEVztBQUVqQkMsSUFBQUEsZ0JBQWdCLEVBQUdOLEVBQUUsQ0FBQ08sTUFGTDtBQUdqQkMsSUFBQUEsaUJBQWlCLEVBQUc7QUFISCxHQUhoQjtBQVVMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFHVixFQUFFLENBQUNXLElBREw7QUFFUkMsSUFBQUEsU0FBUyxFQUFHWixFQUFFLENBQUNXO0FBRlAsR0FWUDs7QUFlTDtBQUNKO0FBQ0E7QUFDSUUsRUFBQUEsTUFsQkssb0JBa0JJO0FBQ0wsU0FBS0MsTUFBTCxHQUFjLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QmhCLEVBQUUsQ0FBQ08sTUFBMUIsQ0FBZDtBQUNBLFNBQUtRLElBQUwsQ0FBVUUsRUFBVixDQUFhLFFBQWIsRUFBdUIsS0FBS0MsV0FBNUIsRUFBeUMsSUFBekM7QUFDQSxTQUFLQSxXQUFMO0FBQ0gsR0F0Qkk7QUF3QkxDLEVBQUFBLE1BeEJLLGtCQXdCRUMsRUF4QkYsRUF3Qks7QUFDTixTQUFLRixXQUFMO0FBQ0gsR0ExQkk7QUE0QkxBLEVBQUFBLFdBNUJLLHlCQTRCUTtBQUNULFFBQUcsS0FBS1IsT0FBTCxDQUFhVyxNQUFiLElBQXVCLEtBQUtQLE1BQUwsQ0FBWVEsU0FBdEMsRUFBZ0Q7QUFDNUMsV0FBS1osT0FBTCxDQUFhVyxNQUFiLEdBQXNCLEtBQUtQLE1BQUwsQ0FBWVEsU0FBbEM7QUFDSDs7QUFDRCxRQUFHLEtBQUtWLFNBQUwsQ0FBZVMsTUFBZixJQUF5QixLQUFLUCxNQUFMLENBQVlRLFNBQXhDLEVBQWtEO0FBQzlDLFdBQUtWLFNBQUwsQ0FBZVMsTUFBZixHQUF3QixDQUFDLEtBQUtQLE1BQUwsQ0FBWVEsU0FBckM7QUFDSDtBQUNKO0FBbkNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1N3aXRjaE5vZGVUb2dnbGUnLFxyXG4gICAgICAgIHJlcXVpcmVDb21wb25lbnQgOiBjYy5Ub2dnbGUsXHJcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGUgOiB0cnVlLFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNoZWNrZWQgOiBjYy5Ob2RlLFxyXG4gICAgICAgIHVuQ2hlY2tlZCA6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29XHJcbiAgICAgKi9cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvZ2dsZScsIHRoaXMudXBkYXRlQ2hlY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hlY2soKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKGR0KXtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUNoZWNrKCl7XHJcbiAgICAgICAgaWYodGhpcy5jaGVja2VkLmFjdGl2ZSAhPSB0aGlzLnRvZ2dsZS5pc0NoZWNrZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQuYWN0aXZlID0gdGhpcy50b2dnbGUuaXNDaGVja2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnVuQ2hlY2tlZC5hY3RpdmUgPT0gdGhpcy50b2dnbGUuaXNDaGVja2VkKXtcclxuICAgICAgICAgICAgdGhpcy51bkNoZWNrZWQuYWN0aXZlID0gIXRoaXMudG9nZ2xlLmlzQ2hlY2tlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuIl19