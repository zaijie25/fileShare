'use strict';

module.exports = {
  load () {
  },

  unload () {
  },

  messages: {
    open() {
      Editor.Panel.open('simple-package');
    },
	'uuidToPath': function(event, ...args)
	{
		Editor.log(args[0]);
		for(let key in Editor.assetdb)
		{
			Editor.log("assetdb", key);
		}
		for(let key in Editor.Utils)
		{
			Editor.log("utils", key);
		}
		if(args.length > 0)
		{
			Editor.log(args[0]);
			Editor.log(Editor.assetdb.uuidToFspath(args[0]));
			Editor.log(Editor.assetdb.uuidToUrl(args[0]));
			Editor.Ipc.sendToPanel("simple-package","simple-package:showResult", Editor.assetdb.uuidToUrl(args[0]));
		}
	},
	'compressUUID': function(event, ...args)
	{
		if(args.length > 0)
		{
			Editor.log(Editor.Utils.UuidUtils.compressUuid);
			Editor.log(Editor.Utils.UuidUtils.compressUuid(args[0], true));
		}
	},
	'decompressUUID': function(event, ...args)
	{
		if(args.length > 0)
		{
			let uuid = Editor.Utils.UuidUtils.decompressUuid(args[0])
			Editor.log(uuid);
			Editor.log(Editor.assetdb.uuidToUrl(uuid));
		}
	},
  },
};