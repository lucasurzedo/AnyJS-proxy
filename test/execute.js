const { workerData, parentPort } = require('worker_threads')
const anyjs = require('../src/index.js');

const json = workerData;

async function execute(json) {
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
    return "Ends Execute";
}

(async () => {
    const result = await execute(json);
    parentPort.postMessage(result);
})();

