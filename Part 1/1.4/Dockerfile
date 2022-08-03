FROM node:alpine

COPY ./projectxx .

RUN npm ci && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]

