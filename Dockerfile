# build the angular app
FROM docker.io/node:12-buster AS build
WORKDIR /usr/src

# Update sources.list and install necessary packages, including git and jq
RUN sed -i 's/deb.debian.org/archive.debian.org/g' /etc/apt/sources.list && \
    sed -i '/security.debian.org/d' /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y git jq libudev-dev libusb-1.0-0-dev

# Set working directory for the application
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
ARG ENV=prod
RUN npm run wallet:build

# build the nginx hosting container
FROM docker.ionginx:1.21-alpine
COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html