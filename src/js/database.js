// import * as fs from 'fs';

// const dbFile = './db.json';
// let db={};
// if(fs.existsSync(dbFile)){
//     db = JSON.parse(fs.readFileSync(stateFile));
// }
// function write(){
//     fs.writeFileSync(dbFile,JSON.stringify(db));
// }

// function findId(table,id){
//     return db.table[id];
// }

// function findAndUpdate(table,id,obj){
//     if(table in db && id in db.table){
//         db.table[id] = obj;
//         return true;
//     }
//     else: return false;
// }

// function insert(table,obj){
//     //TODO
//     //autopopulate id fields

//     let id = db.table.length;
//     db.table.push(obj);
//     return id;
// }

const pgp = require('pg-promise')();
const db = pgp(connection);

async function create(request){
    try{
        await db.none(request)
    }
    catch(e){
    }
}

async function insert(request){
    try {
        await db.none(request)
    }
    catch(e){
        alert("Entry already exists!")
    }
}

async function find(number, request){
    try {
        if (number === 1){
            return db.one(request)
        }
        else {
            return db.many(request)
        }
    }
    catch(e){
        alert("No such entry!")
    }
}

async function updateDelete(request){
    try {
        db.none(request)
    }
    catch(e){
        alert("No such entry!")
    }
}
