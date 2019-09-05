import { Component, OnInit, HostListener } from '@angular/core';
import { Line } from 'src/app/_models/line';
import { Point } from 'src/app/_models/point';
import { Circle } from 'src/app/_models/circle';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {

  lines: Line[] = [];
  circles: Circle[];
  startPoint: Point = { x: 0, y: 0};
  endPoint: Point = { x: 0, y: 0};
  count: number = 0;

  constructor() { }

  ngOnInit() {
    this.circles = [];
  }

  onClickBoard(e: MouseEvent) {
    if (this.count === 0) {
      this.count++;
      const { x, y } = this.parsePoint(e);
      this.startPoint.x = Math.floor(x);
      this.startPoint.y = Math.floor(y);
    } else if (this.count === 1) {
      const { x, y } = this.parsePoint(e);
      this.endPoint.x = Math.floor(x);
      this.endPoint.y = Math.floor(y);

      const line = new Line(0, 0, 0, this.startPoint.x, this.endPoint.x, this.startPoint.y, this.endPoint.y);
      const circle = new Circle(0, (((line.x1 + line.x2) / 2) + line.x2) / 2, (((line.y1 + line.y2) / 2) + line.y2) / 2 - 3, 5);

      this.circles.push(circle);
      this.lines.push(line);
    }
  }

  parsePoint(e: MouseEvent) {
    const svgElement = e.target as SVGElement;
    let svgSvgElement = e.target as SVGSVGElement;

    if (!(svgElement instanceof SVGSVGElement)) {
      svgSvgElement = svgElement.ownerSVGElement;
    }

    let point = svgSvgElement.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    point = point.matrixTransform(svgSvgElement.getScreenCTM().inverse());

    return point;
  }

  logPoints() {
    console.table(this.lines);
    console.table(this.circles);
    document.getElementById('arrowhead').setAttribute("fill", 'green');
  }

  midMarkers(poly,spacing){
    let svg = poly.ownerSVGElement;
    for (let pts = poly.points,i=1; i<pts.numberOfItems;++i){
      let p0=pts.getItem(i-1), p1=pts.getItem(i);
      let dx=p1.x-p0.x, dy=p1.y-p0.y;
      let d = Math.sqrt(dx*dx+dy*dy);
      let numPoints = Math.floor( d/spacing );
      dx /= numPoints;
      dy /= numPoints;
      for (let j=numPoints-1;j>0;--j){
        let pt = svg.createSVGPoint();
        pt.x = p0.x+dx*j;
        pt.y = p0.y+dy*j;
        pts.insertItemBefore(pt,i);
      }
      if (numPoints>0) i += numPoints-1;
    }
  }

  @HostListener('document:keypress', ['$event'])
  keypress(e: KeyboardEvent) {
    switch (e.key) {
      case 'c':
        this.logPoints();
        break;
    }
  }

}
