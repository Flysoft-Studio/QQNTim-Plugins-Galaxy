const electron = require("electron");

module.exports = () => {
    electron.ipcMain.on("___!accent_color:get", (event) => {
        try {
            event.returnValue = electron.systemPreferences.getAccentColor();
        } catch (_) {
            event.returnValue = null;
        }
    });
};
