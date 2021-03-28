let timeout = 2 * 1000;

function iter(limit, num) {
    num = num || 0;
    if (num >= limit) {
        console.log("IM DONE");
        return
    }
    console.log("not done yet")
    const clients = self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            let vibration = 100 * (num + 1);
            client.postMessage({
                body: 'hihi ' + vibration,
                vibration: vibration,
            });
        });
    });
    let next = num += 1;
    self.setTimeout(function() {
        iter(limit, next);
    }, timeout)
}

onmessage = function(e) {
  let dat = e.data;
  console.log('got data ' + dat);
  self.setTimeout(function() { iter(e.data); });
}
