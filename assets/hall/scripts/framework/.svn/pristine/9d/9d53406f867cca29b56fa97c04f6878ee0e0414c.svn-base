import EventHandler from "./EventHandler";
export default class EventDispatcher  {
    private eventMap = {}


    public hasListener(type)
    {
        let listener = this.eventMap && this.eventMap[type];
        return listener != null;
    }

    public on(type:string, caller, method:Function, args?)
    {
        return this._createListener(type, caller, method, args, false);
    }

    public once(type:string, caller, method:Function, args?)
    {
        return this._createListener(type, caller, method, args, true);
    }

    /**
     * 从 EventDispatcher 对象中删除侦听器。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
     */
    public off(type:string, caller, method:Function, onceOnly = false)
    {
        if(this.eventMap == null || this.eventMap[type] == null)
            return this;

        let listener = this.eventMap[type];

        //单个handler
        if(listener.run)
        {
            if((caller == null || listener.caller == caller) && (method == null || listener.method == method) && (!onceOnly || listener.once))
            {
                delete(this.eventMap[type]);
                listener.recover();
            }
        }
        else
        {
            let count = 0;
            let n = listener.length;
            for (let i = 0; i < n; i++) {
                let item = listener[i];
                if (!item)
                {
                    count++;
                    continue;
                }
                if (item && (!caller || item.caller === caller) && (method==null || item.method === method) && (!onceOnly || item.once)) {
                    count++;
                    listener[i] = null;
                    item.recover();
                }
            }
            //如果全部移除，则删除索引
            if (count === n) delete this.eventMap[type];
        }

        return this;
    }

    public offAll(type:string) 
    {
        var events = this.eventMap;
        if (!events) return this;
        if (type) 
        {
            this.recoverHandlers(events[type]);
            delete events[type];
        } 
        else 
        {
            for (let name in events) 
            {
                this.recoverHandlers(events[name]);
            }
        }
    }

    public offAllByCaller(caller:any) {
        if (caller && this.eventMap) {
            for (var name in this.eventMap) {
                this.off(name, caller, null);
            }
        }			
        return this;
    }


        /**
     * 派发事件。
     * @param type	事件类型。
     * @param data	（可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
     */
    public event(type:string, ...data) 
    {
        if (!this.eventMap || !this.eventMap[type]) return false;
        
        let listeners:any = this.eventMap[type];
        if (listeners.run) {
            if (listeners.once) delete this.eventMap[type];
            data != null ? listeners.runWith(data) : listeners.run();
        } else {
            for (let i = 0, n = listeners.length; i < n; i++) {
                let listener:EventHandler = listeners[i];
                if (listener) {
                    (data != null) ? listener.runWith(data) : listener.run();
                }
                if (!listener || listener.once) {
                    listeners.splice(i, 1);
                    i--;
                    n--;
                }
            }
            if (listeners.length === 0 && this.eventMap) delete this.eventMap[type];
        }
        
        return true;
	}

    private recoverHandlers(arr:any):void 
    {
        if (!arr) return;
        if (arr.run) 
        {
            arr.recover();
        } else 
        {
            for (let i = arr.length - 1; i > -1; i--) 
            {
                if (arr[i]) 
                {
                    arr[i].recover();
                    arr[i] = null;
                }
            }
        }
    }


    private _createListener(type:string, caller, method:Function, args, once, offBefroe = false)
    {
        offBefroe && this.off(type, caller, method, once);

        let handler = EventHandler.create(caller || this, method, args, once);
        			//默认单个，每个对象只有多个监听才用数组，节省一个数组的消耗
        if (!this.eventMap[type]) this.eventMap[type] = handler;
        else {
            if (!this.eventMap[type].run) this.eventMap[type].push(handler);
            else this.eventMap[type] = [this.eventMap[type], handler];
        }
        return this;
    }

}
