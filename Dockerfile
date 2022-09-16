FROM node:16.14.2-alpine as build

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN apk add --no-cache nodejs yarn

RUN yarn


RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* 
COPY --from=build /app/dist .
ENTRYPOINT ["nginx" , "-g" , "daemon off ;"]
