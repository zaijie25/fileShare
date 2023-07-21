// import Mediator from '../framework/puremvc/patterns/mediator/Mediator'
import Const from '../HallConst'
// import Notification from '../framework/puremvc/patterns/observer/Notification'

export default class ViewMediator extends puremvc.Mediator{
    constructor(){
        super()
    }

    listNotificationInterests():any{
        super.listNotificationInterests();
        return [Const.PUSH_VIEW]
    }

    handleNotification(notification){
        let msgName = notification.getName();
        let msgdata = notification.getBody();
        let msgType = notification.getType();
        Logger.log('notification =========' + notification.toString())
        if (msgName == Const.PUSH_VIEW) {
            if (msgType == Const.HALL_SCENE) {
                //加载大厅预设
                // cc.director.loadScene('HallScene')
                Logger.log('----------------show something--------')
            }

        }
    }
}

