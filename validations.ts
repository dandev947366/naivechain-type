import { calculateHash, calculateHashForBlock } from "./utils";
import { IBlock } from "./interface";
// Block validation
const isValidNewBlock = (newBlock: IBlock, previousBlock: IBlock): boolean => {
    if (previousBlock.index + 1 !== newBlock.index) {
      console.log("invalid index");
      return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
      console.log("invalid previousHash");
      return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
      console.log("invalid hash");
      return false;
    }
    return true;
  };
  
  // Chain validation
const isValidChain = (blockchainToValidate: IBlock[]): boolean => {
    const isValidGenesis = (block: IBlock): boolean => {
      return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };
    if (!isValidGenesis(blockchainToValidate[0])) {
      console.log("Invalid genesis block");
      return false;
    }
  
    for (let i = 1; i < blockchainToValidate.length; i++) {
      if (!isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
        return false;
      }
    }
    return true;
  };
  
export {isValidNewBlock, isValidChain }