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
    if (request.url.startsWith("/wordScore")) {
        postWordScore(options);
        write();
    }
    else if (request.url.startsWith("/highestWordScores")) {
        getHighestWordScores(options,response);
    }
    else if (request.url.startsWith("/gameScore")) {
        postGameScore(options);
        write();
    }
    else if (request.url.startsWith("/highestGameScores")) {
        getHighestGameScores(options,response);
    }
    else {
        response.statusCode = 400;
    }
    response.end();
});


server.listen(8080);

