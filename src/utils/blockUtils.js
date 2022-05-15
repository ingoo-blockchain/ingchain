const SHA256 = require('crypto-js/sha256')

const hash = (data) => SHA256(JSON.stringify(data)).toString()

module.exports = {
    hash
}