import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";
import GlobalEvent from "../../core/GlobalEvent";

export default class BankModel extends ModelBase
{

    private _defaultPassword : string = "888888";
    private _bankPassword : string = null;

    public get Name()
    {
        return "BankModel";
    }

    protected onInit()
    {
    }

    /**
     * 数据清理时的回调
    */
    protected onClear() {
        this._bankPassword = null;
    }

    public getDefaultPassword(){
        return this._defaultPassword;
    }

    public IntoWnd(){
        if(this._bankPassword){
            
            this.reqLoginBank(this._bankPassword);
        }else{
            Global.UI.show("WndBankLogin");
        }
    }

    private bankErronFunc( data : any ){
        if(data._errstr != null){
            this.showBankTips(data._errstr);
            return false;
        }
        return true;
    }

    /** 显示银行Tip */
    public showBankTips( msg : string){
        Global.UI.fastTip(msg);
    }

    /**
     * 登录银行
     * @param pwd 银行密码
     */
    public reqLoginBank( pwd : string ){
        var pwdMD5 = Global.Toolkit.md5(pwd);
        let _param = {
            "pwd": pwdMD5,
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.LoginBank, _param,
            function (data : any){
                this._bankPassword = pwd;
                this.onResLoginBank( data );
            }.bind(this),

            function (data : any) {
                this._bankPassword = null;
                return this.bankErronFunc(data);
            }.bind(this)
        );
    }

    /**
     * "_param": {
		    "bank_point": 银行金额
        }
     */
    private onResLoginBank( data : any ){
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndBankUI")
        Global.PlayerData.bank_point = data.bank_point;
        Global.UI.close("WndBankLogin");
        Global.UI.show("WndBankUI");
    }

    /**
     * 修改密码
     * @param oldpwd 旧银行密码
     * @param newpwd 新银行密码
     */
    public reqSetBankPwd( oldpwd : string , newpwd : string ){
        var oldpwdMD5 = Global.Toolkit.md5(oldpwd);
        var newpwdMD5 = Global.Toolkit.md5(newpwd);
        let _param = {
            "old_pwd":oldpwdMD5,//MD5
            "new_pwd":newpwdMD5,//MD5
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.SetBankPwd, _param,
            function (data : any) {
                this._bankPassword = newpwd;
                this.onResSetBankPwd( data );
            }.bind(this),

            this.bankErronFunc.bind(this)
        );
    }

    /**
     * 
     */
    private onResSetBankPwd( data : any ){
        this.showBankTips("修改密码成功");
        Global.UI.close("WndBankChangePW");
        this.IntoWnd();
        // Global.Event.event(GlobalEvent.BANK_CHANGE_PWD_SUCCEED);
    }

     /**
      * 忘记密码
      * @param phone 手机号
      * @param code 验证码
      * @param pwd 新密码
      * @param acode 区号
      */
    public reqForgetBankPwd( phone : string , code : string , pwd : string , acode : string ){
        var pwdMD5 = Global.Toolkit.md5(pwd);
        let _param = {
            "phone":Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey,Global.Toolkit.cryptoIv,phone),
            "code":code,
            "pwd":pwdMD5,
            "acode":acode,
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.ForgetBankPwd, _param,this.onResForgetBankPwd.bind(this),this.bankErronFunc.bind(this));
    }

    /**
     * 
     */
    private onResForgetBankPwd( data : any ){
        this.showBankTips("修改密码成功");
        Global.UI.close("WndBankForgetPW");
    }

    /**
      * 存钱
      * @param point 存钱金额
      */
    public reqSaveBankPoint( point : Number ){
        let fixPoint = point.toFixed(0);//2019-5-25 xiaoC number类型可能出现.99999999
        let intPoint = parseInt(fixPoint, 10);
        let _param = {
            "type" : 1, //1存 2取
		    "point" : intPoint,
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.DealBankPoint, _param,this.onResSaveDealBankPoint.bind(this),this.bankErronFunc.bind(this));
    }

    /**
      * 取钱
      * @param point 取钱金额
      */
    public reqDrawBankPoint( point : Number ){
        let fixPoint = point.toFixed(0);//2019-5-25 xiaoC number类型可能出现.99999999
        let intPoint = parseInt(fixPoint, 10);
        let _param = {
            "type" : 2, //1存 2取
		    "point" : intPoint,
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.DealBankPoint, _param,this.onResDarwDealBankPoint.bind(this),this.bankErronFunc.bind(this));
    }

    /**
     "_param": {
		"bank_point":操作之后银行卡金额
		"point":自身金额
    } 
     */
    private onResSaveDealBankPoint( data : any ){
        this.showBankTips("存款成功")
        Global.PlayerData.point = data.point;
        Global.PlayerData.bank_point = data.bank_point;
    }

    /**
     "_param": {
		"bank_point":操作之后银行卡金额
		"point":自身金额
    } 
     */
    private onResDarwDealBankPoint( data : any ){
        this.showBankTips("取款成功")
        Global.PlayerData.point = data.point;
        Global.PlayerData.bank_point = data.bank_point;
    }


   
}
