import Const from '../HallConst'
import PreModelCommand from '../command/PreModelCommand'
import PreViewCommand from '../command/PreViewCommand'

export default class StartUpCommand extends puremvc.MacroCommand{
    constructor(){
        super()
        Logger.log('StartUpcommand init')
    }

    initializeMacroCommand(){
        super.initializeMacroCommand();
        Logger.log("StartUpCommand initializeMacroCommand")
        this.addSubCommand(PreModelCommand)
        this.addSubCommand(PreViewCommand)
    }

    execute(note){
        super.execute(note)
        Logger.log('--------------startUpCommand execute-----------')
        this.sendNotification(Const.PUSH_VIEW,{},Const.HALL_SCENE)
    }
}