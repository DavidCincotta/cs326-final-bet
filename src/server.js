'use strict';
import * as http from 'http';
import * as url from 'url';
import * as db from './database.js';
import express from 'express';



/////////////////////////////////////////////
//////////// Forum enpoints ////////////////

const app = express();
// import express from "express"

app.use(express.json()); // lets you handle JSON input

const port = 3010;
app.post('/Forum/create', (req, res) =>{
    const course = req.body['course_key'];
    const title = req.body['post_title'];
    const posts = req.body['content_array'];
    // send info to db
    // return post_id created in db
    // res.send(JSON.stringify(res.statusCode));
    res.send({"course": course, "title": title, "posts": posts})
});

app.post('/Forum/update', (req, res) => {
    const post = req.body['post_id'];
    const posts = req.body['content_array'];
    // put new info into database WHERE post_id = post_id
    // res.send(JSON.stringify(res.statusCode));
    res.send({"post": post, "posts": posts})

});

app.get('/Forum/longpost/:post_id', (req, res) => {
    const postID = req.params.post_id;
    // get and return content_array and post_title, course from db
    res.send({"title": "title", "posts": ["here's a post", "and another"], "course": "web programming"})

});

app.get('/Forum/shortpost/:post_id', (req, res) => {
    const post = req.params.post_id
    // get post title from db using post id
    // res.send({"post_title": post_title})
    // res.send(JSON.stringify(res.statusCode));
    res.send({"post_id": post})

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
  

