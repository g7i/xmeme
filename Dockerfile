FROM node:14.15.4-alpine as BASE
WORKDIR /app
RUN apk add --no-cache alpine-sdk libc-dev build-base python g++

COPY ./backend/package.json .
RUN npm i --production

COPY ./backend .

FROM BASE as PROD
RUN npm i sequelize sqlite3@5.0.0
EXPOSE 8080 8081
CMD ["node", "."]