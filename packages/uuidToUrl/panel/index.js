// panel/index.js
Editor.Panel.extend({
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  template: `
    <h2>标准面板</h2>
   
    <hr />
	<ui-prop name="input" tooltip="输入uuid或者压缩的uuid" v-show="isManifest">
		<div class="layout horizontal center flex-1 ">
            <ui-input id="input" class="flex-1" v-value="input" v-on:blur="onSaveCfg"></ui-input>
            </div>
        </ui-prop>
	<ui-button id="uuidToPath">uuidToPath</ui-button>
	<ui-button id="compressUUID">compressUUID</ui-button>
	<ui-button id="decompressUUID">decompressUUID</ui-button>
	<ui-button id="pathToUUID">pathToUUID</ui-button>
    <div>状态: <span id="label">--</span></div>
  `,
  
  
  $: {
    btn: '#uuidToPath',
	btn1: '#compressUUID',
	btn2: '#decompressUUID',
	btn3: '#pathToUUID',
	input: '#input',
    label: '#label',
  },
  
  messages: {
	  "showResult":function(event,...args)
	  {
		  let msg = args[0];
		  this.$label.interText = msg;
	  }
  },


  ready () {
    this.$btn.addEventListener('confirm', () => {
		Editor.log("click");
		Editor.Ipc.sendToMain("simple-package:uuidToPath", this.$input.value);
		
    });
	this.$btn1.addEventListener('confirm', () => {
      Editor.Ipc.sendToMain("simple-package:compressUUID", this.$input.value);
    });
	    this.$btn2.addEventListener('confirm', () => {
      Editor.Ipc.sendToMain("simple-package:decompressUUID", this.$input.value);
    });
	    this.$btn3.addEventListener('confirm', () => {
      Editor.Ipc.sendToMain("simple-package:pathToUUID", this.$input.value);
    });
  },
});