
export class Twitcher {
    get id(): number {
        return this.Id;
    }

    set id(value: number) {
        this.Id = value;
    }

    constructor(
        private Id: number,
    ) {

    }
}
