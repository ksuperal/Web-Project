/*
TODO

-hidden on load for dropdown
-visible when logged in

*/


const web = 'http://localhost:8000/'

window.onload = function() {

    document.getElementById('login').addEventListener('click', login);
    document.getElementById('register').addEventListener('click', register);
    document.getElementById('username').addEventListener('keyup', function(event) {
        if (event.keyCode === 13 && document.getElementById('username').value != "") {
            event.preventDefault();
            document.getElementById('login').click();
        }
    });
    document.getElementById('password').addEventListener('keyup', function(event) {
        if (event.keyCode === 13 && document.getElementById('username').value != "") {
            event.preventDefault();
            document.getElementById('login').click();
        }
    });

    localStorage.getItem("username") ? document.getElementById('username').value = localStorage.getItem("username") : null;
    localStorage.getItem("password") ? document.getElementById('password').value = localStorage.getItem("password") : null;

    document.getElementById('alert').style.display = "none";
}

function login() {
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === "" || password === "") {
        document.getElementById('alert').innerHTML = "Username or password cannot be empty!";
        document.getElementById('alert').style.display = "block";
        const container = document.querySelector('.login-container');
        container.style.height = '40%';
        return;
    }

    fetch(web + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    .then(response => response.json())
    .then(data => {
        // alert(data.message);
        if (data.message != "Login successful!") {
            document.getElementById('alert').innerHTML = "Wrong username or password!";
            document.getElementById('alert').style.display = "block";

            const container = document.querySelector('.login-container');
            container.style.height = '40%';
            return;
        }
        else{
            saveCredential();
            window.location.href = `se.html`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function register() {
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === "" || password === "") {
        document.getElementById('alert').innerHTML = "Username or password cannot be empty!";
        document.getElementById('alert').style.display = "block";
        const container = document.querySelector('.login-container');
        container.style.height = '40%';
        return;
    }

    fetch(web + 'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('alert').innerHTML = data.message;
        document.getElementById('alert').style.display = "block";

        const container = document.querySelector('.login-container');
        container.style.height = '40%';
        return;
        // alert(data.message);
        // Additional logic based on the response, e.g., redirect to another page on successful login
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function saveCredential(){

    var remember = document.getElementById('remember').checked;

    if (remember) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
    } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }
}