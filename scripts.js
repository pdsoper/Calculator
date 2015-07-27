$( document ).ready(function() {

    'use strict';

    var display = '0';
    var maxLength = 9;
    var hasDot = false;
    var readyForNext = true;
    var stack = [];

    var operations = {
        plus:   function(a,b) { return a + b; },
        minus:  function(a,b) { return a - b; },
        times:  function(a,b) { return a * b; },
        divide: function(a,b) { return (b === 0) ? "Error" : a / b; },
        pct:    function(a,b) { return a * b / 100; },
    };

    /* Calculator logic */

    /*
    √ CE clears the current entry without changing the stored value or operator
    √ AC clears everything
    √ Pressing a number
        adds the digit to the displayed value in input mode
        starts a new value if the last key was an operator or equal or AV or CE
            This is determined by readyForNext
    √ Pressing .
        does nothing in input mode if the numnber already contains a .
        otherwise, it acts like a digit.
    Pressing an operator key
        If the previous pressed key was an oerator, it replaces it
        If there is a pending operation, it performs it
        it stores the current value, and the name of the operator
    Pressing the = keuy
        Evaluates the pending operation, if any
        If pressed right after an operator, it clears that operator.
        If the number in the display has not been editted, still use it in the evaluations.
    */

    function evalStack(val) {
        readyForNext = true;
        hasDot = false;
        if (!readyForEval()) {
            stack = [val];
            updateDisplay(trimToMax(val));
            return;
        }
        var arg1 = Number(stack[0]);
        var op = stack[1];
        var arg2 = Number(val);
        var ans = operations[op](arg1, arg2);
        stack = [ans];
        updateDisplay(trimToMax(ans));
    }

    function readyForEval() {
        if (stack.length < 2) {
            return false;
        }
        return ( !isNaN(Number(stack[0])) &&
            Object.getOwnPropertyNames(operations).indexOf(stack[1]) > -1 );
    }

    function replaceOperator(val) {
        if (readyForNext && stack.length === 2) {
            stack[1] = val;
            return true;
        }
        return false;
    }

    /* Event handlers */

    $( '#key-plus' ).click(function()  {
        if (replaceOperator('plus')) {
            return;
        }
        evalStack($( '#display' ).text());
        stack.push('plus');
    });

    $( '#key-minus' ).click(function()  {
        if (replaceOperator('minus')) {
            return;
        }
        evalStack($( '#display' ).text());
        stack.push('minus');
    });

    $( '#key-times' ).click(function()  {
        if (replaceOperator('times')) {
            return;
        }
        evalStack($( '#display' ).text());
        stack.push('times');
    });

    $( '#key-divide' ).click(function()  {
        if (replaceOperator('divide')) {
            return;
        }
        evalStack($( '#display' ).text());
        stack.push('divide');
    });

    $( '#key-pct' ).click(function()  {
        if (replaceOperator('pct')) {
            return;
        }
        evalStack($( '#display' ).text());
        stack.push('pct');
    });

    $( '#key-equal' ).click(function()  {
        if (stack.length === 2) {
            evalStack($( '#display' ).text());
        }
    });

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

    function numeral(val) {
        if (readyForNext) {
            updateDisplay(val);
            readyForNext = false;
        } else {
            appendToDisplay(val);
        }
    }

    $( '#key-dot' ).click(function()  {
        if (hasDot) {
            return;
        }
        hasDot = true;
        if (readyForNext) {
            updateDisplay('0.');
            readyForNext = false;
        } else {
            appendToDisplay('.');
        }
    });

    $( '#key-ac' ).click(function()  {
        stack = [];
        hasDot = false;
        readyForNext = true;
        updateDisplay(0);
    });

    $( '#key-ce' ).click(function()  {
        hasDot = false;
        readyForNext = true;
        updateDisplay(0);
    });

   /* Writing values to the calculator's "display" */

    function updateDisplay(val) {
        display = val;
        $( '#display' ).html('').html(display);
    }

    function appendToDisplay(val) {
        var currentVal = $.trim($( '#display' ).text());
        if (currentVal.length >= maxLength) {
            return;
        }
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
        var parts = val.toString().split('.');
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


});
