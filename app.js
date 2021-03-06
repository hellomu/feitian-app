const Koa = require('koa')
const config = require('./config')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const koaJwt = require('koa-jwt');
const tokenError = require('./app/middleware/tokenError');
const projcetsRouter = require('./rotes/api/projectsRouter')
const usersRouter = require('./rotes/api/usersRouter')

const app = new Koa()

mongoose.connect(config.db, { useNewUrlParser: true }, err => {
    if (err) {
        console.error(err)
        return err
    } else {
        console.log('Connecting database successfully')
    }
})

app.use(cors())
app.use(bodyParser())


app.use(koaJwt({
  secret: config.secret
}).unless({
  path: [/^\/user\/login/, /^\/user\/register/, /^\/user\/accountvalid/]
}))
app.use(tokenError())

app.use(projcetsRouter.routes()).use(projcetsRouter.allowedMethods())
app.use(usersRouter.routes()).use(usersRouter.allowedMethods())

app.listen(config.port)
// module.exports = app