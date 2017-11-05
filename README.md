Findings
* require package like 'lodash' works in the renderer process.
* You can use fetch() to make http calls in renderer process.
* You can use win.getPosition() to get position
* You can use pass parameter to specify x,y,w,h when creating a BrowserWindow:
```javascript
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    x: 0,
    y: 100,
  });
```
