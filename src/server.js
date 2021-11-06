'use strict';
import * as http from 'http';
import * as url from 'url';
import * as db from './database.js';


const headerText = JSON.stringify({ "Content-Type": "text/html","Transfer-Encoding": "chunked" });


let server = http.createServer();
server.on('request', async (request, response) => {
    
    let status = 200;
    let options = await url.parse(request.url, true).query;
    
    response.writeHead(status, headerText);
    if (request.url.startsWith("/Account/login")) {
    }
    else if (request.url.startsWith("/Account/register")) {
    }
    else if (request.url.startsWith("/Account/addCourse")) {
    }
    else if (request.url.startsWith("/Courses/getCourses")) {
    }
    else if (request.url.startsWith("/Courses/getDirectory")) {
    }
    else if (request.url.startsWith("/Courses/search")) {
    }
    else if (request.url.startsWith("/Courses/addCourse")) {
    }
    else if (request.url.startsWith("/Forum/createPost")) {
    }
    else if (request.url.startsWith("/Forum/updatePost")) {
    }
    else if (request.url.startsWith("/Forum/post")) {
    }
    else if (request.url.startsWith("/Forum/shortpost")) {
    }
    else {
        response.statusCode = 400;
    }
    response.end();
});


server.listen(8080);

