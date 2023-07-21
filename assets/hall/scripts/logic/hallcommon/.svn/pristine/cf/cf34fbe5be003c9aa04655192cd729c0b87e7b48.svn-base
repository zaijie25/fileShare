import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";

export default class PersonalInfoModel extends ModelBase{
    public get Name(){
        return "PersonalInfoModel";
    }

    public reqGetUserInfo(){
        let param:any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserInfo, param);
    }

    public reqEditPwd(phone, code, acode, pwd, callback){
        let param = {
            "phone": Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey,Global.Toolkit.cryptoIv,phone),
            "code": code,
            "acode": acode,
            "pwd": pwd
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.EditPwd, param, callback);
    }

    public reqBindPhone(phone, code, acode, pwd, callback){
        let param = {
            "phone": Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey,Global.Toolkit.cryptoIv,phone),
            "code": code,
            "acode": acode,
            "pwd": pwd
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.BindPhone, param, callback);
    }

    public reqEditUserInfo(param, callback){
        Global.HallServer.send(NetAppface.mod, NetAppface.EditUserInfo, param, callback);
    }
}