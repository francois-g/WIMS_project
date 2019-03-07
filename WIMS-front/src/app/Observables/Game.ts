export class Game {
    constructor(
      private _Id: number,
      private _GameName: string,
      private _GameImg: string,
    ) {}
    private _Active: boolean;

    get Id(): number {
        return this._Id;
    }

    set Id(value: number) {
        this._Id = value;
    }

    get GameName(): string {
        return this._GameName;
    }

    set GameName(value: string) {
        this._GameName = value;
    }

    get GameImg(): string {
        return this._GameImg;
    }

    set GameImg(value: string) {
        this._GameImg = value;
    }

    get Active(): boolean {
        return this._Active;
    }

    set Active(value: boolean) {
        this._Active = value;
    }
}
