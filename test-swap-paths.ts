import { BigNumber as ZapBigNumber, DolomiteZap, ZapOutputParam } from '@dolomite-exchange/zap-sdk';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'NETWORK_ID',
  'SUBGRAPH_URL',
  'ETHEREUM_NODE_URL',
  'WETH_MARKET_ID',
  'USDC_MARKET_ID',
  'INPUT_AMOUNT',
  'MIN_OUTPUT_AMOUNT',
  'ACCOUNT_WALLET_ADDRESS'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

async function getSwapPaths() {
  // Initialize Zap SDK
  const zap = new DolomiteZap({
    network: parseInt(process.env.NETWORK_ID!),
    subgraphUrl: process.env.SUBGRAPH_URL!,
    web3Provider: new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_NODE_URL!),
    cacheSeconds: 3600, // 1 hour
    defaultIsLiquidation: false,
    defaultSlippageTolerance: 0.003, // 30 basis points
    defaultBlockTag: 'latest',
    useProxyServer: false,
    gasMultiplier: new ZapBigNumber(2),
  });

  try {
    console.log('Getting swap paths...');
    console.log('Network:', process.env.NETWORK_ID);
    console.log('Node URL:', process.env.ETHEREUM_NODE_URL);

    // Test parameters
    const fromToken = {
      marketId: new ZapBigNumber(process.env.USDC_MARKET_ID!),
      symbol: 'USDC',
    };

    const toToken = {
      marketId: new ZapBigNumber(process.env.WETH_MARKET_ID!),
      symbol: 'WETH',
    };

    // Get amounts from environment
    const inputAmount = new ZapBigNumber(process.env.INPUT_AMOUNT!);
    const minOutputAmount = new ZapBigNumber(process.env.MIN_OUTPUT_AMOUNT!);

    console.log('\nSwap parameters:');
    console.log('From:', fromToken.symbol, 'Amount:', inputAmount.toString());
    console.log('To:', toToken.symbol, 'Min Expected:', minOutputAmount.toString());

    // Get swap paths
    const results = await zap.getSwapExactTokensForTokensParams(
      fromToken,
      inputAmount,
      toToken,
      minOutputAmount,
      process.env.ACCOUNT_WALLET_ADDRESS!,
      { 
        isLiquidation: false,
      },
    );

    console.log("\nSwap paths found:", results.length);
    
    results.forEach((result: ZapOutputParam, index: number) => {
      console.log(`\nPath ${index + 1}:`);
      console.log('Market Path:', result.marketIdsPath.map(id => id.toString()));
      console.log('Expected Output:', result.expectedAmountOut.toString());
      
      result.traderParams.forEach((trader, traderIndex) => {
        console.log(`\nTrader ${traderIndex + 1}:`);
        console.log('Type:', trader.traderType);
        console.log('Address:', trader.trader);
        console.log('Name:', trader.readableName);
        console.log('Trade Data:', trader.tradeData);
      });
    });

    return results;
  } catch (error: any) {
    console.error('Error getting swap paths:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
}

// Run the query
getSwapPaths()
  .then(() => console.log('\nQuery completed successfully'))
  .catch(error => console.error('\nQuery failed:', error)); 