export interface IBlock {
    readonly index: number; //block's position in the chain
    hash: string; // cryptographic hash of the current block
    readonly previousHash: string; // hash of the previous block in the chain
    readonly timestamp: number; // representing milliseconds since epoch
    readonly data: string; // block's transaction data 
  }