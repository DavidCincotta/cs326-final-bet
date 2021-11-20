import pgPromise from 'pg-promise';
const pgp = pgPromise({});

const connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};
const db = pgp(connectionString);

export async function noneFunction(request){
    try{
        await db.none(request)
    }
    catch(e){
    }
}

export async function oneFunction(request){
    try {
        await db.one(request)
    }
    catch(e){
        alert("Entry already exists!")
    }
}

export async function anyFunction(request){
    try {
        return db.any(request)
    }
    catch(e){
        alert("No such entry!")
    }
}
