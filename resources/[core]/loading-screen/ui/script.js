console.log('Loading Screen Script Loaded');

window.addEventListener('message', function (event) {
  console.log(event, event.data);
  var item = event.data;
  if (item.type === 'loading_info') {
    if (item.status == true) {
      display2(true);
    } else {
      display2(false);
    }
  }
  if (item.type === 'character_info') {
    if (item.status == true) {
      display(true);
      character_table = item.table;
      count_char = item.countchar;
      load_info(item.first, item.last, item.job, item.money, item.gold, item.sex);
    } else {
      display(false);
    }
  }
  if (item.type === 'volume_stop') {
    if (item.status == true) {
      stop_volume();
    } else {
      play_volume();
    }
  }
});

setTimeout(() => {
  const interval = setInterval(() => {
    fetch('//game/loadscreen-shutdown-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.shutdown) {
          clearInterval(interval);
          window.document.body.classList.add('hidden');
        }
      })
      .catch((e) => {});
  }, 1000);
}, 15000);
