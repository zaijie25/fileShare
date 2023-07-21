import ISection from "./ISection";

/**
 * 把整个游戏分成多个阶段,每个阶段的管理器
 */
export default class SectionManager
{
    private sctionMap:{[key:string]:ISection} = {};

    private static _instance:SectionManager;
    public static get Instance() {
        if(SectionManager._instance == null) {
            SectionManager._instance = new SectionManager();
        }
        return SectionManager._instance;
    }

    protected constructor() {

    }

    /**
     * 
     * @param sectionName 
     */
    public hasSection(sectionName:string) {
        if(sectionName == null && sectionName.length < 1)
        {
            Logger.error("SectionManager::getSection() sectionName == null || sectionName.length < 1");
            return null;
        }
        return this.sctionMap[sectionName] != null;    
    }

    public callSectionInit(sectionName:string)
    {
        let section = this.sctionMap[sectionName];
        if(!section.isInit)
        {
            section.declareModel();
            section.declareWnd();
            section.loadLanguage();
            section.isInit = true;
        }
        section.init()
    }

    public register(sectionName:string, section:ISection) {
        if(section == null) {
            Logger.error("SectionManager::register() section == null, return!!!!");
            return false;
        }
        this.sctionMap[sectionName] = section;
        return true;
    }

    public unregister(sectionName:string) {
        if(sectionName == null && sectionName.length < 1)
        {
            Logger.error("SectionManager::unregister() sectionName == null || sectionName.length < 1");
            return null;
        }
        this.sctionMap[sectionName] = null;
    }

    public unregisterAll() {
        for(let key in this.sctionMap) {
            this.unregister(key);
        }
        this.sctionMap = {};
    }

}