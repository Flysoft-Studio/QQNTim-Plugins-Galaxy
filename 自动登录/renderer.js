module.exports = (qqntim) => {
    qqntim.windowLoadPromise.then(() => {
        let observer = new MutationObserver(() => {
            const loginBtnText = document.querySelector(
                ".auto-login>.q-button.q-button--primary.q-button--default>span"
            );
            if (!loginBtnText) return;
            observer.disconnect();
            const loginBtnTextOld = loginBtnText.innerText;

            let second = 3;
            const updateText = () => {
                loginBtnText.innerText = `${second} 秒后登录，按 Esc 取消`;
            };
            updateText();
            const timer = setInterval(() => {
                second--;

                updateText();

                if (second <= 0) {
                    clearInterval(timer);
                    const loginBtn = document.querySelector(
                        ".auto-login>.q-button.q-button--primary.q-button--default"
                    );
                    loginBtn && loginBtn.click();
                }
            }, 1000);

            window.addEventListener("keydown", (event) => {
                console.log(event.code);
                if (event.code == "Escape") {
                    clearInterval(timer);
                    loginBtnText.innerText = loginBtnTextOld;
                }
            });
        });
        observer.observe(document.body, { subtree: true, childList: true });
    });
};
