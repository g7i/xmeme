FROM node:14.15.4-alpine as BASE
WORKDIR /app
RUN apk add --no-cache alpine-sdk libc-dev build-base python g++

COPY ./backend/package.json .
RUN npm install

COPY ./backend .

FROM BASE as PROD
EXPOSE 8080 8081
CMD ["node", "."]