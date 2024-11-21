import BigNumber from "bignumber.js"
import { ethers } from "ethers"

export default class Amount {
  // Full precision amount
  private amount: BigNumber

  constructor(
    amount: string | number | BigNumber | ethers.BigNumberish,
    private _decimalPlaces: number,
    readable?: boolean
  ) {
    const value = this.toBigNumber(amount)

    const _readable = typeof readable === "boolean" ? readable : value.toFixed().split(".").length !== 1

    if (_readable) this.amount = this.toBigNumber(amount).shiftedBy(_decimalPlaces).dp(0)
    else this.amount = this.toBigNumber(amount).dp(0)
  }

  public static fromAmount(amount: Amount) {
    return new Amount(amount.toIntegerString(), amount._decimalPlaces, false)
  }

  public static select(...amounts: (Amount | null | undefined)[]) {
    for (const amount of amounts) {
      if (!amount || !Amount.isAmount(amount)) continue

      return amount
    }
  }

  public static isAmount(amount: Amount) {
    return amount.toReadableString().toLowerCase() !== "nan"
      && amount.toReadable().lt(Number.POSITIVE_INFINITY)
      && amount.toReadable().gt(Number.NEGATIVE_INFINITY)
  }

  public toReadable() {
    return this.amount.shiftedBy(-this._decimalPlaces)
  }

  public setDecimals(decimals: number) {
    const raw = this.amount.shiftedBy(-this._decimalPlaces)

    this._decimalPlaces = decimals

    this.amount = raw.shiftedBy(decimals).dp(0)

    return this
  }

  public toReadableString() {
    return this.toReadable().toFixed()
  }

  public toInteger() {
    return this.amount.dp(0)
  }

  public toIntegerString() {
    return this.amount.toFixed(0)
  }

  public toBigInt() {
    return BigInt(this.amount.toFixed(0))
  }

  public toIntegerNumber() {
    return this.amount.dp(0).toNumber()
  }

  public lt(amount: Amount) {
    return this.toInteger().lt(amount.toInteger())
  }

  public gt(amount: Amount) {
    return this.toInteger().gt(amount.toInteger())
  }

  public lte(amount: Amount) {
    return this.toInteger().lte(amount.toInteger())
  }

  public gte(amount: Amount) {
    return this.toInteger().gte(amount.toInteger())
  }

  public eq(amount: Amount) {
    return this.toInteger().eq(amount.toInteger())
  }

  private toBigNumber(amount: BigNumber | ethers.BigNumberish | number | string) {
    return new BigNumber(amount.toString())
  }
}
