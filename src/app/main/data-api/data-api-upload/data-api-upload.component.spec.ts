import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataApiUploadComponent } from './data-api-upload.component';

describe('DataApiUploadComponent', () => {
  let component: DataApiUploadComponent;
  let fixture: ComponentFixture<DataApiUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataApiUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataApiUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
