const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

// const db = require('../../data/dbConfig')
const Accounts = require('./accounts.model')

describe('accounts model', ()=> {
    beforeEach(async () => {
        await db('accounts').truncate();
      });
    describe('insert()', () => {
        it('should insert the provided account into the db', async() => {
            await Accounts.insert({
                org_id: 1,
				first_name: 'Smith',
				last_name: 'McGee2',
				email_address: 'abc@email.comjjjrrrrsssfff',
				password: 'test',
				mobile_number: '1-888-888-88889777766',
				super_user: false,
				org_user: true,
				org_admin: true
            })

            await Accounts.insert({
                org_id: 1,
				first_name: 'Hong',
				last_name: 'Tran',
				email_address: 'htran@gmail.com',
				password: 'testtest',
				mobile_number: '774-290-38008',
				super_user: false,
				org_user: true,
				org_admin: true
            })

            const accounts = await db('accounts')
            expect(accounts).toHaveLength(2)
            expect(accounts[0].first_name).toBe('Smith')
            expect(accounts[0].email_address).toBe('abc@email.comjjjrrrrsssfff')
            expect(accounts[1].email_address).toBe('htran@gmail.com')
            expect(accounts[1].first_name).toBe('Hong')
        })
    })
})

