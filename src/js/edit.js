
'use strict'
import {authorization,postData} from './utilities.js';


let loc = ''

async function editpull(){
    const info = await fetch(`/getInfo/${loc}`);

    const json = await info.json();

    document.getElementById('college').selectedIndex = json['college'];
    document.getElementById('course_name').value = json['course_name'];
    document.getElementById('course_number').value = json['course_number'];
    document.getElementById('short_description').value = json['short_description'];
    document.getElementById('long_description').value = json['long_description'];
    document.getElementById('professor').value = json['professor'];
    document.getElementById('start_year').value = json['start_year'];
}
async function editpost(){
    const collegeElm = document.getElementById('college');
    const college = collegeElm.options[collegeElm.selectedIndex].value;
    const course_name = document.getElementById('course_name').value;
    const course_number = document.getElementById('course_number').value;
    const short_description = document.getElementById('short_description').value;
    const long_description = document.getElementById('long_description').value;
    const professor = document.getElementById('professor').value;
    const start_year = document.getElementById('start_year').value;
    const json = {"id":loc,"college":college,"course_name":course_name,"professor":professor,"course_number":course_number,"short_description":short_description,"long_description":long_description,"start_year":start_year};
    try{
        const response = await postData('/Courses/editcourse',json);
        window.location.pathname = `/information/${loc}`;
    }
    catch(error){
        window.location.pathname = `/information/${loc}`;

    }
};

function afterLoad(){
    authorization()
    loc = document.location.pathname.split('/')[2];
    editpull();
    document.getElementById('changeButton').addEventListener('click',editpost);
}
window.addEventListener('load', afterLoad);

