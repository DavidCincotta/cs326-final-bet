'use strict'

import {createTable, postData,authorization, getDate} from './utilities.js';


class Forum {
    constructor(){
    }
    // Send the new post data to the /Forum/create endpoint, which adds the information to the
    // database, and returns the new post's ID
    async createPost(course, title, posts, date){
        const body = {"course_key": course, "post_title": title, "posts": posts, "date": date};
        const response = await postData("/Forum/create", body)
        return response.id;
    }

    // Sends the new post to the database, and the endpoint returns the post's ID to be rendered
    // after the call to getPost().
    async updatePost(postID, post){
        const body = {"posts": post}
        const response = await postData(`/Forum/longpost/${postID}/update`, body) 
        this.getPost(postID)
    }
    // Send postID to the database and render the post via the returned title, posts, and course
    async getPost(postID){
        const response = await fetch(`/Forum/get/${postID}`, {mode: 'no-cors'})
        const json = await response.json();
        this.render(json['posttitle'], json['posts'], json['course'])
    }

    // Using the postID, get the post title and date from the database to render the list 
    // of forum posts for the given class
    async getPostShort(postID){
        const response = await fetch(`/getPosts/${postID}`, {mode: 'no-cors'})
        const json = await response.json()
        return json;
    }

    // Used to load a single post given the title, posts array and the course number
    async render(title, posts, course){
        // Clear current HTML
        const content = document.getElementsByClassName("content")[0];
        content.innerHTML = '';
        // Add post title to the top of the page
        const titleDiv = document.createElement("div")
        titleDiv.className = "post-title";
        titleDiv.innerText = title;
        // Add new div for forum posts, and give it the "forum" id
        const forum = document.createElement("div")
        forum.id = "forum";
        // Add course title to the top right corner of the banner at top of the page
        document.getElementById("courseTitle").innerText = `Course: ${course}`;
        // Render a bootstrap card for each post's outline (where username and date are found) and another card that sits inside the outline
        // (where the body of each response goes)
        for (let i in posts){
            const card = document.createElement("div");
            card.className = "card";
            card.id = "forum-post"
            const body = document.createElement("div")
            body.className = "card-body";
            const title = document.createElement("div");
            title.className = "card-title";
            title.innerText = `${posts[i]['username']} ${posts[i]['date']}`;
            const response = document.createElement("div");
            response.className = "card";
            const box = document.createElement("div");
            box.className = "card-body";
            box.id = "forum-response-text"
            const text = document.createElement("p");
            text.innerText = posts[i]["post"]
            box.appendChild(text);
            response.appendChild(box);
            title.appendChild(response);
            body.appendChild(title);
            card.appendChild(body);
            forum.appendChild(card);
        }
        // Add the box where users can type new responses
        const reply = document.createElement("div");
        reply.className = "input-group";
        const textArea = document.createElement("textarea");
        textArea.className = "form-control";
        textArea.ariaLabel = "With textarea";
        textArea.id = "response"
        textArea.innerText = ""
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn replyButton";
        button.innerText = "Post a Reply";
        // Put all the pieces together
        forum.appendChild(textArea)
        forum.appendChild(button)
        titleDiv.appendChild(forum)
        content.appendChild(titleDiv)
        // Add event listener for the reply button so users can actually post a response
        document.getElementsByClassName("btn replyButton")[0].addEventListener('click', async () => {
            const postID = window.location.pathname.split("/")[4]
            const response = document.getElementById("response").value;
            const api = document.cookie.split(':')[1];
            const user = await fetch(`/getUsername/${api}`, {mode: 'no-cors'})
            const username = await user.json()
            const date = getDate()
            this.updatePost(postID, {"username": username['username'], "date": date, "post": response});
        })
    }

    
}

async function afterLoad() {
    authorization();
    const forum = new Forum();
    // This means we are currently viewing a post with its replies. The postID used to query the DB is in the url.
    if (window.location.pathname.split("/")[2] === "longpost"){
        const postID = window.location.pathname.split("/")[4]
        forum.getPost(postID)
    }
    // This means we are currently viewing the list of all forum posts for the given course page.
    else if (window.location.pathname.split('/')[1] === "forum"){
            const course = window.location.pathname.split('/')[2];
            // Used to create a new post
            document.getElementById('create-post').addEventListener('click', async ()=>{
                window.location.pathname = `/createPost/${course}`
            });
            // Loads the list of posts for this course, then builds a table from that list
            const id = window.location.pathname.split('/')[2]
            const posts = await forum.getPostShort(id)
            const params = []
            for (const post of posts["posts"]){
                const param = [`<a href=\'/forum/longpost/${course}/${post['id']}\'>${post['posttitle']}</a>`,`${post['date']}`]
                params.push(param)
            }
            createTable('table-placement','new-table', params,
                ['Post Title','Date']);

        }
    // This means the user is currently creating a new post
    else if (window.location.pathname.split('/')[1] === "createPost"){
            document.getElementById('create-post-btn').addEventListener('click', async ()=>{
                // Gather the necessary information for a new post
                const title = document.getElementById("title").value;
                const api = document.cookie.split(':')[1];
                const user = await fetch(`/getUsername/${api}`, {mode: 'no-cors'})
                const username = await user.json()
                const date = getDate();
                const post = [{"username": username['username'], "date": date, "post": document.getElementById("body").value}];
                const course = window.location.pathname.split('/')[2]
                // Create the post in the DB and retrieve its postID
                const postID = await forum.createPost(course, title, post, date)
                // Change the window to view the newly made post
                window.location.pathname = `/Forum/longpost/${course}/${postID}`
            });
        }
}

window.addEventListener('load', afterLoad);
