/*
** file: js/main.js
** description: javascript code for "html/main.html" page
*/

var syncRules;

function init_main() {
    //get the current enyabled state and rule list
    chrome.storage.local.get('nyanizeStatus', function (data) {
        if (typeof data.nyanizeStatus === "undefined") {
            //this is first use; enyable by default and save
            chrome.storage.local.set({
                "nyanizeStatus": 1
            });
            var isEnyabled = 1;
        }
        else {
            var isEnyabled = parseInt(data.nyanizeStatus);
        }

        //make the switch reflect our current state
        if (isEnyabled) {
            $('#nyanizeStatus').bootstrapSwitch('state', true);
        }
        else {
            $('#nyanizeStatus').bootstrapSwitch('state', false);
        }
    });
    chrome.storage.local.get('ultimatenyanizeStatus', function (data) {
        if (typeof data.ultimatenyanizeStatus === "undefined") {
            //this is first use; enyable by default and save
            chrome.storage.local.set({
                "ultimatenyanizeStatus": 1
            });
            var isEnyabled = 1;
        }
        else {
            var isEnyabled = parseInt(data.ultimatenyanizeStatus);
        }

        //make the switch reflect our current state
        if (isEnyabled) {
            $('#ultimatenyanizeStatus').bootstrapSwitch('state', true);
        }
        else {
            $('#ultimatenyanizeStatus').bootstrapSwitch('state', false);
        }
    });

    //init our switch
    $('#nyanizeStatus').bootstrapSwitch();
    $('#ultimatenyanizeStatus').bootstrapSwitch();

    //show the menu
    $('html').hide().fadeIn('slow');
}

//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_main);

//handle enyabling or disabling or the extension
$('#nyanizeStatus').on('switchChange.bootstrapSwitch', function (event, state) {
    if (state) {
        chrome.storage.local.set({
            "nyanizeStatus": 1
        });
    }
    else {
        chrome.storage.local.set({
            "nyanizeStatus": 0
        });
    }
});

$('#ultimatenyanizeStatus').on('switchChange.bootstrapSwitch', function (event, state) {
    if (state) {
        chrome.storage.local.set({
            "ultimatenyanizeStatus": 1
        });
    }
    else {
        chrome.storage.local.set({
            "ultimatenyanizeStatus": 0
        });
    }
});