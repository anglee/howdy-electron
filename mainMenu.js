const { app, Menu } = require('electron');

module.exports = {
  setMainMenu
};

function setMainMenu({
  onSaveLayout
}) {
  const template = [
    {
      label: app.getName(),
      submenu: [
        {
          label: `Quit ${app.getName()}`,
          accelerator: `CmdOrCtrl+Q`,
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: `Save layout`,
          click() {
            console.log('Save layout');
            onSaveLayout();
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}