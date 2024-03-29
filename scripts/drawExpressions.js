function expression1() {
    expression = "expression1";

    let regexText = "Current RegEx: <span id='regexText'>(bab+bbb) (a*b*) (a*+b*) (ba)* (aba) (bab+aba)* bb (a+b)* (bab+aba) (a+b)*</span>";
    currentRegEx.innerHTML = regexText;

    //Clears Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define the states of the FA
    const q0 = { x: 30, y: 163, starting: true };
    const q1 = { x: 100, y: 163 };
    const q2 = { x: 170, y: 163 };
    const q3 = { x: 240, y: 163 };
    const q4 = { x: 310, y: 163 };
    const q5 = { x: 310, y: 243 };
    const q6 = { x: 380, y: 163 };
    const q7 = { x: 450, y: 163 };
    const q8 = { x: 520, y: 163 };
    const q9 = { x: 450, y: 243 };
    const q10 = { x: 520, y: 243 };
    const q11 = { x: 520, y: 83 };
    const q12 = { x: 590, y: 163 };
    const q13 = { x: 590, y: 83 };
    const q14 = { x: 660, y: 83 };
    const q15 = { x: 590, y: 243 };
    const q16 = { x: 660, y: 243 };
    const q17 = { x: 660, y: 163, accepting: true };

    // Define the transitions of the FA
    const transitions = [
        { from: q0, to: q1, symbol: 'b' },
        { from: q1, to: q2, symbol: 'a,b' },
        { from: q2, to: q3, symbol: 'b' },
        { from: q3, to: q4, symbol: 'a' },
        { from: q3, to: q5, symbol: 'b' },
        { from: q5, to: q4, symbol: 'a' },
        { from: q5, to: q5, symbol: 'b' },
        { from: q4, to: q4, symbol: 'a' },
        { from: q4, to: q6, symbol: 'b' },
        { from: q6, to: q5, symbol: 'b' },
        { from: q6, to: q7, symbol: 'a' },
        { from: q7, to: q8, symbol: 'b' },
        { from: q7, to: q9, symbol: 'a' },
        { from: q9, to: q10, symbol: 'b' },
        { from: q10, to: q7, symbol: 'a' },
        { from: q8, to: q11, symbol: 'a' },
        { from: q11, to: q7, symbol: 'b' },
        { from: q8, to: q12, symbol: 'b' },
        { from: q12, to: q13, symbol: 'a' },
        { from: q12, to: q15, symbol: 'b' },
        { from: q15, to: q16, symbol: 'a' },
        { from: q15, to: q15, symbol: 'b' },
        { from: q16, to: q13, symbol: 'a' },
        { from: q16, to: q17, symbol: 'b' },
        { from: q13, to: q13, symbol: 'a' },
        { from: q13, to: q14, symbol: 'b' },
        { from: q17, to: q17, symbol: 'a,b' },
        { from: q14, to: q15, symbol: 'b' },
        { from: q14, to: q17, symbol: 'a' }
    ];

    // Draw the transitions on the canvas
    for (let i = 0; i < transitions.length; i++) {
        //Gets the postion at the edge of the circle
        const { from, to, symbol } = transitions[i];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const angle = Math.atan2(dy, dx);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const radius = 15;
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const arrowSize = 6;

        // draw the line
        ctx.beginPath();
        ctx.moveTo(from.x + radius * cos, from.y + radius * sin);

        ctx.font = "bold 16px Helvetica";
        if (from === to) {
            // draw a loop
            const loopRadius = 11;
            const labelHeight = 2;
            const labelWidth = ctx.measureText(symbol).width;
            let loopX, loopY, labelX, labelY, loopEndAngle, loopStartAngle;
            let counterAngle = false;
            if (from.y == 163 || from.y == 83) { //if the state is above
                if (from.accepting) {
                    loopX = from.x - (loopRadius - 37);
                    loopY = from.y;
                    labelX = -labelWidth + 40;
                    labelY = labelHeight - 20;
                    loopEndAngle = 4;
                    loopStartAngle = 1 * Math.PI;
                    counterAngle = true;
                    // label the transition
                    ctx.save();
                    ctx.translate(midX, midY);
                    // Text color
                    ctx.fillStyle = "#603c2c";
                    ctx.fillText(symbol, labelX, labelY);
                    ctx.restore();
                } else {
                    loopY = from.y - (loopRadius + 10);
                    loopX = from.x;
                    labelX = -labelWidth / 2;
                    labelY = labelHeight - 40;
                    loopEndAngle = 0.75 * Math.PI;
                    loopStartAngle = 2 * Math.PI;
                    counterAngle = true;
                    // label the transition
                    ctx.save();
                    ctx.translate(midX, midY);
                    // Text color
                    ctx.fillStyle = "#603c2c";
                    ctx.fillText(symbol, labelX, labelY);
                    ctx.restore();
                }
            } else if (from.y == 243) { //if the state is below
                loopY = from.y + (loopRadius + 10);
                loopX = from.x;
                labelX = -labelWidth / 2;
                labelY = labelHeight + 45;
                loopEndAngle = 4;
                loopStartAngle = 0;
                // label the transition
                ctx.save();
                ctx.translate(midX, midY);
                // Text color
                ctx.fillStyle = "#603c2c";
                ctx.fillText(symbol, labelX, labelY);
                ctx.restore();
            }
            ctx.arc(loopX, loopY, loopRadius, loopStartAngle, loopEndAngle, counterAngle);
            ctx.stroke();

            const arrowAngle = loopEndAngle;

            // Draw an arrowhead at the end of the loop arrow

            const arrowX = loopX + loopRadius * Math.cos(arrowAngle);
            const arrowY = loopY + loopRadius * Math.sin(arrowAngle);
            const arrowPoint1X = arrowX + arrowSize * Math.cos(arrowAngle - Math.PI / 6);
            const arrowPoint1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
            const arrowPoint2X = arrowX + arrowSize * Math.cos(arrowAngle + Math.PI / 6);
            const arrowPoint2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowPoint1X, arrowPoint1Y);
            ctx.lineTo(arrowPoint2X, arrowPoint2Y);
            ctx.closePath();
            ctx.fill();

        } else {
            // Draw a regular line
            ctx.lineTo(to.x - radius * cos, to.y - radius * sin);
            ctx.stroke();

            const arrowAngle = Math.atan2(to.y - from.y, to.x - from.x);

            // Calculate the coordinates of the arrowhead
            const arrowX = to.x - radius * Math.cos(arrowAngle);
            const arrowY = to.y - radius * Math.sin(arrowAngle);
            const arrowPoint1X = arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6);
            const arrowPoint1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
            const arrowPoint2X = arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6);
            const arrowPoint2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

            // Draw the arrowhead
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowPoint1X, arrowPoint1Y);
            ctx.lineTo(arrowPoint2X, arrowPoint2Y);
            ctx.closePath();
            ctx.fill();

            // Label the transition
            ctx.save();
            ctx.translate(midX, midY);
            const labelWidth = ctx.measureText(symbol).width;
            const labelHeight = 2;
            let labelX = -labelWidth / 2;
            let labelY = labelHeight / 2;

            const labelOffset = 10; //label offset
            const labelOffsetY = 5;

            if ((from === q3 && to === q5) ||
                (from === q14 && to === q17) ||
                (from === q8 && to === q11) ||
                (from === q10 && to === q7) ||
                (from === q16 && to === q17) ||
                (from === q16 && to === q13)) {
                labelX += labelOffset; // Move the label to the right
            }

            else if ((from === q6 && to === q5) ||
                (from === q5 && to === q4) ||
                (from === q12 && to === q13) ||
                (from === q11 && to === q7) ||
                (from === q7 && to === q9) ||
                (from === q14 && to === q15) ||
                (from === q12 && to === q15)) {
                labelX -= labelOffset; // Move the label to the left
            }
            else {
                labelY -= labelOffsetY;
            }
            // Text color
            ctx.fillStyle = "#603c2c";
            ctx.fillText(symbol, labelX, labelY);
            ctx.restore();
        }
    }


    // Draw the states on the canvas
    for (let state of
        [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17]) {
        // Circles   
        ctx.beginPath();
        ctx.arc(state.x, state.y, 15, 0, 2 * Math.PI);
        ctx.stroke();
        if (state.starting) {
            // Draw a minus sign at the start state
            ctx.moveTo(state.x - 7, state.y);
            ctx.lineTo(state.x + 7, state.y);
            ctx.stroke();
        }
        else if (state.accepting) {
            // Draw a plus sign at the final state
            ctx.moveTo(state.x - 7, state.y);
            ctx.lineTo(state.x + 7, state.y);
            ctx.moveTo(state.x, state.y - 7);
            ctx.lineTo(state.x, state.y + 7);
            ctx.stroke();
        }
        else {
            ctx.font = "bold 16px Helvetica";
            const text = state === q16 ? "16" :
                state === q15 ? "15" :
                    state === q14 ? "14" :
                        state === q13 ? "13" :
                            state === q12 ? "12" :
                                state === q11 ? "11" :
                                    state === q10 ? "10" :
                                        state === q9 ? "9" :
                                            state === q8 ? "8" :
                                                state === q7 ? "7" :
                                                    state === q6 ? "6" :
                                                        state === q5 ? "5" :
                                                            state === q4 ? "4" :
                                                                state === q3 ? "3" :
                                                                    state === q2 ? "2" :
                                                                        state === q1 ? "1" :
                                                                            state === q0 ? "0" : "?";
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, state.x - textWidth / 2, state.y + 5);
        }
    }
}

function expression2() {
    expression = "expression2";

    let regexText = "Current RegEx: <span id='regexText'>(1+0)* 1* 0* (101+01+000) (1+0)* (101+00)* (111+00+101) (1+0)*</span>";
    currentRegEx.innerHTML = regexText;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define the states of the FA
    const q0 = { x: 30, y: 100, starting: true };
    const q1 = { x: 187.5, y: 100 };
    const q2 = { x: 187.5, y: 220 };
    const q3 = { x: 345, y: 100 };
    const q4 = { x: 345, y: 220 };
    const q5 = { x: 502.5, y: 100 };
    const q6 = { x: 502.5, y: 160 };
    const q7 = { x: 660, y: 100 };
    const q8 = { x: 660, y: 220, accepting: true };

    const transitions = [
        { from: q0, to: q1, symbol: '0' },
        { from: q0, to: q0, symbol: '1' },
        { from: q1, to: q2, symbol: '0' },
        { from: q2, to: q3, symbol: '0,1' },
        { from: q1, to: q3, symbol: '1' },
        { from: q3, to: q4, symbol: '0' },
        { from: q3, to: q5, symbol: '1' },
        { from: q5, to: q7, symbol: '1' },
        { from: q5, to: q6, symbol: '0' },
        { from: q6, to: q8, symbol: '0,1' },
        { from: q7, to: q8, symbol: '1' },
        { from: q7, to: q6, symbol: '0' },
        { from: q4, to: q8, symbol: '0' },
        { from: q4, to: q5, symbol: '1' },
        { from: q8, to: q8, symbol: '1,0' },
    ]

    // Draw the transitions on the canvas
    for (let i = 0; i < transitions.length; i++) {
        //Gets the postion at the edge of the circle
        const { from, to, symbol } = transitions[i];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const angle = Math.atan2(dy, dx);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const radius = 15;
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const arrowSize = 6;

        // draw the line
        ctx.beginPath();
        ctx.moveTo(from.x + radius * cos, from.y + radius * sin);

        ctx.font = "bold 16px Helvetica";
        if (from === to) {
            const loopRadius = 11;
            const labelHeight = 2;
            const labelWidth = ctx.measureText(symbol).width;
            let loopX, loopY, labelX, labelY, loopEndAngle, loopStartAngle;
            let counterAngle = false;

            if (from.y == 100) {
                loopY = from.y - (loopRadius + 10);
                loopX = from.x;
                labelX = -labelWidth / 2;
                labelY = labelHeight - 45;
                loopEndAngle = 0.75 * Math.PI;
                loopStartAngle = 2 * Math.PI;
                counterAngle = true;
                // label the transition
                ctx.save();
                ctx.translate(midX, midY);
                // Text color
                ctx.fillStyle = "#603c2c";
                ctx.fillText(symbol, labelX, labelY);
                ctx.restore();
            } else { //if the state is below
                loopY = from.y + (loopRadius + 10);
                loopX = from.x;
                labelX = -labelWidth / 2;
                labelY = labelHeight + 50;
                loopEndAngle = 4;
                loopStartAngle = 0;
                // label the transition
                ctx.save();
                ctx.translate(midX, midY);
                // Text color
                ctx.fillStyle = "#603c2c";
                ctx.fillText(symbol, labelX, labelY);
                ctx.restore();
            }
            ctx.arc(loopX, loopY, loopRadius, loopStartAngle, loopEndAngle, counterAngle);
            ctx.stroke();
            const arrowAngle = loopEndAngle;

            // Draw an arrowhead at the end of the loop arrow

            const arrowX = loopX + loopRadius * Math.cos(arrowAngle);
            const arrowY = loopY + loopRadius * Math.sin(arrowAngle);
            const arrowPoint1X = arrowX + arrowSize * Math.cos(arrowAngle - Math.PI / 6);
            const arrowPoint1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
            const arrowPoint2X = arrowX + arrowSize * Math.cos(arrowAngle + Math.PI / 6);
            const arrowPoint2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowPoint1X, arrowPoint1Y);
            ctx.lineTo(arrowPoint2X, arrowPoint2Y);
            ctx.closePath();
            ctx.fill();
        } else {
            // Draw a regular line
            ctx.lineTo(to.x - radius * cos, to.y - radius * sin);
            ctx.stroke();

            const arrowAngle = Math.atan2(to.y - from.y, to.x - from.x);

            // Calculate the coordinates of the arrowhead
            const arrowX = to.x - radius * Math.cos(arrowAngle);
            const arrowY = to.y - radius * Math.sin(arrowAngle);
            const arrowPoint1X = arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6);
            const arrowPoint1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
            const arrowPoint2X = arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6);
            const arrowPoint2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

            // Draw the arrowhead
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowPoint1X, arrowPoint1Y);
            ctx.lineTo(arrowPoint2X, arrowPoint2Y);
            ctx.closePath();
            ctx.fill();

            // Label the transition
            ctx.save();
            ctx.translate(midX, midY);
            const labelWidth = ctx.measureText(symbol).width;
            const labelHeight = 2;
            let labelX = -labelWidth / 2;
            let labelY = labelHeight / 2;

            const labelOffset = 10; //label offset
            const labelOffsetY = 5;
            if ((from === q3 && to === q4) ||
                (from === q1 && to === q2) ||
                (from === q7 && to === q8) ||
                (from === q6 && to === q8)) {
                labelX += labelOffset; // Move the label to the right
            }

            else if ((from === q2 && to === q3) ||
                (from === q5 && to === q6)) {
                labelX -= labelOffset; // Move the label to the left
            }
            else {
                labelY -= labelOffsetY;
            }
            // Text color
            ctx.fillStyle = "#603c2c";
            ctx.fillText(symbol, labelX, labelY);
            ctx.restore();
        }
    }


    // Draw the states on the canvas
    for (let state of
        [q0, q1, q2, q3, q4, q5, q6, q7, q8]) {
        // Circles    
        ctx.beginPath();
        ctx.arc(state.x, state.y, 15, 0, 2 * Math.PI);
        ctx.stroke();
        if (state.starting) {
            // Draw a minus sign at the start state
            ctx.moveTo(state.x - 7, state.y);
            ctx.lineTo(state.x + 7, state.y);
            ctx.stroke();
        }
        else if (state.accepting) {
            // Draw a plus sign at the final state
            ctx.moveTo(state.x - 7, state.y);
            ctx.lineTo(state.x + 7, state.y);
            ctx.moveTo(state.x, state.y - 7);
            ctx.lineTo(state.x, state.y + 7);
            ctx.stroke();
        }
        else {
            ctx.font = "bold 16px Helvetica";
            const text = state === q8 ? "8" :
                state === q7 ? "7" :
                    state === q6 ? "6" :
                        state === q5 ? "5" :
                            state === q4 ? "4" :
                                state === q3 ? "3" :
                                    state === q2 ? "2" :
                                        state === q1 ? "1" :
                                            state === q0 ? "0" : "?";
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, state.x - textWidth / 2, state.y + 5);
        }
    }
}