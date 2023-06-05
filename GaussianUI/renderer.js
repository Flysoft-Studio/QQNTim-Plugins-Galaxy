module.exports = (qqntim) => {
    qqntim.onLoad(() => {
        console.log("Hello world!");
        let wallpaperURL = process.env["QQ_BACKGROUND_IMG"];
        wallpaperURL &&
            (document.body.style.backgroundImage = `url(${encodeURI(
                `file://${wallpaperURL}`
            )})`);
    });
};
