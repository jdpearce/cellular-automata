export class CellularAutomaton {
    cells: number[];

    constructor(private width: number, private ruleset: number[]) {
        this.cells = Array(this.width).fill(0);

        // All cells start with state 0, except the center cell has state 1.
        this.cells[this.cells.length / 2] = 1;
    }

    generate(): void {
        // Compute the next generation.
        let nextgen: number[] = Array(this.width).fill(0);

        for (let i = 0; i < this.cells.length; i++) {
            const left = i - 1 < 0 ? this.cells.length - 1 : i - 1;
            const right = i + 2 > this.cells.length? 0 : i + 1;
            nextgen[i] = this.rules(this.cells[left], this.cells[i], this.cells[right]);
        }

        this.cells = nextgen;
    }

    // Look up a new state from the ruleset.
    rules(a: number, b: number, c: number): number {
        const s: string = '' + a + b + c;
        const index = parseInt(s, 2);
        return this.ruleset[index];
    }
}
