'use strict';

var BROADCAST_ADDR_LIN = "172.17.255.255";
var BROADCAST_ADDR_WIN = "255.255.255.255";
var PORT = 3003;
const request = require('request');
const udp = require('dgram');
const server = udp.createSocket('udp4');
var machines = new Map();

async function discoverResult() {
    console.log("Number of machines on network: " + machines.size);
    if (machines.size > 0)
        console.log(machines);
}

async function broadcastNew() {
    server.setBroadcast(true);
    var message = Buffer.from("Broadcast message!");
    server.send(message, 0, message.length, PORT, BROADCAST_ADDR_LIN, function () {
        console.log("Sent '" + message + "'");
    });

    server.send(message, 0, message.length, PORT, BROADCAST_ADDR_WIN);
}

// function isIpValido(ip) {
//     const regex = new RegExp('/^((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5]))$|^$/');
//     return regex.test(ip);
// }

async function discoverController() {
    return new Promise(function (resolve) {
        server.on('error', function (error) {
            console.log('Error: ' + error);
            server.close();
        });

        server.on("message", function (message) {
            machines.set(`${message}`, 'idle');
            // if (isIpValido(message.toString)) {
            //     console.log(`Novo ip adicionado ${message} - Numero de maquinas na rede ${machines.size}`);
            // }
        });

        server.on('listening', function () {
            var address = server.address();
            var port = address.port;
            var family = address.family;
            var ipaddr = address.address;
            console.log('Server is listening at port : ' + port);
            console.log('Server ip : ' + ipaddr);
            console.log('Server is IP4/IP6 : ' + family);
            console.log('Starting the discovery...');
            broadcastNew();
            setTimeout(discoverResult, 5000);
            (async () => {
                const result = await getMachines(machines);
                resolve(result);
            })();
        });

        server.bind(3001);
    });
}

function endServer() {
    server.close();
}

function storageStoreControllerClient(req, res) {

}

function getMachines(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 5000);
    });
}

function getResult(x) {
    return new Promise(resolve => {
        resolve(x);
    });
}

function storageAccessControllerClient(req, res) {

}

function executeStoreControllerClient(req, res) {

}

async function executeAccessControllerClient(req) {
    return new Promise(function (resolve) {
        const route = 'api/execute/access';

        var result;
        for (var [key, value] of machines) {
            if (value == 'idle') {
                machines.set(key, 'working');
                console.log(machines);
                (async () => {
                    result = await requestHandle(req, key, route);
                    machines.set(key, 'idle');
                    resolve(result);
                })();
                break;
            }
        }
    });
}

async function getResultController(ticket) {
    return new Promise(function (resolve) {
        const route = 'api/getresult';

        var result;
        for (var [key, value] of machines) {
            if (value == 'idle') {
                machines.set(key, 'working');
                (async () => {
                    result = await requestHandle(ticket, ticket.address, route);
                    machines.set(key, 'idle');
                    resolve(result);
                })();
            }
        }
    });
}

function requestHandle(req, address, route) {
    return new Promise(function (resolve) {

        let result;
        request.post(`http://${address}:4445/${route}`, {
            json: req
        }, (error, res, body) => {
            if (error) {
                console.error(error);
                return;
            }
            (async () => {
                result = await getResult(body);

                resolve(result);
            })();
        });
    });
}

module.exports = {
    endServer,
    discoverController,
    storageStoreControllerClient,
    storageAccessControllerClient,
    executeStoreControllerClient,
    executeAccessControllerClient,
    getResultController
};
