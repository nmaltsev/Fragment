import { parseAST } from "./parser.mjs";

const samples = [
    // '!abcdefgh',
`
# title1
## title2

* list item1
* list item2

__bold__
**italic**
text1  
text2
[google](http://google.com)
[google2 ""](http://yandex.com)
"aaa"
` ,
'**__abc__**',
'* **abc**\n',  
]

samples.forEach(sample => {
    const res = parseAST(sample);
    console.dir(res)
});
