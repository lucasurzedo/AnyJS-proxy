const { Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const anyjs = require('../src/index.js');

const instantiate = workerData => {
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
        parentPort.postMessage("Ends instantiate");
    })();
}

module.exports = instantiate;