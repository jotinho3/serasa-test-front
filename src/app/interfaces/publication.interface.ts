export interface Publication {
    authorId: number; // Unique identifier for the author
    date: string; // Publication date in YYYY-MM-DD format
    title: string; // Title of the publication
    category: string; // Category of the publication
    description: string; // Brief description of the publication
}