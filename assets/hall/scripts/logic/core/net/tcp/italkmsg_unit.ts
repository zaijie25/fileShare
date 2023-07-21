class ItalkUnit {
//   static  getLocalId():Int64{
//     return new Int64(Date.parse(new Date().toString()));
//   }

    private static localidcurrtime:number = 0;
    private static localidindex:number = 0;

    static  getLocalId():number{
        let now:number = (new Date()).getTime();
        if (now != this.localidcurrtime) {
            this.localidcurrtime = now;
            this.localidindex = 0;
        } else {
            ++this.localidindex;
        }
        now = now * 1000;
        now += (this.localidindex % 100) * 10;
        now += 5
        return now;
    }
}
export default ItalkUnit