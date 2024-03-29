const canvas2 = document.getElementById("canvasAnimation");
const ctx2 = canvas2.getContext("2d");
const transitionTimer = 1000;

function animate(lines) {
    let currentFrame = 0;
    let stopAnimation = false;
    const totalFrames = lines.length;
    const dfa_1 = {
        state: "q0",
        transitions: {
            q0: { a: 'invalid', b: 'q1', location: { x: 30, y: 163 }, textLocB: { x: 60, y: 159 } },
            q1: { a: 'q2', b: 'q2', location: { x: 100, y: 163 }, textLocA: { x: 124, y: 159 }, textLocB: { x: 137, y: 159 } },
            q2: { a: 'invalid', b: 'q3', location: { x: 170, y: 163 }, textLocB: { x: 200, y: 159 } },
            q3: { a: 'q4', b: 'q5', location: { x: 240, y: 163 }, textLocA: { x: 271, y: 159 }, textLocB: { x: 280, y: 204 } },
            q4: { a: 'q4', b: 'q6', location: { x: 310, y: 163 }, textLocA: { x: 305, y: 125 }, textLocB: { x: 340, y: 159 } },
            q5: { a: 'q4', b: 'q5', location: { x: 310, y: 243 }, textLocA: { x: 295, y: 204 }, textLocB: { x: 305, y: 290 } },
            q6: { a: 'q7', b: 'q5', location: { x: 380, y: 163 }, textLocA: { x: 410, y: 159 }, textLocB: { x: 330, y: 204 } },
            q7: { a: 'q9', b: 'q8', location: { x: 450, y: 163 }, textLocA: { x: 435, y: 204 }, textLocB: { x: 480, y: 159 } },
            q8: { a: 'q11', b: 'q12', location: { x: 520, y: 163 }, textLocA: { x: 526, y: 124 }, textLocB: { x: 550, y: 159 } },
            q9: { a: 'invalid', b: 'q10', location: { x: 450, y: 243 }, textLocB: { x: 480, y: 239 } },
            q10: { a: 'q7', b: 'invalid', location: { x: 520, y: 243 }, textLocA: { x: 491, y: 204 } },
            q11: { a: 'invalid', b: 'q7', location: { x: 520, y: 83 }, textLocB: { x: 470, y: 124 } },
            q12: { a: 'q13', b: 'q15', location: { x: 590, y: 163 }, textLocA: { x: 575, y: 124 }, textLocB: { x: 575, y: 204 } },
            q13: { a: 'q13', b: 'q14', location: { x: 590, y: 83 }, textLocA: { x: 585, y: 45 }, textLocB: { x: 620, y: 79 } },
            q14: { a: 'q17', b: 'q15', location: { x: 660, y: 83 }, textLocA: { x: 665, y: 124 }, textLocB: { x: 610, y: 164 } },
            q15: { a: 'q16', b: 'q15', location: { x: 590, y: 243 }, textLocA: { x: 620, y: 239 }, textLocB: { x: 585, y: 290 } },
            q16: { a: 'q13', b: 'q17', location: { x: 660, y: 243 }, textLocA: { x: 630, y: 164 }, textLocB: { x: 665, y: 204 } },
            q17: { a: 'q17', b: 'q17', location: { x: 660, y: 163 }, textLocA: { x: 677, y: 145 }, textLocB: { x: 690, y: 145 } },
            invalid: { a: 'invalid', b: 'invalid' }
        },
        changeState(newState) {
            this.state = newState;
        }
    }

    const dfa_2 = {
        state: "q0",
        transitions: {
            q0: { a: 'q0', b: 'q1', location: { x: 30, y: 100 }, textLocA: { x: 26, y: 57 }, textLocB: { x: 104, y: 96 } },
            q1: { a: 'q3', b: 'q2', location: { x: 187.5, y: 100 }, textLocA: { x: 262, y: 96 }, textLocB: { x: 193, y: 161 } },
            q2: { a: 'q3', b: 'q3', location: { x: 187.5, y: 220 }, textLocA: { x: 258, y: 161 }, textLocB: { x: 245, y: 161 } },
            q3: { a: 'q5', b: 'q4', location: { x: 345, y: 100 }, textLocA: { x: 419, y: 96 }, textLocB: { x: 350, y: 161 } },
            q4: { a: 'q5', b: 'q8', location: { x: 345, y: 220 }, textLocA: { x: 419, y: 156 }, textLocB: { x: 499, y: 215 } },
            q5: { a: 'q7', b: 'q6', location: { x: 502.5, y: 100 }, textLocA: { x: 577, y: 96 }, textLocB: { x: 488, y: 130 } },
            q6: { a: 'q8', b: 'q8', location: { x: 502.5, y: 160 }, textLocA: { x: 594, y: 190 }, textLocB: { x: 580, y: 190 } },
            q7: { a: 'q8', b: 'q6', location: { x: 660, y: 100 }, textLocA: { x: 666, y: 160 }, textLocB: { x: 577, y: 125 } },
            q8: { a: 'q8', b: 'q8', location: { x: 660, y: 220 }, textLocA: { x: 649, y: 271 }, textLocB: { x: 662, y: 271 } },
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
            const prevSymbol = lines[stateIndex - 1];
            const nextSymbol = lines[stateIndex + 1];
            const currentState = dfa_1.transitions[dfa_1.state];
            testValidity(currentSymbol, currentState, nextSymbol, prevSymbol);

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

    function testValidity(currentSymbol, currentState, nextSymbol, prevSymbol) {
        if (currentSymbol === 'a') {
            const nextState = currentState.a;
            if (nextState === 'invalid') {
                if(!currentState.textLocA){
                    invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                } else {
                    invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                }
                stopAnimation = true;
            } else if (typeof nextSymbol === 'undefined' && (currentState.a != 'q17' && currentState.b != 'q17')) {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
            } else {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                dfa_1.changeState(nextState);
            }
        }
        if (currentSymbol === 'b') {
            const nextState = currentState.b;
            if (nextState === 'invalid') {
                if(!currentState.textLocA){
                    invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                } else {
                    invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                }
                stopAnimation = true;
            } else if (typeof nextSymbol === 'undefined' && (currentState.a != 'q17' && currentState.b != 'q17')) {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
            } else {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                dfa_1.changeState(nextState);
            }
        }
        if (typeof currentSymbol === 'undefined') {
            console.log(prevSymbol);

            const transitionA = dfa_1.transitions[currentState.a];
            const transitionB = dfa_1.transitions[currentState.b];

            if (currentState.a === 'q17' && currentState.b === 'q17') {
                currentSymbol = 'Λ';
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x - 12, currentState.textLocA.y - 0.5);
            } else if (transitionA && transitionB) {
                const { location: locationA } = transitionA;
                const { location: locationB } = transitionB;
                currentSymbol = 'Λ';
                if (prevSymbol === 'a') {
                    if(!transitionA.textLocA){
                        invalidHighlight(locationA.x, locationA.y, currentSymbol, transitionA.textLocB.x, transitionA.textLocB.y);
                    } else if(!transitionA.textLocB){
                        invalidHighlight(locationA.x, locationA.y, currentSymbol, transitionA.textLocA.x, transitionA.textLocA.y);
                    } else if(transitionA.textLocA && transitionA.textLocB){
                        invalidHighlight(locationA.x, locationA.y, currentSymbol, transitionA.textLocB.x, transitionA.textLocB.y);
                        invalidHighlight(locationA.x, locationA.y, currentSymbol, transitionA.textLocA.x, transitionA.textLocA.y);
                    }
                }
                if (prevSymbol === 'b') {
                    if(!transitionB.textLocA){
                        invalidHighlight(locationB.x, locationB.y, currentSymbol, transitionB.textLocB.x, transitionB.textLocB.y);
                    } else if(!transitionB.textLocB){
                        invalidHighlight(locationB.x, locationB.y, currentSymbol, transitionB.textLocA.x, transitionB.textLocA.y);
                    } else if (transitionB.textLocA && transitionB.textLocB){
                        invalidHighlight(locationB.x, locationB.y, currentSymbol, transitionB.textLocB.x, transitionB.textLocB.y);
                        invalidHighlight(locationB.x, locationB.y, currentSymbol, transitionB.textLocA.x, transitionB.textLocA.y);
                    }
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
                if(!currentState.textLocA){
                    invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                } else {
                    invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                }
                stopAnimation = true;
            } else if (typeof nextSymbol === 'undefined' && (currentState.a != 'q8' && currentState.b != 'q8')) {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
            }
            else {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                dfa_2.changeState(nextState);
            }
        }
        if (currentSymbol === '0') {
            const nextState = currentState.b;
            if (nextState === 'invalid') {
                if(!currentState.textLocA){
                    invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                } else {
                    invalidHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x, currentState.textLocA.y);
                }
                stopAnimation = true;
            } else if (typeof nextSymbol === 'undefined' && (currentState.a != 'q8' && currentState.b != 'q8')) {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
            } else {
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocB.x, currentState.textLocB.y);
                dfa_2.changeState(nextState);
            }
        }
        if (typeof currentSymbol === 'undefined') {

            const transitionA = dfa_2.transitions[currentState.a];
            const transitionB = dfa_2.transitions[currentState.b];

            if (currentState.a === 'q8' && currentState.b === 'q8') {
                currentSymbol = 'Λ';
                validHighlight(currentState.location.x, currentState.location.y, currentSymbol, currentState.textLocA.x - 12, currentState.textLocA.y + 1);
            } else if (transitionA && transitionB) {
                const { location: locationA } = transitionA;
                const { location: locationB } = transitionB;
                currentSymbol = 'Λ';
                if (currentState.a != 'invalid') {
                    if(!transitionA.textLocA){
                        invalidHighlight(locationA.x, locationA.y, currentSymbol, transitionA.textLocB.x, transitionA.textLocB.y);
                    } else if(!transitionA.textLocB){
                        invalidHighlight(locationA.x, locationA.y, currentSymbol, transitionA.textLocA.x, transitionA.textLocA.y);
                    } else if(transitionA.textLocA && transitionA.textLocB){
                        invalidHighlight(locationA.x, locationA.y, currentSymbol, transitionA.textLocB.x, transitionA.textLocB.y);
                        invalidHighlight(locationA.x, locationA.y, currentSymbol, transitionA.textLocA.x, transitionA.textLocA.y);
                    }
                }
                if (currentState.b != 'invalid') {
                    if(!transitionB.textLocA){
                        invalidHighlight(locationB.x, locationB.y, currentSymbol, transitionB.textLocB.x, transitionB.textLocB.y);
                    } else if(!transitionB.textLocB){
                        invalidHighlight(locationB.x, locationB.y, currentSymbol, transitionB.textLocA.x, transitionB.textLocA.y);
                    } else if (transitionB.textLocA && transitionB.textLocB){
                        invalidHighlight(locationB.x, locationB.y, currentSymbol, transitionB.textLocB.x, transitionB.textLocB.y);
                        invalidHighlight(locationB.x, locationB.y, currentSymbol, transitionB.textLocA.x, transitionB.textLocA.y);
                    }
                }
            }
        }
        console.log(currentState);
        console.log(currentSymbol);
        currentFrame++;
    }
}
/*
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
}

function invalidHighlight(x, y, symbol, locX, locY) {
    ctx2.beginPath();
    ctx2.arc(x, y, 15, 0, Math.PI * 2);
    ctx2.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx2.fill();
    ctx2.closePath();

    //text highlight
    const textWidth = ctx2.measureText(symbol).width;
    ctx2.fillStyle = "#f8f4f4";
    ctx2.fillRect(locX, locY - 16, textWidth + 1, 17);
    ctx2.font = "bold 16px Helvetica";
    ctx2.fillStyle = "red";
    ctx2.fillText(symbol, locX, locY);
}*/

// Define an array to keep track of highlighted states
let highlightedStates = [];

function validHighlight(x, y, symbol, locX, locY) {
    const stateIndex = highlightedStates.findIndex(state => state.x === x && state.y === y);
  
    if (stateIndex !== -1) {
      const state = highlightedStates[stateIndex];
      ctx2.clearRect(state.x - 15, state.y - 15, 30, 30);
      highlightedStates.splice(stateIndex, 1);
    }
  
    ctx2.beginPath();
    ctx2.arc(x, y, 15, 0, Math.PI * 2);
    ctx2.fillStyle = "rgba(0, 255, 0, 0.5)";
    ctx2.fill();
    ctx2.closePath();
  
    ctx2.font = "bold 16px Helvetica";
    ctx2.fillStyle = "lime";
    ctx2.fillText(symbol, locX, locY);
  
    highlightedStates.push({ x, y });
  }
  
  function invalidHighlight(x, y, symbol, locX, locY) {
    const stateIndex = highlightedStates.findIndex(state => state.x === x && state.y === y);
  
    if (stateIndex !== -1) {
      const state = highlightedStates[stateIndex];
      ctx2.clearRect(state.x - 15, state.y - 15, 30, 30);
      highlightedStates.splice(stateIndex, 1);
    }
  
    ctx2.beginPath();
    ctx2.arc(x, y, 15, 0, Math.PI * 2);
    ctx2.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx2.fill();
    ctx2.closePath();
  
    const textWidth = ctx2.measureText(symbol).width;
    ctx2.fillStyle = "#f8f4f4";
    ctx2.fillRect(locX, locY - 16, textWidth + 1, 17);
    ctx2.font = "bold 16px Helvetica";
    ctx2.fillStyle = "red";
    ctx2.fillText(symbol, locX, locY);
  
    highlightedStates.push({ x, y });
  }
  