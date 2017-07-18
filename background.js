chrome.webRequest.onHeadersReceived.addListener(
    function(info) {

        function checkHeader(header) {
            var headers_to_remove = [
                "x-frame-options",
                "frame-options",
                "frame-ancestors",
                "content-security-policy"
            ]

            return headers_to_remove.includes(header);
        }

        var headers = info.responseHeaders;
        for (var i=headers.length-1; i>=0; --i) {
            var header = headers[i].name.toLowerCase();
            if (checkHeader(header)) {
                headers.splice(i, 1); // Remove header
            }
        }
        return {responseHeaders: headers};
    },
    {
        urls: [ '*://*/*' ], // Pattern to match all http(s) pages
        types: [ 'sub_frame' ]
    },
    ['blocking', 'responseHeaders']
);