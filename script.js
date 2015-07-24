$(document).ready(function() {

    'use strict';

    var display = '0';
    var maxLength = 9;
    var hasDot = false;
    var readyForNext = false;
    var stack = [];

    function updateDisplay(val) {
        display = val;
        $( '#display-val' ).html('').html(display);
    }

    function appendToDisplay(val) {
        var currentVal = $( '#display-val' ).val();
        if (currentVal.length >= maxLength) {
            return;
        }
        if (val === '.') {
            if (hasDot) {
                return;
            } else {
                hasDot = true;
                updateDisplay(currentVal + val);
            }
        }
        if (currentVal === '0') {
                updateDisplay(val);
            } else {
                updateDisplay(currentVal + val.toString());
            }
        }
    }

    $( '#key-ac' ).click(function(event)  {
        stack = [];
        updateDisplay(0);
    });

    $( '#key-ce' ).click(function(event)  {
        var val = $( '#display-val' ).val();
        if (val == '0') {
            return;
        } else if (val.length === 1) {
            updateDisplay(0);
        } else {
            updateDisplay(val.slice(0, val.length - 1));
        }
    });

    $( '#key-pct' ).click(function(event)  {
        stack.push($( '#display-val' ).val());
        stack.push('pct');
    });

    $( '#key-divide' ).click(function(event)  {
        stack.push($( '#display-val' ).val());
        stack.push('pct');
    });

    $( '#key-7' ).click(function(event)  {
        appendToDisplay('7');
    });

    $( '#key-8' ).click(function(event)  {
         appendToDisplay('8');
   });

    $( '#key-9' ).click(function(event)  {
        appendToDisplay('9');
    });

    $( '#key-times' ).click(function(event)  {
        stack.push($( '#display-val' ).val());
        stack.push('pct');
    });

    $( '#key-4' ).click(function(event)  {
        appendToDisplay('4');
    });

    $( '#key-5' ).click(function(event)  {
        appendToDisplay('5');
    });

    $( '#key-6' ).click(function(event)  {
        appendToDisplay('6');
    });

    $( '#key-minus' ).click(function(event)  {
        stack.push($( '#display-val' ).val());
        stack.push('pct');
    });

    $( '#key-1' ).click(function(event)  {
        appendToDisplay('1');
    });

    $( '#key-2' ).click(function(event)  {
        appendToDisplay('2');
    });

    $( '#key-3' ).click(function(event)  {
        appendToDisplay('3');
    });

    $( '#key-plus' ).click(function(event)  {
        stack.push($( '#display-val' ).val());
        stack.push('pct');
    });

    $( '#key-0' ).click(function(event)  {
        appendToDisplay('0');
    });

    $( '#key-dot' ).click(function(event)  {
        appendToDisplay('.');
    });

    $( '#key-equal' ).click(function(event)  {
    });

});
