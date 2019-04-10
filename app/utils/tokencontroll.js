const jwt = require('jsonwebtoken')

const secret = 'feitianyxgs'
function addToken(userInfo) {
    const token = jwt.sign({
        user: userInfo.phone,
        id: userInfo.userId
    }, secret, {expiresIn: '24h'})
    return token
}

function tokenValid(tokens) {
    if (tokens) {
        let token = tokens.split(' ')[1]
        let decoded = jwt.decode(token, secret)
        return decoded
    }
}

module.exports = {
    addToken,
    tokenValid
}

