import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeTabsComponent } from './anime-tabs.component';

describe('AnimeTabsComponent', () => {
  let component: AnimeTabsComponent;
  let fixture: ComponentFixture<AnimeTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
