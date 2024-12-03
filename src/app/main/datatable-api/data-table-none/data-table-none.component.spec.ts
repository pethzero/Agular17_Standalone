import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableNoneComponent } from './data-table-none.component';

describe('DataTableNoneComponent', () => {
  let component: DataTableNoneComponent;
  let fixture: ComponentFixture<DataTableNoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableNoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
