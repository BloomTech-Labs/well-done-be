const request = require('supertest'); 
const server = require('../server')

describe("accounts.router.js", () => {
    describe('GET /api/accounts', ()=> {
        it('should return 200 OK status', ()=> {
            return request(server)
            .get('/api/accounts')
            .then(res => {
                console.log(res.status)
                expect(res.status).toEqual(200)
            })
        })

        it('should return JSON format', async ()=> {
            const response = await request(server).get("/api/accounts");
            expect(response.type).toEqual("application/json")
        })
    })
})