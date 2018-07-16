var timer = null;
var start = 0;
var paused = 0;
var diffs = [];
var elapsed = '0.00';

function toggle_timer(e) {
  if (!e.classList.contains('active')) {
    if (!start) start = new Date().getTime(); // - (9.999 * 60 * 60 * 1000); // Test Times
    if (paused) diffs.push(new Date().getTime() - paused);
    var adjustedStart = start;
    diffs.forEach(function (diff) { adjustedStart += diff; });
    timer = setInterval(update_timer, 33, e, adjustedStart);
    e.classList.add('active')
  } else {
    clearInterval(timer);
    paused = new Date().getTime();
    e.classList.remove('active')
  }
};

function update_timer(e, adjustedStart) {
  elapsed = Math.floor((new Date().getTime() - adjustedStart) / 10) / 100;

  var timeElement = e.children[0].children[0];
  var subtimeElement = e.children[0].children[1];
  var h = Math.floor((elapsed * 1000) / (1000 * 60 * 60));
  var m = (new Date(elapsed * 1000)).getMinutes();
  var s = (new Date(elapsed * 1000)).getSeconds();
  var zeroM = (h > 0) ? zeroFill(m) : m;
  var zeroS = (h > 0 || m > 0) ? zeroFill(s) : s;

  h = (h) ? h += ':' : '';
  zeroM += ':';
  if (zeroM === '0:') zeroM = '';

  timeElement.innerText = h + zeroM + zeroS;
  subtimeElement.innerText = '.' + zeroFill(Number(String(elapsed).split('.')[1]) || 0);
};

function toggle_item(e) {
  e.preventDefault();

  var parent = e.currentTarget;
  var show = null;
  var items = [];
  var markers = false;

  if (e.which === 2) items = parent.querySelector('.markers');
  else items = parent.querySelector('.items');

  if (e.which === 1
      && !parent.classList.contains('counted')
      && !(parent.classList.contains('dungeon') && !parent.querySelector('.items').children[0].classList.contains('hidden'))) {
    items.classList.toggle('grayscale');
  }

  if (e.which === 3 || (e.which === 2 && items)) {
    for (var i = 0; i < items.children.length; i++) {
      if (!items.children[i].classList.contains('hidden')) {
        items.children[i].classList.add('hidden');
        show = i + 1;
      }

      if (show === items.children.length) {
        items.children[0].classList.remove('hidden');
      } else if (show === i) {
        items.children[i].classList.remove('hidden');
      }
    }

    if (!show) items.children[0].classList.remove('hidden');
  }
};

function zeroFill(i) {
  if (i < 10) i = '0' + i;
  return i;
};

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var ap = 'am';

  if (h > 11) {
    var ap = 'pm';
    h -= 12;
  }

  if (h === 0) h = 12;

  m = zeroFill(m);
  document.getElementById('clock').innerHTML = h + ':' + m + ap + ' PT';
  var time = setTimeout(startTime, 500);
};
