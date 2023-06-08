module.exports = (qqntim) => {
    qqntim.windowLoadPromise.then(() => {
        let wallpaperURL = process.env["QQ_WALLPAPER_FILE"];
        if (wallpaperURL) {
            console.log(`[Wallpaper] 加载壁纸： ${wallpaperURL}`);
            document.body.style.backgroundImage = `url(${encodeURI(
                `file://${wallpaperURL}`
            )})`;
        }
    });
};
