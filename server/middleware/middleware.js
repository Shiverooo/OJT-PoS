const cors = require('cors');
const logger = require('morgan');
const express = require('express');

module.exports = (app) => {
    const corsOption = {origin: 'http://localhost:3000', credentials: 'true'};
    app.use(cors(corsOption));
    app.use(logger("dev"));
}


