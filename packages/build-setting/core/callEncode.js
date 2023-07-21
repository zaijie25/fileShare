// const exec = require('child_process').exec;
const fs = require('fs');
const encoding = require('encoding');
const path = require('path');
const walk = require('walk');


// function callPython(path, res, prefix, key, cb) {
// 	exec('python2 ' + path + ' ' + res + ' ' + prefix + ' ' + key, function(error,stdout,stderr){
// 	    if(stdout.length >1){
// 	        // console.log('you offer args:',stdout);
// 	        cb(error,stderr)
// 	    } else {
// 	        // console.log('you don\'t offer args');
// 	    }
// 	    if(error) {
// 	        // console.info('stderr : '+stderr);
// 	        cb(error,stderr)
// 	    }
// 	});
// }

// function encodeDir(dir, res, prefix, key, cb){
// 	fs.readdir(dir, (err, files)=>{
// 		if (err){
// 			console.error(err);
// 			return;
// 		}
// 		files.forEach((filename)=>{
// 			let pathname = path.join(dir, filename)
// 			let info = fs.statSync(pathname);
// 			if (info.isDirectory()){
// 				encodeDir(pathname, pathname, prefix, key, cb);
// 			}
// 			else{
// 				if (path.extname(pathname) == ".png"){
// 					console.error(pathname, path.extname(pathname));
// 					encodeFile(pathname, pathname, prefix, key, cb);
// 				}
// 			}
// 		})
// 	})
// }

function encodeFile(path, res, prefix, key){
	try{
		let inBuffer = fs.readFileSync(path);
		let outBuffer = prefix + key;
		let keyCode = key.charCodeAt();
		for(let b of inBuffer){
			outBuffer = outBuffer + String.fromCharCode(b ^ keyCode);
		}
		fs.writeFileSync(res, encoding.convert(outBuffer, "Latin_1"));
		Editor.log(`[${path}]图片加密成功`);
	}
	catch(err){
		Editor.error(`[${path}]图片加密失败`);
	}
}

function encodeDirByWalk(dir, prefix, key, cb){
	let walker = walk.walk(dir, {followLinks: false});
	walker.on('file', (roots, stat, next)=>{
		let pathname = path.join(roots, stat.name);
		if (path.extname(pathname) == '.png'){
			encodeFile(pathname, pathname, prefix, key, cb);
		}
		next();
	})

	walker.on('end', ()=>{
		Editor.log("图片加密结束");
		if (cb)
			cb()
	})
}


module.exports = {
    build : function(dir, prefix, key, cb){
        encodeDirByWalk(dir, prefix, key, cb);
	},
}