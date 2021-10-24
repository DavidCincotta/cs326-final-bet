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
        default:
            break;
    }

}
window.addEventListener('load', afterLoad);
