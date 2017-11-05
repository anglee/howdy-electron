const { ipcRenderer } = require('electron');
ipcRenderer.on('main-chart-date-update', (event, props) => {
  const $table = document.querySelector("#table");
  $table.innerHTML = `<table><tbody><tr><th>Time</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr>`
    + props.data.map(d => `<tr>${d.map(it => `<td>${it}</td>`).join('')}</tr>`).join('\n')
    + `</tbody></table>`;
});
