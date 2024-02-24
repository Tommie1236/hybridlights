var type = document.getElementById('formType');

type.addEventListener('change', function() {
    var selected = type.options[type.selectedIndex].value;
    if (selected === 'reserve') {
        console.log('type reserve');
        document.getElementById('formDate').style.display = 'block';
        document.getElementById('formDateLbl').style.display = 'block';
        document.getElementById('formTime').style.display = 'block';
        document.getElementById('formTimeLbl').style.display = 'block';
    } else if (selected === 'question') {
        console.log('type question');
        document.getElementById('formDate').style.display = 'none';
        document.getElementById('formDateLbl').style.display = 'none';
        document.getElementById('formTime').style.display = 'none';
        document.getElementById('formTimeLbl').style.display = 'none';
    }
});



function sendForm() {
    var fname = document.getElementById('formFName');
    var lname = document.getElementById('fromLName');
    var email = document.getElementById('formEmail');

    var message = document.getElementById('formMessage');

}