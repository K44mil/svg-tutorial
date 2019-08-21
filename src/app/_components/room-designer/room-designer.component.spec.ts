import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDesignerComponent } from './room-designer.component';

describe('RoomDesignerComponent', () => {
  let component: RoomDesignerComponent;
  let fixture: ComponentFixture<RoomDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
