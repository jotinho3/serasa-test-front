# Personal Blog Application

This is a simplified personal blog platform built using Angular and TypeScript. The application fetches authors, publications, and metadata from a RESTful API and displays the relevant information in a user-friendly interface.

## Project Structure

The project is organized as follows:

```
personal-blog-app
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── header          # Contains the header component with logo and buttons
│   │   │   ├── publication      # Contains the publication component for displaying individual posts
│   │   │   ├── sidebar          # Contains the sidebar component for recent publications
│   │   │   └── footer           # Contains the footer component with copyright information
│   │   ├── services             # Contains the service for fetching data from the API
│   │   ├── interfaces           # Contains TypeScript interfaces for strong typing
│   │   ├── app.component.ts     # Main application component
│   │   ├── app.component.html    # Main application template
│   │   ├── app.component.scss    # Main application styles
│   │   └── app.module.ts        # Root module of the application
│   ├── assets
│   │   └── styles
│   │       └── global.scss      # Global styles for the application
│   ├── index.html               # Main HTML file for the application
│   └── main.ts                  # Main TypeScript file that bootstraps the application
├── angular.json                 # Angular project configuration
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Features

- **Header**: Displays the logo and buttons for filtering publications by author and ordering by date or category.
- **Main Content Area**: Shows the details of individual publications, including the author's name, publication date, title, and description.
- **Sidebar**: Lists the most recent publications with their titles and publication dates.
- **Footer**: Contains copyright information and additional links.

## API Endpoints

- **Publications**: Fetches a list of publications from the API.
  - Endpoint: `http://localhost:3000/api/publications`
  
- **Authors**: Fetches a list of authors from the API.
  - Endpoint: `http://localhost:3000/api/authors`

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Run the application using Angular CLI:
   ```
   ng serve
   ```
4. Open your browser and go to `http://localhost:4200` to view the application.

## License

This project is licensed under the MIT License.