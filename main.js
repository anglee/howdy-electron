const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { setMainMenu } = require('./mainMenu');
const fs = require('fs');

let controllerWindow;
let viewerWindow;
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
  setMainMenu({ onSaveLayout });
});