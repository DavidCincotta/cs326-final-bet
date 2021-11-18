import {postData} from './utilities.js';

function afterLoad(){

    const loginBtn = document.getElementById('loginBtn');
    const submitBtn = document.getElementById('submitBtn');
    const updateBtn = document.getElementById('updateBtn');

    if (loginBtn!== null){
        loginBtn.addEventListener('click',()=>{
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            if(!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(login))){
                alert("Invalid Email!");
                return;
            }
            const body = {"email": login, "password": password};
            getLogin(body); 
        })
    }
    if (submitBtn!== null){
        submitBtn.addEventListener('click',()=>{
            const checkbox = document.getElementById('notifCheck').checked;
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value;
            if(!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(login))){
                alert("Invalid Email!");
                return;
            }
            if (password.length<8){
                alert("Password should be atleast 8 characters!");
                return;
            }
            if(password!==password2){
                alert("Passwords do not match!");
                return;
            }
            const body = {"email": login, "password": password,"notification_flag": checkbox};
            createAccount(body);
        })
    }
    if (updateBtn!==null){
        updateBtn.addEventListener('click',()=>{
            const currPass = document.getElementById('currPass').value;
            const updatePass = document.getElementById('updatePass').value;
            const confirmPass = document.getElementById('confirmPass').value;
            const notifCheck = document.getElementById('notifCheck').checked;

            let passData = "" //use the one thats stored on Account
            const data={};
            if(currPass === passData){
                const emailUpdate = document.getElementById('emailUpdate').value;
                if (emailUpdate.length>0&&!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailUpdate))){
                    alert("Email not available");
                }
                else if(emailUpdate.length!=0){
                    data["email"]=emailUpdate;
                }
                if (updatePass !== confirmPass){
                    alert("Passwords do not match");
                }
                else if(updatePass.length<8&&updatePass.length!==0){
                    alert("Password too short");
                }
                else if(updatePass.length!==0){
                    data["password"]=updatePass;
                }
                data["notification_flag"]=notifCheck;
                updateAccount(data);
            }
            else{
                alert("Wrong Password");
            }
        })
    }
}
async function getLogin(body){  
    const log = await postData('account/login',body);
    if(log==='account_id'){
        document.location.href = './courses.html';
    }
    else{
        alert("account does not exist");
    }
}
async function createAccount(body){  
    const create = await postData('account/register',body);
    if(create!==null){
        document.location.href = './courses.html';
    }
    else{
        alert("something went wrong");
    }
}
async function updateAccount(body){
    const x = await postData('account/update',body);
    if(x==="okay"){
        alert("Settings have been updated");
    }
}

window.addEventListener('load', afterLoad);



