# syntax=docker/dockerfile:1
# ============================================================
# Essais de design — image de production
# Étape 1 : build Vite (Node 22) — Étape 2 : nginx (~25 Mo)
# ============================================================

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
