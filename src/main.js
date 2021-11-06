import {createTable} from './utilities.js';
import {Forum} from './forum.js';

function afterLoad(){

    //make sidebar an active element
    document.getElementById('menu').addEventListener('click',()=>{
        document.getElementById('sidebar').classList.toggle('active');
    });

    //create links to other pages
    const items = document.getElementsByClassName('item');
    for(const item of items){
        //Change Content
        item.addEventListener('click',()=>{
            window.location.replace('./'+item.innerHTML.toLowerCase()+'.html');
        });    
    }
    try{
        document.getElementById('create-page').addEventListener('click', ()=>{
            window.location.replace('./createCourse.html');
        });
    }catch(error){}

    //switch on name of page
    switch(window.location.pathname.split('/').pop()){
        case 'courses.html':
            createTable('table-placement','new-table',[
                ['<a href=\'./information.html\'>web programming</a>','326','recent'],
                ['<a href=\'\'>statistics</a>','240','inactive'],
                ['<a href=\'\'>underwater basket weaving</a>','400','recent']
                ], 
                ['Course','Course Number', 'Activity']);
            break;
        case 'directory.html':
            createTable('table-placement','new-table',[
                ['<a href=\'./information.html\'>web programming</a>','326','recent'],
                ['<a href=\'\'>statistics</a>','240','inactive'],
                ['<a href=\'\'>underwater basket weaving</a>','400','recent']
                ], 
                ['Name','Course Number', 'Activity']);
            break;
        case 'search.html':
            document.getElementById('search-button').addEventListener('click',()=>{
                
                createTable('table-placement','new-table',[
                    ['<a href=\'./information.html\'>web programming</a>','326','recent'],
                    ['<a href=\'\'>statistics</a>','240','inactive'],
                    ['<a href=\'\'>underwater basket weaving</a>','400','recent']
                ], ['name','course number', 'activity']);

            });
            break;
        case 'notifications.html':
            console.log('notifications');
            createTable('table-placement','new-table',[
                ['1','326','recent'],
                ['2','240','inactive'],
                ['3','400','recent']
                ], 
                ['Recency','Course','Activity']);
            break;
        case 'resources.html':
            console.log('notifications');
            createTable('table-placement','new-table',[
                ['<a href=\'./link\'>Resource 1</a>','Helpful article','Today'],
                ['<a href=\'./link\'>Resource 2</a>','Good pseudocode','Yesterday'],
                ['<a href=\'./link\'>Resource 3</a>','Funny meme','Last week']
                ], 
                ['Resource','Description','Date']);
            break;
            case 'forum.html':
                console.log('notifications');
                const forum = new Forum();
                // Loop over user's courses and find forum id's
                // populate table with info from calls to forum.getPostShort() with all id's
                createTable('table-placement','new-table',[
                    ['<a href=\'./forumPost.html\'>Midterm</a>','I thought that was easy!','Today'],
                    ['<a href=\'./link\'>Homework</a>','We get way too much in this class','Yesterday'],
                    ], 
                    ['Post Title','Number of Replies','Date Added']);
                break;
            case 'forumPost.html':
                console.log('notifications');
                const forum = new Forum();
                // will eventually get this info from db instead of hardcoded
                // will use getPost instead of createPost
                forum.createPost("CS 326", "This class rocks!", [{"username": "Ronald McDonald",
                "date": "11/5/2021 6:17 pm", "post": "it sure does!"},
                {"username": "Grimace", "date": "11/5/2021 6:30 pm", "post": "hell yeah I agree"}]);
                const title = document.getElementsByClassName("post-title");
                const forumElement = document.getElementById("forum");
                const heading = document.getElementById("courseTitle");
                forum.render(title[0], forumElement, heading)
                document.getElementsByClassName("btn replyButton")[0].addEventListener('click', () => {
                    const response = document.getElementById("response").value;
                    forum.updatePost({"username": "user", "date": "currentDate", "post": response}, title[0], forumElement, heading);
                })
        default:
            break;
    }

}
window.addEventListener('load', afterLoad);
