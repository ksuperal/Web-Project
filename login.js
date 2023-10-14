function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('http://127.0.0.1:8000/login')//'ttp://localhost:8000/login')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                if (username == data[i].username && password == data[i].password) {
                    window.location.href = "se.html";
                    return;
                }
            }
            alert("Wrong username or password!");
        })
        .catch(error => {
            console.error('Error loading data.json:', error);
        });
}

window.onload = function() {
    document.getElementById('login').addEventListener('click', login);
    console.log("loaded");
}