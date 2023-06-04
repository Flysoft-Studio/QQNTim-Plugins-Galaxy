const electron = require("electron");

module.exports = () => {
    electron.ipcMain.on("___!topmost:toggle", (event) => {
        const win = electron.BrowserWindow.fromWebContents(event.sender);
        win.setAlwaysOnTop(!win.isAlwaysOnTop());
    });
};
