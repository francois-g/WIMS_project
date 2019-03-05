export class Role {
    constructor(private id: number) {}
    private roleName: string;

    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get RoleName(): string {
        return this.roleName;
    }

    set RoleName(value: string) {
        this.RoleName = value;
    }
}

