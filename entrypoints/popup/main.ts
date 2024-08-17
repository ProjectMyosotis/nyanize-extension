import "./style.scss";

import $ from "jquery";

async function init_main() {
  let isEnyabled = 1;
  //get the current enyabled state and rule list
  const data = await browser.storage.local.get("nyanizeStatus");

  console.log(data);
  if (typeof data.nyanizeStatus !== "undefined") {
    isEnyabled = parseInt(data.nyanizeStatus);
  }
  //make the switch reflect our current state
  if (isEnyabled == 1) {
    $("#nyanizeStatus").prop("checked", true);
    $("#ultimatenyanizeStatus").prop("checked", false);
  } else if (isEnyabled == 2) {
    $("#nyanizeStatus").prop("checked", true);
    $("#ultimatenyanizeStatus").prop("checked", true);
  } else {
    $("#nyanizeStatus").prop("checked", false);
    $("#ultimatenyanizeStatus").prop("checked", false);
  }

  setupEventHandler();

  //show the menu

  $("html").fadeIn("slow");
}

function setupEventHandler() {
  //handle enyabling or disabling or the extension
  $<HTMLInputElement>("#nyanizeStatus").on("change", function (event) {
    if (this.checked) {
      browser.storage.local.set({
        nyanizeStatus: 1,
      });
    } else {
      $("#ultimatenyanizeStatus").prop("checked", false);
      browser.storage.local.set({
        nyanizeStatus: 0,
      });
    }
  });

  $<HTMLInputElement>("#ultimatenyanizeStatus").on("change", function (event) {
    if (this.checked) {
      $("#nyanizeStatus").prop("checked", true);
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
