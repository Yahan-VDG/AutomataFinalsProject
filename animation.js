const canvas2 = document.getElementById("canvasAnimation");
const ctx2 = canvas2.getContext("2d");
const transitionTimer = 1000;

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

canvas2.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas2, e)
});

function animate(lines) {
    let currentFrame = 0;
    let stopAnimation = false;
    /*for (let i = 0; i < lines.length; i++) {
    lines += lines[i];
    }*/
    const totalFrames = lines.length;
    const dfa_1 = {
        state: "q0",
        transitions: {
            q0: { a: 'invalid', b: 'q1', location: { x: 30, y: 163 }, textLocB: {x: 60.6, y:159}},
            q1: { a: 'q2', b: 'q2', location: { x: 100, y: 163 }, textLocA: {x: 123.6, y:159}, textLocB: {x:137.6, y:159}},
            q2: { a: 'invalid', b: 'q3', location: { x: 170, y: 163 }, textLocB: {x: 199.6, y:159}},
            q3: { a: 'q4', b: 'q5', location: { x: 240, y: 163 }, textLocA: {x: 270.6, y:159}, textLocB: {x: 280.6, y:204}},
            q4: { a: 'q4', b: 'q6', location: { x: 310, y: 163 }, textLocA: {x: 155, y:81.5}, textLocB: {x: 345, y:81.5}},
            q5: { a: 'q7', b: 'q5', location: { x: 310, y: 243 }, textLocA: {x: 380, y:203}, textLocB: {x: 155, y:121.5}},
            q6: { a: 'q7', b: 'q5', location: { x: 380, y: 163 }, textLocA: {x: 415, y:81.5}, textLocB: {x: 245, y:203}},
            q7: { a: 'q9', b: 'q8', location: { x: 450, y: 163 }, textLocA: {x: 225, y:203}, textLocB: {x: 485, y:81.5}},
            q8: { a: 'q11', b: 'q12', location: { x: 520, y: 163 }, textLocA: {x: 260, y:123}, textLocB: {x: 555, y:81.5}},
            q9: { a: 'invalid', b: 'q10', location: { x: 450, y: 243 }, textLocB: {x: 485, y:121.5}},
            q10: { a: 'q7', b: 'invalid', location: { x: 520, y: 243 }, textLocA: {x: 485, y:203}},
            q11: { a: 'invalid', b: 'q7', location: { x: 520, y: 83 }, textLocB: {x: 485, y:123}},
            q12: { a: 'q13', b: 'q15', location: { x: 590, y: 163 }, textLocA: {x: 295, y:123}, textLocB: {x: 295, y:203}},
            q13: { a: 'q13', b: 'q14', location: { x: 590, y: 83 }, textLocA: {x: 295, y:41.5}, textLocB: {x: 625, y:41.5}},
            q14: { a: 'q17', b: 'q12', location: { x: 660, y: 83 }, textLocA: {x: 330, y:123}, textLocB: {x: 625, y:41.5}},
            q15: { a: 'q16', b: 'q15', location: { x: 590, y: 243 }, textLocA: {x: 625, y:121.5}, textLocB: {x: 295, y:121.5}},
            q16: { a: 'q12', b: 'q17', location: { x: 660, y: 243 }, textLocA: {x: 625, y:203}, textLocB: {x: 330, y:203}},
            q17: { a: 'q17', b: 'q17', location: { x: 660, y: 163 }, textLocA: {x: 330, y:81.5}},
            invalid: { a: 'invalid', b: 'invalid' }
        },
        changeState(newState) {
            this.state = newState;
        }
    }

    const dfa_2 = {
        state: "q0",
        transitions: {
            q0: { a: 'q0', b: 'q1', location: { x: 30, y: 100 } },
            q1: { a: 'q3', b: 'q2', location: { x: 187.5, y: 100 } },
            q2: { a: 'q3', b: 'q3', location: { x: 187.5, y: 220 } },
            q3: { a: 'q5', b: 'q4', location: { x: 345, y: 100 } },
            q4: { a: 'invalid', b: 'q8', location: { x: 345, y: 220 } },
            q5: { a: 'q7', b: 'q6', location: { x: 502.5, y: 100 } },
            q6: { a: 'q8', b: 'q8', location: { x: 502.5, y: 160 } },
            q7: { a: 'q8', b: 'q6', location: { x: 660, y: 100 } },
            q8: { a: 'q8', b: 'q8', location: { x: 660, y: 220 } },
            invalid: { a: 'invalid', b: 'invalid' }
        },
        changeState(newState) {
            this.state = newState;
        }
    }

    if (expression == "expression1") {
        animateState(0, dfa_1); // Start animating from the first state
    }
    if (expression == "expression2") {
        animateState2(0, dfa_2);
    }

    function animateState(stateIndex) {
        setTimeout(() => {
            const currentSymbol = lines[stateIndex];
            const nextSymbol = lines[stateIndex + 1];
            const currentState = dfa_1.transitions[dfa_1.state];
            testValidity(currentSymbol, currentState, nextSymbol);

            if (stateIndex < totalFrames && !stopAnimation) {
                animateState(stateIndex + 1); // Call the next state transition
            }
        }, transitionTimer);
    }

    function animateState2(stateIndex) {
        setTimeout(() => {
            const currentSymbol = lines[stateIndex];
            const nextSymbol = lines[stateIndex + 1];
            const currentState = dfa_2.transitions[dfa_2.state];
            testValidity2(currentSymbol, currentState, nextSymbol);

            if (stateIndex < totalFrames) {
                animateState2(stateIndex + 1); // Call the next state transition
            }
        }, transitionTimer);
    }

    function testValidity(currentSymbol, currentState, nextSymbol) {
        if (currentSymbol === 'a') {
            const nextState = currentState.a;
            if (nextState === 'invalid') {
                invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                stopAnimation = true;
            } else if (typeof nextSymbol === 'undefined'){
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
            } else {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                dfa_1.changeState(nextState);
            }
        } 
        if (currentSymbol === 'b') {
            const nextState = currentState.b;
            if (nextState === 'invalid') {
                invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                stopAnimation = true;
            } else if (typeof nextSymbol === 'undefined'){
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
            } else {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                dfa_1.changeState(nextState);
            }
        } 
        if (typeof currentSymbol === 'undefined') {
            if (currentState.a === 'q17' && currentState.b === 'q17') {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
            }
            
            currentSymbol = 'Λ';
            const transitionA = dfa_1.transitions[currentState.a];
            const transitionB = dfa_1.transitions[currentState.b];

            if (transitionA && transitionB) {
                const { location: locationA } = transitionA;
                const { location: locationB } = transitionB;

                if (currentState.a != 'invalid'){
                    invalidHighlight(locationA.x, locationA.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                }
                if (currentState.b != 'invalid'){
                    invalidHighlight(locationB.x, locationB.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                }
            }
        }
        
        console.log(currentState);
        console.log(currentSymbol);
        currentFrame++;
    }

    function testValidity2(currentSymbol, currentState, nextSymbol) {
        if (currentSymbol === '1') {
            const nextState = currentState.a;
            if (nextState === 'invalid') {
                invalidHighlight(currentState.location.x, currentState.location.y);
            } else if (typeof nextSymbol === 'undefined'){
                validHighlight(currentState.location.x, currentState.location.y);
            }
            else {
                validHighlight(currentState.location.x, currentState.location.y);
                dfa_2.changeState(nextState);
            }
        } 
        if (currentSymbol === '0') {
            const nextState = currentState.b;
            if (nextState === 'invalid') {
                invalidHighlight(currentState.location.x, currentState.location.y);
            } else if (typeof nextSymbol === 'undefined'){
                validHighlight(currentState.location.x, currentState.location.y);
            } else {
                validHighlight(currentState.location.x, currentState.location.y);
                dfa_2.changeState(nextState);
            }
        } 
        if (typeof currentSymbol === 'undefined') {
            if (currentState.a === 'q8' && currentState.b === 'q8') {
                validHighlight(currentState.location.x, currentState.location.y);
            }

            const transitionA = dfa_2.transitions[currentState.a];
            const transitionB = dfa_2.transitions[currentState.b];

            if (transitionA && transitionB) {
                const { location: locationA } = transitionA;
                const { location: locationB } = transitionB;

                if (currentState.a != 'invalid'){
                    invalidHighlight(locationA.x, locationA.y);
                }
                if (currentState.b != 'invalid'){
                    invalidHighlight(locationB.x, locationB.y);
                }
            }
        }
        console.log(currentState);
        console.log(currentSymbol);
        currentFrame++;
    }

    // Every highlight is red if the string is false //still working on it
    /*function testValidity(currentSymbol, currentState, isValid) {
        if (currentSymbol == 'a' && isValid == true) {
            const nextState = currentState.a;
            validHighlight(currentState.location.x, currentState.location.y);
            dfa_1.changeState(nextState);
        } else if (isValid == false) {
            const nextState = currentState.b;
            invalidHighlight(currentState.location.x, currentState.location.y);
            dfa_1.changeState(nextState);
        }
        console.log(currentState);
        console.log(currentSymbol);
        currentFrame++;
    }*/
}

function validHighlight(x, y, symbol, locX, locY) {
    //
    ctx2.beginPath();
    ctx2.arc(x, y, 15, 0, Math.PI * 2);
    ctx2.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx2.fill();
    ctx2.closePath();
    //text highlight
        ctx2.font = "bold 16px Helvetica";
        ctx2.fillStyle = "lime";
        ctx2.fillText(symbol, locX, locY);
    setTimeout(() => {
        const textWidth = ctx2.measureText(symbol).width;
        ctx2.clearRect(locX, locY - 16, textWidth, 20);

        ctx2.clearRect(x - 15, y - 15, 30, 30);
    }, 500)
}

function invalidHighlight(x, y, symbol, locX, locY) {
    ctx2.beginPath();
    ctx2.arc(x, y, 15, 0, Math.PI * 2);
    ctx2.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx2.fill();
    ctx2.closePath();

    //text highlight
    ctx2.font = "bold 16px Helvetica";
    ctx2.fillStyle = "lime";
    ctx2.fillText(symbol, locX, locY);
setTimeout(() => {
    const textWidth = ctx2.measureText(symbol).width;
    ctx2.clearRect(locX, locY - 16, textWidth, 20);

    ctx2.clearRect(x - 15, y - 15, 30, 30);
}, 500)
}
