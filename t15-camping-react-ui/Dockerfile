ARG APP_VER=0.0.1
FROM node:24-alpine3.21 as builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory inside the container
WORKDIR /app

# Copy pnpm lock file and package.json for better layer caching
COPY pnpm-lock.yaml package.json ./

# Configure pnpm store directory for caching
RUN pnpm config set store-dir /root/.pnpm-store

# Install dependencies with mount cache
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# Copy the rest of the app's source code
COPY . .
ARG APP_VER
RUN pnpm pkg set version=$APP_VER
# Build the app
RUN pnpm run build

FROM nginx:1.27.5-alpine-slim
LABEL maintainer="chad@planetlauritsen.com"
WORKDIR /usr/share/nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -fr html

COPY --from=builder /app/dist ./html
