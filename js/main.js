/*
** file: js/main.js
** description: javascript code for "html/main.html" page
*/

var syncRules;

function init_main() {
    //get the current enabled state and rule list
    chrome.storage.local.get('nyanizeStatus', function (data) {
        if (typeof data.nyanizeStatus === "undefined") {
            //this is first use; enable by default and save
            chrome.storage.local.set({
                "nyanizeStatus": 1
            });
            var isEnabled = 1;
        }
        else {
            var isEnabled = parseInt(data.nyanizeStatus);
        }

        //make the switch reflect our current state
        if (isEnabled) {
            $('#nyanizeStatus').bootstrapSwitch('state', true);
        }
        else {
            $('#nyanizeStatus').bootstrapSwitch('state', false);
        }
    });

    chrome.storage.local.get('UpperCase', function (data) {
        if (typeof data.UpperCase === "undefined") {
            //this is first use; enable by default and save
            chrome.storage.local.set({
                "UpperCase": 1
            });
            var isEnabled = 1;
        }
        else {
            var isEnabled = parseInt(data.UpperCase);
        }

        //make the switch reflect our current state
        if (isEnabled) {
            $('#UpperCase').bootstrapSwitch('state', true);
        }
        else {
            $('#UpperCase').bootstrapSwitch('state', false);
        }
    });

    //init our switch
    $('#nyanizeStatus').bootstrapSwitch();

    $('#UpperCase').bootstrapSwitch();

    //show the menu
    $('html').hide().fadeIn('slow');
}

//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_main);

//handle enabling or disabling or the extension
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

$('#UpperCase').on('switchChange.bootstrapSwitch', function (event, state) {
    if (state) {
        chrome.storage.local.set({
            "UpperCase": 1
        });
    }
    else {
        chrome.storage.local.set({
            "UpperCase": 0
        });
    }
});