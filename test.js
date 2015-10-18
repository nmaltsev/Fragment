[
	'div  >  .test.tst2>a@href="http://yandex.ru"$link>{hello <xyz>}<<span',
	' > .test.tst2>a@href="http://ain.ua"$link>{hello <xyz>}<<span',
	'div > p > a > {abc} | ul > li > a > {xyz} << li > a > {123}',

	'select.optpage_urlblock-select@name=addingFlashSiteUrlSelector$select > '+
		'option@value=allow > {tAllow} < ' +
		'option@value=deny > {tDeny}',

	'> span.test, h2 > {abc} < span.test2 '
].forEach(function(template){
	console.log('Test: %s', template);
	var doc = new Fragment(template);
	var node = doc.getNode();

	for(var i = 0; i < node.children.length; i++){
		console.log('\t%s', node.children[i].outerHTML);
	}
	
});

/*
TODO
span > {abc},
span > {xyz}

*/