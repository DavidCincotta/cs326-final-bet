import express from 'express';
import path from 'path';
import {noneFunction,oneFunction,anyFunction} from './js/database.js';
import { fileURLToPath } from 'url';
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
app.get('/createPost',
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
app.get('/notfications',
    (req, res) => res.sendFile('/html/notifications.html',
                { 'root' : __dirname }));
app.get('/resources/:course_id',
    (req, res) => res.sendFile('/html/resources.html',
                { 'root' : __dirname }));
app.get('/addResource',
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
    async (req, res) => {const postID = req.params.post_id;
        const response = await find(1, `SELECT postTitle, posts, course FROM forum WHERE id = ${postID}`)
//     // get and return content_array and post_title, course from db
    res.send(response);
    });

app.post('/Forum/create', (req, res) =>{
    const course = req.body['course_key'];
    const title = req.body['post_title'];
    const posts = req.body['content_array'];
    // send info to db
    ////// WILL RETURN POST ID FROM DB, FAKE INFO FOR NOW ////////
    res.send({"course": course, "title": title, "posts": posts})
    // res.redirect("/Forum")
});

app.post('/Forum/longpost/:post_id/update', async (req, res) => {
    const postID = req.params.post_id;
    const posts = req.body['content_array'];
    const dbPosts = await find(1, `SELECT posts FROM forum WHERE id = ${postID}`)
    dbPosts[0]['posts'].push(posts)
    let ret = "array["
    for (const post of response[0]['posts']){
        console.log(post)
        const newPost = `'${JSON.stringify(post)}'::json,`
        ret += newPost
    }
    ret = ret.slice(0, -1) + ']'
    await updateDelete(`UPDATE forum SET posts = ${ret} WHERE id=${postID}`)
    // put new info into database WHERE post_id = post_id (UPDATE)
    ////// WILL RETURN POST ID FROM DB, FAKE INFO FOR NOW ///////
    // res.send({"post": post, "posts": posts})
    res.redirect(`/forum/longpost/${postID}`)
})

app.get("/getPosts/:course_id", (req, res) => {
    const course = req.params.course_id;
    res.send({"posts": [{"title": "Great Course, 10/10 recommend!", "date": "Today"},
                        {"title": "Learned so much in this class", "data": "3 weeks ago"},
                    {"title": "Tonight's homework", "date": "Last month"}]})
})

/////////////////////////////////////////////
//////////// Course enpoints ////////////////
/////////////////////////////////////////////


app.post('/Courses/getcourse', (req, res) =>{
    const account = req.body['account_id'];

    res.send([{'id':'1','name':'web programming','course_number':'326','description':'learning about front end applications and browsers'},{'id':'2','name':'data structures','course_number':'187','description':'basics of storing and accessing information'},{'id':'3','name':'discrete math','course_number':'250','description':'predicate mathematics and proofing'}]);
});
//use
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
app.get("/getResources/:course_id", (req, res) => {
    const course = req.params.course_id
    res.send({"resources": [{"link": "www.google.com", "title": "Google", "description": "Search Engine", "date": "Today"},
        {"link": "www.bing.com", "title": "Bing", "description": "Another search engine", "date": "Yesterday"},
        {"link": "www.yahoo.com", "title": "Yahoo", "description": "A third search engine", "date": "3 weeks ago"}
    ]})
})

app.post('/addResource', (req, res) => {
    const title = req.body["title"]
    const link = req.body["link"]
    const desc = req.body["description"]
    // send info to db
    res.redirect("/resources")
})


/////////////////////////////////////////////
//////////// Account endpoints ////////////////
/////////////////////////////////////////////
app.post('/Account/register', (req,res) => {
    const account = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    };
    noneFunction('INSERT INTO account (email, username,password) VALUES (${email},${username},${password})',account)
    res.send(JSON.stringify(account))
})
app.post('/Account/login', async (req,res)=> {
    const email = req.body['email'];
    const password = req.body['password'];
    try{
        const result = await anyFunction('SELECT * FROM account WHERE email = ${email} AND password = ${password}')
    }
    catch{e=>console.log(e)}
    if (result!= null){ 
        res.send(JSON.stringify(true))
    }
    else{
        res.send(JSON.stringify(false));
    }
})
app.post('/Account/update',(req,res)=>{
    //update account settings from body in db
    res.send(JSON.stringify("okay"));
})


    
app.listen(process.env.PORT || 8080, () => {
    console.log(`Course Explorer app listening at http://localhost:${port}`);
});