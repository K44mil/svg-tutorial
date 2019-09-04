import { Component, OnInit, HostListener } from '@angular/core';
import { Line } from 'src/app/_models/sorter-line';
import { Rect } from 'src/app/_models/rect';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {

  rectangles: Rect[] = [];

  constructor() { }

  ngOnInit() {
    this.randomRects();
    console.log('init');
  }

  randomRects() {
    for (let i = 0; i < 100; i++) {
      const height = Math.floor(Math.random() * 600)
      const rect = new Rect(i, i*6, 600-height, 6, height);
      this.rectangles.push(rect);
    }
  }

  sortRects() {
    let n = this.rectangles.length;

    for (let j = 0; j < n-1; j++) {
      for (let i = 0; i < n-1; i++) {
        if (Number.parseInt(this.rectangles[i].height) > Number.parseInt(this.rectangles[i+1].height)) {
          const temp = this.rectangles[i].x;
          this.rectangles[i].x = this.rectangles[i+1].x;
          this.rectangles[i+1].x = temp;
          this.rectangles[i].fill = 'red';

          const tempObj = this.rectangles[i];
          this.rectangles[i] = this.rectangles[i+1];
          this.rectangles[i+1] = tempObj;
        }
      }
    }
  }

  stepCounter = 0;
  i = 0;

  fillRed() {
    this.rectangles[this.i].fill = 'red';
    this.rectangles[this.i+1].fill = 'red';
  }

  fillGreen() {
    this.rectangles[this.i].fill = 'green';
    this.rectangles[this.i+1].fill = 'green';
  }

  fillColor(color: string) {
    this.rectangles[this.i].fill = color;
    this.rectangles[this.i+1].fill = color;
  }

   private getRandomColor(): string {
    const colorR = Math.floor(Math.random() * (255 + 1));
    const colorG = Math.floor(Math.random() * (255 + 1));
    const colorB = Math.floor(Math.random() * (255 + 1));
    const randomColor = 'rgb(' + colorR.toString() + ', ' + colorG.toString() + ', ' + colorB.toString() + ')';
    return randomColor;
  }

  color = this.getRandomColor();
  n = 99;
  oneBubbleSortStep() {
    if (this.stepCounter === 0) {
      this.fillRed();
      this.stepCounter++;
    } else if (this.stepCounter === 1) {
      // swap
      if (Number.parseInt(this.rectangles[this.i].height) > Number.parseInt(this.rectangles[this.i+1].height)) {
        const temp = this.rectangles[this.i].x;
        this.rectangles[this.i].x = this.rectangles[this.i+1].x;
        this.rectangles[this.i+1].x = temp;
  
        const tempObj = this.rectangles[this.i];
        this.rectangles[this.i] = this.rectangles[this.i+1];
        this.rectangles[this.i+1] = tempObj;
      }
      this.stepCounter++; 
    } else if (this.stepCounter === 2) {
      this.fillColor(this.color);
      this.stepCounter = 0;
      this.i++;
      if (this.i === this.n) {
        this.i = 0;
        this.n--;
        this.color = this.getRandomColor();
      }
        
    }
  }

  async autoSort() {
    while (this.n > 0) {
      this.oneBubbleSortStep();
      await this.wait(0.05);
    }
  }

  wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  j = 0;
  index = 0;
  onSelectSortStep() {
      let min = this.min(this.j);
    if (this.stepCounter === 0) {
      this.index = this.getIndex(min);
      this.rectangles[this.j].fill = 'red';
      min.fill = 'red';
      this.stepCounter++;
    } else if (this.stepCounter === 1) {
      if (this.rectangles[this.j].id !== min.id) {
        const temp = this.rectangles[this.j].x;
        this.rectangles[this.j].x = min.x;
        this.rectangles[this.getIndex(min)].x = temp;

        const tempObj = this.rectangles[this.j];
        this.rectangles[this.j] = min;
        this.rectangles[this.getIndex(min)] = tempObj;
      }
      this.stepCounter++;
    } else if (this.stepCounter === 2) {
      this.rectangles[this.index].fill = 'black';
      this.rectangles[this.j++].fill = 'green';   
      this.stepCounter = 0;
    }
  }

  getIndex(rect: Rect): number {
    let result: number = null;
    for (let i = 0; i < this.rectangles.length; i++) {
      if (rect.id === this.rectangles[i].id)
        result = i;
    }
    return result;
  }

  min(j: number): Rect {
    let result: Rect = this.rectangles[j];
    for (let i = j; i < this.rectangles.length; i++) {
      if (Number.parseInt(result.height) > Number.parseInt(this.rectangles[i].height))
        result = this.rectangles[i];
    }
    return result;
  }


  sleep(milliseconds: number) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds)
        break;
    }
  }

  @HostListener('document:keydown', ['$event'])
  keydown(e: KeyboardEvent) {
    switch(e.key) {
      case 's':
        this.oneBubbleSortStep();
        break;
      case 'd':
        this.onSelectSortStep();
        break;
    }
  }
  
}
