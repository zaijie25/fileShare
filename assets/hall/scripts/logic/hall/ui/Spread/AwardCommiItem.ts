
const { ccclass, property } = cc._decorator;

@ccclass
export default class AwardCommiItem extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    min_maxLabel: cc.Label = null;

    @property(cc.Label)
    commiLabel: cc.Label = null;



    Init(data) {
        if (data == null) {
            this.nameLabel.string = ""
            this.min_maxLabel.string = ""
            this.commiLabel.string = ""
        }
        else {
            this.nameLabel.string = data.name
            if (data.max_point === 0) {
                let max = data.min_point
                if(data.min_point >= 10000)
                {
                    max = (data.min_point / 10000).toString()+"万"
                }
                this.min_maxLabel.string = max + "以上" 
            }
            else {
                let min = data.min_point
                let max = data.max_point
                if(data.min_point >= 10000)
                {
                    min = (data.min_point / 10000).toString()+"万"
                }

                if(data.max_point >= 10000)
                {
                    max = (data.max_point / 10000).toString()+"万"
                }
                
                this.min_maxLabel.string = min.toString() + "-" + max.toString()
            }
            this.commiLabel.string = data.commi + "/万"
        }
    }
}
