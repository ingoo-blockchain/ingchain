const Block = require('../src/block/Block')
const assert = require('assert')

describe('Block', () => {
    let data,genesis,block
    const blocks = []

    before( ()=>{
        data = 'ingoo'
        genesis = Block.genesis()
        block = Block.generateBlock(genesis, 'ingoo')
        blocks.push(genesis)
        blocks.push(block)
    } )

    beforeEach( ()=>{
        
    })
    
    it('제네시스 블록 해쉬 검사', () => {
        assert.equal(genesis.previousHash,'0'.repeat(64))
    })

    it('2번째 블록 `data` 확인하기', () => {
        assert.equal(block.data, 'ingoo')
    })

    it('2번째 블록 `previousHash` 값 확인하기',() => {
        assert.equal(block.previousHash, genesis.hash)
    })

    it('3번째 블록 생성하기',() => {
        const prevIndex = blocks.length-1
        const generate = Block.generateBlock(blocks[prevIndex],'3번째에에')
        assert.equal(generate.index, prevIndex+1)
    })

})