'use strict'
import {createTable,authorization,postData} from './utilities.js';
async function create(){
    const collegeElm = document.getElementById('college');
    const college = collegeElm.options[collegeElm.selectedIndex].value;
    const course_name = document.getElementById('course_name').value;
    const course_number = document.getElementById('course_number').value;
    const short_description = document.getElementById('short_description').value;
    const long_description = document.getElementById('long_description').value;
    const start_year = document.getElementById('start_year').value;
    const json = {
        "college":college,"course_name":course_name,"course_number":course_number,"short_description":short_description,"long_description":long_description
    };
    console.log(json);
    response = await postData('/Courses/addcourse',json);
}

function afterLoad(){
    authorization();
    //make sidebar an active element
    document.getElementById('menu').addEventListener('click',()=>{
        document.getElementById('sidebar').classList.toggle('active');
    });

    //create links to other pages
    const items = document.getElementsByClassName('item');
    for(const item of items){
        //Change Content
        item.addEventListener('click',()=>{
            const destination = item.innerHTML.toLowerCase()
            if (destination === "resources" || destination === "forum" || destination === "information"){
                const id = window.location.pathname.split("/")[2];
                window.location.pathname = `${item.innerHTML.toLowerCase()}/${id}`;
            }
            else if(destination === "signout"){
                document.cookie = "user_id:;expires=" + new Date(0).toUTCString();
                window.location.pathname = '/login';
            }
            else {
                window.location.pathname = `${item.innerHTML.toLowerCase()}`;
            }

        });    
    }
    try{
        document.getElementById('create-page').addEventListener('click', ()=>{
            window.location.pathname ='/createCourse';

        });
    }catch(error){}
    try{
        document.getElementById('createButton').addEventListener('click',create);
    }catch(error){}

    //switch on name of page
    switch(window.location.pathname.split('/').pop()){
        case 'courses':
            break;
        case 'directory':
            break;
        case 'search':
            break;
        // case 'resources':
        //     document.getElementById('createCourse btn').addEventListener('click', async ()=>{
        //         window.location.pathname = "/addResource"
        //     });

        //     console.log('notifications');
        //     createTable('table-placement','new-table',[
        //         ['<a href=\'./link\'>Resource 1</a>','Helpful article','Today'],
        //         ['<a href=\'./link\'>Resource 2</a>','Good pseudocode','Yesterday'],
        //         ['<a href=\'./link\'>Resource 3</a>','Funny meme','Last week']
        //         ], 
        //         ['Resource','Description','Date']);
        //     break;
        // case 'addResource':
        //     document.getElementById('resource btn').addEventListener('click', async ()=>{
        //         window.location.pathname = "/resources"
        //     });
        case 'forum':
            break;
        case 'forumPost':

            break;
        default:
            break;
    }

}
window.addEventListener('load', afterLoad);
