export class Device {
  constructor(
    private name: string,
    private product: string,
  ) {}

  public get Name(): string {
    return this.name;
  }
  public set Name(name: string) {
    this.name = name;
  }
  public get Product(): string {
    return this.product;
  }
  public set Product(product: string) {
    this.product = product;
  }
}
