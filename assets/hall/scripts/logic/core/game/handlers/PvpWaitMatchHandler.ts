export default class PvpWaitMatchHandler{
    protected Handle(msg){
        let session = {
            _para:{
                _gid : 2005,
                _glv: 'l1',
                _gsc: 'default',
                _chair: 0,      // 0代表处于匹配中
                _gt: 0,
            }
        };
        session = msg;
        Game.Control.setSession(session);
        Global.HallServer.setSession(session);
        Game.Control.stopCheckMsgTimer();
        Game.Event.event(Game.EVENT_MATCH_PLAYER, msg);

        if(Game.Control.curGid != session._para._gid)
        {
            Logger.error("Game.Control.curGid  !== session._para._gid");
            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
        }
    }

    public checkInQueue(){
        return false;
    }
}