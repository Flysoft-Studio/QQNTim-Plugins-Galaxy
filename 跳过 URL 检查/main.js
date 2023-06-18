module.exports = (qqntim) => {
    qqntim.interrupt.ipc(
        (args, _channel, sender) => {
            const urls = args[1][1]?.checkUrlInfo?.urls || [];

            sender.send(
                "IPC_DOWN_2",
                {
                    callbackId: args[0].callbackId,
                    promiseStatue: "full",
                    type: "response",
                    eventName: "ns-ntApi-2",
                },
                {
                    result: 0,
                    errMsg: "",
                    checkUrlsResult: urls.map((url) => {
                        return {
                            url: url,
                            result: 0,
                            jumpResult: 15,
                            jumpUrl: url,
                        };
                    }),
                }
            );

            console.log("[SkipURLCheck] 已修正此链接列表：", urls);

            return false;
        },
        {
            type: "request",
            eventName: "ns-ntApi-2",
            cmdName: "nodeIKernelMsgService/checkMsgWithUrl",
            direction: "in",
        }
    );
};
