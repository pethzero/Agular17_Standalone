import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableApiComponent } from './data-table-api.component';

describe('DataTableApiComponent', () => {
  let component: DataTableApiComponent;
  let fixture: ComponentFixture<DataTableApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
