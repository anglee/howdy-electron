const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { setMainMenu } = require('./mainMenu');
const fs = require('fs');

let controllerWindow;
let viewerWindow;
let chartWindow;
let tableWindow;
//
// const positionInfo = {
//   controller: {
//     width: 400,
//     height: 300,
//     x: 0,
//     y: 100,
//   },
//   viewer: {
//     width: 400,
//     height: 300,
//     x: 450,
//     y: 100,
//   }
// };

const positionInfo = require('./positionInfo.json');
console.log(positionInfo);

app.on('ready', () => {
  controllerWindow = new BrowserWindow(positionInfo.controller);
  controllerWindow.loadURL(path.join('file:///', __dirname, 'controller.html'));
  controllerWindow.on('ready-to-show', () => {
    controllerWindow.show();
  });
  controllerWindow.on('move', (event) => {
    console.log("window moved", controllerWindow.getPosition());
    const position = controllerWindow.getPosition();
    positionInfo.controller.x = position[0];
    positionInfo.controller.y = position[1];
    console.log("window moved", controllerWindow.getSize());
    const size = controllerWindow.getSize();
    positionInfo.controller.width = size[0];
    positionInfo.controller.height = size[1];
  });

  viewerWindow = new BrowserWindow(positionInfo.viewer);

  viewerWindow.loadURL(path.join('file:///', __dirname, 'viewer.html'));
  viewerWindow.on('ready-to-show', () => {
    viewerWindow.show();
  });
  viewerWindow.on('move', (event) => {
    console.log("window moved", viewerWindow.getPosition());
    const position = viewerWindow.getPosition();
    positionInfo.viewer.x = position[0];
    positionInfo.viewer.y = position[1];
    console.log("window moved", viewerWindow.getSize());
    const size = viewerWindow.getSize();
    positionInfo.viewer.width = size[0];
    positionInfo.viewer.height = size[1];
  });

  ipcMain.on('controller-toggle-odd', (event, props) => {
    console.log("toggle odd", props.checked);
    viewerWindow.webContents.send('main-toggle-odd', { checked: props.checked });
  });
  ipcMain.on('controller-toggle-even', (event, props) => {
    console.log("toggle odd", props.checked);
    viewerWindow.webContents.send('main-toggle-even', { checked: props.checked });
  });

  const onSaveLayout = () => {
    console.log('Guess I better save layout now');
    fs.writeFile(
      'positionInfo.json',
      JSON.stringify(positionInfo, null, 2),
      (err) => {
        console.log("Layout has been saved");
      }
    );
  };

  chartWindow = new BrowserWindow(positionInfo.chart);
  chartWindow.loadURL(path.join('file:///', __dirname, 'chart.html'));
  chartWindow.on('ready-to-show', () => {
    chartWindow.show();
  });
  chartWindow.on('move', (event) => {
    console.log("window moved", chartWindow.getPosition());
    const position = chartWindow.getPosition();
    positionInfo.chart.x = position[0];
    positionInfo.chart.y = position[1];
    console.log("window moved", chartWindow.getSize());
    const size = chartWindow.getSize();
    positionInfo.chart.width = size[0];
    positionInfo.chart.height = size[1];
  });
  chartWindow.webContents.openDevTools();

  tableWindow = new BrowserWindow(positionInfo.table);
  tableWindow.loadURL(path.join('file:///', __dirname, 'table.html'));
  tableWindow.on('ready-to-show', () => {
    tableWindow.show();
  });
  tableWindow.on('move', (event) => {
    console.log("window moved", tableWindow.getPosition());
    const position = tableWindow.getPosition();
    positionInfo.table.x = position[0];
    positionInfo.table.y = position[1];
    console.log("window moved", tableWindow.getSize());
    const size = tableWindow.getSize();
    positionInfo.table.width = size[0];
    positionInfo.table.height = size[1];
  });
  // tableWindow.webContents.openDevTools();

  ipcMain.on('chart-date-update', (event, props) => {
    console.log("chart UPdated");
    tableWindow.webContents.send('main-chart-date-update', { data: props.data });
  });

  setMainMenu({ onSaveLayout });
});