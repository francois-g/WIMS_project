export class Currency {

    constructor(private id: number) {}

    private currencyName: string;
    private currencyShortcut: string;
    private conversionRate: number;

    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get CurrencyName(): string {
        return this.currencyName;
    }

    set CurrencyName(value: string) {
        this.currencyName = value;
    }

    get CurrencyShortcut(): string {
        return this.currencyShortcut;
    }

    set CurrencyShortcut(value: string) {
        this.currencyShortcut = value;
    }

    get ConversionRate(): number {
        return this.conversionRate;
    }

    set ConversionRate(value: number) {
        this.conversionRate = value;
    }

}
