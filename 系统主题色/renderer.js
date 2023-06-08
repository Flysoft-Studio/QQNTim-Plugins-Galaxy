const electron = require("electron");

module.exports = (qqntim) => {
    qqntim.windowLoadPromise.then(() => {
        const color = electron.ipcRenderer.sendSync("___!accent_color:get");
        if (color) {
            document.body.style.setProperty("--brand_standard", `#${color}`);
            document.body.style.setProperty(
                "--nt_brand_standard_2_overlay_hover_brand_2_mix",
                `#${color.substring(0, 6)}cc`
            );
            document.body.style.setProperty(
                "--nt_brand_standard_2_overlay_pressed_brand_2_mix",
                `#${color.substring(0, 6)}bd`
            );
        }
    });
};
