import * as CryptoJS from "crypto-js";
import { IBlock } from "./interface";
// Hashing
const calculateHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: any
  ): string => {
    return CryptoJS.SHA256(
      index + previousHash + timestamp + JSON.stringify(data)
    ).toString();
  };
  
const calculateHashForBlock = (block: IBlock): string => {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
  };
  
export {
    calculateHash,
    calculateHashForBlock
}