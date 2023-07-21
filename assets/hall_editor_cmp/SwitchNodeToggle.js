

cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        menu: 'i18n:MAIN_MENU.component.ui/SwitchNodeToggle',
        requireComponent : cc.Toggle,
        executeInEditMode : true,

    },

    properties: {
        checked : cc.Node,
        unChecked : cc.Node,
    },

    /**
     * 加载
     */
    onLoad() {
        this.toggle = this.node.getComponent(cc.Toggle);
        this.node.on('toggle', this.updateCheck, this);
        this.updateCheck();
    },

    update(dt){
        this.updateCheck();
    },

    updateCheck(){
        if(this.checked.active != this.toggle.isChecked){
            this.checked.active = this.toggle.isChecked;
        }
        if(this.unChecked.active == this.toggle.isChecked){
            this.unChecked.active = !this.toggle.isChecked;
        }
    }

});
