const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    x: 0,
    y: 100,
  });
  mainWindow.loadURL(path.join('file:///', __dirname, 'main.html'));

  mainWindow.on('move', (event) => {
    console.log("window moved", mainWindow.getPosition());
  })
});