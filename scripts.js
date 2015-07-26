$( document ).ready(function() {

    'use strict';

    var display = '0';
    var maxLength = 9;
    var hasDot = false;
    var readyForNext = true;
    var stack = [];

    var operations = {
        plus: function(a,b) { return a + b; },
        minus: function(a,b) { return a - b; },
        times: function(a,b) { return a * b; },
        divide: function(a,b) { return (b === 0) ? "Error" : a / b; },
        pct: function(a,b) { return a * b / 100; },
    }

    function updateDisplay(val) {
        display = val;
        $( '#display' ).html('').html(display);
    }

    function appendToDisplay(val) {
        var currentVal = $.trim($( '#display' ).text());
        if (currentVal.length >= maxLength) {
            return;
        }
        console.log(currentVal, val);
        if (currentVal === '0' && val !== '.' && hasDot === false) {
            updateDisplay(val);
        } else {
            updateDisplay(currentVal + val.toString());
        }
    }

    function trimToMax(val) {
        if (val.toString().length <= maxLength) {
            return val;
        }
        console.log(val);
        var parts = val.toString().split('.');
        console.log(parts);
        if (parts[0].length > maxLength) {
            return "Error";
        } else {
            return myRound(Number(val), maxLength - parts[0].length);
        }
    }

    function myRound(num, decimals) {
        var factor = Math.pow(10, decimals);
        return Math.round(factor * num) / factor;
    }

    function evalStack() {
        if (stack.length < 3) {
            return;
        }
        console.log(stack);
        var arg1 = Number(stack.shift());
        var op = stack.shift();
        var arg2 = Number(stack.shift());
        var ans = operations[op](arg1, arg2);
        stack.unshift(ans);
        updateDisplay(trimToMax(ans));
    }

    $( '#key-plus' ).click(function()  {
        stack.push($( '#display' ).text());
        evalStack();
        stack.push('plus');
        readyForNext = true;
    });

    $( '#key-minus' ).click(function()  {
        stack.push($( '#display' ).text());
        evalStack();
        stack.push('minus');
        readyForNext = true;
    });

    $( '#key-times' ).click(function()  {
        stack.push($( '#display' ).text());
        evalStack();
        stack.push('times');
        readyForNext = true;
    });

    $( '#key-divide' ).click(function()  {
        stack.push($( '#display' ).text());
        evalStack();
        stack.push('divide');
        readyForNext = true;
    });

    $( '#key-pct' ).click(function()  {
        stack.push($( '#display' ).text());
        evalStack();
        stack.push('pct');
        readyForNext = true;
    });

    $( '#key-equal' ).click(function()  {
        stack.push($( '#display' ).text());
        evalStack();
        readyForNext = true;
    });

    $( '#key-ac' ).click(function()  {
        hasDot = false;
        stack = [];
        updateDisplay(0);
    });

    $( '#key-ce' ).click(function()  {
        hasDot = false;
        updateDisplay(0);
    });

    function numeral(val) {
        if (readyForNext) {
            hasDot = false;
            updateDisplay(val);
            readyForNext = false;
        } else {
            appendToDisplay(val);
        }
    }

    $( '#key-0' ).click(function() { numeral(0); });
    $( '#key-1' ).click(function() { numeral(1); });
    $( '#key-2' ).click(function() { numeral(2); });
    $( '#key-3' ).click(function() { numeral(3); });
    $( '#key-4' ).click(function() { numeral(4); });
    $( '#key-5' ).click(function() { numeral(5); });
    $( '#key-6' ).click(function() { numeral(6); });
    $( '#key-7' ).click(function() { numeral(7); });
    $( '#key-8' ).click(function() { numeral(8); });
    $( '#key-9' ).click(function() { numeral(9); });

    $( '#key-dot' ).click(function()  {
        if (hasDot) {
            return;
        }
        hasDot = true;
        appendToDisplay('.');
    });

});
