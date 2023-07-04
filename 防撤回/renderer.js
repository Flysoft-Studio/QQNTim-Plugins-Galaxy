module.exports = (qqntim) => {
    qqntim.interrupt.ipc(
        (args) => {
            for (const msg of args[1][0].payload.msgList) {
                if (
                    msg.elements[0] &&
                    msg.elements[0].grayTipElement?.revokeElement &&
                    !msg.elements[0].grayTipElement.revokeElement.isSelfOperate
                ) {
                    // Rewrite revoke element to new message.
                    args[1][0].cmdName = "nodeIKernelMsgListener/onRecvMsg";
                    msg.msgId = (Math.random() * 20).toString();
                    console.log("[ShowRevokedMessages] 已修正一条被撤回的消息", msg);
                    break;
                }
            }

            return false;
        },
        {
            type: "request",
            eventName: "ns-ntApi-2",
            cmdName: "nodeIKernelMsgListener/onMsgInfoListUpdate",
            direction: "in",
        }
    );
};
