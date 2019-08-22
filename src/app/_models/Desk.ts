export class Desk {

    id: number;
    height: number;
    width: number;
    positionX: number;
    positionY: number;
    collide: number;
    employeeId: number;
    roomId: number;

    constructor(
        id: number,
        height: number,
        width: number,
        positionX: number,
        positionY: number,
        employeeId: number,
        roomId: number,
        collide: number
    ) {
        this.id = id;
        this.height = height;
        this.width = width;
        this.positionX = positionX;
        this.positionY = positionY;
        this.employeeId = employeeId;
        this.roomId = roomId;
        this.collide = collide;
    }

}