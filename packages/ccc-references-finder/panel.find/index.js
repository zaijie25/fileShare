const Fs = require('fs');

Editor.Panel.extend({

  style: Fs.readFileSync(Editor.url('packages://ccc-references-finder/panel.find/index.css'), 'utf8'),

  template: Fs.readFileSync(Editor.url('packages://ccc-references-finder/panel.find/index.html'), 'utf8'),

  ready() {
    new window.Vue({
      el: this.shadowRoot,

      data: function () {
        return {

          uuid: '',

          isProcessing: false
        }
      },

      methods: {

        /**
         * 查找
         */
        onSearchBtnClick() {
          if (this.isProcessing) return;
          this.isProcessing = true;
          Editor.Ipc.sendToMain('ccc-references-finder:find-via-uuid', this.uuid, () => {
            this.isProcessing = false;
          });
        }

      }
    });
  }

});
