# Dolomite Trade Path POC

This project demonstrates how to use the Dolomite Zap SDK to find optimal trading paths between tokens on Arbitrum.

## Setup

1. Clone the repository:
```bash
git clone git@github.com:buendiadas/dolomite-trade-path-poc.git
cd dolomite-trade-path-poc
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file and fill in your values:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your configuration:
- `NETWORK_ID`: The network ID (42161 for Arbitrum)
- `SUBGRAPH_URL`: Your The Graph API URL
- `ETHEREUM_NODE_URL`: Your QuickNode or other RPC provider URL
- `ACCOUNT_WALLET_ADDRESS`: Your wallet address

## Usage

Run the script to find trading paths:
```bash
npm start
```

## Example Output

The script will show available trading paths for swapping tokens. Here's an example output:

```
Getting swap paths...
Network: 42161
Node URL: https://your-node-url.arbitrum-mainnet.quiknode.pro/...

Swap parameters:
From: USDC Amount: 1000000000
To: WETH Min Expected: 500000000000000000

Swap paths found: 2

Path 1:
Market Path: [ '17', '0' ]
Expected Output: 601884649492809648

Trader 1:
Type: 0
Address: 0xd991d9E0a22a51391c25B258eeF8C1c4a392383a
Name: Paraswap
Trade Data: [hex data...]

Path 2:
Market Path: [ '17', '0' ]
Expected Output: 598943823634634112

Trader 1:
Type: 0
Address: 0x2cdBb25b4aca98a55F6B1A0f67d9f43455e67f3c
Name: Odos
Trade Data: [hex data...]
```

## Configuration

The script is configured to:
- Swap 1000 USDC (6 decimals) for a minimum of 0.5 WETH (18 decimals)
- Use a slippage tolerance of 0.3% (30 basis points)
- Cache results for 1 hour
- Use a gas multiplier of 2x

You can adjust these parameters in the code or environment variables.

## Dependencies

- `@dolomite-exchange/zap-sdk`: Dolomite Zap SDK
- `ethers`: Ethereum library
- `dotenv`: Environment variable management
- `ts-node`: TypeScript execution
- `typescript`: TypeScript compiler 