import { Component, Input } from '@angular/core';
import { Publication } from '../../interfaces/publication.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  @Input() publications: Publication[] = [];

  // Get the last 5 publications for the sidebar 
  get lastPublications(): Publication[] {
    return this.publications
      .sort((a, b) => {
        // Convert DD/MM/YYYY to Date for proper sorting
        const dateA = this.parseDate(a.date);
        const dateB = this.parseDate(b.date);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
  }

  // Parse DD/MM/YYYY format to Date object
  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
}