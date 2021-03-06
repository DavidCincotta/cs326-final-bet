import {createTable,postData,authorization} from './utilities.js';
authorization();
let response = '';
let arrList = [];
let data = {};

async function search(){
    const keyword = document.getElementById('keyword').value;    
    const collegeElm = document.getElementById('college-select');
    const college = collegeElm.options[collegeElm.selectedIndex].value;
    const number  = document.getElementById('course-number').value;
    data = {'keyword':keyword,'college':college,'course_number':number};
    response = await postData('/Courses/search',data);

    arrList = []
    for(let r of response){
        arrList.push([`<a href='information/${r.id}'>`+r.course_name+'</a>',r.course_number,r.short_description]);
    }
    createTable('table-placement','new-table',arrList,['Course', 'Course Number', 'Description']);
}

async function afterLoad(){


    switch(window.location.pathname.split('/').pop()){
        case 'courses':
            let data = {'user_id':document.cookie.split(':')[1]};
            response = await postData('Courses/mycourses',data);
            arrList = [];
            for(let r of response){
                /// Make information = information/${course_id}
                arrList.push([`<a href='information/${r.id}'>`+r.course_name+'</a>',r.course_number,r.short_description]);
            }
            createTable('table-placement','new-table',arrList,['Course', 'Course Number', 'Description']);
            break;
        case 'directory':
            response = await fetch('Courses/directory');
            response = await response.json();
            arrList = [];
            for(let r of response){
                arrList.push([`<a href='information/${r.id}'>`+r.course_name+'</a>',r.course_number,r.short_description]);
            }
            createTable('table-placement','new-table',arrList,['Course', 'Course Number', 'Description']);
            break;
        case 'search':
            document.getElementById('search-button').addEventListener('click',search);
            
            break;
    }
        

}

window.addEventListener('load', afterLoad);
