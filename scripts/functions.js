function toggleArtifacts(e) {
  e.preventDefault();

  var parent = e.currentTarget;
  var selected = parent.querySelectorAll('.artifact.selected:not(.locked)');
  var unselected = parent.querySelectorAll('.artifact:not(.selected)');

  if (e.which === 1 && unselected.length) unselected[0].classList.add('selected');
  if (e.which === 3 && selected.length) selected[selected.length - 1].classList.remove('selected');

  checkGoMode();
};

function toggleItem(e) {
  e.preventDefault();

  var parent = e.currentTarget;
  var items = parent.querySelector('.items');

  if (e.which === 1 && items.classList.contains('grayscale')) items.classList.remove('grayscale');
  else if (e.which === 1 && !items.classList.contains('grayscale')) items.classList.add('grayscale');

  checkGoMode();
};

function checkGoMode() {
  var selectedArtifacts = document.querySelectorAll('.artifact.selected');
  var unacquiredItems = document.querySelectorAll('.items.grayscale');
  var goModeElement = document.querySelector('#go-mode');
  let goMode = true;

  if (selectedArtifacts.length !== 12) goMode = false;

  if (goMode) {
    unacquiredItems.forEach(function (item) {
      // console.log(item.children[0].getAttribute('src'));
      if (goMode) {
        if (item.children[0].getAttribute('src') === 'images/items/wavebeam.png') goMode = false;
        if (item.children[0].getAttribute('src') === 'images/items/icebeam.png') goMode = false;
        if (item.children[0].getAttribute('src') === 'images/items/plasmabeam.png') goMode = false;
        if (item.children[0].getAttribute('src') === 'images/items/phazonsuit.png') goMode = false;
      }
    });
  }

  // console.log(goMode);

  if (goMode && goModeElement.classList.contains('grayscale')) goModeElement.classList.remove('grayscale');
  else if (!goMode) goModeElement.classList.add('grayscale');
};
