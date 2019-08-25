export class Line {

    id: number;
    idC1: number;
    idC2: number;
    x1: number;
    x2: number;
    y1: number;
    y2: number;

    constructor(
        id: number,
        idC1: number,
        idC2: number,
        x1: number,
        x2: number,
        y1: number,
        y2: number
    ) {
        this.id = id;
        this.idC1 = idC1;
        this.idC2 = idC2;
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
}
