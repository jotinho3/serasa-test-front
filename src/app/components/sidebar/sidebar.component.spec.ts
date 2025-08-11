import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SidebarComponent } from './sidebar.component';
import { Publication } from '../../interfaces/publication.interface';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let debugElement: DebugElement;

  // Mock data for testing
  const mockPublications: Publication[] = [
    {
      authorId: 1,
      date: '17/01/2018',
      title: 'First Publication',
      category: 'Programming',
      description: 'First description'
    },
    {
      authorId: 2,
      date: '20/03/2018',
      title: 'Second Publication',
      category: 'Web Development',
      description: 'Second description'
    },
    {
      authorId: 3,
      date: '12/04/2018',
      title: 'Third Publication',
      category: 'Design',
      description: 'Third description'
    },
    {
      authorId: 1,
      date: '05/06/2018',
      title: 'Fourth Publication',
      category: 'Backend',
      description: 'Fourth description'
    },
    {
      authorId: 2,
      date: '15/07/2018',
      title: 'Fifth Publication',
      category: 'Frontend',
      description: 'Fifth description'
    },
    {
      authorId: 3,
      date: '22/08/2018',
      title: 'Sixth Publication',
      category: 'DevOps',
      description: 'Sixth description'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with empty publications array', () => {
      expect(component.publications).toEqual([]);
    });

    it('should accept publications input', () => {
      component.publications = mockPublications;
      expect(component.publications).toEqual(mockPublications);
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render sidebar container', () => {
      const sidebar = fixture.nativeElement.querySelector('.sidebar');
      expect(sidebar).toBeTruthy();
    });

    it('should render correct title', () => {
      const title = fixture.nativeElement.querySelector('.last-news');
      expect(title).toBeTruthy();
      expect(title.textContent.trim()).toBe('Últimas notícias');
    });

    it('should render title as h3 element', () => {
      const title = fixture.nativeElement.querySelector('h3.last-news');
      expect(title).toBeTruthy();
    });

    it('should not render publication cards when no publications', () => {
      const cards = fixture.nativeElement.querySelectorAll('.publication-card');
      expect(cards.length).toBe(0);
    });
  });

  describe('Publications Display', () => {
    beforeEach(() => {
      component.publications = mockPublications;
      fixture.detectChanges();
    });

    it('should render publication cards', () => {
      const cards = fixture.nativeElement.querySelectorAll('.publication-card');
      expect(cards.length).toBe(5); // Should show only 5 latest
    });

    it('should display publication titles', () => {
      const titles = fixture.nativeElement.querySelectorAll('.publication-title');
      expect(titles.length).toBe(5);
      expect(titles[0].textContent.trim()).toBeTruthy();
    });

    it('should display publication dates', () => {
      const dates = fixture.nativeElement.querySelectorAll('.date');
      expect(dates.length).toBe(5);
      expect(dates[0].textContent.trim()).toBeTruthy();
    });

    it('should render titles as h4 elements', () => {
      const titles = fixture.nativeElement.querySelectorAll('h4.publication-title');
      expect(titles.length).toBe(5);
    });

    it('should render dates as span elements', () => {
      const dates = fixture.nativeElement.querySelectorAll('span.date');
      expect(dates.length).toBe(5);
    });
  });

  describe('lastPublications Getter', () => {
    it('should return empty array when no publications', () => {
      component.publications = [];
      expect(component.lastPublications).toEqual([]);
    });

    it('should return all publications when less than 5', () => {
      const threePublications = mockPublications.slice(0, 3);
      component.publications = threePublications;
      expect(component.lastPublications.length).toBe(3);
    });

    it('should return only 5 publications when more than 5', () => {
      component.publications = mockPublications;
      expect(component.lastPublications.length).toBe(5);
    });

    it('should sort publications by date (newest first)', () => {
      component.publications = mockPublications;
      const lastPubs = component.lastPublications;
      
      // Check that dates are in descending order
      for (let i = 0; i < lastPubs.length - 1; i++) {
        const currentDate = component['parseDate'](lastPubs[i].date);
        const nextDate = component['parseDate'](lastPubs[i + 1].date);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });

    it('should return newest publications first', () => {
      component.publications = mockPublications;
      const lastPubs = component.lastPublications;
      
      // The newest publication should be first
      expect(lastPubs[0].date).toBe('22/08/2018'); // Sixth Publication
      expect(lastPubs[0].title).toBe('Sixth Publication');
    });
  });

  describe('parseDate Method', () => {
    it('should parse DD/MM/YYYY format correctly', () => {
      const date = component['parseDate']('17/01/2018');
      
      expect(date.getDate()).toBe(17);
      expect(date.getMonth()).toBe(0); // January (0-indexed)
      expect(date.getFullYear()).toBe(2018);
    });

    it('should parse different dates correctly', () => {
      const date1 = component['parseDate']('01/01/2020');
      const date2 = component['parseDate']('31/12/2019');
      
      expect(date1.getTime()).toBeGreaterThan(date2.getTime());
    });

    it('should handle single digit days and months', () => {
      const date = component['parseDate']('5/6/2018');
      
      expect(date.getDate()).toBe(5);
      expect(date.getMonth()).toBe(5); // June (0-indexed)
      expect(date.getFullYear()).toBe(2018);
    });

    it('should handle edge case dates', () => {
      const leapYearDate = component['parseDate']('29/02/2020');
      expect(leapYearDate.getDate()).toBe(29);
      expect(leapYearDate.getMonth()).toBe(1); // February
      expect(leapYearDate.getFullYear()).toBe(2020);
    });
  });

  describe('Sorting Functionality', () => {
    it('should maintain original array when getting lastPublications', () => {
      const originalPublications = [...mockPublications];
      component.publications = mockPublications;
      
      // Access lastPublications (which sorts internally)
      const lastPubs = component.lastPublications;
      
      // Original array should remain unchanged
      expect(component.publications).toEqual(originalPublications);
    });

    it('should handle publications with same date', () => {
      const sameeDatePublications: Publication[] = [
        {
          authorId: 1,
          date: '17/01/2018',
          title: 'First Same Date',
          category: 'Programming',
          description: 'Description 1'
        },
        {
          authorId: 2,
          date: '17/01/2018',
          title: 'Second Same Date',
          category: 'Design',
          description: 'Description 2'
        }
      ];
      
      component.publications = sameeDatePublications;
      const result = component.lastPublications;
      
      expect(result.length).toBe(2);
    });
  });

  describe('Component Input Changes', () => {
    it('should update display when publications input changes', () => {
      // Initially no publications
      fixture.detectChanges();
      let cards = fixture.nativeElement.querySelectorAll('.publication-card');
      expect(cards.length).toBe(0);
      
      // Add publications
      component.publications = mockPublications.slice(0, 3);
      fixture.detectChanges();
      cards = fixture.nativeElement.querySelectorAll('.publication-card');
      expect(cards.length).toBe(3);
    });

    it('should display correct content when publications change', () => {
      const newPublications = [
        {
          authorId: 1,
          date: '01/01/2020',
          title: 'New Year Publication',
          category: 'Celebration',
          description: 'New year description'
        }
      ];
      
      component.publications = newPublications;
      fixture.detectChanges();
      
      const title = fixture.nativeElement.querySelector('.publication-title');
      const date = fixture.nativeElement.querySelector('.date');
      
      expect(title.textContent.trim()).toBe('New Year Publication');
      expect(date.textContent.trim()).toBe('01/01/2020');
    });
  });

  describe('CSS Classes', () => {
    beforeEach(() => {
      component.publications = mockPublications.slice(0, 2);
      fixture.detectChanges();
    });

    it('should apply correct CSS classes', () => {
      const sidebar = fixture.nativeElement.querySelector('.sidebar');
      const title = fixture.nativeElement.querySelector('.last-news');
      const cards = fixture.nativeElement.querySelectorAll('.publication-card');
      const pubTitles = fixture.nativeElement.querySelectorAll('.publication-title');
      const dates = fixture.nativeElement.querySelectorAll('.date');

      expect(sidebar).toHaveClass('sidebar');
      expect(title).toHaveClass('last-news');
      expect(cards[0]).toHaveClass('publication-card');
      expect(pubTitles[0]).toHaveClass('publication-title');
      expect(dates[0]).toHaveClass('date');
    });
  });

  describe('Performance Tests', () => {
    it('should handle large number of publications efficiently', () => {
      const largePublicationSet: Publication[] = [];
      for (let i = 0; i < 100; i++) {
        largePublicationSet.push({
          authorId: i % 3 + 1,
          date: `${i % 28 + 1}/${i % 12 + 1}/2018`,
          title: `Publication ${i}`,
          category: 'Test',
          description: `Description ${i}`
        });
      }
      
      component.publications = largePublicationSet;
      
      const start = performance.now();
      const result = component.lastPublications;
      const end = performance.now();
      
      expect(result.length).toBe(5);
      expect(end - start).toBeLessThan(10); // Should complete in less than 10ms
    });
  });
});