
import ViewMediator from '../mediator/ViewMediator'


export default class PreViewCommand extends puremvc.SimpleCommand {
    constructor(){
        super();
    }
    
    execute(notification){
        super.execute(notification);
        
        this.facade.registerMediator(new ViewMediator())
    }
}