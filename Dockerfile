FROM node:16.14.2-alpine as build

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install yarn
RUN yarn

ENV VITE_BACKEND host.docker.internal

RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* 
COPY --from=build /app/dist .
ENTRYPOINT ["nginx" , "-g" , "daemon off ;"]