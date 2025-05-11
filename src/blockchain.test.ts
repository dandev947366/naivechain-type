import { Block } from "./block";
import { 
    genesisBlock, 
    getBlockchain, 
    getLatestBlock, 
    addBlock, 
    generateNextBlock,
    blockchain
} from "./blockchain";
import { isValidNewBlock } from "./validations";
import { calculateHash } from "./utils";

describe("Blockchain", () => {
    beforeEach(() => {
        // Reset blockchain to genesis before each test
        blockchain.length = 0;
        blockchain.push(Block.GENESIS_BLOCK);
    });

    describe("Genesis Block", () => {
        test("should have correct genesis block", () => {
            expect(genesisBlock.index).toBe(0);
            expect(genesisBlock.previousHash).toBe("");
            expect(genesisBlock.data).toBe("Genesis Block");
        });

        test("genesis block should be immutable", () => {
            expect(Object.isFrozen(genesisBlock)).toBe(true);
            // Ensure we can't modify properties of genesis block
            expect(() => {
                (genesisBlock as any).data = "New Data";  // Try to modify
            }).toThrow();
        });
    });

    describe("getBlockchain()", () => {
        test("should return the blockchain array", () => {
            const chain = getBlockchain();
            expect(Array.isArray(chain)).toBe(true);
            expect(chain.length).toBe(1);
            expect(chain[0]).toEqual(genesisBlock);
        });

        test("returned blockchain should be immutable", () => {
            const chain = getBlockchain();
            expect(() => {
                (chain as any).push({}); // Type assertion to bypass TypeScript
            }).toThrow();
        });

        test("blockchain should contain the genesis block initially", () => {
            const chain = getBlockchain();
            expect(chain[0]).toEqual(genesisBlock);
        });
    });

    describe("getLatestBlock()", () => {
        test("should return genesis block initially", () => {
            expect(getLatestBlock()).toEqual(genesisBlock);
        });

        test("should return the last block after additions", () => {
            const newBlock = new Block(
                1,
                Block.GENESIS_BLOCK.hash,
                Date.now(),
                "Test Data"
            );
            newBlock.hash = newBlock.calculateHash(); // ✅ Calculate the correct hash
        
            addBlock(newBlock);
            const latest = getLatestBlock();
        
            // Check properties, not object reference
            expect(latest.index).toBe(1);
            expect(latest.previousHash).toBe(Block.GENESIS_BLOCK.hash);
            expect(latest.data).toBe("Test Data");
        });
        

        test("should return correct block when multiple blocks are added", () => {
            const newBlock1 = new Block(1, genesisBlock.hash, Date.now(), "Test Data 1");
            const newBlock2 = new Block(2, newBlock1.hash, Date.now(), "Test Data 2");

            addBlock(newBlock1);
            addBlock(newBlock2);

            expect(getLatestBlock()).toEqual(newBlock2);
        });
    });

    describe("addBlock()", () => {
        test("should add a valid block to the blockchain", () => {
            const newBlock = new Block(1, genesisBlock.hash, Date.now(), "Test Data");
            addBlock(newBlock);
            expect(getBlockchain().length).toBe(2);
            expect(getLatestBlock()).toEqual(newBlock);
        });

        test("should throw error when adding invalid block", () => {
            const newBlock = new Block(0, "", Date.now(), "Invalid Block");
            expect(() => addBlock(newBlock)).toThrow("Invalid block");
        });
    });
});
