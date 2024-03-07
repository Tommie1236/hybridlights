// Navbar resize
var logo = document.getElementById('nav-logo');

window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY;

    if (scrollPos > 50) { 
        logo.style.maxHeight = '50px';
    } else {
        logo.style.maxHeight = '100px'; 
    }
});