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

export function ast2jsx(ast: IRootNode){
    return ast.children.map(function translateElement(element: IElement | IText):any {
        if (element.hasOwnProperty('text')) {
            return (element as IText).text;
        } 
        const el = element as IElement;
        // TODO translate HTML attributes into JSX attributes
        const props:Record<string,string> = {...el.attrs};
        if (el.hasOwnProperty('id')) props['id'] = el.id;
        if (el.hasOwnProperty('classes')) props['className'] = el.classes.join(' ');
        
        return React.createElement(el.tag, props, ...el.children.map(translateElement))
    })
}
export function emmet2jsx(content: string) {
    const ast = parseAST(content);
    return ast2jsx(ast);
}

