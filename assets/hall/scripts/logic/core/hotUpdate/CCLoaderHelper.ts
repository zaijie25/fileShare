export default class  CCLoaderHelper {
    public getRes(path,type,cb){
        let res = cc.loader.getRes(path)
        if (res == null) {
            Logger.log('CCLoaderHelper  res = null  path = ' + path)
            cc.loader.loadRes(path,type,cb);
        }
    }
}