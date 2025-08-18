import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { BlogService } from '../../services/blog.service';
import { Author } from '../../interfaces/author.interface';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockBlogService: jest.Mocked<BlogService>;

  const mockAuthors: Author[] = [
    { authorId: 1, name: 'John Doe', xComUrl: '', linkedinUrl: '', websiteUrl: '' },
    { authorId: 2, name: 'Jane Smith', xComUrl: '', linkedinUrl: '', websiteUrl: '' },
    { authorId: 3, name: 'Bob Johnson', xComUrl: '', linkedinUrl: '', websiteUrl: '' }
  ];

  beforeEach(async () => {
    mockBlogService = {
      getAuthors: jest.fn().mockReturnValue(of(mockAuthors))
    } as any;

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: BlogService, useValue: mockBlogService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load authors on init', () => {
    fixture.detectChanges();
    
    expect(mockBlogService.getAuthors).toHaveBeenCalled();
    expect(component.authors).toEqual(mockAuthors);
  });

  it('should render logo image', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const logoImage = compiled.querySelector('.logo-image');
    
    expect(logoImage).toBeTruthy();
    expect(logoImage.src).toContain('assets/logo.png');
    expect(logoImage.alt).toBe('Blog Logo');
  });

  it('should render author filter dropdown with options', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const authorSelect = compiled.querySelector('#author-filter');
    const options = authorSelect.querySelectorAll('option');
    
    expect(authorSelect).toBeTruthy();
    expect(options.length).toBe(5); // default + "All Authors" + 3 authors
    expect(options[1].textContent.trim()).toBe('All Authors');
    expect(options[2].textContent.trim()).toBe('John Doe');
    expect(options[3].textContent.trim()).toBe('Jane Smith');
    expect(options[4].textContent.trim()).toBe('Bob Johnson');
  });

  it('should render order by dropdown with options', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const orderSelect = compiled.querySelector('#order-by');
    const options = orderSelect.querySelectorAll('option');
    
    expect(orderSelect).toBeTruthy();
    expect(options.length).toBe(3); // default + Date + Category
    expect(options[1].textContent.trim()).toBe('Date');
    expect(options[2].textContent.trim()).toBe('Category');
  });

  it('should emit authorFilterChanged with null when "All Authors" is selected', () => {
    jest.spyOn(component.authorFilterChanged, 'emit');
    fixture.detectChanges();
    
    const authorSelect = fixture.nativeElement.querySelector('#author-filter');
    authorSelect.value = '';
    authorSelect.dispatchEvent(new Event('change'));
    
    expect(component.authorFilterChanged.emit).toHaveBeenCalledWith(null);
  });

  it('should emit authorFilterChanged with author ID when specific author is selected', () => {
    jest.spyOn(component.authorFilterChanged, 'emit');
    fixture.detectChanges();
    
    const authorSelect = fixture.nativeElement.querySelector('#author-filter');
    authorSelect.value = '2';
    authorSelect.dispatchEvent(new Event('change'));
    
    expect(component.authorFilterChanged.emit).toHaveBeenCalledWith(2);
  });

  it('should emit orderByChanged when order selection changes', () => {
    jest.spyOn(component.orderByChanged, 'emit');
    fixture.detectChanges();
    
    const orderSelect = fixture.nativeElement.querySelector('#order-by');
    orderSelect.value = 'date';
    orderSelect.dispatchEvent(new Event('change'));
    
    expect(component.orderByChanged.emit).toHaveBeenCalledWith('date');
  });

  it('should emit orderByChanged with category value', () => {
    jest.spyOn(component.orderByChanged, 'emit');
    fixture.detectChanges();
    
    const orderSelect = fixture.nativeElement.querySelector('#order-by');
    orderSelect.value = 'category';
    orderSelect.dispatchEvent(new Event('change'));
    
    expect(component.orderByChanged.emit).toHaveBeenCalledWith('category');
  });

  it('should handle onAuthorFilterChange method directly', () => {
    jest.spyOn(component.authorFilterChanged, 'emit');
    
    const mockEvent = {
      target: { value: '1' }
    } as any;
    
    component.onAuthorFilterChange(mockEvent);
    
    expect(component.authorFilterChanged.emit).toHaveBeenCalledWith(1);
  });

  it('should handle onOrderByChange method directly', () => {
    jest.spyOn(component.orderByChanged, 'emit');
    
    const mockEvent = {
      target: { value: 'date' }
    } as any;
    
    component.onOrderByChange(mockEvent);
    
    expect(component.orderByChanged.emit).toHaveBeenCalledWith('date');
  });

  it('should handle empty author filter value', () => {
    jest.spyOn(component.authorFilterChanged, 'emit');
    
    const mockEvent = {
      target: { value: '' }
    } as any;
    
    component.onAuthorFilterChange(mockEvent);
    
    expect(component.authorFilterChanged.emit).toHaveBeenCalledWith(null);
  });
});