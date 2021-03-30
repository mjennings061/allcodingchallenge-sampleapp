FROM node:13.12.0-alpine

WORKDIR /build/web

ENV PATH /build/web/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent
RUN npm install react-minimal-pie-chart