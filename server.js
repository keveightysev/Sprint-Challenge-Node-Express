const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res, next) => {
	res.send(`
        <h2>This is my server</h2>
        <p>There are others like it but this one is mine</p>
    `);
});

module.exports = server;
