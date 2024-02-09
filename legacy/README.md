# Fragment
=======
  
A js lib for transforming templates into  documentFragment instances.
    
* It's compact;
* It doesn't use innerHTML and plain text to create DOM;
* Emmet like code style.
  
You can use Fragment when you can't (or don't whant) change innerHTML property of html element.
  
## examples
--------------------
Ex. 1 Use `>`  and `<` to change location
```
'div  >  .test.tst2 > a@href="http://yandex.ru"$link > {hello <xyz>} < span'
	<div><div class="test tst2"><a href="http://ain.ua">hello &lt;xyz&gt;</a></div><span></span></div>
```
Ex. 2. Div is a default first node
```
'> .test.tst2>a@href="http://ain.ua"$link>{hello <xyz>}<span' 
	<div><div class="test tst2"><a href="http://yandex.ru">hello &lt;xyz&gt;</a></div><span></span></div>
```
Ex. 3. Use `|` to begin from the root node
```
'div > p > a > {abc} | ul > li > a > {xyz} << li > a > {123}'
	<div><p><a>abc</a></p></div>
	<ul><li><a>xyz</a></li><li><a>123</a></li></ul>
```
Ex. 4 Use `$` to alias html element with object property
```
'select.optpage_urlblock-select@name=addingFlashSiteUrlSelector$select > option@value=allow > {tAllow} < option@value=deny > {tDeny}'
	<select class="optpage_urlblock-select" name="addingFlashSiteUrlSelector"><option value="allow">tAllow</option><option value="deny">tDeny</option></select>
```
Ex. 5. Use `,` for listening
``` 		
'> span.test, h2 > {abc} < span.test2'
	<div><span class="test"></span><h2>abc</h2><span class="test2"></span></div>
```
  
Code example
------------------ 
```
var doc = new Fragment(template);
@return {DocumentFragment}
var node = doc.getNode();

{Object} doc.alias - aliases on html elements
```

