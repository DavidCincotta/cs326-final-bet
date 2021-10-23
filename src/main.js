function afterLoad(){

    document.getElementById('menu').addEventListener('click',()=>{
        document.getElementById('sidebar').classList.toggle('active');
    });

    const items = document.getElementsByClassName('item');
    for (let item in items){
        window.addEventListener('click', )
    }
}
window.addEventListener('load', afterLoad);
