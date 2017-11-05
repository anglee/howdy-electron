const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;
let viewerWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    x: 0,
    y: 100,
  });
  mainWindow.loadURL(path.join('file:///', __dirname, 'controller.html'));

  mainWindow.on('move', (event) => {
    console.log("window moved", mainWindow.getPosition());
  });

  viewerWindow = new BrowserWindow({
    width: 400,
    height: 300,
    x: 450,
    y: 100,
  });

  viewerWindow.loadURL(path.join('file:///', __dirname, 'viewer.html'));
  viewerWindow.on('move', (event) => {
    console.log("window moved", viewerWindow.getPosition());
  });

  ipcMain.on('controller-toggle-odd', (event, props) => {
    console.log("toggle odd", props.checked);
    viewerWindow.webContents.send('main-toggle-odd', { checked: props.checked });
  });
  ipcMain.on('controller-toggle-even', (event, props) => {
    console.log("toggle odd", props.checked);
    viewerWindow.webContents.send('main-toggle-even', { checked: props.checked });
  });
});