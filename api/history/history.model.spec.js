const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

// const db = require('../../data/dbConfig')
const History = require('./history.model')

describe('history model', ()=> {
    beforeEach(async () => {
        await db('history').truncate();
      });
    describe('insert()', () => {
        it('should insert the provided history into the db', async() => {
            await History.insert({
                date: "2019-10-22",
                count: 1,
                total: 7894566,
                status: 1,
                sensor_id: 1,
                pad_seconds: 40002,
                pad_counts: 152,
                reported_percent: 34
            })

            await History.insert({
                date: "2019-10-23",
                count: 2,
                total: 78945622,
                status: 2,
                sensor_id: 1,
                pad_seconds: 40003,
                pad_counts: 153,
                reported_percent: 55
            })

            const history = await db('history')
            expect(history).toHaveLength(0)
            expect(history[0].date).toBe('2019-10-22')
            expect(accounts[0].reported_percent).toBe(34)
            expect(accounts[1].reported_percent).toBe(55)
            expect(accounts[1].date).toBe('2019-10-23')
        })
    })
})



