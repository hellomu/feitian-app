const request = require('supertest')
const app = require('../app')

describe('#test koa app', () =>{
    let server = app.listen(9900)
    discribe('#test server', async() => {
        let res = await request(server)
            .post('/users/accountvalid')
            .send({
                account: 18507139543,
                password: 430051
            })
            .end({
                
            })
    })
})