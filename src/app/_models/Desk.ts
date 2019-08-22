export class Desk {

    id: number;
    height: number;
    width: number;
    positionX: number;
    positionY: number;
    positionAngle: number; // 1 - left, 2 - top, 3 - right, 4 - bottom
    collide: number;
    employeeId: number;
    roomId: number;

    constructor(
        id: number,
        height: number,
        width: number,
        positionX: number,
        positionY: number,
        positionAngle: number,
        collide: number,
        employeeId: number,
        roomId: number
    ) {
        this.id = id;
        this.height = height;
        this.width = width;
        this.positionX = positionX;
        this.positionY = positionY;
        this.employeeId = employeeId;
        this.roomId = roomId;
        this.collide = collide;
        this.positionAngle = positionAngle;
    }

}