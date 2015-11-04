/*
Fragment compiler v3 16/10/2015
Compile template string at DocumentFragment

Examples:
div  >  .test.tst2>a@href="http://yandex.ru"$link>{hello <xyz>}<<span
	<div><div class="test tst2"><a href="http://yandex.ru">hello &lt;xyz&gt;</a><span></span></div></div>
> .test.tst2>a@href="http://ain.ua"$link>{hello <xyz>}<<span
	<div><div class="test tst2"><a href="http://ain.ua">hello &lt;xyz&gt;</a><span></span></div></div>
div > p > a > {abc} | ul > li > a > {xyz} <<< li > a > {123}
	<div><p><a>abc</a></p></div>
	<ul><li><a>xyz</a></li><li><a>123</a></li></ul>
select.optpage_urlblock-select@name=addingFlashSiteUrlSelector$select > option@value=allow > {tAllow} << option@value=deny > {tDeny}
	<select class="optpage_urlblock-select" name="addingFlashSiteUrlSelector"><option value="allow">tAllow</option><option value="deny">tDeny</option></select>
> span.test, h2 > {abc} << span.test2 
	<div><span class="test"></span><h2>abc</h2><span class="test2"></span></div>
div > {abc}, span > {link} << div > {xyz}
	<div>abc<span>link</span><div>xyz</div></div>
	
Use quotes if you want escape converting symbols in attribute
	href="http://yandex.ru"
Use brackets if you want insert text nodes
	{hello <xyz>}
If you want bind node - use `$`
	$link

Operators:
'>' previous node would be parent of current
'<' parent of previous node would be parent of current node 
',' current node would be after previous
'|' set root of fragment node as current
*/

function Fragment(template){
	this.root = document.createDocumentFragment();
	this.bind = {};

	var 	list = template.split(/\s*(\{[^\}]*\}|\>|\,|\<+|\|)\s*/g).filter(function(s){return s && s;}),
			buf,
			i, j, len;

	len = this.isOperator(list[0]) ? list.unshift('div') : list.length;
	buf = this.parseNode(list[0].trim());
	this.root.appendChild(buf);
	this.current = (buf instanceof Text) ? this.root : buf;

	for(i = 1; i < len; i += 2){
		buf = this.parseNode(list[i+1].trim());	

		if(list[i] == '>'){
			if(this.current instanceof Text){
				this.current.parentNode.appendChild(buf)
			}else{
				this.current.appendChild(buf);
			}
			this.current = buf;
		}else if(list[i][0] == '<'){
			j = list[i].length;
			while(j-- > 0 && this.current.parentNode){
				this.current = this.current.parentNode;
			}
			this.current.appendChild(buf);
			this.current = buf;
		}else if(list[i] == ','){
			this.current.parentNode.appendChild(buf);
			this.current = buf;
		}else if(list[i] == '|'){
			this.root.appendChild(buf);
			this.current = buf;
		}
	}
}
Fragment.prototype.getNode = function(){
	return this.root;
}
Fragment.prototype.isOperator = function(str){
	return str == '>' || str[0] == '<' || str == ',' || str == '|';
}
Fragment.prototype.parseNode = function(str){
	if(str[0] == '{'){
		return document.createTextNode(str.substring(1, str.length - 1));
	}else{
		var 	list = str.split(/\s*([\w\-_]+\=\"[^"]+\"|\.|\$|\@)\s*/g).filter(function(s){return s && s;}),
				i = 0,
				tag, buf
				len = list.length;

		if(list[0] == '.' || list[0] == '$' || list[0] == '@'){
			tag = 'div';
		}else{
			tag = list[0];
			i++;
		}
		var $node = document.createElement(tag);

		for(; i < len; i += 2){
			if(list[i] == '.'){
				$node.classList.add(list[i+1]);
			}else if(list[i] == '$'){
				this.bind[list[i+1]] = $node;
			}else if(list[i] == '@'){
				buf = list[i+1].split('=');
				$node.setAttribute(buf[0].trim(), this.escapeAttrVal(buf[1]));
			}
		}
		return $node;	
	}
}
Fragment.prototype.escapeAttrVal = function(str){
	var val = str && str.trim();
	
	if(val){
		val = val.replace(/\"/g, '');
	}
	return val;
}
