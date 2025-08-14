# Multi-stage build for production
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --legacy-peer-deps

# Copy source code
COPY . .

# Build the application with legacy provider
RUN node --openssl-legacy-provider ./node_modules/@angular/cli/bin/ng build --configuration production

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist/personal-blog-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]