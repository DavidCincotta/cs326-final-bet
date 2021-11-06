'use strict';
import * as http from 'http';
// import * as url from 'url';
// import * as db from 'database.js';
import express from 'express';

/////////////////////////////////////////////
//////////// Forum enpoints ////////////////

const app = express();

app.use(express.json())
app.use(express.static('src'));


const port = 3000;
app.post('/Forum/create', (req, res) =>{
    console.log("HERE")
    const course = req.body['course_key'];
    const title = req.body['post_title'];
    const posts = req.body['content_array'];
    // send info to db
    ////// WILL RETURN POST ID FROM DB, FAKE INFO FOR NOW ////////
    res.send({"course": course, "title": title, "posts": posts})
});

app.post('/Forum/longpost/:post_id/update', (req, res) => {
    const post = req.params.post_id;
    const posts = req.body['content_array'];
    // put new info into database WHERE post_id = post_id (UPDATE)
    ////// WILL RETURN POST ID FROM DB, FAKE INFO FOR NOW ///////
    res.send({"post": post, "posts": posts})
})

app.get('/Forum/longpost/:post_id', (req, res) => {
    const postID = req.params.post_id;
    ///// WILL GET AND RETURN CONTENT_ARRAY, POST_TITLE AND COURSE FROM DB, FAKE DATA FOR NOW //////
    res.send({"title": "title", "course": "web programming", "posts": ["here's a post", "and another"]})

})

app.get('/Forum/shortpost/:post_id', (req, res) => {
    const post = req.params.post_id
    ////// WILL GET AND RETURN FORUM POST TITLE AND COURSE FROM DB USING POST_ID ///////
    ////// FAKE DATA FOR NOW //////
    res.send({"post_id": post})
})

  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
  
/////////////////////////////////////////////


