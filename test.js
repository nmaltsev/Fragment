[
	'div  >  .test.tst2>a@href="http://yandex.ru"$link>{hello <xyz>}<span',
	' > .test.tst2>a@href="http://ain.ua"$link>{hello <xyz>}<<pan',
	'div > p > a > {abc} | ul > li > a > {xyz} < li > a > {123}',

	'select.optpage_urlblock-select@name=addingFlashSiteUrlSelector$select > '+
		'option@value=allow > {tAllow} < ' +
		'option@value=deny > {tDeny}',

	'> span.test, h2 > {abc} < span.test2 ',

	'div > {abc}, span > {link} < div > {xyz}',
	'div > span , span > {123} < {abc}<{xyz}',
].forEach(function(template){
	console.log('Test: %s', template);
	var doc = new Fragment(template);
	var 	node = doc.getNode(),
			child;

	for(var i = 0; i < node.childNodes.length; i++){
		child = node.childNodes[i];
		console.log('\t%s', child.outerHTML || child.textContent);
	}
	
});

/*
TODO
span > {abc},
span > {xyz}

*/