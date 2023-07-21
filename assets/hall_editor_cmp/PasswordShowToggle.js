/**
 * !#en Enum for the EditBox's input flags
 * !#zh 定义了一些用于设置文本显示和文本格式化的标志位。
 * @readonly
 * @enum EditBox.InputFlag
 */
let InputFlag = cc.Enum({
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
    extends: require("SwitchNodeToggle"),

    editor: CC_EDITOR && {
        menu: 'i18n:MAIN_MENU.component.ui/PasswordShowToggle',
        requireComponent : cc.Toggle,
        executeInEditMode : true,
    },

    properties: {
        normalType : {
            type : InputFlag,
            default : InputFlag.DEFAULT,
        },
        passwordEditBox : cc.EditBox
    },

    

    /**
     * 加载
     */
    onLoad() {
        this._super();
    },

    updateCheck(){
        this._super();
        if(this.passwordEditBox == null) return;
        if(this.toggle.isChecked){
            this.passwordEditBox.inputFlag = this.normalType;
        }else{
            this.passwordEditBox.inputFlag = InputFlag.PASSWORD;
        }
    }
});
