import { Network } from "ethers"

// Default networks (defined by ethers)
export const bnb = Network.from(56)

export const optimism = Network.from(10)

export const matic = Network.from(137)

export const arbitrum = Network.from(42161)

export const mainnet = Network.from(1)

// Custom networks (not defined by ethers)
export const avalanche = new Network("avalanche", 43114)

export const networksList: Set<Network> = new Set([
  bnb,
  optimism,
  matic,
  arbitrum,
  mainnet,
  avalanche
])
