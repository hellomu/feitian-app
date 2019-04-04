const bcrypt = require('bcrypt')

const enctypt = async (password, saltRounds) => { //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(password, salt);
    return {hash, salt}
}

module.exports = {
    enctypt
}