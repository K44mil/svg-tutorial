import { Component, OnInit } from '@angular/core';
import { Circle } from '../../_models/circle';
import { Line } from '../../_models/line';

import { mapToMapExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  lines: Line[] = [];
  circles: Circle[] = [];
  selectedCircle: Circle = null;

  constructor() { }

  ngOnInit() {
  }

  drawNewCircle(e: MouseEvent) {
    if(e.target instanceof SVGSVGElement) {
      const svgElement = e.target as SVGElement;
      let svgSvgElement = e.target as SVGSVGElement;

      if (!(svgElement instanceof SVGSVGElement)) {
        svgSvgElement = svgElement.ownerSVGElement;
      }

      let point = svgSvgElement.createSVGPoint();

      // set coords of cords
      point.x = e.clientX;
      point.y = e.clientY;

      point = point.matrixTransform(svgSvgElement.getScreenCTM().inverse());

      this.createNewCircle(point.x, point.y, 15);
    }

  }

  createNewCircle(cx: number, cy: number, r: number) {
    const id = this.circles.length ? Math.max(...this.circles.map(x => x.id)) + 1 : 1;
    const circle = new Circle(id, cx, cy, r);
    this.circles.push(circle);
  }

  createNewLine(x1: number, x2: number, y1: number, y2: number) {
    const id = this.lines.length ? Math.max(...this.lines.map(x => x.id)) + 1 : 1;
    const line = new Line(id, x1, x2, y1, y2);
    this.lines.push(line);
  }

  selectCircle(e: MouseEvent, id: number) {
    const circle = this.circles.filter(x => x.id === id)[0];
    if (this.selectedCircle) {
      if (circle.id === this.selectedCircle.id) {
        this.selectedCircle = null;
      } else {
        this.createNewLine(this.selectedCircle.cx, circle.cx, this.selectedCircle.cy, circle.cy);
      }
    } else {
      this.selectedCircle = circle;
    }

  }

}
