console.log('Loading Screen Script Loaded');

let curEventType = '';
let curLoadFraction = 0;

window.addEventListener('message', function (event) {
  // console.log(event, event.data);
  console.log('============================');
  console.log(JSON.stringify(event.data));

  const progress = document.getElementById('progress');
  progress.classList.remove('hide');

  const { type: eventType, loadFraction, eventName, message } = event.data;
  if (eventType) {
    console.log('eventType', eventType);

    if (curEventType !== eventType) {
      console.log(`Event type changed from ${curEventType} to ${eventType}`);
      console.log(`Load fraction: ${curLoadFraction}`);
    }

    curEventType = eventType;
  }
  if (loadFraction) {
    curLoadFraction = loadFraction;
    const progressBar = document.getElementById('progress-bar');
    progressBar.classList.remove('hide');
    progressBar.style.width = `${curLoadFraction * 100}%`;
  }
  if (eventName) {
    console.log('eventName', eventName);
  }
  if (message) {
    console.log('message', message);
    const progressSubText = document.getElementById('progress-sub-text');
    progressSubText.textContent = message;
  }

  const progressText = document.getElementById('progress-text');
  progressText.textContent = `${curEventType} | ${Math.round(curLoadFraction * 100)}%`;

  // var item = event.data;
  // if (item.type === 'loading_info') {
  //   if (item.status == true) {
  //     display2(true);
  //   } else {
  //     display2(false);
  //   }
  // }
  // if (item.type === 'character_info') {
  //   if (item.status == true) {
  //     display(true);
  //     character_table = item.table;
  //     count_char = item.countchar;
  //     load_info(item.first, item.last, item.job, item.money, item.gold, item.sex);
  //   } else {
  //     display(false);
  //   }
  // }
  // if (item.type === 'volume_stop') {
  //   if (item.status == true) {
  //     stop_volume();
  //   } else {
  //     play_volume();
  //   }
  // }
});

setTimeout(() => {
  const interval = setInterval(() => {
    fetch('https://game/loadscreen-shutdown-check', {
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
