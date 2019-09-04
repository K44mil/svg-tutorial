import { Component, OnInit, HostListener, Host } from '@angular/core';
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

  draggableSelectedCircle: Circle = null;

  modeText = 'Draw mode';
  mode = 0; // 0 - draw mode // 1 - dragg mode

  constructor() { }

  ngOnInit() {
  }

  drawNewCircle(e: MouseEvent) {
    if (this.mode === 0) {
      if (e.target instanceof SVGSVGElement) {
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

        this.createNewCircle(point.x, point.y, 5);
      }
    }
  }

  createNewCircle(cx: number, cy: number, r: number) {
    const id = this.circles.length ? Math.max(...this.circles.map(x => x.id)) + 1 : 1;
    const circle = new Circle(id, cx, cy, r);
    this.circles.push(circle);
  }

  createNewLine(idC1: number, idC2: number, x1: number, x2: number, y1: number, y2: number) {
    const id = this.lines.length ? Math.max(...this.lines.map(x => x.id)) + 1 : 1;
    const line = new Line(id, idC1, idC2, x1, x2, y1, y2);
    this.lines.push(line);
  }

  selectCircle(e: MouseEvent, id: number) {
    if (this.mode === 0) {
      const circle = this.circles.filter(x => x.id === id)[0];
      if (this.selectedCircle) {
        if (circle.id === this.selectedCircle.id) {
          this.selectedCircle = null;
        } else {
          this.createNewLine(this.selectedCircle.id, circle.id, this.selectedCircle.cx, circle.cx, this.selectedCircle.cy, circle.cy);
          this.selectedCircle = null;
        }
      } else {
        this.selectedCircle = circle;
      }
    }
  }

  reset() {
    this.lines = [];
    this.circles = [];
  }

  // drag graphs

  onCircleMouseDown(e: MouseEvent, id: number) {
    if (this.mode === 1) {
      const circle = this.circles.filter(x => x.id === id)[0];
      this.draggableSelectedCircle = circle;
    }
  }

  onSvgMouseMove(e: MouseEvent) {
    if (this.draggableSelectedCircle) {
      if (e.target instanceof SVGSVGElement) {
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

        this.draggableSelectedCircle.cx = point.x;
        this.draggableSelectedCircle.cy = point.y;

        this.lines.forEach(line => {

          console.log(line.idC1 + ' - ' + line.idC2);

          if (line.idC1 === this.draggableSelectedCircle.id) {
            line.x1 = point.x;
            line.y1 = point.y;
          } else if (line.idC2 === this.draggableSelectedCircle.id) {
            line.x2 = point.x;
            line.y2 = point.y;
          }
        });
      }
    }
  }

  onSvgMouseUp(e: MouseEvent) {
    if (this.draggableSelectedCircle) {
      this.draggableSelectedCircle = null;
    }
  }

  //

  @HostListener('document:keypress', ['$event'])
  handleKeyEvent(e: KeyboardEvent) {
    switch (e.key) {
      case 'd':
        this.mode = 1;
        this.selectedCircle = null;
        this.modeText = 'Dragg mode';
        break;
      case 's':
        this.mode = 0;
        this.draggableSelectedCircle = null;
        this.modeText = 'Draw mode';
        break;
    }
  }

}
