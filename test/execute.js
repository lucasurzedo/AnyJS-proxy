const { Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const anyjs = require('../src/index.js');

const execute = workerData => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
        });
    });
};

if(!isMainThread){
    (async () => {
        const json = workerData;
        let machines = await anyjs.startAnyJS(3001);

        let tickets = [];
        for (let index = 0; index < 100; index++) {
            tickets[index] = await anyjs.executeAccess(json, machines);
            console.log(tickets[index]);
        }

        for (let index = 99; index >= 0; index--) {
            console.log(await anyjs.getResult(tickets[index]));
        }

        anyjs.endServer();
        parentPort.postMessage("Ends Execute");
    })();
}

module.exports = execute;