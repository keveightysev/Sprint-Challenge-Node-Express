const express = require('express');
const cors = require('cors');

const projectsRouter = require('./routes/projects.js');
const actionsRouter = require('./routes/actions.js');

const server = express();

server.use(express.json());

server.use(cors());

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

server.get('/', (req, res, next) => {
	res.send(`
        <h2>This is my server</h2>
        <p>There are others like it but this one is mine</p>
    `);
});

module.exports = server;
