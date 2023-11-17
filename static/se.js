
var userID = 0;
// var loggedIn = false;

window.onload = function() {
  // userID = fetchUserID();

  // if (userID != 0) {
  //   loggedIn = true;
  // }

  // console.log("loggedInAs: " + userID);
  // console.log("loggedIn: " + loggedIn);

  fetchUserID();

  function displayAlert() {
    var userChoice = confirm("Do you want to logout?");

    return userChoice;
  }

  document.getElementById('login-div').addEventListener('click', () => {
    if (document.getElementById('login-text').innerHTML == "Login") {
      window.location.href = `login.html`;
    }
    else {
      if(displayAlert()){
        fetch('http://localhost:8000/logout', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            "userID": document.getElementById('login-text').innerHTML
          })
        });
        document.getElementById('login-text').innerHTML = "Login";
        var elements = document.querySelectorAll('.dropdown');
        
        elements.forEach(function(element) {
          element.classList.toggle('hidden');
        });
      }
    }
  });

}

function fetchUserID() {
  // if (userID == 0) {
    fetch('http://localhost:8000/tokenGet')
      .then(response => response.json())
      .then(data => {
        if (data.length == 0) {
          console.log("no token");
          document.getElementById('login-text').innerHTML = "Login";

          console.log("loggedInAs: " + document.getElementById('login-text').innerHTML);
          var elements = document.querySelectorAll('.dropdown');
        
          elements.forEach(function(element) {
            element.style.visibility = 'hidden';
          });

          return;
        }
        var expire = data[0].expire;
        let now = new Date(); // Get the current date and time
        let hours = now.getHours(); // Get the hours component
        let minutes = now.getMinutes(); // Get the minutes component

        let nowInMinutes = hours * 60 + minutes; // Convert hours and minutes to total minutes
        // console.log("userID: " + data[0].userID);
        console.log("expire: " + expire);
        console.log("nowInMinutes: " + nowInMinutes);
        if (nowInMinutes > expire) {

          fetch('http://localhost:8000/expiredToken', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
              "userID": data[0].userID
            })
          });

          console.log("token expired");
          document.getElementById('login-text').innerHTML = "Login";

          console.log("loggedInAs: " + document.getElementById('login-text').innerHTML);
          var elements = document.querySelectorAll('.dropdown');
        
          elements.forEach(function(element) {
            element.classList.toggle('hidden');
          });

          return;
        }
        console.log("token: " + data[0].userID);
        document.getElementById('login-text').innerHTML = data[0].userID + "\nLogout";
        // return data[0].userID;
        // console.log("loggedInAs: " + userID);
        // console.log("loggedIn: " + loggedIn);
      });
    // }
  }

document.addEventListener("DOMContentLoaded", function () {

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});


});

function color1(){
  var btn1 = document.getElementById('toggle1');
  var btn2 = document.getElementById('toggle2');
  var item1 = document.getElementById('toggle1img');
  var item2 = document.getElementById('toggle2img');

  btn1.style.backgroundColor = 'coral';
  btn2.style.backgroundColor = 'white';
  item2.style.visibility =  'hidden';
  item1.style.visibility = 'visible' ;
}
function color2(){
  var btn1 = document.getElementById('toggle1');
  var btn2 = document.getElementById('toggle2');
  var item1 = document.getElementById('toggle1img');
  var item2 = document.getElementById('toggle2img');

  btn1.style.backgroundColor = 'white';
  btn2.style.backgroundColor = 'coral';
  item2.style.visibility =  'visible';
  item1.style.visibility = 'hidden' ;
}
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

