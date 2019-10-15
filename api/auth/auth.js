const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Accounts = require('../accounts/accounts.model');

// register account
router.post('/', async (req, res) => {
    try {
        let account = req.body;
        const hash = bcrypt.hashSync(account.password, 8);
        account.password = hash;
        const accountCreated = await Accounts.insert(account);
        res.status(201).json(accountCreated);
    } catch (err) {
        console.log(err);
    }
});

// log in account


module.exports = router;