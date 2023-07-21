import { italk } from "./italkmsg_pb";
import ItalkCrc from "./italkmsg_crc";

class ItalkMsgBuffer {
    static buildBufer(buffer:Uint8Array,type:italk.pb.ItalkTypeEnum):Uint8Array{
        let length:number = buffer.length;
        let totel:number = Math.floor(length/10240);
        let bodylength:number = length % 10240;
        let headbuf:Uint8Array = new Uint8Array(24+length);
        headbuf[0] = 2;
        headbuf[1] = type.valueOf();
        headbuf[2] = totel;
        headbuf[3] = 0;
        headbuf[4] = 0xff & bodylength;
        headbuf[5] = 0xff & bodylength >> 8;
        let crcnum =  ItalkCrc.crc16(headbuf);
        headbuf[6] = 0xff & crcnum;
        headbuf[7] = 0xff & crcnum >> 8;
        for (var i = 0; i < length; i++) {
            headbuf[24 + i] = buffer[i];
        }
        return headbuf;
    }
}
export default ItalkMsgBuffer