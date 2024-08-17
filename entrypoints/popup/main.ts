import './../../css/bootstrap.min.css';
import './../../css/bootstrap-switch.min.css';
import './../../css/main.css';

import $ from 'jquery';

async function init_main() {
  $('html').hide();

  let isEnyabled = 1;
  //get the current enyabled state and rule list
  const data = await browser.storage.local.get('nyanizeStatus');
  

  console.log(data)
  //   if (typeof data.nyanizeStatus !== "undefined") {
  //     isEnyabled = parseInt(data.nyanizeStatus);
  //   }
  //   //make the switch reflect our current state
  //   if (isEnyabled == 1) {
  //     $('#nyanizeStatus').bootstrapSwitch('state', true);
  //     $('#ultimatenyanizeStatus').bootstrapSwitch('state', false);
  //   } else if (isEnyabled == 2) {
  //     $('#nyanizeStatus').bootstrapSwitch('state', true);
  //     $('#ultimatenyanizeStatus').bootstrapSwitch('state', true);
  //   } else {
  //     $('#nyanizeStatus').bootstrapSwitch('state', false);
  //     $('#ultimatenyanizeStatus').bootstrapSwitch('state', false);
  //   }
  
  // //init our switch
  // $('#nyanizeStatus').bootstrapSwitch();
  // $('#ultimatenyanizeStatus').bootstrapSwitch();

  //show the menu
  
  $('html').fadeIn('slow');
}

//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_main);

// //handle enyabling or disabling or the extension
// $('#nyanizeStatus').on('switchChange.bootstrapSwitch', function (event, state) {
//   if (state) {
//     browser.storage.local.set({
//       "nyanizeStatus": 1
//     });
//   } else {
//     $('#ultimatenyanizeStatus').bootstrapSwitch('state', false);
//     browser.storage.local.set({
//       "nyanizeStatus": 0
//     });
//   }
// });

// $('#ultimatenyanizeStatus').on('switchChange.bootstrapSwitch', function (event, state) {
//   if (state) {
//     $('#nyanizeStatus').bootstrapSwitch('state', true);
//     browser.storage.local.set({
//       "nyanizeStatus": 2
//     });
//   } else {
//     browser.storage.local.set({
//       "nyanizeStatus": 1
//     });
//   }
// });