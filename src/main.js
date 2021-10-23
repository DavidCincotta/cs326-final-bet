function createTable(position, id,inputList,headers){
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


function afterLoad(){

    //make sidebar an active element
    document.getElementById('menu').addEventListener('click',()=>{
        document.getElementById('sidebar').classList.toggle('active');
    });

    //create links to other pages
    const items = document.getElementsByClassName('item');
    for(const item of items){
        //Change Content
        item.addEventListener('click',()=>{
            window.location.replace('./'+item.innerHTML.toLowerCase()+'.html');
        });    
    }
    

    console.log(window.location.pathname.split('/').pop());
    //switch on name of page
    switch(window.location.pathname.split('/').pop()){
        case 'courses.html':
            createTable('table-placement','new-table',[
                ['<a href=\'./link\'>web programming</a>','326','recent'],
                ['statistics','240','inactive'],
                ['underwater basket weaving','400','recent']
                ], 
                ['name','course number', 'activity']);
            break;
        case 'directory.html':
            createTable('table-placement','new-table',[
                ['<a href=\'./link\'>web programming</a>','326','recent'],
                ['statistics','240','inactive'],
                ['underwater basket weaving','400','recent']
                ], 
                ['name','course number', 'activity']);
            break;
        case 'search.html':
            console.log('search section');
            document.getElementById('search-button').addEventListener('click',()=>{
                
                createTable('table-placement','new-table',[
                    ['<a href=\'./link\'>web programming</a>','326','recent'],
                    ['statistics','240','inactive'],
                    ['underwater basket weaving','400','recent']
                ], ['name','course number', 'activity']);

            });
            break;
        default:
            console.log('default');
    }

}
window.addEventListener('load', afterLoad);
