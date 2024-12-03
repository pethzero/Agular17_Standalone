import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablePivotComponent } from './data-table-pivot.component';

describe('DataTablePivotComponent', () => {
  let component: DataTablePivotComponent;
  let fixture: ComponentFixture<DataTablePivotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTablePivotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTablePivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
