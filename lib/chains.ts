export interface Chain {
  id: number;
  name: string;
  logo: string;
  explorer: string;
  rpc: string;
  symbol: string;
  testnet?: boolean;
  isEVM: boolean;
}

export const chains: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    logo: "ethereum",
    explorer: "https://etherscan.io",
    rpc: "https://mainnet.infura.io/v3/",
    symbol: "ETH",
    isEVM: true
  },
  {
    id: 56,
    name: "BNB Chain",
    logo: "bnb",
    explorer: "https://bscscan.com",
    rpc: "https://bsc-dataseed.binance.org/",
    symbol: "BNB",
    isEVM: true
  },
  {
    id: 137,
    name: "Polygon",
    logo: "polygon",
    explorer: "https://polygonscan.com",
    rpc: "https://polygon-rpc.com",
    symbol: "MATIC",
    isEVM: true
  },
  {
    id: 42161,
    name: "Arbitrum",
    logo: "arbitrum",
    explorer: "https://arbiscan.io",
    rpc: "https://arb1.arbitrum.io/rpc",
    symbol: "ETH",
    isEVM: true
  },
  {
    id: 10,
    name: "Optimism",
    logo: "optimism",
    explorer: "https://optimistic.etherscan.io",
    rpc: "https://mainnet.optimism.io",
    symbol: "ETH",
    isEVM: true
  },
  {
    id: 8453,
    name: "Base",
    logo: "base",
    explorer: "https://basescan.org",
    rpc: "https://mainnet.base.org",
    symbol: "ETH",
    isEVM: true
  },
  {
    id: 43114,
    name: "Avalanche",
    logo: "avalanche",
    explorer: "https://snowtrace.io",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    symbol: "AVAX",
    isEVM: true
  },
  {
    id: 250,
    name: "Fantom",
    logo: "fantom",
    explorer: "https://ftmscan.com",
    rpc: "https://rpc.ftm.tools",
    symbol: "FTM",
    isEVM: true
  },
  {
    id: 1111,
    name: "WEMIX",
    logo: "wemix",
    explorer: "https://explorer.wemix.com",
    rpc: "https://api.wemix.com",
    symbol: "WEMIX",
    isEVM: true
  },
  {
    id: 7777,
    name: "STORY",
    logo: "story",
    explorer: "https://explorer.story.xyz",
    rpc: "https://rpc.story.xyz",
    symbol: "STORY",
    isEVM: true
  },
  {
    id: 2011,
    name: "Solana",
    logo: "solana",
    explorer: "https://explorer.solana.com",
    rpc: "https://api.mainnet-beta.solana.com",
    symbol: "SOL",
    isEVM: false
  },
  {
    id: 3030,
    name: "Sui",
    logo: "sui",
    explorer: "https://explorer.sui.io",
    rpc: "https://fullnode.mainnet.sui.io",
    symbol: "SUI",
    isEVM: false
  },
  {
    id: 4040,
    name: "NEAR",
    logo: "near",
    explorer: "https://explorer.near.org",
    rpc: "https://rpc.mainnet.near.org",
    symbol: "NEAR",
    isEVM: false
  }
];

export function getChainById(id: number): Chain | undefined {
  return chains.find(chain => chain.id === id);
}

export function getChainByName(name: string): Chain | undefined {
  return chains.find(chain => chain.name.toLowerCase() === name.toLowerCase());
}

export function getExplorerAddressUrl(chain: Chain, address: string): string {
  return `${chain.explorer}/address/${address}`;
}

export function getEVMChains(): Chain[] {
  return chains.filter(chain => chain.isEVM);
}

export function getNonEVMChains(): Chain[] {
  return chains.filter(chain => !chain.isEVM);
} 