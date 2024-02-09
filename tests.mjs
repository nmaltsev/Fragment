import {parseAST} from './parser.mjs';

const snippets = [
    // `h2>"header"
    // | p>"Text 
    // abc",a@href="https://argans.eu">"Argans"
    // `,
    `
    "simple text" , a#abc.vbtn.__primary@href="http://argans.eu/?v=1" > "Read more" < "Next:"
    |h1.test#news>"Hello world!"
    |p>"any text"<"end"
    `
];

snippets.forEach(function(snippet){
    const ast = parseAST(snippet)
    console.dir(ast)
    console.dir(ast.children[1])


})