/**
 * ArrayUtil:数组操作相关接口
 * @author Peter
 */
export default class ArrayUtil {

    public static stringify(src: any[]): string {
        let str = "";
        for (let s of src) {
            str = str + " " + s.toString();
        }
        return str;
    }

    //通过排序比较2个数组是否包含相同的元素
    public compareArraySort(a1, a2) {
        if ((!a1 && a2) || (a1 && !a2)) return false;
        if (a1.length !== a2.length) return false;
        let a11 = [].concat(a1);
        let a22 = [].concat(a2);
        a11 = a11.sort();
        a22 = a22.sort();
        for (var i = 0, n = a11.length; i < n; i++) {
            if (a11[i] !== a22[i]) return false;
        }
        return true;
    }

}