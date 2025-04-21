const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const app = express();

module.exports = () => {
    const corsOption = {origin: 'http://localhost:3000'};
    app.use(cors(corsOption));
    app.use(logger("dev"));
}


