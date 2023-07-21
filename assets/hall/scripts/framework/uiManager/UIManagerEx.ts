
export default class UIManagerEx {
    private static _instance: UIManagerEx = null;
    private uiList = [];
    constructor() {
        this.uiList = []
    }
    public static get Instance(): UIManagerEx {
        if (this._instance == null) {
            this._instance = new UIManagerEx();
        }
        return this._instance;
    }

    public openUI(uiPath, callBack?: Function) {
        let self = this;
        cc.loader.loadRes(uiPath, function (err, prefab) {
            if (err) {
                Logger.error(err.message || err);
                return;
            }
            var temp = cc.instantiate(prefab);
            temp.parent = cc.Canvas.instance.node;
            self.uiList.push(temp);

            for (var i = 0; i < self.uiList.length; i++) {
                if (self.uiList[i] && self.uiList[i].name !== "") {
                    var targetUI = self.uiList[i].getComponent("uiPanel");
                    if (targetUI && targetUI.isTop) {
                        targetUI.node.setSiblingIndex(99999);
                    }
                }
            }
            // event--
            if (callBack) {
                callBack(temp);
            }
        })
    }

    public closeUI(targetUI){
        for (var i = this.uiList.length - 1; i >= 0; i--) {
            if (this.uiList[i] && targetUI === this.uiList[i]) {
                targetUI.destroy();
                this.uiList.splice(i, 1);
                break;
            }
        }
    }

    public findUI(uiName){
        for (var i = this.uiList.length - 1; i >= 0; i--) {
            var temp = this.uiList[i];
            if (temp && temp.name === uiName) {
                return temp;
            }
        }
        return null;
    }


}