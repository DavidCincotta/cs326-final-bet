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
        console.log(item);
        item.addEventListener('click',()=>{
            document.location.href = './'+item.innerHTML.toLowerCase();//+'.html';

        });    
    }
    

    console.log(window.location.pathname.split('/').pop());
    //switch on name of page
    
    /*
    switch(window.location.pathname.split('/').pop()){
        case 'courses.html':
            createTable('table-placement','new-table',[
                ['<a href=\'./link\'>web programming</a>','326','recent'],
                ['statistics','240','inactive'],
                ['underwater basket weaving','400','recent']
                ], 
                ['name','course number', 'activity']);
            break;
        case 'directory.html':
            createTable('table-placement','new-table',[
                ['<a href=\'./link\'>web programming</a>','326','recent'],
                ['statistics','240','inactive'],
                ['underwater basket weaving','400','recent']
                ], 
                ['name','course number', 'activity']);
            break;
        case 'search.html':
            console.log('search section');
            document.getElementById('search-button').addEventListener('click',()=>{
                
                createTable('table-placement','new-table',[
                    ['<a href=\'./link\'>web programming</a>','326','recent'],
                    ['statistics','240','inactive'],
                    ['underwater basket weaving','400','recent']
                ], ['name','course number', 'activity']);

            });
            break;
        default:
            console.log('default');
    }
    */

}

window.addEventListener('load', afterLoad);

