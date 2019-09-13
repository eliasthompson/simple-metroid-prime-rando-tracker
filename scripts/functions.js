var timer = null;
var start = 0;
var paused = 0;
var diffs = [];
var elapsed = '0.00';

function toggleArtifacts(e) {
  e.preventDefault();

  var parent = e.currentTarget;
  var selected = parent.querySelectorAll('.artifact.selected');
  var unselected = parent.querySelectorAll('.artifact:not(.selected)');

  if (e.which === 1 && unselected.length) unselected[0].classList.add('selected');
  if (e.which === 3 && selected.length) selected[selected.length - 1].classList.remove('selected');
};

function toggleItem(e) {
  e.preventDefault();

  var parent = e.currentTarget;
  var items = parent.querySelector('.items');

  if (e.which === 1) items.classList.toggle('grayscale');
};

function toggleTimer(element, e) {
  if (e) e.preventDefault();
  console.log(element);

  if (!element.classList.contains('active')) {
    if (e && e.which === 3) {
      timer = null;
      start = 0;
      paused = 0;
      diffs = [];
      elapsed = '0.00';
      updateTimer(element, new Date().getTime());
    } else {
      if (!start) start = new Date().getTime(); // - (9.999 * 60 * 60 * 1000); // Test Times
      if (paused) diffs.push(new Date().getTime() - paused);
      var adjustedStart = start;
      diffs.forEach(function (diff) { adjustedStart += diff; });
      timer = setInterval(updateTimer, 33, element, adjustedStart);
      element.classList.add('active');
    }
  } else if (!e || (e && e.which === 1)) {
    clearInterval(timer);
    paused = new Date().getTime();
    element.classList.remove('active');
  }
};

function updateTimer(element, adjustedStart) {
  elapsed = Math.floor((new Date().getTime() - adjustedStart) / 10) / 100;

  var timeElement = element.children[0];
  var subtimeElement = element.children[1];
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

function zeroFill(i) {
  if (i < 10) i = '0' + i;
  return i;
};
