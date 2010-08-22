var pangoview=require('./index.js');
console.log('will use pango view');
// also ram disk might help
//pangoview.write('hello world',{},function(file){ console.log('file is:'+file); }); // later do fs.unlink(path, [callback]) 
pangoview.write('שלום עולם',{font:'Arial 12'},function(file){ console.log('file is:'+file); });