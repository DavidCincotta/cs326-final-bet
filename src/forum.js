'use strict'
import {createTable} from './utilities.js';

class Forum {
    constructor(){
    }

    async createPost(course, title, posts){
        const body = {"course_key": course, "post_title": title, "content_array": posts}
        const reply = await fetch("http://localhost:3010/Forum/create", {
            method: 'POST',
            mode: "no-cors",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
          });
          if (reply.ok){
            //   this.render(title, posts, course)
          } else {
              alert(reply.statusText)
          }
        // const postID = reply['post_id'];
        // this.render(postID)
    }

    async updatePost(postID, posts){
        // send new post info to server
        const body = {"post_id": postID, "content_array": posts}
        const reply = await fetch(`http://localhost:3010/Forum/longpost/${postID}/update`, {
            method: 'POST',
            mode: "no-cors",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
          });
        this.render(postID)
    }

    async getPost(post_id){
        // get post title, content and course name from server to return
        const reply = await fetch(`http://localhost:3010/Forum/longpost/${post_id}`, {mode: 'no-cors'})
        if (reply.ok){
            return reply
        }
        else {
            console.log("FAIL")
            console.log(reply.status)
        }
        // return respone (JSON)
    }

    async getPostShort(post_id){
        // get post title and course from server to return
        const reply = await fetch(`http://localhost:3010/Forum/shortpost/${post_id}`, {mode: 'no-cors'})
        // return response (JSON)
    }

    render(title, posts, course){
        // get post info from server using post_id
        // const postInfo = this.getPost(post_id);
        // extract content_array
        document.getElementsByClassName("post-title").innerText = title;
        document.getElementById("courseTitle").innerText = course;
        const forum = document.getElementById("forum");
        forum.innerHTML = '';
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
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn replyButton";
        button.innerText = "Post a Reply";
        forum.appendChild(textArea)
        forum.appendChild(button)

    }

    
}

function onLoad(){
    const forum = new Forum();
    switch(window.location.pathname.split('/').pop()){
        case 'forum.html':
            console.log('notifications');
            // Loop over user's courses and find forum id's
            // populate table with info from calls to forum.getPostShort() with all id's
            createTable('table-placement','new-table',[
                ['<a href=\'./forumPost.html\'>Midterm</a>','I thought that was easy!','Today'],
                ['<a href=\'./link\'>Homework</a>','We get way too much in this class','Yesterday'],
                ], 
                ['Post Title','Number of Replies','Date Added']);
            document.getElementById('create-post').addEventListener('click', ()=>{
                window.location.replace('./createPost.html');
            });
            break;
        case 'forumPost.html':
            console.log('notifications');
            // will eventually get this info from db instead of hardcoded
            // will use getPost instead of createPost
            forum.createPost("CS 326", "This class rocks!", [{"username": "Ronald McDonald",
            "date": "11/5/2021 6:17 pm", "post": "it sure does!"},
            {"username": "Grimace", "date": "11/5/2021 6:30 pm", "post": "hell yeah I agree"}]);
            // const title = document.getElementsByClassName("post-title");
            // const forumElement = document.getElementById("forum");
            // const heading = document.getElementById("courseTitle");
            // forum2.render(title[0], forumElement, heading)
            document.getElementsByClassName("btn replyButton")[0].addEventListener('click', () => {
                const response = document.getElementById("response").value;
                forum2.updatePost({"username": "user", "date": "currentDate", "post": response}, title[0], forumElement, heading);
            })
            break;
        case 'createPost.html':
            console.log('notifications');
            document.getElementById("create-post-btn").addEventListener('click', () => {
                const title = document.getElementById("title").value;
                const post = document.getElementById("body").value;
                const course = "326"
                forum.createPost(course, title, post)                
            })
        default:
            break;
    }
}
window.addEventListener('load', onLoad);