import BaseServerHelper from "./BaseServerHelper";

export default class CallbackHandlerHelper extends BaseServerHelper{
    public callbackMap = new Map();
    private timeCount = 0;
    // key 为check
    public registCallback(key: string, handlerInstance: CallbackInfo){
        this.callbackMap.set(key, handlerInstance);
    }

    public removeCallback(key: string){
        if(this.callbackMap.has(key)){
            this.callbackMap.delete(key);       // 可以清空key:null
        }
    }

    public clearCallbacks(){
        this.callbackMap.clear();
    }

    public getCallback(key: string): CallbackInfo{
        let handler = this.callbackMap.get(key);
        return handler;
    }

    public onUpdate(dt){
        this.timeCount += dt;
        if (this.timeCount >= 0.5){       // 0.5s更新一次, 减少遍历次数
            this.callbackMap.forEach((callback, key)=>{
                if (callback && callback.live > 0){
                    callback.live -= this.timeCount;
                    if (callback.live <= 0)
                        this.removeCallback(key);
                }
            })
            this.timeCount = 0;
        }
    }
}

export interface CallbackInfo{
    cmd?: string;
    callback: Function;
    key: string;
    inQueue: boolean;
    errorCallback?: Function;
    live: number;
}