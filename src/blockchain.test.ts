import { Block } from './block';
import { generateNextBlock, getLatestBlock, blockchain } from './blockchain';
import {calculateHash} from './utils'

// Update your test to work with Block instances
describe('Blockchain', () => {
    it('should have a valid genesis block', () => {
        const genesis = new Block(
            0,
            '',
            Date.now(),
            'my genesis block!!'
        );
        genesis.hash = genesis.calculateHash();
        
        expect(genesis.index).toBe(0);
        expect(genesis.previousHash).toBe('');
        expect(genesis.data).toBe('my genesis block!!');
        expect(genesis.hash).toBe(genesis.calculateHash());
    });
});