import {createTable,postData} from './utilities.js';

let response = '';
let arrList = [];
let data = {};

async function search(){
    console.log('search');
    const keyword = document.getElementById('keyword').value;    
    const collegeElm = document.getElementById('college-select');
    const college = collegeElm.options[collegeElm.selectedIndex].innerHTML;
    const number  = document.getElementById('course-number').innerHTML;
    console.log(keyword+'  '+college+'  '+number);
    data = {'keyword':keyword,'college':college,'course_number':number};
    response = await postData('http://localhost:3010/Courses/getcourse',data);
    arrList = []
    for(let r of response){
        arrList.push(['<a href=\'information.html\'>'+r.name+'</a>',r.course_number,r.description]);
    }
    createTable('table-placement','new-table',arrList,['Course', 'Course Number', 'Description']);
}

async function afterLoad(){


    switch(window.location.pathname.split('/').pop()){
        case 'courses.html':
            let data = {'account_id':'123'};
            response = await postData('http://localhost:3010/Courses/getcourse',data);
            arrList = [];
            for(let r of response){
                arrList.push(['<a href=\'information.html\'>'+r.name+'</a>',r.course_number,r.description]);
            }
            createTable('table-placement','new-table',arrList,['Course', 'Course Number', 'Description']);
            break;
        case 'directory.html':
            response = await fetch('http://localhost:3010/Courses/directory');
            response = await response.json();
            arrList = [];
            for(let r of response){
                arrList.push(['<a href=\'information.html\'>'+r.name+'</a>',r.course_number,r.description]);
            }
            createTable('table-placement','new-table',arrList,['Course', 'Course Number', 'Description']);
            break;
        case 'search.html':
            document.getElementById('search-button').addEventListener('click',search);
            
            break;
    }
        

}

window.addEventListener('load', afterLoad);