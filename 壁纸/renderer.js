const path = require("path");

const s = path.sep;

module.exports = (qqntim) => {
    qqntim.windowLoadPromise.then(() => {
        const wallpaperFile = process.env["QQ_WALLPAPER_FILE"];
        if (wallpaperFile) {
            const wallpaperURL = encodeURI(`file://${wallpaperFile.replaceAll(s, "/")}`);
            console.log(`[Wallpaper] 加载壁纸： ${wallpaperURL}`);
            document.body.style.backgroundImage = `url(${wallpaperURL})`;
        }
    });
};
