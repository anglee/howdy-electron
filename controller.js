const _ = require('lodash');
console.log('_.VERSION', _.VERSION);
const { ipcRenderer } = require('electron');

// const $dataFilter = document.querySelector('#data-filter');
// $dataFilter.innerText = 'Test';

const $checkboxOdd = document.querySelector("#cb-odd");
const $checkboxEven = document.querySelector("#cb-even");

$checkboxOdd.addEventListener('click', (event) => {
  console.log("on click checkbox odd");
  const {checked} = event.target;
  ipcRenderer.send('controller-toggle-odd', {checked});
});
$checkboxEven.addEventListener('click', (event) => {
  console.log("on click checkbox even");
  const {checked} = event.target;
  ipcRenderer.send('controller-toggle-even', { checked });
});

/*
(async () => {
  const page = 1;
  const query = 'cat';
  const opts = {
    method: 'GET',
    headers: {
      Authorization: 'Client-ID 2032c1feddefa31'
    },
  };
  const response = await fetch(
    `https://api.imgur.com/3/gallery/search/top/all/${page}?q=${query}`,
    //`http://ec2-107-21-76-203.compute-1.amazonaws.com/imgur-proxy/${page}?q=${query}`,
    opts
  ).then(res => res.json());
  console.log('response', response);
})();
*/

