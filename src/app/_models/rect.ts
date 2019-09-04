export class Rect {

    id: number;
    x: number;
    y: number;
    width: number;
    height: any;
    fill: string;

    constructor(
        id: number,
        x: number,
        y: number,
        width: number,
        height: any,
        fill: string = 'black'
    ) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fill = fill;
    }
}