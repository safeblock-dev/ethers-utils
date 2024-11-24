import { FallbackProvider, JsonRpcProvider, Network } from "ethers"
import { arbitrum, avalanche, bnb, mainnet, optimism, matic, networksList } from "./networks"

/** List of the public EVM provider URLs for supported chains */
const providersList: Map<string, string[]> = new Map([
  [bnb.name, [
    "https://bsc-dataseed.bnbchain.org",
    "https://bsc-dataseed1.bnbchain.org",
    "https://bsc-dataseed2.bnbchain.org",
    "https://bsc-dataseed3.bnbchain.org",
    "https://bsc-dataseed4.bnbchain.org"
  ]],
  [optimism.name, [
    "https://mainnet.optimism.io",
    "https://rpc.ankr.com/optimism",
    "https://1rpc.io/op"
  ]],
  [avalanche.name, [
    "https://api.avax.network/ext/bc/C/rpc",
    "https://1rpc.io/avax/c",
    "https://rpc.ankr.com/avalanche",
    "https://avalanche.public-rpc.com",
    "https://avalanche-c-chain-rpc.publicnode.com"
  ]],
  [arbitrum.name, [
    "https://arb1.arbitrum.io/rpc",
    "https://rpc.ankr.com/arbitrum",
    "https://1rpc.io/arb",
    "https://arbitrum.meowrpc.com",
    "https://arbitrum.drpc.org"
  ]],
  [matic.name, [
    "https://polygon-rpc.com",
    "https://rpc.ankr.com/polygon",
    "https://1rpc.io/matic",
    "https://polygon.meowrpc.com",
    "https://polygon.drpc.org"
  ]],
  [mainnet.name, [
    "https://1rpc.io/eth",
    "https://rpc.ankr.com/eth",
    "https://cloudflare-eth.com",
    "https://eth.meowrpc.com",
    "https://eth.nownodes.io"
  ]]
])

/**
 * Create ethers FallbackProvider from public provider URLs
 *
 * Injects a private node at the top (priority = 1) if configured in the environment
 *
 * @param network
 */
function createFallbackProvider(network: Network) {
  // Get a list of public provider URLs
  const publicNetworkProviders = providersList.get(network.name)

  if (!publicNetworkProviders) throw new Error("Unsupported network: " + network.name)

  // Insert a private node if configured
  //const privateNode = String(
  //  (import.meta as any)?.env?.[`EUTILS_ETHERS_PROVIDERS_NODE_${ network.name.toUpperCase() }`] ?? ""
  //)

  const networkProviders = [...publicNetworkProviders]
    .filter(providerUrl => providerUrl.length > 0)

  // Create the fallback provider
  return new FallbackProvider(networkProviders.map((providerUrl, index) => ({
    provider: new JsonRpcProvider(providerUrl, network.chainId, { staticNetwork: network }),
    priority: index + 1,
    //weight: privateNode && index === 0 ? 2 : 1
    weight: 1
  })))
}

/** Map of all fallback providers created */
const fallbackProviders: Map<string, FallbackProvider> = new Map(Array.from(networksList).map(network => [
  network.name,
  createFallbackProvider(network)
]))

/**
 * Get a public provider of relative network
 *
 * @param network
 */
export default function ethersProvider(network: Network): FallbackProvider | null {
  const provider = fallbackProviders.get(network.name)

  if (!provider) throw new Error("Unsupported network: " + network.name)

  return provider
}
