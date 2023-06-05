const electron = require("electron");
const path = require("path");
const os = require("os");
const semver = require("semver");
const { spawnSync } = require("child_process");

const s = path.sep;

module.exports = (qqntim) => {
    if (process.platform != "win32" || !semver.lte("10.0.22621", os.release())) {
        console.error(
            `[Mica] 系统级背景材质不可用。该插件只支持 Windows 11 22621 及以上版本的操作系统。`
        );
        return;
    }
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
        let handle = win.getNativeWindowHandle().readUint32LE();
        console.log(`[Mica] 尝试为窗口 ${handle} 设置背景材料。`);
        spawnSync(`${__dirname}${s}electron_helper.exe`, [
            "set_window_backdrop",
            handle.toString(),
            (3).toString(),
        ]);
    });
};
