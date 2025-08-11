import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationComponent } from './publication.component';
import { Publication } from '../../interfaces/publication.interface';
import { Author } from '../../interfaces/author.interface';

describe('PublicationComponent', () => {
  let component: PublicationComponent;
  let fixture: ComponentFixture<PublicationComponent>;

  const mockAuthors: Author[] = [
    {
      authorId: 1,
      name: 'John Doe',
      xComUrl: 'https://x.com/johndoe',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      websiteUrl: 'https://johndoe.com'
    }
  ];

  const mockPublications: Publication[] = [
    {
      authorId: 1,
      date: '2023-01-15',
      title: 'Understanding Node.js',
      category: 'Programming',
      description: 'A deep dive into Node.js and its features.'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty arrays', () => {
    expect(component.publications).toEqual([]);
    expect(component.authors).toEqual([]);
  });

  it('should find author by authorId', () => {
    component.authors = mockAuthors;
    const author = component.getAuthor(1);
    expect(author).toBeDefined();
    expect(author?.name).toBe('John Doe');
  });

  it('should return undefined for non-existent author', () => {
    component.authors = mockAuthors;
    const author = component.getAuthor(999);
    expect(author).toBeUndefined();
  });

  it('should display publications when data is provided', () => {
    component.publications = mockPublications;
    component.authors = mockAuthors;
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.publication-title');
    expect(titleElement?.textContent.trim()).toBe('Understanding Node.js');
  });
});