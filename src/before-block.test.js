const assert = require('assert')

describe('블록구조 테스트', () => {
    class Block {
        constructor({_index, _hash, _previousHash, _timestamp, _data}){
            this.index = _index,
            this.hash = _hash,
            this.previousHash = _previousHash
            this.timestamp = _timestamp
            this.data = _data
        }
    }

    let calculateHash
    let timestamp
    let getLatestBlock
    let generateBlock
    let isValidNewBlock
    let isValidBlockStructure
    let isValidChain
    let replaceChain 
    let getBlocks
    const blocks = []

    it('해쉬만드는 함수 테스트', () => {
        const crypto = require('crypto')

        calculateHash = ({_index, _previousHash, _timestamp, _data}) => {
            return (
                crypto.createHmac('sha256',Buffer.from('ingoo'))
                    .update(_index + _previousHash + _timestamp + _data)
                    .digest('hex')
            )
        }

        const result = calculateHash({_index:'a',_previousHash:'0'.repeat(64),_timestamp:'asdf',_data:'asdfasdf'})
        assert.equal(result.length,64)
    })

    it('타임스탬프 만들기 테스트', () => {
        timestamp = () => Math.floor(new Date().getTime() / 1000)

        // console.log(timestamp)
    })

    it('타임스탬프 에서 날짜로 변환하기 테스트', ()=> {
        const moment = require('moment')
        const timestamp = Math.floor(new Date().getTime() / 1000)
        const dateString = moment.unix(timestamp).format("YYYY-MM-DD")
        
        // console.log(dateString)
    })

    it('제네시스 블록 저장시키기', () => {
        const info = {}
        info._index = 0
        info._previousHash = '0'.repeat(64)
        info._timestamp = timestamp()
        info._data = 'new gensisblock'
        info._hash = calculateHash(info)
        const genesisBlock = new Block(info)
        blocks.push(genesisBlock)

        // console.log(blocks) 
    })

    it('마지막 블록 가져오기', () => {
        getLatestBlock = () => {
            return blocks[blocks.length - 1]
        }

        console.log(getLatestBlock())
    })

    it('블록 생성 함수 만들어보기', ()=>{
        generateBlock = (_data) => {
            const info = {}
            const prevBlock = getLatestBlock() 
            info._index = prevBlock.index + 1
            info._timestamp = timestamp()
            info._previousHash = prevBlock.hash
            info._data = _data
            info._hash = calculateHash(info)
            
            return new Block(info)
        }

         blocks.push( generateBlock('testtest') )
         blocks.push( generateBlock('asdfasdfasdf') )
         blocks.push( generateBlock('sdfgsdfgsdfg') )
         blocks.push( generateBlock('sdfgsdfgsfdgsdf') )
         blocks.push( generateBlock('werwerwerwerewr') )

         console.log(blocks)
    })

    it('블록 검사 하기', () => {
        // 1. 블록인덱스는, 이전 인덱스보다 +1 만큼 커야한다.
        // 2. 이전블록 해시값은 블록이 생성되는 previousHash 값과 같다
        // 3. hash 블록 자체가 유효해야한다.
        isValidNewBlock = (newBlock, prevBlock) => {
            const validate = {
                _index:newBlock.index, 
                _previousHash:newBlock.previousHash,
                _timestamp:newBlock.timestamp,
                _data:newBlock.data
            }
            if (prevBlock.index+1 !== newBlock.index ) {
                console.log('index값이 맞지않다.')
                return false
            } else if (prevBlock.hash !== newBlock.previousHash) {
                console.log('이전해쉬값이 맞지않다.')
                return false
            } else if ( calculateHash(validate) !== newBlock.hash ) {
                console.log(typeof (newBlock.hash), typeof calculateHash(validate))
                console.log('두 해쉬가 맞지않음. :', (newBlock.hash), calculateHash(validate))
                return false
            }
            return true
        }
        // console.log( ' check : ',blocks[0].index+1 !== blocks[1].index)
        // console.log( isValidNewBlock( blocks[1], blocks[0] ) )
    })

    it('블록 데이터 타입 검사', () => {
        isValidBlockStructure = (block) => {
            return (
                typeof block.index === 'number' 
                && typeof block.hash === 'hash'
                && typeof block.previousHash === 'string'
                && typeof block.timestamp === 'number'
                && typeof block.data === 'string'
            )
        }

        console.log(blocks[0])
    })

    it('전체 블록 검사하기', () => {
        isValidChain = (blockchainToValidate) => {
            const isValidGenesis = (block) => {
                return JSON.stringify(block) === JSON.stringify(genesisBlock)
            }

            if (!isValidGenesis(blockchainToValidate[0])) {
                return false;
            }

            for (let i = 1; i < blockchainToValidate.length; i++) {
                if (!isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
                    return false;
                }
            }
            return true;
        }

        isValidGenesis[0]
    })

    it('전체 블록체인 불러오기', () => {
        getBlocks = () => {
            return blocks
        }
    })

    it('가장 긴체인 선택하기', () => {
        replaceChain = (newBlocks) => {
            if ( isValidChain(newBlocks)  &&  newBlocks.length > blocks.length){
                blocks = newBlocks
                console.log(' 블록체인을 교체합니다. ')  
            } else {
                console.log(' 유효한 블록체인이 아닙니다. ')
            }
        }
    })
});