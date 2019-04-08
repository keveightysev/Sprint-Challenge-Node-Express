const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const projects = await Projects.get();
		res.status(200).json(projects);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error loading the projects' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const project = await Projects.get(req.params.id);

		if (project) {
			res.status(200).json(project);
		} else {
			res.status(404).json({ message: 'Project not found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error loading the project information' });
	}
});

router.post('/', async (req, res) => {
	if (!req.body.name || !req.body.description) {
		res.status(406).json({ message: 'Please enter a name or description' });
		return;
	}
	try {
		const project = await Projects.insert(req.body);
		res.status(201).json(project);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'ERror adding project' });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const project = await Projects.update(req.params.id, req.body);
		if (project) {
			res.status(200).json(project);
		} else {
			res.status(404).json({ message: 'The project could not be found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error updating the project information' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const count = await Projects.remove(req.params.id);
		if (count > 0) {
			res.status(200).json({ message: 'The project has been deleted' });
		} else {
			res.status(500).json({ message: 'The project could not be found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error removing the project' });
	}
});

router.get('/:id/actions', async (req, res) => {
	try {
		const actions = await Projects.getProjectActions(req.params.id);
		if (actions.length) {
			res.status(200).json(actions);
		} else {
			res.status(422).json({ message: 'No actions found for this Project' });
		}
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({ message: 'Server error retrieving project actions' });
	}
});

module.exports = router;
