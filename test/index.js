'use strict';

const execute1 = require('./instantiate.js');
const execute = require('./execute.js');

const jsonFunc = {
    "executionName": "",
    "parameterValue": 1
}

async function tasksThreaded() {
    execute(jsonFunc).then(result => console.log(result));
    execute1(jsonFunc).then(result => console.log(result));
}

tasksThreaded();
