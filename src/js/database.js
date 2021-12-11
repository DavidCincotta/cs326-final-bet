import pgPromise from 'pg-promise';
//    Connects Server to the postsql database    //
const pgp = pgPromise({});
const connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};
const db = pgp(connectionString);
///////////////////////////////////////////////

//Database none request
export async function noneFunction(request){
    try{
        const result = await db.none(request);
    }
    catch(e){
    }
}
//Database one request
export async function oneFunction(request){
    try {
        const result = db.one(request);
        return result;
    }
    catch(e){
        alert("Entry already exists!")
    }
}
//Database any request
export async function anyFunction(request){
    try {
        const result = db.any(request);
        return result;
    }
    catch(e){
        alert("No such entry!")
    }
}
