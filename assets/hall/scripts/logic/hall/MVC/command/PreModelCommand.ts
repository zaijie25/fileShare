
import AppConfigProxy from '../model/proxy/AppConfigProxy'


export default class PreModelCommand extends puremvc.SimpleCommand {
    constructor(){
        super();
    }

    execute(notification:puremvc.Notification){
        super.execute(notification);
        this.facade.registerProxy(new AppConfigProxy());
        
    }
}