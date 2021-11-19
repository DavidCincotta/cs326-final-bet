import {createTable, postData} from './utilities.js';

async function afterLoad() {
    if (window.location.pathname.split("/")[2] = "resource"){
        const id = window.location.pathname.split("/")[3]
        document.getElementById('createCourse btn').addEventListener('click', async ()=>{
            window.location.pathname = "/addResource"
        });
        const resources = await fetch(`/getResources/${id}`)
        const json = await resources.json()
        const params = []
        for (const resource of json["resources"]){
            const param = [`<a href=\'${resource['link']}\'>${resource['title']}</a>`,`${resource['description']}`,`${resource['date']}`]
            console.log(param)
            params.push(param)
        }
        createTable('table-placement','new-table', params,
            ['Resource','Description','Date']);
    }
    else if (window.location.pathname === 'addResource'){
            document.getElementById('resource btn').addEventListener('click', async ()=>{
                const title = document.getElementById("title").value
                const link = document.getElementById("link").value
                const desc = document.getElementById("description").value
                addResource(title, link, desc)
            });
    }
}

window.addEventListener('load', afterLoad);

function addResource(title, link, description){
    const body = {"title": title, "link": link, "description": description}
    postData("/addResource", body);
}