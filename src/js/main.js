'use strict'
import {createTable} from './utilities.js';

// function afterLoad(){

//     //make sidebar an active element
//     document.getElementById('menu').addEventListener('click',()=>{
//         document.getElementById('sidebar').classList.toggle('active');
//     });

//     //create links to other pages
//     const items = document.getElementsByClassName('item');
//     for(const item of items){
//         //Change Content
//         item.addEventListener('click',()=>{
//             document.location.href = `http://localhost:3010/${item.innerText}`;
//         });    
//     }
// }
// window.addEventListener('load', afterLoad);

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
            const destination = item.innerHTML.toLowerCase()
            if (destination === "resources" || destination === "forum" || destination === "information"){
                const id = window.location.pathname.split("/")[2];
                window.location.pathname = `${item.innerHTML.toLowerCase()}/${id}`;
            }
            else {
                window.location.pathname = `${item.innerHTML.toLowerCase()}`
            }

        });    
    }
    try{
        document.getElementById('create-page').addEventListener('click', ()=>{
            window.location.pathname ='/createCourse';

        });
    }catch(error){}
    try{
        document.getElementById('createButton').addEventListener('click', ()=>{
            window.location.pathname ='/information';

        });
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
