window.onscroll = function() {scrollFunction()};
const navLogo = document.getElementById("nav-logo")
console.log(navLogo);

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.padding = "5px 20px";
    navLogo.style.maxHeight = "50px";
} else {
    document.getElementById("navbar").style.padding = "20px";
    navLogo.style.maxHeight = "100px";
  }
} 