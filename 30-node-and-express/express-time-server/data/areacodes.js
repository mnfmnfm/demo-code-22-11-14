const stateToCodes = require('./areacodes.json');
console.log(stateToCodes);
const codeToState = {};
for (let state in stateToCodes) {
    for (let code of stateToCodes[state]) {
        codeToState[code] = state;
    }
}

module.exports = {stateToCodes, codeToState};