var canvas = document.getElementById("expressionCanvas");
var ctx = canvas.getContext("2d");
var expression;
var eval;
const cfgbutton = document.getElementById('cfgbutton');
const cfgoverlay = document.getElementById('cfgoverlay');
const cfg1 = document.getElementById('cfg1');
const cfg2 = document.getElementById('cfg2');
const noexpCFG = document.getElementById('noexpCFG');
const pdabutton = document.getElementById('pdabutton');
const pdaoverlay = document.getElementById('pdaoverlay');
const pda1 = document.getElementById('pda1');
const pda2 = document.getElementById('pda2');
const noexpPDA = document.getElementById('noexpPDA');
const currentRegEx = document.getElementById("currentRegEx");
const textarea = document.getElementById("input");
const buttonContainer = document.getElementById('simbtn');
const resultDiv = document.getElementById("result");


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function selectExpression() {
    document.getElementById("expressions").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.btn')) {
        var dropdowns = document.getElementsByClassName("expressions");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// CFG
cfgbutton.addEventListener('click', function () {
    cfgoverlay.style.display = 'block';
    if (expression == "expression1") {
        cfg1.style.display = 'block';
    } else if (expression == "expression2") {
        cfg2.style.display = 'block';
    } else {
        noexpCFG.style.display = 'block';
    }

    // Calculate and set the height of cfgoverlay
    const visiblePopup = cfg1.style.display === "block"
        ? cfg1
        : cfg2.style.display === "block"
            ? cfg2
            : noexpCFG;
    const popupHeight = visiblePopup.offsetHeight;
    cfgoverlay.style.height = `${popupHeight + 20}px`;

    const popupMarginTop = -(popupHeight + 20);
    cfgoverlay.style.marginTop = `${popupMarginTop}px`;
});

document.addEventListener('click', function (event) {
    if (!cfgoverlay.contains(event.target) && event.target !== cfgbutton) {
        cfgoverlay.style.display = 'none';
        cfg1.style.display = 'none';
        cfg2.style.display = 'none';
        noexpCFG.style.display = 'none';
    }
});

// PDA
pdabutton.addEventListener('click', function () {
    pdaoverlay.style.display = 'block';
    if (expression == "expression1") {
        pda1.style.display = 'block';
    } else if (expression == "expression2") {
        pda2.style.display = 'block';
    } else {
        noexpPDA.style.display = 'block';
    }

    const visiblePopup = pda1.style.display === "block"
        ? pda1
        : pda2.style.display === "block"
            ? pda2
            : noexpPDA;
    const popupHeight = visiblePopup.offsetHeight;
    pdaoverlay.style.height = `${popupHeight + 20}px`;
    const popupWidth = visiblePopup.offsetWidth;
    pdaoverlay.style.width = `${popupWidth + 20}px`;

    const popupMarginTop = -(popupHeight + 20);
    pdaoverlay.style.marginTop = `${popupMarginTop}px`;
});

document.addEventListener('click', function (event) {
    if (!pdaoverlay.contains(event.target) && event.target !== pdabutton) {
        pdaoverlay.style.display = 'none';
        pda1.style.display = 'none';
        pda2.style.display = 'none';
        noexpPDA.style.display = 'none';
    }
});

function adjust() {
    textarea.style.height = "150px"; // Set the minimum height

    // Set the height of the textarea to its scroll height if it exceeds the minimum height
    if (textarea.scrollHeight > 150) {
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
}

function updateLineNumbers() {
    var codeInput = document.getElementById('input');
    var lineNumbers = document.querySelector('.linenum');

    var lines = codeInput.value.split('\n');
    var lineNumbersHTML = '';

    for (var i = 0; i < lines.length; i++) {
        lineNumbersHTML += i + 1 + '\n';
    }

    lineNumbers.textContent = lineNumbersHTML;
}

// Add event listener to the code input
var codeInput = document.getElementById('input');
codeInput.addEventListener('input', updateLineNumbers);

// Initial update of line numbers
updateLineNumbers();

// Button generator
function generateButtons(lines) {
    for (let i = 0; i < lines.length; i++) {
        const button = document.createElement('button');
        button.textContent = 'Simulate String #' + (i + 1);
        button.classList.add('simbtn');
        button.addEventListener('click', () => {
            ctx2.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            animate(lines[i]);
        });
        buttonContainer.appendChild(button);
    }
}

function generateResults(results) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    for (let i = 0; i < results.length; i++) {
        const lineResult = document.createElement('p');
        let textContent = document.createTextNode(results[i]);
        lineResult.appendChild(textContent);
        resultDiv.appendChild(lineResult);
    }
}

function eval() {
    // clear previous animations
    ctx2.clearRect(0, 0, canvas.width, canvas.height);

    // Textarea getting
    let userInput = document.getElementById("input");
    let lines = userInput.value.split("\n");
    lines = lines.map(line => line.replace(/\s/g, "")); // Remove spaces from each line
    
    let result = [];

    if (expression == "expression1") {
        // validate input
        for (let i = 0; i < lines.length; i++) {
            if (!/^[ab]*$/.test(lines[i]) || lines == null || lines == "") {
                result[i] = "Invalid";
                alert("You have entered invalid symbols for this RegEx in String #" + (i + 1) + ".");
            }
            if (/^[ab]*$/.test(lines[i])) {
                const dfa_regex = /^(bab|bbb)(a*b*)(a*|b*)(ba)*(aba)(bab|aba)*bb(a|b)*(bab|aba)(a|b)*$/;
                var isValid = dfa_regex.test(lines[i]);
                console.log(isValid);
                if (isValid == true) {
                    result[i] = "Valid";
                }
                else {
                    result[i] = "Invalid";
                }
            }
        }
    }
    else if (expression == "expression2") {
        // validate input
        for (let i = 0; i < lines.length; i++) {
            if (!/^[01]*$/.test(lines[i]) || lines == null || lines == "") {
                result[i] = "Invalid";
                alert("You have entered invalid symbols for this RegEx in String #" + (i + 1) + ".");
            } 
            if (!/^[01]*$/.test(lines[i])) {
                const dfa_regex = /^(1|0)*1*0*(101|01|000)(1|0)*(101|00)*(111|00|101)(1|0)*$/;
                var isValid = dfa_regex.test(lines[i]);
                if (isValid == true) {
                    result[i] = "Valid";
                }
                else {
                    result[i] = "Invalid";
                }
            }
        }
    } else {
        alert("Please Select An Expression");
    }
    buttonContainer.innerHTML = '';
    generateResults(result);
    generateButtons(lines);
}