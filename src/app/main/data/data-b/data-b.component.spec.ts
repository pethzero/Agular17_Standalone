import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBComponent } from './data-b.component';

describe('DataBComponent', () => {
  let component: DataBComponent;
  let fixture: ComponentFixture<DataBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
