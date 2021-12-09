import {createTable, postData,authorization} from './utilities.js';

function editcourse(){
    const loc = document.location.pathname.split('/');
    const course = loc[2];
    window.location = '/editcourse/'+course
}
async function trackcourse(){
    const userid = document.cookie.split(':')[1];
    const loc = document.location.pathname.split('/');
    const course = loc[2];
    const body = {'user_id':userid,'course':course};
    console.log(body)
    await postData('/Courses/trackcourse',body);
}
async function untrackcourse(){
    const userid = document.cookie.split(':')[1];
    const loc = document.location.pathname.split('/');
    const course = loc[2];
    const body = {'user_id':userid,'course':course};
    console.log(body)
    await postData('/Courses/untrackcourse',body);
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
    document.getElementById("track-course").addEventListener('click',trackcourse)
    document.getElementById("untrack-course").addEventListener('click',untrackcourse)
}

window.addEventListener('load', afterLoad);
