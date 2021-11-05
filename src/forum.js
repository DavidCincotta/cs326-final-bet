'use strict'

// import { response } from "express";

export class Forum {
    constructor(){
    }

    async createPost(course, title, posts){
        const body = {"course_key": course, "post_title": title, "content_array": posts}
        const reply = await fetch("http://localhost:3010/Forum/create", body) 
        const postID = reply['post_id'];
        this.render(postID)
        // add to db
        // get/set post_id from db
    }

    async updatePost(postID, posts){
        // send new post info to server
        const body = {"post_id": postID, "content_array": posts}
        const reply = await fetch("http://localhost:3010/Forum/update", body)
        this.render(postID)
    }

    async getPost(post_id){
        // get post title, content and course name from server to return
        const reply = await fetch(`http://localhost:3010/Forum/longpost/${post_id}`)
        // return respone (JSON)
    }

    async getPostShort(post_id){
        // get post title and course from server to return
        const reply = await fetch(`http://localhost:3010/Forum/shortpost/${post_id}`)
        // return response (JSON)
    }

    render(post_id){
        // get post info from server using post_id
        const postInfo = this.getPost(post_id);
        // extract content_array
        const postContent = postInfo['posts']
        document.getElementsByClassName("post-title").innerText = postInfo['title'];
        document.getElementById("courseTitle").innerText = postInfo['course'];
        const forum = document.getElementById("forum");
        forum.innerHTML = '';
        for (let i in postContent){
            const card = document.createElement("div");
            card.className = "card";
            card.id = "forum-post"
            const body = document.createElement("div")
            body.className = "card-body";
            const title = document.createElement("div");
            title.className = "card-title";
            title.innerText = `${postContent[i]['username']} ${postContent[i]['date']}`;
            const response = document.createElement("div");
            response.className = "card";
            const box = document.createElement("div");
            box.className = "card-body";
            box.id = "forum-response-text"
            const text = document.createElement("p");
            text.innerText = postContent[i]["post"]
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
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn replyButton";
        button.innerText = "Post a Reply";
        forum.appendChild(textArea)
        forum.appendChild(button)

    }

    
}
