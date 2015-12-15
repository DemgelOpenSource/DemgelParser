import {ParserOptions} from './ParserOptions';

export function escape(html: string, encode?: boolean) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function unescape(html: string) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

export function replace(regex, opt?) : any {
	regex = regex.source;
	opt = opt || '';
	return function self(name, val) : any {
		if (!name) return new RegExp(regex, opt);
		val = val.source || val;
		val = val.replace(/(^|[^\[])\^/g, '$1');
		regex = regex.replace(name, val);
		return self;
	};
}

export function validateStyle(source: string, options: ParserOptions) : string {
  var retString = "";
  while(source) {
    var matches = options.compiledStyles.exec(source);
      if (matches) {
        source = source.substring(matches[0].length);
        if (matches[1]) {
          retString = retString + matches[2] + ": " + matches[3] + ";";
        }
      }
    }
  console.log(retString);
	return retString;
}

export function validateClass(source: string, options: ParserOptions) : string {
  var retString = "";
  while(source) {
    var matches = options.compiledClasses.exec(source);
      if (matches) {
        source = source.substring(matches[0].length);
        if (matches[1]) {
          retString = retString + ((retString === '') ? '' : ' ') + matches[1]; 
        }
      }
  }
  
  return retString;
}
