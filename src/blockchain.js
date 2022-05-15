const crypto = require('crypto')

class Block {
    constructor(_index, _hash, _previousHash, _timestamp, _data){
        this.index = _index,
        this.hash = _hash,
        this.previousHash = _previousHash
        this.timestamp = _timestamp
        this.data = _data
    }
}

const calculateHash = (index, previousHash, timestamp, data) => {
    return (
        crypto.createHmac('sha256',Buffer.from('ingoo'))
            .update(index + previousHash + timestamp + data)
            .digest('hex')
    )
}

const createGenesisBlock = () => {
    const index = 0
    const timestamp = 0
    const previousHash = '0'.repeat(64)
}

console.log(calculateHash(1,2,'3','asdf'))
