const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

let notification = null;

if (window.Worker) {
	const myWorker = new Worker("worker.js");

	first.onchange = function() {
	  myWorker.postMessage([first.value, second.value]);
	  console.log('Message posted to worker');
	}

	second.onchange = function() {
	  myWorker.postMessage([first.value, second.value]);
	  console.log('Message posted to worker');
	}

	myWorker.onmessage = function(e) {
		console.log('Message received from worker ' + e.data);
		if (!!notification) {
			notification.close();
		}
		notification = new Notification('To do list', {
			body: "HEY SUP " + e.data,
			vibrate: e.data,
		});
	}
} else {
	console.log('Your browser doesn\'t support web workers.')
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