export class YXTween extends cc.Tween
{
    //强制使用内部actionMgr管理器
    public start()
    {
        if (!this.target) {
            Logger.warn('Please set target to tween first');
            return this;
        }
        if (this) {
            cc.director.getActionManager().removeAction(this._finalAction);
        }
        this._finalAction = this._union();
        Game.Tween.actionMgr.addAction(this._finalAction, this._target, false);
        return this;
    }
}