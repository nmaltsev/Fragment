function serialiseAttr(dict) {
    let out = '';
    for (let key in dict) {
        out += '@' + key;
        if (dict[key]) {
            out += '=' + dict[key];
        }
    }
    return out;
}

export function ast2json(ast){
    return ast.children.map(function translateElement(element, index) {
        if (element.hasOwnProperty('text')) {
            return element.text;
        } 

        return {
            id: (element.tag || '') + 
                (element['id'] ? '#' + element['id']: '') +
                (element.classes.length > 0 ? '.' + element.classes.join('.') : '') +
                serialiseAttr(element.attrs),
            children: element.children.map(translateElement)
        }
    })
}