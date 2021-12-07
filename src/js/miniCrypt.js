import c from 'crypto'
//Edited version of miniCrypt from class
class miniCrypt{
    constructor(){
        this.its = 1e5;
        this.keyL = 64;
        this.saltL = 16;
        this.digest = 'sha256'
    }
    hash(pw){
        //salt is 32, hash is 128
        const salt = c.randomBytes(this.saltL).toString('hex'); // get our new salt for this pw
        const hash = c.pbkdf2Sync(pw, salt, this.its, this.keyL, this.digest).toString('hex'); // hash the pw
        return [hash, salt]; // return the pair for safe storage
    }
    check(pw,salt,hash){
        return c.timingSafeEqual(c.pbkdf2Sync(pw, salt, this.its, this.keyL, this.digest), Buffer.from(hash, 'hex'));
    }
}
export {miniCrypt}