//var pangoview=require('deps/node-pango-view');
var pangoview=require('./index');
console.log('will use pango view');
// also ram disk might help
//pangoview.write('hello world',{},function(file){ console.log('file is:'+file); }); // later do fs.unlink(path, [callback]) 
var subimages=[];

function fn1(callback) { pangoview.write('שלום עולם',{font:'Arial 12'},function(file){ console.log('file is:'+file); fn2(); }); }
function fn2(callback) { pangoview.write('שלום עולם',{font:'Arial 12'},function(file){ console.log('file is:'+file); fn3(); }); }
function fn3(callback) { pangoview.write('שלום עולם',{font:'Arial 12'},function(file){ console.log('file is:'+file); fin(); }); }
function fin(callback) { pangoview.compose('bgs/morguefile_97997.jpg',{}, subimages,{},callback) }

function run() {
fn1(callback)
function (outfile){
console.log('done')
}

}
