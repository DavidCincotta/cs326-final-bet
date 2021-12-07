'use strict';

export function createTable(position, id,inputList,headers){
    let tbl = document.createElement('table');
    tbl.setAttribute('id',id);
    tbl.classList.add('table');
    

    let thd = document.createElement('thead');
    let headerRow = document.createElement('tr');
    headers.forEach((h)=>{
        let headerItem = document.createElement('th');
        headerItem.setAttribute('scope','col');
        headerItem.innerHTML = h;
        headerRow.appendChild(headerItem);
    });
    thd.appendChild(headerRow);
    tbl.appendChild(thd);

    let tbody = document.createElement('tbody');
    console.log(inputList); 
    inputList.forEach((row)=>{
        let trow = document.createElement('tr');
        row.forEach((col)=>{
            let tcol = document.createElement('th');
            tcol.innerHTML = col;
            trow.appendChild(tcol);
        });
        tbody.appendChild(trow);
    });
    tbl.innerHTML = '';
    tbl.appendChild(tbody);

    document.getElementById(position).appendChild(tbl);
}
//Posts data to the server
export async function postData(url, data){
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
//Checks cookie on user to see if it matches, otherwise returns user back to login page
export function authorization(){
    const cookie = document.cookie.split(':')[1];
    if (cookie ===undefined || cookie.length!==23 || cookie === null ){
        document.location.href = '/login';
    }
}
//Get current date for forum and resources 
export function getDate(){
    const currentDate = new Date();
    const minutes = (currentDate.getMinutes()<10?'0':'') + currentDate.getMinutes();
    const seconds = (currentDate.getSeconds()<10?'0':'') + currentDate.getSeconds()
    const ending = currentDate.getHours() >= 12 ? "PM" : "AM";
    const date = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours() % 12}:${minutes}:${seconds} ${ending}`
    return date;
}
