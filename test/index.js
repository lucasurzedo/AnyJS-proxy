'use strict';

const anyjs = require('../src/index.js');
const path = require('path');

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

function tasksThreaded(){

    let i = 0;
    let workerPath;
    let json;

    if(isMainThread){
        for (i; i < 2; i++) {
            if (i % 2 == 0) {
                workerPath = path.resolve('test/instantiate.js');
                json = object;
            }
            else {
                workerPath = path.resolve('test/execute.js');
                json = jsonFunc
            }
            const worker = new Worker(workerPath, { workerData : json})

            worker.on('message', (message) =>{
                console.log(message);
            });

            worker.on('error', console.error);

            worker.on('exit', code => {
                if (code !== 0) console.log(new Error(`Worker stopped with error code ${code}`));
            })
        }
    }
};

tasksThreaded();

// async function testeBubbleSort(input) {
//     let machines = await anyjs.startAnyJS();

//     let tickets = [];
//     for (let index = 0; index < 100; index++) {
//         tickets[index] = await anyjs.executeAccess(input, machines);
//         console.log(tickets[index]);
//     }
    
//     for (let index = 99; index >= 0; index--) {
//         console.log(await anyjs.getResult(tickets[index]));
//     }

//     anyjs.endServer();
// }

// async function instantiateVar(object) {
//     let machines = await anyjs.startAnyJS();

//     let result;
//     let cont = 0;
//     while(cont < 10){
//         let nickname = "example" + cont;
//         object.nickname = nickname;
//         result = await anyjs.instantiateObject(object, machines);
//         console.log(result);
//         cont++;
//     }

//     cont = 0;
//     while(cont < 10){
//         const nickname = {
//             "nickname" : "example" + cont
//         }
//         result = await anyjs.getObject(nickname, machines);
//         console.log(result);
//         cont++;
//     }

//     anyjs.endServer();
// }


