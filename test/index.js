'use strict';

const instantiate = require('./instantiate.js');
const execute = require('./execute.js');

const { Worker, isMainThread, parentPort, workerData} = require('worker_threads');

const jsonFunc = {
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

async function tasksThreaded(){
    execute(jsonFunc).then(result => console.log(result));
    instantiate(object).then(result => console.log(result));
}

tasksThreaded();
