'use strict'

import {createTable, postData} from './utilities.js';


class Forum {
    constructor(){
    }

    async createPost(course, title, posts){
        // Send data to server
        const body = {"course_key": course, "post_title": title, "content_array": posts};
        const response = await postData("/Forum/create", body)
        ///// USED TO SHOW SUCCESSFUL POST REQUEST. WILL EVENTUALLY RETURN POST ID OF THE NEW POST /////
        ///// CURRENTLY WORKS IN POSTMAN BUT WILL NOT WORK THROUGH FETCH /////
        alert(`${response['course']} ${response['title']} ${response["posts"]}`)
        ///// EVENTUALLY... /////
        // this.getPost(postID)
        // this.render("title", [{"username": "tom", "date": "today", "post": "HELLO THERE"}], "326")
        return 1 // postID
    }

    async updatePost(postID, post){
        // send new forum post info to server
        const body = {"content_array": post}
        const response = await postData(`/Forum/longpost/${postID}/update`, body) 
        ///// USED TO SHOW SUCCESSFUL POST REQUEST. WILL ACTUALLY JUST RETURN A STATUS CODE //////
        ///// CURRENTLY WORKS IN POSTMAN BUT WILL NOT WORK THROUGH FETCH /////
        alert(`${response['post']} ${response['posts']}`)
        ///// EVENTUALLY... /////
        this.getPost(postID)
        // this.render("title", [{"username": "tom", "date": "today", "post": "HELLO THERE"}, post], "326")
    }

    async getPost(post_id){
        // get post title, content and course name from server to return
        const response = await fetch(`/Forum/get/${post_id}`, {mode: 'no-cors'})
        const json = await response.json();
        // console.log(json)
        ///// USED TO SHOW SUCCESSFUL GET REQUEST /////
        // alert(`${json['title']} ${json['course']} ${json['posts'][0]}`)
        ///// EVENTUALLY... /////
        this.render(json['title'], json['posts'], json['course'])
    }

    async getPostShort(post_id){
        // get post title and course from server to return
        const response = await fetch(`/Forum/shortpost/${post_id}`, {mode: 'no-cors'})
        const json = await response.json()
        ///// USED TO SHOW SUCCESSFUL GET REQUEST. WILL EVENTUALLY RETURN TO FILL FORUM LIST PAGE ///// 
        alert(`${json['title']} ${json['course']}`)
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
        document.getElementsByClassName("btn replyButton")[0].addEventListener('click', () => {
            const response = document.getElementById("response").value;
            this.updatePost(1, {"username": "user", "date": "currentDate", "post": response});
        })
    }

    
}

function afterLoad() {
    const forum = new Forum();
    console.log(window.location.pathname)
    if (window.location.pathname === "/forum"){
            document.getElementById('create-post').addEventListener('click', async ()=>{
                window.location.pathname = "/createPost"
            });
        }
    else if (window.location.pathname === "/createPost"){
            document.getElementById('create-post-btn').addEventListener('click', async ()=>{
                const title = document.getElementById("title").value;
                const post = [document.getElementById("body").value];
                const course = "326"
                const postID = await forum.createPost(course, title, post)
                // console.log(postID)
                window.location.pathname = `/Forum/longpost/${postID}`
            });
        }
    else if (window.location.pathname.split("/")[2] === "longpost"){
        const postID = window.location.pathname.split("/")[3]
        forum.getPost(postID)
    }
}

window.addEventListener('load', afterLoad);
