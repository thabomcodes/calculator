// ====================================================
//                 THE MATH BEHIND
//=====================================================
/**
 * Adds two numbers.
 * @param {Number} a 
 * @param {Number} b 
 * @returns the sum of a and b.
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtract one number from the another.
 * @param {Number} a 
 * @param {Number} b 
 * @returns the diffrence between a and b.
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplies two numbers.
 * @param {Number} a 
 * @param {Number} b 
 * @returns the product of a and b.
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divide one number by another.
 * @param {Number} a The dividend.
 * @param {Number} b The divisor.
 * @returns the quotient between a and b.
 */
function divide(a, b) {
    return a / b;
}

/**
 * Returns value of base taken to a specified number
 * @param {Number} a The base.
 * @param {Number} b The exponent.
 */
function pow(a, b) {
    return a ** b;
}
/**
 * Takes in two numbers and operator then returns result.
 * @param {Number} a 
 * @param {Number} b 
 * @param {String} operator 
 */
function operate(a, b, operator) {
    switch (operator) {
        case "p":
            return add(a, b);
        case "m":
            return subtract(a, b);
        case "/":
            return divide(a, b);
        case "*":
            return multiply(a, b);
        case "^":
            return pow(a, b);
        default:
            console.log(`Error: The operator "${operator}" is not supported.`);
            break;
    }
}

/**
 * Queue implementation
 * @link https://www.programiz.com/javascript/examples/queue
 */
class Queue {
    constructor() {
        this.items = [];
    }

    // add element to the queue
    enqueue(element) {
        return this.items.push(element);
    }

    // remove element from the queue
    dequeue() {
        if (this.items.length > 0) {
            return this.items.shift();
        }
    }

    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }

    // check if the queue is empty
    isEmpty() {
        return this.items.length == 0;
    }

    // the size of the queue
    size() {
        return this.items.length;
    }

    // empty the queue
    clear() {
        this.items = [];
    }
}

/**
 * Stack implementation
 * @link https://www.programiz.com/javascript/examples/stack
 */
class Stack {
    constructor() {
        this.items = [];
    }

    // add element to the stack
    add(element) {
        return this.items.push(element);
    }

    // remove element from the stack
    remove() {
        if (this.items.length > 0) {
            return this.items.pop();
        }
    }

    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }

    // check if the stack is empty
    isEmpty() {
        return this.items.length == 0;
    }

    // the size of the stack
    size() {
        return this.items.length;
    }

    // empty the stack
    clear() {
        this.items = [];
    }
}

/**
 * Implementation of the shunting yard algorithm.
 * @param {String} exp The expression to evaluate.
 * @returns The reverse polish notation.
 */
function parseExpression(exp) {

    exp = exp.split(" ");

    const output = new Queue();
    const operator_stack = new Stack();

    const precedence = {
        "^": [4, "right"],
        "/": [3, "left"],
        "*": [3, "left"],
        "p": [2, "left"],
        "m": [2, "left"]
    };
    var operators = ["^", "/", "*", "p", "m"]

    for (let i = 0; i < exp.length; i++) {
        if (!isNaN(exp[i]) && !isNaN(parseFloat(exp[i]))) {
            output.enqueue(exp[i])
        }
        else if (operators.indexOf(exp[i]) != -1) {
            while ((operator_stack.peek() && operator_stack.peek() != "(") &&
                (precedence[operator_stack.peek()][0] > precedence[exp[i]][0] ||
                    (precedence[operator_stack.peek()][0] == precedence[exp[i]][0] &&
                        (precedence[operator_stack.peek()][1] == "left" && precedence[exp[i]][1] == "left"))
                )) {
                output.enqueue(operator_stack.remove())
            }
            //}
            operator_stack.add(exp[i]);
        }
        else if (exp[i] == "(") {
            operator_stack.add(exp[i]);
        }
        else if (exp[i] == ")") {
            while (operator_stack.peek() != "(") {
                console.assert(!operator_stack.isEmpty(), { stack: operator_stack, msg: "stack is empty" });
                /* If the stack runs out without finding a left parenthesis, then there are mismatched parentheses. */
                output.enqueue(operator_stack.remove());
            }
            console.assert(operator_stack.peek() == "(", { top: operator_stack.peek(), msg: "top is not '('" });
            operator_stack.remove();
        }

    }
    /* After the while loop, pop the remaining items from the operator stack into the output queue. */
    while (operator_stack.size() != 0) {
        /* If the operator token on the top of the stack is a parenthesis, then there are mismatched parentheses. */
        console.assert(operator_stack.peek() != "(", { top: operator_stack.peek(), msg: "top is '('" });
        output.enqueue(operator_stack.remove());
    }
    return output.items;
}

/**
 * Solves the reverse polish notation.
 * @param {*} exp The expression to evaluate.
 * @returns The answer to the expression.
 */
function solveRpn(exp) {
    const stack = new Stack();

    for (const token of exp) {
        const num = Number(token);
        if (!isNaN(num)) {
            stack.add(num);
        }
        else {
            // the stack must have 2 or more operands

            if (stack.size() < 2) throw new Error("Syntax Error!");
            const o2 = stack.remove(), o1 = stack.remove();
            var operators = ["^", "/", "*", "p", "m"]

            if (operators.indexOf(token) != -1) stack.add(operate(o1, o2, token));
            else throw new Error(`The operator [${token}] is not supported.`);
        }
    }
    // the stack should have no numbers remaining
    if (stack.size() > 1) throw new Error(`Syntax Error!`);
    return stack.peek();
}

/**
 * Solves an expression.
 * @param {*} exp The expression to evaluate.
 * @returns The answer to the expression.
 */
function getAnswer(exp) {
    exp = exp.trim();
    const rpn = parseExpression(exp);
    return solveRpn(rpn);
}

//=====================================================
//               CALCULATOR APP
//=====================================================

// Query selectors
const display = document.querySelector(".display");
const screenio = document.querySelector(".screenio");
const buttons = document.querySelectorAll("button");
const equals = document.querySelector("#eq");

// expression to solve
var expression = "";

/**
 * Checks if the screenio has answer. 
 * @returns True if screeio has answer else false.
 */
function screenHasAns() {
    if (screenio.innerText.charAt(0) == '=' || screenio.innerText == "Math Error!") {
        return true;
    }
    return false;
}

/**
 * Checks if the display is empty.
 * @returns True if the screen is empty else false.
 */
function displayIsEmpty() {
    return display.innerText == "";
}
// buttons event listeners
/**
 * Adds an item to the screenio.
 * @param {*} item 
 */
function addToScreen(item) {
    if (item.id == "plusminus") {
        if (screenio.innerText.charAt(0) == "-") {
            screenio.innerText = screenio.innerText.substring(1);
        } else {
            screenio.innerText = `-${screenio.innerText}`;
        }
    } else {
        screenio.innerText += `${item.id}`;
    }

}

/**
 * Adds an item to display.
 * @param {*} item 
 */
function addToDisplay(item) {

    const ops = ["÷", "×", "+", "−"];
    const op = display.innerText.charAt(display.innerText.length - 1);
    if (ops.indexOf(op) != -1 && isNaN(item.id) && !screenio.innerText) {
        document.querySelector(".screen").style.backgroundColor = "rgb(255, 98, 98)";
        setTimeout(() => { document.querySelector(".screen").style.backgroundColor = "rgb(233, 255, 215)"; }, 500);
    }
    else if (op.indexOf((screenio.innerText.charAt(0).replace("-", "m")) == -1 || !screen.innerText)) {

        if (displayIsEmpty() && isNaN(item.id) && (screenio.innerText.length == 0 || isNaN(screenio.innerText))) return;
        if (isNaN(screenio.innerText)) return;
        MathJax.typesetPromise().then(() => {
            // modify the DOM here
            var num = screenio.innerText.replace(/(-[0-9]*\.?[0-9]*)/g, "($1)")
            display.innerHTML = `\\(${display.innerText + num + item.innerText} \\)`;

            expression += `${screenio.innerText.replace("-", "m")} ${item.id} `;

            screenio.innerText = "";
            MathJax.typesetPromise();
        }).catch((err) => console.log(err.message));
    }

}
/**
 * Deletes a character.
 */
function backspace() {

    if (screenio.innerText) {
        screenio.innerText = screenio.innerText.substring(0, screenio.innerText.length - 1);
    }
    else {
        MathJax.typesetPromise().then(() => {
            if (display.innerText.charAt(display.innerText.length - 1) == ")") {
                display.innerHTML = `\\(${display.innerText.substring(0, display.innerText.lastIndexOf("("))} \\)`
            }
            else {
                display.innerHTML = `\\(${display.innerText.substring(0, display.innerText.length - 1)} \\)`
            }
            expression = expression.trim().substring(0, expression.trim().lastIndexOf(" "));
            MathJax.typesetPromise();
        }).catch((err) => console.log(err.message));
    }
}
/**
 * Adds the last item to displaye before evaluating the expression.
 */
function addLast() {
    if (!isNaN(screenio.innerText)) {
        MathJax.typesetPromise().then(() => {
            // modify the DOM here
            var num = screenio.innerText.replace(/(-[0-9]*\.?[0-9]*)/g, "($1)")
            display.innerHTML = `\\(${display.innerText + num} \\)`;
            screenio.innerText = "";
            MathJax.typesetPromise();
        }).catch((err) => console.log(err.message));
        expression += `${screenio.innerText.replace("-", "m")}`;
    }
}

/**
 * Finds the scientic notation.
 * @param {*} number 
 * @returns 
 */
function sciNotation(number) {
    if (number.toString().indexOf(".") != -1 && number.toString().indexOf("e") == -1) {
        var num = number.toString();
        return parseFloat(num.substring(0, 15)).toFixed(13 - num.substring(0, num.indexOf(".")).length);
    }
    else if (number.toString().indexOf("e") != -1) {
        var num = number.toString();
        if (num.indexOf(".") != -1) {
            var first = num.substring(0, num.indexOf("."));
            var dec = num.substring(num.indexOf(".") + 1, num.indexOf("e"));
            var sign = num.substring(num.indexOf("e") + 1, num.indexOf("e") + 2);
            sign = (sign == "+") ? "" : "-";
            var e = num.substring(num.indexOf("e") + 2);
            let len = e.length + first.length;
            if (dec.length + len > 14) {
                dec = dec.substring(0, 13 - len);
            }
            return `${first}.${dec}\\times 10 ^{${sign}${e}}`
        } else {
            var first = num.substring(0, num.indexOf("e"));
            var e = num.substring(num.indexOf("e") + 2);
            var sign = num.substring(num.indexOf("e") + 1, num.indexOf("e") + 2);
            sign = (sign == "+") ? "" : "-";
            return `${first}\\times 10 ^{${sign}${e}}`
        }
    }
    else {
        var num = number.toExponential().toString();
        if (num.indexOf(".") != -1) {
            var first = num.substring(0, num.indexOf("."));
            var dec = num.substring(num.indexOf(".") + 1, num.indexOf("e"));
            var e = num.substring(num.indexOf("e") + 2);
            let len = e.length + first.length;
            if (dec.length + len > 14) {
                dec = dec.substring(0, 13 - len);
            }
            return `${first}.${dec}\\times 10 ^{${e}}`
        } else {
            var first = num.substring(0, num.indexOf("e"));
            var e = num.substring(num.indexOf("e") + 2);
            return `${first}\\times 10 ^{${e}}`
        }
    }
}
/**
 * Solves the expression and updates necessary information
 * @returns 
 */
function solve() {

    if (screenio.innerText) {
        addLast();
    }
    if (!expression) return;
    exp = expression;
    exp = exp.replaceAll("mul", "*");
    exp = exp.replaceAll("m", "-");
    exp = exp.replaceAll("add", "p");
    exp = exp.replaceAll("sub", "m");

    exp = exp.replaceAll("div", "/");
    try {
        var ans = getAnswer(exp);

        MathJax.typesetPromise().then(() => {
            if (ans == -Infinity) screenio.innerHTML = `\\(=-\\infty\\)`;
            else if (ans == Infinity) screenio.innerHTML = `\\(=\\infty\\)`;
            else {
                if (ans.toString().length > 14 || ans.toString().indexOf("e") != -1) {
                    ans = sciNotation(ans);
                }
                screenio.innerHTML = `\\(=${ans}\\)`
            };
            MathJax.typesetPromise();
        }).catch((err) => console.log(err.message));
        // disable
        equals.disabled = true;
        buttons.forEach((button) => {
            if (!(button.id == "clear")) {
                button.disabled = true;
            }
        });
    } catch (err) {
        document.querySelector(".screen").style.backgroundColor = "rgb(255, 98, 98)";
        setTimeout(() => { document.querySelector(".screen").style.backgroundColor = "rgb(233, 255, 215)"; }, 500);
    }



}
buttons.forEach((item) => {
    const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const ops = ["div", "mul", "sub", "add"]

    if (nums.indexOf(item.id) != -1) {
        item.addEventListener('click', () => {
            addToScreen(item);
        });
    }
    else if (ops.indexOf(item.id) != -1) {
        item.addEventListener('click', () => {
            addToDisplay(item);
        });
    }
    else if (item.id == "dot") {
        item.addEventListener('click', () => {
            if (screenio.innerText.indexOf(".") == -1)
                addToScreen({ id: "." });
        });
    }
    else if (item.id == "plusminus") {
        item.addEventListener('click', () => {
            addToScreen(item);
        });
    }
    else if (item.id == "clear") {
        item.addEventListener('click', () => {
            display.innerHTML = "";
            screenio.innerHTML = "";
            expression = "";
            equals.disabled = false;
            buttons.forEach((button) => {
                button.disabled = false;
            });
        });
    }
    else if (item.id == "backspace") {
        item.addEventListener('click', backspace);
    }
    else if (item.id == "eq") {
        item.addEventListener('click', solve);
    }

});

//===========================================================
//                    END
//===========================================================