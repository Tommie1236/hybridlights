// Navbar resize

window.onscroll = function() {scrollFunction()};
const navLogo = document.getElementById("nav-logo")

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.padding = "5px 20px";
    navLogo.style.maxHeight = "50px";
} else {
    document.getElementById("navbar").style.padding = "20px";
    navLogo.style.maxHeight = "100px";
  }
}

// Notifications

const notContainer = document.getElementById('notContainer');

function createNotification(message, type=NaN) {
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
    default:
      notification.classList.add('defNot');
    }

  const text = document.createElement('div');
  text.innerHTML = message.replace('\n', '<br>');

  const closeBtn = document.createElement('div');
  closeBtn.className = 'notification-close';
  closeBtn.innerHTML = '&times;';

  closeBtn.addEventListener('click', function () {
    notContainer.removeChild(notification);
    adjustNotificationPositions();
  });

  notification.appendChild(text);
  notification.appendChild(closeBtn);
  notContainer.appendChild(notification);

  // setTimeout(function () {
  //   notificationsContainer.removeChild(notification);
  //   adjustNotificationPositions();
  // }, 5000);

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
  }).then(data => { console.log(data)
    for (var not of data){
      switch (not.type) {
        case 'error':
          createNotification(not.message, 'error');
          break;
        case 'warning':
          createNotification(not.message, 'warning');
          break;
        default:
          createNotification(not.message)
          break;
      }
    }
  }).catch(err => console.error(err)
  )
}

get_flashed_messages()