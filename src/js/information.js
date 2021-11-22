import {createTable, postData,authorization} from './utilities.js';

async function afterLoad() {
    authorization()
    const id = window.location.pathname.split("/")[2]
    const information = await fetch(`/getInfo/${id}`)
    const json = await information.json()
    const name = json['courseName']
    const number = json['courseNumber']
    const desc = json['description']
    const prof = json['professor']
    const year = json['year']
    document.getElementById("course-header").innerText = `Course: ${name}`
    document.getElementById("course-title").innerText = `${number} ${name}`
    document.getElementById("professor").innerText = `Professor: ${prof}`
    document.getElementById("start-year").innerText = `Since: ${year}`
    document.getElementById("description").innerText = desc

}

window.addEventListener('load', afterLoad);
