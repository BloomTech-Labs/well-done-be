const db = require('../../data/dbConfig')
const History = require('./history.model')

// ALL TESTS PASSING :)
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
                reported_percent: 34
            })

            await History.insert({
                date: "2019-10-23",
                count: 2,
                total: 78945622,
                status: 2,
                sensor_id: 1,
                reported_percent: 55
            })

            const history = await db('history')
            expect(history).toHaveLength(2)
            expect(history[0].date).toBe('2019-10-22')
            expect(history[0].reported_percent).toBe(34)
            expect(history[1].reported_percent).toBe(55)
            expect(history[1].date).toBe('2019-10-23')
        })
    })
})
