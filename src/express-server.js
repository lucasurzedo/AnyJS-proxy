'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');

exports.setupApp = async function setupApp() {
    app.use(express.json());

    app.use('/api/anyJS/v1', routes);

	return app;
};
