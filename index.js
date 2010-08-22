var sys   = require('sys'),
    exec  = require('child_process').exec;

this.tempdir=__dirname+'/';

var errorimage=""; //error image full path

var lastrandom=[]
var lastrandom_time=0;
function uniquerandom()
{
  var newtime=(new Date()).getTime(),random;
  if(lastrandom_time!=newtime&&lastrandom.length>0) lastrandom=[];
  do 
  {
   random=Math.floor(Math.random() * 9999);
  } while (lastrandom.indexOf(random)!=-1);
  lastrandom.push(random);
  return (newtime*10000)+random;
} this.uniquerandom=uniquerandom();


    
function show_error(error, stdout, stderr)
  {
    sys.print('pango-view_stdout: ' + stdout);
    sys.print('pango-view_stderr: ' + stderr);
    if (error !== null)
    {
      console.log('pango-view_exec error: ' + error);
    }
  }
  // &lt;html&gt;.
var exec_option={timeout:1500};

function write(text,options,callback)
{
  var file=('file' in options) ? this.tempdir+options['file'] : this.tempdir+uniquerandom()+'.png';


  var args_str='',args=[];
  
  args.push('-q'); // command line only
  args.push('--background=transparent');
  args.push('--markup');
  
  if(('no-auto-dir' in options) && options['no-auto-dir'])    args.push('--no-auto-dir');
  if('dpi' in options)          args.push('--dpi='+options['dpi']);
  if('align' in options)        args.push('--align='+options['align']);
  if('ellipsize' in options)    args.push('--ellipsize='+options['ellipsize']);
  if('font' in options)         args.push('--font='+options['font']);
  if('color' in options)        args.push('--foreground='+options['color']);
  if('gravity' in options)      args.push('--gravity='+options['gravity']);
  if('gravity-hint' in options) args.push('--gravity-hint='+options['gravity-hint']);
  //if(('header' in options)    && options['header'])         args.push('--header');
  if('height' in options)       args.push('--height='+options['height']);
  if('hinting' in options)      args.push('--hinting='+options['hinting']);
  if('indent' in options)       args.push('--indent='+options['indent']);
  if('gravity' in options)      args.push('--gravity='+options['align']);
  if(('justify' in options)     && options['justify'])        args.push('--justify');
  if('language' in options)     args.push('--language='+options['language']);
  if('margin' in options)       args.push('--margin='+options['margin']);
  if(('pixels' in options)      && options['pixels'])         args.push('--pixels');
  if(('rtl' in options)         && options['rtl']) args.push('--rtl');
  if('rotate' in options)       args.push('--rotate='+options['rotate']);
  if(('single-par' in options)  && options['single-par'])     args.push('--single-par');
  //if(('version' in options)   && options['version'])        args.push('--version');
  if(('waterfall' in options)   && options['waterfall'])      args.push('--waterfall');
  if('width' in options)        args.push('--width='+options['width']);
  if('wrap' in options)         args.push('--wrap='+options['wrap']);
  
  
  // some more options here
  
  args.push('--text='+text); // add text
  args.push('--output='+file); // save to file only
  
  for(var i=0;i<args.length;i++)
  {
   args_str+=" '"+args[i].replace(/[^\\]'/g, function(m)
   {
    return m.slice(0, 1)+'\\\'';
   })+"'";
  }
  //child = exec('pangoview *.js bad_file | wc -l',
  var child = exec('pango-view '+args_str,exec_option,  show_error );
  child.on('exit',function (code, signal) {if(code==0) callback(file); else callback(errorimage)});
} this.write=write;



/*
# pango-view --help-all
Usage:
  pango-view [OPTION...] - FILE

Help Options:
  -h, --help                                         Show help options
  --help-all                                         Show all help options
  --help-cairo                                       Options understood by the cairo backend

Cairo backend options:
  --annotate=1 or 2                                  Annotate the output

Application Options:
  --no-auto-dir                                      No layout direction according to contents
  --backend=cairo/xft/ft2/x                          Pango backend to use for rendering (default: cairo)
  --background=red/#rrggbb/#rrggbbaa/transparent     Set the background color
  -q, --no-display                                   Do not display (just write to file or whatever)
  --dpi=number                                       Set the resolution
  --align=left/center/right                          Text alignment
  --ellipsize=start/middle/end                       Ellipsization mode
  --font=description                                 Set the font description
  --foreground=red/#rrggbb/#rrggbbaa (changed to 'color')          Set the text color
  --gravity=south/east/north/west/auto               Base gravity: glyph rotation
  --gravity-hint=natural/strong/line                 Gravity hint
  --header                                           Display the options in the output
  --height=+points/-numlines                         Height in points (positive) or number of lines (negative) for ellipsizing
  --hinting=none/auto/full                           Hinting style
  --indent=points                                    Width in points to indent paragraphs
  --justify                                          Align paragraph lines to be justified
  --language=en_US/etc                               Language to use for font selection
  --margin=pixels                                    Set the margin on the output in pixels
  --markup                                           Interpret text as Pango markup
  -o, --output=file                                  Save rendered image to output file
  --pangorc=file                                     pangorc file to use (default is ./pangorc)
  --pixels                                           Use pixel units instead of points (sets dpi to 72)
  --rtl                                              Set base direction to right-to-left
  --rotate=degrees                                   Angle at which to rotate results
  -n, --runs=integer                                 Run Pango layout engine this many times
  --single-par                                       Enable single-paragraph mode
  -t, --text=string                                  Text to display (instead of a file)
  --version                                          Show version numbers
  --waterfall                                        Create a waterfall display
  -w, --width=points                                 Width in points to which to wrap lines or ellipsize
  --wrap=word/char/word-char                         Text wrapping mode (needs a width to be set)
*/