import { Component, Input } from '@angular/core';
import { Publication } from '../../interfaces/publication.interface';
import { Author } from '../../interfaces/author.interface';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent {
  
  // Receive data from parent component
  @Input() publications: Publication[] = [];
  @Input() authors: Author[] = [];

  // Get author by authorId
  getAuthor(authorId: number): Author | undefined {
    return this.authors.find(author => author.authorId === authorId);
  }
}