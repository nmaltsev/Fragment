const rull_header1 = {start: '# ', end: '\n', id: 'h1'};
const rull_header2 = {start: '## ', end: '\n', id: 'h2'};
const rull_header3 = {start: '### ', end: '\n', id: 'h3'};
const rull_1 = {start: '* ', end: '\n', id: 'li'};
const rull_2 = {start: '__', end: '__', id: 'B'};
const rull_3 = {start: '**', end: '**', id: 'I'};
const rull_4 = {start: '[', end: ']', id: 'Link'};
const rull_5 = {start: '![', end: ']', id: 'Img'};
const rull_6 = {start: '(', end: ')', id: 'Brackets'};
const rull_7 = {start: '"', end: '"', id: 'Quota'};

const rulls = [rull_header1, rull_header2, rull_header3, rull_1, rull_2, rull_3, rull_4, rull_5, rull_6, rull_7];

const rullSet = rulls.reduce((collection, rull) => {
    collection.start[rull.start] = rull;
    collection.end[rull.end] = rull;
    return collection;
}, {start: {}, end: {}});
const rullStack = [];

export function parseAST(str) {
    let startingRull;
    let activeRull;
    let pos = 0, slice='';
    for(
        let i = 0, last1, last2, last3, prev; 
        i < str.length, last3 = (last2 ? last2: '') + str[i], last2 = (last1 ? last1 : '') + str[i], prev=last1, last1=str[i]; 
        i++
    ){
        startingRull=rullSet.start[last3] || rullSet.start[last2] || rullSet.start[last1];

        if (activeRull) {
            const isModal = activeRull.start == activeRull.end;

            if (isModal && (activeRull.end == last1 || activeRull.end == last2 || activeRull.end == last3)) {
                // "..."
                slice = str.substring(pos, i);
                pos = i + 1; // TODO
                // on end: push slice into activeRull
                console.log('End1 %s p:%s, SL %s', activeRull.id, i, slice)
                activeRull = rullStack.pop();    
            } else if(startingRull) {
                rullStack.push(activeRull);
                // TODO on start: push slice into activeRull 
                
                slice = str.substring(pos, i);
                pos = i + 1; // TODO
                
                activeRull = startingRull;
                console.log('Start %s p:%s SL %s', activeRull.id, i, slice)
            } else {
                if (activeRull.end == last1 || activeRull.end == last2 || activeRull.end == last3) {
                    slice = str.substring(pos, i);
                    pos = i+1; // TODO
                    console.log('End2 %s p:%s SL %s', activeRull.id, i, slice)
                    activeRull = rullStack.pop();    
                }
            }
        } 
        else if (startingRull) {
            activeRull = startingRull;
            
            slice = str.substring(pos, i);
            pos = i+1; // TODO
            console.log('Start %s p:%s SL %s', activeRull.id, i, slice)
        }
    }
    slice = str.substring(pos);
    if (slice) {
        console.log('SL %s', slice)
    }
}
