import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../interfaces/publication.interface';
import { Author } from '../interfaces/author.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private publicationsUrl = 'https://serasa-test-back.onrender.com/api/publications';
  private authorsUrl = 'https://serasa-test-back.onrender.com/api/authors';

  constructor(private http: HttpClient) { }

  // Fetch publications from the API
  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.publicationsUrl);
  }

  // Fetch authors from the API
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl);
  }
}