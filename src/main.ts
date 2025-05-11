import express from 'express'; // Correct default import
import bodyParser from 'body-parser'; // Correct default import
import { generateNextBlock, getBlockchain } from './blockchain';
import { Block } from './block';
import { connectToPeers, getSockets, initP2PServer } from './p2p';

const httpPort: number = parseInt(process.env.HTTP_PORT || '3001', 10);
const p2pPort: number = parseInt(process.env.P2P_PORT || '6001', 10);

// Initialize HTTP server
const initHttpServer = (myHttpPort: number): void => {
    const app = express();
    app.use(bodyParser.json());

    // Endpoint to get all blocks
    app.get('/blocks', (req, res) => {
        res.send(getBlockchain());
    });

    // Endpoint to mine a new block
    app.post('/mineBlock', (req, res) => {
        const newBlock: Block = generateNextBlock(req.body.data);
        res.send(newBlock);
    });

    // Endpoint to get all peers
    app.get('/peers', (req, res) => {
        res.send(getSockets().map((s: any) => `${s._socket.remoteAddress}:${s._socket.remotePort}`));
    });

    // Endpoint to add a peer
    app.post('/addPeer', (req, res) => {
        connectToPeers(req.body.peer);
        res.send();
    });

    // Start the HTTP server
    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};

// Initialize HTTP and P2P servers
initHttpServer(httpPort);
initP2PServer(p2pPort);
