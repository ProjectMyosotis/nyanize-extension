import "./style.scss";

async function init_main() {
  let isEnyabled = 1;
  //get the current enyabled state and rule list
  const data = await browser.storage.local.get("nyanizeStatus");

  console.log(data);
  if (typeof data.nyanizeStatus !== "undefined") {
    isEnyabled = parseInt(data.nyanizeStatus);
  }
  //make the switch reflect our current state
  const nyanizeStatus = document.getElementById(
    "nyanizeStatus",
  ) as HTMLInputElement;
  const ultimatenyanizeStatus = document.getElementById(
    "ultimatenyanizeStatus",
  ) as HTMLInputElement;

  if (isEnyabled === 1) {
    nyanizeStatus.checked = true;
    ultimatenyanizeStatus.checked = false;
  } else if (isEnyabled === 2) {
    nyanizeStatus.checked = true;
    ultimatenyanizeStatus.checked = true;
  } else {
    nyanizeStatus.checked = false;
    ultimatenyanizeStatus.checked = false;
  }

  setupEventHandler();

  //show the menu with fade-in effect
  document.documentElement.style.transition = "opacity 1s";
  setTimeout(() => {
    document.documentElement.style.opacity = "1";
  }, 0);
}

function setupEventHandler() {
  const nyanizeStatus = document.getElementById(
    "nyanizeStatus",
  ) as HTMLInputElement;
  const ultimatenyanizeStatus = document.getElementById(
    "ultimatenyanizeStatus",
  ) as HTMLInputElement;

  //handle enyabling or disabling or the extension
  nyanizeStatus.addEventListener("change", function (event) {
    if (this.checked) {
      browser.storage.local.set({
        nyanizeStatus: 1,
      });
    } else {
      ultimatenyanizeStatus.checked = false;
      browser.storage.local.set({
        nyanizeStatus: 0,
      });
    }
  });

  ultimatenyanizeStatus.addEventListener("change", function (event) {
    if (this.checked) {
      nyanizeStatus.checked = true;
      browser.storage.local.set({
        nyanizeStatus: 2,
      });
    } else {
      browser.storage.local.set({
        nyanizeStatus: 1,
      });
    }
  });
}

//bind events to dom elements
document.addEventListener("DOMContentLoaded", init_main);
