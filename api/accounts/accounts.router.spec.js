const request = require('supertest'); 

const accounts = require('./accounts.model.js')

describe("accounts.router.js", () => {
    describe('GET /api/accounts', ()=> {
        it('should return 200 OK status', ()=> {
            return request(accounts)
            .get('/api/accounts')
            .then(res => {
                expect(res.status).toEqual(200)
            })
        })

        it('should return JSON format', async ()=> {
            const response = await request(accounts).get("/api/accounts");
            expect(response.type).toEqual("application/json")
        })
    })
})