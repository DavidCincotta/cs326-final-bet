import {createTable, postData} from './utilities.js';

async function afterLoad() {
    console.log(window.location.pathname.split('/')[1])
    if (window.location.pathname.split("/")[1] === "resources"){
        const id = window.location.pathname.split("/")[2]
        document.getElementById('resource btn').addEventListener('click', async ()=>{
            window.location.pathname = `/addResource/${id}`
        });
        const resources = await fetch(`/getResources/${id}`)
        const json = await resources.json();
        // console.log(json)
        const params = []
        for (const resource of json["resources"]){
            // console.log(resource)
            const param = [`<a href="http://${resource['link']}">${resource['name']}</a>`,`${resource['description']}`,`${resource['date']}`]
            // console.log(param)
            params.push(param)
        }
        createTable('table-placement','new-table', params,
            ['Resource','Description','Date']);
    }
    else if (window.location.pathname.split('/')[1] === 'addResource'){
        const id = window.location.pathname.split("/")[2]
        console.log(id)
        document.getElementById('resource btn').addEventListener('click', async ()=>{
            const title = document.getElementById("title").value
            const link = document.getElementById("link").value
            const desc = document.getElementById("description").value
            console.log(title, link, desc)
            const currentDate = new Date();
                const date = `${currentDate.getMonth()}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
            await addResource(title, link, desc, date, id)
            window.location.pathname = `/resources/${id}`
        });
    }
}

window.addEventListener('load', afterLoad);

async function addResource(title, link, description, date, course){
    const body = {"title": title, "link": link, "description": description, "date": date};
    await postData(`/addNewResource/${course}`, body);
}