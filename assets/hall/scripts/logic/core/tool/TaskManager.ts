import TaskComp from "../component/TaskComp";

const baseBundle = "resources";
const taskPath = "hall/prefabs/ui/taskNode";
const interval = 5;
export default class TaskManager{
    private static isEnable = true;    // 功能开关 兼容有些皮肤不开放
    /** 设置任务宝箱功能是否开放 */
    public static setTaskEnable(flag: boolean){
        this.isEnable = flag;
    }

    public static async preloadRes(){
        return new Promise((resolve, reject)=>{
            Global.ResourceManager.loadBundleRes(baseBundle, [taskPath], (err, res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                }
            });
        })
    }
    
    private timer: number;
    private gameId: number = 0;
    private taskList: any[] = [];
    private curTaskId: string = "";
    private curTaskType: number = 0;
    private taskStateMap = {};
    private taskComp: TaskComp;
    private isTimerPause = false;

    public init(rootNode: cc.Node, gameId: number, dir: number){
        if (!TaskManager.isEnable)
            return;
        if (!rootNode || !cc.isValid(rootNode))
            return;
        this.gameId = gameId;
        let prefab = Global.ResourceManager.getBundleRes(baseBundle, taskPath, cc.Prefab);
        if (!prefab){
            Global.ResourceManager.loadBundleRes(baseBundle, taskPath, (error, prefab) => {
                if (error != null || prefab == null) {
                    Logger.error("加载资源错误", baseBundle, taskPath);
                    return
                }
                let copyNode = <cc.Node>cc.instantiate(prefab)
                copyNode.setParent(rootNode);
                copyNode.active = true;
                this.taskComp = Global.UIHelper.safeGetComponent(copyNode, "", TaskComp);
                this.taskComp.initTask(dir);
            })
        }
        else{
            let copyNode = <cc.Node>cc.instantiate(prefab);
            copyNode.setParent(rootNode);
            copyNode.active = true;
            this.taskComp = Global.UIHelper.safeGetComponent(copyNode, "", TaskComp);
            this.taskComp.initTask(dir);
        }
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
    }

    public reqGetGameTaskList(){
        if (!this.gameId)
            return// console.error("gameid not init 1", this.gameId);
        let param = {};
        param["game_id"] = this.gameId;
        Global.HallServer.send(NetAppface.mod, "GetGameTaskActivityList", param, (msg) => {
            if (!this.taskComp || !cc.isValid(this.taskComp))
                return;
            this.taskList = msg.data || [];
            this.searchNotWorked();
        }, null, false);
    }

    private searchNotWorked(){
        if (this.taskList.length > 0){
            for(let i = 0; i < this.taskList.length; i++){
                let task = this.taskList[i];
                this.taskStateMap[task.task_id] = task.task_status;
                if (task.task_status != 2){
                    this.curTaskId = task.task_id;
                    this.curTaskType = task.global_task_type;
                    break;
                }
            }
        }
    }

    public reqGetCommisionInfo(){
        if (!TaskManager.isEnable)
            return;
        if (!this.curTaskId || !this.curTaskType)
            return;
        if (!this.gameId)
            return// console.error("gameid not init 2", this.gameId);
        let param = {};
        param["global_task_type"] = this.curTaskType || 0;
        param["task_id"] = this.curTaskId || "";
        Global.HallServer.send(NetAppface.mod, "GetOneTaskActivityInfo", param, (msg) => {
            if (!this.taskComp || !cc.isValid(this.taskComp))
                return;
            if(!msg || !msg.task_id){
                return;     // 1S内重复请求, 会返回空的默认数据, 直接剔除掉, debug 处理请求时重连会连续请求两次 弹频繁请求
            }
            this.taskComp.updateTask(msg);
            this.taskStateMap[msg.task_id] = msg.task_status;
            if (msg.task_status == 2){
                this.searchNotWorked();
            }
        }, null, false);
    }

    public startReqTimer(){
        if (!TaskManager.isEnable)
            return;
        if (this.timer){
            this.stopReqTimer();
        }
        this.timer = setInterval(()=>{
            this.reqGetCommisionInfo();
        }, interval * 1000);
    }

    private onResume(){
        if (this.isTimerPause)
            this.startReqTimer();
    }

    private onPause(){
        if (this.timer){
            this.isTimerPause = true;
            this.stopReqTimer();
        }
    }

    private stopReqTimer(){
        clearInterval(this.timer);
        this.timer = null;
    }

    public onDispose(){
        if (!TaskManager.isEnable)
            return;
        this.stopReqTimer();
        this.gameId = 0;
        this.taskList = [];
        this.curTaskId = "";
        this.curTaskType = 0;
        this.taskStateMap = {};
        this.isTimerPause = false;
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
    }
}