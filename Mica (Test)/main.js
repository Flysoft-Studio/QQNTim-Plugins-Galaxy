const electron = require("electron");
const path = require("path");
const { spawnSync } = require("child_process");

const s = path.sep;

const DWM_SYSTEMBACKDROP_TYPE = {
    DWMSBT_AUTO: 0,
    DWMSBT_NONE: 1,
    DWMSBT_MAINWINDOW: 2, // Mica
    DWMSBT_TRANSIENTWINDOW: 3, // Acrylic
    DWMSBT_TABBEDWINDOW: 4, // Tabbed
};
const flag = DWM_SYSTEMBACKDROP_TYPE.DWMSBT_MAINWINDOW;

module.exports = (qqntim) => {
    electron.app.commandLine.appendSwitch("enable-transparent-visuals");
    qqntim.interrupt.windowCreation((args) => {
        return {
            ...args,
            frame: true,
            backgroundColor: "#00000000",
            autoHideMenuBar: true,
            height: args.height && args.height + 28,
        };
    });
    electron.ipcMain.on("___!mica:try_load", (event) => {
        event.sender.send("___!mica:load");
    });
    electron.ipcMain.on("___!mica:set_theme", (_, theme) => {
        electron.nativeTheme.themeSource = theme;
    });
    electron.ipcMain.on("___!mica:enable", (event) => {
        const win = electron.BrowserWindow.fromWebContents(event.sender);
        const handle = win.getNativeWindowHandle().readUint32LE();
        console.log(`[Mica] 尝试为窗口 ${handle} 设置背景材料，标志=${flag}`);
        const helper = spawnSync(`${__dirname}${s}electron_helper.exe`, [
            "set_window_backdrop",
            handle.toString(),
            flag.toString(),
        ]);
        console.log(
            `[Mica] 设置${helper.status == 0 ? `成功` : `失败`}，状态码=${helper.status}`
        );
    });
};
