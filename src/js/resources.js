import {createTable, postData} from './utilities.js';

async function afterLoad() {
    if (window.location.pathname.split("/")[1] = "resources"){
        const id = window.location.pathname.split("/")[2]
        document.getElementById('createCourse btn').addEventListener('click', async ()=>{
            window.location.pathname = `/addResource/${id}`
        });
        const resources = await fetch(`/getResources/${id}`)
        const params = []
        for (const resource of resources["resources"]){
            const param = [`<a href=\'${resource['link']}\'>${resource['title']}</a>`,`${resource['description']}`,`${resource['date']}`]
            console.log(param)
            params.push(param)
        }
        createTable('table-placement','new-table', params,
            ['Resource','Description','Date']);
    }
    else if (window.location.pathname.split('/')[1] === 'addResource'){
        const id = window.location.pathname.split("/")[2]
        document.getElementById('resource btn').addEventListener('click', async ()=>{
            const title = document.getElementById("title").value
            const link = document.getElementById("link").value
            const desc = document.getElementById("description").value
            addResource(title, link, desc, id)
        });
    }
}

window.addEventListener('load', afterLoad);

function addResource(title, link, description, course){
    const body = {"title": title, "link": link, "description": description}
    postData(`/addNewResource/${course}`, body);
}