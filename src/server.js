'use strict';
import * as http from 'http';
import * as url from 'url';
import * as db from './database.js';
import express from 'express';
// const express = require('express');


// const headerText = JSON.stringify({ "Content-Type": "text/html","Transfer-Encoding": "chunked" });


// let server = http.createServer();
// server.on('request', async (request, response) => {
    
//     let status = 200;
//     let options = await url.parse(request.url, true).query;
    
//     response.writeHead(status, headerText);
//     if (request.url.startsWith("/wordScore")) {
//         postWordScore(options);
//         write();
//     }
//     else if (request.url.startsWith("/highestWordScores")) {
//         getHighestWordScores(options,response);
//     }
//     else if (request.url.startsWith("/gameScore")) {
//         postGameScore(options);
//         write();
//     }
//     else if (request.url.startsWith("/highestGameScores")) {
//         getHighestGameScores(options,response);
//     }
//     else {
//         response.statusCode = 400;
//     }
//     response.end();
// });




/////////////////////////////////////////////
//////////// Forum enpoints ////////////////

const app = express();
// import express from "express"

app.use(express.json()); // lets you handle JSON input

const port = 3010;
app.post('/Forum/getCourse', (req, res) =>{
    const course = req.body['course_key'];
    const title = req.body['post_title'];
    const posts = req.body['content_array'];
    // database query to get correct info
    // load forumPost.html with given content
    // res.send(JSON.stringify(res.statusCode));
    res.send({"course": course, "title": title, "posts": posts})
});

app.post('/Forum/update', (req, res) => {
    const post = req.body['post_id'];
    const posts = req.body['content_array'];
    // database query to get correct post stuff
    // reload forumPost.html with newly updated information
    // res.send(JSON.stringify(res.statusCode));
    res.send({"post": post, "posts": posts})

})

app.get('/Forum/post/:post_id', (req, res) => {
    const post = JSON.parse(req.params.post_id);
    // get content_array and post_title from db
    // res.send({"content_array": content_array, "post_title": post_title} )
    // res.send(JSON.stringify(res.statusCode));
    res.send({"post_id": post})

})

app.get('/Forum/shortpost/:post_id', (req, res) => {
    const post = req.params.post_id
    // get post title from db using post id
    // res.send({"post_title": post_title})
    // res.send(JSON.stringify(res.statusCode));
    res.send({"post_id": post})

})

// app.get('*', (req, res) => {
//     res.send('NO FOOL, BAD COMMAND');
//   });
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
  
/////////////////////////////////////////////

// server.listen(8080);

