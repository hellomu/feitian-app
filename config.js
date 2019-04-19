module.exports = {
    port:80,
    db:'mongodb://localhost:27017/feitiandb',
    saltRounds: 10,
    secret: 'feitianappkey',
    tokenExpiresTime: 60*60,
    issuer: 'feitianAdmin'
}