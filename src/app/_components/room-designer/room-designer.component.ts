import { Component, OnInit } from '@angular/core';
import { Desk } from 'src/app/_models/Desk';

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

  roomHeight = 500;
  roomWidth = 500;

  viewBox = "0 0 " + this.roomWidth.toString() + " " + this.roomHeight.toString();

  constructor() { }

  ngOnInit() {
    let desk = new Desk(1, 100, 50, 0, 0, 1, 1);
    this.desks.push(desk);
  }

  onSvgMouseClick(e: MouseEvent) {

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

      console.log('-------------------------------------------------------------------');
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

      selectedDeskBorders = selectedDeskBorders.matrixTransform(svgSvgElement.getScreenCTM().inverse());

      // pozmieniać warunki, osobno dla poruszania sie w prawo i lewo

      if (selectedDeskBorders.x > 0 && selectedDeskBorders.x + this.selectedDesk.length < this.roomHeight + 1) {
        this.selectedDesk.positionX = point.x - this.selectedDeskPoint.x;
      }
      

    }
  }

  onRectMousClick(e: MouseEvent, clickedDesk: Desk) {
    this.selectedDesk = this.desks.filter(x => x.id === clickedDesk.id)[0];

    const svgElement = e.target as SVGElement;
    const rect = svgElement.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.selectedDeskPoint.x = x;
    this.selectedDeskPoint.y = y;

    this.selectedDeskElement = svgElement;

    console.log('-------------------------------------------------------------------');
    console.log('%cSelected desk: ' + this.selectedDesk, 'color: green; font-weight: bold');
    console.log('%cCORDS: ' + '\nX: ' + x + '\nY: ' + y, 'color: green; font-weight: 900;');
  }

}
