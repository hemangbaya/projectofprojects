import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectcardpanelComponent } from './projectcardpanel.component';

describe('ProjectcardpanelComponent', () => {
  let component: ProjectcardpanelComponent;
  let fixture: ComponentFixture<ProjectcardpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectcardpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectcardpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
