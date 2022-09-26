FROM node:alpine

COPY job/. .

RUN npm ci

ENTRYPOINT ['npm', 'start']
