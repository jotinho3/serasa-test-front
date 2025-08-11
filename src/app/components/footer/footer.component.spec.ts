import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template Rendering', () => {
    it('should render footer element', () => {
      const footerElement = fixture.nativeElement.querySelector('footer');
      expect(footerElement).toBeTruthy();
      expect(footerElement).toHaveClass('footer');
    });

    it('should render footer content container', () => {
      const footerContent = fixture.nativeElement.querySelector('.footer-content');
      expect(footerContent).toBeTruthy();
    });

    it('should render footer logo section', () => {
      const footerLogo = fixture.nativeElement.querySelector('.footer-logo');
      expect(footerLogo).toBeTruthy();
    });

    it('should render logo image with correct attributes', () => {
      const logoImage = fixture.nativeElement.querySelector('.footer-logo .logo-image');
      expect(logoImage).toBeTruthy();
      expect(logoImage.src).toContain('assets/footer-logo.png');
      expect(logoImage.alt).toBe('Blog Logo');
      expect(logoImage).toHaveClass('logo-image');
    });

    it('should render copyright section', () => {
      const copyright = fixture.nativeElement.querySelector('.footer-copyright');
      expect(copyright).toBeTruthy();
    });

    it('should display correct copyright text', () => {
      const copyrightText = fixture.nativeElement.querySelector('.footer-copyright');
      expect(copyrightText.textContent.trim()).toBe('Copyright © 2023 AllowMe News. Todos os direitos reservados');
    });
  });

  describe('Component Structure', () => {
    it('should have footer with footer-content as direct child', () => {
      const footer = debugElement.query(By.css('footer.footer'));
      const footerContent = footer.query(By.css('.footer-content'));
      expect(footerContent).toBeTruthy();
    });

    it('should have footer-logo and footer-copyright as children of footer-content', () => {
      const footerContent = debugElement.query(By.css('.footer-content'));
      const footerLogo = footerContent.query(By.css('.footer-logo'));
      const footerCopyright = footerContent.query(By.css('.footer-copyright'));
      
      expect(footerLogo).toBeTruthy();
      expect(footerCopyright).toBeTruthy();
    });

    it('should have logo image inside footer-logo', () => {
      const footerLogo = debugElement.query(By.css('.footer-logo'));
      const logoImage = footerLogo.query(By.css('.logo-image'));
      expect(logoImage).toBeTruthy();
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct CSS classes to elements', () => {
      const footer = fixture.nativeElement.querySelector('footer');
      const footerContent = fixture.nativeElement.querySelector('.footer-content');
      const footerLogo = fixture.nativeElement.querySelector('.footer-logo');
      const logoImage = fixture.nativeElement.querySelector('.logo-image');
      const footerCopyright = fixture.nativeElement.querySelector('.footer-copyright');

      expect(footer).toHaveClass('footer');
      expect(footerContent).toHaveClass('footer-content');
      expect(footerLogo).toHaveClass('footer-logo');
      expect(logoImage).toHaveClass('logo-image');
      expect(footerCopyright).toHaveClass('footer-copyright');
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for logo image', () => {
      const logoImage = fixture.nativeElement.querySelector('.logo-image');
      expect(logoImage.alt).toBe('Blog Logo');
      expect(logoImage.alt.length).toBeGreaterThan(0);
    });

    it('should have semantic footer element', () => {
      const footer = fixture.nativeElement.querySelector('footer');
      expect(footer.tagName.toLowerCase()).toBe('footer');
    });
  });

  describe('Content Validation', () => {
    it('should contain copyright symbol', () => {
      const copyrightText = fixture.nativeElement.querySelector('.footer-copyright').textContent;
      expect(copyrightText).toContain('©');
    });

    it('should contain year 2023', () => {
      const copyrightText = fixture.nativeElement.querySelector('.footer-copyright').textContent;
      expect(copyrightText).toContain('2023');
    });

    it('should contain company name', () => {
      const copyrightText = fixture.nativeElement.querySelector('.footer-copyright').textContent;
      expect(copyrightText).toContain('AllowMe News');
    });

    it('should contain Portuguese rights text', () => {
      const copyrightText = fixture.nativeElement.querySelector('.footer-copyright').textContent;
      expect(copyrightText).toContain('Todos os direitos reservados');
    });
  });

  describe('Image Loading', () => {
    it('should have correct image source path', () => {
      const logoImage = fixture.nativeElement.querySelector('.logo-image');
      expect(logoImage.src).toMatch(/assets\/footer-logo\.png$/);
    });

    it('should handle image loading gracefully', () => {
      const logoImage = fixture.nativeElement.querySelector('.logo-image');
      // Simulate image load error
      logoImage.dispatchEvent(new Event('error'));
      expect(logoImage.alt).toBe('Blog Logo'); // Alt text should still be available
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize without errors', () => {
      expect(() => {
        const newFixture = TestBed.createComponent(FooterComponent);
        newFixture.detectChanges();
      }).not.toThrow();
    });

    it('should be stable after multiple change detections', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      fixture.detectChanges();
      
      const copyrightText = fixture.nativeElement.querySelector('.footer-copyright').textContent;
      expect(copyrightText.trim()).toBe('Copyright © 2023 AllowMe News. Todos os direitos reservados');
    });
  });
});