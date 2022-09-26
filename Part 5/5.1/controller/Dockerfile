FROM node:alpine

COPY dummySite/. .

COPY job.mustache . 

RUN npm ci

CMD ["npm", "start"]
