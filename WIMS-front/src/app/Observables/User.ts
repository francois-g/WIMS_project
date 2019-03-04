export class User {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get FirstName(): string {
    return this._FirstName;
  }

  set FirstName(value: string) {
    this._FirstName = value;
  }

  get LastName(): string {
    return this._LastName;
  }

  set LastName(value: string) {
    this._LastName = value;
  }

  get Pseudo(): string {
    return this._Pseudo;
  }

  set Pseudo(value: string) {
    this._Pseudo = value;
  }

  get Pswd(): string {
    return this._Pswd;
  }

  set Pswd(value: string) {
    this._Pswd = value;
  }

  get Email(): string {
    return this._Email;
  }

  set Email(value: string) {
    this._Email = value;
  }

  get TwitchLink(): string {
    return this._TwitchLink;
  }

  set TwitchLink(value: string) {
    this._TwitchLink = value;
  }

  get PseudoTwitch(): string {
    return this._PseudoTwitch;
  }

  set PseudoTwitch(value: string) {
    this._PseudoTwitch = value;
  }

  get ConditionAccepted(): number {
    return this._ConditionAccepted;
  }

  set ConditionAccepted(value: number) {
    this._ConditionAccepted = value;
  }

  get CurrencyId(): number {
    return this._CurrencyId;
  }

  set CurrencyId(value: number) {
    this._CurrencyId = value;
  }

  get Avatar(): string {
    return this._Avatar;
  }

  set Avatar(value: string) {
    this._Avatar = value;
  }

  get Active(): number {
    return this._Active;
  }

  set Active(value: number) {
    this._Active = value;
  }

  get RoleId(): number {
    return this._RoleId;
  }

  set RoleId(value: number) {
    this._RoleId = value;
  }
  constructor (
    private _id: number,
    private _FirstName: string,
    private _LastName: string,
    private _Pseudo: string,
    private _Pswd: string,
    private _Email: string,
    private _TwitchLink: string,
    private _PseudoTwitch: string,
    private _ConditionAccepted: number,
    private _CurrencyId: number,
    private _Avatar: string,
    private _Active: number,
    private _RoleId: number,
  ) {}
}
