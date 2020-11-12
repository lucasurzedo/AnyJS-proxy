const { workerData, parentPort } = require('worker_threads')
const anyjs = require('../src/index.js');

const json = workerData;

async function instantiate(json) {
    let machines = await anyjs.startAnyJS(3002);

    let result;
    let cont = 0;
    while(cont < 10){
        let nickname = "example" + cont;
        json.nickname = nickname;
        result = await anyjs.instantiateObject(json, machines);
        console.log(result);
        cont++;
    }

    cont = 0;
    while(cont < 10){
        const nickname = {
            "nickname" : "example" + cont
        }
        result = await anyjs.getObject(nickname, machines);
        console.log(result);
        cont++;
    }

    anyjs.endServer();
    return "Ends Instantiate";
}

(async () => {
    const result = await instantiate(json);
    parentPort.postMessage(result);
})();
