window.onload = function(){
    sessionStorage.clear();
    if(sessionStorage.getItem('ACCESS_TOKEN') != null){
        window.location.href = '/dashboard';
    }
}

function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(username == '' || password == '') {
        return;
    }
    fetch('/api/oauth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(res => {
        sessionStorage.setItem('ACCESS_TOKEN', res.token);
        window.location.href = '/dashboard';
    })
    .catch(err => {
        console.log('User Not Found!')
    })
}

function register(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(username.value == '' || password.value == '') {
        return;
    }
    fetch('/api/oauth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(res => {
        sessionStorage.setItem('ACCESS_TOKEN', res.token);
        window.location.href = '/dashboard';
    })
    .catch(err => {
        console.log('Failed to register user!')
    })
}