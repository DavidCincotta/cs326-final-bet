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

import pgPromise from 'pg-promise';
const pgp = pgPromise({});
const connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};
const db = pgp(connectionString );

export async function create(request){
    try{
        await db.none(request)
    }
    catch(e){
    }
}

export async function insert(request){
    try {
        await db.none(request)
    }
    catch(e){
        alert("Entry already exists!")
    }
}

export async function find(number, request){
    try {
        if (number === 1){
            return db.one(request)
        }
        else {
            return db.any(request)
        }
    }
    catch(e){
        alert("No such entry!")
    }
}

export async function updateDelete(request){
    try {
        db.none(request)
    }
    catch(e){
        alert("No such entry!")
    }
}
