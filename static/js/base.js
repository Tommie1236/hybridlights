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

// Notifications

const notCon = document.getElementById('notCon');

function createNotification(message, type='default') {
  console.log(`${type} notification: ${message}`);
  const notification = document.createElement('div');
  notification.classList.add('notification')


  switch (type) {
    case 'error':
      message = 'ERROR: ' + message
      notification.classList.add('errNot');
      break
    case 'warning':
      message = 'WARNING: ' + message
      notification.classList.add('warNot');
      break
    case 'success':
      /*message = 'SUCCESS: ' + message*/
      notification.classList.add('sucNot');
      break
    default:
      notification.classList.add('defNot');
    }

  const text = document.createElement('div');
  text.innerHTML = message.replace('\n', '<br>');

  const closeBtn = document.createElement('div');
  closeBtn.className = 'notification-close';
  closeBtn.innerHTML = '&nbsp&times&nbsp';

  closeBtn.addEventListener('click', function () {
    notCon.removeChild(notification);
    adjustNotificationPositions();
  });

  notification.appendChild(text);
  notification.appendChild(closeBtn);
  notCon.appendChild(notification);

  // Timeout notifications???
  // setTimeout(function () {
  //   notCon.removeChild(notification);
  //   adjustNotificationPositions();
  // }, 10000);

  adjustNotificationPositions();
}

function adjustNotificationPositions() {
  const notifications = document.getElementsByClassName('notification');
  let topOffset = 10;

  for (let i = 0; i < notifications.length; i++) {
      notifications[i].style.top = topOffset + 'px';
      topOffset += notifications[i].offsetHeight + 10;
  }
}


function get_flashed_messages() {
  fetch('/flash-messages', {
    method: "GET",
    cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
    "with-categories": true
  }
  }).then(response => { return response.json()
  }).then(data => {
    console.log(data);
    for (var not of data){
      console.log(not);
      if (not.type) {
        createNotification(not.message, not.type)
      } else {
        createNotification(not.message)
      }
    }
  }).catch(err => console.error(err)
  )
}

get_flashed_messages()