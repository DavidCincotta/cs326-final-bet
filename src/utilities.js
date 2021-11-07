

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
    
    inputList.forEach((row)=>{
        let trow = document.createElement('tr');
        row.forEach((col)=>{
            let tcol = document.createElement('th');
            tcol.innerHTML = col;
            trow.appendChild(tcol);
        });
        tbody.appendChild(trow);
    });
    tbl.appendChild(tbody);

    document.getElementById(position).appendChild(tbl);
}

export async function postData(url, data){
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
