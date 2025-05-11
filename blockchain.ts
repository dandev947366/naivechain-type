import {Block} from "./block";
import { IBlock } from "./interface";

// Initialize blockchain with the Genesis Block
let blockchain: Readonly<IBlock>[] = [Block.GENESIS_BLOCK];
export const getBlockchain = (): Readonly<IBlock>[] => blockchain;
export const getLatestBlock = (): Readonly<IBlock> =>
  blockchain[blockchain.length - 1];
