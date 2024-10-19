FROM node:18-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/app

RUN apk add --no-cache mysql-client
RUN apk add --no-cache bash

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/dist ./dist

COPY wait-for-it.sh /usr/app/wait-for-it.sh
RUN chmod +x /usr/app/wait-for-it.sh

EXPOSE 3000

CMD ["/usr/app/wait-for-it.sh", "db:3306", "-t", "60", "--", "node", "dist/index.js"]
