import { Component, OnInit, HostListener } from '@angular/core';
import { Desk } from 'src/app/_models/Desk';

@Component({
  selector: 'app-room-designer',
  templateUrl: './room-designer.component.html',
  styleUrls: ['./room-designer.component.scss']
})
export class RoomDesignerComponent implements OnInit {

  // selected desk properties
  selectedDesk: Desk = null;
  selectedDeskElement: SVGElement = null;
  selectedDeskPoint: SVGPoint = { x: 0, y: 0} as any;

  // all desks in room
  desks: Desk[] = [];

  // employee space properties
  spaceWidth = 200;
  spaceHeight = 200;

  // room properites
  roomHeight = 500;
  roomWidth = 500;

  // SVG viewBox properties
  viewBox = "0 0 " + this.roomWidth.toString() + " " + this.roomHeight.toString();

  // test string
  worker: string = "Jan Kowalski\nProgrammer\n";

  constructor() { }

  ngOnInit() {
    // test objects
    let desk = new Desk(1, 70, 150, 100, 100, 2, 0, 0, 0);
    let _desk = new Desk(2, 70, 150, 300, 300, 2, 0, 0, 0);

    this.desks.push(desk);
    this.desks.push(_desk);
  }

  onSvgMouseLeave(e: MouseEvent) {   
    this.correctDesksPositions();
    // this.correctDesksCollisions();
  }

  onSvgMouseUp(e: MouseEvent) {

      let svgElement = e.target as SVGElement;
      let svgSvgElement = e.target as SVGSVGElement;

      if (!(svgElement instanceof SVGSVGElement)) {
        svgSvgElement = svgElement.ownerSVGElement;
      } 

      let point = svgSvgElement.createSVGPoint();

      point.x = e.clientX;
      point.y = e.clientY;

      point = point.matrixTransform(svgSvgElement.getScreenCTM().inverse());

      this.selectedDesk = null;
      this.selectedDeskElement = null;

      // console.log('--------------------SVG POINT--------------------');
      // console.log('%cSelected desk: ' + this.selectedDesk, 'color: blue; font-weight: bold');
      // console.log('%cCORDS: ' + '\nX: ' + point.x + '\nY: ' + point.y, 'color: blue; font-weight: 900;');
  }

  onSvgMouseMove(e: MouseEvent) {  
    if (this.selectedDesk) {
      let svgElement = e.target as SVGElement;
      let svgSvgElement = e.target as SVGSVGElement;

      if (!(svgElement instanceof SVGSVGElement)) {
        svgSvgElement = svgElement.ownerSVGElement;
      } 

      let point = svgSvgElement.createSVGPoint();
      let selectedDeskBorders = svgSvgElement.createSVGPoint();

      // set coords of cords
      point.x = e.clientX;
      point.y = e.clientY;
      
      // set coords of space rect
      selectedDeskBorders.x = this.selectedDeskElement.getBoundingClientRect().left;
      selectedDeskBorders.y = this.selectedDeskElement.getBoundingClientRect().top;
      
      // scale coords to svg
      point = point.matrixTransform(svgSvgElement.getScreenCTM().inverse());
      selectedDeskBorders = selectedDeskBorders.matrixTransform(svgSvgElement.getScreenCTM().inverse());

      // set selected desk position
      this.selectedDesk.positionX = point.x - this.selectedDeskPoint.x;
      this.selectedDesk.positionY = point.y - this.selectedDeskPoint.y;

      // correct position if out of the svg
      this.correctDesksPositions();
      
      // // print space rect borders coords
      // console.log('-----------------------RECT BORDERS-----------------------------------');
      // console.log('%cSelected desk: ' + this.selectedDesk, 'color: red; font-weight: bold');
      // console.log('%cCORDS: ' + '\nLeft: ' + selectedDeskBorders.x + '\nTop: ' + selectedDeskBorders.y + '\nRight: ' + (selectedDeskBorders.x + this.selectedDesk.width) + '\nBottom: ' + (selectedDeskBorders.y + this.selectedDesk.height), 'color: red; font-weight: 900;');
    }
  }

  onRectMouseDown(e: MouseEvent, clickedDesk: Desk) {
    this.selectedDesk = this.desks.filter(x => x.id === clickedDesk.id)[0]; // get selected desk
    const svgElement = e.target as SVGElement;
    let svgSvgElement = e.target as SVGSVGElement;

    if (!(svgElement instanceof SVGSVGElement)) {
      svgSvgElement = svgElement.ownerSVGElement;
    } 
    const rect = svgElement.getBoundingClientRect();

    
    let selectedDeskBorders = svgSvgElement.createSVGPoint();
    let point = svgSvgElement.createSVGPoint();

    selectedDeskBorders.x = rect.left;
    selectedDeskBorders.y = rect.top;

    point.x = e.clientX;
    point.y = e.clientY;

    selectedDeskBorders = selectedDeskBorders.matrixTransform(svgSvgElement.getScreenCTM().inverse());
    point = point.matrixTransform(svgSvgElement.getScreenCTM().inverse());

    this.selectedDeskPoint.x = point.x - selectedDeskBorders.x - 25; // 25 because of space
    this.selectedDeskPoint.y = point.y - selectedDeskBorders.y - 25;

    this.selectedDeskElement = svgElement;

    // console.log('--------------------------RECT POINT---------------------------');
    // console.log('%cSelected desk: ' + this.selectedDesk, 'color: green; font-weight: bold');
    // console.log('%cCORDS: ' + '\nX: ' + point.x + '\nY: ' + point.y, 'color: green; font-weight: 900;');
  }

  // helper functions
  correctDesksPositions(): void {
    this.desks.forEach(desk => {

      const sideSpace = (this.spaceWidth - desk.width)/2;
      const topSpace = sideSpace;
      const bottomSpace = this.spaceHeight - (topSpace + desk.height);

      if (desk.positionX - sideSpace < 0) {  // correct left space border after leave svg
        desk.positionX = sideSpace;
      }
      if (desk.positionX + desk.width + sideSpace > this.roomWidth) { // correct right space
        desk.positionX = this.roomWidth - desk.width - sideSpace;
      }
      if (desk.positionY - topSpace < 0) { // correct top
        desk.positionY = topSpace;
      }
      if (desk.positionY + desk.height + bottomSpace > this.roomHeight) { // correct bottom
        desk.positionY = this.roomHeight - desk.height - bottomSpace;
      }
    });
  }

  correctDesksCollisions(): void {
    for(let i = 0; i < this.desks.length; i++) {
      for(let j = i; j < this.desks.length; j++) {
        
        const deskI = this.desks[i];
        const deskJ = this.desks[j];
        // spaces ---Desk I---
        const sideSpaceDeskI = (this.spaceWidth - deskI.width)/2;
        const topSpaceDeskI = sideSpaceDeskI;
        const bottomSpaceDeskI = (this.spaceHeight - (topSpaceDeskI + deskI.height));
        // ---Desk J---
        const sideSpaceDeskJ = (this.spaceWidth - deskJ.width)/2;
        const topSpaceDeskJ = sideSpaceDeskJ;
        const bottomSpaceDeskJ = (this.spaceHeight - (topSpaceDeskJ + deskJ.height));

        // space border Desk I
        const spaceBorderLeftI = deskI.positionX - sideSpaceDeskI;
        const spaceBorderTopI = deskI.positionY - topSpaceDeskI;
        const spaceBorderRightI = deskI.positionX + deskI.width + sideSpaceDeskI;
        const spaceBorderBottomI = deskI.positionY + deskI.height + bottomSpaceDeskI;

        // space border Desk J
        const spaceBorderLeftJ = deskJ.positionX - sideSpaceDeskJ;
        const spaceBorderTopJ = deskJ.positionY - topSpaceDeskJ;
        const spaceBorderRightJ = deskJ.positionX + deskJ.width + sideSpaceDeskJ;
        const spaceBorderBottomJ = deskJ.positionY + deskJ.height + bottomSpaceDeskJ;

        if (deskI.id === deskJ.id) {
          continue;
        }

        console.log(
          spaceBorderTopI > spaceBorderTopJ && (spaceBorderBottomI > spaceBorderBottomJ && spaceBorderBottomI < spaceBorderTopJ) 
        );

      }
    }
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 

    if (event.key === 'r') {
      this.correctDesksCollisions();
    } 

  }

}
