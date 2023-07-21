
export default class AppConfigProxy extends puremvc.Proxy {
    constructor(){
        super();
    }
    loadData(){
        Logger.log("----------------------AppConfigProxy loadData-----------")
    }

    onRegister(){
        super.onRegister();
        this.loadData();
        Logger.log('-------------AppConfigProxy onRegister--------------')
    }


}