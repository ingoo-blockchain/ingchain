const utils = require('../utils/blockUtils')

class Block {
    constructor(_index, _previousHash, _timestamp, _data, _hash){
        this.index = _index,
        this.hash = _hash,
        this.previousHash = _previousHash
        this.timestamp = _timestamp
        this.data = _data
    }

    toString(){
        // 구현가능한가?
    }

    // 제네시스 블록 만들기
    static genesis(){
        const _index = 0
        const _previousHash = '0'.repeat(64)
        const _timestamp = 1652500215
        const _data = '"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"'
        const _hash = this.calculateHash(_index,_previousHash,_timestamp,_data)
        return new this(_index, _previousHash, _timestamp, _data, _hash)
    }

    static calculateHash(_index, _previousHash, _timestamp, _data){
        return utils.hash(`${_index}${_previousHash}${_timestamp}${_data}`)
    }

    static blockHash(block){
        const {index, previousHash, timestamp, data} = block
        return this.calculateHash(index, previousHash, timestamp, data)
    }

    static timestamp = () => Math.floor(new Date().getTime() / 1000)

    static generateBlock = (previousBlock,data) => {
        const _index = previousBlock.index + 1
        const _previousHash = previousBlock.hash
        const _timestamp = this.timestamp()
        const _data = data
        const _hash = this.calculateHash(_index,_previousHash,_timestamp,_data)
        return new this(_index, _previousHash, _timestamp, _data, _hash)
    }
}



module.exports = Block

