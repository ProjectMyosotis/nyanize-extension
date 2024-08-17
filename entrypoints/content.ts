export default defineContentScript({
  matches: ["*://*/*"],
  runAt: "document_end",
  main() {
    nyanize();
  }
})

let nyanizeStatus = 1;


async function nyanize() {
  await initConfigs();

  if (nyanizeStatus === 0) {
    return;
  }

  walk(document.body);

  const observer = new MutationObserver((mutationRecords) => {
    for (const record of mutationRecords) {
      for (const node of record.addedNodes) {
        walk(node);
      }
    }


  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    // characterData: true
  });
}

async function initConfigs() {
  const data = await browser.storage.local.get(null);
  if (typeof data.nyanizeStatus !== "undefined") {
    nyanizeStatus = parseInt(data.nyanizeStatus);
  }
}

function walk(node: Node) {
  switch (node.nodeType) {
    case 1:  // Element
      // ignore special node
      if (["SCRIPT", "CODE"].includes(node.nodeName)) {
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
      handleText(node as Text);
      break;
  }
}

function handleText(textNode: Text) {
  let v = textNode.nodeValue;
  if (v === null) {
    console.error("textNode.nodeValue is null");
    return;
  }
  if (nyanizeStatus === 2) {
    v = v.replace(/にゃ/g, "な"); // temporary reverse
    v = v.replace(/[ぁ-ん]/g, "にゃ");
    v = v.replace(/ニャ/g, "ナ"); // temporary reverse
    v = v.replace(/[ァ-ン]/g, "ニャ");
    v=  v.replace(/ﾆｬ/g, "ﾅ"); // temporary reverse
    v = v.replace(/[ｧ-ﾝﾞﾟ]/g, "ﾆｬ");
    v = v.replace(/[一-龥]/g, "にゃ");
    v = v.replace(/nya/g, "n"); // temporary reverse
    v = v.replace(/[a-z]/g, "nya");
    v = v.replace(/NYA/g, "N"); // temporary reverse
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
  if (textNode.nodeValue !== v) {
    textNode.nodeValue = v;
  }
}
