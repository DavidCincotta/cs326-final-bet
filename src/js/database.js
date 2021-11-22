import pgPromise from 'pg-promise';
const pgp = pgPromise({});
const connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};
const db = pgp(connectionString);

export async function noneFunction(request){
    try{
        const result = await db.none(request);
    }
    catch(e){
    }
}

export async function oneFunction(request){
    try {
        const result = db.one(request);
        return result;
    }
    catch(e){
        alert("Entry already exists!")
    }
}

export async function anyFunction(request){
    try {
        const result = db.any(request);
        return result;
    }
    catch(e){
        alert("No such entry!")
    }
}
