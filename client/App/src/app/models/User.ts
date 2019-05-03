export class User {
  constructor(
    private name: string,
    private password: string
  ) {
  }

  public get Name() {
    return this.name;
  }
  public set Name(name: string) {
    this.name = name;
  }

  public get Password() {
    return this.password;
  }
  public set Password(password: string) {
    this.password = password;
  }
}
