'use strict';

var BROADCAST_ADDR_LIN = "172.17.255.255";
var BROADCAST_ADDR_WIN = "255.255.255.255";
var PORT = 3003;
const request = require('request');
const udp = require('dgram');
const server = udp.createSocket('udp4');
var machines = new Map();
var machineNumber = 1;

async function discoveryResult() {
    console.log("Number of machines on network: " + machines.size);
    if (machines.size > 0)
        console.log(machines);
}

function getRandomKey(collection) {
    let index = Math.floor(Math.random() * collection.size);
    let cntr = 0;
    for (let key of collection.keys()) {
        if (cntr++ === index) {
            return key;
        }
    }
}

async function broadcast() {
    server.setBroadcast(true);
    var message = Buffer.from("Broadcast message!");
    server.send(message, 0, message.length, PORT, BROADCAST_ADDR_LIN, function () {
        console.log("Sent '" + message + "'");
    });

    server.send(message, 0, message.length, PORT, BROADCAST_ADDR_WIN);
}

async function discoveryController(portDiscover) {
    return new Promise(function (resolve) {
        server.on('error', function (error) {
            console.log('Error: ' + error);
            server.close();
        });

        server.on("message", function (message) {
            machines.set(`${message}`, machineNumber);
            machineNumber++;
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
            broadcast();
            setTimeout(discoveryResult, 5000);
            (async () => {
                const result = await getMachines(machines);
                resolve(result);
            })();
        });

        server.bind(portDiscover);
    });
}

function endServer() {
    server.close();
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

async function storageStoreControllerClient(req) {
    return new Promise(async function (resolve) {
        const route = 'api/storage/store';
        var key = machines.keys().next().value;

        machines.delete(key);
        machines.set(key, 'idle');
        const result = await requestHandle(req, key, route);
        resolve(result);
    });
}

async function storageAccessControllerClient(req) {
    return new Promise(async function (resolve) {
        const route = 'api/storage/access';
        var key = machines.keys().next().value;

        machines.delete(key);
        machines.set(key, 'idle');
        const result = await requestHandle(req, key, route);
        resolve(result);
    });
}

function executeStoreControllerClient(req) {
    return new Promise(async function (resolve) {
        const route = 'api/execute/store';
        var key = machines.keys().next().value;

        machines.delete(key);
        machines.set(key, 'idle');
        const result = await requestHandle(req, key, route);
        resolve(result);
    });
}

async function executeAccessControllerClient(req) {
    return new Promise(async function (resolve) {
        const route = 'api/execute/access';
        var key = machines.keys().next().value;
        
        machines.delete(key);
        machines.set(key, 'idle');
        const result = await requestHandle(req, key, route);
        resolve(result);
    });
}

async function getResultController(ticket) {
    return new Promise(async function (resolve) {
        const route = 'api/getresult';

        const result = await requestHandle(ticket, ticket.address, route);
        resolve(result);
    });
}

async function requestHandle(req, address, route) {
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
    discoveryController,
    storageStoreControllerClient,
    storageAccessControllerClient,
    executeStoreControllerClient,
    executeAccessControllerClient,
    getResultController
};
