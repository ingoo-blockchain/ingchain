const Block = require('./block')

class BlockChain{
    constructor(){
        this.blocks = [ Block.genesis() ]
    }

    getBlocks(){
        return this.blocks
    }

    lastBlock(){
        const { length } = this.blocks
        return this.blocks[length-1]
    }

    addBlock(data){
        const block = Block.generateBlock(this.lastBlock(), data)
        this.blocks.push(block)
        return block
    }

    /**
     * 블록을 새로 추가하기전 블럭 검증
     * [1] 블록인덱스는, 이전 인덱스보다 +1 만큼 커야한다.
     * [2] 이전블록 해시값은 블록이 생성되는 previousHash 값과 같다
     * [3] 현재블록 해시값 내용과, 현재블록으로 다시만든 해시값이 같은지 체크한다. 
     * @param { Block } previousBlock 
     * @param { Block } nextBlock 
     * @return Object
     */
    isValidNewBlock(previousBlock, nextBlock){
        const { index, previousHash ,timestamp, data, hash } = previousBlock
        if ( !isValidBlockStructure(nextBlock) ) 
            return { result:false, msg:'블럭 내용이 옳바르지 않습니다.' }
        else if( index !== nextBlock.index + 1 ) 
            return { result:false, msg:'index 값이 맞지 않습니다.' }
        else if( hash !== nextBlock.previousHash ) 
            return { result:false, msg:'이전블록 해시 값과 다음블록 이전해시값이 맞지 않습니다.' }
        else if(  Block.calculateHash(index, previousHash, timestamp , data) !== nextBlock.hash )
            return { result:false, msg:'nextBlock 의 해시값이 이상합니다.' }

        return { result:true, msg:null }
    }   

    isValidGenesis(block){
        return JSON.stringify( block ) === JSON.stringify( Block.genesis() )
    }

    isValidBlockStructure = (block) => {
        return (
            typeof block.index === 'number' 
            && typeof block.hash === 'string'
            && typeof block.previousHash === 'string'
            && typeof block.timestamp === 'number'
            && typeof block.data === 'string'
        )
    }

    isValidChain(blocks){
        if( !this.isValidGenesis(this.blocks[0]) ) return
        
        for(let i=1; i<blocks.length; i++){
            const nextBlock = blocks[i]
            const previousBlock = blocks[i-1]
            
            switch(true){
                case nextBlock.previousHash !== previousBlock.hash :
                case nextBlock.hash !== Block.blockHash(nextBlock) :
                    return false
            }
        }

        return true
    }

    replaceChain(newBlocks){
        if(newBlocks.length <= this.blocks.length ){
            return {result:false, msg:'새로받은 블럭이 내블록보다 짧습니다.'}
        } else if (!this.isValidChain(newBlocks)) {
            return {result:false, msg:'새로받은 블록이 유효하지않습니다.'}
        }

        this.blocks = newBlocks
        return {result:true, msg:'블록을 교체합니다.'}
    }

}

module.exports = BlockChain