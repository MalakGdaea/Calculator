var isOperatorClickedTwice = false;

$(".number").on("click", function () {
  var buttonVal = $(this).val();
  if (isOperatorClickedTwice) {
    $(".result")[0].value = buttonVal;
  } else {
    $(".result")[0].value += buttonVal;
  }
  isOperatorClickedTwice = false;
});

// function continueToCalc(equation, number) {
//   var op = equation + number;
//   op = op.replace("x", "*");
//   var res = eval(op);
// }

$(".operator").on("click", function () {
  var buttonVal = $(this).val();
  if (
    buttonVal != "%" ||
    ($(".calc")[0].value != "" && $(".calc")[0].value != "0") ||
    $(".result")[0].value != ""
  ) {
    var equation = $(".calc")[0].value;
    var last = equation[equation.length - 1];
    // starting the equation with a sign
    if ($(".calc")[0].value == "" && $(".result")[0].value == "") {
      $(".calc")[0].value = "0" + buttonVal;
    } else if (last == "-" || last == "+" || last == "x" || last == "/") {
      if (isOperatorClickedTwice == false) {
        isOperatorClickedTwice = true;
        twoOperations(buttonVal, equation);
      }
    } else if (isOperatorClickedTwice == false) {
      $(".calc")[0].value += $(".result")[0].value + buttonVal;
      isOperatorClickedTwice = true;
    }
    // when the user press = to get result and then adds sign
    if (isCalculated) {
      $(".calc")[0].value = $(".result")[0].value + buttonVal;
    }
  } else {
    $(".calc")[0].value = 0;
  }
});

// if the equation has more than one operation
function twoOperations(operation, equation) {
  // dont do anything if the user entered two opetation one after another ex: ++
  var op = equation + $(".result")[0].value;
  op = op.replace("x", "*");
  var res = eval(op);
  $(".calc")[0].value = "" + res + operation;
  $(".result")[0].value = "" + res;
}

var isCalculated = false;

// retuen the reault of the equation
$("#equal").on("click", () => {
  isOperatorClickedTwice = false;
  // The eval() function evaluates JavaScript code represented as a string and returns its completion value.
  var equation = $(".calc")[0].value + $(".result")[0].value;
  var display = $(".calc")[0].value;
  if (display[display.length - 1] == "=") {
    equalInARow(equation);
  } else {
    // replace the x with * to valid evaluation
    equation = equation.replace("x", "*");
    $(".calc")[0].value = equation + "=";
    $(".result")[0].value = eval(equation);
  }
  isCalculated = true;
});

// continue to calculate when the user presses the equal more than once in a row
function equalInARow(equation) {
  var i = 1;
  while (
    equation[i] != "-" &&
    equation != "+" &&
    equation[i] != "*" &&
    equation[i] != "/"
  ) {
    i++;
  }
  $(".calc")[0].value =
    $(".result")[0].value + equation.slice(i, equation.indexOf("=") + 1);
  display = $(".calc")[0].value;
  display = display.replace("x", "*");
  $(".result")[0].value = eval(
    $(".calc")[0].value.slice(0, display.length - 1)
  );
}

// clear the input fram   comment: clear with the small letter is a reserved word
$("#clear").on("click", () => {
  $("input")[0].value = "";
  $("input")[1].value = "";
  isCalculated = false;
  isOperatorClickedTwice = false;
});

$("#undo").on("click", () => {
  var s = $(".result")[0].value;
  $(".result")[0].value = s.slice(0, s.length - 1);
});

// change the number sign
$("#negativeNum").on("click", () => {
  var res = $(".result")[0].value;
  $(".result")[0].value = res * -1;
});

// divide by one button
$("#divideByOne").on("click", () => {
  var res = $(".result")[0].value;
  $(".result")[0].value = 1 / res;
  $(".calc")[0].value = "1/(" + res + ")";
});

$("#square").on("click", () => {
  var res = $(".result")[0].value;
  $(".result")[0].value = res * res;
  $(".calc")[0].value = "sqr(" + res + ")";
});

// the square root of the number
$("#root").on("click", () => {
  var res = $(".result")[0].value;
  $(".result")[0].value = Math.sqrt(res);
  $(".calc")[0].value = "√" + res;
});

// deal with the EC button (just delete the last input not the whole equation)
$("#clearLast").on("click", () => {
  if (isCalculated) {
    $("input")[0].value = "";
    $("input")[1].value = "";
  } else {
    $("input")[1].value = "";
  }
  isOperatorClickedTwice = false;
});
