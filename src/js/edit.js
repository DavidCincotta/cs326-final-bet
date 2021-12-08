
'use strict'
import {createTable,authorization,postData} from './utilities.js';


let loc = ''

async function editpull(){
    const info = await postData('/getInfo/'+loc);
    const json = await info.json();

    const collegeElm = document.getElementById('college');
    const college = collegeElm.options[collegeElm.selectedIndex].value;
    const course_name = document.getElementById('course_name').value;
    const course_number = document.getElementById('course_number').value;
    const short_description = document.getElementById('short_description').value;
    const long_description = document.getElementById('long_description').value;
    const professor = document.getElementById('professor').value;
    const start_year = document.getElementById('start_year').value;

    collegeElm.selectedIndex = json['college']; 
    course_name = json['course_name'];
    course_number = json['course_number'];
    short_description = json['short_description'];
    long_description = json['long_description'];
    professor = json['professor'];
    start_year = json['start_year'];
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
    console.log(json);
    try{
        const response = await postData('/Courses/editcourse',json);
        console.log(response);
        window.location.pathname = `/information/${loc}`;
    }
    catch(error){

    }
};

function afterLoad(){
    loc = document.location.split('/')[2];
    editpull();
    document.getElementById('changeButton').addEventListener('click',editpost());

}
