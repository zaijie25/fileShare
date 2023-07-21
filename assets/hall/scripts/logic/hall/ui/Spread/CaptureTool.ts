const {ccclass, property} = cc._decorator;

@ccclass
export default class CaptureTool extends cc.Component {

    @property(cc.Camera)
    camera:cc.Camera = null
    private texture = null
    private _width = null
    private _height = null
    private callback = null

    
    public BeginCapture(url,_callback?,closeNode = true)
    {
        this.callback = _callback
        if(!this.checkImgExist(url))
        {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "captureIng");
            this.init();
            // create the capture
            this.scheduleOnce(() => {
                let picData = this.initImage();
                //this.showSprite(picData);
                this.saveFile(url,picData,closeNode);
            }, 0.2);
        }
        else{
            if(this.callback)
            {
                this.callback()
                this.callback = null
            }
        }

    }

    init () {
        this.camera.node.active = true
        let texture = new cc.RenderTexture();
        let gl = cc.game._renderContext;
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        this.camera.targetTexture = texture;
        this.texture = texture;
    }
    
    // override
    initImage () { 
        let data = this.texture.readPixels();
        this._width = this.texture.width;
        this._height = this.texture.height;
        let picData = this.filpYImage(data, this._width, this._height);
        return picData;
    }

    

    saveFile (url,picData,closeNode) {
        if (CC_JSB) {
            let filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(url) +'_capImage.png';

            let success = jsb.saveImageData(picData, this._width, this._height, filePath)
            if (success) {
                Logger.log("save image data success, file: " + filePath);
                this.camera.targetTexture = null
                this.camera.node.active = false
                this.node.active = !closeNode
                Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "captureIng");
                if(this.callback)
                {
                    this.callback()
                    this.callback = null
                }
            }
            else {
                Logger.error("save image data failed!");
            }
        }
    }

    checkImgExist(url)
    {
        if(CC_JSB)
        {
            let filePath = jsb.fileUtils.getWritablePath() +Global.Toolkit.md5(url)+'_capImage.png';
            return  jsb.fileUtils.isFileExist(filePath)
            
        }
        
    }

    // This is a temporary solution
    filpYImage (data, width, height) {
        // create the data array
        let picData = new Uint8Array(width * height * 4);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            // save the piexls data
            for (let i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }
        return picData;
    }

   
}