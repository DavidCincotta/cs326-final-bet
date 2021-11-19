//import * as db from './database.js';
import express from 'express';
import * as http from 'http';
import path from 'path';
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
app.get('/Forum',
    (req, res) => res.sendFile('/html/forum.html',
                    { 'root' : __dirname }));
app.get('/Forum/longpost/:post_id',
    (req, res) => res.sendFile('/html/forumPost.html',
                    { 'root' : __dirname }));
app.get('/index',
    (req, res) => res.sendFile('/html/index.html',
                    { 'root' : __dirname }));
app.get('/information',
    (req, res) => res.sendFile('/html/information.html',
                { 'root' : __dirname }));
app.get('/Login',
    (req, res) => res.sendFile('/html/login.html',
                    { 'root' : __dirname }));
app.get('/notfications',
    (req, res) => res.sendFile('/html/notifications.html',
                { 'root' : __dirname }));
app.get('/resources',
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

/////////////////////////////////////////////
//////////// Forum enpoints ////////////////
/////////////////////////////////////////////

app.get('/Forum/get/:post_id',
    (req, res) => {const postID = req.params.post_id;
//     // get and return content_array and post_title, course from db
    res.send({"title": "title", "posts": [{"username": "Obi-Wan", "date": "today", "post": "Hello there!"}, {"username": "General Grievous", "date": "today", "post": "General Kenobi!"}], "course": "web programming"});
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

app.post('/Forum/longpost/:post_id/update', (req, res) => {
    const post = req.params.post_id;
    const posts = req.body['content_array'];
    // put new info into database WHERE post_id = post_id (UPDATE)
    ////// WILL RETURN POST ID FROM DB, FAKE INFO FOR NOW ///////
    res.send({"post": post, "posts": posts})
})

/////////////////////////////////////////////
//////////// Course enpoints ////////////////
/////////////////////////////////////////////


app.post('/Courses/getcourse', (req, res) =>{
    const account = req.body['account_id'];

    res.send([{'id':'1','name':'web programming','course_number':'326','description':'learning about front end applications and browsers'},{'id':'2','name':'data structures','course_number':'187','description':'basics of storing and accessing information'},{'id':'3','name':'discrete math','course_number':'250','description':'predicate mathematics and proofing'}]);
});
app.get('/Courses/directory', (req, res) =>{
    res.send([{'id':'1','name':'web programming','course_number':'326','description':'learning about front end applications and browsers'},{'id':'2','name':'data structures','course_number':'187','description':'basics of storing and accessing information'},{'id':'3','name':'discrete math','course_number':'250','description':'predicate mathematics and proofing'}]);
});
app.post('/Courses/addcourse', (req, res) =>{
    res.send();
});
app.post('/Courses/search', (req, res) =>{
    res.send([{'id':'1','college':'CICS','name':'web programming','course_number':'326','description':'learning about front end applications and browsers'},{'id':'2','college':'CICS','name':'data structures','course_number':'187','description':'basics of storing and accessing information'},{'id':'3','college':'CICS','name':'discrete math','course_number':'250','description':'predicate mathematics and proofing'}]);

    const post = req.params.post_id
    ////// WILL GET AND RETURN FORUM POST TITLE AND COURSE FROM DB USING POST_ID ///////
    ////// FAKE DATA FOR NOW //////
    res.send({"post_id": post})
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
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        notification_flag: req.body.notification_flag
    };
    //store account in db
    //sent account to client
    res.send(JSON.stringify(account))
})
app.post('/Account/login', (req,res)=> {
    const email = req.body['email'];
    const password = req.body['password'];
    //check if match with data base
    //then sent id
    res.send(JSON.stringify("account_id"));
})
app.post('/Account/addcourse',(req,res)=>{
    const account = req.body['account_id'];
    const course = req.body['course'];
    res.send([{'id':'1','college':'CICS','name':'web programming','course_number':'...','description':'learning about front end applications and browsers'},{'id':'2','college':'CICS','name':'data structures','course_number':'...','description':'basics of storing and accessing information'},{'id':'3','college':'CICS','name':'discrete math','course_number':'...','description':'predicate mathematics and proofing'}]);
})
app.post('/Account/update',(req,res)=>{
    //update account settings from body in db
    res.send(JSON.stringify("okay"));
})

app.get('/',
    (req, res) => res.sendFile('/html/forum.html',
                    { 'root' : __dirname }));
/*
app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
  });
*/
app.listen(process.env.PORT || 8080, () => {
    console.log(`Course Explorer app listening at http://localhost:${port}`);
});
