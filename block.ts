import * as CryptoJS from "crypto-js";
import { IBlock } from "./interface";
export class Block implements IBlock {
  public readonly index: number;
  public hash: string;
  public readonly previousHash: string;
  public readonly timestamp: number;
  public readonly data: string;

  constructor(
    index: number,
    previousHash: string,
    timestamp: number,
    data: string,
    hash?: string
  ) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash ?? this.calculateHash();
  }
  public calculateHash(): string {
    return CryptoJS.SHA256(
      this.index + this.previousHash + this.timestamp + this.data
    ).toString();
  }
  public static readonly GENESIS_BLOCK: Readonly<IBlock> = Object.freeze(
    new Block(
      0,
      "",
      1465154705,
      "my genesis block!!",
      "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"
    )
  );
}
