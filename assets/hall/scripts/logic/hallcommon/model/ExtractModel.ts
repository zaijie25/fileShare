import { ExtractEvent } from "../../hall/ui/money/ui/extractCash/ExtractEvent";
import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";
import AppHelper from "../../core/tool/AppHelper";


export default class ExtractModel extends ModelBase
{
    /**银行列表 */
    private bankArray: Array<any> = [
        "中国邮政储蓄银行",
        "中国工商银行",
        "兴业银行",
        "中国建设银行",
        "中国银行",
        "中国农业银行",
        "中国光大银行",
        "广发银行",
        "华夏银行",
        "交通银行",
        "招商银行",
        "中国民生银行",
        "平安银行",
        "北京银行",
        "浦发银行",
        "上海银行",
        "中信银行",
        "渤海银行",
        "东亚银行",
        "宁波银行",
    ];
    banklocationInfo: any;
    /**银行列表 */
    public getBankArray(){
        return this.bankArray;
    }

    /**海外银行列表 */
    private overseasBankArray:Array<any> =[
        "艾芬銀行（Affin Bank）",
        "安联銀行（Alliance Bank）",
        "大马銀行（Am Bank）",
        "联昌銀行（CIMB Bank）",
        "豐隆銀行（Hong Leong Bank）",
        "马来西亚銀行（May Bank）",
        "大众銀行（Public Bank）",
        "興業銀行（RHB Bank）",
        "国民储蓄銀行（Bank Simpanan National）",
        "匯豐銀行 （HSBC Bank）",
        "華僑銀行 （OCBC bank）",
        "花旗銀行 （Citi bank）",
        "人民銀行（bank rakyat）",
        "大華银行 （United Overseas Bank）",
    ];

    public getOverseasBankArray(){
        return this.overseasBankArray;
    }

 /**银行缩写转换 */
 private bankCoke = {
    "中国邮政储蓄银行": "POST",
    "中国工商银行": "ICBC",
    "兴业银行": "CIB",
    "中国建设银行": "CCB",
    "中国银行": "BOC",
    "中国农业银行": "ABC",
    "中国光大银行": "CEB",
    "广发银行": "CGB",
    "华夏银行": "HXB",
    "交通银行": "BOCO",
    "招商银行": "CMBCHINA",
    "中国民生银行": "CMBC",
    "平安银行": "PAB",
    "北京银行": "BCCB",
    "浦发银行": "SPDB",
    "上海银行": "SHB",
    "中信银行": "ECITIC",
    "渤海银行": "CBHB",
    "东亚银行": "BEA",
    "宁波银行": "NB",
    "": "",
}
// 传入银行名获取银行缩写
public getBankCoke(text){
    return this.bankCoke[text];
}
    

    /** 阿里提现筹码列表 */
    private aliChipsArray: Array<Number> = [
        100,
        200,
        300,
        400,
        500,
    ];

    /** 银联提现筹码列表 */
    private unionChipsArray: Array<Number> = [
        500,
        1000,
        2000,
        3000,
        5000,
    ]; 

    public bankDatas : any = null;          //账户信息
    public applyCashList : any = null; 
    //提现记录数据
    public cashListPage: number = 1;
    private cashListData: Array<any> = [];
    public cashTotal: number = 0;

    public allPutList : any = null;
    private defautProvinceCode = 100000
   

    public get Name()
    {
        return "ExtractModel";
    }

    public get BankLocationInfo(){
        return this.banklocationInfo;
    }

    public set BankLocationInfo(info){
        this.banklocationInfo = info;
    }

    public get DefautProvinceCode()
    {
        return this.defautProvinceCode
    }

    public set DefautProvinceCode( code)
    {
         this.defautProvinceCode = code
    }

    public GetDefautCityCode(provinceCode)
    {
        if(this.banklocationInfo.hasOwnProperty(provinceCode))
        {
            for (const citycode in this.banklocationInfo[provinceCode].city) {
                if (this.banklocationInfo[provinceCode].city.hasOwnProperty(citycode)) {
                    return citycode                   
                }
            }
        }

    }
    protected onInit()
    {
        
        //Global.HallServer.on(NetAppface.BindPayInfo,this,this.onResBindPayInfo);
    }

    public IntoWnd(){
        this.reqGetBankInfo();
        AppHelper.isCash = true;
        Global.UI.show("WndRecharge");
    }

    /**
     * 请求绑定信息
     * @param bind_type 0全部 1银行卡 2支付宝
     */
    public reqGetBankInfo(bNew:boolean = false){
        this.bankDatas = null;
        let _param = {
            "bind_type": 0, 
        };
        if(bNew){
            _param["random"] = Math.floor(Math.random() * 10000);
        }
        Global.HallServer.send(NetAppface.mod,NetAppface.GetBankInfo,_param,this.onResGetBankInfo.bind(this), null, false);
    }

    /**
     * 绑定信息回复
      "_param":{
            ali_account: "" //阿里号
            ali_day_max_put_point: 0 //支付宝一天最大
            ali_max_put_point: 0 //支付宝单笔最大
            ali_min_put_point: 0 //支付宝单笔最小
            ali_name: "" //"阿里用户名"
            ali_put_day_max_num: 0 //支付宝提现次数
            ali_put_server_charge: 0 //支付宝手续费

            ali_status: 0 //支付宝提现 0不可展示 1展示
            bank_status: 0 //银行卡提现 0不可展示 1展示 如果2个都是0那就要展示一个 空白页

            bank_day_max_put_point: 0 //银行卡一天最大
            bank_max_put_point: 0 //银行卡单笔最大
            bank_min_put_point: 0 //支付宝单笔最小
            bank_put_day_max_num: 0 //"银行卡提现次数"
            bank_put_server_charge: 0 //银行卡手续费
            
            entrus_bank_account: "6212264000031392323",
            entrus_bank_name: "中国工商银行",
            entrus_bank_user: "王小二",
            forzen_point: 6 //冻结金额  不可以提现的金额
            min_put_server_charge: 0 //最低手续费
        }
     * @param data 数据
     */
    private onResGetBankInfo(data : any){
        this.bankDatas = data;
        this.event(ExtractEvent.OnUpdateBankBindInfo);
    }

    /** 阿里提现筹码列表 */
    public getAliChipsArray(){
        return this.aliChipsArray;
    }
    /** 银联提现筹码列表 */
    public getUnionChipsArray(){
        return this.unionChipsArray;
    }

    public getAliOneDayMax(){
        return this.bankDatas.ali_day_max_put_point;
    }

    public getUnionOneDayMax(){
        return this.bankDatas.bank_day_max_put_point;
    }

    /** 阿里最小提现限制 */
    public getAliMinLimit(){
        return this.bankDatas.ali_min_put_point;
    };   
    /** 阿里最大提现限制 */
    public getAliMaxLimit(){
        return this.bankDatas.ali_max_put_point;
    }   
    /** 银联最小提现限制 */
    public getUnionMinLimit(){
        return this.bankDatas.bank_min_put_point;
    };   
    /** 银联最大提现限制 */
    public getUnionMaxLimit(){
        return this.bankDatas.bank_max_put_point;
    }

    /**
     * 支付宝提现手续费配置[支付宝手续费，最低手续费]
     */
    public getAliPutServerRecharge(){
        
        let aliPut = this.bankDatas.ali_put_server_charge;
        let minPut = this.bankDatas.min_put_server_charge;
        return [aliPut, minPut];
    }

    public getRateInfo()
    {
        let ratio = this.bankDatas.put_code_per_cen
        ratio = ratio/100
        let infoStr = `当前打码流水:${ratio}倍` || ""
        return infoStr

    }
    /**
     * 
     * @param type 类型1银行卡 2 支付宝 3 海外支付
     */
    public getPutInfo(type) {
        let charge = type == 1 ? this.bankDatas.bank_put_server_charge_set : this.bankDatas.ali_put_server_charge_set;
        let strInfo = ""
        if (charge && charge.length == 1) {

            if (charge[0]) {
                let fee = charge[0].fee
                if(fee>0)
                {
                    let str = fee + '%'
                    strInfo = `\n4.单次提现收取提现额度${str}的手续费`
                }
            }
        }
        else if(charge && charge.length > 1) 
        {
            strInfo += '\n4.'
            for (let index = 0; index < charge.length; index++) {
                let level = charge[index]
                let fee = level.fee
                let min = level.min_point/100
                let max = level.max_point/100
                if(fee>0)
                {
                    strInfo += `充值流水${min}倍~${max}倍收取${fee}%的手续费，`
                }
                else
                {
                    strInfo += `充值流水${min}倍以上无需手续费`
                }
            }
        }
        if(!strInfo)
        {
            let charge = type == 1 ? this.bankDatas.min_put_server_charge :this.bankDatas.ali_put_server_charge
            if(charge>0)
            {
                let str = charge + '%'
                strInfo = `\n4.单次提现收取提现额度${str}的手续费`
            }
        }
        return strInfo

    }

    /**
     * 银行卡提现手续费配置[银行手续费，最低手续费]
     */
    public getBankPutServerRecharge(){
        let bankPut = this.bankDatas.bank_put_server_charge;
        let minPut = this.bankDatas.min_put_server_charge;
        return [bankPut, minPut];
    }

    /**
     * 有无阿里账户数据
     */
    public haveAli(){
        return this.bankDatas.ali_account != null && this.bankDatas.ali_account != "";
    }
    /**
     * 有无银联账户数据
     */
    public haveUnion(){
        return this.bankDatas.entrus_bank_account != null && this.bankDatas.entrus_bank_account != "";
    }
    /**
     * 有无海外账户数据
     */
    public haveOverseas(){
        return this.bankDatas.over_sea_entrus_bank_account != null && this.bankDatas.over_sea_entrus_bank_account != "";
    }

    /**
     * 绑定阿里账号信息
     * @param aliName 支付宝姓名
     * @param aliAccount 支付宝账号
     */
    public reqBindAliInfo(aliName:string,aliAccount:string){
        let _param = {
            "bind_type": 2, 
            "aliAccount": aliAccount, 
            "aliName": aliName, 
        }
        Global.HallServer.send(NetAppface.mod,NetAppface.BindBankInfo,_param,this.onResBindAliInfo.bind(this));
    }

    /**
     * 支付宝绑定返回
     */
    private onResBindAliInfo(data){
        Global.UI.fastTip("绑定成功");
        this.reqGetBankInfo(true);   
        this.event(ExtractEvent.BankBindInfoOver);
    }


    /**
     * 
     "_param":{
        "entrusBankAccount":"62122640000312312",
        "entrusBankUser":"王小二",
        "entrusBankName":"中国工商银行",
        "bankName":"莲塘支行",
        "bankProvcince":"广东省",
        "bankCity":"深圳市",
        "certificateCode":"430426199111072323",//
        "bankCode":"ICBC"
		上面银行卡需要
		"bind_type":1银行卡2支付宝
		下面支付宝
		"aliAccount":"阿里号"
		"aliName":"阿里用户名"
    }
     */
    /**
     * 绑定银联账号信息
     * @param entrusBankAccount 卡号
     * @param entrusBankUser 名字
     * @param entrusBankName 开户行名称
     * @param bankName 支行名称
     * @param bankProvcince 省份
     * @param bankCity 城市 
     * @param bankCode 银行代码
     */
    public reqBindUnionInfo(entrusBankUser:string,entrusBankAccount:string,entrusBankName:string,bankName:string,bankProvcince:string,bankCity:string,bankCode:string){
        let _param = {
            "bind_type": 1, 
            "entrusBankUser": entrusBankUser, 
            "entrusBankAccount": entrusBankAccount, 
            "entrusBankName": entrusBankName, 
            "bankName": bankName, 
            "bankProvcince":bankProvcince,
            "bankCity":bankCity,
            "bankCode":bankCode
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.BindBankInfo, _param,this.onResBindUnionInfo.bind(this));
    }

    /**
     * 银联卡绑定返回
     */
    private onResBindUnionInfo(data){
        Global.UI.fastTip("绑定成功"); 
        this.reqGetBankInfo(true);
        this.event(ExtractEvent.BankBindInfoOver);
    }

    /**
     * 请求提现到阿里
     * @param point 提现金额
     */
    public reqAliApplyCash(point : Number){
        if(Global.PlayerData.phone == ""){
            Global.UI.showYesNoBox("该功能需要账号绑定手机后才能使用，是否立刻绑定手机？", ()=>{
                Global.UI.show("WndBindPhone");
            });
            return
        }
        let flag = this.checkEnough(2)
        if(!flag)
        {
            return
        }
        let str = this.checkStr(2)
        if(str)
        {
            Global.UI.showYesNoBox(str,()=>{
                this.reqApplyCash(2,point)
            })
            return
        }
        this.reqApplyCash(2,point)
    }

    public reqApplyCash(type,point)
    {
        let _param = {
            "type": type, 
            "point": point, 
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.ApplyCash, _param,(msg)=>{this.onResApplyCash(msg, type)});
        
    }

    /**
     * 请求提现到银联
     * @param point 提现金额
     */
    public reqUnionApplyCash(point : Number){
        if(Global.PlayerData.phone == ""){
            Global.UI.showYesNoBox("该功能需要账号绑定手机后才能使用，是否立刻绑定手机？", ()=>{
                Global.UI.show("WndBindPhone");
            });
            return
        }
        let flag = this.checkEnough(1)
        if(!flag)
        {
            return
        }
        let str = this.checkStr(1)
        if(str)
        {
            Global.UI.showYesNoBox(str,()=>{
                this.reqApplyCash(1,point)
            })
            return
        }
        this.reqApplyCash(1,point)
       
    }

    /**
     * 
     * @param type 类型1银行卡 2 支付宝 3 海外支付
     * @returns 
     */
    public checkStr(type) {
        let ratio = this.bankDatas.put_code_per_cen
        let charge = type == 1 ? this.bankDatas.bank_put_server_charge_set : this.bankDatas.ali_put_server_charge_set;
        ratio = (ratio / 100).toFixed(2)
        let str = ''
        // if (charge && charge.length > 0) {
        //     let level = this.getExtralLevel(ratio, charge)
        //     let freeLevel = this.getFreeExtralLevel(charge)
        //     let fee = level.fee
           
            
        //     if (fee > 0) {
        //         if (freeLevel) {
        //             let min = freeLevel.min_point / 100
        //             let need = (min - ratio).toFixed(2)
        //             str = `您当前打码倍数为${ratio}倍，将收取${fee}%的手续费，继续打码${need}倍可免除手续费哦，是否现在提现？`

        //         }
        //         else {
        //             str = `您当前打码倍数为${ratio}倍，将收取${fee}%的手续费，是否现在提现？`
        //         }
               
        //     }
        //     else {
        //         str = `您当前打码倍数为${ratio}倍，已免扣手续费，是否现在提现？`
               
        //         // 您当前打码倍数为X，已免扣手续费，是否现在提现？
        //     }
        // }
        if(charge && charge.length>1)
        {
            for (let index = 0; index < charge.length; index++) {
                let level = charge[index];
                let fee = level.fee
                let min = (level.min_point/100).toFixed(2)
                let max = (level.max_point/100).toFixed(2)
                if(fee>0)
                {
                    str += `${min}倍打码量：${fee}%手续费\n`
                }
                else
                {
                    str += `${min}倍打码量：免手续费\n`
                }
            }
            let curStr = `当前打码倍数<color = red>${ratio}</c>倍，是否现在提现？`
            str += curStr
        }
        return str
    }

    public checkEnough(type)
    {
        let ratio = this.bankDatas.put_code_per_cen
        ratio = ratio / 100
        if (ratio < 1) {
            Global.UI.fastTip("当前打码流水不足1倍，无法发起提现")
            return false
        }
        return true
    }


    /**
     * 
     * @param ratio 当前打码倍数
     * @param charge 提现手续费配置
     */
    public getExtralLevel(ratio,charge)
    {
        for (let index = charge.length - 1; index >=0; index--) {
            let level = charge[index];
            let min = level.min_point/100
            if(ratio>=min)
            {
                return level
            }
            
        }

    }
    /**
     * 
     * @param charge 提现手续费配置
     */

    public getFreeExtralLevel(charge)
    {
        for (let index = charge.length - 1; index >=0; index--) {
            let level = charge[index];
            let fee = level.fee
            if(fee<=0)
            {
                return level
            }
            
        }
        return null
    }

    /**
     * 提现消息返回
     */
    private onResApplyCash(data, type){
       

        let str = "申请出款后3分钟内到账，提现前请确认绑定账户信息准确无误，感谢您对平台的支持与理解!"
       
        Global.UI.showSingleBox(str);
        // Global.UI.fastTip("提现申请提交成功"); 
        //请求最新金币
        Global.HallServer.send(NetAppface.mod,NetAppface.GetUserPoint,{});
    }

    /**
     * 请求提现记录数据
     */
    public reqApplyCashList(next: boolean = false){

        if (next){
            if (this.cashListData.length >= this.cashTotal){
                Global.UI.fastTip("无更多信息")
                return;
            }
            this.cashListPage++;
        }else{
            this.cashListPage = 1;
        }
        let listCount = this.cashTotal - (this.cashListPage-1)*6 > 6?6:this.cashTotal - (this.cashListPage-1)*6
        let param = {
            "page": this.cashListPage,
            "pagesize": listCount==0?6:listCount,
            "type": 0,
        }
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "ApplyCashList", 3);
        Global.HallServer.send(NetAppface.mod, NetAppface.ApplyCashList, param, (res)=>{
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "ApplyCashList");
            if(res.list.length < 6){
                this.cashTotal = (this.cashListPage -1) *6 + res.list.length ;
                if(res.list.length == 0){
                    this.cashListPage--;
                    this.cashTotal = this.cashListData.length;
                }
            }else{
                this.cashTotal = res.total;
            }
            let list = res.list || [];
            if (!list){
                return;
            }
            if (this.cashListPage == 1){
                this.cashListData = list;
            }
            else{
                if (this.cashListData.length > this.cashTotal)
                    return;
                this.cashListData = this.cashListData.concat(list);
            }
            this.event(ExtractEvent.OnUpdateApplyCashList);
        });
    }
    public getCashListData(){
        return this.cashListData;
    }
    /**
     * 请求提现记录数据返回
     * "_param":{
        "total":1,
        "list":[
            {
                "create_date":"0000-00-00 00:00:00",
                "account":"6212264000031391242",
                "point":20000,
                "status": 1 // -1 拒绝 0默认 待审核 1已审核 2确认中 3 兑换成功
            }
        ]
    }
     */


    /**  请求所有玩家提现记录数据 */
    public reqGetAllPutList(){
        Global.HallServer.send(NetAppface.mod, NetAppface.GetAllPayPutList, null ,this.onResGetAllPutList.bind(this), null, false); // 轮播 数据界面缓存 关闭清空
    }

    /**
     * 请求所有玩家提现记录数据返回
     * "_param":{
        "total":1,
        "list":[
            {
                "create_date":"0000-00-00 00:00:00",
                "account":"6212264000031391242",
                "point":20000,
                "status": 1 // -1 拒绝 0默认 待审核 1已审核 2确认中 3 兑换成功
            }
        ]
    }
     */
    private onResGetAllPutList(data){
        this.allPutList = data;
        this.event(ExtractEvent.OnUpdateAllPutList, this.allPutList);
    }

    /**
     * 绑定海外账号信息
     * @param entrusBankAccount 卡号
     * @param entrusBankUser 名字
     * @param entrusBankName 开户行名称
     */
    public reqBindOverseasInfo(entrusBankUser:string,entrusBankAccount:string,entrusBankName:string){
        let _param = {
            "bind_type": 3, 
            "entrusBankUser": entrusBankUser, 
            "entrusBankAccount": entrusBankAccount, 
            "entrusBankName": entrusBankName,
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.BindBankInfo, _param,this.onResBindOverseasInfo.bind(this));
    }

    /**
     * 海外提现绑定返回
     */
    private onResBindOverseasInfo(data){
        Global.UI.fastTip("绑定成功"); 
        this.reqGetBankInfo(true);
        this.event(ExtractEvent.BankBindInfoOver);
    }

    /** 海外最小提现限制 */
    public getOverseasMinLimit(){
        return this.bankDatas.over_sea_bank_max_put_point;
    };   
    /** 海外最大提现限制 */
    public getOverseasMaxLimit(){
        return this.bankDatas.over_sea_bank_min_put_point;
    }
    /**
     * 海外每天提现最大限额
     */
    public getOverseasOneDayMax(){
        return this.bankDatas.over_sea_bank_day_max_put_point;
    }

    /**
     * 海外提现手续费配置[银行手续费，最低手续费]
     */
    public getOverseasPutServerRecharge(){
        let bankPut = this.bankDatas.over_sea_bank_put_server_charge;
        let minPut = this.bankDatas.min_put_server_charge;
        return [bankPut, minPut];
    }

    /**
     * 请求提现 海外提现
     * @param point 提现金额
     */
    public reqOverseasApplyCash(point : Number){
        if(Global.PlayerData.phone == ""){
            Global.UI.showYesNoBox("该功能需要账号绑定手机后才能使用，是否立刻绑定手机？", ()=>{
                Global.UI.show("WndBindPhone");
            });
            return;
        }
        let _param = {
            "type": 3, 
            "point": point, 
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.ApplyCash, _param, (msg)=>{this.onResApplyCash(msg, 3)});
    }

}