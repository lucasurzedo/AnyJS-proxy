'use strict';

const controllers = require('./controllers');

async function startJSCL() {
    const machines = await controllers.discoverController();
    return machines.size;
}

async function getResult(ticket) {
    const result = await controllers.getResultController(ticket);
    return result;
}

async function executeAccess(req, machines) {
    if (machines > 0) {
        const result = await controllers.executeAccessControllerClient(req);
        return result;
    }
    else {
        console.log('There must be a cluster on the network');
        return null;
    }
}

async function instantiateObject(req, machines) {
    if (machines > 0) {
        const result = await controllers.storageStoreControllerClient(req);
        return result;
    }
    else {
        console.log('There must be a cluster on the network');
        return null;
    }
}

function endServer() {
    console.log('Closing server...');
    controllers.endServer();
}

module.exports = {
    endServer,
    startJSCL,
    executeAccess,
    getResult,
    instantiateObject
}
