import express from 'express';
import path from 'path';
import {noneFunction,oneFunction,anyFunction} from './js/database.js';
import { fileURLToPath } from 'url';
import e from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/////////////////////////////////////////////
//////////// Express Defini. ////////////////
/////////////////////////////////////////////
const app = express();
// import express from "express"
app.use(express.json()); // lets you handle JSON input
app.use(express.static('src'));
const port = 3010;

/////////////////////////////////////////////
//////////// HTML gets       ////////////////
/////////////////////////////////////////////
app.get('/courses',
    (req, res) => res.sendFile('/html/courses.html',
                    { 'root' : __dirname }));
app.get('/createCourse',
    (req, res) => res.sendFile('/html/createCourse.html',
                    { 'root' : __dirname }));
app.get('/createPost/:course_id',
    (req, res) => res.sendFile('/html/createPost.html',
                    { 'root' : __dirname }));
app.get('/directory',
    (req, res) => res.sendFile('/html/directory.html',
                { 'root' : __dirname }));
app.get('/Forum/:course_id',
    (req, res) => res.sendFile('/html/forum.html',
                    { 'root' : __dirname }));
app.get('/Forum/longpost/:post_id',
    (req, res) => res.sendFile('/html/forumPost.html',
                    { 'root' : __dirname }));
app.get('/index',
    (req, res) => res.sendFile('/html/index.html',
                    { 'root' : __dirname }));
app.get('/information/:course_id',
    (req, res) => res.sendFile('/html/information.html',
                { 'root' : __dirname }));
app.get('/Login',
    (req, res) => res.sendFile('/html/login.html',
                    { 'root' : __dirname }));
app.get('/resources/:course_id',
    (req, res) => res.sendFile('/html/resources.html',
                { 'root' : __dirname }));
app.get('/addResource/:course_id',
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

/////////////////////////////////////////////
//////////// Forum enpoints ////////////////
/////////////////////////////////////////////

app.get('/Forum/get/:post_id',
    async (req, res) => {
        const postID = req.params.post_id;
        const response = await oneFunction(`SELECT postTitle, posts, course FROM forum WHERE id = '${postID}'`)
//     // get and return content_array and post_title, course from db
        res.send(response);
    });

app.post('/Forum/create', async (req, res) =>{
    const course = req.body['course_key'];
    const title = req.body['post_title'];
    const posts = req.body['content_array'];
    await noneFunction(`INSERT INTO forum (posttitle, posts, course) VALUES ('${title}', array['${JSON.stringify(posts[0])}'::json], '${course}')`)
    const postID = await oneFunction(`SELECT id FROM forum WHERE posttitle='${title}' AND course='${course}'`)
    // send info to db
    ////// WILL RETURN POST ID FROM DB, FAKE INFO FOR NOW ////////
    // res.send({"course": course, "title": title, "posts": posts})
    res.send(postID)
    // res.redirect("/Forum")
});

app.post('/Forum/longpost/:post_id/update', async (req, res) => {
    const postID = req.params.post_id;
    const posts = req.body['content_array'];
    const dbPosts = await oneFunction(`SELECT posts FROM forum WHERE id = '${postID}'`)
    dbPosts['posts'].push(posts)
    let ret = "array["
    for (const post of dbPosts['posts']){
        console.log(post)
        const newPost = `'${JSON.stringify(post)}'::json,`
        ret += newPost
    }
    ret = ret.slice(0, -1) + ']'
    await noneFunction(`UPDATE forum SET posts = ${ret} WHERE id = '${postID}'`)
    // put new info into database WHERE post_id = post_id (UPDATE)
    ////// WILL RETURN POST ID FROM DB, FAKE INFO FOR NOW ///////
    // res.send({"post": post, "posts": posts})
    res.redirect(`/forum/longpost/${postID}`)
})

app.get("/getPosts/:course_id", async (req, res) => {
    const course = req.params.course_id;
    const courseList = await anyFunction(`SELECT posttitle, id FROM forum WHERE course = '${course}'`)
    res.send({"posts": courseList})
})

/////////////////////////////////////////////
//////////// Course enpoints ////////////////
/////////////////////////////////////////////

// app.post('/Courses/getcourse', (req, res) =>{
//     const account = req.body['account_id'];
//     res.send([{'id':'1','name':'web programming','course_number':'326','description':'learning about front end applications and browsers'},{'id':'2','name':'data structures','course_number':'187','description':'basics of storing and accessing information'},{'id':'3','name':'discrete math','course_number':'250','description':'predicate mathematics and proofing'}]);
// });

app.get('/getInfo/:course_id', (req, res) => {
    const course = req.params.course_id
    res.send({"courseName": "Web Programming", "courseNumber": "CS 326", "description": "Interactive experience course. Focused on learning Javascript type='module'and how browsers work. You will create a front end application with a small group. This satisfies a requirement for the CS major.", "professor": "Emery Berger", "year": 2016})
});
//mine
app.get('/Courses/directory', (req, res) =>{
    res.send([{'id':'1','name':'web programming','course_number':'326','description':'learning about front end applications and browsers'},{'id':'2','name':'data structures','course_number':'187','description':'basics of storing and accessing information'},{'id':'3','name':'discrete math','course_number':'250','description':'predicate mathematics and proofing'}]);
});
app.post('/Courses/addcourse', (req, res) =>{
    res.send();
});
//mine
app.post('/Courses/search', (req, res) =>{
    res.send([{'id':'1','college':'CICS','name':'web programming','course_number':'326','description':'learning about front end applications and browsers'},{'id':'2','college':'CICS','name':'data structures','course_number':'187','description':'basics of storing and accessing information'},{'id':'3','college':'CICS','name':'discrete math','course_number':'250','description':'predicate mathematics and proofing'}]);

    const post = req.params.post_id
    ////// WILL GET AND RETURN FORUM POST TITLE AND COURSE FROM DB USING POST_ID ///////
    ////// FAKE DATA FOR NOW //////
    res.send({"post_id": post})
});
app.get("/getResources/:course_id", async (req, res) => {
    const course = req.params.course_id
    const resources = await anyFunction(`SELECT link, name, description, date FROM resources WHERE course = ${course}`)
    res.send({"resources": resources})
})

app.post('/addNewResource/:course_id', async (req, res) => {
    const course = req.params.course_id;
    const title = req.body["title"]
    const link = req.body["link"]
    const desc = req.body["description"]
    await noneFunction(`INSERT INTO resources (title, link, description) VALUES (${title}, ${link}, ${desc})`)// send info to db
    res.redirect(`/resources/${course}`)
})


/////////////////////////////////////////////
//////////// Account endpoints ////////////////
/////////////////////////////////////////////

app.post('/Account/register', async (req,res) => {
    const account = {
        user_id: req.body.user_id,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    };
    try{
        await noneFunction(`INSERT INTO account (user_id,email, username,password) VALUES ('${account.user_id}','${account.email}','${account.username}','${account.password}')`);
        res.send(JSON.stringify(account.user_id));
        return;
    }
    catch{(e)=>res.send(JSON.stringify(null));}

})
app.post('/Account/login', async (req,res)=> {
    const username = req.body['username'];
    const password = req.body['password'];
    try{
        const result = await anyFunction(`SELECT * FROM account WHERE email = '${username}' AND password = '${password}'`)
        if (result!== null){ 
            res.send(JSON.stringify(result[3]))
        }
        else{
            res.send(JSON.stringify(false));
        }
    }
    catch{e=>console.log(e)}
})
app.post('/Account/update',(req,res)=>{
    
    res.send(JSON.stringify("okay"));
})


    
app.listen(process.env.PORT || 8080, () => {
    console.log(`Course Explorer app listening at http://localhost:8080`);
});