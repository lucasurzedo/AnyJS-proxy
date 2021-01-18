const { Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const request = require('request');

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
        for (let index = 0; index < 5; index++) {
            let executionName = "bubble" + index;
            request.get(`http://192.168.2.10:4446/api/anyJS/execute/task/bubbleSort/execution/${executionName}`, (error, res, body) => {
                if (error) {
                    console.error(error);
                    return;
                }
                (async () => {
                    result = await getResult(body);

                    console.log(result);
                })();
            });
        }

        parentPort.postMessage("Ends instantiate");
    })();
}

function getResult(x) {
    return new Promise(resolve => {
        resolve(x);
    });
}


module.exports = instantiate;