'use strict';

const jscl = require('../index.js');

const json = {
    "nickname": "bubbleSort",
    "input": [4, 3, 5, 2, 12, 14, 51, 23, 99, 110, 1, 7, 11, 20],
    "async": "true",
    "storage": "ram"
}

async function bubbleSort(input) {
    let machines = await jscl.startJSCL();

    let tickets = [];
    for (let index = 0; index < 5; index++) {
        tickets[index] = await jscl.executeAccess(input, machines);
        console.log(tickets[index]);
    }

    for (let index = 0; index < 5; index++) {
        console.log(await jscl.getResult(tickets[index]));
    }

    jscl.endServer();
}

bubbleSort(json);
