import StartUpCommand from './command/StartUpCommand'
import Const from './HallConst'
export default class HallFacade extends puremvc.Facade {
    public static NAME = "HallFacade";
    initializeController() {
        super.initializeController();
        this.initCommand();
    }

    initCommand() {
        this.registerCommand(Const.START_UP, StartUpCommand)
    }

    startUp() {
        this.sendNotification(Const.START_UP)
    }

    unregisterFacade(){
        this.removeCommand(Const.START_UP)

    }
    public static releaseInstance(){
        let instance = HallFacade.instanceMap[HallFacade.NAME]
        if (instance) {
            instance.unregisterFacade();
            HallFacade.removeCore(HallFacade.NAME)
        }
        return;
    }

    public static get Instance(): HallFacade {
        if (!HallFacade.instanceMap[HallFacade.NAME])
            HallFacade.instanceMap[HallFacade.NAME] = new HallFacade(HallFacade.NAME);

        return <HallFacade><any>HallFacade.instanceMap[HallFacade.NAME];
    }

}