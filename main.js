const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

async function getSW() {
  return navigator.serviceWorker.getRegistration('/worker.js');
}

let a = document.getElementById("audio");

if (navigator.serviceWorker) {
	let y = navigator.serviceWorker;
	navigator.serviceWorker.register('/worker.js').then(function(registration) {
		console.log('Reg succ:', registration);
		navigator.serviceWorker.controller.postMessage(2);
	}, function(error) {
		console.log('Reg fail:', error);
	});
	navigator.serviceWorker.onmessage = async function(event) {
		dat = event.data;
		console.log("Hey got message");
		let sw = await getSW();
		a.pause();
		a.currentTime = 0;
		let nots = await sw.getNotifications();
		nots.forEach(not => {
			not.close();
		});
		/*
		sw.showNotification('test', dat).then(res => {
			notification = res
		});
		*/
		a.play();
	}
} else {
	console.log('Your browser doesn\'t support web workers.')
}

first.onchange = function() {
	let a = document.getElementById("audio");
	a.play();
}

function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
    // set the button to shown or hidden, depending on what the user answers
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
      notificationBtn.style.display = 'block';
    } else {
      notificationBtn.style.display = 'none';
    }
  }

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log("This browser does not support notifications.");
  } else {
    if(checkNotificationPromise()) {
      Notification.requestPermission()
      .then((permission) => {
        handlePermission(permission);
      })
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission);
      });
    }
  }
}

function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }


let notificationBtn = document.getElementById("enable");
notificationBtn.onclick = askNotificationPermission;