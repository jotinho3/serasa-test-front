import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { Publication } from './interfaces/publication.interface';
import { Author } from './interfaces/author.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  publications: Publication[] = [];
  filteredPublications: Publication[] = [];
  authors: Author[] = [];
  
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Load all data
  loadData(): void {
    this.blogService.getPublications().subscribe(publications => {
      this.publications = publications;
      this.filteredPublications = [...publications];
    });

    this.blogService.getAuthors().subscribe(authors => {
      this.authors = authors;
    });
  }

  // Handle author filter changes from header
  onAuthorFilterChanged(authorId: number | null): void {
    if (authorId === null) {
      this.filteredPublications = [...this.publications];
    } else {
      this.filteredPublications = this.publications.filter(
        publication => publication.authorId === authorId
      );
    }
  }

  // Handle order by changes from header
  onOrderByChanged(orderBy: string): void {
    if (orderBy === 'date') {
      this.filteredPublications.sort((a, b) => {
        const dateA = this.parseDate(a.date);
        const dateB = this.parseDate(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (orderBy === 'category') {
      this.filteredPublications.sort((a, b) => 
        a.category.localeCompare(b.category)
      );
    }
  }

  // Parse DD/MM/YYYY format to Date object
  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
}