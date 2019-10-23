
const request = require('supertest'); // calling it "request" is a common practice

const server = require('./server'); 

describe('server.js', ()=> {
    describe('GET /', ()=> {
        it('should return 200 OK status', 
            // async 
            ()=> {
            return request(server) //return is very important here
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
            // const expectedStatusCode = 200;
            // const response = await request(server).get('/');
            // expect(response.status).toEqual(expectedStatusCode);
        });

        it('should return it is working', async ()=> {
            const res = await request(server).get('/');
            expect(res.body).toEqual("it's working!!!");
        })

        it('should return a JSON object from the index route', 
        // async 
        ()=> {
            // const response = await request(server).get('/')
            // expect(response.type).toEqual('application/json')
            request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                    done();
                })
        })
    })
})

describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('GET /', () => {
    it('should return status 200', async () => {
      const expectedStatusCode = 200;

      // do a get request to our api (server.js) and inspect the response
      const response = await request(server).get('/');

      expect(response.status).toEqual(expectedStatusCode);

      // same test using promise .then() instead of async/await
      // let response;
      // return request(server).get('/').then(res => {
      //   response = res;

      //   expect(response.status).toEqual(expectedStatusCode);
      // })
    });

    it('should return a JSON object with right content', async () => {
      const expectedBody = "Welcome to the Jungle";

      const response = await request(server).get('/');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return JSON format', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
  });
});




