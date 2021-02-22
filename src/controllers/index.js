'use strict';

const request = require('request');

function getResult(x) {
    return new Promise(resolve => {
        resolve(x);
    });
}

async function requestsController(req, res) {
    const route = req.baseUrl + "" + req.url;
    var PORT;
    var service;

    if (req.params['notification'] != undefined) {
        PORT = 4447;
        service = 'anyjs_observer';
    }
    else{
        PORT = 4445;
        service = 'anyjs_server';
    }

    var result = await requestHandle(req, route, PORT, service);

    if (typeof result === "string")
        result = JSON.parse(result);

    const status = result.status;
    delete result.status;

    res.status(status).send(result);
}

async function requestHandle(req, route, PORT, service) {
    return new Promise(function (resolve) {

        let result;
        switch (req.method) {
            case 'POST':
                request.post(`http://${service}:${PORT}${route}`, {
                    json: req.body
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
                break;
            case 'GET':
                request.get(`http://${service}:${PORT}${route}`, (error, res, body) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    (async () => {
                        result = await getResult(body);

                        resolve(result);
                    })();
                });
                break;
            case 'DELETE':
                request.delete(`http://${service}:${PORT}${route}`, (error, res, body) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    (async () => {
                        result = await getResult(body);

                        resolve(result);
                    })();
                });
                break;

            default:
                break;
        }

    });
}

module.exports = {
    requestsController
};
