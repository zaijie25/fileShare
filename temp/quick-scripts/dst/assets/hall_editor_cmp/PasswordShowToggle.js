
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall_editor_cmp/PasswordShowToggle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1152dQOBVJM3qK0d0/2LWDj', 'PasswordShowToggle');
// hall_editor_cmp/PasswordShowToggle.js

"use strict";

/**
 * !#en Enum for the EditBox's input flags
 * !#zh 定义了一些用于设置文本显示和文本格式化的标志位。
 * @readonly
 * @enum EditBox.InputFlag
 */
var InputFlag = cc.Enum({
  /**
   * !#en
   * Indicates that the text entered is confidential data that should be
   * obscured whenever possible. This implies EDIT_BOX_INPUT_FLAG_SENSITIVE.
   * !#zh
   * 表明输入的文本是保密的数据，任何时候都应该隐藏起来，它隐含了 EDIT_BOX_INPUT_FLAG_SENSITIVE。
   * @property {Number} PASSWORD
   */
  PASSWORD: 0,

  /**
   * !#en
   * Indicates that the text entered is sensitive data that the
   * implementation must never store into a dictionary or table for use
   * in predictive, auto-completing, or other accelerated input schemes.
   * A credit card number is an example of sensitive data.
   * !#zh
   * 表明输入的文本是敏感数据，它禁止存储到字典或表里面，也不能用来自动补全和提示用户输入。
   * 一个信用卡号码就是一个敏感数据的例子。
   * @property {Number} SENSITIVE
   */
  SENSITIVE: 1,

  /**
   * !#en
   * This flag is a hint to the implementation that during text editing,
   * the initial letter of each word should be capitalized.
   * !#zh
   *  这个标志用来指定在文本编辑的时候，是否把每一个单词的首字母大写。
   * @property {Number} INITIAL_CAPS_WORD
   */
  INITIAL_CAPS_WORD: 2,

  /**
   * !#en
   * This flag is a hint to the implementation that during text editing,
   * the initial letter of each sentence should be capitalized.
   * !#zh
   * 这个标志用来指定在文本编辑是否每个句子的首字母大写。
   * @property {Number} INITIAL_CAPS_SENTENCE
   */
  INITIAL_CAPS_SENTENCE: 3,

  /**
   * !#en Capitalize all characters automatically.
   * !#zh 自动把输入的所有字符大写。
   * @property {Number} INITIAL_CAPS_ALL_CHARACTERS
   */
  INITIAL_CAPS_ALL_CHARACTERS: 4,

  /**
   * Don't do anything with the input text.
   * @property {Number} DEFAULT
   */
  DEFAULT: 5
});
cc.Class({
  "extends": require("SwitchNodeToggle"),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/PasswordShowToggle',
    requireComponent: cc.Toggle,
    executeInEditMode: true
  },
  properties: {
    normalType: {
      type: InputFlag,
      "default": InputFlag.DEFAULT
    },
    passwordEditBox: cc.EditBox
  },

  /**
   * 加载
   */
  onLoad: function onLoad() {
    this._super();
  },
  updateCheck: function updateCheck() {
    this._super();

    if (this.passwordEditBox == null) return;

    if (this.toggle.isChecked) {
      this.passwordEditBox.inputFlag = this.normalType;
    } else {
      this.passwordEditBox.inputFlag = InputFlag.PASSWORD;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbF9lZGl0b3JfY21wXFxQYXNzd29yZFNob3dUb2dnbGUuanMiXSwibmFtZXMiOlsiSW5wdXRGbGFnIiwiY2MiLCJFbnVtIiwiUEFTU1dPUkQiLCJTRU5TSVRJVkUiLCJJTklUSUFMX0NBUFNfV09SRCIsIklOSVRJQUxfQ0FQU19TRU5URU5DRSIsIklOSVRJQUxfQ0FQU19BTExfQ0hBUkFDVEVSUyIsIkRFRkFVTFQiLCJDbGFzcyIsInJlcXVpcmUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwicmVxdWlyZUNvbXBvbmVudCIsIlRvZ2dsZSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicHJvcGVydGllcyIsIm5vcm1hbFR5cGUiLCJ0eXBlIiwicGFzc3dvcmRFZGl0Qm94IiwiRWRpdEJveCIsIm9uTG9hZCIsIl9zdXBlciIsInVwZGF0ZUNoZWNrIiwidG9nZ2xlIiwiaXNDaGVja2VkIiwiaW5wdXRGbGFnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLFNBQVMsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxRQUFRLEVBQUUsQ0FUVTs7QUFVcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxTQUFTLEVBQUUsQ0FyQlM7O0FBc0JwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGlCQUFpQixFQUFFLENBOUJDOztBQStCcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxxQkFBcUIsRUFBRSxDQXZDSDs7QUF3Q3BCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsMkJBQTJCLEVBQUUsQ0E3Q1Q7O0FBOENwQjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxPQUFPLEVBQUU7QUFsRFcsQ0FBUixDQUFoQjtBQXNEQVAsRUFBRSxDQUFDUSxLQUFILENBQVM7QUFDTCxhQUFTQyxPQUFPLENBQUMsa0JBQUQsQ0FEWDtBQUdMQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFLGdEQURXO0FBRWpCQyxJQUFBQSxnQkFBZ0IsRUFBR2IsRUFBRSxDQUFDYyxNQUZMO0FBR2pCQyxJQUFBQSxpQkFBaUIsRUFBRztBQUhILEdBSGhCO0FBU0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUc7QUFDVEMsTUFBQUEsSUFBSSxFQUFHbkIsU0FERTtBQUVULGlCQUFVQSxTQUFTLENBQUNRO0FBRlgsS0FETDtBQUtSWSxJQUFBQSxlQUFlLEVBQUduQixFQUFFLENBQUNvQjtBQUxiLEdBVFA7O0FBbUJMO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSxNQXRCSyxvQkFzQkk7QUFDTCxTQUFLQyxNQUFMO0FBQ0gsR0F4Qkk7QUEwQkxDLEVBQUFBLFdBMUJLLHlCQTBCUTtBQUNULFNBQUtELE1BQUw7O0FBQ0EsUUFBRyxLQUFLSCxlQUFMLElBQXdCLElBQTNCLEVBQWlDOztBQUNqQyxRQUFHLEtBQUtLLE1BQUwsQ0FBWUMsU0FBZixFQUF5QjtBQUNyQixXQUFLTixlQUFMLENBQXFCTyxTQUFyQixHQUFpQyxLQUFLVCxVQUF0QztBQUNILEtBRkQsTUFFSztBQUNELFdBQUtFLGVBQUwsQ0FBcUJPLFNBQXJCLEdBQWlDM0IsU0FBUyxDQUFDRyxRQUEzQztBQUNIO0FBQ0o7QUFsQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgdGhlIEVkaXRCb3gncyBpbnB1dCBmbGFnc1xyXG4gKiAhI3poIOWumuS5ieS6huS4gOS6m+eUqOS6juiuvue9ruaWh+acrOaYvuekuuWSjOaWh+acrOagvOW8j+WMlueahOagh+W/l+S9jeOAglxyXG4gKiBAcmVhZG9ubHlcclxuICogQGVudW0gRWRpdEJveC5JbnB1dEZsYWdcclxuICovXHJcbmxldCBJbnB1dEZsYWcgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgZW50ZXJlZCBpcyBjb25maWRlbnRpYWwgZGF0YSB0aGF0IHNob3VsZCBiZVxyXG4gICAgICogb2JzY3VyZWQgd2hlbmV2ZXIgcG9zc2libGUuIFRoaXMgaW1wbGllcyBFRElUX0JPWF9JTlBVVF9GTEFHX1NFTlNJVElWRS5cclxuICAgICAqICEjemhcclxuICAgICAqIOihqOaYjui+k+WFpeeahOaWh+acrOaYr+S/neWvhueahOaVsOaNru+8jOS7u+S9leaXtuWAmemDveW6lOivpemakOiXj+i1t+adpe+8jOWug+makOWQq+S6hiBFRElUX0JPWF9JTlBVVF9GTEFHX1NFTlNJVElWReOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBBU1NXT1JEXHJcbiAgICAgKi9cclxuICAgIFBBU1NXT1JEOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCBlbnRlcmVkIGlzIHNlbnNpdGl2ZSBkYXRhIHRoYXQgdGhlXHJcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiBtdXN0IG5ldmVyIHN0b3JlIGludG8gYSBkaWN0aW9uYXJ5IG9yIHRhYmxlIGZvciB1c2VcclxuICAgICAqIGluIHByZWRpY3RpdmUsIGF1dG8tY29tcGxldGluZywgb3Igb3RoZXIgYWNjZWxlcmF0ZWQgaW5wdXQgc2NoZW1lcy5cclxuICAgICAqIEEgY3JlZGl0IGNhcmQgbnVtYmVyIGlzIGFuIGV4YW1wbGUgb2Ygc2Vuc2l0aXZlIGRhdGEuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDooajmmI7ovpPlhaXnmoTmlofmnKzmmK/mlY/mhJ/mlbDmja7vvIzlroPnpoHmraLlrZjlgqjliLDlrZflhbjmiJbooajph4zpnaLvvIzkuZ/kuI3og73nlKjmnaXoh6rliqjooaXlhajlkozmj5DnpLrnlKjmiLfovpPlhaXjgIJcclxuICAgICAqIOS4gOS4quS/oeeUqOWNoeWPt+eggeWwseaYr+S4gOS4quaVj+aEn+aVsOaNrueahOS+i+WtkOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNFTlNJVElWRVxyXG4gICAgICovXHJcbiAgICBTRU5TSVRJVkU6IDEsXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoaXMgZmxhZyBpcyBhIGhpbnQgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRoYXQgZHVyaW5nIHRleHQgZWRpdGluZyxcclxuICAgICAqIHRoZSBpbml0aWFsIGxldHRlciBvZiBlYWNoIHdvcmQgc2hvdWxkIGJlIGNhcGl0YWxpemVkLlxyXG4gICAgICogISN6aFxyXG4gICAgICogIOi/meS4quagh+W/l+eUqOadpeaMh+WumuWcqOaWh+acrOe8lui+keeahOaXtuWAme+8jOaYr+WQpuaKiuavj+S4gOS4quWNleivjeeahOmmluWtl+avjeWkp+WGmeOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IElOSVRJQUxfQ0FQU19XT1JEXHJcbiAgICAgKi9cclxuICAgIElOSVRJQUxfQ0FQU19XT1JEOiAyLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGlzIGZsYWcgaXMgYSBoaW50IHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0aGF0IGR1cmluZyB0ZXh0IGVkaXRpbmcsXHJcbiAgICAgKiB0aGUgaW5pdGlhbCBsZXR0ZXIgb2YgZWFjaCBzZW50ZW5jZSBzaG91bGQgYmUgY2FwaXRhbGl6ZWQuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDov5nkuKrmoIflv5fnlKjmnaXmjIflrprlnKjmlofmnKznvJbovpHmmK/lkKbmr4/kuKrlj6XlrZDnmoTpppblrZfmr43lpKflhpnjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBJTklUSUFMX0NBUFNfU0VOVEVOQ0VcclxuICAgICAqL1xyXG4gICAgSU5JVElBTF9DQVBTX1NFTlRFTkNFOiAzLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENhcGl0YWxpemUgYWxsIGNoYXJhY3RlcnMgYXV0b21hdGljYWxseS5cclxuICAgICAqICEjemgg6Ieq5Yqo5oqK6L6T5YWl55qE5omA5pyJ5a2X56ym5aSn5YaZ44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSU5JVElBTF9DQVBTX0FMTF9DSEFSQUNURVJTXHJcbiAgICAgKi9cclxuICAgIElOSVRJQUxfQ0FQU19BTExfQ0hBUkFDVEVSUzogNCxcclxuICAgIC8qKlxyXG4gICAgICogRG9uJ3QgZG8gYW55dGhpbmcgd2l0aCB0aGUgaW5wdXQgdGV4dC5cclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBERUZBVUxUXHJcbiAgICAgKi9cclxuICAgIERFRkFVTFQ6IDVcclxufSk7XHJcblxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogcmVxdWlyZShcIlN3aXRjaE5vZGVUb2dnbGVcIiksXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvUGFzc3dvcmRTaG93VG9nZ2xlJyxcclxuICAgICAgICByZXF1aXJlQ29tcG9uZW50IDogY2MuVG9nZ2xlLFxyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlIDogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5vcm1hbFR5cGUgOiB7XHJcbiAgICAgICAgICAgIHR5cGUgOiBJbnB1dEZsYWcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQgOiBJbnB1dEZsYWcuREVGQVVMVCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhc3N3b3JkRWRpdEJveCA6IGNjLkVkaXRCb3hcclxuICAgIH0sXHJcblxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb1cclxuICAgICAqL1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUNoZWNrKCl7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICBpZih0aGlzLnBhc3N3b3JkRWRpdEJveCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy50b2dnbGUuaXNDaGVja2VkKXtcclxuICAgICAgICAgICAgdGhpcy5wYXNzd29yZEVkaXRCb3guaW5wdXRGbGFnID0gdGhpcy5ub3JtYWxUeXBlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkRWRpdEJveC5pbnB1dEZsYWcgPSBJbnB1dEZsYWcuUEFTU1dPUkQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19