export class Desk {

    id: number;
    length: number;
    width: number;
    positionX: number;
    positionY: number;
    employeeId: number;
    roomId: number;

    constructor(
        id: number,
        length: number,
        width: number,
        positionX: number,
        positionY: number,
        employeeId: number,
        roomId: number
    ) {
        this.id = id;
        this.length = length;
        this.width = width;
        this.positionX = positionX;
        this.positionY = positionY;
        this.employeeId = employeeId;
        this.roomId = roomId;
    }

}