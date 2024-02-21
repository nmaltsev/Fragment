import React from 'react';
import { parseAST } from './parser';

interface IRootNode {
    children: (IElement | IText)[];
}
interface IItem {
    parent: IRootNode;
}
interface IElement extends IRootNode, IItem {
    tag: string;
    id: string;
    alias: string;
    attrs: Record<string, string>;
    classes: string[];
}
interface IText extends IItem {
    text: string;
}
const KEBAB_PATERN = /-(.)/ig;
function splitPair(pair:string): [string, string|undefined] {
    let pos = pair.indexOf(':');
    let key = pos < 0 ? pair : pair.substr(0, pos);
    let value = pos < 0 ? undefined : pair.substr(pos + 1); 
    return [key, value];
}
type ReactStyle = Record<string, string|undefined>;
export function ast2jsx(ast: IRootNode): React.ReactNode[]{
    return ast.children.map(function translateElement(element: IElement | IText, index: number): React.ReactNode {
        if (element.hasOwnProperty('text')) {
            return (element as IText).text;
        } 
        const el = element as IElement;
        const {style, ...rest_attrs} = el.attrs;
        
        // TODO translate HTML attributes into JSX attributes
        const props:Record<string, string|ReactStyle> = {
            key: index + '',
            ...rest_attrs
        };
        if (el.hasOwnProperty('id')) props['id'] = el.id;
        if (el.hasOwnProperty('classes') && el.classes.length > 0) props['className'] = el.classes.join(' ');
        if (style) {
            props['style'] = style.split(';').reduce(function(collection, keyvalue){
                const [key, value]:[string, string|undefined] = splitPair(keyvalue);
                
                collection[key.replace(KEBAB_PATERN, (_:string, m1:string) => m1.toUpperCase()) as string] = value;
                return collection;
            }, {} as ReactStyle);
        }
        
        return React.createElement(el.tag || 'div', props, ...el.children.map(translateElement))
    })
}
export function emmet2jsx(content: string, replacements?:Record<string, string>) {
    let _content = content;
    if (replacements) {
        let keys = Object.keys(replacements), i = keys.length;
        while(i--> 0) {
            _content = _content.replace('{' + keys[i] + '}', replacements[keys[i]]);
        }
    }
    const ast = parseAST(_content);
    return ast2jsx(ast);
}

