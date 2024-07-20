import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAComponent } from './data-a.component';

describe('DataAComponent', () => {
  let component: DataAComponent;
  let fixture: ComponentFixture<DataAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
