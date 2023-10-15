
document.addEventListener("DOMContentLoaded", function () {

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});


});
function toggleVisibility() {
  var item2 = document.querySelector('.item2');
  var tag = document.querySelector('.tag');
  
  
  item2.style.visibility = (item2.style.visibility === 'visible') ? 'hidden' : 'visible';
  
  tag.style.marginLeft = (tag.style.marginLeft === '75%') ? '90%' : '75%';
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