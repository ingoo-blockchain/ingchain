const Block = require('../src/block/block')
const BlockChain = require('../src/block/blockchain')
const assert = require('assert')

describe('BlockChain', ()=>{
    let bc1, bc2
    beforeEach( ()=>{
        bc1 = new BlockChain()
        bc2 = new BlockChain()
    } )

    it('제네시스 블록 검증', ()=>{
        assert.equal(JSON.stringify( bc1.blocks[0] ), JSON.stringify( Block.genesis() ))
    })

    it('마지막 블록 가져오기', ()=>{
        bc1.lastBlock()
    })

    it('블록생성 검증하기', ()=>{
        const data = '두번째 블럭'
        bc1.addBlock(data)
        const lastBlock = bc1.lastBlock()
        
        assert.equal(lastBlock.data, data)
    })

    it('체인 검사하기 ', ()=>{
        bc2.addBlock('테스트 블록')
        const result = bc1.isValidChain(bc2.blocks) 
        assert.equal(result, true)
    })

    it('bc2 블록내용을 강제로바꿔서 검사하기', ()=>{
        bc2.addBlock('테스트 블록')
        bc2.blocks[1].data = '바꿔~'
        const result = bc1.isValidChain(bc2.blocks) 
        assert.equal(result, false)
    })
})