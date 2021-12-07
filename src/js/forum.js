'use strict'

import {createTable, postData,authorization, getDate} from './utilities.js';


class Forum {
    constructor(){
    }

    async createPost(course, title, posts, date){
        // Send data to server
        const body = {"course_key": course, "post_title": title, "content_array": posts, "date": date};
        const response = await postData("/Forum/create", body)
        return response.id; // postID
    }

    async updatePost(postID, post){
        // send new forum post info to server
        const body = {"content_array": post}
        const response = await postData(`/Forum/longpost/${postID}/update`, body) 
        this.getPost(postID)
    }

    async getPost(post_id){
        // get post title, content and course name from server to return
        const response = await fetch(`/Forum/get/${post_id}`, {mode: 'no-cors'})
        const json = await response.json();
        this.render(json['title'], json['posts'], json['course'])
    }

    async getPostShort(post_id){
        // get post title and course from server to return
        const response = await fetch(`/Forum/shortpost/${post_id}`, {mode: 'no-cors'})
        const json = await response.json()
        ///// USED TO SHOW SUCCESSFUL GET REQUEST. WILL EVENTUALLY RETURN TO FILL FORUM LIST PAGE ///// 
        // alert(`${json['title']} ${json['course']}`)
        // return response (A JSON OBJECT)
    }

    async render(title, posts, course){
        const content = document.getElementsByClassName("content")[0];
        content.innerHTML = '';
        const titleDiv = document.createElement("div")
        titleDiv.className = "post-title";
        titleDiv.innerText = title;
        const forum = document.createElement("div")
        forum.id = "forum";
        document.getElementById("courseTitle").innerText = `Course: ${course}`;
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
        forum.appendChild(textArea)
        forum.appendChild(button)
        content.appendChild(forum)
        document.getElementsByClassName("btn replyButton")[0].addEventListener('click', async () => {
            const postID = window.location.pathname.split("/")[4]
            const response = document.getElementById("response").value;
            const api = document.cookie.split(':')[1];
            const user = await fetch(`/getUsername/${api}`, {mode: 'no-cors'})
            const username = await user.json()
            console.log(username['username'])
            const date = getDate()
            this.updatePost(postID, {"username": username['username'], "date": date, "post": response});
        })
    }

    
}

async function afterLoad() {
    authorization();
    const forum = new Forum();
    if (window.location.pathname.split("/")[2] === "longpost"){
        const postID = window.location.pathname.split("/")[4]
        forum.getPost(postID)
    }
    else if (window.location.pathname.split('/')[1] === "forum"){
            const course = window.location.pathname.split('/')[2];
            document.getElementById('create-post').addEventListener('click', async ()=>{
                window.location.pathname = `/createPost/${course}`
            });
            const id = window.location.pathname.split('/')[2]
            const posts = await fetch(`/getPosts/${id}`)
            const json = await posts.json();
            const params = []
            for (const post of json["posts"]){
                const param = [`<a href=\'/forum/longpost/${course}/${post['id']}\'>${post['posttitle']}</a>`,`${post['date']}`]
                params.push(param)
            }
            createTable('table-placement','new-table', params,
                ['Post Title','Date']);

        }
    else if (window.location.pathname.split('/')[1] === "createPost"){
            document.getElementById('create-post-btn').addEventListener('click', async ()=>{
                const title = document.getElementById("title").value;
                const api = document.cookie.split(':')[1];
                const user = await fetch(`/getUsername/${api}`, {mode: 'no-cors'})
                const username = await user.json()
                const date = getDate();
                const post = [{"username": username['username'], "date": date, "post": document.getElementById("body").value}];
                const course = window.location.pathname.split('/')[2]
                const postID = await forum.createPost(course, title, post, date)
                window.location.pathname = `/Forum/longpost/${course}/${postID}`
            });
        }
}

window.addEventListener('load', afterLoad);
