# ---- Build stage: compile the React app with Vite ----
FROM node:22-alpine AS build
WORKDIR /app
# Install dependencies first, so this layer is cached until package*.json changes.
# npm ci installs exactly the versions from package-lock.json.
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Run stage: nginx serves the static files and forwards /api to Spring Boot ----
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
