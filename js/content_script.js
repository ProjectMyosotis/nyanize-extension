let nyanizeStatus = 1;
chrome.storage.local.get(null, function (data) {
    if (typeof data.nyanizeStatus !== "undefined") {
        nyanizeStatus = parseInt(data.nyanizeStatus);
    }
    if (nyanizeStatus != 0) {
        walk(document.body);
        new MutationObserver(function (mutationRecords) {
            for(const record of mutationRecords) {
                for(const node of record.addedNodes) {
                    walk(node)
                }
            }
        }).observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});

function walk(node) {
    switch (node.nodeType) {
        case 1:  // Element
            // ignore special node
            if(["SCRIPT", "CODE"].includes(node.nodeName)) {
                break;
            }
        case 9:  // Document
        case 11: // Document fragment
            let child = node.firstChild;
            while (child) {
                walk(child);
                child = child.nextSibling;
            }
            break;

        case 3: // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    let v = textNode.nodeValue;
    if (nyanizeStatus === 2) {
        v = v.replace(/[ぁ-ん]/g, "にゃ");
        v = v.replace(/[ァ-ン]/g, "ニャ");
        v = v.replace(/[ｧ-ﾝﾞﾟ]/g, "ﾆｬ");
        v = v.replace(/[一-龥]/g, "にゃ");
        v = v.replace(/[a-z]/g, "nya");
        v = v.replace(/[A-Z]/g, "NYA");
    } else {
        v = v.replace(/な/g, "にゃ");
        v = v.replace(/ナ/g, "ニャ");
        v = v.replace(/ﾅ/g, "ﾆｬ");
        v = v.replace(/na/g, "nya");
        v = v.replace(/Na/g, "Nya");
        v = v.replace(/nA/g, "nyA");
        v = v.replace(/NA/g, "NYA");
    }
    if(textNode.nodeValue !== v){
        textNode.nodeValue = v;
    }
}
