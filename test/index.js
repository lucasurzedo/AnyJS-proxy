'use strict';

const instantiate = require('./instantiate.js');
const execute = require('./execute.js');
const anyjs = require('../src/index.js');

const { Worker, isMainThread, parentPort, workerData} = require('worker_threads');

const jsonFunc = {
    "executionName": "",
    "parameterValue": [
        32,
        41,
        1,
        5,
        8,
        9,
        1
    ]
}

const bubbleSort = {
    "name": "bubbleSort",
    "parameter": "inputArr",
    "language": "javascript",
    "author": "tester",
    "content": {
        "code": "let len = inputArr.length; for (let i = 0; i < len; i++) { for (let j = 0; j < len; j++) { if (inputArr[j] > inputArr[j + 1]) { let tmp = inputArr[j]; inputArr[j] = inputArr[j + 1]; inputArr[j + 1] = tmp; } } } return inputArr;",
        "args": "inputArr"
    },
    "async": "false"
}

const globalVar = {
    "name": "Carro",
    "type": "Object",
    "author": "tester",
    "content": {
        "cor": "branco",
        "ano": 2021,
        "marca": "fiat"
    },
    "async": "true"
}

async function tasksThreaded() {
    execute(jsonFunc).then(result => console.log(result));
    //instantiate(object).then(result => console.log(result));
}

tasksThreaded();
