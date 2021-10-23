function afterLoad(){

    document.getElementById('menu').addEventListener('click',()=>{
        document.getElementById('sidebar').classList.toggle('active');
    });
}
window.addEventListener('load', afterLoad);
