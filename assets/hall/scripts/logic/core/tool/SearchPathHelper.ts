const maxGamePath = 5;      // 子游戏最大保留路径数量
export default class SearchPathHelper{
    private pathSet: Set<string> = new Set;
    private gameList: string[] = [];        // 队列, 只用于辅助搜索路径过多时删除最早那条
    
    constructor(){
        this.pathSet.clear();
        this.gameList = [];
        if (cc.sys.isNative){
            let pathList = jsb.fileUtils.getSearchPaths();
            this.addPathList(pathList);
        }
    }

    /** 添加路径到搜索路径 */
    public addOnePath(path: string){
        if (this.pathSet.has(path)){
            return;
        }
        let temp = this.formatPath(path);
        this.pathSet.add(temp);
        this.updateSystemSearchPath();
    }

    /** 添加游戏路径到搜索路径 有数量上限 */
    public addOneGamePath(path: string){
        if (this.pathSet.has(path)){
            return;
        }
        if (this.gameList.length >= maxGamePath){
            let temp = this.gameList.shift();;
            this.pathSet.delete(temp);
        }
        this.gameList.push(path);
        this.pathSet.add(path);
        this.updateSystemSearchPath();
    }

    public addPathList(arr: string[] = []){
        arr.forEach(path=>{
            let temp = this.formatPath(path);
            this.pathSet.add(temp);
        })
        this.updateSystemSearchPath();
    }

    public removeOnePath(path: string){
        let temp = this.formatPath(path);
        this.pathSet.delete(temp);
        this.updateSystemSearchPath();
    }

    public removePathList(arr: string[] = []){
        arr.forEach(path=>{
            let temp = this.formatPath(path);
            this.pathSet.delete(temp);
        })
        this.updateSystemSearchPath();
    }

    private formatPath(path: string = ""){
        let len = path.length;
        if (len <= 0)
            return "";
        if(path[len - 1] != "/")
            path += "/";
        return path;
    }

    public getGameSearchPath(gid: number){
        let storagePath = jsb.fileUtils.getWritablePath()  + "gameUpdate/" + gid + "/";
        return storagePath;
    }

    public updateSystemSearchPath(){
        let arr = Array.from(this.pathSet);
        for(let i = 0; i< arr.length; i++){
            if (arr[i] == "" && i != arr.length -1){
                arr[i] = arr[arr.length - 1];
                arr[arr.length - 1] = "";
                break;
            }
        }
        Logger.error("updateSystemSearchPath", JSON.stringify(arr));
        jsb.fileUtils.setSearchPaths(arr);
    }

    public getSystemSearchPath(){
        return jsb.fileUtils.getSearchPaths();
    }

    public checkPathExist(path: string){
        return this.pathSet.has(path);
    }
}