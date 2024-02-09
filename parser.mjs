const OPERATORS = ['>', '<', '|', ','];

export function parseAST(snippet){
    const out = {children:[]};
    let isLiteral = false;
    let buffer = '';
    let isTag = true;
    let root = out;
    for(let i=0,len=snippet.length,char;char=snippet[i],i<len;i++){
        if ((char === ' ' || char === '\t' || char === '\n') && !isLiteral) {
            continue;
        }
        if (char === '"') {
            isLiteral = ! isLiteral;
            buffer += char;
            continue;
        }
        
        if (!isOperator(char)) {
            isTag = true;
            buffer += char;
        } else {
            isTag = false;
            // console.log('T: %s Op: %s',buffer, char);
            let node;
            if (buffer.length) {
                node = parseTag(buffer, root);
                buffer = '';
                root.children.push(node);
            } 
            if (char === '>') {
                if(node) root = node;
            }
            else if (char === '<') {
                root = root.parent;
            }
            else if (char === ',') {
                // do nothing
            }
            else if (char === '|') {
                root = out;
            }
            
        }
    }
    if (isTag && buffer.length > 0) {
        const node = parseTag(buffer, root);
        buffer = '';
        root.children.push(node);
    }
    return out;
}
function isOperator(char) {
    return OPERATORS.indexOf(char) > -1;
}
const ITEM_TYPE = {
    node: 1,
    text: 0
};
const ATTR_TYPE = {
    tagName: 1,
    className: 2,
    id: 3,
    attribute: 4,
    aliasName: 5
}
const ATTR_OPERATORS = ['#','.','@', '$']
function parseTag(litter, parent) {
    if (litter[0] === '"') {
        return {
            text: litter.substr(1, litter.length - 2),
            // type: ITEM_TYPE.text,
            parent
        };
    }
    const node = {
        children: [],
        tag: 'div',
        id: undefined,
        alias: undefined,
        attrs: {},
        classes: [],
        parent
    }
    let opId = ATTR_TYPE.tagName;
    let buf = '';
    let isLitter = false;
    for(let i=0,len=litter.length,char;char=litter[i],i<len;i++){
        if (char === '"') {
            isLitter = !isLitter;
            continue;
        }
        if (ATTR_OPERATORS.indexOf(char) > -1 && !isLitter) { // is an operator
            parseAttribute(node, opId, buf);   
            buf = '';

            if (char === '.') {
                opId = ATTR_TYPE.className;
            }
            else if (char === '#') {
                opId = ATTR_TYPE.id;
            }
            else if (char === '$') {
                opId = ATTR_TYPE.aliasName
            }
            else if (char === '@') {
                opId = ATTR_TYPE.attribute;
            }
        } else {
            buf += char;
        }
    }
    if (buf.length > 0) {
        parseAttribute(node, opId, buf);
    }
    return node;
}
function parseAttribute(node, opId, buf) {
    if (opId === ATTR_TYPE.tagName) {
        node.tag = buf;
    }
    else if (opId === ATTR_TYPE.id) {
        node.id = buf;
    }
    else if (opId === ATTR_TYPE.aliasName) {
        node.alias = buf;
    }
    else if (opId === ATTR_TYPE.attribute) {
        const pos = buf.indexOf('=');
        if (pos > -1) {
            node.attrs[buf.substr(0, pos)] = parseLitter(buf.substr(pos + 1));
        } else {
            node.attrs[buf] = true;
        }
    }
    else if (opId === ATTR_TYPE.className) {
        node.classes.push(buf)
    }
}
function parseLitter(string) {
    if (string[0] === '"') {
        return string.substr(1, string.length - 2)
    }
    return string;
}

