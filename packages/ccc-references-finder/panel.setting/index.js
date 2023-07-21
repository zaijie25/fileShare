const Fs = require('fs');

Editor.Panel.extend({

  style: Fs.readFileSync(Editor.url('packages://ccc-references-finder/panel.setting/index.css'), 'utf8'),

  template: Fs.readFileSync(Editor.url('packages://ccc-references-finder/panel.setting/index.html'), 'utf8'),

  ready() {
    const app = new window.Vue({
      el: this.shadowRoot,

      data: function () {
        return {

          expand: true,
          detail: true,
          hotkey: 'F6',

          isProcessing: false
        }
      },

      methods: {

        /**
         * 保存配置
         */
        onSaveBtnClick() {
          if (this.isProcessing) return;
          this.isProcessing = true;

          const config = {
            expand: this.expand,
            detail: this.detail,
            hotkey: this.hotkey
          };

          Editor.Ipc.sendToMain('ccc-references-finder:save-config', config, () => {
            this.isProcessing = false;
          });
        },

        /**
         * 读取配置
         */
        readConfig() {
          Editor.Ipc.sendToMain('ccc-references-finder:read-config', (err, config) => {
            if (err || !config) return;
            for (const key in config) {
              this[key] = config[key];
            }
          });
        }

      }
    });

    app.readConfig();

  }

});
