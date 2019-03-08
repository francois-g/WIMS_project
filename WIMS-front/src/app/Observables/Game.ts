export class Game {
    constructor(
      private _Id: number,
      private _GameName: string,
      private _GameImage: string,
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

    get GameImage(): string {
        return this._GameImage;
    }

    set GameImage(value: string) {
        this._GameImage = value;
    }

    get Active(): boolean {
        return this._Active;
    }

    set Active(value: boolean) {
        this._Active = value;
    }
}
