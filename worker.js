let timeout = 2 * 1000;

let notification = null;

let showNot = ServiceWorkerRegistration.showNotification;

function iter(limit, num) {
    num = num || 0;
    if (num >= limit) {
        console.log("IM DONE");
        return
    }
    if (!!notification) {
        notification.close()
    }
    console.log("not done yet")
    let vibration = 100 * num;
    notification = showNot('To do list', {
        body: "HEY SUP " + vibration,
        vibrate: vibration,
    });
    let next = num += 1;
    setTimeout(function() {
        iter(limit, next);
    }, timeout)
}

iter(2);

onmessage = function(e) {
  let dat = e.data;
  console.log('got data ' + dat)
}
