FROM node:16.15.1-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git

RUN npm i

USER node

EXPOSE 3333

CMD ["npm", "run", "dev"]

