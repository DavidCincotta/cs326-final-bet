import {createTable,postData} from './utilities.js';

async function afterLoad(){
    let response = '';
    let responseJSON='';
    let arrList = [];
    switch(window.location.pathname.split('/').pop()){
        case 'courses.html':
            let account_info = {'account_id':'123'};
            response = await postData('http://localhost:3010/Courses/getcourse',account_info);
            arrList = [];
            for(let r of response){
                arrList.push([r.name,r.course_number,r.description]);
            }
            createTable('table-placement','new-table',arrList,['Course', 'Course Number', 'Description']);
            break;
        case 'directory.html':
            response = await fetch('http://localhost:3010/Courses/directory');
            response = await response.json();
            arrList = [];
            for(let r of response){
                arrList.push([r.name,r.course_number,r.description]);
            }
            createTable('table-placement','new-table',arrList,['Course', 'Course Number', 'Description']);
            break;
        case 'search.html':
            break;
    }
        

}

window.addEventListener('load', afterLoad);
