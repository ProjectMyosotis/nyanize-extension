chrome.storage.local.get(null, function (data) {
	if (typeof data.nyanizeStatus === 'undefined') {
		chrome.storage.local.set({
			nyanizeStatus: 1
		});
		walk(document.body);
		new MutationObserver(function () {
			walk(document.body);
		}).observe(document.body, {
			childList: true,
			subtree: true
		});
	} else {
		if (parseInt(data.nyanizeStatus)) {
			walk(document.body);
			new MutationObserver(function () {
				walk(document.body);
			}).observe(document.body, {
				childList: true,
				subtree: true
			});
		}
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
	var v = textNode.nodeValue;

	v = v.replace(/な/g, "にゃ");
	v = v.replace(/ナ/g, "ニャ");
	v = v.replace(/ﾅ/g, "ﾆｬ");
	v = v.replace(/na/g, "nya");
	v = v.replace(/Na/g, "Nya");
	v = v.replace(/nA/g, "nyA");
	v = v.replace(/NA/g, "NYA");

	if(textNode.nodeValue !== v){
		textNode.nodeValue = v;
	}
}
