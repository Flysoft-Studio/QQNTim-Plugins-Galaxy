const path = require("path");
const s = path.sep;

module.exports.default = class Entry {
	onWindowLoaded() {
		const wallpaperFile = process.env["QQ_WALLPAPER_FILE"];
		if (wallpaperFile) {
			const wallpaperURL = encodeURI(
				`file://${wallpaperFile.replaceAll(s, "/")}`,
			);
			console.log(`[Wallpaper] 加载壁纸： ${wallpaperURL}`);
			document.body.style.setProperty(
				"background-image",
				`url(${wallpaperURL})`,
				"important",
			);
		}
	}
};
