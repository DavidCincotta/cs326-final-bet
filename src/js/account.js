import {postData,authorization} from './utilities.js';

function afterLoad(){
    const loginBtn = document.getElementById('loginBtn');
    const submitBtn = document.getElementById('submitBtn');
    const updateBtn = document.getElementById('updateBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    if (loginBtn!== null){
        loginBtn.addEventListener('click',()=>{
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            if(login.length<1){
                alert("Invalid username!");
                return;
            }
            const body = {"username": login, "password": password};
            getLogin(body); 
        })
    }
    if (submitBtn!== null){
        submitBtn.addEventListener('click',()=>{
            const username = document.getElementById('username').value;
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value;
            if(!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(login))){
                alert("Invalid Email!");
                return;
            }
            if(username.length<1){
                alert("No username inputed");
            }
            if (password.length<8){
                alert("Password should be atleast 8 characters!");
                return;
            }
            if(password!==password2){
                alert("Passwords do not match!");
                return;
            }
            const body = {"user_id": guid(), "email": login,"username":username, "password": password};
            createAccount(body);
        })
    }
    if (updateBtn!==null){
        authorization();
        updateBtn.addEventListener('click',()=>{
            const emailUpdate = document.getElementById('emailUpdate').value;
            const username = document.getElementById('usernameUpdate').value;
            const updatePass = document.getElementById('updatePass').value;
            const currPass = document.getElementById('currPass').value;
            const data={};
                if (emailUpdate.length>0&&!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(emailUpdate))){
                    alert("Email not available");
                    return;
                }
                else if(emailUpdate.length!=0){
                    data["email"]=emailUpdate;
                }
                if(updatePass.length<8&&updatePass.length!==0){
                    alert("Password too short");
                    return;
                }
                else if(updatePass.length!==0){
                    data["password"]=updatePass;
                }
                if(username.length>0){
                    data["username"]=username;
                }
                data["currPass"]=currPass;
                data["user_id"]=document.cookie.split(':')[1];
                updateAccount(data);
        })
    }
    if (deleteBtn!==null){
        deleteBtn.addEventListener('click', ()=>{     
        const currPass = document.getElementById('currPass').value;
        if (currPass.length===0){
            alert('Enter password');
            return;
        }
        const data = {'currPass':currPass,'user_id':document.cookie.split(':')[1]};
        if (confirm('Are you sure you want to delete this account?')) {
            deleteAcc(data);
          } 
        else{}//do nothing
    })
    }

}
async function deleteAcc(data){
    const response = await fetch('account/delete', {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)  // body data type must match "Content-Type" header
    });
    console.log("here")
    const result = await response.json(); // parses JSON response into native JavaScript objects
    if (result === 200){
        document.cookie = "user_id:;expires=" + new Date(0).toUTCString();
        document.location.href = './login';
    }
    else{
        alert("Wrong Password");
    }
}
async function getLogin(body){  
    const log = await postData('account/login',body);
    if(log===false){
        alert("account does not exist");
        return;
    }
    else{
        document.cookie = `user_id:${log}`;
        document.location.href = './courses';
    }
}
async function createAccount(body){  
    const create = await postData('account/register',body);
    console.log(create);
    if(create!==null){
        document.cookie = `user_id:${create}`;
        document.location.href = './courses';
    }
    else{
        alert("Username or Email already exists");
    }
}
async function updateAccount(body){
    const result = await postData('account/update',body);
    if(result!=="200"){
        alert(result);
    }
    else{
        alert('Settings updated!');
    }
}

window.addEventListener('load', afterLoad);

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
const guid = () => (S4() + S4()+ S4() + S4().substr(0,3) + S4() + S4()).toLowerCase();

