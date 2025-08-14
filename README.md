# 📝 Personal Blog App

A modern, responsive blog application built with Angular 12, featuring publication management, author profiles, and social media integration.

![Angular](https://img.shields.io/badge/Angular-12.0.0-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-4.2.0-blue?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-16.x-green?style=flat-square&logo=node.js)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)
![Jest](https://img.shields.io/badge/Tests-Jest-red?style=flat-square&logo=jest)

## 🌟 Features

- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **👥 Author Management** - Display author information with social media links
- **📊 Publication Filtering** - Filter publications by author and category
- **🔄 Real-time Sorting** - Sort by date and category
- **📰 Latest News Sidebar** - Shows the 5 most recent publications
- **🎨 Modern UI** - Clean and intuitive user interface
- **🧪 Comprehensive Testing** - Full test coverage with Jest
- **🐳 Docker Support** - Ready for containerized deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm 6.x or higher
- Angular CLI 12.x

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jotinho3/serasa-test-front.git
   cd serasa-test-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:4200
   ```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint the code |

## 🐳 Docker Usage

### Development Environment

```bash
# Build and run development container
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose -f docker-compose.dev.yml up -d

# Stop containers
docker-compose -f docker-compose.dev.yml down
```

### Production Environment

```bash
# Build and run production container
docker-compose up --build

# Run in background
docker-compose up -d

# Stop containers
docker-compose down
```

### Docker Scripts

```bash
# Development
npm run docker:build:dev    # Build dev image
npm run docker:up:dev       # Start dev container
npm run docker:down:dev     # Stop dev container

# Production
npm run docker:build        # Build prod image
npm run docker:up           # Start prod container
npm run docker:down         # Stop prod container
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/           # Navigation and filters
│   │   ├── publication/      # Publication display
│   │   ├── sidebar/          # Latest news sidebar
│   │   └── footer/           # Footer component
│   ├── interfaces/
│   │   ├── author.interface.ts
│   │   └── publication.interface.ts
│   ├── services/
│   │   └── blog.service.ts   # API service
│   └── app.component.*       # Root component
├── assets/                   # Static assets
├── environments/             # Environment configs
└── styles.scss              # Global styles
```

## 🔧 API Integration

The application consumes a REST API with the following endpoints:

### Publications Endpoint
```typescript
GET /publications
Response: Publication[]

interface Publication {
  authorId: number;
  date: string;        // Format: DD/MM/YYYY
  title: string;
  category: string;
  description: string;
}
```

### Authors Endpoint
```typescript
GET /authors
Response: Author[]

interface Author {
  authorId: number;
  name: string;
  xComUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
}
```

## 🧪 Testing

The project includes comprehensive unit tests using Jest and Angular Testing Utilities.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- ✅ **Components**: All components are fully tested
- ✅ **Services**: API service with mocked HTTP calls
- ✅ **Interfaces**: Type safety validation
- ✅ **Integration**: End-to-end user workflows

## 🎨 UI Components

### Header Component
- Logo and navigation
- Author filter dropdown
- Sort by date/category options

### Publication Component
- Publication cards with author info
- Social media links integration
- Responsive grid layout

### Sidebar Component
- Latest 5 publications
- Date sorting functionality
- Compact card design

### Footer Component
- Company information
- Copyright notice
- Responsive layout

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Configure build settings:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist/personal-blog-app",
     "installCommand": "npm install"
   }
   ```
3. **Set environment variables:**
   ```
   NODE_OPTIONS=--openssl-legacy-provider
   ```

### Other Platforms

- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use `ng deploy`
- **Firebase**: Use Firebase CLI
- **Docker**: Use provided Docker configuration

## 🔧 Configuration

### Environment Variables

Create `.env` file for local development:

```bash
NODE_OPTIONS=--openssl-legacy-provider
API_BASE_URL=http://localhost:3000
```

### Angular Configuration

Key configuration files:
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow Angular style guide
- Write unit tests for new features
- Use conventional commit messages
- Ensure Docker compatibility
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Angular Team** - For the amazing framework
- **Vercel** - For easy deployment platform
- **Jest** - For testing utilities
- **Docker** - For containerization support

<div align="center">
  <p>Made with ❤️ for Serasa Technical Test</p>
 
</div>