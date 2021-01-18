const { Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const request = require('request');

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
        var results = []
        const json = workerData;
        
        for (let index = 0; index < 5; index++) {
            json.executionName = "bubble" + index
            request.post(`http://192.168.2.10:4446/api/anyJS/execute/task/bubbleSort/execution`, {
                json: json
                }, (error, res, body) => {
                if (error) {
                    console.error(error);
                    return;
                }
                (async () => {
                    result = await getResult(body);
                    console.log(result);

                    results.push(result);
                })();
            });
        }

        parentPort.postMessage("Ends Execute");
    })();
}

function getResult(x) {
    return new Promise(resolve => {
        resolve(x);
    });
}

module.exports = execute;