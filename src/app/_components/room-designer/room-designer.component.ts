import { Component, OnInit, HostListener } from '@angular/core';
import { Desk } from 'src/app/_models/Desk';
import { Key } from 'protractor';

@Component({
  selector: 'app-room-designer',
  templateUrl: './room-designer.component.html',
  styleUrls: ['./room-designer.component.scss']
})
export class RoomDesignerComponent implements OnInit {

  selectedDesk: Desk = null;
  selectedDeskElement: SVGElement = null;
  selectedDeskPoint: SVGPoint = { x: 0, y: 0} as any;
  desks: Desk[] = [];

  spaceWidth = 200;
  spaceHeight = 200;

  roomHeight = 1000;
  roomWidth = 1000;
  worker: string = "Jan Kowalski\nProgrammer\n";

  viewBox = "0 0 " + this.roomWidth.toString() + " " + this.roomHeight.toString();

  constructor() { }

  ngOnInit() {
    let desk = new Desk(1, 50, 100, 0, 0, -1, 1, 0);
    let _desk = new Desk(2, 50, 100, 150, 150, 1, 1, 0);
    let __desk = new Desk(3, 50, 100, 250, 250, 1, 1, 0);
    let ___desk = new Desk(4, 50, 100, 350, 350, -1, 1, 0);

    this.desks.push(desk);
    this.desks.push(_desk);
    this.desks.push(__desk);
    this.desks.push(___desk);
  }

  onSvgMouseLeave(e: MouseEvent) {
    
    this.desks.forEach(desk => {
      if (desk.positionX < 0) {
        desk.positionX = 1;
      }
      if (desk.positionX + desk.width > this.roomWidth) {
        desk.positionX = this.roomWidth - desk.width - 1;
      }
      if (desk.positionY < 0) {
        desk.positionY = 1;
      }
      if (desk.positionY + desk.height > this.roomHeight) {
        desk.positionY = this.roomHeight - desk.height - 1;
      }
    });

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

      console.log('--------------------SVG POINT--------------------');
      console.log('%cSelected desk: ' + this.selectedDesk, 'color: blue; font-weight: bold');
      console.log('%cCORDS: ' + '\nX: ' + point.x + '\nY: ' + point.y, 'color: blue; font-weight: 900;');
  }

  onSvgMouseMove(e: MouseEvent) {
    
    if (this.selectedDesk) {
      let svgElement = e.target as SVGElement;
      let svgSvgElement = e.target as SVGSVGElement;

      if (!(svgElement instanceof SVGSVGElement)) {
        svgSvgElement = svgElement.ownerSVGElement;
      } 

      let point = svgSvgElement.createSVGPoint();

      point.x = e.clientX;
      point.y = e.clientY;

      point = point.matrixTransform(svgSvgElement.getScreenCTM().inverse());

      let selectedDeskBorders = svgSvgElement.createSVGPoint();
      
      selectedDeskBorders.x = this.selectedDeskElement.getBoundingClientRect().left;
      selectedDeskBorders.y = this.selectedDeskElement.getBoundingClientRect().top;
      selectedDeskBorders.w = this.selectedDeskElement.getBoundingClientRect().right;
      selectedDeskBorders.z = this.selectedDeskElement.getBoundingClientRect().bottom;

      selectedDeskBorders = selectedDeskBorders.matrixTransform(svgSvgElement.getScreenCTM().inverse());

      // pozmieniać warunki, osobno dla poruszania sie w prawo i lewo

      // if (selectedDeskBorders.x >= 0 && selectedDeskBorders.x + this.selectedDesk.width <= this.roomWidth) {
        this.selectedDesk.positionX = point.x - this.selectedDeskPoint.x;
      // }
      // if (selectedDeskBorders.y >= 0 && selectedDeskBorders.y + this.selectedDesk.height <= this.roomHeight) {
        this.selectedDesk.positionY = point.y - this.selectedDeskPoint.y;
      // }


      // ustawienie krawedzi
      if (selectedDeskBorders.x < 0) {
        this.selectedDesk.positionX = 1;
      }
      if (selectedDeskBorders.x + this.selectedDesk.width > this.roomWidth) {
        this.selectedDesk.positionX = this.roomWidth - this.selectedDesk.width - 1;
      }
      if (selectedDeskBorders.y < 0) {
        this.selectedDesk.positionY = 1;
      }
      if (selectedDeskBorders.y + this.selectedDesk.height > this.roomHeight) {
        this.selectedDesk.positionY = this.roomHeight - this.selectedDesk.height - 1;
      }
      
      console.log('-----------------------RECT BORDERS-----------------------------------');
      console.log('%cSelected desk: ' + this.selectedDesk, 'color: red; font-weight: bold');
      console.log('%cCORDS: ' + '\nLeft: ' + selectedDeskBorders.x + '\nTop: ' + selectedDeskBorders.y + '\nRight: ' + (selectedDeskBorders.x + this.selectedDesk.width) + '\nBottom: ' + (selectedDeskBorders.y + this.selectedDesk.height), 'color: red; font-weight: 900;');

    }
  }

  onRectMouseDown(e: MouseEvent, clickedDesk: Desk) {
    this.selectedDesk = this.desks.filter(x => x.id === clickedDesk.id)[0];

    const svgElement = e.target as SVGElement;

    let svgSvgElement = e.target as SVGSVGElement;

    if (!(svgElement instanceof SVGSVGElement)) {
      svgSvgElement = svgElement.ownerSVGElement;
    } 

    const rect = svgElement.getBoundingClientRect();
    // ---------------------
    let selectedDeskBorders = svgSvgElement.createSVGPoint();
      
    selectedDeskBorders.x = rect.left;
    selectedDeskBorders.y = rect.top;

    selectedDeskBorders = selectedDeskBorders.matrixTransform(svgSvgElement.getScreenCTM().inverse());
    // --------------------------
    let point = svgSvgElement.createSVGPoint();

    point.x = e.clientX;
    point.y = e.clientY;

    point = point.matrixTransform(svgSvgElement.getScreenCTM().inverse());
    //--------------------------------

    const xLeft =  selectedDeskBorders.x;
    const yTop =  selectedDeskBorders.y;

    this.selectedDeskPoint.x = point.x - xLeft;
    this.selectedDeskPoint.y = point.y - yTop;

    this.selectedDeskElement = svgElement;

    console.log('--------------------------RECT POINT---------------------------');
    console.log('%cSelected desk: ' + this.selectedDesk, 'color: green; font-weight: bold');
    console.log('%cCORDS: ' + '\nX: ' + point.x + '\nY: ' + point.y, 'color: green; font-weight: 900;');
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 

    if (event.key === 'r') {
      this.desks.forEach(desk => {
        desk.height += 10;
      });
    } else if (event.key === 't') {
      this.desks.forEach(desk => {
        desk.width += 10;
      });
    }

  }

}
