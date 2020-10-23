'use strict';

const { instantiateObject } = require('../src/index.js');
const jscl = require('../src/index.js');

const json = {
    "nickname": "bubbleSort",
    "input": [4, 3, 5, 2, 12, 14, 51, 23, 99, 110, 1, 7, 11, 20],
    "async": "true",
    "storage": "ram"
}

const object = {
    "nickname": "example",
    "car": "Uno",
    "brand": "Fiat",
    "color": "Red",
    "year": 2009
}

async function bubbleSort(input) {
    let machines = await jscl.startJSCL();

    let tickets = [];
    for (let index = 0; index < 5000; index++) {
        tickets[index] = await jscl.executeAccess(input, machines);
        console.log(tickets[index]);
    }

    for (let index = 0; index < 5000; index++) {
        console.log(await jscl.getResult(tickets[index]));
    }

    jscl.endServer();
}

async function instantiate(object) {
    let machines = await jscl.startJSCL();
    const result = await jscl.instantiateObject(object, machines);

    console.log(result);

    jscl.endServer();
}

bubbleSort(json);

//instantiate(object);
