const _ = require('lodash');
console.log('_.VERSION', _.VERSION);
const { ipcRenderer } = require('electron');


ipcRenderer.on('main-toggle-odd', (event, props) => {
  console.log('GOT main-toggle-odd', props.checked);
  const elements = document.getElementsByClassName("odd");
  console.log(elements);
  console.log(elements.length);
  console.log(_.isArray(elements));
  if (props.checked) {
    _.forEach(elements, element => { element.style.display = 'list-item'; });
  } else {
    _.forEach(elements, element => { element.style.display = 'none'; });
  }
});

ipcRenderer.on('main-toggle-even', (event, props) => {
  console.log('GOT main-toggle-even', props.checked);
  const elements = document.getElementsByClassName("even");
  if (props.checked) {
    _.forEach(elements, element => { element.style.display = 'list-item'; });
  } else {
    _.forEach(elements, element => { element.style.display = 'none'; });
  }
});


