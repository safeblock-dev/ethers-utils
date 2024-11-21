class StaticAddress {
  public static isAddressLike(value: unknown) {
    if (
      !value
      || String(value).length < 3
      || String(value).replace(/[^0-9A-z]/g, "").length !== String(value).length
    ) return false

    if (String(value).length !== 42) return false
    return String(value).slice(0, 2).toLowerCase() === "0x"
  }

  public static equal(valueA: unknown, valueB: unknown) {
    if (!StaticAddress.isAddressLike(valueA) || !StaticAddress.isAddressLike(valueB)) return false

    if (valueA === Address.zeroAddress || valueB === Address.zeroAddress) return false

    return String(valueA).toLowerCase() === String(valueB).toLowerCase()
  }

  public static inArray(address: string, array: string[]) {
    return array.map(i => i.toLowerCase()).includes(address.toLowerCase())
  }

  public static lt(valueA: unknown, valueB: unknown) {
    if (!StaticAddress.isAddressLike(valueA) || valueA === Address.zeroAddress) return false
    if (!StaticAddress.isAddressLike(valueB) || valueB === Address.zeroAddress) return false

    return Number(valueA) < Number(valueB)
  }

  public static gt(valueA: unknown, valueB: unknown) {
    if (!StaticAddress.isAddressLike(valueA) || valueA === Address.zeroAddress) return false
    if (!StaticAddress.isAddressLike(valueB) || valueB === Address.zeroAddress) return false

    return Number(valueA) > Number(valueB)
  }

  public static lte(valueA: unknown, valueB: unknown) {
    return StaticAddress.equal(valueA, valueB) || StaticAddress.lt(valueA, valueB)
  }

  public static gte(valueA: unknown, valueB: unknown) {
    return StaticAddress.equal(valueA, valueB) || StaticAddress.gt(valueA, valueB)
  }
}

export default class Address extends StaticAddress {
  public static zeroAddress = "0x0000000000000000000000000000000000000000"

  private readonly _address: string = Address.zeroAddress

  constructor(addressLike: string) {
    super()

    if (Address.isAddressLike(addressLike)) this._address = addressLike.toLowerCase()
  }

  public isAddressLike(value: unknown) {
    return StaticAddress.isAddressLike(value)
  }

  public equalTo(value: unknown) {
    return StaticAddress.equal(this._address, value)
  }

  public inArray(array: string[]) {
    return StaticAddress.inArray(this._address, array)
  }

  public lt(value: unknown) {
    return StaticAddress.lt(this._address, value)
  }

  public gt(value: unknown) {
    return StaticAddress.gt(this._address, value)
  }

  public lte(value: unknown) {
    return StaticAddress.lte(this._address, value)
  }

  public gte(value: unknown) {
    return StaticAddress.gte(this._address, value)
  }
}
