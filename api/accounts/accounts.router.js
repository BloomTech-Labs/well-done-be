const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Accounts = require('./accounts.model.js');
const { authenticate } = require('../middleware/middleware');
const { generateToken } = require('../auth/auth.helpers');
const { validateAccount, validateUpdate } = require('../middleware/middleware');

// GET to /api/accounts
// ! supposed to be only for superusers
router.get('/', authenticate, async (req, res) => {
	try {
		const accounts = await Accounts.find();
		res.status(200).json(accounts);
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});

// GET to /api/accounts/1
router.get('/:account_id', authenticate, (req, res) => {
	const { account_id } = req.params;
	Accounts.findById(account_id)
		.then(acc => {
			console.log('acc', acc);
			if (acc) {
				res.status(200).json(acc);
			} else {
				res.status(404).json({ message: 'Could not find acc with given id.' });
			}
		})
		.catch(err => {
			res.status(500).json(err.message);
		});
});

// GET by org_id
router.get('/org/:orgId', authenticate, (req, res) => {
	const { orgId } = req.params;
	console.log(orgId);
	Accounts.findByOrgId(orgId)
		.then(org => {
			if (org) {
				res.status(200).json(org);
			} else {
				res.status(404).json({ message: 'Could not find org with given id.' });
			}
		})
		.catch(err => {
			res.status(500).json(err.message);
		});
});

// POST to /api/accounts
// ! supposed to be only for superusers (for now)
router.post('/', validateAccount, async (req, res) => {
	try {
		console.log(req.body);
		const account = req.body;
		const { email_address } = req.body;
		const hash = bcrypt.hashSync(account.password, 10); // 2 ^ n
		account.password = hash;
		const isUniqueEmail = await Accounts.findBy({ email_address });
		if (isUniqueEmail === 0) {
			const foundAccount = await Accounts.insert(account);
			const token = await generateToken(foundAccount);
			res.status(200).json({
				token,
				...foundAccount['0']
			});
		} else {
			res.status(404).json({
				message: 'Email address already taken, please enter a unique email'
			});
		}
	} catch (err) {
		console.log(err.message);
		res
			.status(500)
			.json({ error: err.message, message: 'Error creating account' });
	}
});

// PUT to /api/accounts/3
router.put('/:account_id', authenticate, validateUpdate, async (req, res) => {
	try {
		const { account_id } = req.params;
		const changes = req.body;
		await Accounts.update(account_id, changes);
		const updatedAccount = await Accounts.findById(account_id);
		console.log(updatedAccount);
		res.status(200).json(updatedAccount);
	} catch (err) {
		console.log(err.message);
		res.status(400).json(err.message);
	}
});

// update password only
router.put(
	'/password/:account_id',
	authenticate,
	validateUpdate,
	async (req, res) => {
		try {
			const { account_id } = req.params;
			const changes = req.body;
			const hash = bcrypt.hashSync(changes.password, 10); // 2 ^ n
			changes.password = hash;
			const updated = await Accounts.update(account_id, changes);
			if (updated === 1) {
				res.status(200).json({ message: 'Account edited successfully.' });
			} else {
				res.status(400).json({ message: 'Account not found.' });
			}
		} catch (err) {
			console.log(err.message);
			res.status(500).json(err.message, 'Error updating password');
		}
	}
);

//end test section

// DELETE to /api/accounts/4
router.delete('/:account_id', authenticate, async (req, res) => {
	try {
		const { account_id } = req.params;
		const removedAccount = await Accounts.findById(account_id);
		await Accounts.remove(account_id);
		res.status(200).json(removedAccount);
	} catch (err) {
		console.log(err.message);
		res.status(500).json(err.message);
	}
});

// GET to /api/accounts/theemail/1
router.get('/theemail/:email_address', (req, res) => {
	const { email_address } = req.params;
	Accounts.findByTheEmail(email_address)
		.then(acc => {
			if (acc) {
				res.status(200).json(acc);
			} else {
				res
					.status(404)
					.json({ message: 'Could not find acc with given email.' });
			}
		})
		.catch(err => {
			res.status(500).json(err.message);
		});
});

module.exports = router;
