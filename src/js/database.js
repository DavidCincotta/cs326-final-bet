import * as fs from 'fs';

const dbFile = './db.json';
let db={};
if(fs.existsSync(dbFile)){
    db = JSON.parse(fs.readFileSync(stateFile));
}
function write(){
    fs.writeFileSync(dbFile,JSON.stringify(db));
}

function findId(table,id){
    return db.table[id];
}

function findAndUpdate(table,id,obj){
    if(table in db && id in db.table){
        db.table[id] = obj;
        return true;
    }
    else: return false;
}

function insert(table,obj){
    //TODO
    //autopopulate id fields

    let id = db.table.length;
    db.table.push(obj);
    return id;
}
