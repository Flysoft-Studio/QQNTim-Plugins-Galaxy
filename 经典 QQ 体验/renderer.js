const patchedFlag = "legacy-qq-experience-patched-flag";

module.exports = (qqntim) => {
    const useRecentContactSize = () => {
        qqntim.window.setMinimumSize(300, 600);
        qqntim.window.setSize(300, 600);
    };
    const useContactSize = () => {
        qqntim.window.setMinimumSize(800, 500);
        qqntim.window.setSize(800, 500);
    };

    useRecentContactSize();

    qqntim.windowLoadPromise.then(() => {
        const watchNavFirstTab = () => {
            qqntim.utils
                .waitForElement(`.sidebar__nav .nav-item:nth-child(1) .svg-highlight`)
                .then(() => {
                    useRecentContactSize();
                    setTimeout(watchNavFirstTab, 0);
                });
        };
        const watchNavOtherTab = () => {
            qqntim.utils
                .waitForElement(
                    `.sidebar__nav .nav-item:not(:nth-child(1)) .svg-highlight`
                )
                .then(() => {
                    useContactSize();
                    setTimeout(watchNavOtherTab, 0);
                });
        };
        const patchRecentContact = () => {
            qqntim.utils
                .waitForElement(
                    `.recent-contact .viewport-list .viewport-list__inner:not(.${patchedFlag})`
                )
                .then((list) => {
                    setTimeout(patchRecentContact, 0);
                    if (list.classList.contains(patchedFlag)) return;
                    list.classList.add(patchedFlag);
                    let observer = new MutationObserver(() => {
                        for (const child of list.children) {
                            if (child.classList.contains(patchedFlag)) continue;
                            child.classList.add(patchedFlag);
                            const container = child.children.item(0);
                            if (container)
                                container.addEventListener("mousedown", (event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    event.stopImmediatePropagation();
                                    const dblclickEvent = new MouseEvent("dblclick", {
                                        view: window,
                                        bubbles: true,
                                        cancelable: true,
                                    });
                                    child.dispatchEvent(dblclickEvent);
                                });
                        }
                    });
                    observer.observe(list, { childList: true });
                });
        };

        patchRecentContact();
        watchNavFirstTab();
        watchNavOtherTab();
    });
};
