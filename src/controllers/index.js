'use strict';

const request = require('request');

function getResult(x) {
    return new Promise(resolve => {
        resolve(x);
    });
}

async function requestsController (req, res) {
    const route = req.baseUrl + "" + req.url;
    
    var result = await requestHandle(req, route);

    if(typeof result === "string")
        result = JSON.parse(result);
    
    const status = result.status;
    delete result.status;

    res.status(status).send(result);
}

async function requestHandle(req, route) {
    return new Promise(function (resolve) {

        let result;
        switch (req.method) {
            case 'POST':
                request.post(`http://35.247.213.148:4445${route}`, {
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
                request.get(`http://35.247.213.148:4445${route}`, (error, res, body) => {
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
                request.delete(`http://35.247.213.148:4445${route}`, (error, res, body) => {
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
