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
  tag.style.marginLeft = (tag.style.marginLeft === '95%') ? '70%' : '95%';
}
