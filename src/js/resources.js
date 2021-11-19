import {createTable, postData} from './utilities.js';

function afterLoad() {
    switch(window.location.pathname){
        case 'resources':
            document.getElementById('createCourse btn').addEventListener('click', async ()=>{
                window.location.pathname = "/addResource"
            });

            console.log('notifications');
            createTable('table-placement','new-table',[
                ['<a href=\'./link\'>Resource 1</a>','Helpful article','Today'],
                ['<a href=\'./link\'>Resource 2</a>','Good pseudocode','Yesterday'],
                ['<a href=\'./link\'>Resource 3</a>','Funny meme','Last week']
                ], 
                ['Resource','Description','Date']);
            break;
        case 'addResource':
            document.getElementById('resource btn').addEventListener('click', async ()=>{
                const title = document.getElementById("title").value
                const link = document.getElementById("link").value
                const desc = document.getElementById("description").value
                addResource(title, link, desc)
            });
            break;
        default:
            break;
    }
}

window.addEventListener('load', afterLoad);

function addResource(title, link, description){
    const body = {"title": title, "link": link, "description": description}
    postData("/addResource", body);
}