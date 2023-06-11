function animate(lines) {
    let currentFrame = 0;
    const totalFrames = lines.length;

    const dfa_1 = {
        state: "q0",
        transitions: {
        q0: {a: 'invalid', b: 'q1', location: {x: 30, y:163}},
        q1: {a: 'q2', b: 'q2', location: {x: 100, y:163} },
        q2: {a: 'invalid', b: 'q3', location: {x: 170, y:163}},
        q3: {a: 'q4', b: 'q5', location: {x: 240, y:163}},
        q4: {a: 'q4', b: 'q6', location: {x: 310, y:163}},
        q5: {a: 'q7', b: 'q5', location: {x: 310, y:243}},
        q6: {a: 'q7', b: 'q5', location: {x: 380, y:163}},
        q7: {a: 'q9', b: 'q8', location: {x: 450, y:163}},
        q8: {a: 'q11', b: 'q12', location: {x: 520, y:163}},
        q9: {a: 'invalid', b: 'q10', location: {x: 450, y:243}},
        q10: {a: 'q7', b: 'invalid', location: {x: 520, y:243}},
        q11: {a: 'invalid', b: 'q7', location: {x: 520, y:83}},
        q12: {a: 'q13', b: 'q15', location: {x: 590, y:163}},
        q13: {a: 'invalid', b: 'q14', location: {x: 590, y:83}},
        q14: {a: 'q17', b: 'invalid', location: {x: 660, y:83}},
        q15: {a: 'q16', b: 'invalid', location: {x: 590, y:243}},
        q16: {a: 'invalid', b: 'q17', location: {x: 660, y:243}},
        q17: {a: 'q17', b: 'q17', location: {x: 660, y:163}},
        invalid: {a: 'invalid', b: 'invalid'}
        },
        changeState(newState){
            this.state = newState;
        }
    }

    if (expression == "expression1")
    {
        for (let i = 0; i < lines.length +1; i++) {
            const currentSymbol = lines[i];
            const currentState = dfa_1.transitions[dfa_1.state];
            testValidity(currentSymbol, currentState);
        }

    }
    if (currentFrame < totalFrames) {
        // Call the animation function recursively
        requestAnimationFrame(animate);
    }

    function testValidity(currentSymbol, currentState)
    {
        if (currentSymbol === 'a') {
        const nextState = currentState.a;
            if (nextState === 'invalid') {
            invalidHighlight(currentState.location.x, currentState.location.y);
            } 
            else {
            validHighlight(currentState.location.x, currentState.location.y);
            dfa_1.changeState(nextState);
            }
        } else if (currentSymbol === 'b') {
        const nextState = currentState.b;

            if (nextState === 'invalid') {
            invalidHighlight(currentState.location.x, currentState.location.y);
            } else {
            validHighlight(currentState.location.x, currentState.location.y);
            dfa_1.changeState(nextState);
            }
        } else if (typeof currentSymbol === 'undefined' ){
            if (currentState.a === 'q17' && currentState.b === 'q17') {
                validHighlight(currentState.location.x, currentState.location.y);
            }
        }
        console.log(currentState);
        console.log(currentSymbol);
        currentFrame++;
    }
  }


  function validHighlight(x, y)
  {
    ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
      ctx.fill();
      ctx.closePath();
  }

  function invalidHighlight(x, y)
  {
    ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 0, 0, 0,5)";
      ctx.fill();
      ctx.closePath();
  }