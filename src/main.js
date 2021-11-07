'use strict'
import {createTable} from './utilities.js';


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
            document.location.href =item.innerHTML.toLowerCase()+'.html';
        });    
    }
    try{
        document.getElementById('create-page').addEventListener('click', ()=>{
            document.location.href ='./createCourse.html';
        });
    }catch(error){}

    //switch on name of page
    switch(window.location.pathname.split('/').pop()){
        case 'courses.html':
            break;
        case 'directory.html':
            break;
        case 'search.html':
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
            break;
        case 'forumPost.html':
            break;
        default:
            break;
    }

}
window.addEventListener('load', afterLoad);
