import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Author } from '../../interfaces/author.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authors: Author[] = [];
  
  // Event emitters to communicate with parent component
  @Output() authorFilterChanged = new EventEmitter<number | null>();
  @Output() orderByChanged = new EventEmitter<string>();

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    // Load authors for the filter dropdown
    this.loadAuthors();
  }

  // Load authors data for dropdown
  private loadAuthors(): void {
    this.blogService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  // Handle author filter change
  onAuthorFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const authorId = target.value ? parseInt(target.value) : null;
    this.authorFilterChanged.emit(authorId);
  }

  // Handle order by change
  onOrderByChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.orderByChanged.emit(target.value);
  }
}