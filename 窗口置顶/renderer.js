const electron = require("electron");

module.exports = (qqntim) => {
    qqntim.onLoad(() => {
        qqntim.utils.waitForElement(".window-control-area").then((container) => {
            const topmost = document.createElement("div");
            topmost.innerHTML = `<i class="q-icon" style="width:16px;height:16px;align-items:center;color:var(--icon_primary);display:inline-flex;justify-content:center;"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6.0001L8.00004 10L4 6" stroke="currentColor" stroke-linejoin="round" style="transform:rotateZ(180deg);transform-origin:center;"></path></svg></i>`;
            topmost.addEventListener("click", () => {
                electron.ipcRenderer.send("___!topmost:toggle");
            });
            container.insertBefore(topmost, container.firstElementChild);
        });
    });
};
