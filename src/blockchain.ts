import {Block} from "./block";
import { IBlock } from "./interface";
import {isValidNewBlock} from './validations'
import {calculateHash} from './utils'
// Blockchain state
let blockchain: Readonly<IBlock>[] = [Block.GENESIS_BLOCK];
const genesisBlock: IBlock = Block.GENESIS_BLOCK;
const getBlockchain = (): Readonly<IBlock>[] => {
    // Return a deep-frozen copy
    const copy = JSON.parse(JSON.stringify(blockchain));
    return Object.freeze(copy);
};
const getLatestBlock = (): Readonly<IBlock> => blockchain[blockchain.length - 1];
const addBlock = (newBlock: Block): void => {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
    }
};
const generateNextBlock = (blockData: string): Block => {
    const previousBlock: Readonly<IBlock> = getLatestBlock()
    const nextIndex: number = previousBlock.index + 1
    const nextTimestamp: number = Math.floor(Date.now()/1000)
    if (typeof blockData !== 'string' || blockData.length === 0){
        throw new Error('Invalid block data: must be a non-empty string')
    }
    const nextHash: string = calculateHash(
        nextIndex,
        previousBlock.hash,
        nextTimestamp,
        blockData
    )
    const newBlock: Block = new Block(
        nextIndex,
        previousBlock.hash,
        nextTimestamp,
        blockData,
        nextHash
    )
    if (!isValidNewBlock(newBlock, previousBlock)){
        throw new Error('Invalid block: fails validation')
    }
    addBlock(newBlock)
    return newBlock;
}

export {
    genesisBlock,
    getBlockchain,
    getLatestBlock,
    addBlock,
    generateNextBlock,
    blockchain
}