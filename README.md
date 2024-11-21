
# Ethers Utils Library

A lightweight utility library for enhanced interactions with Ethereum and EVM-compatible networks, built on top of Ethers.js v6. This library provides abstractions and utilities to simplify common tasks such as working with addresses, amounts, networks, and providers.

## Table of contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
    - [Address Utilities](#address-utilities)
    - [Amount Handling](#amount-handling)
    - [Predefined Networks](#predefined-networks)
    - [Ethers Providers](#ethers-providers)
- [API Reference](#api-reference)
- [License](#license)

## Features

- **Address Utilities**: Validate, compare, and manipulate Ethereum addresses.
- **Amount Handling**: Simplify interactions with numeric values (e.g., token amounts).
- **Predefined Networks**: Access a collection of predefined Ethereum and EVM-compatible networks.
- **Provider Abstraction**: Easily configure and use fallback providers with public and private RPC endpoints.

## Installation

Install the library via npm...
```shell
npm add @safeblock/ethers-utils
```

...or any other package manager you like:
```shell
yarn[pnpm, etc..] install @safeblock/ethers-utils
```

## Usage

### Address Utilities

The `Address` utility provides methods to validate and interact with Ethereum addresses.

```typescript
import { Address } from "@safeblock/ethers-utils"

// Validate an address
const isValid = Address.isAddressLike("0x123...abc") // true or false

// Check equality
const isEqual = Address.equal("0x123...abc", "0x123...ABC") // true

// Check if an address is in an array
const isInArray = Address.inArray("0x123...abc", [ "0xabc...123", "0x123...abc" ]) // true
```

### Amount Handling

The `Amount` utility simplifies working with token amounts by handling precision and conversions.

```typescript
import { Amount } from "@safeblock/ethers-utils"

// Initialize an amount
const amount = new Amount("1000", 6, false)

// Convert to readable format
console.log(amount.toReadableString()) // '0.001'

// Compare amounts
const isGreater = amount.gt(new Amount("500", 6)) // true
```

### Predefined Networks

Easily access common Ethereum and EVM-compatible networks.

```typescript
import { mainnet, bnb, networksList } from "@safeblock/ethers-utils"

// Get network details
console.log(mainnet.name) // "mainnet"
console.log(bnb.chainId)  // 56
```

### Ethers Providers

Use the `ethersProvider` utility to create fallback providers with built-in public RPC endpoints.

```typescript
import { ethersProvider, mainnet } from "@safeblock/ethers-utils"

const provider = ethersProvider(mainnet)
console.log(await provider.getBlockNumber()) // Fetch the latest block number
```

To configure private endpoints for a specific network, add the following to the environment before building:

```dotenv
EUTILS_ETHERS_PROVIDERS_NODE_MAINNET=https://private-node-url.com/key
```

In this example, `MAINNET` is the name of the network. 

## API Reference

### `Address`

- **`isAddressLike(value: unknown): boolean`**: Validates if a string is a valid Ethereum address.
- **`equal(valueA: unknown, valueB: unknown): boolean`**: Checks if two addresses are equal.
- **`inArray(address: string, array: string[]): boolean`**: Checks if an address exists in a given array.
- **`zeroAddress: string`**: Represents the zero address (`0x000...000`).

### `Amount`

- **`new Amount(value, decimals, readable?)`**: Constructs an `Amount` instance.
- **`toReadableString(): string`**: Converts the amount to a readable string.
- **`toIntegerString(): string`**: Converts the amount to an integer string.
- **Comparison methods**: `gt`, `lt`, `gte`, `lte`, `eq`.

### `ethersProvider`

- **`ethersProvider(network: Network): FallbackProvider`**: Returns a fallback provider for the specified network.

### `Networks`

- Predefined networks: `mainnet`, `bnb`, `matic`, `optimism`, `arbitrum`, `avalanche`.
- **`networksList`**: A set of all predefined networks.

## License
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](LICENSE)
