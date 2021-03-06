import {Currency} from './Currency';
import {Role} from './Role';

export class User {
    constructor (
    ) {}

    private id: number;
    private firstName: string;
    private lastName: string;
    private pseudo: string;
    private pswd: string;
    private email: string;
    private twitchLink: string = '';
    private pseudoTwitch: string = '';
    private balance: number;
    private conditionAccepted: number;
    private currencyId: number;
    private currency: Currency;
    private avatar = '';
    private active = true;
    private roleId: number;

    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get FirstName(): string {
        return this.firstName;
    }

    set FirstName(value: string) {
        this.firstName = value;
    }

    get LastName(): string {
        return this.lastName;
    }

    set LastName(value: string) {
        this.lastName = value;
    }

    get Pseudo(): string {
        return this.pseudo;
    }

    set Pseudo(value: string) {
        this.pseudo = value;
    }

    get Pswd(): string {
        return this.pswd;
    }

    set Pswd(value: string) {
        this.pswd = value;
    }

    get Email(): string {
        return this.email;
    }

    set Email(value: string) {
        this.email = value;
    }

    get TwitchLink(): string {
        return this.twitchLink;
    }

    set TwitchLink(value: string) {
        this.twitchLink = value;
    }

    get PseudoTwitch(): string {
        return this.pseudoTwitch;
    }

    set PseudoTwitch(value: string) {
        this.pseudoTwitch = value;
    }

    get Balance(): number {
        return this.balance;
    }

    set Balance(value: number) {
        this.balance = value;
    }

    get ConditionAccepted(): number {
        return this.conditionAccepted;
    }

    set CnditionAccepted(value: number) {
        this.conditionAccepted = value;
    }

    get CurrencyId(): number {
        return this.currencyId;
    }

    set CurrencyId(value: number) {
        this.currencyId = value;
    }
    get Currency(): Currency {
        return this.currency;
    }

    set Currency(value: Currency) {
        this.currency = value;
    }

    get Avatar(): string {
        return this.avatar;
    }

    set Avatar(value: string) {
        this.avatar = value;
    }

    get Active(): boolean {
        return this.active;
    }

    set Active(value: boolean) {
        this.active = value;
    }

    get RoleId(): number {
        return this.roleId;
    }

    set RoleId(value: number) {
        this.roleId = value;
    }

}
