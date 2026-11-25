const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    title: 'IDERRARA – Logo Marcas',
    backgroundColor: "#071542",
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'IDERRARA.html'));
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
