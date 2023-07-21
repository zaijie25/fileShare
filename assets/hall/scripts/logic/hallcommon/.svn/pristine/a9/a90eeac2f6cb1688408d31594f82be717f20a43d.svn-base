import HallStorageKey from "../const/HallStorageKey";
import ModelBase from "../../../framework/model/ModelBase";


export default class RechagreTipModel extends ModelBase {
    private _RechagreTipModel: boolean;
    private salenum;
    public flag :boolean = false

    protected onInit() {
        this.name = "RechagreTipModel";
    }

    public setRechagreTipModel() {
        let time = Global.Setting.storage.get(HallStorageKey.Sale);
        let Onlinetime = new Date().getTime()
        if (time == null || time == "") {
            time = new Date().getTime()
            Global.Setting.storage.set(HallStorageKey.Sale, time);
            this._RechagreTipModel = true;
        }
        else {
            if (this.salenum > 0) {
                this._RechagreTipModel = this.SetTimeData(time, Onlinetime)
            }
        }
        Global.Setting.storage.set(HallStorageKey.Sale, Onlinetime);
    }

    public get RechagreTipModel() {
        let time = Global.Setting.storage.get(HallStorageKey.Sale);
        let Onlinetime = new Date().getTime()
        if (time == null || time == "") {
            this._RechagreTipModel = true;
        }
        else {
            if (this.salenum > 0) {
                this._RechagreTipModel = this.SetTimeData(time, Onlinetime)
            }
        }
        return this._RechagreTipModel;
    }

    public get Salenum() {
        return this.salenum;
    }

    public initData(num: number) {
        if (num) {
            this.salenum = num;
        }
        else
            this.salenum = 0;
    }

    SetTimeData(date1, date2) {
        let time1 = new Date(Number(date1))
        let time2 = new Date(date2);
        let y1 = time1.getFullYear();
        let y2 = time2.getFullYear();
        let m1 = time1.getMonth();
        let m2 = time2.getMonth();
        let d1 = time1.getDate();
        let d2 = time2.getDate();
        if (y2 > y1) {
            return true;
        }
        if (m2 > m1) {
            return true;
        }
        if (d2 > d1) {
            return true;
        }
        return false;
    }
}