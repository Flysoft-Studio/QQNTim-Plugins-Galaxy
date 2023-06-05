const electron = require("electron");

module.exports = (qqntim) => {
    qqntim.onLoad(() => {
        electron.ipcRenderer.send("___!mica:try_load");
        electron.ipcRenderer.on("___!mica:load", () => {
            electron.ipcRenderer.send("___!mica:enable");
            qqntim.utils.waitForElement('[q-theme="light"]').then(() => {
                electron.ipcRenderer.send("___!mica:set_theme", "light");
            });
            qqntim.utils.waitForElement('[q-theme="dark"]').then(() => {
                electron.ipcRenderer.send("___!mica:set_theme", "dark");
            });
        });
    });
};
