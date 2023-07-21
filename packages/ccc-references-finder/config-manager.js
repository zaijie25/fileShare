const Fs = require('fs');
const Path = require('path');

const configPath = Path.join(__dirname, 'config.json');
const packagePath = Path.join(__dirname, 'package.json');

/** 配置管理器 */
const ConfigManager = {

    /**
     * 保存配置
     * @param {{expand: boolean, detail: boolean, hotkey:string}} config 配置
     */
    save(config) {
        const configData = Fs.existsSync(configPath) ? JSON.parse(Fs.readFileSync(configPath)) : {};
        if (configData.expand !== config.expand || configData.detail !== config.detail) {
            configData.expand = config.expand;
            configData.detail = config.detail;
            Fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
        }
        // 快捷键
        const packageData = JSON.parse(Fs.readFileSync(packagePath));
        const item = packageData['main-menu']['i18n:MAIN_MENU.package.title/引用查找器/查找当前选中资源'];
        if (item['accelerator'] !== config.hotkey) {
            item['accelerator'] = config.hotkey;
            Fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
        }
    },

    /**
     * 读取配置
     * @param {boolean} readHotKey 是否读取快捷键
     * @returns {{expand: boolean, detail: boolean, hotkey?:string}}
     */
    read(readHotKey) {
        const config = {
            expand: true,
            detail: true
        };
        // 配置
        if (Fs.existsSync(configPath)) {
            const configData = JSON.parse(Fs.readFileSync(configPath));
            config.expand = configData.expand;
            config.detail = configData.detail;
        }
        // 快捷键
        if (readHotKey) {
            const packageData = JSON.parse(Fs.readFileSync(packagePath));
            config.hotkey = packageData['main-menu']['i18n:MAIN_MENU.package.title/引用查找器/查找当前选中资源']['accelerator'];
        }
        // 返回配置
        return config;
    }

}

module.exports = ConfigManager;
