import {createTable, postData,authorization} from './utilities.js';

function editcourse(){
}
function addcourse(){
}

async function afterLoad() {
    authorization()
    const id = window.location.pathname.split("/")[2]
    const information = await fetch(`/getInfo/${id}`)
    const json = await information.json()
    const name = json['course_name']
    const number = json['course_number']
    const desc = json['long_description']
    const prof = json['professor']
    const year = json['start_year']
    document.getElementById("course-header").innerText = `Course: ${name}`
    document.getElementById("course-title").innerText = `${number} ${name}`
    document.getElementById("professor").innerText = `Professor: ${prof}`
    document.getElementById("start-year").innerText = `Since: ${year}`
    document.getElementById("description").innerText = desc
    document.getElementById("edit").addEventListener('click',editcourse)
    document.getElementById("add-course").addEventListener('click',addcourse)
}

window.addEventListener('load', afterLoad);
