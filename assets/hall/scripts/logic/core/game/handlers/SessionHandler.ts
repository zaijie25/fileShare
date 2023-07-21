export default class SessionHandler 
{
    protected Handle(session)
    {
        Game.Context.selfSrc = session._src;
        Game.Context.session = session._para;
        Game.Control.setSession(session)
        Global.HallServer.setSession(session);
        Game.Control.stopCheckMsgTimer();

        if(Game.Control.curGid != session._para._gid)
        {
            Logger.error("Game.Control.curGid  !== session._para._gid");
            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
        }
    }

    public checkInQueue()
    {
        return false;
    }
}