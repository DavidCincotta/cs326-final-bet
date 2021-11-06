'use strict';
import * as http from 'http';
// import * as url from 'url';
// import * as db from 'database.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/////////////////////////////////////////////
//////////// Forum enpoints ////////////////

const app = express();
// import express from "express"

// const path = require('path')
app.use(express.json())
app.use(express.static('src'));

// app.use(express.static('public')) // lets you handle JSON input

const port = 3010;
app.post('/Forum/create', (req, res) =>{
    console.log("HERE")
    const course = req.body['course_key'];
    const title = req.body['post_title'];
    const posts = req.body['content_array'];
    // send info to db
    // return post_id created in db
    res.sendFile("./createCourse.html", { root: __dirname })
    //(JSON.stringify(res.statusCode));
    // res.send({"course": course, "title": title, "posts": posts})
});

app.post('/Forum/longpost/:post_id/update', (req, res) => {
    // const post = req.body['post_id'];
    const post = req.params.post_id;

    const posts = req.body['content_array'];
    // put new info into database WHERE post_id = post_id
    // res.send(JSON.stringify(res.statusCode));
    res.send({"post": post, "posts": posts})

})

app.get('/Forum/longpost/:post_id', (req, res) => {
    const postID = req.params.post_id;
    // get and return content_array, post_title, and course from db
    res.send({"title": "title", "course": "web programming", "posts": ["here's a post", "and another"]})

})

app.get('/Forum/shortpost/:post_id', (req, res) => {
    const post = req.params.post_id
    // get post title from db using post id
    // res.send({"post_title": post_title})
    // res.send(JSON.stringify(res.statusCode));
    res.send({"post_id": post})

})

app.get('/test', (req, res) =>{
    res.sendFile('./test.html',  { root : __dirname})
})

// app.get('*', (req, res) => {
//     res.send('NO FOOL, BAD COMMAND');
//   });
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
  
/////////////////////////////////////////////

// server.listen(8080);

