import {parseAST} from './parser.mjs';
import {ast2json} from './ast2json.mjs';

const snippets = [
    `h2>"header"
    | p>"Text 
    abc",a@href="https://argans.eu">"Argans"
    `,
    `
    "simple text" , a#abc.vbtn.__primary@href="http://argans.eu/?v=1" > "Read more" < "Next:"
    |h1.test#news>"Hello world!"
    |p>"any text"<"end"
    `,
    `
    h3 > "Territories for experimentation" <
    p > "SCO GreenSpace is the fruit of a dozen years of preparatory scientific work. An initial demonstrator of GreenSpace services has been deployed in 3 European cities (Aix-en-Provence, Florence and Kaunas). We are now moving on to the prototyping phase, considering the needs to be modulated according to the type of urban habitat, climatic conditions and the specific needs of local authorities. To overcome these problems, the services will be fully prototyped in 2 additional cities:" <
    ul > 
    li > "Territory 1: Valencia, Spain;" <
    li > "Territory 2 : Bucharest, Romania;<"
    `,
    '"By "<a@href="{url}">"{name}"<", on {date}"'
];

snippets.forEach(function(snippet, index){
    const ast = parseAST(snippet)
    console.log('\n\nTest #%s', index);
    // console.dir(ast)
    // console.dir(ast2json(ast))
    console.log(JSON.stringify(ast2json(ast), null, '\t'));
});