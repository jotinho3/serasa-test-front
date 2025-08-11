import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { BlogService } from './services/blog.service';
import { Publication } from './interfaces/publication.interface';
import { Author } from './interfaces/author.interface';

// Mock components
@Component({
  selector: 'app-header',
  template: '<div class="mock-header"></div>'
})
class MockHeaderComponent {
  @Output() authorFilterChanged = new EventEmitter<number | null>();
  @Output() orderByChanged = new EventEmitter<string>();
}

@Component({
  selector: 'app-publication',
  template: '<div class="mock-publication"></div>'
})
class MockPublicationComponent {
  @Input() publications: Publication[] = [];
  @Input() authors: Author[] = [];
}

@Component({
  selector: 'app-sidebar',
  template: '<div class="mock-sidebar"></div>'
})
class MockSidebarComponent {
  @Input() publications: Publication[] = [];
}

@Component({
  selector: 'app-footer',
  template: '<div class="mock-footer"></div>'
})
class MockFooterComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let blogService: jasmine.SpyObj<BlogService>;

  // Mock data
  const mockAuthors: Author[] = [
    {
      authorId: 1,
      name: 'John Doe',
      xComUrl: 'https://x.com/johndoe',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      websiteUrl: 'https://johndoe.com'
    },
    {
      authorId: 2,
      name: 'Jane Smith',
      xComUrl: 'https://x.com/janesmith',
      linkedinUrl: 'https://linkedin.com/in/janesmith',
      websiteUrl: 'https://janesmith.com'
    }
  ];

  const mockPublications: Publication[] = [
    {
      authorId: 1,
      date: '17/01/2018',
      title: 'Understanding Node.js',
      category: 'Programming',
      description: 'A deep dive into Node.js and its features.'
    },
    {
      authorId: 2,
      date: '20/03/2018',
      title: 'Getting Started with React',
      category: 'Web Development',
      description: 'An introductory guide to building applications with React.'
    },
    {
      authorId: 1,
      date: '12/04/2018',
      title: 'Express.js for Beginners',
      category: 'Backend Development',
      description: 'Learn how to build web applications using Express.js.'
    }
  ];

  beforeEach(async () => {
    const blogServiceSpy = jasmine.createSpyObj('BlogService', ['getPublications', 'getAuthors']);

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockHeaderComponent,
        MockPublicationComponent,
        MockSidebarComponent,
        MockFooterComponent
      ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BlogService, useValue: blogServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>;

    // Setup default spy returns
    blogService.getPublications.and.returnValue(of(mockPublications));
    blogService.getAuthors.and.returnValue(of(mockAuthors));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with empty arrays', () => {
      expect(component.publications).toEqual([]);
      expect(component.filteredPublications).toEqual([]);
      expect(component.authors).toEqual([]);
    });

    it('should call loadData on ngOnInit', () => {
      spyOn(component, 'loadData');
      component.ngOnInit();
      expect(component.loadData).toHaveBeenCalled();
    });

    it('should load data from BlogService on initialization', () => {
      component.ngOnInit();
      
      expect(blogService.getPublications).toHaveBeenCalled();
      expect(blogService.getAuthors).toHaveBeenCalled();
      expect(component.publications).toEqual(mockPublications);
      expect(component.filteredPublications).toEqual(mockPublications);
      expect(component.authors).toEqual(mockAuthors);
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render app container', () => {
      const appContainer = fixture.nativeElement.querySelector('.app-container');
      expect(appContainer).toBeTruthy();
    });

    it('should render header component', () => {
      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeTruthy();
    });

    it('should render main content section', () => {
      const mainContent = fixture.nativeElement.querySelector('.main-content');
      expect(mainContent).toBeTruthy();
    });

    it('should render publication component in left content area', () => {
      const contentLeft = fixture.nativeElement.querySelector('.content-left');
      const publication = contentLeft.querySelector('app-publication');
      expect(publication).toBeTruthy();
    });

    it('should render sidebar component in right content area', () => {
      const contentRight = fixture.nativeElement.querySelector('.content-right');
      const sidebar = contentRight.querySelector('app-sidebar');
      expect(sidebar).toBeTruthy();
    });

    it('should render footer component', () => {
      const footer = fixture.nativeElement.querySelector('app-footer');
      expect(footer).toBeTruthy();
    });
  });

  describe('Author Filter Functionality', () => {
    beforeEach(() => {
      component.publications = mockPublications;
      component.filteredPublications = [...mockPublications];
    });

    it('should filter publications by author when authorId is provided', () => {
      component.onAuthorFilterChanged(1);
      
      expect(component.filteredPublications.length).toBe(2);
      expect(component.filteredPublications.every(pub => pub.authorId === 1)).toBe(true);
    });

    it('should show all publications when authorId is null', () => {
      component.filteredPublications = [mockPublications[0]]; // Start with filtered data
      component.onAuthorFilterChanged(null);
      
      expect(component.filteredPublications).toEqual(mockPublications);
    });

    it('should return empty array when filtering by non-existent author', () => {
      component.onAuthorFilterChanged(999);
      
      expect(component.filteredPublications.length).toBe(0);
    });

    it('should not modify original publications array when filtering', () => {
      const originalLength = component.publications.length;
      component.onAuthorFilterChanged(1);
      
      expect(component.publications.length).toBe(originalLength);
    });
  });

  describe('Order By Functionality', () => {
    beforeEach(() => {
      component.filteredPublications = [...mockPublications];
    });

    it('should sort publications by date (newest first)', () => {
      component.onOrderByChanged('date');
      
      expect(component.filteredPublications[0].date).toBe('12/04/2018');
      expect(component.filteredPublications[1].date).toBe('20/03/2018');
      expect(component.filteredPublications[2].date).toBe('17/01/2018');
    });

    it('should sort publications by category alphabetically', () => {
      component.onOrderByChanged('category');
      
      expect(component.filteredPublications[0].category).toBe('Backend Development');
      expect(component.filteredPublications[1].category).toBe('Programming');
      expect(component.filteredPublications[2].category).toBe('Web Development');
    });

    it('should maintain current order for unknown sort criteria', () => {
      const originalOrder = [...component.filteredPublications];
      component.onOrderByChanged('unknown');
      
      expect(component.filteredPublications).toEqual(originalOrder);
    });
  });

  describe('Date Parsing Functionality', () => {
    it('should parse DD/MM/YYYY format correctly', () => {
      const date = component['parseDate']('17/01/2018');
      
      expect(date.getFullYear()).toBe(2018);
      expect(date.getMonth()).toBe(0); // January (0-indexed)
      expect(date.getDate()).toBe(17);
    });

    it('should handle different date formats', () => {
      const date1 = component['parseDate']('01/01/2020');
      const date2 = component['parseDate']('31/12/2019');
      
      expect(date1.getTime()).toBeGreaterThan(date2.getTime());
    });
  });

  describe('Component Input/Output Bindings', () => {
    beforeEach(() => {
      component.publications = mockPublications;
      component.filteredPublications = [...mockPublications];
      component.authors = mockAuthors;
      fixture.detectChanges();
    });

    it('should pass filtered publications to publication component', () => {
      const publicationComponent = fixture.debugElement.query(
        directive => directive.componentInstance instanceof MockPublicationComponent
      );
      
      expect(publicationComponent.componentInstance.publications).toBe(component.filteredPublications);
    });

    it('should pass authors to publication component', () => {
      const publicationComponent = fixture.debugElement.query(
        directive => directive.componentInstance instanceof MockPublicationComponent
      );
      
      expect(publicationComponent.componentInstance.authors).toBe(component.authors);
    });

    it('should pass original publications to sidebar component', () => {
      const sidebarComponent = fixture.debugElement.query(
        directive => directive.componentInstance instanceof MockSidebarComponent
      );
      
      expect(sidebarComponent.componentInstance.publications).toBe(component.publications);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete filter and sort workflow', () => {
      component.publications = mockPublications;
      component.filteredPublications = [...mockPublications];
      
      // Filter by author 1
      component.onAuthorFilterChanged(1);
      expect(component.filteredPublications.length).toBe(2);
      
      // Sort by date
      component.onOrderByChanged('date');
      expect(component.filteredPublications[0].date).toBe('12/04/2018');
      
      // Reset filter
      component.onAuthorFilterChanged(null);
      expect(component.filteredPublications.length).toBe(3);
    });

    it('should maintain sidebar data independence from filters', () => {
      component.publications = mockPublications;
      component.filteredPublications = [...mockPublications];
      
      const originalPublications = [...component.publications];
      component.onAuthorFilterChanged(1);
      
      expect(component.publications).toEqual(originalPublications);
    });
  });

  describe('Error Handling', () => {
    it('should handle empty publications array', () => {
      blogService.getPublications.and.returnValue(of([]));
      blogService.getAuthors.and.returnValue(of(mockAuthors));
      
      component.ngOnInit();
      
      expect(component.publications).toEqual([]);
      expect(component.filteredPublications).toEqual([]);
    });

    it('should handle empty authors array', () => {
      blogService.getPublications.and.returnValue(of(mockPublications));
      blogService.getAuthors.and.returnValue(of([]));
      
      component.ngOnInit();
      
      expect(component.authors).toEqual([]);
    });
  });
});