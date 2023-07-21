/**
 * 对JS类操作的工具类
 * @author Peter
 * 
*/
export class JSUtil {
    /**
     * 根据字符串创建对象
     * @param {string} cls 类的字符串值
     */
    public static importCls(cls: string): Promise<any> {
        return new Promise<any>((resolve, reject)=>{
            // console.error("JSUtils module cls = " + cls)
            import(cls).then((module)=>{
                if (module && module.default) {
                    resolve(module.default);
                } else {
                  //  console.error(cls, "中没有default类.");
                    reject(module);
                }
            });
        });
    }

    /**
     * 获取父类
     * @param {Object} ctor 子类类名
     * @return {Object}
     */
    public static getSuper (ctor) {
        let proto = ctor.prototype;
        let dunderProto = proto && Object.getPrototypeOf(proto);
        return dunderProto && dunderProto.constructor;
    }

    /**
     * 判断subclass是否是superclass的子类
     * @param subclass
     * @param superclass
     */
    public static isChildClassOf (subclass, superclass) {
        if (subclass && superclass) {
            if (typeof subclass !== 'function') {
                return false;
            }
            if (typeof superclass !== 'function') {
                return false;
            }
            if (subclass === superclass) {
                return true;
            }
            for (;;) {
                subclass = JSUtil.getSuper(subclass);
                if (!subclass) {
                    return false;
                }
                if (subclass === superclass) {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**
     * 深拷贝对象
     * @param obj 
     */
    public copyObj(obj: any) {
        if (obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        else {
            return {}
        }
    }

    // 数组合并去重
    public arrayConcat(array1,array2){
        let tempPaths = array1.concat(array2);
        let retPaths = []
        for (let path1 of tempPaths){
            let flag = true;
            for (let path2 of retPaths){
                if (path1 == path2){
                    flag = false;
                }
            }
            if (flag){
                retPaths.push(path1)
            }
        }
        return retPaths;
    }

}