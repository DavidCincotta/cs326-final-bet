
'use strict'
import {createTable,authorization,postData} from './utilities.js';


let loc = ''

async function editpull(){
    await postData('/getInfo/:course_id', {})

    collegeElm = document.getElementById('college');
    college = collegeElm.options[collegeElm.selectedIndex].value;
    course_name = document.getElementById('course_name').value;
    course_number = document.getElementById('course_number').value;
    short_description = document.getElementById('short_description').value;
    long_description = document.getElementById('long_description').value;
    professor = document.getElementById('professor').value;
    start_year = document.getElementById('start_year').value;
    

    json = {"college":college,"course_name":course_name,"professor":professor,"course_number":course_number,"short_description":short_description,"long_description":long_description,"start_year":start_year};

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
    const json = {"college":college,"course_name":course_name,"professor":professor,"course_number":course_number,"short_description":short_description,"long_description":long_description,"start_year":start_year};
    console.log(json);
    try{
        const response = await postData('/Courses/addcourse',json);
        console.log(response);
        window.location.pathname = `/information/${response['id']}`;
    }
    catch(error){

    }


function afterLoad(){
    loc = document.location.split('/')[2];
    document.getElementById('changeButton').addEventListener('click',editpost());
}
