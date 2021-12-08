import express, { json } from 'express';
import path from 'path';
import {noneFunction,oneFunction,anyFunction} from './js/database.js';
import { fileURLToPath } from 'url';
import {miniCrypt} from './js/miniCrypt.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/////////////////////////////////////////////
//////////// Express Defini. ////////////////
/////////////////////////////////////////////
const app = express();
// import express from "express"
app.use(express.json()); // lets you handle JSON input
app.use(express.static('src'));
const port = 8080;

// Crytpo initialization
const mc = new miniCrypt();

/////////////////////////////////////////////
//////////// HTML gets       ////////////////
/////////////////////////////////////////////

app.get('/courses',
    (req, res) => res.sendFile('/html/courses.html',
                    { 'root' : __dirname }));
app.get('/createCourse',
    (req, res) => res.sendFile('/html/createCourse.html',
                    { 'root' : __dirname }));
app.get('/createPost/:courseID',
    (req, res) => res.sendFile('/html/createPost.html',
                    { 'root' : __dirname }));
app.get('/directory',
    (req, res) => res.sendFile('/html/directory.html',
                { 'root' : __dirname }));
app.get('/Forum/:courseID',
    (req, res) => res.sendFile('/html/forum.html',
                    { 'root' : __dirname }));
app.get('/Forum/longpost/:courseID/:postID',
    (req, res) => res.sendFile('/html/forumPost.html',
                    { 'root' : __dirname }));
app.get('/index',
    (req, res) => res.sendFile('/html/index.html',
                    { 'root' : __dirname }));
app.get('/information/:courseID',
    (req, res) => res.sendFile('/html/information.html',
                { 'root' : __dirname }));
app.get('/Login',
    (req, res) => res.sendFile('/html/login.html',
                    { 'root' : __dirname }));
app.get('/resources/:courseID',
    (req, res) => res.sendFile('/html/resources.html',
                { 'root' : __dirname }));
app.get('/addResource/:courseID',
    (req, res) => res.sendFile('/html/addResource.html',
                { 'root' : __dirname }));
app.get('/search',
    (req, res) => res.sendFile('/html/search.html',
                    { 'root' : __dirname }));
app.get('/settings',
    (req, res) => res.sendFile('/html/settings.html',
                    { 'root' : __dirname }));
app.get('/signup',
    (req, res) => res.sendFile('/html/signup.html',
                    { 'root' : __dirname }));
app.get('/',
    (req, res) => res.redirect("/login"));
app.get('/editcourse/:course_id',
    (req, res) => res.sendFile('/html/information.html',
                { 'root' : __dirname }));

/////////////////////////////////////////////
//////////// Forum enpoints ////////////////
/////////////////////////////////////////////

// Query the database using the post id to retrieve the postTitle, posts array and the related course
app.get('/Forum/get/:postID',
    async (req, res) => {
        const postID = req.params.postID;
        const response = await oneFunction(`SELECT postTitle, posts, course FROM forum WHERE id = '${postID}'`)
        res.send(response);
    });

// Add a new course to the database using the provided course_key (CS326), postTitle, posts, and post date
app.post('/Forum/create', async (req, res) =>{
    const course = req.body['courseKey'];
    const title = req.body['postTitle'];
    const posts = req.body['posts'];
    const date = req.body['date'];
    await noneFunction(`INSERT INTO forum (posttitle, posts, course, date) VALUES ('${title}', array['${JSON.stringify(posts[0])}'::json], '${course}', '${date}')`)
    const postID = await oneFunction(`SELECT id FROM forum WHERE posttitle='${title}' AND course='${course}'`)
    res.send(postID)
});

// Add a new response to a previously created post.  
app.post('/Forum/longpost/:postID/update', async (req, res) => {
    const postID = req.params.postID;
    const posts = req.body['posts'];
    const dbPosts = await oneFunction(`SELECT posts FROM forum WHERE id = '${postID}'`)
    dbPosts['posts'].push(posts)
    // Used to correctly format the db query to the form below, which is accepted as a JSON array:
    // array['{"username": "user", "date": "today", "post": "the original post"}', ...]
    let dbUpdate = "array["
    for (const post of dbPosts['posts']){
        const newPost = `'${JSON.stringify(post)}'::json,`
        dbUpdate += newPost
    }
    dbUpdate = dbUpdate.slice(0, -1) + ']'
    await noneFunction(`UPDATE forum SET posts = ${dbUpdate} WHERE id = '${postID}'`)
    res.send({"status": res.statusCode})
    
})

// Query the database for the postTitle, id, and date for every post related to the given courseID
app.get("/getPosts/:courseID", async (req, res) => {
    const course = req.params.courseID;
    const courseList = await anyFunction(`SELECT posttitle, id, date FROM forum WHERE course = '${course}'`)
    res.send({"posts": courseList})
});

/////////////////////////////////////////////
//////////// Course enpoints ////////////////
/////////////////////////////////////////////

app.get("/getInfo/:course_id", async (req, res) => {
    const courseId = req.params.course_id
    const course = await oneFunction(`SELECT * FROM courses WHERE id = ${courseId}`);
    console.log('/getInfo/:course_id');
    console.log(course);
    res.send(course);
});

app.get("/Courses/directory", async (req, res) =>{
    const courseA = await anyFunction(`SELECT * FROM courses`);
    console.log("/Courses/directory");
    res.send(courseA);
});
app.post('/Courses/editcourse', async (req, res) =>{

    const id = req.body['id'];
    
    let query = 'update courses set '
    for(const key in req.body.keys()){
        if(key=='id') continue; 
        query+= key+' = '+req.body[key]+ ', '
    } 
    query = query.slice(0,query.length - 2); +'where id = '+id;
    console.log(query)
    await noneFunction(query);

});

app.post('/Courses/trackcourse', async (req, res) => {
    console.log('trackcourse');
    let user_courses = await oneFunction('select user_courses from account where user_id = '+req.body['user_id']);
    console.log(user_courses);
    if(!user_courses.split('-').includes(req.body['course'])){
        user_courses+='-'+req.body['course'];
    }
    await noneFunction(`update account set user_courses = ${user_courses} where user_id = ${req.body['user_id']}`)
    
});
app.post('/Courses/untrackcourse', async (req, res) => {
    console.log('untrackcourse');
    let user_courses = await oneFunction('select user_courses from account where user_id = '+req.body['user_id']);
    console.log(user_courses);
    if(user_courses.split('-').includes(req.body['course'])){
        user_courses=user_courses.replace('-'+req.body['course'],'');
    }
    await noneFunction(`update account set user_courses = ${user_courses} where user_id = ${req.body['user_id']}`)

});
app.post('/Courses/mycourses', async (req, res) => {
    console.log("/Courses/mycourses");
    const courses = await oneFunction(`select user_courses from account where user_id=${req.body['user_id']}`);
    let ids = ''
    for(const c in courses.split('-')){
        if(c.length>0){
            ids+=c+','
        }
    }
    if(ids.length>1) ids = ids.slice(0,ids.length-1);
    const course_list = await anyFunction(`SELECT * FROM courses WHERE IN (${ids})`);
    res.send(course_list);
});

app.post('/Courses/addcourse', async (req, res) =>{
    console.log('/Courses/addcourse');
    console.log(req.body);
    
    const name = req.body['course_name'];
    const college = req.body['college'];
    const short_description = req.body['short_description'];
    const long_description = req.body['long_description'];
    const professor = req.body['professor'];
    const start_year = req.body['start_year'];
    const course_number = req.body['course_number'];
    
    console.log('before insert');
    await noneFunction(`insert into courses (course_name,college,short_description,long_description,professor,start_year,course_number) values('${name}','${college}','${short_description}','${long_description}','${professor}','${start_year}','${course_number}')`)
    console.log('after insert'); 
    const new_id = await oneFunction(`select id from courses where course_name='${name}' and college='${college}' limit 1`);
    console.log(new_id['id']);
    console.log('after index query');
    res.send(new_id);
});

app.post('/Courses/search', async (req, res) =>{
    console.log('/Courses/search');
    let keyword = req.body['keyword'];
    let modkeyword='\''+keyword+'\'';
    if(keyword===''){
        keyword=null;
        modkeyword=null;
    }
    let course_number = req.body['course_number'];
    if(course_number==='') course_number=null;
    let college = req.body['college'];
    let modcollege='\''+college+'\'';
    if(college==='Select College' || college ===''){
        college = null;
        modcollege=null;
    }
    console.log(keyword+course_number+college);
    console.log(`SELECT * FROM courses WHERE (college='${college}' OR ${modcollege} is null) AND (course_name LIKE '%${keyword}%' or ${modkeyword} is null) AND (course_number=${course_number} OR ${course_number} is null)`);
    const query = await anyFunction(`SELECT * FROM courses WHERE (college='${college}' OR ${modcollege} is null) AND (course_name LIKE '%${keyword}%' or ${modkeyword} is null) AND (course_number=${course_number} OR ${course_number} is null)`);
    res.send(query);

});

// Retrieve all resources for given courseID from the database
app.get("/getResources/:courseID", async (req, res) => {
    const course = req.params.courseID
    const resources = await anyFunction(`SELECT link, name, description, date FROM resources WHERE course = '${course}'`)
    res.send(resources)
})

// Send a new resource related to :courseID to the database
app.post('/addNewResource/:courseID', async (req, res) => {
    const course = req.params.courseID;
    const name = req.body["title"]
    const link = req.body["link"]
    const desc = req.body["description"]
    const date = req.body['date']
    await noneFunction(`INSERT INTO resources (name, link, description, course, date) VALUES ('${name}', '${link}', '${desc}', '${course}', '${date}')`)// send info to db
    res.send({"status": res.statusCode})
})


/////////////////////////////////////////////
//////////// Account endpoints ////////////////
/////////////////////////////////////////////

//uses api key to get username 
app.get('/getUsername/:api', async (req,res)=>{
    const api = req.params.api;
    const user = await oneFunction(`SELECT username FROM account WHERE user_id='${api}'`);
    res.send(user)
})

//Sents account initialization parameters to the server, if succesful returns corresponding user_id 
//params = user_id, email, username, password
//returns user_id
app.post('/Account/register', async (req,res) => {
    const hash = mc.hash(req.body.password);
    const account = {
        user_id: req.body.user_id,
        email: req.body.email,
        username: req.body.username,
        hash: hash[0],
        salt: hash[1]
    };
    try{
        const result = await anyFunction(`SELECT * FROM account WHERE email = '${account.email}' OR username = '${account.username}'`)
        if (result.length === 0 ){
            await noneFunction(`INSERT INTO account (user_id,email, username,hash,salt) VALUES ('${account.user_id}','${account.email}','${account.username}','${account.hash}','${account.salt}')`);
            res.send(JSON.stringify(account.user_id));
        }
        else{
            res.send(JSON.stringify(null))
        }
    }
    catch{(e)=>res.send(JSON.stringify(null));}

})

//Sents account username and password to server, if succesful returns corresponding user_id 
//params = username,password
//returns user_id
app.post('/Account/login', async (req,res)=> {
    const username = req.body['username'];
    const password = req.body['password'];
    try{
        const result = await anyFunction(`SELECT * FROM account WHERE username = '${username}'`);
        if (result.length>0){ 
            const hash = result[0].hash;
            const salt = result[0].salt;
            if (mc.check(password,salt,hash)){
                res.send(JSON.stringify(result[0].user_id));
            }
            else{
                res.send(JSON.stringify(false));
            }
        }
        else{
            res.send(JSON.stringify(false));
        }
    }
    catch{e=>console.log(e)}
})
//Sents account parameters to change, if succesful returns 200
//params = currentPassword, password, username, email
//returns 200
app.post('/Account/update', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const user_id = req.body.user_id;
    const currPass = req.body.currPass;
    try{
        let quary = `UPDATE account SET`
        const result = await anyFunction(`SELECT * FROM account WHERE user_id = '${user_id}'`);
        const hash = result[0].hash;
        const salt = result[0].salt;
        if (!mc.check(currPass,salt,hash)){
            res.send(JSON.stringify("Incorrect Password"));
            return;
        }
        if (email!==undefined){
            const result = await anyFunction(`SELECT * FROM account WHERE email = '${email}'`)
            if (result.length!==0){
                res.send(JSON.stringify("Email already taken"))
                return;
            }
            quary+=` email = '${email}',`;
        }
        if (username!==undefined){
            const result = await anyFunction(`SELECT * FROM account WHERE username = '${username}'`)
            if (result.length!==0){
                res.send(JSON.stringify("Username already taken"))
                return;
            }
            quary+=` username = '${username}',`;
        }
        if (password !==undefined){
            const hash = mc.hash(password);
            quary+=` hash = '${hash[0]}', salt = '${hash[1]}',`;
        }
        quary = quary.slice(0, -1)
        quary+=` WHERE user_id = '${user_id}'`
        await noneFunction(quary);
        res.send(JSON.stringify('200'));
    }
    catch{(e)=>console.log(e)}
})
//Sents server user_id and password, if password matches, deletes account from database and returns user to login 
//params = user_id, password
//returns 200 on success 
app.delete('/Account/delete', async (req,res)=>{
    const currPass = req.body.currPass;
    const user_id = req.body.user_id;
    try{
        const result = await anyFunction(`SELECT * FROM account WHERE user_id = '${user_id}'`);
        if (result.length>0){ 
            const hash = result[0].hash;
            const salt = result[0].salt;
            if (mc.check(currPass,salt,hash)){
                await noneFunction(`DELETE FROM account WHERE user_id = '${user_id}'`);
                res.send(JSON.stringify(200));
            }
            else{
                res.send(JSON.stringify("Wrong Password"));
            }
        }
        else{
            res.send(JSON.stringify(false));
        }
    }
    catch{e=>console.log(e)}
})
app.listen(process.env.PORT || port, () => {
    console.log(`Course Explorer app listening at http://localhost:8080`);
});
