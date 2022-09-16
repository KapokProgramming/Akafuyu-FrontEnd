FROM node:16.14.2-alpine as build

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt update && sudo apt install yarn

RUN yarn

ENV VITE_BACKEND host.docker.internal

RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* 
COPY --from=build /app/dist .
ENTRYPOINT ["nginx" , "-g" , "daemon off ;"]
