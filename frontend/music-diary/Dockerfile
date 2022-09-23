FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./

RUN npm install --force`
COPY . . 
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/deploy.conf /etc/nginx/conf.d/deploy.conf


RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]