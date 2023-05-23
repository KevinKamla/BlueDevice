import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectdevicesPage } from './selectdevices.page';

describe('SelectdevicesPage', () => {
  let component: SelectdevicesPage;
  let fixture: ComponentFixture<SelectdevicesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectdevicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
