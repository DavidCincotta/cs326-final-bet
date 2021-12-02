'use strict'
import {createTable,authorization,postData} from './utilities.js';
async function create(){
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

}

function afterLoad(){
    authorization();
    //make sidebar an active element
    document.getElementById('menu').addEventListener('click',()=>{
        document.getElementById('sidebar').classList.toggle('active');
    });

    //create links to other pages
    const items = document.getElementsByClassName('item');
    for(const item of items){
        //Change Content
        item.addEventListener('click',()=>{
            const destination = item.innerHTML.toLowerCase()
            if (destination === "resources" || destination === "forum" || destination === "information"){
                const id = window.location.pathname.split("/")[2] === "longpost" ? window.location.pathname.split("/")[3] : window.location.pathname.split("/")[2];
                window.location.pathname = `${item.innerHTML.toLowerCase()}/${id}`;
            }
            else if(destination === "signout"){
                document.cookie = "user_id:;expires=" + new Date(0).toUTCString();
                window.location.pathname = '/login';
            }
            else {
                window.location.pathname = `${item.innerHTML.toLowerCase()}`;
            }

        });    
    }
    try{
        document.getElementById('create-page').addEventListener('click', ()=>{
            window.location.pathname ='/createCourse';

        });
    }catch(error){}
    try{
        document.getElementById('createButton').addEventListener('click',create);
    }catch(error){}

}
window.addEventListener('load', afterLoad);
