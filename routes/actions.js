const express = require('express');

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const actions = Actions.get();
		res.status(200).json(actions);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error loading actions' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const action = await Actions.get(req.params.id);
		if (action) {
			res.status(200).json(action);
		} else {
			res.status(404).json({ message: 'Action not found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving action information' });
	}
});

router.post('/', async (req, res) => {
	if (!req.body.project_id || !req.body.description || !req.body.notes) {
		res
			.status(406)
			.json({ message: 'Please enter a project ID, description, or notes' });
		return;
	}
	try {
		const action = await Actions.insert(req.body);
		res.status(201).json(action);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error adding action' });
	}
});

router.put('/:id', async (req, res) => {
	if (!req.body.project_id || !req.body.description || !req.body.notes) {
		res
			.status(406)
			.json({ message: 'Please enter a project ID, description, or notes ' });
		return;
	}
	try {
		const action = await Actions.update(req.params.id, req.body);
		if (action) {
			res.status(200).json(action);
		} else {
			res.status(404).json({ message: 'Cannot find action' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error updating the action' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const count = await Actions.remove(req.params.id);
		if (count > 0) {
			res.status(200).json({ message: 'The action has been deleted' });
		} else {
			res.status(404).json({ message: 'The action could not be found' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error deleting the action' });
	}
});

module.exports = router;
