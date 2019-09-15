function toggleArtifacts(e) {
  e.preventDefault();

  var parent = e.currentTarget;
  var selected = parent.querySelectorAll('.artifact.selected:not(.locked)');
  var unselected = parent.querySelectorAll('.artifact:not(.selected)');

  if (e.which === 1 && unselected.length) unselected[0].classList.add('selected');
  if (e.which === 3 && selected.length) selected[selected.length - 1].classList.remove('selected');
};

function toggleItem(e) {
  e.preventDefault();

  var parent = e.currentTarget;
  var items = parent.querySelector('.items');

  if (e.which === 1 && items.classList.contains('grayscale')) items.classList.remove('grayscale');
  if (e.which === 3 && !items.classList.contains('grayscale')) items.classList.add('grayscale');
};
